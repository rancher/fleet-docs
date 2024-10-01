# Custom Resources Spec

* [Bundle](#bundle)
* [BundleDeployment](#bundledeployment)
* [BundleNamespaceMapping](#bundlenamespacemapping)
* [Cluster](#cluster)
* [ClusterGroup](#clustergroup)
* [ClusterRegistration](#clusterregistration)
* [ClusterRegistrationToken](#clusterregistrationtoken)
* [Content](#content)
* [GitRepo](#gitrepo)
* [GitRepoRestriction](#gitreporestriction)
* [ImageScan](#imagescan)

# Sub Resources

* [BundleDisplay](#bundledisplay)
* [BundleRef](#bundleref)
* [BundleResource](#bundleresource)
* [BundleSpec](#bundlespec)
* [BundleStatus](#bundlestatus)
* [BundleSummary](#bundlesummary)
* [BundleTarget](#bundletarget)
* [BundleTargetRestriction](#bundletargetrestriction)
* [NonReadyResource](#nonreadyresource)
* [Partition](#partition)
* [PartitionStatus](#partitionstatus)
* [ResourceKey](#resourcekey)
* [RolloutStrategy](#rolloutstrategy)
* [BundleDeploymentDisplay](#bundledeploymentdisplay)
* [BundleDeploymentOptions](#bundledeploymentoptions)
* [BundleDeploymentResource](#bundledeploymentresource)
* [BundleDeploymentSpec](#bundledeploymentspec)
* [BundleDeploymentStatus](#bundledeploymentstatus)
* [ComparePatch](#comparepatch)
* [ConfigMapKeySelector](#configmapkeyselector)
* [DiffOptions](#diffoptions)
* [HelmOptions](#helmoptions)
* [IgnoreOptions](#ignoreoptions)
* [KustomizeOptions](#kustomizeoptions)
* [LocalObjectReference](#localobjectreference)
* [ModifiedStatus](#modifiedstatus)
* [NonReadyStatus](#nonreadystatus)
* [Operation](#operation)
* [SecretKeySelector](#secretkeyselector)
* [ValuesFrom](#valuesfrom)
* [YAMLOptions](#yamloptions)
* [AgentStatus](#agentstatus)
* [ClusterDisplay](#clusterdisplay)
* [ClusterSpec](#clusterspec)
* [ClusterStatus](#clusterstatus)
* [ClusterGroupDisplay](#clustergroupdisplay)
* [ClusterGroupSpec](#clustergroupspec)
* [ClusterGroupStatus](#clustergroupstatus)
* [ClusterRegistrationSpec](#clusterregistrationspec)
* [ClusterRegistrationStatus](#clusterregistrationstatus)
* [ClusterRegistrationTokenSpec](#clusterregistrationtokenspec)
* [ClusterRegistrationTokenStatus](#clusterregistrationtokenstatus)
* [CommitSpec](#commitspec)
* [CorrectDrift](#correctdrift)
* [GitRepoDisplay](#gitrepodisplay)
* [GitRepoResource](#gitreporesource)
* [GitRepoResourceCounts](#gitreporesourcecounts)
* [GitRepoSpec](#gitrepospec)
* [GitRepoStatus](#gitrepostatus)
* [GitTarget](#gittarget)
* [ResourcePerClusterState](#resourceperclusterstate)
* [AlphabeticalPolicy](#alphabeticalpolicy)
* [ImagePolicyChoice](#imagepolicychoice)
* [ImageScanSpec](#imagescanspec)
* [ImageScanStatus](#imagescanstatus)
* [SemVerPolicy](#semverpolicy)
* [FleetYAML](#fleetyaml)
* [ImageScanYAML](#imagescanyaml)

#### Bundle

Bundle contains the resources of an application and its deployment options. It will be deployed as a Helm chart to target clusters.

When a GitRepo is scanned it will produce one or more bundles. Bundles are a collection of resources that get deployed to one or more cluster(s). Bundle is the fundamental deployment unit used in Fleet. The contents of a Bundle may be Kubernetes manifests, Kustomize configuration, or Helm charts. Regardless of the source the contents are dynamically rendered into a Helm chart by the agent and installed into the downstream cluster as a Helm release.

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| metadata |  | metav1.ObjectMeta | false |
| spec |  | [BundleSpec](#bundlespec) | true |
| status |  | [BundleStatus](#bundlestatus) | true |

[Back to Custom Resources](#custom-resources-spec)

#### BundleDisplay

BundleDisplay contains the number of ready, desiredready clusters and a summary state for the bundle.

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| readyClusters | ReadyClusters is a string in the form \"%d/%d\", that describes the number of clusters that are ready vs. the number of clusters desired to be ready. | string | false |
| state | State is a summary state for the bundle, calculated over the non-ready resources. | string | false |

[Back to Custom Resources](#custom-resources-spec)

#### BundleRef



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| name | Name of the bundle. | string | false |
| selector | Selector matching bundle's labels. | *metav1.LabelSelector | false |

[Back to Custom Resources](#custom-resources-spec)

#### BundleResource

BundleResource represents the content of a single resource from the bundle, like a YAML manifest.

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| name | Name of the resource, can include the bundle's internal path. | string | false |
| content | The content of the resource, can be compressed. | string | false |
| encoding | Encoding is either empty or \"base64+gz\". | string | false |

[Back to Custom Resources](#custom-resources-spec)

#### BundleSpec



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| paused | Paused if set to true, will stop any BundleDeployments from being updated. It will be marked as out of sync. | bool | false |
| rolloutStrategy | RolloutStrategy controls the rollout of bundles, by defining partitions, canaries and percentages for cluster availability. | *[RolloutStrategy](#rolloutstrategy) | false |
| resources | Resources contains the resources that were read from the bundle's path. This includes the content of downloaded helm charts. | \[\][BundleResource](#bundleresource) | false |
| targets | Targets refer to the clusters which will be deployed to. Targets are evaluated in order and the first one to match is used. | \[\][BundleTarget](#bundletarget) | false |
| targetRestrictions | TargetRestrictions is an allow list, which controls if a bundledeployment is created for a target. | \[\][BundleTargetRestriction](#bundletargetrestriction) | false |
| dependsOn | DependsOn refers to the bundles which must be ready before this bundle can be deployed. | \[\][BundleRef](#bundleref) | false |

[Back to Custom Resources](#custom-resources-spec)

#### BundleStatus



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| conditions | Conditions is a list of Wrangler conditions that describe the state of the bundle. | []genericcondition.GenericCondition | false |
| summary | Summary contains the number of bundle deployments in each state and a list of non-ready resources. | [BundleSummary](#bundlesummary) | false |
| newlyCreated | NewlyCreated is the number of bundle deployments that have been created, not updated. | int | false |
| unavailable | Unavailable is the number of bundle deployments that are not ready or where the AppliedDeploymentID in the status does not match the DeploymentID from the spec. | int | true |
| unavailablePartitions | UnavailablePartitions is the number of unavailable partitions. | int | true |
| maxUnavailable | MaxUnavailable is the maximum number of unavailable deployments. See rollout configuration. | int | true |
| maxUnavailablePartitions | MaxUnavailablePartitions is the maximum number of unavailable partitions. The rollout configuration defines a maximum number or percentage of unavailable partitions. | int | true |
| maxNew | MaxNew is always 50. A bundle change can only stage 50 bundledeployments at a time. | int | false |
| partitions | PartitionStatus lists the status of each partition. | \[\][PartitionStatus](#partitionstatus) | false |
| display | Display contains the number of ready, desiredready clusters and a summary state for the bundle's resources. | [BundleDisplay](#bundledisplay) | false |
| resourceKey | ResourceKey lists resources, which will likely be deployed. The actual list of resources on a cluster might differ, depending on the helm chart, value templating, etc.. | \[\][ResourceKey](#resourcekey) | false |
| observedGeneration | ObservedGeneration is the current generation of the bundle. | int64 | true |

[Back to Custom Resources](#custom-resources-spec)

#### BundleSummary

BundleSummary contains the number of bundle deployments in each state and a list of non-ready resources. It is used in the bundle, clustergroup, cluster and gitrepo status.

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| notReady | NotReady is the number of bundle deployments that have been deployed where some resources are not ready. | int | false |
| waitApplied | WaitApplied is the number of bundle deployments that have been synced from Fleet controller and downstream cluster, but are waiting to be deployed. | int | false |
| errApplied | ErrApplied is the number of bundle deployments that have been synced from the Fleet controller and the downstream cluster, but with some errors when deploying the bundle. | int | false |
| outOfSync | OutOfSync is the number of bundle deployments that have been synced from Fleet controller, but not yet by the downstream agent. | int | false |
| modified | Modified is the number of bundle deployments that have been deployed and for which all resources are ready, but where some changes from the Git repository have not yet been synced. | int | false |
| ready | Ready is the number of bundle deployments that have been deployed where all resources are ready. | int | true |
| pending | Pending is the number of bundle deployments that are being processed by Fleet controller. | int | false |
| desiredReady | DesiredReady is the number of bundle deployments that should be ready. | int | true |
| nonReadyResources | NonReadyClusters is a list of states, which is filled for a bundle that is not ready. | \[\][NonReadyResource](#nonreadyresource) | false |

[Back to Custom Resources](#custom-resources-spec)

#### BundleTarget

BundleTarget declares clusters to deploy to. Fleet will merge the BundleDeploymentOptions from customizations into this struct.

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| name | Name of target. This value is largely for display and logging. If not specified a default name of the format \"target000\" will be used | string | false |
| clusterName | ClusterName to match a specific cluster by name that will be selected | string | false |
| clusterSelector | ClusterSelector is a selector to match clusters. The structure is the standard metav1.LabelSelector format. If clusterGroupSelector or clusterGroup is specified, clusterSelector will be used only to further refine the selection after clusterGroupSelector and clusterGroup is evaluated. | *metav1.LabelSelector | false |
| clusterGroup | ClusterGroup to match a specific cluster group by name. | string | false |
| clusterGroupSelector | ClusterGroupSelector is a selector to match cluster groups. | *metav1.LabelSelector | false |
| doNotDeploy | DoNotDeploy if set to true, will not deploy to this target. | bool | false |

[Back to Custom Resources](#custom-resources-spec)

#### BundleTargetRestriction

BundleTargetRestriction is used internally by Fleet and should not be modified. It acts as an allow list, to prevent the creation of BundleDeployments from Targets created by TargetCustomizations in fleet.yaml.

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| name |  | string | false |
| clusterName |  | string | false |
| clusterSelector |  | *metav1.LabelSelector | false |
| clusterGroup |  | string | false |
| clusterGroupSelector |  | *metav1.LabelSelector | false |

[Back to Custom Resources](#custom-resources-spec)

#### NonReadyResource

NonReadyResource contains information about a bundle that is not ready for a given state like \"ErrApplied\". It contains a list of non-ready or modified resources and their states.

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| name | Name is the name of the resource. | string | false |
| bundleState | State is the state of the resource, like e.g. \"NotReady\" or \"ErrApplied\". | BundleState | false |
| message | Message contains information why the bundle is not ready. | string | false |
| modifiedStatus | ModifiedStatus lists the state for each modified resource. | \[\][ModifiedStatus](#modifiedstatus) | false |
| nonReadyStatus | NonReadyStatus lists the state for each non-ready resource. | \[\][NonReadyStatus](#nonreadystatus) | false |

[Back to Custom Resources](#custom-resources-spec)

#### Partition

Partition defines a separate rollout strategy for a set of clusters.

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| name | A user-friendly name given to the partition used for Display (optional). | string | false |
| maxUnavailable | A number or percentage of clusters that can be unavailable in this partition before this partition is treated as done. default: 10% | *intstr.IntOrString | false |
| clusterName | ClusterName is the name of a cluster to include in this partition | string | false |
| clusterSelector | Selector matching cluster labels to include in this partition | *metav1.LabelSelector | false |
| clusterGroup | A cluster group name to include in this partition | string | false |
| clusterGroupSelector | Selector matching cluster group labels to include in this partition | *metav1.LabelSelector | false |

[Back to Custom Resources](#custom-resources-spec)

#### PartitionStatus

PartitionStatus is the status of a single rollout partition.

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| name | Name is the name of the partition. | string | false |
| count | Count is the number of clusters in the partition. | int | false |
| maxUnavailable | MaxUnavailable is the maximum number of unavailable clusters in the partition. | int | false |
| unavailable | Unavailable is the number of unavailable clusters in the partition. | int | false |
| summary | Summary is a summary state for the partition, calculated over its non-ready resources. | [BundleSummary](#bundlesummary) | false |

[Back to Custom Resources](#custom-resources-spec)

#### ResourceKey

ResourceKey lists resources, which will likely be deployed.

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| kind | Kind is the k8s api kind of the resource. | string | false |
| apiVersion | APIVersion is the k8s api version of the resource. | string | false |
| namespace | Namespace is the namespace of the resource. | string | false |
| name | Name is the name of the resource. | string | false |

[Back to Custom Resources](#custom-resources-spec)

#### RolloutStrategy

RolloverStrategy controls the rollout of the bundle across clusters.

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| maxUnavailable | A number or percentage of clusters that can be unavailable during an update of a bundle. This follows the same basic approach as a deployment rollout strategy. Once the number of clusters meets unavailable state update will be paused. Default value is 100% which doesn't take effect on update. default: 100% | *intstr.IntOrString | false |
| maxUnavailablePartitions | A number or percentage of cluster partitions that can be unavailable during an update of a bundle. default: 0 | *intstr.IntOrString | false |
| autoPartitionSize | A number or percentage of how to automatically partition clusters if no specific partitioning strategy is configured. default: 25% | *intstr.IntOrString | false |
| partitions | A list of definitions of partitions.  If any target clusters do not match the configuration they are added to partitions at the end following the autoPartitionSize. | \[\][Partition](#partition) | false |

[Back to Custom Resources](#custom-resources-spec)

#### BundleDeployment

BundleDeployment is used internally by Fleet and should not be used directly. When a Bundle is deployed to a cluster an instance of a Bundle is called a BundleDeployment. A BundleDeployment represents the state of that Bundle on a specific cluster with its cluster-specific customizations. The Fleet agent is only aware of BundleDeployment resources that are created for the cluster the agent is managing.

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| metadata |  | metav1.ObjectMeta | false |
| spec |  | [BundleDeploymentSpec](#bundledeploymentspec) | false |
| status |  | [BundleDeploymentStatus](#bundledeploymentstatus) | false |

[Back to Custom Resources](#custom-resources-spec)

#### BundleDeploymentDisplay



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| deployed |  | string | false |
| monitored |  | string | false |
| state |  | string | false |

[Back to Custom Resources](#custom-resources-spec)

#### BundleDeploymentOptions



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| defaultNamespace | DefaultNamespace is the namespace to use for resources that do not specify a namespace. This field is not used to enforce or lock down the deployment to a specific namespace. | string | false |
| namespace | TargetNamespace if present will assign all resource to this namespace and if any cluster scoped resource exists the deployment will fail. | string | false |
| kustomize | Kustomize options for the deployment, like the dir containing the kustomization.yaml file. | *[KustomizeOptions](#kustomizeoptions) | false |
| helm | Helm options for the deployment, like the chart name, repo and values. | *[HelmOptions](#helmoptions) | false |
| serviceAccount | ServiceAccount which will be used to perform this deployment. | string | false |
| forceSyncGeneration | ForceSyncGeneration is used to force a redeployment | int64 | false |
| yaml | YAML options, if using raw YAML these are names that map to overlays/{name} files that will be used to replace or patch a resource. | *[YAMLOptions](#yamloptions) | false |
| diff | Diff can be used to ignore the modified state of objects which are amended at runtime. | *[DiffOptions](#diffoptions) | false |
| keepResources | KeepResources can be used to keep the deployed resources when removing the bundle | bool | false |
| ignore | IgnoreOptions can be used to ignore fields when monitoring the bundle. | [IgnoreOptions](#ignoreoptions) | false |
| correctDrift | CorrectDrift specifies how drift correction should work. | *[CorrectDrift](#correctdrift) | false |
| namespaceLabels | NamespaceLabels are labels that will be appended to the namespace created by Fleet. | *map[string]string | false |
| namespaceAnnotations | NamespaceAnnotations are annotations that will be appended to the namespace created by Fleet. | *map[string]string | false |
| deleteCRDResources | DeleteCRDResources deletes CRDs. Warning! this will also delete all your Custom Resources. | bool | false |

[Back to Custom Resources](#custom-resources-spec)

#### BundleDeploymentResource

BundleDeploymentResource contains the metadata of a deployed resource.

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| kind |  | string | false |
| apiVersion |  | string | false |
| namespace |  | string | false |
| name |  | string | false |
| createdAt |  | metav1.Time | false |

[Back to Custom Resources](#custom-resources-spec)

#### BundleDeploymentSpec



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| paused | Paused if set to true, will stop any BundleDeployments from being updated. If true, BundleDeployments will be marked as out of sync when changes are detected. | bool | false |
| stagedOptions | StagedOptions are the deployment options, that are staged for the next deployment. | [BundleDeploymentOptions](#bundledeploymentoptions) | false |
| stagedDeploymentID | StagedDeploymentID is the ID of the staged deployment. | string | false |
| options | Options are the deployment options, that are currently applied. | [BundleDeploymentOptions](#bundledeploymentoptions) | false |
| deploymentID | DeploymentID is the ID of the currently applied deployment. | string | false |
| dependsOn | DependsOn refers to the bundles which must be ready before this bundle can be deployed. | \[\][BundleRef](#bundleref) | false |
| correctDrift | CorrectDrift specifies how drift correction should work. | *[CorrectDrift](#correctdrift) | false |

[Back to Custom Resources](#custom-resources-spec)

#### BundleDeploymentStatus



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| conditions |  | []genericcondition.GenericCondition | false |
| appliedDeploymentID |  | string | false |
| release |  | string | false |
| ready |  | bool | false |
| nonModified |  | bool | false |
| nonReadyStatus |  | \[\][NonReadyStatus](#nonreadystatus) | false |
| modifiedStatus |  | \[\][ModifiedStatus](#modifiedstatus) | false |
| display |  | [BundleDeploymentDisplay](#bundledeploymentdisplay) | false |
| syncGeneration |  | *int64 | false |
| resources | Resources lists the metadata of resources that were deployed according to the helm release history. | \[\][BundleDeploymentResource](#bundledeploymentresource) | false |

[Back to Custom Resources](#custom-resources-spec)

#### ComparePatch

ComparePatch matches a resource and removes fields from the check for modifications.

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| kind | Kind is the kind of the resource to match. | string | false |
| apiVersion | APIVersion is the apiVersion of the resource to match. | string | false |
| namespace | Namespace is the namespace of the resource to match. | string | false |
| name | Name is the name of the resource to match. | string | false |
| operations | Operations remove a JSON path from the resource. | \[\][Operation](#operation) | false |
| jsonPointers | JSONPointers ignore diffs at a certain JSON path. | []string | false |

[Back to Custom Resources](#custom-resources-spec)

#### ConfigMapKeySelector



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| namespace |  | string | false |
| key |  | string | false |

[Back to Custom Resources](#custom-resources-spec)

#### DiffOptions



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| comparePatches | ComparePatches match a resource and remove fields from the check for modifications. | \[\][ComparePatch](#comparepatch) | false |

[Back to Custom Resources](#custom-resources-spec)

#### HelmOptions

HelmOptions for the deployment. For Helm-based bundles, all options can be used, otherwise some options are ignored. For example ReleaseName works with all bundle types.

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| chart | Chart can refer to any go-getter URL or OCI registry based helm chart URL. The chart will be downloaded. | string | false |
| repo | Repo is the name of the HTTPS helm repo to download the chart from. | string | false |
| releaseName | ReleaseName sets a custom release name to deploy the chart as. If not specified a release name will be generated by combining the invoking GitRepo.name + GitRepo.path. | string | false |
| version | Version of the chart to download | string | false |
| timeoutSeconds | TimeoutSeconds is the time to wait for Helm operations. | int | false |
| values | Values passed to Helm. It is possible to specify the keys and values as go template strings. | *GenericMap | false |
| valuesFrom | ValuesFrom loads the values from configmaps and secrets. | \[\][ValuesFrom](#valuesfrom) | false |
| force | Force allows to override immutable resources. This could be dangerous. | bool | false |
| takeOwnership | TakeOwnership makes helm skip the check for its own annotations | bool | false |
| maxHistory | MaxHistory limits the maximum number of revisions saved per release by Helm. | int | false |
| valuesFiles | ValuesFiles is a list of files to load values from. | []string | false |
| waitForJobs | WaitForJobs if set and timeoutSeconds provided, will wait until all Jobs have been completed before marking the GitRepo as ready. It will wait for as long as timeoutSeconds | bool | false |
| atomic | Atomic sets the --atomic flag when Helm is performing an upgrade | bool | false |
| disablePreProcess | DisablePreProcess disables template processing in values | bool | false |
| disableDNS | DisableDNS can be used to customize Helm's EnableDNS option, which Fleet sets to `true` by default. | bool | false |
| skipSchemaValidation | SkipSchemaValidation allows skipping schema validation against the chart values | bool | false |

[Back to Custom Resources](#custom-resources-spec)

#### IgnoreOptions

IgnoreOptions defines conditions to be ignored when monitoring the Bundle.

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| conditions | Conditions is a list of conditions to be ignored when monitoring the Bundle. | []map[string]string | false |

[Back to Custom Resources](#custom-resources-spec)

#### KustomizeOptions

KustomizeOptions for a deployment.

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| dir | Dir points to a custom folder for kustomize resources. This folder must contain a kustomization.yaml file. | string | false |

[Back to Custom Resources](#custom-resources-spec)

#### LocalObjectReference



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| name | Name of a resource in the same namespace as the referent. | string | true |

[Back to Custom Resources](#custom-resources-spec)

#### ModifiedStatus

ModifiedStatus is used to report the status of a resource that is modified. It indicates if the modification was a create, a delete or a patch.

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| kind |  | string | false |
| apiVersion |  | string | false |
| namespace |  | string | false |
| name |  | string | false |
| missing |  | bool | false |
| delete |  | bool | false |
| patch |  | string | false |

[Back to Custom Resources](#custom-resources-spec)

#### NonReadyStatus

NonReadyStatus is used to report the status of a resource that is not ready. It includes a summary.

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| uid |  | types.UID | false |
| kind |  | string | false |
| apiVersion |  | string | false |
| namespace |  | string | false |
| name |  | string | false |
| summary |  | summary.Summary | false |

[Back to Custom Resources](#custom-resources-spec)

#### Operation

Operation of a ComparePatch, usually \"remove\".

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| op | Op is usually \"remove\" | string | false |
| path | Path is the JSON path to remove. | string | false |
| value | Value is usually empty. | string | false |

[Back to Custom Resources](#custom-resources-spec)

#### SecretKeySelector



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| namespace |  | string | false |
| key |  | string | false |

[Back to Custom Resources](#custom-resources-spec)

#### ValuesFrom

Define helm values that can come from configmap, secret or external. Credit: https://github.com/fluxcd/helm-operator/blob/0cfea875b5d44bea995abe7324819432070dfbdc/pkg/apis/helm.fluxcd.io/v1/types_helmrelease.go#L439

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| configMapKeyRef | The reference to a config map with release values. | *[ConfigMapKeySelector](#configmapkeyselector) | false |
| secretKeyRef | The reference to a secret with release values. | *[SecretKeySelector](#secretkeyselector) | false |

[Back to Custom Resources](#custom-resources-spec)

#### YAMLOptions

YAMLOptions, if using raw YAML these are names that map to overlays/{name} files that will be used to replace or patch a resource.

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| overlays | Overlays is a list of names that maps to folders in \"overlays/\". If you wish to customize the file ./subdir/resource.yaml then a file ./overlays/myoverlay/subdir/resource.yaml will replace the base file. A file named ./overlays/myoverlay/subdir/resource_patch.yaml will patch the base file. | []string | false |

[Back to Custom Resources](#custom-resources-spec)

#### BundleNamespaceMapping

BundleNamespaceMapping maps bundles to clusters in other namespaces.

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| metadata |  | metav1.ObjectMeta | false |
| bundleSelector |  | *metav1.LabelSelector | false |
| namespaceSelector |  | *metav1.LabelSelector | false |

[Back to Custom Resources](#custom-resources-spec)

#### AgentStatus



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| lastSeen | LastSeen is the last time the agent checked in to update the status of the cluster resource. | metav1.Time | true |
| namespace | Namespace is the namespace of the agent deployment, e.g. \"cattle-fleet-system\". | string | true |
| nonReadyNodes | NonReadyNodes is the number of nodes that are not ready. | int | true |
| readyNodes | ReadyNodes is the number of nodes that are ready. | int | true |
| nonReadyNodeNames | NonReadyNode contains the names of non-ready nodes. The list is limited to at most 3 names. | []string | true |
| readyNodeNames | ReadyNodes contains the names of ready nodes. The list is limited to at most 3 names. | []string | true |

[Back to Custom Resources](#custom-resources-spec)

#### Cluster

Cluster corresponds to a Kubernetes cluster. Fleet deploys bundles to targeted clusters. Clusters to which Fleet deploys manifests are referred to as downstream clusters. In the single cluster use case, the Fleet manager Kubernetes cluster is both the manager and downstream cluster at the same time.

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| metadata |  | metav1.ObjectMeta | false |
| spec |  | [ClusterSpec](#clusterspec) | false |
| status |  | [ClusterStatus](#clusterstatus) | false |

[Back to Custom Resources](#custom-resources-spec)

#### ClusterDisplay



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| readyBundles | ReadyBundles is a string in the form \"%d/%d\", that describes the number of bundles that are ready vs. the number of bundles desired to be ready. | string | false |
| readyNodes | ReadyNodes is a string in the form \"%d/%d\", that describes the number of nodes that are ready vs. the number of expected nodes. | string | false |
| sampleNode | SampleNode is the name of one of the nodes that are ready. If no node is ready, it's the name of a node that is not ready. | string | false |
| state | State of the cluster, either one of the bundle states, or \"WaitCheckIn\". | string | false |

[Back to Custom Resources](#custom-resources-spec)

#### ClusterSpec



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| paused | Paused if set to true, will stop any BundleDeployments from being updated. | bool | false |
| clientID | ClientID is a unique string that will identify the cluster. It can either be predefined, or generated when importing the cluster. | string | false |
| kubeConfigSecret | KubeConfigSecret is the name of the secret containing the kubeconfig for the downstream cluster. It can optionally contain a APIServerURL and CA to override the values in the fleet-controller's configmap. | string | false |
| kubeConfigSecretNamespace | KubeConfigSecretNamespace is the namespace of the secret containing the kubeconfig for the downstream cluster. If unset, it will be assumed the secret can be found in the namespace that the Cluster object resides within. | string | false |
| redeployAgentGeneration | RedeployAgentGeneration can be used to force redeploying the agent. | int64 | false |
| agentEnvVars | AgentEnvVars are extra environment variables to be added to the agent deployment. | []corev1.EnvVar | false |
| agentNamespace | AgentNamespace defaults to the system namespace, e.g. cattle-fleet-system. | string | false |
| privateRepoURL | PrivateRepoURL prefixes the image name and overrides a global repo URL from the agents config. | string | false |
| templateValues | TemplateValues defines a cluster specific mapping of values to be sent to fleet.yaml values templating. | *GenericMap | false |
| agentTolerations | AgentTolerations defines an extra set of Tolerations to be added to the Agent deployment. | []corev1.Toleration | false |
| agentAffinity | AgentAffinity overrides the default affinity for the cluster's agent deployment. If this value is nil the default affinity is used. | *corev1.Affinity | false |
| agentResources | AgentResources sets the resources for the cluster's agent deployment. | *corev1.ResourceRequirements | false |

[Back to Custom Resources](#custom-resources-spec)

#### ClusterStatus



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| conditions |  | []genericcondition.GenericCondition | false |
| namespace | Namespace is the cluster namespace, it contains the clusters service account as well as any bundledeployments. Example: \"cluster-fleet-local-cluster-294db1acfa77-d9ccf852678f\" | string | false |
| summary | Summary is a summary of the bundledeployments. The resource counts are copied from the gitrepo resource. | [BundleSummary](#bundlesummary) | false |
| resourceCounts | ResourceCounts is an aggregate over the GitRepoResourceCounts. | [GitRepoResourceCounts](#gitreporesourcecounts) | false |
| readyGitRepos | ReadyGitRepos is the number of gitrepos for this cluster that are ready. | int | true |
| desiredReadyGitRepos | DesiredReadyGitRepos is the number of gitrepos for this cluster that are desired to be ready. | int | true |
| agentEnvVarsHash | AgentEnvVarsHash is a hash of the agent's env vars, used to detect changes. | string | false |
| agentPrivateRepoURL | AgentPrivateRepoURL is the private repo URL for the agent that is currently used. | string | false |
| agentDeployedGeneration | AgentDeployedGeneration is the generation of the agent that is currently deployed. | *int64 | false |
| agentMigrated | AgentMigrated is always set to true after importing a cluster. If false, it will trigger a migration. Old agents don't have this in their status. | bool | false |
| agentNamespaceMigrated | AgentNamespaceMigrated is always set to true after importing a cluster. If false, it will trigger a migration. Old Fleet agents don't have this in their status. | bool | false |
| cattleNamespaceMigrated | CattleNamespaceMigrated is always set to true after importing a cluster. If false, it will trigger a migration. Old Fleet agents, don't have this in their status. | bool | false |
| agentAffinityHash | AgentAffinityHash is a hash of the agent's affinity configuration, used to detect changes. | string | false |
| agentResourcesHash | AgentResourcesHash is a hash of the agent's resources configuration, used to detect changes. | string | false |
| agentTolerationsHash | AgentTolerationsHash is a hash of the agent's tolerations configuration, used to detect changes. | string | false |
| agentConfigChanged | AgentConfigChanged is set to true if any of the agent configuration changed, like the API server URL or CA. Setting it to true will trigger a re-import of the cluster. | bool | false |
| apiServerURL | APIServerURL is the currently used URL of the API server that the cluster uses to connect to upstream. | string | false |
| apiServerCAHash | APIServerCAHash is a hash of the upstream API server CA, used to detect changes. | string | false |
| agentTLSMode | AgentTLSMode supports two values: `system-store` and `strict`. If set to `system-store`, instructs the agent to trust CA bundles from the operating system's store. If set to `strict`, then the agent shall only connect to a server which uses the exact CA configured when creating/updating the agent. | string | false |
| display | Display contains the number of ready bundles, nodes and a summary state. | [ClusterDisplay](#clusterdisplay) | false |
| agent | AgentStatus contains information about the agent. | [AgentStatus](#agentstatus) | false |

[Back to Custom Resources](#custom-resources-spec)

#### ClusterGroup

ClusterGroup is a re-usable selector to target a group of clusters.

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| metadata |  | metav1.ObjectMeta | false |
| spec |  | [ClusterGroupSpec](#clustergroupspec) | true |
| status |  | [ClusterGroupStatus](#clustergroupstatus) | true |

[Back to Custom Resources](#custom-resources-spec)

#### ClusterGroupDisplay



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| readyClusters | ReadyClusters is a string in the form \"%d/%d\", that describes the number of clusters that are ready vs. the number of clusters desired to be ready. | string | false |
| readyBundles | ReadyBundles is a string in the form \"%d/%d\", that describes the number of bundles that are ready vs. the number of bundles desired to be ready. | string | false |
| state | State is a summary state for the cluster group, showing \"NotReady\" if there are non-ready resources. | string | false |

[Back to Custom Resources](#custom-resources-spec)

#### ClusterGroupSpec



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| selector | Selector is a label selector, used to select clusters for this group. | *metav1.LabelSelector | false |

[Back to Custom Resources](#custom-resources-spec)

#### ClusterGroupStatus



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| clusterCount | ClusterCount is the number of clusters in the cluster group. | int | true |
| nonReadyClusterCount | NonReadyClusterCount is the number of clusters that are not ready. | int | true |
| nonReadyClusters | NonReadyClusters is a list of cluster names that are not ready. | []string | false |
| conditions | Conditions is a list of conditions and their statuses for the cluster group. | []genericcondition.GenericCondition | false |
| summary | Summary is a summary of the bundle deployments and their resources in the cluster group. | [BundleSummary](#bundlesummary) | false |
| display | Display contains the number of ready, desiredready clusters and a summary state for the bundle's resources. | [ClusterGroupDisplay](#clustergroupdisplay) | false |
| resourceCounts | ResourceCounts contains the number of resources in each state over all bundles in the cluster group. | [GitRepoResourceCounts](#gitreporesourcecounts) | false |

[Back to Custom Resources](#custom-resources-spec)

#### ClusterRegistration

ClusterRegistration is used internally by Fleet and should not be used directly.

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| metadata |  | metav1.ObjectMeta | false |
| spec |  | [ClusterRegistrationSpec](#clusterregistrationspec) | false |
| status |  | [ClusterRegistrationStatus](#clusterregistrationstatus) | false |

[Back to Custom Resources](#custom-resources-spec)

#### ClusterRegistrationSpec



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| clientID | ClientID is a unique string that will identify the cluster. The agent either uses the configured ID or the kubeSystem.UID. | string | false |
| clientRandom | ClientRandom is a random string that the agent generates. When fleet-controller grants a registration, it creates a registration secret with this string in the name. | string | false |
| clusterLabels | ClusterLabels are copied to the cluster resource during the registration. | map[string]string | false |

[Back to Custom Resources](#custom-resources-spec)

#### ClusterRegistrationStatus



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| clusterName | ClusterName is only set after the registration is being processed by fleet-controller. | string | false |
| granted | Granted is set to true, if the request service account is present and its token secret exists. This happens directly before creating the registration secret, roles and rolebindings. | bool | false |

[Back to Custom Resources](#custom-resources-spec)

#### ClusterRegistrationToken

ClusterRegistrationToken is used by agents to register a new cluster.

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| metadata |  | metav1.ObjectMeta | false |
| spec |  | [ClusterRegistrationTokenSpec](#clusterregistrationtokenspec) | false |
| status |  | [ClusterRegistrationTokenStatus](#clusterregistrationtokenstatus) | false |

[Back to Custom Resources](#custom-resources-spec)

#### ClusterRegistrationTokenSpec



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| ttl | TTL is the time to live for the token. It is used to calculate the expiration time. If the token expires, it will be deleted. | *metav1.Duration | false |

[Back to Custom Resources](#custom-resources-spec)

#### ClusterRegistrationTokenStatus



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| expires | Expires is the time when the token expires. | *metav1.Time | false |
| secretName | SecretName is the name of the secret containing the token. | string | false |

[Back to Custom Resources](#custom-resources-spec)

#### Content

Content is used internally by Fleet and should not be used directly. It contains the resources from a bundle for a specific target cluster.

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| metadata |  | metav1.ObjectMeta | false |
| content | Content is a byte array, which contains the manifests of a bundle. The bundle resources are copied into the bundledeployment's content resource, so the downstream agent can deploy them. | []byte | false |

[Back to Custom Resources](#custom-resources-spec)

#### CommitSpec

CommitSpec specifies how to commit changes to the git repository

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| authorName | AuthorName gives the name to provide when making a commit | string | true |
| authorEmail | AuthorEmail gives the email to provide when making a commit | string | true |
| messageTemplate | MessageTemplate provides a template for the commit message, into which will be interpolated the details of the change made. | string | false |

[Back to Custom Resources](#custom-resources-spec)

#### CorrectDrift



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| enabled | Enabled correct drift if true. | bool | false |
| force | Force helm rollback with --force option will be used if true. This will try to recreate all resources in the release. | bool | false |
| keepFailHistory | KeepFailHistory keeps track of failed rollbacks in the helm history. | bool | false |

[Back to Custom Resources](#custom-resources-spec)

#### GitRepo

GitRepo describes a git repository that is watched by Fleet. The resource contains the necessary information to deploy the repo, or parts of it, to target clusters.

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| metadata |  | metav1.ObjectMeta | false |
| spec |  | [GitRepoSpec](#gitrepospec) | false |
| status |  | [GitRepoStatus](#gitrepostatus) | false |

[Back to Custom Resources](#custom-resources-spec)

#### GitRepoDisplay



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| readyBundleDeployments | ReadyBundleDeployments is a string in the form \"%d/%d\", that describes the number of ready bundledeployments over the total number of bundledeployments. | string | false |
| state | State is the state of the GitRepo, e.g. \"GitUpdating\" or the maximal BundleState according to StateRank. | string | false |
| message | Message contains the relevant message from the deployment conditions. | string | false |
| error | Error is true if a message is present. | bool | false |

[Back to Custom Resources](#custom-resources-spec)

#### GitRepoResource

GitRepoResource contains metadata about the resources of a bundle.

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| apiVersion | APIVersion is the API version of the resource. | string | false |
| kind | Kind is the k8s kind of the resource. | string | false |
| type | Type is the type of the resource, e.g. \"apiextensions.k8s.io.customresourcedefinition\" or \"configmap\". | string | false |
| id | ID is the name of the resource, e.g. \"namespace1/my-config\" or \"backingimagemanagers.storage.io\". | string | false |
| namespace | Namespace of the resource. | string | false |
| name | Name of the resource. | string | false |
| incompleteState | IncompleteState is true if a bundle summary has 10 or more non-ready resources or a non-ready resource has more 10 or more non-ready or modified states. | bool | false |
| state | State is the state of the resource, e.g. \"Unknown\", \"WaitApplied\", \"ErrApplied\" or \"Ready\". | string | false |
| error | Error is true if any Error in the PerClusterState is true. | bool | false |
| transitioning | Transitioning is true if any Transitioning in the PerClusterState is true. | bool | false |
| message | Message is the first message from the PerClusterStates. | string | false |
| perClusterState | PerClusterState is a list of states for each cluster. Derived from the summaries non-ready resources. | \[\][ResourcePerClusterState](#resourceperclusterstate) | false |

[Back to Custom Resources](#custom-resources-spec)

#### GitRepoResourceCounts

GitRepoResourceCounts contains the number of resources in each state.

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| ready | Ready is the number of ready resources. | int | true |
| desiredReady | DesiredReady is the number of resources that should be ready. | int | true |
| waitApplied | WaitApplied is the number of resources that are waiting to be applied. | int | true |
| modified | Modified is the number of resources that have been modified. | int | true |
| orphaned | Orphaned is the number of orphaned resources. | int | true |
| missing | Missing is the number of missing resources. | int | true |
| unknown | Unknown is the number of resources in an unknown state. | int | true |
| notReady | NotReady is the number of not ready resources. Resources are not ready if they do not match any other state. | int | true |

[Back to Custom Resources](#custom-resources-spec)

#### GitRepoSpec



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| repo | Repo is a URL to a git repo to clone and index. | string | false |
| branch | Branch The git branch to follow. | string | false |
| revision | Revision A specific commit or tag to operate on. | string | false |
| targetNamespace | Ensure that all resources are created in this namespace Any cluster scoped resource will be rejected if this is set Additionally this namespace will be created on demand. | string | false |
| clientSecretName | ClientSecretName is the name of the client secret to be used to connect to the repo It is expected the secret be of type \"kubernetes.io/basic-auth\" or \"kubernetes.io/ssh-auth\". | string | false |
| helmSecretName | HelmSecretName contains the auth secret for a private Helm repository. | string | false |
| helmSecretNameForPaths | HelmSecretNameForPaths contains the auth secret for private Helm repository for each path. | string | false |
| helmRepoURLRegex | HelmRepoURLRegex Helm credentials will be used if the helm repo matches this regex Credentials will always be used if this is empty or not provided. | string | false |
| caBundle | CABundle is a PEM encoded CA bundle which will be used to validate the repo's certificate. | []byte | false |
| insecureSkipTLSVerify | InsecureSkipTLSverify will use insecure HTTPS to clone the repo. | bool | false |
| paths | Paths is the directories relative to the git repo root that contain resources to be applied. Path globbing is supported, for example [\"charts/*\"] will match all folders as a subdirectory of charts/ If empty, \"/\" is the default. | []string | false |
| paused | Paused, when true, causes changes in Git not to be propagated down to the clusters but instead to mark resources as OutOfSync. | bool | false |
| serviceAccount | ServiceAccount used in the downstream cluster for deployment. | string | false |
| targets | Targets is a list of targets this repo will deploy to. | \[\][GitTarget](#gittarget) | false |
| pollingInterval | PollingInterval is how often to check git for new updates. | *metav1.Duration | false |
| forceSyncGeneration | Increment this number to force a redeployment of contents from Git. | int64 | false |
| imageScanInterval | ImageScanInterval is the interval of syncing scanned images and writing back to git repo. | *metav1.Duration | false |
| imageScanCommit | Commit specifies how to commit to the git repo when a new image is scanned and written back to git repo. | [CommitSpec](#commitspec) | false |
| keepResources | KeepResources specifies if the resources created must be kept after deleting the GitRepo. | bool | false |
| correctDrift | CorrectDrift specifies how drift correction should work. | *[CorrectDrift](#correctdrift) | false |

[Back to Custom Resources](#custom-resources-spec)

#### GitRepoStatus



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| observedGeneration | ObservedGeneration is the current generation of the resource in the cluster. It is copied from k8s metadata.Generation. The value is incremented for all changes, except for changes to .metadata or .status. | int64 | true |
| commit | Commit is the Git commit hash from the last gitjob run. | string | false |
| readyClusters | ReadyClusters is the lowest number of clusters that are ready over all the bundles of this GitRepo. | int | true |
| desiredReadyClusters | DesiredReadyClusters\tis the number of clusters that should be ready for bundles of this GitRepo. | int | true |
| gitJobStatus | GitJobStatus is the status of the last GitJob run, e.g. \"Current\" if there was no error. | string | false |
| summary | Summary contains the number of bundle deployments in each state and a list of non-ready resources. | [BundleSummary](#bundlesummary) | false |
| display | Display contains a human readable summary of the status. | [GitRepoDisplay](#gitrepodisplay) | false |
| conditions | Conditions is a list of Wrangler conditions that describe the state of the GitRepo. | []genericcondition.GenericCondition | false |
| resources | Resources contains metadata about the resources of each bundle. | \[\][GitRepoResource](#gitreporesource) | false |
| resourceCounts | ResourceCounts contains the number of resources in each state over all bundles. | [GitRepoResourceCounts](#gitreporesourcecounts) | false |
| resourceErrors | ResourceErrors is a sorted list of errors from the resources. | []string | false |
| lastSyncedImageScanTime | LastSyncedImageScanTime is the time of the last image scan. | metav1.Time | false |

[Back to Custom Resources](#custom-resources-spec)

#### GitTarget

GitTarget is a cluster or cluster group to deploy to.

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| name | Name is the name of this target. | string | false |
| clusterName | ClusterName is the name of a cluster. | string | false |
| clusterSelector | ClusterSelector is a label selector to select clusters. | *metav1.LabelSelector | false |
| clusterGroup | ClusterGroup is the name of a cluster group in the same namespace as the clusters. | string | false |
| clusterGroupSelector | ClusterGroupSelector is a label selector to select cluster groups. | *metav1.LabelSelector | false |

[Back to Custom Resources](#custom-resources-spec)

#### ResourcePerClusterState

ResourcePerClusterState is generated for each non-ready resource of the bundles.

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| state | State is the state of the resource. | string | false |
| error | Error is true if the resource is in an error state, copied from the bundle's summary for non-ready resources. | bool | false |
| transitioning | Transitioning is true if the resource is in a transitioning state, copied from the bundle's summary for non-ready resources. | bool | false |
| message | Message combines the messages from the bundle's summary. Messages are joined with the delimiter ';'. | string | false |
| patch | Patch for modified resources. | *GenericMap | false |
| clusterId | ClusterID is the id of the cluster. | string | false |

[Back to Custom Resources](#custom-resources-spec)

#### GitRepoRestriction

GitRepoRestriction is a resource that can optionally be used to restrict the options of GitRepos in the same namespace.

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| metadata |  | metav1.ObjectMeta | false |
| defaultServiceAccount | DefaultServiceAccount overrides the GitRepo's default service account. | string | false |
| allowedServiceAccounts | AllowedServiceAccounts is a list of service accounts that GitRepos are allowed to use. | []string | false |
| allowedRepoPatterns | AllowedRepoPatterns is a list of regex patterns that restrict the valid values of the Repo field of a GitRepo. | []string | false |
| defaultClientSecretName | DefaultClientSecretName overrides the GitRepo's default client secret. | string | false |
| allowedClientSecretNames | AllowedClientSecretNames is a list of client secret names that GitRepos are allowed to use. | []string | false |
| allowedTargetNamespaces | AllowedTargetNamespaces restricts TargetNamespace to the given namespaces. If AllowedTargetNamespaces is set, TargetNamespace must be set. | []string | false |

[Back to Custom Resources](#custom-resources-spec)

#### AlphabeticalPolicy

AlphabeticalPolicy specifies a alphabetical ordering policy.

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| order | Order specifies the sorting order of the tags. Given the letters of the alphabet as tags, ascending order would select Z, and descending order would select A. | string | false |

[Back to Custom Resources](#custom-resources-spec)

#### ImagePolicyChoice

ImagePolicyChoice is a union of all the types of policy that can be supplied.

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| semver | SemVer gives a semantic version range to check against the tags available. | *[SemVerPolicy](#semverpolicy) | false |
| alphabetical | Alphabetical set of rules to use for alphabetical ordering of the tags. | *[AlphabeticalPolicy](#alphabeticalpolicy) | false |

[Back to Custom Resources](#custom-resources-spec)

#### ImageScan



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| metadata |  | metav1.ObjectMeta | false |
| spec |  | [ImageScanSpec](#imagescanspec) | false |
| status |  | [ImageScanStatus](#imagescanstatus) | false |

[Back to Custom Resources](#custom-resources-spec)

#### ImageScanSpec

API is taken from https://github.com/fluxcd/image-reflector-controller

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| tagName | TagName is the tag ref that needs to be put in manifest to replace fields | string | false |
| gitrepoName | GitRepo reference name | string | false |
| image | Image is the name of the image repository | string | false |
| interval | Interval is the length of time to wait between scans of the image repository. | metav1.Duration | false |
| secretRef | SecretRef can be given the name of a secret containing credentials to use for the image registry. The secret should be created with `kubectl create secret docker-registry`, or the equivalent. | *corev1.LocalObjectReference | false |
| suspend | This flag tells the controller to suspend subsequent image scans. It does not apply to already started scans. Defaults to false. | bool | false |
| policy | Policy gives the particulars of the policy to be followed in selecting the most recent image | [ImagePolicyChoice](#imagepolicychoice) | true |

[Back to Custom Resources](#custom-resources-spec)

#### ImageScanStatus



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| conditions |  | []genericcondition.GenericCondition | false |
| lastScanTime | LastScanTime is the last time image was scanned | metav1.Time | false |
| latestImage | LatestImage gives the first in the list of images scanned by the image repository, when filtered and ordered according to the policy. | string | false |
| latestTag | Latest tag is the latest tag filtered by the policy | string | false |
| latestDigest | LatestDigest is the digest of latest tag | string | false |
| observedGeneration |  | int64 | false |
| canonicalImageName | CanonicalName is the name of the image repository with all the implied bits made explicit; e.g., `docker.io/library/alpine` rather than `alpine`. | string | false |

[Back to Custom Resources](#custom-resources-spec)

#### SemVerPolicy

SemVerPolicy specifies a semantic version policy.

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| range | Range gives a semver range for the image tag; the highest version within the range that's a tag yields the latest image. | string | true |

[Back to Custom Resources](#custom-resources-spec)

#### FleetYAML

FleetYAML is the top-level structure of the fleet.yaml file. The fleet.yaml file adds options to a bundle. Any directory with a fleet.yaml is automatically turned into a bundle.

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| name | Name of the bundle which will be created. | string | false |
| labels | Labels are copied to the bundle and can be used in a dependsOn.selector. | map[string]string | false |
| BundleSpec |  | [BundleSpec](#bundlespec) | false |
| targetCustomizations | TargetCustomizations are used to determine how resources should be modified per target. Targets are evaluated in order and the first one to match a cluster is used for that cluster. | \[\][BundleTarget](#bundletarget) | false |
| imageScans | ImageScans are optional and used to update container image references in the git repo. | \[\][ImageScanYAML](#imagescanyaml) | false |
| overrideTargets | OverrideTargets overrides targets that are defined in the GitRepo resource. If overrideTargets is provided the bundle will not inherit targets from the GitRepo. | \[\][GitTarget](#gittarget) | false |

[Back to Custom Resources](#custom-resources-spec)

#### ImageScanYAML

ImageScanYAML is a single entry in the ImageScan list from fleet.yaml.

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| name | Name of the image scan. Unused. | string | false |
| ImageScanSpec |  | [ImageScanSpec](#imagescanspec) | false |

[Back to Custom Resources](#custom-resources-spec)
