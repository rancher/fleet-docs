---
title: ""
sidebar_label: "fleet"
---
## fleet



```
fleet [flags]
```

### Options

```
      --context string            kubeconfig context for authentication
      --debug                     Turn on debug logging
      --debug-level int           If debugging is enabled, set klog -v=X
  -h, --help                      help for fleet
  -k, --kubeconfig string         kubeconfig for authentication
  -n, --namespace string          namespace (default "fleet-local")
      --system-namespace string   System namespace of the controller (default "cattle-fleet-system")
```

### SEE ALSO

* [fleet apply](./fleet_apply)	 - Render a bundle into a Kubernetes resource and apply it in the Fleet Manager
* [fleet test](./fleet_test)	 - Match a bundle to a target and render the output

