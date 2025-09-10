# Create a GitRepo Resource

## Create GitRepo Instance

Git repositories are registered by creating a `GitRepo` resource in Kubernetes. Refer
to the [creating a deployment tutorial](./tut-deployment.md) for examples.

[Git Repository Contents](./gitrepo-content.md) has detail about the content of the Git repository.

The available fields of the GitRepo custom resource are documented in the [GitRepo resource reference](./ref-gitrepo.md)

:::note
Fleet does not support SSH proxy server authentication when cloning [private Git](#adding-a-private-git-repository) or [Helm](#using-private-helm-repositories) repositories. Use HTTPS authentication with a username and password or a personal access token.
:::

### Proper Namespace

Git repos are added to the Fleet manager using the `GitRepo` custom resource type. The `GitRepo` type is namespaced. By default, Rancher will create two Fleet workspaces: **fleet-default** and **fleet-local**.

- `fleet-default` will contain all the downstream clusters that are already registered through Rancher.
- `fleet-local` will contain the local cluster by default.

If you are using Fleet in a [single cluster](./concepts.md) style, the namespace will always be **fleet-local**. Check [here](https://fleet.rancher.io/namespaces#fleet-local) for more on the `fleet-local` namespace.

For a [multi-cluster](./concepts.md) style, please ensure you use the correct repo that will map to the right target clusters.

## Override Workload's Namespace

The `targetNamespace` field will override any namespace in the bundle. If the deployment contains cluster scoped resources, it will fail.

It takes precendence over all other namespace definitions:

`gitRepo.targetNamespace > fleet.yaml namespace > namespace in workload's manifest > fleet.yaml defaultNamespace`


Workload namespace definitions can be restricted with `allowedTargetNamespaces` in the `GitRepoRestriction` resource.

## Adding A Private Git Repository

Fleet supports both HTTP and SSH auth keys for private repositories. To use this, you have to create a secret in the
`GitRepo`'s namespace.

For example, to generate a private SSH key:

```text
ssh-keygen -t rsa -b 4096 -m pem -C "user@email.com"
```
:::note
The private key format has to be in `EC PRIVATE KEY`, `RSA PRIVATE KEY` or `PRIVATE KEY` and should not contain a passphase.
:::

Put your private key into secret, use the namespace the GitRepo is in:

```text
kubectl create secret generic ssh-key -n fleet-default --from-file=ssh-privatekey=/file/to/private/key  --type=kubernetes.io/ssh-auth
```

Now the `clientSecretName` must be specified in the repo definition:

```text
apiVersion: fleet.cattle.io/v1alpha1
kind: GitRepo
metadata:
  name: sample-ssh
  # This namespace is special and auto-wired to deploy to the local cluster
  namespace: fleet-local
spec:
  # Everything from this repo will be run in this cluster. You trust me right?
  repo: "git@github.com:rancher/fleet-examples"
  # or
  # repo: "ssh://git@github.com/rancher/fleet-examples"
  clientSecretName: ssh-key
  paths:
  - simple
```

:::caution

Private key with passphrase is not supported.

:::

:::caution

The key has to be in PEM format.

:::

### Known hosts

Fleet supports injecting `known_hosts` into an SSH secret. Here is an example of how to add it:

Fetch the public key hash (taking Github as an example)

```bash
ssh-keyscan -H github.com
```

And add it into the secret:

```yaml
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

#### Strict host key checks

Chart value `insecureSkipHostKeyChecks` defines how Fleet behaves with regards to `known_hosts` when establishing SSH
connections.

When that value is set to `false`, Fleet will enforce strict host key checks, meaning that it will fail to establish any
SSH connections to hosts for which no matching `known_hosts` entry can be found.
This is the default behaviour from Fleet v0.13 onwards.

`known_hosts` entries are sourced in priority from secrets referenced in `GitRepo`s, e.g. `helmSecretName` for accessing
Helm charts or `clientSecretName` for cloning git repositories.

Note that this is compatible with Fleet looking for a `gitcredential` secret if no secret is referenced in the
`GitRepo`.

If no such secret exists, or no `known_hosts` entries are available in that secret, then Fleet uses its own
`known-hosts` config map, newly created at installation time with static entries for the most widely used git providers.

Host key fingerprints added to the config map are sourced, respectively:
* from [here](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/githubs-ssh-key-fingerprints) for
Github
* from [here](https://docs.gitlab.com/ee/user/gitlab_com/index.html#ssh-known_hosts-entries) for Gitlab
* from [here](https://support.atlassian.com/bitbucket-cloud/docs/configure-ssh-and-two-step-verification/) for
Bitbucket, which also provides a `curl` command to fetch them in `known_hosts`-friendly format: `curl
https://bitbucket.org/site/ssh`
* from [here](https://learn.microsoft.com/en-us/azure/devops/repos/git/use-ssh-keys-to-authenticate?view=azure-devops)
for Azure DevOps

The absence of the config map, should no secret be available, is considered a symptom of an incomplete Fleet deployment,
and reported as such.

Fleet only uses a _single_ source of `known_hosts` entries at a time. This means that, even if a secret contains invalid
(or insufficient) entries, then Fleet will not look for valid entries in the config map. This applies to a secret
referenced in a `GitRepo` as well as to a possible `gitcredential` secret, if no secret is referenced in the `GitRepo`.

### Using HTTP Auth

Create a secret containing username and password. You can replace the password with a personal access token if necessary. Also see [HTTP secrets in Github](./troubleshooting#http-secrets-in-github).

    kubectl create secret generic basic-auth-secret -n fleet-default --type=kubernetes.io/basic-auth --from-literal=username=$user --from-literal=password=$pat

Just like with SSH, reference the secret in your GitRepo resource via `clientSecretName`.

    spec:
      repo: https://github.com/fleetrepoci/gitjob-private.git
      branch: main
      clientSecretName: basic-auth-secret


### Using Custom CA Bundles

Validating a repository using a certificate signed by a custom Certificate Authority can be done by specifying a
`cabundle` field in a `GitRepo`.

:::info
Note that if secrets specifying CA bundles exist, for instance if Fleet is installed with Rancher (see
[this](https://ranchermanager.docs.rancher.com/getting-started/installation-and-upgrade/resources/add-tls-secrets#using-a-private-ca-signed-certificate)
and
[that](https://ranchermanager.docs.rancher.com/getting-started/installation-and-upgrade/installation-references/helm-chart-options#additional-trusted-cas)),
Fleet will use those CA bundles if no CA bundle is specified in the `GitRepo`.
:::

## Using Private Helm Repositories

:::warning
The credentials will be used unconditionally for all Helm repositories referenced by the gitrepo resource.
Make sure you don't leak credentials by mixing public and private repositories. Use [different helm credentials for each path](#use-different-helm-credentials-for-each-path),
or split them into different gitrepos, or use `helmRepoURLRegex` to limit the scope of credentials to certain servers.
:::

For a private Helm repo, users can reference a secret with the following keys:

1. `username` and `password` for basic http auth if the Helm HTTP repo is behind basic auth.

2. `cacerts` for custom CA bundle if the Helm repo is using a custom CA.
    :::info
    Note that if secrets specifying CA bundles exist, for instance if Fleet is installed with Rancher (see
    [this](https://ranchermanager.docs.rancher.com/getting-started/installation-and-upgrade/resources/add-tls-secrets#using-a-private-ca-signed-certificate)
    and
    [that](https://ranchermanager.docs.rancher.com/getting-started/installation-and-upgrade/installation-references/helm-chart-options#additional-trusted-cas)),
    Fleet will use those CA bundles if no CA bundle is specified in the Helm secret.
    :::

3. `ssh-privatekey` for ssh private key if repo is using ssh protocol. Private key with passphase is not supported currently.

For example, to add a secret in kubectl, run

`kubectl create secret -n $namespace generic helm --from-literal=username=foo --from-literal=password=bar --from-file=cacerts=/path/to/cacerts --from-file=ssh-privatekey=/path/to/privatekey.pem`

After secret is created, specify the secret to `gitRepo.spec.helmSecretName`. Make sure secret is created under the same namespace with gitrepo.

### Use different helm credentials for each path

Fleet allows you to define unique credentials for each Helm chart path in a Git repository using the `helmSecretNameForPaths` field.

:::info
If `gitRepo.spec.helmSecretNameForPaths` is defined, `gitRepo.spec.helmSecretName` is ignored.
:::

Create a file named `secrets-path.yaml` that specifies credentials for each path in your `GitRepo`. The keys must match the full path to a bundle directory (a folder containing a `fleet.yaml file`), which may have more segments than the entry under `paths:`. If a path listed in the GitRepo is not included in this file, Fleet does not use credentials for it.

:::note
The file should be named `secrets-path.yaml`, otherwise Fleet will not be able to use it.
:::

Example `GitRepo` resource:

```yaml
kind: GitRepo
apiVersion: fleet.cattle.io/v1alpha1
metadata:
  name: gitrepo
  namespace: fleet-local
spec:
  helmSecretNameForPaths: test-multipasswd
  repo: https://github.com/0xavi0/fleet-examples
  branch: helm-multi-passwd
  paths:
  - single-cluster/test-multipasswd
```

Example `secrets-path.yaml`:

```yaml
single-cluster/test-multipasswd/passwd:
  username: fleet-ci
  password: foo
  insecureSkipVerify: true
```

Another example with two distinct paths:

```yaml
path-one: # path path-one must exist in the repository
  username: user
  password: pass
path-two: # path path-one must exist in the repository
  username: user2
  password: pass2
  caBundle: LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCiAgICBNSUlEblRDQ0FvV2dBd0lCQWdJVUNwMHB2SVJTb2c0eHJKN2Q1SUI2ME1ka0k1WXdEUVlKS29aSWh2Y05BUUVMCiAgICBCUUF3WGpFTE1Ba0dBMVVFQmhNQ1FWVXhFekFSQmdOVkJBZ01DbE52YldVdFUzUmhkR1V4SVRBZkJnTlZCQW9NCiAgICBHRWx1ZEdWeWJtVjBJRmRwWkdkcGRITWdVSFI1SUV4MFpERVhNQlVHQTFVRUF3d09jbUZ1WTJobGNpNXRlUzV2CiAgICBjbWN3SGhjTk1qTXdOREkzTVRVd056VXpXaGNOTWpnd05ESTFNVFV3TnpVeldqQmVNUXN3Q1FZRFZRUUdFd0pCCiAgICBWVEVUTUJFR0ExVUVDQXdLVTI5dFpTMVRkR0YwWlRFaE1COEdBMVVFQ2d3WVNXNTBaWEp1WlhRZ1YybGtaMmwwCiAgICBjeUJRZEhrZ1RIUmtNUmN3RlFZRFZRUUREQTV5WVc1amFHVnlMbTE1TG05eVp6Q0NBU0l3RFFZSktvWklodmNOCiAgICBBUUVCQlFBRGdnRVBBRENDQVFvQ2dnRUJBTXBvZE5TMDB6NDc1dnVSc2ZZcTFRYTFHQVl3QU92anV4MERKTHY5CiAgICBrZFhwT091dGdjMU8yWUdqNUlCVGQzVmpISmFJYUg3SDR2Rm84RlBaMG9zcU9YaFg3eUM4STdBS3ZhOEE5VmVmCiAgICBJVXp6Vlo1cCs1elNxRjdtZTlOaUNiL0pVSkZLT0ZsTkF4cjZCcXhoMEIyN1VZTlpjaUIvL1V0L0I2eHJuVE55CiAgICBoRzJiNzk4bjg4bFZqY3EzbEE0djFyM3VzWGYxVG5aS2t2UEN4ZnFHYk5OdTlpTjdFZnZHOWoyekdHcWJvcDRYCiAgICBXY3VSa3N3QkgxZlRNS0ZrbGcrR1VsZkZPMGFzL3phalVOdmdweTlpdVBMZUtqZTVWcDBiMlBLd09qUENpV2d4CiAgICBabDJlVDlNRnJjV0F3NTg3emE5NDBlT1Era2pkdmVvUE5sU2k3eVJMMW96YlRka0NBd0VBQWFOVE1GRXdIUVlECiAgICBWUjBPQkJZRUZEQkNkYjE4M1hsU0tWYzBxNmJSTCt0dVNTV3lNQjhHQTFVZEl3UVlNQmFBRkRCQ2RiMTgzWGxTCiAgICBLVmMwcTZiUkwrdHVTU1d5TUE4R0ExVWRFd0VCL3dRRk1BTUJBZjh3RFFZSktvWklodmNOQVFFTEJRQURnZ0VCCiAgICBBQ1BCVERkZ0dCVDVDRVoxd1pnQmhKdm9GZTk2MUJqVCtMU2RxSlpsSmNRZnlnS0hyNks5ZmZaY1ZlWlBoMVU0CiAgICB3czBuWGNOZiszZGJlTjl4dVBiY0VqUWlQaFJCcnRzalE1T1JiVHdYWEdBdzlYbDZYTkl6YjN4ZDF6RWFzQXZPCiAgICBJMjM2ZHZXQ1A0dWoycWZqR0FkQjJnaXU2b2xHK01CWHlneUZKMElzRENraldLZysyWEdmU3lyci9KZU1vZlFBCiAgICB1VU9wcFVGdERYd0lrUW1VTGNVVUxWcTdtUVNQb0lzVkNNM2hKNVQzczdUSWtHUDZVcGVSSjgzdU9LbURYMkRHCiAgICBwVWVQVHBuVWVLOVMzUEVKTi9XcmJSSVd3WU1OR29qdDRKWitaK1N6VE1aVkh0SlBzaGpjL1hYOWZNU1ZXQmlzCiAgICBQRW5MU256MDQ4OGFUQm5SUFlnVXFsdz0KICAgIC0tLS0tRU5EIENFUlRJRklDQVRFLS0tLS0=
  sshPrivateKey: ICAgIC0tLS0tQkVHSU4gQ0VSVElGSUNBVEUtLS0tLQogICAgTUlJRFF6Q0NBaXNDRkgxTm5YUWI5SlV6anNBR3FSc3RCYncwRlFpak1BMEdDU3FHU0liM0RRRUJDd1VBTUY0eAogICAgQ3pBSkJnTlZCQVlUQWtGVk1STXdFUVlEVlFRSURBcFRiMjFsTFZOMFlYUmxNU0V3SHdZRFZRUUtEQmhKYm5SbAogICAgY201bGRDQlhhV1JuYVhSeklGQjBlU0JNZEdReEZ6QVZCZ05WQkFNTURuSmhibU5vWlhJdWJYa3ViM0puTUI0WAogICAgRFRJek1EUXlOekUxTVRBMU5Gb1hEVEkwTURReU5qRTFNVEExTkZvd1hqRUxNQWtHQTFVRUJoTUNRVlV4RXpBUgogICAgQmdOVkJBZ01DbE52YldVdFUzUmhkR1V4SVRBZkJnTlZCQW9NR0VsdWRHVnlibVYwSUZkcFpHZHBkSE1nVUhSNQogICAgSUV4MFpERVhNQlVHQTFVRUF3d09jbUZ1WTJobGNpNXRlUzV2Y21jd2dnRWlNQTBHQ1NxR1NJYjNEUUVCQVFVQQogICAgQTRJQkR3QXdnZ0VLQW9JQkFRRGd6UUJJTW8xQVFHNnFtYmozbFlYUTFnZjhYcURTbjdyM2lGcVZZZldDVWZOSwogICAgaGZwampTRGpOMmRWWEV2UXA3R0t3akFHUElFbXR5RmxyUW5rUGtnTGFSaU9jSDdNN0p2c3ZIa0Ewd0g0dzJ2QgogICAgUEp6aVlINWh2MUE2WS9NcFM5bVkvQUVxVm80TUJkdnNZQzc3MFpCbzVBMitIUEtMd1YzMVZyYlhhTytWeUJtNAogICAgSmJhZHlNUk40N3BKRWdPMjJaYVRXL3Y3S1dKdjNydGJTMlZVSkNlU0piWlpsN09ocHhLRTVocStmK0RWaU1mcQogICAgTWx4ODNEV2pVSlVkV3lqVUZYVlk0bEdVaUtrRWVtSlVuSlVyY1ErOXE1SzVaWmhyRjhoRXhKRjhiZTZjemVzeAogICAga1VWN3dKb1RjWkd2bUhYSk1FNmtrQXh4Mmh3bU8wSFcyQWdDdTJZekFnTUJBQUV3RFFZSktvWklodmNOQVFFTAogICAgQlFBRGdnRUJBS1BpTWdXc1dCTnJvRkY2aWpYL2xMM3FxaWc4TjlkR1VPWDIyRVJDU1RTekNONjM0ZTFkZUhsdQogICAgbTc5OU11Q3hvWSsyZWluNlV1cFMvTEV6cnpvU2dDVWllQzQrT3ZralF5eGJpTFR6bW1OWEFnd09TM3RvTHRGWAogICAgbytmWWpSMU9xcHVPS29kMkhiYjliczRWcXdaNHEvMlVKbXE2Q01pYjZKZUE2VFJvK2Rkc0pUM2dDOFhWL1Z1MAogICAgNnkwdjJxdTM0bm1MYjFxOHFTS1RwZXYyQmwzQUJGY3NyS0JvNHFieUM2bnBTbnpZenNYcS90SlFLclplNE4vMgogICAgUXIzd1dxQ0pDVWUrMWVsT3A2b0JVcXNWSnc3aHk3YzRLc1Fna09ERDJkc2NuNEF1NGJhWlY2QmpySm1USVY0aQogICAgeXJ1dk9oZ2lINklGUVdDWmVQM2s0MU5obWRzRTNHQT0KICAgIC0tLS0tRU5EIENFUlRJRklDQVRFLS0tLS0K
```

Supported fields per path:

| Field                | Description                            | 
| --                   | ---                                    | 
| `username`           | Registry or repository username        | 
| `password`           | Registry or repository password        | 
| `caBundle`           | Base64-encoded CA certificate bundle   | 
| `sshPrivateKey`      | Base64-encoded SSH private key         | 
| `insecureSkipVerify` | Boolean value to skip TLS verification | 


To create the secret, run the following command.

```bash
kubectl create secret generic test-multipasswd -n fleet-local --from-file=secrets-path.yaml
```

:::note
The secret must be created in the same namespace as the `GitRepo` resource.
:::

If you use [rancher-backups](https://ranchermanager.docs.rancher.com/how-to-guides/new-user-guides/backup-restore-and-disaster-recovery/back-up-rancher) and want to include this secret in your backups, label it with `resources.cattle.io/backup: true`:

```bash
kubectl label secret path-auth-secret -n fleet-local resources.cattle.io/backup=true
```

:::note
Ensure the backup is encrypted to protect sensitive credentials.
:::

## Storing Credentials in Git

It's recommended not to store credentials in Git. Even if the repository is properly protected, the secrets are at risk when cloning, etc.
As a workaround tools like SOPS can be used to encrypt the credentials.

Instead it is recommended to reference secrets in the downstream cluster. For manifest-style and kustomize-style bundles this must be done in the manifests, e.g. by [mounting the secrets](https://kubernetes.io/docs/tasks/inject-data-application/distribute-credentials-secure/#create-a-pod-that-has-access-to-the-secret-data-through-a-volume) or [referencing them as environment variables](https://kubernetes.io/docs/concepts/configuration/secret/#using-secrets-as-environment-variables).
Helm-style bundles can use [valuesFrom](gitrepo-content#using-valuesfrom) to read values from a secret in the downstream cluster.

When using Kubernetes [encryption at rest](https://kubernetes.io/docs/tasks/administer-cluster/encrypt-data/) and storing credentials in Git, it is recommended to configure the upstream cluster to include several Fleet CRDs in encryption resource list:

```
- secrets
- bundles.fleet.cattle.io
- bundledeployments.fleet.cattle.io
- contents.fleet.cattle.io
```

## Backing up and restoring

When backing up and restoring Fleet with existing workloads, be they GitRepos or HelmOps, a few points must be taken
into account.

### Kubernetes API server availability

A Fleet agent, living in a downstream cluster, monitors a cluster-specific namespace on the upstream cluster.
This means that, when a restore operation is in progress, changes made in the upstream cluster may affect deployments
running in downstream clusters, which would then be updated or deleted based on incomplete state coming from the
upstream cluster.

To prevent this, we recommend making the Kubernetes API server inaccessible to downstream clusters while a restore
operation is running on the upstream cluster. Agents should not have access to the upstream cluster until all resources
have been re-created.

### Pausing

A [paused](./ref-gitrepo) GitRepo will lead to paused bundles and bundle deployments. This means that:
* when deleting a bundle deployment coming from a paused GitRepo, Fleet will not re-create that bundle deployment until
the GitRepo is unpaused
* when deleting a bundle coming from a paused GitRepo, Fleet will delete the bundle deployments coming from that bundle,
  and will not re-create the bundle (nor the bundle-deployments) until the GitRepo is unpaused.

Besides, pausing a GitRepo only prevents bundles and bundle deployments from being created or updated for that GitRepo.
In other words, it only affects _controller_ operations, not Fleet _agent_ operations. To prevent user resources,
contained in a bundle, from being deleted when deleting a bundle deployment,
[keepResources](./ref-bundle) should be used instead.

# Troubleshooting

See Fleet Troubleshooting section [here](./troubleshooting.md).
