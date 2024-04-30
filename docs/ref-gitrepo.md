# GitRepo Resource

The GitRepo resource describes git repositories, how to access them and where the bundles are located.

The content of the resource corresponds to the [GitRepoSpec](./ref-crds#gitrepospec).
For more information on how to use GitRepo resource, e.g. how to watch private repositories, see [Create a GitRepo Resource](./gitrepo-add.md).

```yaml
kind: GitRepo
apiVersion: fleet.cattle.io/v1alpha1
metadata:
  # Any name can be used here
  name: my-repo
  # For single cluster use fleet-local, otherwise use the namespace of
  # your choosing
  namespace: fleet-local
spec:
  # This can be a HTTPS or git URL.  If you are using a git URL then
  # clientSecretName will probably need to be set to supply a credential.
  # repo is the only required parameter for a repo to be monitored.
  #
  repo: https://github.com/rancher/fleet-examples

  # Enforce all resources go to this target namespace. If a cluster scoped
  # resource is found the deployment will fail.
  #
  # targetNamespace: app1

  # Any branch can be watched, this field is optional. If not specified the
  # branch is assumed to be master
  #
  # branch: master

  # A specific commit or tag can also be watched.
  #
  # revision: v0.3.0

  # For a private git repository you must supply a clientSecretName. A default
  # secret can be set at the namespace level using the GitRepoRestriction
  # type. Secrets must be of the type "kubernetes.io/ssh-auth" or
  # "kubernetes.io/basic-auth". The secret is assumed to be in the
  # same namespace as the GitRepo
  #
  # clientSecretName: my-ssh-key

  # If fleet.yaml contains a private Helm repo that requires authentication,
  # provide the credentials in a K8s secret and specify them here.
  # Danger: the credentials will be sent to all repositories referenced from
  # this gitrepo. See section below for more information.
  #
  # helmSecretName: my-helm-secret

  # Helm credentials from helmSecretName will be used if the helm repository url matches this regular expression.
  # Credentials will always be used if it is empty or not provided
  #
  # helmRepoURLRegex: https://charts.rancher.io/*

  # Contains the auth secret for private Helm repository for each path.
  # See [Create a GitRepo Resource](.gitrepo-add#use-different-helm-credentials-for-each-path)
  #
  # helmSecretNameForPaths: multi-helm-secret

  # To add additional ca-bundle for self-signed certs, caBundle can be
  # filled with base64 encoded pem data. For example:
  # `cat /path/to/ca.pem | base64 -w 0`
  #
  # caBundle: my-ca-bundle

  # Disable SSL verification for git repo
  #
  # insecureSkipTLSVerify: true

  # A git repo can read multiple paths in a repo at once.
  # The below field is expected to be an array of paths and
  # supports path globbing (ex: some/*/path)
  #
  # Example:
  # paths:
  # - single-path
  # - multiple-paths/*
  paths:
  - simple

  # PollingInterval configures how often fleet checks the git repo. The default
  # is 15 seconds.
  # Setting this to zero does not disable polling. It results in a 15s
  # interval, too.
  # As checking a git repo incurs a CPU cost, raising this value can help
  # lowering fleetcontroller's CPU usage if tens of git repos are used or more
  #
  # pollingInterval: 15s

  # When disablePolling is set to true the git repo won't be checked periodically.
  # It will rely on webhooks only.
  # See [Using Webhooks Instead of Polling](https://fleet.rancher.io/webhook)
  # disablePolling: false

  # Paused  causes changes in Git to not be propagated down to the clusters but
  # instead mark resources as OutOfSync
  #
  # paused: false

  # Increment this number to force a redeployment of contents from Git
  #
  # forceSyncGeneration: 0

  # The service account that will be used to perform this deployment.
  # This is the name of the service account that exists in the
  # downstream cluster in the cattle-fleet-system namespace. It is assumed
  # this service account already exists so it should be create before
  # hand, most likely coming from another git repo registered with
  # the Fleet manager.
  #
  # serviceAccount: moreSecureAccountThanClusterAdmin

  # Target clusters to deploy to if running Fleet in a multi-cluster
  # style. Refer to the "Mapping to Downstream Clusters" docs for
  # more information.
  # If empty, the "default" cluster group is used.
  #
  # targets: ...

  # Drift correction removes any external change made to resources managed by Fleet. It performs a helm rollback, which uses
  # a three-way merge strategy by default.
  # It will try to update all resources by doing a PUT request if force is enabled. Three-way strategic merge might fail when updating
  # an item inside of an array as it will try to add a new item instead of replacing the existing one. This can be fixed by using force.
  # Keep in mind that resources might be recreated if force is enabled.
  # Failed rollback will be removed from the helm history unless keepFailHistory is set to true.
  #
  #  correctDrift:
  #    enabled: false
  #    force: false #Warning: it might recreate resources if set to true
  #    keepFailHistory: false
```
