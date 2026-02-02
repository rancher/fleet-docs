# Using Webhooks Instead of Polling

By default, Fleet utilizes polling (default: every 15 seconds) to pull from a Git repo. This is a convenient default that works reasonably well for a small number of repos (up to a few tens).

At higher workloads, Fleet optimizes webhook processing by combining status updates and patch operations into a single request. This reduces update conflicts and race conditions when multiple commits trigger rapid updates, and it improves reliability in large-scale deployments.

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

If you want to have the webhook available using the same host name as your Rancher or another service, you can use the following YAML with the URL http://your.domain.com/gitjob. The below YAML is specific for the Nginx Ingress Controller:

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  annotations:
    nginx.ingress.kubernetes.io/use-regex: "true"
    nginx.ingress.kubernetes.io/rewrite-target: /$2
  name: webhook-ingress
  namespace: cattle-fleet-system
spec:
  rules:
  - host: your.domain.com
    http:
      paths:
        - path: /gitjob(/|$)(.*)
          pathType: ImplementationSpecific
          backend:
            service:
              name: gitjob
              port:
                number: 80
```

:::info

You can configure [TLS](https://kubernetes.io/docs/concepts/services-networking/ingress/#tls) on ingress.

:::

### 2. Go to your webhook provider and configure the webhook callback url. Here is a Github example.

![](../../static/img/webhook.png)

Configuring a secret is optional. This is used to validate the webhook payload as the payload should not be trusted by default.
If your webhook server is publicly accessible to the Internet, then it is recommended to configure the secret. If you do configure the
secret, follow step 3.

:::note

only application/json is supported due to the limitation of webhook library.

:::

:::caution

If you configured the webhook the polling interval will be automatically adjusted to 1 hour.

:::

### 3. (Optional) Configure a webhook secret. 
The secret is for validating the webhook payload.
The secret must contain the designated key for the desired provider. The list of providers with their corresponding keys is as follows.

| Provider        | K8s Secret Key     |
|-----------------|--------------------|
| GitHub          | `github`           |
| GitLab          | `gitlab`           |
| BitBucket       | `bitbucket`        |
| BitBucketServer | `bitbucket-server` |
| Gogs            | `gogs`             |
| Azure DevOps    | `azure-username`   |
| Azure DevOps    | `azure-password`   |

#### Option 1: Configure a cluster secret.  
In this case, the secret is unique per cluster, and all GitRepos will use the same one. The user does not need to reference it at all; when a payload is received for a specific provider, the system checks if the global secret exists, and if so, whether the key for that provider also exists. If the key is present, the secret will be used to validate the payload.

Make sure to put it in a k8s secret called `gitjob-webhook` in `cattle-fleet-system`.

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

#### Option 2. Define a secret for each GitRepo.
Alternatively, you can define a Webhook secret for each GitRepo. The secret must be created in the same namespace as the GitRepo, with the desired name, and then you can reference it in the `webhookSecret` field in the GitRepo specification.

Example:
```yaml
apiVersion: fleet.cattle.io/v1alpha1
kind: GitRepo
metadata:
  name: simple
  namespace: fleet-local
spec:
  repo: "https://github.com/rancher/fleet-examples"
  paths:
  - simple
  disablePolling: true
  webhookSecret: webhook-secret-name
```
If both exist — the global secret for the cluster and a secret defined for the GitRepo — the latter will take precedence.

### 4. Go to your git provider and test the connection. You should get a HTTP response code.
