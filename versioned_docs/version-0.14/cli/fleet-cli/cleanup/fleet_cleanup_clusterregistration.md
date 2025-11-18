---
title: ""
sidebar_label: "fleet cleanup clusterregistration"
---
## fleet cleanup clusterregistration

Clean up outdated cluster registrations

```
fleet cleanup clusterregistration [flags]
```

### Options

```
      --context string      kubeconfig context for authentication
      --debug               Turn on debug logging
      --debug-level int     If debugging is enabled, set klog -v=X
      --factor string       Factor to increase delay between deletes (default: 1.1)
  -h, --help                help for clusterregistration
  -k, --kubeconfig string   kubeconfig for authentication
      --max string          Maximum delay between deletes (default: 5s)
      --min string          Minimum delay between deletes (default: 10ms)
  -n, --namespace string    namespace (default "fleet-local")
```

### SEE ALSO

* [fleet cleanup](./fleet_cleanup)	 - Clean up outdated resources

