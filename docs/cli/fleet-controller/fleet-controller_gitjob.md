---
title: ""
sidebar_label: "fleet-controller gitjob"
---
## fleet-controller gitjob



```
fleet-controller gitjob [flags]
```

### Options

```
      --debug                         Turn on debug logging
      --debug-level int               If debugging is enabled, set klog -v=X
      --disable-metrics               Disable the metrics server.
      --gitjob-image string           The gitjob image that will be used in the generated job. (default "rancher/fleet:dev")
  -h, --help                          help for gitjob
      --kubeconfig string             Kubeconfig file
      --leader-elect                  Enable leader election for controller manager. Enabling this will ensure there is only one active controller manager. (default true)
      --listen string                 The port the webhook listens. (default ":8080")
      --metrics-bind-address string   The address the metric endpoint binds to. (default ":8081")
      --namespace string              namespace to watch (default "cattle-fleet-system")
      --shard-id string               only manage resources labeled with a specific shard ID
      --shard-node-selector string    node selector to apply to jobs based on the shard ID, if any
```

### SEE ALSO

* [fleet-controller](./)
