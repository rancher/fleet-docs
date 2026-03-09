# Using Webhooks Instead of Polling

By default, Fleet utilizes polling (default: every 15 seconds) to pull from a Git repo. This is a convenient default that works reasonably well for a small number of repos (up to a few tens).

At higher workloads, Fleet optimizes webhook processing by combining status updates and patch operations into a single request. This reduces update conflicts and race conditions when multiple commits trigger rapid updates, and it improves reliability in large-scale deployments.

For installations with multiple tens up to hundreds of Git repos, and in general to reduce latency (the time between a push to Git and fleet reacting to it), configuring webhooks is recommended instead of polling.

Fleet currently supports Github, GitLab, Bitbucket, Bitbucket Server and Gogs.

### 1. Configure the webhook service. Fleet uses a gitjob service to handle webhook requests. Create an ingress that points to the gitjob service.

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: webhook-ingress
  namespace: cattle-fleet-system
spec:
  rules:
  - host: your.domain.com
    http:
      paths:
        - path: /
          pathType: Prefix
          backend:
            service:
              name: gitjob
              port:
                number: 80
```


Ingress Nginx will be [retired](https://kubernetes.io/blog/2025/11/11/ingress-nginx-retirement/), here is an example using Traefik:

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  annotations:
    traefik.ingress.kubernetes.io/router.middlewares: cattle-fleet-system-gitjob-stripprefix@kubernetescrd
    traefik.ingress.kubernetes.io/router.priority: '100'
  name: webhook-ingress
  namespace: cattle-fleet-system
spec:
  ingressClassName: traefik
  rules:
    - host: your.domain.com
      http:
        paths:
          - backend:
              service:
                name: gitjob
                port:
                  number: 80
            path: /gitjob(/|$)(.*)
            pathType: ImplementationSpecific
```

:::note
Use the annotation `traefik.ingress.kubernetes.io/router.priority: '100'` only when two Ingress resources can conflict. This annotation assigns a higher priority to the GitJob route. This depends on the `pathType` property. When `pathType` is set to Prefix, the annotation is required. 
:::

This configuration requires a middleware to strip the additional path from the URL, since `gitjob` responds directly from the root path. This is equivalent to the `nginx.ingress.kubernetes.io/rewrite-target` annotation in Nginx:

```yaml
apiVersion: traefik.io/v1alpha1
kind: Middleware
metadata:
  name: gitjob-stripprefix
  namespace: cattle-fleet-system
spec:
  stripPrefix:
    prefixes:
      - /gitjob
```

This approach allows a smooth migration from Ingress Nginx to Traefik while keeping the application configuration unchanged.

:::info

You can configure [TLS](https://kubernetes.io/docs/concepts/services-networking/ingress/#tls) on ingress.

:::

### 2. Go to your webhook provider and configure the webhook callback url. Here is a Github example.

![](/img/webhook.png)

Configuring a secret is optional. This is used to validate the webhook payload as the payload should not be trusted by default.
If your webhook server is publicly accessible to the Internet, then it is recommended to configure the secret. If you do configure the
secret, follow step 3.

:::note

only application/json is supported due to the limitation of webhook library.

:::

:::caution

If you configured the webhook the polling interval will be automatically adjusted to 1 hour.

:::

### 3. (Optional) Configure webhook secret. The secret is for validating webhook payload. Make sure to put it in a k8s secret called `gitjob-webhook` in `cattle-fleet-system`.

| Provider        | K8s Secret Key                   |
|-----------------| ---------------------------------|
| GitHub          | `github`                         |
| GitLab          | `gitlab`                         |
| BitBucket       | `bitbucket`                      |
| BitBucketServer | `bitbucket-server`               |
| Gogs            | `gogs`                           |

For example, to create a secret containing a GitHub secret to validate the webhook payload, run:

```shell
kubectl create secret generic gitjob-webhook -n cattle-fleet-system --from-literal=github=webhooksecretvalue
```

### 4. Go to your git provider and test the connection. You should get a HTTP response code.
