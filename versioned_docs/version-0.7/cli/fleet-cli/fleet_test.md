---
title: ""
sidebar_label: "fleet test"
---
## fleet test

Match a bundle to a target and render the output

```
fleet test [flags]
```

### Options

```
  -b, --bundle-file string    Location of the raw Bundle resource yaml
      --debug                 Turn on debug logging
      --debug-level int       If debugging is enabled, set klog -v=X
  -f, --file string           Location of the fleet.yaml
  -g, --group string          Cluster group to match against
  -L, --group-label strings   Cluster group labels to match against
  -h, --help                  help for test
  -l, --label strings         Cluster labels to match against
  -N, --name string           Cluster name to match against
  -q, --quiet                 Just print the match and don't print the resources
  -t, --target string         Explicit target to match
```

### Options inherited from parent commands

```
      --context string            kubeconfig context for authentication
  -k, --kubeconfig string         kubeconfig for authentication
  -n, --namespace string          namespace (default "fleet-local")
      --system-namespace string   System namespace of the controller (default "cattle-fleet-system")
```

### SEE ALSO

* [fleet](./fleet)	 - 

