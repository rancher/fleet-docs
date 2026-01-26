# Automatically copying resources to downstream clusters

:::warning
This is an experimental feature.
:::

From Fleet v0.14.0 onwards, Fleet supports propagating external resources to downstream clusters.

This simplifies dealing with dependencies of charts, such as values coming from external resources.
See also [valuesFrom](gitrepo-content#using-valuesfrom).

## How it works

HelmOps support a new `downstreamResources` field, which can be used to reference resources by kind and name.
Those resources must:
* Be either secrets or config maps. No other `kind`s are currently supported.
* Exist before being referenced from the HelmOp, and live in the same namespace as the HelmOp referencing them.

Example:
```yaml
apiVersion: fleet.cattle.io/v1alpha1
kind: HelmOp
[...] # metadata
spec:
  helm:
    [...] # Helm options
  downstreamResources:
    - kind: Secret
      name: my-secret
    - kind: ConfigMap
      name: my-config
```

This instructs the Fleet controller to copy those resources to each targeted downstream cluster, before deploying the
workload (in this case specified through a Helm chart) to said downstream cluster.

When a cluster is not targeted anymore, the Fleet agent will delete those resources from the cluster as well. They will
remain on the upstream cluster, though.

:::note
If resources referenced through `downstreamResources` should stay on downstream clusters even after they are no longer
targeted, [keepResources](./ref-bundle) should be set to `true` on the HelmOp.
:::


## Monitoring

From version v0.15.0 onwards, Fleet monitors changes made to secrets and configmaps that are listed in `DownstreamResources`. It also checks whether a secret or configmap was created after the Bundle was created.
