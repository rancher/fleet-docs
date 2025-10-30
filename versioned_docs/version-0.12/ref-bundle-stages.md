# Bundle Lifecycle

A bundle is an internal resource used for the orchestration of resources from git. When a GitRepo is scanned it will produce one or more bundles.

To demonstrate the life cycle of a Fleet bundle, we will use [multi-cluster/helm](https://github.com/rancher/fleet-examples/tree/master/multi-cluster/helm) as a case study.

1. User will create a [GitRepo](./gitrepo-add.md#create-gitrepo-instance) that points to the multi-cluster/helm repository.
2. The `gitjob-controller` will sync changes from the GitRepo and detect changes from the polling or [webhook event](./webhook.md). With every commit change, the `gitjob-controller` will create a job that clones the git repository, reads content from the repo such as `fleet.yaml` and other manifests, and creates the Fleet [bundle](./ref-status-fields.md#bundles).

>**Note:** The job pod with the image name `rancher/tekton-utils` will be under the same namespace as the GitRepo.

3. The `fleet-controller` then syncs changes from the bundle. According to the targets, the `fleet-controller` will create `BundleDeployment` resources, which are a combination of a bundle and a target cluster.
4. The `fleet-agent` will then pull the `BundleDeployment` from the Fleet controlplane. The agent deploys bundle manifests as a [Helm chart](https://helm.sh/docs/intro/install/) from the `BundleDeployment` into the downstream clusters.
5. The `fleet-agent` will continue to monitor the application bundle and report statuses back in the following order: bundledeployment > bundle > GitRepo > cluster.


This diagram shows the different rendering stages a bundle goes through until deployment.

![Bundle Stages](/img/FleetBundleStages.svg)

## Examining the Bundle Lifecycle With the CLI

Several fleet CLI commands help with debugging bundles.

### fleet apply

[Apply](./cli/fleet-cli/fleet_apply.md) renders a folder with Kubernetes resources, such as a Helm chart, manifests, or kustomize folders, into a Fleet bundle resource.

```
git clone https://github.com/rancher/fleet-test-data
cd fleet-test-data
fleet apply -n fleet-local -o bundle.yaml testbundle simple-chart/
```

More information on how to create bundles with `fleet apply` can be found in the [section on bundles](./bundle-add.md).

### fleet target

[Target](./cli/fleet-cli/fleet_target.md) reads a bundle from a file and works with a live cluster to print out the `bundledeployment` & `content` resource, which fleetcontroller would create. It takes a namespace as an argument, so it can look in that namespace for e.g. cluster resources. It can also dump the data structure which is used during "targeting", so decisions taken regarding labels and cluster names can be checked.

### fleet deploy

[Deploy](./cli/fleet-cli/fleet_deploy.md) takes the output of `fleet target`, or a dumped bundledeployment/content resource and deploys it to a cluster, just like fleet-agent would. It supports a dry run mode, to print out the resources which would be created, instead of installing them with helm. Since the command doesn't create the input resources, a running fleet-agent would likely garbage collect the deployment.

The deploy command can be used to bring bundles to air-gapped clusters.

### Lifecycle CLI Example

```
git clone https://github.com/rancher/fleet-test-data
cd fleet-test-data
# for information about apply see https://fleet.rancher.io/bundle-add
fleet apply -n fleet-local -o bundle.yaml testbundle simple-chart/
fleet target --bundle-file bundle.yaml --list-inputs  > bd.yaml
fleet deploy --input-file bd.yaml --dry-run
```
