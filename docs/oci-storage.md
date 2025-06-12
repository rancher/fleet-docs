# OCI Storage

OCI storage is an experimental feature to store a bundle's resources in an OCI registry, instead of k8s resources. Fleet stores Kubernetes bundle resources in etcd twice by default. This is done using the K8s API. However, etcd has storage limits and is not optimized for large workloads. As your deployments scale, it is more efficient to store these resources externally in an OCI (Open Container Initiative) registry.

Fleet won't be limited by [`etcd` size limitations](https://etcd.io/docs/v3.4/dev-guide/limit/). However, Fleet needs write access to a registry and that registry needs to be accessible by the agents in downstream clusters.

:::note
Fleet recommends you to compress and encode the bundle into base64 to reduce the resource size.
:::

If your bundle resource is greater than X MB(size), then it would be a better alternative to switch to OCI Registry as Storage. 

Using an OCI registry helps you:

* Reduce etcd load by offloading large bundle content.  
* Use a standardized storage backend for large manifests or Helm charts.

Once the OCI registry is enabled, Fleet will use it as the source for storing Bundle resources. When Fleet can't access the OCI registry, it won't fall back to default etcd storage. Instead, it logs errors.

![A visual asset displaying the flow of Fleet with OCI Storage.][../static/img/fleet-ociStorage-flow.png]

## Prerequisites

* A running OCI registry.  
* A Kubernetes secret with valid credentials.  
* A Fleet installation (v2.12.0 or later) .

## Creating an OCI Storage Secret

To enable OCI Storage, you have to define secrets. There are two ways of defining secrets

* **Global secret (ocistorage)** – Applies to all GitRepos in the namespace.  
* **GitRepo-level secret (ociRegistrySecret)** – Overrides the global secret for a specific GitRepo.

:::note
If the referenced secret doesn't exist or contains invalid credentials, Fleet logs an error and skips deployment. It doesn't fall back to etcd.
:::

### GitRepo Configuration Example

The GitRepo spec is extended with information about the OCI Registry. You must update your GitRepo resource to include a reference to the secret:

```yaml
metadata:
  name: coffee-shop-deployments
  namespace: fleet-local
spec:
  repo: https://github.com/example/coffee-shop-fleet
  branch: main
  paths:
    - ./manifests
  ociRegistrySecret: ocistorage
```

The `ociRegistrySecret` references a secret in the same namespace, which contains the address and credentials needed to read/write to the OCI registry. 

```yaml
apiVersion: fleet.cattle.io/v1alpha1
kind: Secret
metadata:
  name: ocistorage
  namespace: fleet-local
  labels:
    secrets.fleet.cattle.io/oci-registry: "true"
type: fleet.cattle.io/bundle-oci-storage/v1alpha1
data:
  reference: <base64-encoded-registry-url>
  username: <base64-encoded-user>
  password: <base64-encoded-password>
  insecureSkipTLS: <base64-encoded-true/false>
# Optional
  agentUsername: <base64-encoded-readonly-user>
  agentPassword: <base64-encoded-password>
```

:::note
If your user is not defined in the spec of the Repo. Then Fleet tries to use default credentials.
:::

You should follow these best practices:

* Use read-only `agentUsername` credentials for agents to enhance security.  
  * However, if you don’t send these credentials, the agent uses user credentials with read/write permissions.  
* Insecure TLS defaults to `false`, and http is disabled by default.   
  * Fleet allows these flags for development and testing purposes, but they should never be used in production.  
  * If you use these tags, you expose your app to security vulnerabilities, and put cluster workloads, and credentials at a risk of tampering with.  
* Changing the secret does not update the deployments, only on the next git update it would use the new storage registry.  

Just like an existing gitcredentials secret is used for GitRepos client SecretName, an existing ocistorage secrets secret will be used if the `ociRegistrySecret` is empty.


:::note
Fleet checks for the integrity of OCI artifacts and Fleet tags OCI artifact as Latest
:::

### Fleet Example

Consider the frontend-deployment.yaml file in fleet-examples repository. 

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: fleet-frontend
  labels:
    app: fleet-frontend
spec:
  replicas: 1
  selector:
    matchLabels:
      app: fleet-frontend
  template:
    metadata:
      labels:
        app: fleet-frontend
    spec:
      containers:
        - name: fleet-frontend
          image: nginx
```

To define OCI Secret, you must create an oci-secret.yaml file

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: ocistorage
  namespace: fleet-local
type: fleet.cattle.io/bundle-oci-storage/v1alpha1
data:
  reference: <base64-encoded-registry-url>
  username: <base64-encoded-user>
  password: <base64-encoded-password>
  insecureSkipTLS: dHJ1ZQ==
     basicHTTP: ZmFsc2U=
  agentUsername: <base64-encoded-readonly-user>
  agentPassword: <base64-encoded-password>
```

Run `kubectl apply -f secrets/oci-secret.yaml` before applying the GitRepo.

To validate your secret, you can run:

`kubectl get secret ocistorage -n fleet-local -o yaml`

![A screenshot of OCI secrets enabled for Fleet][../static/img/ociSecret-fleet-ss.png]
