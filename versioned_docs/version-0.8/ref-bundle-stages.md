# Bundle Lifecycle

A bundle is an internal resource used for the orchestration of resources from git. When a GitRepo is scanned it will produce one or more bundles.

To demonstrate the life cycle of a Fleet bundle, we will use [multi-cluster/helm](https://github.com/rancher/fleet-examples/tree/master/multi-cluster/helm) as a case study.

1. User will create a [GitRepo](./gitrepo-add.md#create-gitrepo-instance) that points to the multi-cluster/helm repository.
2. The `gitjob-controller` will sync changes from the GitRepo and detect changes from the polling or [webhook event](./webhook.md). With every commit change, the `gitjob-controller` will create a job that clones the git repository, reads content from the repo such as `fleet.yaml` and other manifests, and creates the Fleet [bundle](./cluster-bundles-state.md#bundles).

>**Note:** The job pod with the image name `rancher/tekton-utils` will be under the same namespace as the GitRepo.

3. The `fleet-controller` then syncs changes from the bundle. According to the targets, the `fleet-controller` will create `BundleDeployment` resources, which are a combination of a bundle and a target cluster.
4. The `fleet-agent` will then pull the `BundleDeployment` from the Fleet controlplane. The agent deploys bundle manifests as a [Helm chart](https://helm.sh/docs/intro/install/) from the `BundleDeployment` into the downstream clusters.
5. The `fleet-agent` will continue to monitor the application bundle and report statuses back in the following order: bundledeployment > bundle > GitRepo > cluster.


This diagram shows the different rendering stages a bundle goes through until deployment.

![Bundle Stages](/img/FleetBundleStages.svg)
