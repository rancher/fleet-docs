---
title: ""
sidebar_label: "fleet cleanup gitjob"
---
## fleet cleanup gitjob

Clean up outdated git jobs

```
fleet cleanup gitjob [flags]
```

### Options

```
      --batch-size int      Number of git jobs to retrieve at once (default 5000)
      --context string      kubeconfig context for authentication
      --debug               Turn on debug logging
      --debug-level int     If debugging is enabled, set klog -v=X
  -h, --help                help for gitjob
  -k, --kubeconfig string   kubeconfig for authentication
  -n, --namespace string    namespace (default "fleet-local")
```

### SEE ALSO

* [fleet cleanup](./fleet_cleanup)	 - Clean up outdated resources

