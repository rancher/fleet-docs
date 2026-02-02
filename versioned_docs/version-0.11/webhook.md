# Using Webhooks Instead of Polling

By default, Fleet utilizes polling (default: every 15 seconds) to pull from a Git repo. This is a convenient default that works reasonably well for a small number of repos (up to a few tens).

For installations with multiple tens up to hundreds of Git repos, and in general to reduce latency (the time between a push to Git and fleet reacting to it), configuring webhooks is recommended instead of polling.

Fleet currently supports Azure DevOps, GitHub, GitLab, Bitbucket, Bitbucket Server, and Gogs.

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


If you use Traefik as your ingress controller and want the webhook available at `<http://your.domain.com/gitjob>`, define a Middleware to rewrite the path, and attach it to the Ingress.

```yaml
apiVersion: traefik.io/v1alpha1
kind: Middleware
metadata:
  name: gitjob-rewrite
  namespace: cattle-fleet-system
spec:
  stripPrefixRegex:
    regex:
      - ^/gitjob
```

Modify your ingress with middleware:

```yaml

apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: webhook-ingress
  namespace: cattle-fleet-system
  annotations:
    traefik.ingress.kubernetes.io/router.middlewares: cattle-fleet-system-gitjob-rewrite@kubernetescrd
spec:
  rules:
    - host: your.domain.com
      http:
        paths:
          - path: /gitjob
            pathType: Prefix
            backend:
              service:
                name: gitjob
                port:
                  number: 80

```

Requests to `<http://your.domain.com/gitjob>` are routed to the gitjob service with the path rewritten internally to `/`. This matches the endpoint expected by Fleet’s webhook handler.

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

| Provider        | K8s Secret Key     |
|-----------------|--------------------|
| GitHub          | `github`           |
| GitLab          | `gitlab`           |
| BitBucket       | `bitbucket`        |
| BitBucketServer | `bitbucket-server` |
| Gogs            | `gogs`             |
| Azure DevOps    | `azure-username`   |
| Azure DevOps    | `azure-password`   |

For example, to create a secret containing a GitHub secret to validate the webhook payload, run:

```shell
kubectl create secret generic gitjob-webhook -n cattle-fleet-system --from-literal=github=webhooksecretvalue
```

For Azure DevOps:
- Enable basic authentication in Azure
- Create a secret containing the credentials for the basic authentication
```shell
kubectl create secret generic gitjob-webhook -n cattle-fleet-system --from-literal=azure-username=user --from-literal=azure-password=pass123
```

### 4. Go to your git provider and test the connection. You should get a HTTP response code.
