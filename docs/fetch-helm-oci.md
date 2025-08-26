# Fetch Helm Charts from OCI Registries

Fleet supports pulling Helm charts stored in OCI registries. OCI registries are commonly used to store and distribute container images. By using them for Helm charts, you can apply the same packaging, authentication, and distribution methods you already use for container images.

Using OCI registry for Helm charts helps you:

* Store charts alongside container images in the same registry.  
* Use the same authentication and access control you already apply to container images.  
* Push and pull charts using standard OCI commands, making them easy to distribute across environments.  
* Manage charts in registries designed for high availability and global distribution.

![A visual asset displaying flow of fetching Helm charts from an OCI registry](../static/img/fetch-Helm-from-OCI.svg)

For example, if you manage multiple clusters with Fleet, developers can push Helm charts to an internal OCI registry. Fleet then pulls the charts directly from the registry and deploys them to downstream clusters.  
This approach avoids maintaining a separate chart repository and reuses your existing registry infrastructure.

## Helm chart in fleet.yaml

To fetch Helm chart, you reference the chart like this in a fleet.yaml file:

```bash
helm:
  chart: "oci://ghcr.io/fleetrepoci/guestbook"
```

You can use the version key to reference a specific chart version.

```bash
helm:
  chart: "oci://ghcr.io/fleetrepoci/guestbook"
  version: 0.1.0
```

Fleet pulls the chart from the OCI registry and deploys it to the targeted clusters.

## Using authenticated registries

If the OCI registry requires authentication, reference a Kubernetes secret in the GitRepo resource. Fleet uses this secret to pull the chart and deploy it to the targeted clusters.

For more information, refer to [fleet.yaml with authentication](gitrepo-add.md#using-private-helm-repositories).  
