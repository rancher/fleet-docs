# Create a GitRepo Resource

## Create GitRepo Instance

Git repositories are registered by creating a `GitRepo` resource in Kubernetes. Refer
to the [creating a deployment tutorial](./tut-deployment.md) for examples.

The available fields are documented in the [GitRepo resource reference](./ref-gitrepo.md)

## Using Helm Values

__How changes are applied to `values.yaml`__:

- Note that the most recently applied changes to the `values.yaml` will override any previously existing values.

- When changes are applied to the `values.yaml` from multiple sources at the same time, the values will update in the following order: `helm.values` -> `helm.valuesFiles` -> `helm.valuesFrom`. That means `valuesFrom` will take precedence over both, `valuesFiles` and `values`.

### Using ValuesFrom

These examples showcase the style and format for using `valuesFrom`. ConfigMaps and Secrets should be created in *downstream clusters*.

Example [ConfigMap](https://kubernetes.io/docs/concepts/configuration/configmap/):

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: configmap-values
  namespace: default
data:  
  values.yaml: |-
    replication: true
    replicas: 2
    serviceType: NodePort
```

Example [Secret](https://kubernetes.io/docs/concepts/configuration/secret/):

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: secret-values
  namespace: default
stringData:
  values.yaml: |-
    replication: true
    replicas: 3
    serviceType: NodePort
```

A secret like that, can be created from a YAML file `secretdata.yaml` by running the following kubectl command: `kubectl create secret generic secret-values --from-file=values.yaml=secretdata.yaml`

The resources can then be referenced from a `fleet.yaml`:

```yaml
helm:
  chart: simple-chart
  valuesFrom:
    - secretKeyRef:
        name: secret-values
        namespace: default
        key: values.yaml
    - configMapKeyRef:
        name: configmap-values
        namespace: default
        key: values.yaml
  values:
    replicas: "4"
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
Make sure you don't leak credentials by mixing public and private repositories. Split them into different gitrepos, or use
`helmRepoUrlRegex` to limit the scope of credentials to certain servers.
:::

For a private Helm repo, users can reference a secret with the following keys:

1. `username` and `password` for basic http auth if the Helm HTTP repo is behind basic auth.

2. `cacerts` for custom CA bundle if the Helm repo is using a custom CA.

3. `ssh-privatekey` for ssh private key if repo is using ssh protocol. Private key with passphase is not supported currently.

For example, to add a secret in kubectl, run

`kubectl create secret -n $namespace generic helm --from-literal=username=foo --from-literal=password=bar --from-file=cacerts=/path/to/cacerts --from-file=ssh-privatekey=/path/to/privatekey.pem`

After secret is created, specify the secret to `gitRepo.spec.helmSecretName`. Make sure secret is created under the same namespace with gitrepo.

:::note
If you are using ["rancher-backups"](https://ranchermanager.docs.rancher.com/how-to-guides/new-user-guides/backup-restore-and-disaster-recovery/back-up-rancher) and want this secret to be included the backup, please add the label `resources.cattle.io/backup: true` to the secret. In that case, make sure to encrypt the backup to protect sensitive credentials.


# Troubleshooting

See Fleet Troubleshooting section [here](./troubleshooting.md).
