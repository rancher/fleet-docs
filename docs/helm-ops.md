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
