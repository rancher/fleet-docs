# Status Fields

## Cluster and Bundle Display States

Clusters and Bundles have different states in each phase of applying Bundles.

### Bundles

**Ready**: Bundles have been deployed and all resources are ready.

**NotReady**: Bundles have been deployed and some resources are not ready.

**WaitApplied**: Bundles have been synced from Fleet controller and downstream cluster, but are waiting to be deployed.

**ErrApplied**: Bundles have been synced from the Fleet controller and the downstream cluster, but there were some errors when deploying the Bundle.

**OutOfSync**: Bundles have been synced from Fleet controller, but downstream agent hasn't synced the change yet.

**Pending**: Bundles are being processed by Fleet controller.

**Modified**: Bundles have been deployed and all resources are ready, but there are some changes that were not made from the Git Repository.

### Clusters

**WaitCheckIn**: Waiting for agent to report registration information and cluster status back.

**NotReady**: There are bundles in this cluster that are in NotReady state.

**WaitApplied**: There are bundles in this cluster that are in WaitApplied state.

**ErrApplied**: There are bundles in this cluster that are in ErrApplied state.

**OutOfSync**: There are bundles in this cluster that are in OutOfSync state.

**Pending**: There are bundles in this cluster that are in Pending state.

**Modified**: There are bundles in this cluster that are in Modified state.

**Ready**: Bundles in this cluster have been deployed and all resources are ready.

## GitRepo Conditions

**Ready**:

**Active**:

**Reconciling**:

**Stalled**: for errors

## HelmOp Conditions

**Ready**: All bundle deployments are ready

**Accepted**: The HelmOp is able to properly manage deployments to target clusters. May be false if:
* Helm options are invalid
* a chart version cannot be resolved from those options
* an issue occurred when scheduling a polling job

**Polled**: `True` if polling is enabled and the last polling attempt was successful, `False` otherwise.
If polling is enabled, a `False` condition will contain an error message explaining the reason for the polling failure.

## Resources List

The resources lists contain the resources deployed to target clusters, categorized under `GitRepos` and `HelmOps`.

### GitRepos

The deployed resources are listed in `GitRepos` in `status.Resources`. This list is derived from `bundleDeployments`.

### HelmOps

Similarly to what happens for `GitRepos`, the deployed resources are listed in `HelmOps` in `status.Resources`.
This list is derived from `bundleDeployments`.

## Resource Counts

This shows how resource counts are propagated from one resource to another:
![Status Propagation](/img/FleetStatusSource.png)

### GitRepos

The `status.ResourceCounts` list for GitRepos is derived from `bundleDeployments`.

### HelmOps

The `status.ResourceCounts` list for HelmOps is derived from `bundleDeployments`.

### Clusters

In Clusters, the `status.ResourceCounts` list is derived from GitRepos.

### ClusterGroups

In ClusterGroups, the `status.ResourceCounts` list is also derived from GitRepos.
