# Custom Resources Spec

* [GitRepo](#gitrepo)
* [GitRepoRestriction](#gitreporestriction)
* [Bundle](#bundle)
* [BundleDeployment](#bundledeployment)
* [BundleNamespaceMapping](#bundlenamespacemapping)
* [Content](#content)
* [ImageScan](#imagescan)
* [Cluster](#cluster)
* [ClusterGroup](#clustergroup)
* [ClusterRegistration](#clusterregistration)
* [ClusterRegistrationToken](#clusterregistrationtoken)

# Sub Resources

* [GitRepoDisplay](#gitrepodisplay)
* [GitRepoResource](#gitreporesource)
* [GitRepoResourceCounts](#gitreporesourcecounts)
* [GitRepoSpec](#gitrepospec)
* [GitRepoStatus](#gitrepostatus)
* [GitTarget](#gittarget)
* [ResourcePerClusterState](#resourceperclusterstate)
* [BundleDeploymentDisplay](#bundledeploymentdisplay)
* [BundleDeploymentOptions](#bundledeploymentoptions)
* [BundleDeploymentSpec](#bundledeploymentspec)
* [BundleDeploymentStatus](#bundledeploymentstatus)
* [BundleDisplay](#bundledisplay)
* [BundleRef](#bundleref)
* [BundleResource](#bundleresource)
* [BundleSpec](#bundlespec)
* [BundleStatus](#bundlestatus)
* [BundleSummary](#bundlesummary)
* [BundleTarget](#bundletarget)
* [BundleTargetRestriction](#bundletargetrestriction)
* [ComparePatch](#comparepatch)
* [ConfigMapKeySelector](#configmapkeyselector)
* [DiffOptions](#diffoptions)
* [HelmOptions](#helmoptions)
* [KustomizeOptions](#kustomizeoptions)
* [LocalObjectReference](#localobjectreference)
* [ModifiedStatus](#modifiedstatus)
* [NonReadyResource](#nonreadyresource)
* [NonReadyStatus](#nonreadystatus)
* [Operation](#operation)
* [Partition](#partition)
* [PartitionStatus](#partitionstatus)
* [ResourceKey](#resourcekey)
* [RolloutStrategy](#rolloutstrategy)
* [SecretKeySelector](#secretkeyselector)
* [ValuesFrom](#valuesfrom)
* [YAMLOptions](#yamloptions)
* [AlphabeticalPolicy](#alphabeticalpolicy)
* [CommitSpec](#commitspec)
* [ImagePolicyChoice](#imagepolicychoice)
* [ImageScanSpec](#imagescanspec)
* [ImageScanStatus](#imagescanstatus)
* [SemVerPolicy](#semverpolicy)
* [AgentStatus](#agentstatus)
* [ClusterDisplay](#clusterdisplay)
* [ClusterGroupDisplay](#clustergroupdisplay)
* [ClusterGroupSpec](#clustergroupspec)
* [ClusterGroupStatus](#clustergroupstatus)
* [ClusterRegistrationSpec](#clusterregistrationspec)
* [ClusterRegistrationStatus](#clusterregistrationstatus)
* [ClusterRegistrationTokenSpec](#clusterregistrationtokenspec)
* [ClusterRegistrationTokenStatus](#clusterregistrationtokenstatus)
* [ClusterSpec](#clusterspec)
* [ClusterStatus](#clusterstatus)

#### GitRepo



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| metadata |  | metav1.ObjectMeta | false |
| spec |  | [GitRepoSpec](#gitrepospec) | false |
| status |  | [GitRepoStatus](#gitrepostatus) | false |

[Back to Custom Resources](#custom-resources)

#### GitRepoDisplay



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| readyBundleDeployments |  | string | false |
| state |  | string | false |
| message |  | string | false |
| error |  | bool | false |

[Back to Custom Resources](#custom-resources)

#### GitRepoResource



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| apiVersion |  | string | false |
| kind |  | string | false |
| type |  | string | false |
| id |  | string | false |
| namespace |  | string | false |
| name |  | string | false |
| incompleteState |  | bool | false |
| state |  | string | false |
| error |  | bool | false |
| transitioning |  | bool | false |
| message |  | string | false |
| perClusterState |  | [][ResourcePerClusterState](#resourceperclusterstate) | false |

[Back to Custom Resources](#custom-resources)

#### GitRepoResourceCounts



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| ready |  | int | true |
| desiredReady |  | int | true |
| waitApplied |  | int | true |
| modified |  | int | true |
| orphaned |  | int | true |
| missing |  | int | true |
| unknown |  | int | true |
| notReady |  | int | true |

[Back to Custom Resources](#custom-resources)

#### GitRepoRestriction



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| metadata |  | metav1.ObjectMeta | false |
| defaultServiceAccount |  | string | false |
| allowedServiceAccounts |  | []string | false |
| allowedRepoPatterns |  | []string | false |
| defaultClientSecretName |  | string | false |
| allowedClientSecretNames |  | []string | false |
| allowedTargetNamespaces |  | []string | false |

[Back to Custom Resources](#custom-resources)

#### GitRepoSpec



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| repo | Repo is a URL to a git repo to clone and index | string | false |
| branch | Branch The git branch to follow | string | false |
| revision | Revision A specific commit or tag to operate on | string | false |
| targetNamespace | Ensure that all resources are created in this namespace Any cluster scoped resource will be rejected if this is set Additionally this namespace will be created on demand | string | false |
| clientSecretName | ClientSecretName is the client secret to be used to connect to the repo It is expected the secret be of type \"kubernetes.io/basic-auth\" or \"kubernetes.io/ssh-auth\". | string | false |
| helmSecretName | HelmSecretName contains the auth secret for private helm repository | string | false |
| helmRepoURLRegex | HelmRepoURLRegex Helm credentials will be used if the helm repo matches this regex Credentials will always be used if this is empty or not provided | string | false |
| caBundle | CABundle is a PEM encoded CA bundle which will be used to validate the repo's certificate. | []byte | false |
| insecureSkipTLSVerify | InsecureSkipTLSverify will use insecure HTTPS to clone the repo. | bool | false |
| paths | Paths is the directories relative to the git repo root that contain resources to be applied. Path globbing is support, for example [\"charts/*\"] will match all folders as a subdirectory of charts/ If empty, \"/\" is the default | []string | false |
| paused | Paused this cause changes in Git to not be propagated down to the clusters but instead mark resources as OutOfSync | bool | false |
| serviceAccount | ServiceAccount used in the downstream cluster for deployment | string | false |
| targets | Targets is a list of target this repo will deploy to | [][GitTarget](#gittarget) | false |
| pollingInterval | PollingInterval is how often to check git for new updates | *metav1.Duration | false |
| forceSyncGeneration | Increment this number to force a redeployment of contents from Git | int64 | false |
| imageScanInterval | ImageScanInterval is the interval of syncing scanned images and writing back to git repo | *metav1.Duration | false |
| imageScanCommit | Commit specifies how to commit to the git repo when new image is scanned and write back to git repo | [CommitSpec](#commitspec) | false |
| keepResources | KeepResources specifies if the resources created must be kept after deleting the GitRepo | bool | false |

[Back to Custom Resources](#custom-resources)

#### GitRepoStatus



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| observedGeneration |  | int64 | true |
| commit |  | string | false |
| readyClusters |  | int | true |
| desiredReadyClusters |  | int | true |
| gitJobStatus |  | string | false |
| summary |  | [BundleSummary](#bundlesummary) | false |
| display |  | [GitRepoDisplay](#gitrepodisplay) | false |
| conditions |  | []genericcondition.GenericCondition | false |
| resources |  | [][GitRepoResource](#gitreporesource) | false |
| resourceCounts |  | [GitRepoResourceCounts](#gitreporesourcecounts) | false |
| resourceErrors |  | []string | false |
| lastSyncedImageScanTime |  | metav1.Time | false |

[Back to Custom Resources](#custom-resources)

#### GitTarget



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| name |  | string | false |
| clusterName |  | string | false |
| clusterSelector |  | *metav1.LabelSelector | false |
| clusterGroup |  | string | false |
| clusterGroupSelector |  | *metav1.LabelSelector | false |

[Back to Custom Resources](#custom-resources)

#### ResourcePerClusterState



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| state |  | string | false |
| error |  | bool | false |
| transitioning |  | bool | false |
| message |  | string | false |
| patch |  | *GenericMap | false |
| clusterId |  | string | false |

[Back to Custom Resources](#custom-resources)

#### Bundle



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| metadata |  | metav1.ObjectMeta | false |
| spec |  | [BundleSpec](#bundlespec) | true |
| status |  | [BundleStatus](#bundlestatus) | true |

[Back to Custom Resources](#custom-resources)

#### BundleDeployment



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| metadata |  | metav1.ObjectMeta | false |
| spec |  | [BundleDeploymentSpec](#bundledeploymentspec) | false |
| status |  | [BundleDeploymentStatus](#bundledeploymentstatus) | false |

[Back to Custom Resources](#custom-resources)

#### BundleDeploymentDisplay



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| deployed |  | string | false |
| monitored |  | string | false |
| state |  | string | false |

[Back to Custom Resources](#custom-resources)

#### BundleDeploymentOptions



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| defaultNamespace | DefaultNamespace is the namespace to use for resources that do not specify a namespace. This field is not used to enforce or lock down the deployment to a specific namespace. | string | false |
| namespace | TargetNamespace if present will assign all resource to this namespace and if any cluster scoped resource exists the deployment will fail. | string | false |
| kustomize | Kustomize options for the deployment, like the dir containing the kustomization.yaml file. | *[KustomizeOptions](#kustomizeoptions) | false |
| helm | Helm options for the deployment, like the chart name, repo and values. | *[HelmOptions](#helmoptions) | false |
| serviceAccount | ServiceAccount which will be used to perform this deployment. | string | false |
| forceSyncGeneration | ForceSyncGeneration is used to force a redeployment | int64 | false |
| yaml | YAML options, if using raw YAML these are names that map to overlays/`{name}` that will be used to replace or patch a resource. | *[YAMLOptions](#yamloptions) | false |
| diff | Diff can be used to ignore the modified state of objects which are amended at runtime. | *[DiffOptions](#diffoptions) | false |
| keepResources | KeepResources can be used to keep the deployed resources when removing the bundle | bool | false |

[Back to Custom Resources](#custom-resources)

#### BundleDeploymentSpec



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| stagedOptions |  | [BundleDeploymentOptions](#bundledeploymentoptions) | false |
| stagedDeploymentID |  | string | false |
| options |  | [BundleDeploymentOptions](#bundledeploymentoptions) | false |
| deploymentID |  | string | false |
| dependsOn |  | [][BundleRef](#bundleref) | false |

[Back to Custom Resources](#custom-resources)

#### BundleDeploymentStatus



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| conditions |  | []genericcondition.GenericCondition | false |
| appliedDeploymentID |  | string | false |
| release |  | string | false |
| ready |  | bool | false |
| nonModified |  | bool | false |
| nonReadyStatus |  | [][NonReadyStatus](#nonreadystatus) | false |
| modifiedStatus |  | [][ModifiedStatus](#modifiedstatus) | false |
| display |  | [BundleDeploymentDisplay](#bundledeploymentdisplay) | false |
| syncGeneration |  | *int64 | false |

[Back to Custom Resources](#custom-resources)

#### BundleDisplay



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| readyClusters |  | string | false |
| state |  | string | false |

[Back to Custom Resources](#custom-resources)

#### BundleNamespaceMapping



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| metadata |  | metav1.ObjectMeta | false |
| bundleSelector |  | *metav1.LabelSelector | false |
| namespaceSelector |  | *metav1.LabelSelector | false |

[Back to Custom Resources](#custom-resources)

#### BundleRef



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| name |  | string | false |
| selector |  | *metav1.LabelSelector | false |

[Back to Custom Resources](#custom-resources)

#### BundleResource



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| name |  | string | false |
| content |  | string | false |
| encoding |  | string | false |

[Back to Custom Resources](#custom-resources)

#### BundleSpec



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| BundleDeploymentOptions |  | [BundleDeploymentOptions](#bundledeploymentoptions) | false |
| paused | Paused if set to true, will stop any BundleDeployments from being updated. It will be marked as out of sync. | bool | false |
| rolloutStrategy | RolloutStrategy controls the rollout of bundles, by defining partitions, canaries and percentages for cluster availability. | *[RolloutStrategy](#rolloutstrategy) | false |
| resources | Resources contain the actual resources from the git repo which will be deployed. | [][BundleResource](#bundleresource) | false |
| targets | Targets refer to the clusters which will be deployed to. | [][BundleTarget](#bundletarget) | false |
| targetRestrictions | TargetRestrictions restrict which clusters the bundle will be deployed to. | [][BundleTargetRestriction](#bundletargetrestriction) | false |
| dependsOn | DependsOn refers to the bundles which must be ready before this bundle can be deployed. | [][BundleRef](#bundleref) | false |

[Back to Custom Resources](#custom-resources)

#### BundleStatus



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| conditions |  | []genericcondition.GenericCondition | false |
| summary |  | [BundleSummary](#bundlesummary) | false |
| newlyCreated |  | int | false |
| unavailable |  | int | true |
| unavailablePartitions |  | int | true |
| maxUnavailable |  | int | true |
| maxUnavailablePartitions |  | int | true |
| maxNew |  | int | false |
| partitions |  | [][PartitionStatus](#partitionstatus) | false |
| display |  | [BundleDisplay](#bundledisplay) | false |
| resourceKey |  | [][ResourceKey](#resourcekey) | false |
| observedGeneration |  | int64 | true |

[Back to Custom Resources](#custom-resources)

#### BundleSummary



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| notReady |  | int | false |
| waitApplied |  | int | false |
| errApplied |  | int | false |
| outOfSync |  | int | false |
| modified |  | int | false |
| ready |  | int | true |
| pending |  | int | false |
| desiredReady |  | int | true |
| nonReadyResources |  | [][NonReadyResource](#nonreadyresource) | false |

[Back to Custom Resources](#custom-resources)

#### BundleTarget



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| BundleDeploymentOptions |  | [BundleDeploymentOptions](#bundledeploymentoptions) | false |
| name |  | string | false |
| clusterName |  | string | false |
| clusterSelector |  | *metav1.LabelSelector | false |
| clusterGroup |  | string | false |
| clusterGroupSelector |  | *metav1.LabelSelector | false |

[Back to Custom Resources](#custom-resources)

#### BundleTargetRestriction



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| name |  | string | false |
| clusterName |  | string | false |
| clusterSelector |  | *metav1.LabelSelector | false |
| clusterGroup |  | string | false |
| clusterGroupSelector |  | *metav1.LabelSelector | false |

[Back to Custom Resources](#custom-resources)

#### ComparePatch



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| kind |  | string | false |
| apiVersion |  | string | false |
| namespace |  | string | false |
| name |  | string | false |
| operations |  | [][Operation](#operation) | false |
| jsonPointers |  | []string | false |

[Back to Custom Resources](#custom-resources)

#### ConfigMapKeySelector



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| namespace |  | string | false |
| key |  | string | false |

[Back to Custom Resources](#custom-resources)

#### Content



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| metadata |  | metav1.ObjectMeta | false |
| content |  | []byte | false |

[Back to Custom Resources](#custom-resources)

#### DiffOptions



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| comparePatches |  | [][ComparePatch](#comparepatch) | false |

[Back to Custom Resources](#custom-resources)

#### HelmOptions



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| chart | Chart can refer to any go-getter URL or OCI registry based helm chart URL. The chart will be downloaded. | string | false |
| repo | Repo is the name of the HTTPS helm repo to download the chart from. | string | false |
| releaseName | ReleaseName sets a custom release name to deploy the chart as. If not specified a release name will be generated by combining the invoking GitRepo.name + GitRepo.path. | string | false |
| version | Version of the chart to download | string | false |
| timeoutSeconds | TimeoutSeconds is the time to wait for Helm operations. | int | false |
| values | Values passed to Helm. It is possible to specify the keys and values as go template strings. | *GenericMap | false |
| valuesFrom | ValuesFrom loads the values from configmaps and secrets. | [][ValuesFrom](#valuesfrom) | false |
| force | Force allows to override immutable resources. This could be dangerous. | bool | false |
| takeOwnership | TakeOwnership makes helm skip the check for its own annotations | bool | false |
| maxHistory | MaxHistory limits the maximum number of revisions saved per release by Helm. | int | false |
| valuesFiles | ValuesFiles is a list of files to load values from. | []string | false |
| waitForJobs | WaitForJobs if set and timeoutSeconds provided, will wait until all Jobs have been completed before marking the GitRepo as ready. It will wait for as long as timeoutSeconds | bool | false |
| atomic | Atomic sets the --atomic flag when Helm is performing an upgrade | bool | false |
| disablePreProcess | DisablePreProcess disables template processing in values | bool | false |

[Back to Custom Resources](#custom-resources)

#### KustomizeOptions



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| dir |  | string | false |

[Back to Custom Resources](#custom-resources)

#### LocalObjectReference



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| name |  | string | true |

[Back to Custom Resources](#custom-resources)

#### ModifiedStatus



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| kind |  | string | false |
| apiVersion |  | string | false |
| namespace |  | string | false |
| name |  | string | false |
| missing |  | bool | false |
| delete |  | bool | false |
| patch |  | string | false |

[Back to Custom Resources](#custom-resources)

#### NonReadyResource



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| name |  | string | false |
| bundleState |  | BundleState | false |
| message |  | string | false |
| modifiedStatus |  | [][ModifiedStatus](#modifiedstatus) | false |
| nonReadyStatus |  | [][NonReadyStatus](#nonreadystatus) | false |

[Back to Custom Resources](#custom-resources)

#### NonReadyStatus



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| uid |  | types.UID | false |
| kind |  | string | false |
| apiVersion |  | string | false |
| namespace |  | string | false |
| name |  | string | false |
| summary |  | summary.Summary | false |

[Back to Custom Resources](#custom-resources)

#### Operation



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| op |  | string | false |
| path |  | string | false |
| value |  | string | false |

[Back to Custom Resources](#custom-resources)

#### Partition



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| name |  | string | false |
| maxUnavailable |  | *intstr.IntOrString | false |
| clusterName |  | string | false |
| clusterSelector |  | *metav1.LabelSelector | false |
| clusterGroup |  | string | false |
| clusterGroupSelector |  | *metav1.LabelSelector | false |

[Back to Custom Resources](#custom-resources)

#### PartitionStatus



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| name |  | string | false |
| count |  | int | false |
| maxUnavailable |  | int | false |
| unavailable |  | int | false |
| summary |  | [BundleSummary](#bundlesummary) | false |

[Back to Custom Resources](#custom-resources)

#### ResourceKey



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| kind |  | string | false |
| apiVersion |  | string | false |
| namespace |  | string | false |
| name |  | string | false |

[Back to Custom Resources](#custom-resources)

#### RolloutStrategy



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| maxUnavailable |  | *intstr.IntOrString | false |
| maxUnavailablePartitions |  | *intstr.IntOrString | false |
| autoPartitionSize |  | *intstr.IntOrString | false |
| partitions |  | [][Partition](#partition) | false |

[Back to Custom Resources](#custom-resources)

#### SecretKeySelector



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| namespace |  | string | false |
| key |  | string | false |

[Back to Custom Resources](#custom-resources)

#### ValuesFrom

Define helm values that can come from configmap, secret or external. Credit: https://github.com/fluxcd/helm-operator/blob/0cfea875b5d44bea995abe7324819432070dfbdc/pkg/apis/helm.fluxcd.io/v1/types_helmrelease.go#L439

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| configMapKeyRef | The reference to a config map with release values. | *[ConfigMapKeySelector](#configmapkeyselector) | false |
| secretKeyRef | The reference to a secret with release values. | *[SecretKeySelector](#secretkeyselector) | false |

[Back to Custom Resources](#custom-resources)

#### YAMLOptions



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| overlays |  | []string | false |

[Back to Custom Resources](#custom-resources)

#### AlphabeticalPolicy

AlphabeticalPolicy specifies a alphabetical ordering policy.

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| order | Order specifies the sorting order of the tags. Given the letters of the alphabet as tags, ascending order would select Z, and descending order would select A. | string | false |

[Back to Custom Resources](#custom-resources)

#### CommitSpec

CommitSpec specifies how to commit changes to the git repository

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| authorName | AuthorName gives the name to provide when making a commit | string | true |
| authorEmail | AuthorEmail gives the email to provide when making a commit | string | true |
| messageTemplate | MessageTemplate provides a template for the commit message, into which will be interpolated the details of the change made. | string | false |

[Back to Custom Resources](#custom-resources)

#### ImagePolicyChoice

ImagePolicyChoice is a union of all the types of policy that can be supplied.

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| semver | SemVer gives a semantic version range to check against the tags available. | *[SemVerPolicy](#semverpolicy) | false |
| alphabetical | Alphabetical set of rules to use for alphabetical ordering of the tags. | *[AlphabeticalPolicy](#alphabeticalpolicy) | false |

[Back to Custom Resources](#custom-resources)

#### ImageScan



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| metadata |  | metav1.ObjectMeta | false |
| spec |  | [ImageScanSpec](#imagescanspec) | false |
| status |  | [ImageScanStatus](#imagescanstatus) | false |

[Back to Custom Resources](#custom-resources)

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

[Back to Custom Resources](#custom-resources)

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

[Back to Custom Resources](#custom-resources)

#### SemVerPolicy

SemVerPolicy specifies a semantic version policy.

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| range | Range gives a semver range for the image tag; the highest version within the range that's a tag yields the latest image. | string | true |

[Back to Custom Resources](#custom-resources)

#### AgentStatus



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| lastSeen |  | metav1.Time | true |
| namespace |  | string | true |
| nonReadyNodes |  | int | true |
| readyNodes |  | int | true |
| nonReadyNodeNames | At most 3 nodes | []string | true |
| readyNodeNames | At most 3 nodes | []string | true |

[Back to Custom Resources](#custom-resources)

#### Cluster



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| metadata |  | metav1.ObjectMeta | false |
| spec |  | [ClusterSpec](#clusterspec) | false |
| status |  | [ClusterStatus](#clusterstatus) | false |

[Back to Custom Resources](#custom-resources)

#### ClusterDisplay



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| readyBundles |  | string | false |
| readyNodes |  | string | false |
| sampleNode |  | string | false |
| state |  | string | false |

[Back to Custom Resources](#custom-resources)

#### ClusterGroup



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| metadata |  | metav1.ObjectMeta | false |
| spec |  | [ClusterGroupSpec](#clustergroupspec) | true |
| status |  | [ClusterGroupStatus](#clustergroupstatus) | true |

[Back to Custom Resources](#custom-resources)

#### ClusterGroupDisplay



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| readyClusters |  | string | false |
| readyBundles |  | string | false |
| state |  | string | false |

[Back to Custom Resources](#custom-resources)

#### ClusterGroupSpec



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| selector |  | *metav1.LabelSelector | false |

[Back to Custom Resources](#custom-resources)

#### ClusterGroupStatus



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| clusterCount |  | int | true |
| nonReadyClusterCount |  | int | true |
| nonReadyClusters |  | []string | false |
| conditions |  | []genericcondition.GenericCondition | false |
| summary |  | [BundleSummary](#bundlesummary) | false |
| display |  | [ClusterGroupDisplay](#clustergroupdisplay) | false |
| resourceCounts |  | [GitRepoResourceCounts](#gitreporesourcecounts) | false |

[Back to Custom Resources](#custom-resources)

#### ClusterRegistration



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| metadata |  | metav1.ObjectMeta | false |
| spec |  | [ClusterRegistrationSpec](#clusterregistrationspec) | false |
| status |  | [ClusterRegistrationStatus](#clusterregistrationstatus) | false |

[Back to Custom Resources](#custom-resources)

#### ClusterRegistrationSpec



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| clientID |  | string | false |
| clientRandom |  | string | false |
| clusterLabels |  | map[string]string | false |

[Back to Custom Resources](#custom-resources)

#### ClusterRegistrationStatus



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| clusterName |  | string | false |
| granted |  | bool | false |

[Back to Custom Resources](#custom-resources)

#### ClusterRegistrationToken



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| metadata |  | metav1.ObjectMeta | false |
| spec |  | [ClusterRegistrationTokenSpec](#clusterregistrationtokenspec) | false |
| status |  | [ClusterRegistrationTokenStatus](#clusterregistrationtokenstatus) | false |

[Back to Custom Resources](#custom-resources)

#### ClusterRegistrationTokenSpec



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| ttl |  | *metav1.Duration | false |

[Back to Custom Resources](#custom-resources)

#### ClusterRegistrationTokenStatus



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| expires |  | *metav1.Time | false |
| secretName |  | string | false |

[Back to Custom Resources](#custom-resources)

#### ClusterSpec



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| paused | Paused if set to true, will stop any BundleDeployments from being updated. | bool | false |
| clientID | ClientID is a unique string that will identify the cluster. It can either be predefined, or generated when importing the cluster. | string | false |
| kubeConfigSecret | KubeConfigSecret is the name of the secret containing the kubeconfig for the downstream cluster. | string | false |
| redeployAgentGeneration | RedeployAgentGeneration can be used to force redeploying the agent. | int64 | false |
| agentEnvVars | AgentEnvVars are extra environment variables to be added to the agent deployment. | []v1.EnvVar | false |
| agentNamespace | AgentNamespace defaults to the system namespace, e.g. cattle-fleet-system. | string | false |
| privateRepoURL | PrivateRepoURL prefixes the image name and overrides a global repo URL from the agents config. | string | false |
| templateValues | TemplateValues defines a cluster specific mapping of values to be sent to fleet.yaml values templating. | *GenericMap | false |
| agentTolerations | AgentTolerations defines an extra set of Tolerations to be added to the Agent deployment. | []v1.Toleration | false |

[Back to Custom Resources](#custom-resources)

#### ClusterStatus



| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| conditions |  | []genericcondition.GenericCondition | false |
| namespace | Namespace is the cluster namespace, it contains the clusters service account as well as any bundledeployments. Example: \"cluster-fleet-local-cluster-294db1acfa77-d9ccf852678f\" | string | false |
| summary |  | [BundleSummary](#bundlesummary) | false |
| resourceCounts |  | [GitRepoResourceCounts](#gitreporesourcecounts) | false |
| readyGitRepos |  | int | true |
| desiredReadyGitRepos |  | int | true |
| agentEnvVarsHash |  | string | false |
| agentPrivateRepoURL |  | string | false |
| agentDeployedGeneration |  | *int64 | false |
| agentMigrated |  | bool | false |
| agentNamespaceMigrated |  | bool | false |
| cattleNamespaceMigrated |  | bool | false |
| display |  | [ClusterDisplay](#clusterdisplay) | false |
| agent |  | [AgentStatus](#agentstatus) | false |

[Back to Custom Resources](#custom-resources)
