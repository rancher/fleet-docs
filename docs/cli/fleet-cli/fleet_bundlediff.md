---
title: ""
sidebar_label: "fleet bundlediff"
---
## fleet bundlediff

Display bundle diffs from resource status.

This command extracts and displays the diff patches from `Bundle` or `BundleDeployment`
resources that have been modified. The diffs show the differences between the desired
state (from Git/Helm) and the actual state in the cluster.

For `BundleDeployment`s, the command shows the patch information from the `ModifiedStatus`
field, which contains JSON patches indicating what has been changed on deployed resources.

For `Bundle`s, the command aggregates diff information from all associated `BundleDeployment`s
across target clusters.

By default, the command searches for `BundleDeployment`s across all namespaces. Restrict to a
specific namespace using the `-n` flag, which is required when querying a `BundleDeployment`
by name.

```
fleet bundlediff [flags]
```

### Options

```
  -b, --bundle string              Name of the Bundle to show diffs for all its BundleDeployments
      --bundle-deployment string   Name of the BundleDeployment to show diffs for
      --fleet-yaml                 Output in fleet.yaml format (comparePatches)
      --json                       Output in JSON format
  -h, --help                       help for bundlediff
  -n, --namespace string           Namespace to restrict the search to
      --zap-devel                         Development Mode defaults(encoder=consoleEncoder,logLevel=Debug,stackTraceLevel=Warn). Production Mode defaults(encoder=jsonEncoder,logLevel=Info,stackTraceLevel=Error) (default true)
      --zap-encoder encoder               Zap log encoding (one of 'json' or 'console')
      --zap-log-level level               Zap Level to configure the verbosity of logging. Can be one of 'debug', 'info', 'error', or any integer value > 0 which corresponds to custom debug levels of increasing verbosity
      --zap-stacktrace-level level        Zap Level at and above which stacktraces are captured (one of 'info', 'error', 'panic').
      --zap-time-encoding time-encoding   Zap time encoding (one of 'epoch', 'millis', 'nano', 'iso8601', 'rfc3339' or 'rfc3339nano'). Defaults to 'epoch'.
```

### Examples

```bash
# Show diffs for all Bundles across all namespaces (grouped by Bundle)
fleet bundlediff

# Show all BundleDeployments for a specific Bundle
fleet bundlediff --bundle my-bundle

# Show a specific BundleDeployment in a cluster namespace
fleet bundlediff --bundle-deployment my-bundle-deployment -n cluster-fleet-local-local-abc123

# Output in JSON format
fleet bundlediff --json

# Output as a fleet.yaml diff snippet for a specific BundleDeployment
# This generates a diff: section you can add to your fleet.yaml in Git
fleet bundlediff --fleet-yaml --bundle-deployment my-bundle-deployment -n cluster-fleet-local-local-abc123

# Show diffs only in a specific namespace
fleet bundlediff -n cluster-fleet-local-local-abc123
```

### SEE ALSO

* [fleet](./fleet)	 -
