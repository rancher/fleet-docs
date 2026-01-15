---
title: ""
sidebar_label: "fleet dump"
---
## fleet dump

Dump cluster data into an archive.

## Overview

Dump data from a cluster into an archive, including:
* Fleet-managed resources
* Kubernetes events
* Metrics exposed by Fleet controllers

```
fleet dump <flags>
```

### Flags

```
  -p <path>         Path to the archive file to generate
```

### Output

#### Contents

The `dump` command produces a `.tgz` archive containing the following data:
* Raw Fleet resources, in YAML format:
    * Bundles
    * BundleDeployments
    * BundleNamespaceMappings
    * Clusters
    * ClusterGroups
    * GitRepos
    * GitRepoRestrictions
    * HelmOps
* Kubernetes events for the following namespaces:
    * `cattle-fleet-system`
    * `cattle-fleet-local-system`
    * `default`
    * `kube-system`
    * each namespace containing a Fleet `Cluster` resource
* Metrics exposed by `monitoring-*` services living in the `cattle-fleet-system` namespace.
This typically includes `monitoring-gitjob` and `monitoring-fleet-controller` services, as well as their
[sharded](../../installation#multi-controller-install-sharding) counterparts, if any.

#### Format

Raw Fleet resources are each stored in a different file, named as `<kind>_<namespace>_<name>`.

Kubernetes events are split into files by namespace, each file named as `events_<namespace>`.
They contain one event per line, each event being encoded in JSON.

Metrics are stored into files by service, each file being named `metrics_<service_name>`.
Their contents are `GET` response bodies received from each service's `/metrics` endpoint, verbatim.

### SEE ALSO

* [fleet](./fleet)
* [fleet monitor](./fleet_monitor)
