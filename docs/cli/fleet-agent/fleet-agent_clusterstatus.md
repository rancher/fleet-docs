---
title: ""
sidebar_label: "fleet-agent clusterstatus"
---
## fleet-agent clusterstatus

Continuously report resource status to the upstream cluster

```
fleet-agent clusterstatus [flags]
```

### Options

```
      --checkin-interval string   How often to post cluster status
      --debug                     Turn on debug logging
      --debug-level int           If debugging is enabled, set klog -v=X
  -h, --help                      help for clusterstatus
      --kubeconfig string         kubeconfig file for agent's cluster
      --namespace string          system namespace is the namespace, the agent runs in, e.g. cattle-fleet-system
```

### Options inherited from parent commands

```
      --agent-scope string   An identifier used to scope the agent bundleID names, typically the same as namespace
```

### SEE ALSO

* [fleet-agent](./fleet-agent)	 - 

