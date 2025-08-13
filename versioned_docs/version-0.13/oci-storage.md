# OCI Storage

Fleet stores Kubernetes bundle resources in etcd by default. However, etcd has strict size limits and is not optimized for large workloads. If your bundle resources exceed the etcd size limits in the target cluster, consider using an OCI registry as the storage backend.

:::note
To reduce bundle size, compress and base64-encode bundle content before uploading to the OCI registry.
:::

Using an OCI registry helps you:

* Reduce etcd load by offloading large bundle content.  
* Use a standardized storage backend for large manifests or Helm charts.

![A visual asset displaying the flow of Fleet with OCI Storage.](../../static/img/fleet-ociStorage-flow.png)

:::note
Fleet checks for the integrity of OCI artifacts and Fleet tags OCI artifact as `latest`.
:::

## Prerequisites

* A running OCI registry.  
* A Kubernetes secret with valid credentials.  
* A Fleet installation (v2.12.0 or later) .

## How to enable OCI storage

To enable OCI storage, create a secret that includes the necessary information and access options for the OCI registry. There are two ways of defining secrets:

* **Global secret:** A secret exactly named `ocistorage` in the same namespace as your `GitRepo`s.
  * This is the fallback secret. If no `GitRepo`-level secret is specified, Fleet uses this secret for all `GitRepo`s in the namespace.  
* **GitRepo-level secret:** A custom secret for specific `GitRepo` resouces.
  * This is a user-defined secret can have any name and must be referenced in the `GitRepo` resource. 
  * Set the `ociRegistrySecret` field in the `GitRepo` spec to the secret’s name.

:::note
Fleet does not fall back to etcd if the secret is missing or invalid. Instead, it logs an error and skips the deployment.
:::

Create a Kubernetes Secret that contains the registry address and optional credentials:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: ocistorage
  namespace: fleet-local
type: fleet.cattle.io/bundle-oci-storage/v1alpha1
data:
  reference: <base64-encoded-registry-url> # Only the reference field is required. All other fields are optional. 
  username: <base64-encoded-user>
  password: <base64-encoded-password>
  insecureSkipTLS: <base64-encoded-true/false>
  basicHTTP: <base64-encoded-true/false>
  agentUsername: <base64-encoded-readonly-user>
  agentPassword: <base64-encoded-password>
```

:::note
The secret must have the type: `fleet.cattle.io/bundle-oci-storage/v1alpha1`. Fleet requires this value and rejects any secret with a different type.
:::

Changing the secret does not trigger a redeployment. Fleet uses the new registry only after a Git update or a manual force update.

### Secret Field Reference
The fields you can configure are:

| Field | Description | Format | Notes |
| -- | ---- | -- | ------ |
| `reference`       | URL of the OCI registry.                    | Base64-encoded string       | Do not use `oci://` or similar prefixes.                  |
| `username`        | Username with write access to the registry. | Base64-encoded string       | If not specified, Fleet accesses the registry without authentication.|
| `password`        | Password for the write-access user.         | Base64-encoded string       | If not specified, Fleet accesses the registry without authentication.|
| `agentUsername`   | Read-only username for agents.              | Base64-encoded string       | Use read-only credentials for agents to enhance security. If you don’t set these credentials, the agent uses username.     |
| `agentPassword`   | Read-only password for agents.              | Base64-encoded string       | Use read-only credentials for agents to enhance security. If you don’t set these credentials, the agent uses user password.     |
| `insecureSkipTLS` | Skips TLS certificate validation.           | Base64-encoded `true/false` | Use only for development or testing. By default, `InsecureSkipTLS` is set to `false`. |
| `basicHTTP`       | Enables HTTP instead of HTTPS.              | Base64-encoded `true/false` | Not recommended. Allows insecure traffic. By default, `basicHTTP` is set to `false`. |

## Fleet Example

Consider the following `GitRepo` file:

```yaml
apiVersion: fleet.cattle.io/v1alpha1
kind: GitRepo
metadata:
  name: frontend-oci
  namespace: fleet-local
spec:
  repo: https://github.com/your-org/fleet-oci-example.git
  branch: main
  paths:
    - ./frontend
  ociRegistrySecret: ocistorage
```

You can either create and apply a YAML file that contains the registry address and optional credentials similar to the example above. Then run `kubectl apply -f secrets/oci-secret.yaml` before applying the `GitRepo`.

Or you can use `kubectl` command to create the secret using unencoded text. Kubernetes converts them to base64 encoded for storing the secret.

```bash
kubectl -n fleet-local create secret generic ocistorage \
  --type=fleet.cattle.io/bundle-oci-storage/v1alpha1 \
  --from-literal=username=fleet-ci \
  --from-literal=password=fleetRocks \
  --from-literal=reference=192.168.1.39:8082 \
  --from-literal=insecureSkipTLS=true \
  --from-literal=basicHTTP=false \
  --from-literal=agentUsername=fleet-ci-readonly \
  --from-literal=agentPassword=readonlypass
```

To validate your secret, you can run:

`kubectl get secret ocistorage -n fleet-local -o yaml`

To decrypt your secret, you can run:

`kubectl get secret ocistorage -n fleet-local -o json | jq '.data | map_values(@base64d)`

![A screenshot of OCI secrets enabled for Fleet](../../static/img/ociStorage-secret-ss.png)
