# HelmOps

HelmOps is a simplified way of creating bundles by directly pointing to a Helm repository or to an OCI registry, without
needing to set up a git repository.

It is currently an experimental feature.

## Summary

When a `GitRepo` resource is created, Fleet monitors a git repository, creating one or more bundles from paths specified
in the `GitRepo`, following a GitOps, or git-driven, approach to continuous deployment. This requires a git repository
to be available, possibly containing `fleet.yaml` or other configuration files.

HelmOps, on the other hand, enables a `HelmOp` resource to be created, with similar options to those available in a
`GitRepo` resource and/or in a `fleet.yaml` file for targeting bundles to clusters, configuring chart values, etc.

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
