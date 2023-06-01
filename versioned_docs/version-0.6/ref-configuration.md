# Configuration

A reference list of, mostly internal, configuration options.

## Helm Charts

The Helm charts accept, at least, the options as shown with their default in `values.yaml`:

* https://github.com/rancher/fleet/blob/master/charts/fleet/values.yaml
* https://github.com/rancher/fleet/blob/master/charts/fleet-crds/values.yaml
* https://github.com/rancher/fleet/blob/master/charts/fleet-agent/values.yaml

## Environment Variables

The controllers can be started with these environment variables:

* `CATTLE_DEV_MODE` - used to debug wrangler, not usable
* `FLEET_CLUSTER_ENQUEUE_DELAY` - tune how often non-ready clusters are checked
* `FLEET_CPU_PPROF_PERIOD` - used to turn on [performance profiling](https://github.com/rancher/fleet/blob/master/docs/performance.md)

## Configuration

In cluster configuration for the agent and fleet manager. Changing these can lead to full re-deployments.

The config [struct](https://github.com/rancher/fleet/blob/master/pkg/config/config.go#L40-L52) is used in both config maps:

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

