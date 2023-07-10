# Adding a GitRepo

## Proper namespace
Git repos are added to the Fleet manager using the `GitRepo` custom resource type. The `GitRepo` type is namespaced. By default, Rancher will create two Fleet workspaces: **fleet-default** and **fleet-local**.

- `Fleet-default` will contain all the downstream clusters that are already registered through Rancher.
- `Fleet-local` will contain the local cluster by default.

If you are using Fleet in a [single cluster](./concepts.md) style, the namespace will always be **fleet-local**. Check [here](https://fleet.rancher.io/namespaces/#fleet-local) for more on the `fleet-local` namespace.

For a [multi-cluster](./concepts.md) style, please ensure you use the correct repo that will map to the right target clusters.

## Create GitRepo instance

Git repositories are register by creating a `GitRepo` following the below YAML sample.  Refer
to the inline comments as the means of each field

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

  # For a private registry you must supply a clientSecretName. A default
  # secret can be set at the namespace level using the GitRepoRestriction
  # type. Secrets must be of the type "kubernetes.io/ssh-auth" or
  # "kubernetes.io/basic-auth". The secret is assumed to be in the
  # same namespace as the GitRepo
  #
  # clientSecretName: my-ssh-key
  #
  # If fleet.yaml contains a private Helm repo that requires authentication,
  # provide the credentials in a K8s secret and specify them here.
  # Danger: the credentials will be sent to all repositories referenced from
  # this gitrepo. See section below for more information.
  #
  # helmSecretName: my-helm-secret
  #
  # To add additional ca-bundle for self-signed certs, caBundle can be
  # filled with base64 encoded pem data. For example:
  # `cat /path/to/ca.pem | base64 -w 0`
  #
  # caBundle: my-ca-bundle
  #
  # Disable SSL verification for git repo
  #
  # insecureSkipTLSVerify: true
  #
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
  #
  # targets: ...
```

## Adding Private Git Repository

Fleet supports both http and ssh auth key for private repository. To use this you have to create a secret in the same namespace.

For example, to generate a private ssh key

```text
ssh-keygen -t rsa -b 4096 -m pem -C "user@email.com"
```

Note: The private key format has to be in `EC PRIVATE KEY`, `RSA PRIVATE KEY` or `PRIVATE KEY` and should not contain a passphase.

Put your private key into secret, use the namespace the GitRepo is in:

```text
kubectl create secret generic ssh-key -n fleet-default --from-file=ssh-privatekey=/file/to/private/key  --type=kubernetes.io/ssh-auth
```

:::caution

Private key with passphrase is not supported.

:::

:::caution

The key has to be in PEM format.

:::

Fleet supports putting `known_hosts` into ssh secret. Here is an example of how to add it:

Fetch the public key hash(take github as an example)

```text
ssh-keyscan -H github.com
```

And add it into secret:

```text
apiVersion: v1
kind: Secret
metadata:
  name: ssh-key
type: kubernetes.io/ssh-auth
stringData:
  ssh-privatekey: <private-key>
  known_hosts: |-
    |1|YJr1VZoi6dM0oE+zkM0do3Z04TQ=|7MclCn1fLROZG+BgR4m1r8TLwWc= ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEAq2A7hRGmdnm9tUDbO9IDSwBK6TbQa+PXYPCPy6rbTrTtw7PHkccKrpp0yVhp5HdEIcKr6pLlVDBfOLX9QUsyCOV0wzfjIJNlGEYsdlLJizHhbn2mUjvSAHQqZETYP81eFzLQNnPHt4EVVUh7VfDESU84KezmD5QlWpXLmvU31/yMf+Se8xhHTvKSCZIFImWwoG6mbUoWf9nzpIoaSjB+weqqUUmpaaasXVal72J+UX2B+2RPW3RcT0eOzQgqlJL3RKrTJvdsjE3JEAvGq3lGHSZXy28G3skua2SmVi/w4yCE6gbODqnTWlg7+wC604ydGXA8VJiS5ap43JXiUFFAaQ==
```

:::warning

If you don't add it any server's public key will be trusted and added. (`ssh -o stricthostkeychecking=accept-new` will be used)

:::

:::info

If you are using openssh format for the private key and you are creating it in the UI, make sure a carriage return is appended in the end of the private key.

:::

### Using HTTP Auth

Create a secret containing username and password. You can replace the password with a personal access token if necessary. Also see [HTTP secrets in Github](./troubleshooting#http-secrets-in-github).

    kubectl create secret generic basic-auth-secret -n fleet-default --type=kubernetes.io/basic-auth --from-literal=username=$user --from-literal=password=$pat

Just like with SSH, reference the secret in your GitRepo resource via `clientSecretName`.

    spec:
      repo: https://github.com/fleetrepoci/gitjob-private.git
      branch: main
      clientSecretName: basic-auth-secret

## Using Private Helm Repositories

:::warning
The credentials will be used unconditionally for all Helm repositories referenced by the gitrepo resource.
Make sure you don't leak credentials by mixing public and private repositories. As a workaround, split them into different gitrepos.
:::

For a private Helm repo, users can reference a secret with the following keys:

1. `username` and `password` for basic http auth if the Helm HTTP repo is behind basic auth.

2. `cacerts` for custom CA bundle if the Helm repo is using a custom CA.

3. `ssh-privatekey` for ssh private key if repo is using ssh protocol. Private key with passphase is not supported currently.

For example, to add a secret in kubectl, run

`kubectl create secret -n $namespace generic helm --from-literal=username=foo --from-literal=password=bar --from-file=cacerts=/path/to/cacerts --from-file=ssh-privatekey=/path/to/privatekey.pem`

After secret is created, specify the secret to `gitRepo.spec.helmSecretName`. Make sure secret is created under the same namespace with gitrepo.


# Troubleshooting

See Fleet Troubleshooting section [here](./troubleshooting.md).
