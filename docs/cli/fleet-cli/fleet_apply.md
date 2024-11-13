---
title: ""
sidebar_label: "fleet apply"
---
## fleet apply

Create bundles from directories, and output them or apply them on a cluster

```
fleet apply [flags] BUNDLE_NAME PATH...
```

### Options

```
  -b, --bundle-file string                     Location of the raw Bundle resource yaml
      --cacerts-file string                    Path of custom cacerts for helm repo
      --commit string                          Commit to assign to the bundle
  -c, --compress                               Force all resources to be compress
      --context string                         kubeconfig context for authentication
      --correct-drift                          Rollback any change made from outside of Fleet
      --correct-drift-force                    Use --force when correcting drift. Resources can be deleted and recreated
      --correct-drift-keep-fail-history        Keep helm history for failed rollbacks
      --debug                                  Turn on debug logging
      --debug-level int                        If debugging is enabled, set klog -v=X
      --delete-namespace                       Delete GitRepo target namespace after the GitRepo or Bundle is deleted
  -f, --file string                            Location of the fleet.yaml
      --helm-credentials-by-path-file string   Path of file containing helm credentials for paths
      --helm-repo-url-regex string             Helm credentials will be used if the helm repo matches this regex. Credentials will always be used if this is empty or not provided
  -h, --help                                   help for apply
      --keep-resources                         Keep resources created after the GitRepo or Bundle is deleted
  -k, --kubeconfig string                      kubeconfig for authentication
  -l, --label strings                          Labels to apply to created bundles
  -n, --namespace string                       namespace (default "fleet-local")
      --oci-basic-http                         Use HTTP to access the OCI regustry
      --oci-insecure                           Allow connections to OCI registry without certs
      --oci-password-file string               Path of file containing basic auth password for OCI registry
      --oci-reference string                   OCI registry reference
      --ociusername string                     Basic auth username for OCI registry
  -o, --output string                          Output contents to file or - for stdout
      --password-file string                   Path of file containing basic auth password for helm repo
      --paused                                 Create bundles in a paused state
  -a, --service-account string                 Service account to assign to bundle created
      --ssh-privatekey-file string             Path of ssh-private-key for helm repo
      --sync-generation int                    Generation number used to force sync the deployment
      --target-namespace string                Ensure this bundle goes to this target namespace
      --targets-file string                    Addition source of targets and restrictions to be append
      --username string                        Basic auth username for helm repo
```

### SEE ALSO

* [fleet](./fleet)	 - 

