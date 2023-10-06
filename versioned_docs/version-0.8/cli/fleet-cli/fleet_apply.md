---
title: ""
sidebar_label: "fleet apply"
---
## fleet apply

Render a bundle into a Kubernetes resource and apply it in the Fleet Manager

```
fleet apply [flags] BUNDLE_NAME PATH...
```

### Options

```
  -b, --bundle-file string           Location of the raw Bundle resource yaml
      --cacerts-file string          Path of custom cacerts for helm repo
      --commit string                Commit to assign to the bundle
  -c, --compress                     Force all resources to be compress
      --debug                        Turn on debug logging
      --debug-level int              If debugging is enabled, set klog -v=X
  -f, --file string                  Location of the fleet.yaml
  -h, --help                         help for apply
  -l, --label strings                Labels to apply to created bundles
  -o, --output string                Output contents to file or - for stdout
      --password-file string         Path of file containing basic auth password for helm repo
      --paused                       Create bundles in a paused state
  -a, --service-account string       Service account to assign to bundle created
      --ssh-privatekey-file string   Path of ssh-private-key for helm repo
      --sync-generation int          Generation number used to force sync the deployment
      --target-namespace string      Ensure this bundle goes to this target namespace
      --targets-file string          Addition source of targets and restrictions to be append
      --username string              Basic auth username for helm repo
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

