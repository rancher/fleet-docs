---
title: ""
sidebar_label: "fleet-manager gitjob"
---
## fleet-manager gitjob



```
fleet-manager gitjob [flags]
```

### Options

```
      --debug                         Turn on debug logging
      --debug-level int               If debugging is enabled, set klog -v=X
      --gitjob-image string           The gitjob image that will be used in the generated job. (default "rancher/fleet:dev")
  -h, --help                          help for gitjob
      --kubeconfig string             Kubeconfig file
      --leader-elect                  Enable leader election for controller manager. Enabling this will ensure there is only one active controller manager.
      --listen string                 The port the webhook listens. (default ":8080")
      --metrics-bind-address string   The address the metric endpoint binds to. (default ":8081")
      --namespace string              namespace to watch (default "cattle-fleet-system")
```

### Options inherited from parent commands

```
      --disable-gitops    disable gitops components
      --disable-metrics   disable metrics
      --shard-id string   only manage resources labeled with a specific shard ID
```

### SEE ALSO

* [fleet-manager](./fleet-manager)	 - 

