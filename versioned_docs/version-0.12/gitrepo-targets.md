# Mapping to Downstream Clusters

[Fleet in Rancher](https://rancher.com/docs/rancher/v2.6/en/deploy-across-clusters/fleet/) allows users to manage clusters easily as if they were one cluster. Users can deploy bundles, which can be comprised of deployment manifests or any other Kubernetes resource, across clusters using grouping configuration.

:::info

__Multi-cluster Only__:
This approach only applies if you are running Fleet in a multi-cluster style
If no targets are specified, i.e. when using a single-cluster, the bundles target the default cluster group.

:::

When deploying `GitRepos` to downstream clusters the clusters must be mapped to a target.

## Defining Targets

The deployment targets of `GitRepo` is done using the `spec.targets` field to
match clusters or cluster groups. The YAML specification is as below.

```yaml
kind: GitRepo
apiVersion: fleet.cattle.io/v1alpha1
metadata:
  name: myrepo
  namespace: clusters
spec:
  repo: https://github.com/rancher/fleet-examples
  paths:
  - simple

  # Targets are evaluated in order and the first one to match is used. If
  # no targets match then the evaluated cluster will not be deployed to.
  targets:
  # The name of target. This value is largely for display and logging.
  # If not specified a default name of the format "target000" will be used
  - name: prod
    # A selector used to match clusters.  The structure is the standard
    # metav1.LabelSelector format. If clusterGroupSelector or clusterGroup is specified,
    # clusterSelector will be used only to further refine the selection after
    # clusterGroupSelector and clusterGroup is evaluated.
    clusterSelector:
      matchLabels:
        env: prod
    # A selector used to match cluster groups.
    clusterGroupSelector:
      matchLabels:
        region: us-east
    # A specific clusterGroup by name that will be selected
    clusterGroup: group1
    # A specific cluster by name that will be selected
    clusterName: cluster1
```

## Target Matching

All clusters and cluster groups in the same namespace as the `GitRepo` will be evaluated against all targets.
If any of the targets match the cluster then the `GitRepo` will be deployed to the downstream cluster. If
no match is made, then the `GitRepo` will not be deployed to that cluster.

There are three approaches to matching clusters.
One can use cluster selectors, cluster group selectors, or an explicit cluster group name.  All criteria is additive so
the final match is evaluated as "clusterSelector && clusterGroupSelector && clusterGroup".  If any of the three have the
default value it is dropped from the criteria.  The default value is either null or "".  It is important to realize
that the value `{}` for a selector means "match everything."

```yaml
targets:
  # Match everything
  - clusterSelector: {}
  # Selector ignored
  - clusterSelector: null
```

You can also match clusters by name:

```yaml
targets:
  - clusterName: fleetname
```
When using Fleet in Rancher, make sure to put the name of the `clusters.fleet.cattle.io` resource.

## Default Target

If no target is set for the `GitRepo` then the default targets value is applied.  The default targets value is as below.

```yaml
targets:
- name: default
  clusterGroup: default
```

This means if you wish to setup a default location non-configured GitRepos will go to, then just create a cluster group called default
and add clusters to it.

## Customization per Cluster

:::info

The `targets:` in the `GitRepo` resource select clusters to deploy on. The `targetCustomizations:` in `fleet.yaml` override Helm values only and do not change targeting.

:::

To demonstrate how to deploy Kubernetes manifests across different clusters with customization using Fleet, we will use [multi-cluster/helm/fleet.yaml](https://github.com/rancher/fleet-examples/blob/master/multi-cluster/helm/fleet.yaml).

**Situation:** User has three clusters with three different labels: `env=dev`, `env=test`, and `env=prod`. User wants to deploy a frontend application with a backend database across these clusters.

**Expected behavior:**

- After deploying to the `dev` cluster, database replication is not enabled.
- After deploying to the `test` cluster, database replication is enabled.
- After deploying to the `prod` cluster, database replication is enabled and Load balancer services are exposed.

**Advantage of Fleet:**

Instead of deploying the app on each cluster, Fleet allows you to deploy across all clusters following these steps:

1. Deploy gitRepo `https://github.com/rancher/fleet-examples.git` and specify the path `multi-cluster/helm`.
2. Under `multi-cluster/helm`, a Helm chart will deploy the frontend app service and backend database service.
3. The following rule will be defined in `fleet.yaml`:

```
targetCustomizations:
- name: dev
  helm:
    values:
      replication: false
  clusterSelector:
    matchLabels:
      env: dev

- name: test
  helm:
    values:
      replicas: 3
  clusterSelector:
    matchLabels:
      env: test

- name: prod
  helm:
    values:
      serviceType: LoadBalancer
      replicas: 3
  clusterSelector:
    matchLabels:
      env: prod
```

**Result:**

Fleet will deploy the Helm chart with your customized `values.yaml` to the different clusters.

>**Note:** Configuration management is not limited to deployments but can be expanded to general configuration management. Fleet is able to apply configuration management through customization among any set of clusters automatically.

### Supported Customizations

* [DefaultNamespace](/ref-crds#bundledeploymentoptions)
* [ForceSyncGeneration](/ref-crds#bundledeploymentoptions)
* [KeepResources](/ref-crds#bundledeploymentoptions)
* [ServiceAccount](/ref-crds#bundledeploymentoptions)
* [TargetNamespace](/ref-crds#bundledeploymentoptions)
* [Helm.Atomic](/ref-crds#helmoptions)
* [Helm.Chart](/ref-crds#helmoptions)
* [Helm.DisablePreProcess](/ref-crds#helmoptions)
* [Helm.Force](/ref-crds#helmoptions)
* [Helm.ReleaseName](/ref-crds#helmoptions)
* [Helm.Repo](/ref-crds#helmoptions)
* [Helm.TakeOwnership](/ref-crds#helmoptions)
* [Helm.TimeoutSeconds](/ref-crds#helmoptions)
* [Helm.ValuesFrom](/ref-crds#helmoptions)
* [Helm.Values](/ref-crds#helmoptions)
* [Helm.Version](/ref-crds#helmoptions)

  :::warning important information
  Overriding the version of a Helm chart via target customizations will lead to bundles containing _all_ versions, ie the
  default one and the custom one(s), of the chart, to accommodate all clusters. This in turn means that Fleet will
  deploy larger bundles.

  As Fleet stores bundles via etcd, this may cause issues on some clusters where resultant bundle sizes may exceed
  etcd's configured maximum blob size. Refer to [request entity too large #1650 issue](https://github.com/rancher/fleet/issues/1650) for more details.
  :::

* [Helm.WaitForJobs](/ref-crds#helmoptions)
* [Kustomize.Dir](/ref-crds#kustomizeoptions)
* [YAML.Overlays](/ref-crds#yamloptions)
* [Diff.ComparePatches](/ref-crds#diffoptions)


## Additional Examples

Examples using raw Kubernetes YAML, Helm charts, Kustomize, and combinations
of the three are in the [Fleet Examples repo](https://github.com/rancher/fleet-examples/).
