# Configuration

A reference list of, mostly internal, configuration options.

## Configure Fleet Install Options In Rancher

Rancher looks for Helm values in a ConfigMap called `rancher-config` in the `cattle-system` namespace.
Any Helm chart value for Fleet can be specified under the name of the chart. Note the value of the fleet key is a string.

A `rancher-config` could look like this, after adding some options:

```
kind: ConfigMap
apiVersion: v1
metadata:
  name: rancher-config
  namespace: cattle-system
data:
  fleet: |
    controller:
      reconciler:
        workers:
          gitrepo: "50"
          bundle: "50"
          bundledeployment: "50"
  priorityClassName: rancher-critical

```

The `rancher-config` resource is created by the Rancher chart and can be patched:


```
kubectl patch cm -n cattle-system rancher-config --type merge \
  --patch '{"data":{"fleet": "controller:\n  reconciler:\n    workers:\n      gitrepo: \"200\"\n      bundle: \"200\"\n      bundledeployment: \"200\"\n"}}'
```

## Helm Charts

The Helm charts accept, at least, the options as shown with their default in `values.yaml`:

* https://github.com/rancher/fleet/blob/main/charts/fleet/values.yaml
* https://github.com/rancher/fleet/blob/main/charts/fleet-crd/values.yaml
* https://github.com/rancher/fleet/blob/main/charts/fleet-agent/values.yaml

## Environment Variables

The controllers can be started with these environment variables:

* `CATTLE_DEV_MODE` - used to debug wrangler, not usable
* `FLEET_CLUSTER_ENQUEUE_DELAY` - tune how often non-ready clusters are checked
* `FLEET_CPU_PPROF_PERIOD` - used to turn on [performance profiling](https://github.com/rancher/fleet/blob/main/docs/performance.md)

## Configuration

In cluster configuration for the agent and fleet manager. Changing these can lead to full re-deployments.

The config [struct](https://github.com/rancher/fleet/blob/main/internal/config/config.go#L57) is used in both config maps:

* cattle-fleet-system/fleet-agent
* cattle-fleet-system/fleet-controller

## Labels

Labels used by fleet:

* `fleet.cattle.io/agent=true` - NodeSelector label for agent's deployment affinity setting
* `fleet.cattle.io/non-managed-agent` - managed agent bundle won't target Clusters with this label
* `fleet.cattle.io/repo-name` - used on Bundle to reference the git repo resource
* `fleet.cattle.io/bundle-namespace` - used on BundleDeployment to reference the Bundle resource
* `fleet.cattle.io/bundle-name` - used on BundleDeployment to reference the Bundle resource
* `fleet.cattle.io/managed=true` - cluster namespaces with this label will be cleaned up. Other resources will be cleaned up if it is in a label. Used in Rancher to identify fleet namespaces.
* `fleet.cattle.io/bootstrap-token` - unused
* `fleet.cattle.io/shard-id=<shard-id>` - The shard ID of a fleet controller pod.
* `fleet.cattle.io/shard-default=true` - true if this is the controller managing resources without a shard reference label.
* `fleet.cattle.io/shard-ref=<shard-id>` - references the Shard ID assigned by
  Fleet to resources, inherited from a `GitRepo`, which determines which Fleet controller deployment will reconcile them.
    * If this label is not provided or has an empty value, then the unsharded Fleet controller will process the resource.
    * If this label has a value which does not match any shard ID for which a Fleet controller is deployed, then the
      resource will not be processed.


## Annotations

Annotations used by fleet:

* `fleet.cattle.io/agent-namespace`
* `fleet.cattle.io/bundle-id`
* `fleet.cattle.io/cluster`, `fleet.cattle.io/cluster-namespace` - used on a cluster namespace to reference the cluster registration namespace and cluster name
* `fleet.cattle.io/cluster-group`
* `fleet.cattle.io/cluster-registration-namespace`
* `fleet.cattle.io/cluster-registration`
* `fleet.cattle.io/commit`
* `fleet.cattle.io/managed` - appears unused
* `fleet.cattle.io/service-account`

## Fleet agent configuration

Tolerations, affinity and resources can be customized for the Fleet agent. These fields can be provided when creating a
[Cluster](https://fleet.rancher.io/ref-crds#clusterspec), see [Registering Downstream Cluster](https://fleet.rancher.io/cluster-registration) for more info on how to create
Clusters. Default configuration will be used if these fields are not provided.

If you change the resources limits, make sure the limits allow the fleet-agent to work normally.

Keep in mind that if you downgrade Fleet to a previous version than v0.7.0 Fleet will fallback to the built-in defaults.
Agents will redeploy if they had custom affinity. If Fleet version number does not change, redeployment might not be immediate.
