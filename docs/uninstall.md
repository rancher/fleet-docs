# Uninstall

:::caution
Removing the CRDs will remove all deployed workloads.
:::

## Fleet Standalone

Fleet is packaged as two Helm charts so uninstall is accomplished by
uninstalling the appropriate Helm charts.

However Fleet uses finalizers, so uninstall workloads first to give the fleet controllers time to clean up.

```
kubectl delete clusters.fleet.cattle.io -A
kubectl delete gitrepos -A
kubectl delete bundles -A
```

Note, it can be easier to remove the namespaces containing the workloads, e.g.:

```
kubectl delete ns fleet-local
kubectl delete ns fleet-default
```

The custom resources are not uninstalled by Helm 3, remove them first:

```
kubectl delete crd gitrepos.fleet.cattle.io bundles.fleet.cattle.io contents.fleet.cattle.io \
  bundledeployments.fleet.cattle.io imagescans.fleet.cattle.io \
  bundlenamespacemappings.fleet.cattle.io gitreporestrictions.fleet.cattle.io \
  clusters.fleet.cattle.io clustergroups.fleet.cattle.io \
  clusterregistrations.fleet.cattle.io clusterregistrationtokens.fleet.cattle.io
```

Then uninstall Fleet run the following commands:

```shell
helm -n cattle-fleet-system uninstall fleet
helm -n cattle-fleet-system uninstall fleet-crd
```

:::note
If uninstall gets stuck it is likely due to finalizers. Resource status fields, e.g. on a namespace, will list the resources waiting for their finalizers to be removed. The finalizers can be removed manually with kubectl, if their controllers are no longer running.
:::

Afterwards one can also remove Fleet related namespaces and their content:

```
kubectl delete ns cattle-fleet-system
kubectl delete ns cattle-fleet-clusters-system
kubectl delete ns -l "fleet.cattle.io/managed=true"
```

## Fleet in Rancher

Fleet in Rancher cannot be uninstalled, without uninstalling Rancher. However, the GitOps feature can be disabled.
When disabled, the gitjob deployment is no longer deployed into the Rancher server’s local cluster, and continuous-delivery is not shown in the Rancher UI.

More information can be found in the Rancher docs, e.g. https://documentation.suse.com/cloudnative/rancher-manager/latest/en/rancher-admin/experimental-features/continuous-delivery.html

