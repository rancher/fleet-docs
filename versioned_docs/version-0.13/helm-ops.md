# HelmOps

HelmOps is a simplified way of creating bundles by directly pointing to a Helm repository or to an OCI registry, without
needing to set up a git repository.

## Summary

When a `GitRepo` resource is created, Fleet monitors a git repository, creating one or more bundles from paths specified
in the `GitRepo`, following a GitOps, or git-driven, approach to continuous deployment. This requires a git repository
to be available, possibly containing `fleet.yaml` or other configuration files.

HelmOps, on the other hand, relies on a Helm registry as its source of truth, just as GitOps uses a git repository.
Leveraging HelmOps is done by creating a `HelmOp` resource, with similar options to those available in a `GitRepo`
resource and/or in a `fleet.yaml` file for targeting bundles to clusters, configuring chart values, etc.

HelmOps is the concept. A `HelmOp` is a custom Kubernetes resource managed by Fleet.

The Fleet HelmOps controller will create lightweight bundles, pointing to referenced Helm charts, without downloading
them.
However, it will resolve chart versions to ensure that the same, and latest, version of a chart is deployed to all
targeted downstream clusters. This applies to the following cases:
* a wildcard or empty version is specified
* a [semantic versioning](https://semver.org/) constraint is specified, such as `0.1.x`, `< 2.0.0`. More information on
  supported constraints [here](https://github.com/Masterminds/semver?tab=readme-ov-file#checking-version-constraints).
When constraints are invalid or no matching version can be found, Fleet will display a descriptive error message.

When using this feature, Helm charts are downloaded from downstream clusters, which must therefore have access to Helm
registries.

## Creating a HelmOp resource

A `HelmOp` resource can be created as follows to start deploying Helm charts directly:

```yaml
apiVersion: fleet.cattle.io/v1alpha1
kind: HelmOp
metadata:
  name: my-awesome-helmop
  namespace: "fleet-local"
spec:
  helm:
    releaseName: my-fantastic-chart
    repo: https://foo.bar/baz
    chart: fantastic-chart
    version: ''
  namespace: that-amazing-namespace
  helmSecretName: my-top-secret-helm-access
  insecureSkipTLSVerify: false
```

For private charts, this requires a Helm access secret (referenced by field `helmSecretName`) to be created in the same
namespace as the `HelmOp` resource.
The Fleet HelmOps controller will take care of copying that secret to targeted downstream clusters, enabling the Fleet
agent to access the registry.

## Supported use cases

With 3 fields available to reference a Helm chart, let's clarify a few rules.
As per the Helm install [documentation](https://helm.sh/docs/helm/helm_install/), there are 6 ways of expressing a chart
to install. 3 of them use either repository aliases or the local filesystem, which are not available in Fleet's HelmOps
context. This leaves us with 3 options:

### Absolute URL

Referencing a Helm chart by absolute URL is as simple as providing a URL to a `.tgz` file in the `chart` field. Helm
options would look like:
```yaml
  helm:
    chart: https://example.com/charts/my-chart-1.2.3.tgz

    # can be omitted
    repo: ''
    version: ''
```

If a non-empty repo, or a non-empty version is specified in this case, an error will appear in the HelmOp status and no
bundle will be created, aborting deployment.

### Chart reference and repo URL

A Helm chart can also be referenced through its repository and chart name, with an optional version, which may be a
static version or a version constraint.

In this case, polling can make sense, because referencing the chart using a repository allows Fleet to check the
repository's `index.yaml` for available versions matching the `version` field.

Example:
```yaml
  helm:
    repo: https://foo.bar/baz
    chart: fantastic-chart
    version: '1.2.3'
```

In this case, only the `version` field may be empty. If any of the `chart` or `repo` field is empty, Fleet will set an
error in the HelmOp status and no bundle will be created.

### OCI registry

Helm supports OCI registries, which can be referenced in Fleet using the `repo` field.

In this case, Helm options would be similar to this:

```yaml
  helm:
    repo: oci://foo.bar/baz
    version: '1.2.3' # optional
```

When an OCI URL is provided in the `repo` field, a non-empty `chart` field will lead to an error in the HelmOps status,
and no bundle being created.

:::note
In this case, Fleet will be downloading OCI artifacts. This means that:
* the `version` field represents an OCI artifact's tag, which may be different to the actual version of the
chart stored in the OCI artifact.
* polling is supported: Fleet can check available OCI tags matching both the provided repository and version constraint
on a regular basis, configured through the polling interval.
* an OCI artifact may contain multiple Helm charts. This use case has only been validated with OCI artifacts containing
  a single Helm chart.
:::

## Polling

Fleet can poll the referenced Helm registry, periodically checking if new versions are available.
Of course, this only makes sense if the `version` field contains a version constraint, which may resolve to multiple
versions.

### How to enable it

Polling involves a `pollingInterval` field, similar to what exists for GitOps. However, in the HelmOps case, the default
polling interval is 0 seconds, meaning that polling will be disabled.

The following conditions must be met on a HelmOp resource for Fleet to enable polling on it:
* the `pollingInterval` field is set to a non-zero duration (e.g. `10s`, `1m`, etc)
* the `version` field is set to a valid semantic versioning constraint (e.g. `2.x.x`, `< 1.0`), not a static version
(e.g. 1.2.3)

### What it does

When polling is enabled, Fleet does the following at the configured interval:
* checking the referenced Helm registry for the latest version matching the version constraint configured in the
`version` field
* if a new version is found, setting that version on the Bundle created from the HelmOp object, so that the new version
  of the chart will be installed on all targeted clusters
* updating the status of the HelmOp resource:
    * setting its `Polled` condition:
        * with `true` if polling was successful
        * with `false` with an error if a failure happened
    * updating the `Last Polling Time` field to the starting time of the last polling attempt, even if it failed.

## Status updates

Creating a HelmOp resource leads to a bundle being created, if Helm options are valid and a chart version can be found.

The status of that bundle will evolve over time, as bundle deployments are created from it, for each target cluster, and
as these bundle deployments' statuses themselves evolve and are propagated back to the bundle.

Fleet propagates updates from the bundle status to the status of the HelmOp resource itself.
This includes:
* a display status with a summary, expected and ready cluster counts
* conditions providing more information about the state of the resource, whether it is valid and its deployments are
ready
* resource counts by status

See [status fields](./ref-status-fields.md) for more details on resource counts and conditions.
 