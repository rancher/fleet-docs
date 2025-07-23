import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Creating a Deployment

To deploy workloads onto downstream clusters, first create a Git repo, then create a GitRepo resource and apply it.

This tutorial uses the [fleet-examples](https://github.com/rancher/fleet-examples) repository.

:::note
For more details on how to structure the repository and configure the deployment of each bundle see [GitRepo Contents](./gitrepo-content.md).
For more details on the options that are available per Git repository see [Adding a GitRepo](./gitrepo-add.md).
:::

## Single-Cluster Examples

All examples will deploy content to clusters with no per-cluster customizations. This is a good starting point to understand the basics of structuring Git repos for Fleet.

<Tabs groupId="examples">
<TabItem value="helm" label="Helm" default>

An example using Helm. We are deploying the <a href="https://github.com/rancher/fleet-examples/tree/master/single-cluster/helm">helm example</a> to the local cluster.

The repository contains a helm chart and a `fleet.yaml` to configure the deployment:

```yaml title="fleet.yaml"
namespace: fleet-helm-example

# Custom helm options
helm:
  # The release name to use. If empty a generated release name will be used
  releaseName: guestbook

  # The directory of the chart in the repo.  Also any valid go-getter supported
  # URL can be used there is specify where to download the chart from.
  # If repo below is set this value if the chart name in the repo
  chart: ""

  # An https to a valid Helm repository to download the chart from
  repo: ""

  # Used if repo is set to look up the version of the chart
  version: ""

  # Force recreate resource that can not be updated
  force: false

  # How long for helm to wait for the release to be active. If the value
  # is less that or equal to zero, we will not wait in Helm
  timeoutSeconds: 0

  # Custom values that will be passed as values.yaml to the installation
  values:
    replicas: 2
```

To create the deployment, we apply the custom resource to the upstream cluster. The `fleet-local` namespace contains the local cluster resource. The local fleet-agent will create the deployment in the `fleet-helm-example` namespace.

```bash
kubectl apply -n fleet-local -f - <<EOF
kind: GitRepo
apiVersion: fleet.cattle.io/v1alpha1
metadata:
  name: helm
spec:
  repo: https://github.com/rancher/fleet-examples
  paths:
  - single-cluster/helm
EOF
```

</TabItem>
<TabItem value="helm-multi-chart" label="Helm Multi Chart" default>

An <a href="https://github.com/rancher/fleet-examples/blob/master/single-cluster/helm-multi-chart">example deploying multiple charts</a> from a single repo. This is similar to the previous example, but will deploy three helm charts from the sub folders, each configured by its own `fleet.yaml`.

```bash
kubectl apply -n fleet-local -f - <<EOF
kind: GitRepo
apiVersion: fleet.cattle.io/v1alpha1
metadata:
  name: helm
spec:
  repo: https://github.com/rancher/fleet-examples
  paths:
  - single-cluster/helm-multi-chart
EOF
```

</TabItem>
<TabItem value="helm-kustomize" label="Helm & Kustomize" default>

An example using <a href="https://github.com/rancher/fleet-examples/blob/master/single-cluster/helm-kustomize">Kustomize to modify a third party Helm chart</a>.
It will deploy the Kubernetes sample guestbook application as packaged as a Helm chart downloaded from a third party source and will modify the helm chart using Kustomize. The app will be deployed into the fleet-helm-kustomize-example namespace.

```bash
kubectl apply -n fleet-local -f - <<EOF
kind: GitRepo
apiVersion: fleet.cattle.io/v1alpha1
metadata:
  name: helm
spec:
  repo: https://github.com/rancher/fleet-examples
  paths:
  - single-cluster/helm-kustomize
EOF
```

</TabItem>
<TabItem value="kustomize" label="Kustomize" default>

An <a href="https://github.com/rancher/fleet-examples/blob/master/single-cluster/kustomize">example using Kustomize</a>.

Note that the `fleet.yaml` has a `kustomize:` key to specify the path to the required `kustomization.yaml`:

```yaml title="fleet.yaml"
kustomize:
  # To use a kustomization.yaml different from the one in the root folder
  dir: ""
```

```bash
kubectl apply -n fleet-local -f - <<EOF
kind: GitRepo
apiVersion: fleet.cattle.io/v1alpha1
metadata:
  name: helm
spec:
  repo: https://github.com/rancher/fleet-examples
  paths:
  - single-cluster/kustomize
EOF
```

</TabItem>
<TabItem value="manifests" label="Manifests" default>

An <a href="https://github.com/rancher/fleet-examples/tree/master/single-cluster/manifests">example using raw Kubernetes YAML</a>.

```bash
kubectl apply -n fleet-local -f - <<EOF
kind: GitRepo
apiVersion: fleet.cattle.io/v1alpha1
metadata:
  name: helm
spec:
  repo: https://github.com/rancher/fleet-examples
  paths:
  - single-cluster/manifests
EOF
```

</TabItem>
</Tabs>

## Multi-Cluster Examples

The examples below will deploy a multi git repo to multiple clusters at once and configure the app differently for each target.

<Tabs groupId="examples">
<TabItem value="helm" label="Helm" default>


An example using Helm. We are deploying the <a href="https://github.com/rancher/fleet-examples/tree/master/multi-cluster/helm">helm example</a> and customizing it per target cluster

The repository contains a helm chart and a `fleet.yaml` to configure the deployment. The `fleet.yaml` is used to configure different deployment options, depending on the cluster's labels:

```yaml title="fleet.yaml"
namespace: fleet-mc-helm-example
targetCustomizations:
- name: dev
  helm:
    values:
      replication: false
  clusterSelector:
    matchLabels:
      env: dev

- name: test
  helm:
    values:
      replicas: 3
  clusterSelector:
    matchLabels:
      env: test

- name: prod
  helm:
    values:
      serviceType: LoadBalancer
      replicas: 3
  clusterSelector:
    matchLabels:
      env: prod
```

To create the deployment, we apply the custom resource to the upstream cluster. The `fleet-default` namespace, by default, contains the downstream cluster resources. The chart will be deployed to all clusters in the fleet-default namespace, which have a labeled cluster resources that matches any entry under `targets:`.

```yaml title="gitrepo.yaml"
kind: GitRepo
apiVersion: fleet.cattle.io/v1alpha1
metadata:
  name: helm
  namespace: fleet-default
spec:
  repo: https://github.com/rancher/fleet-examples
  paths:
  - multi-cluster/helm
  targets:
  - name: dev
    clusterSelector:
      matchLabels:
        env: dev

  - name: test
    clusterSelector:
      matchLabels:
        env: test

  - name: prod
    clusterSelector:
      matchLabels:
        env: prod
```

By applying the gitrepo resource to the upstream cluster, fleet will start to monitor the repository and create deployments:

<CodeBlock language="bash">
{`kubectl apply -n fleet-default -f gitrepo.yaml`}
</CodeBlock>

</TabItem>
<TabItem value="helm-external" label="Helm External" default>

An <a href="https://github.com/rancher/fleet-examples/blob/master/multi-cluster/helm-external">example using a Helm chart that is downloaded from a third party source and customizing it per target cluster</a>. The customization is similar to the previous example.

To create the deployment, we apply the custom resource to the upstream cluster. The `fleet-default` namespace, by default, contains the downstream cluster resources. The chart will be deployed to all clusters in the fleet-default namespace, which have a labeled cluster resources that matches any entry under `targets:`.

```yaml title="gitrepo.yaml"
kind: GitRepo
apiVersion: fleet.cattle.io/v1alpha1
metadata:
  name: helm-external
  namespace: fleet-default
spec:
  repo: https://github.com/rancher/fleet-examples
  paths:
  - multi-cluster/helm-external
  targets:
  - name: dev
    clusterSelector:
      matchLabels:
        env: dev

  - name: test
    clusterSelector:
      matchLabels:
        env: test

  - name: prod
    clusterSelector:
      matchLabels:
        env: prod
```

By applying the gitrepo resource to the upstream cluster, fleet will start to monitor the repository and create deployments:

<CodeBlock language="bash">
{`kubectl apply -n fleet-default -f gitrepo.yaml`}
</CodeBlock>

</TabItem>
<TabItem value="helm-kustomize" label="Helm & Kustomize" default>

An example using <a href="https://github.com/rancher/fleet-examples/blob/master/multi-cluster/helm-kustomize">kustomize to modify a third party Helm chart</a>.
It will deploy the Kubernetes sample guestbook application as packaged as a Helm chart downloaded from a third party source and will modify the helm chart using Kustomize. The app will be deployed into the fleet-helm-kustomize-example namespace.

The application will be customized as follows per environment:

* Dev clusters: Only the redis leader is deployed and not the followers.
* Test clusters: Scale the front deployment to 3
* Prod clusters: Scale the front deployment to 3 and set the service type to LoadBalancer

The `fleet.yaml` is used to control which overlays are used, depending on the cluster's labels:

```yaml title="fleet.yaml"
namespace: fleet-mc-kustomize-example
targetCustomizations:
- name: dev
  clusterSelector:
    matchLabels:
      env: dev
  kustomize:
    dir: overlays/dev

- name: test
  clusterSelector:
    matchLabels:
      env: test
  kustomize:
    dir: overlays/test

- name: prod
  clusterSelector:
    matchLabels:
      env: prod
  kustomize:
    dir: overlays/prod
```

To create the deployment, we apply the custom resource to the upstream cluster. The `fleet-default` namespace, by default, contains the downstream cluster resources. The chart will be deployed to all clusters in the fleet-default namespace, which have a labeled cluster resources that matches any entry under `targets:`.

```yaml title="gitrepo.yaml"
kind: GitRepo
apiVersion: fleet.cattle.io/v1alpha1
metadata:
  name: helm-kustomize
  namespace: fleet-default
spec:
  repo: https://github.com/rancher/fleet-examples
  paths:
  - multi-cluster/helm-kustomize
  targets:
  - name: dev
    clusterSelector:
      matchLabels:
        env: dev

  - name: test
    clusterSelector:
      matchLabels:
        env: test

  - name: prod
    clusterSelector:
      matchLabels:
        env: prod
```

By applying the gitrepo resource to the upstream cluster, fleet will start to monitor the repository and create deployments:

<CodeBlock language="bash">
{`kubectl apply -n fleet-default -f gitrepo.yaml`}
</CodeBlock>

</TabItem>
<TabItem value="kustomize" label="Kustomize" default>

An <a href="https://github.com/rancher/fleet-examples/blob/master/multi-cluster/kustomize">example using Kustomize</a> and customizing it per target cluster.

The customization in `fleet.yaml` is identical to the "Helm & Kustomize" example.

To create the deployment, we apply the custom resource to the upstream cluster. The `fleet-default` namespace, by default, contains the downstream cluster resources. The chart will be deployed to all clusters in the fleet-default namespace, which have a labeled cluster resources that matches any entry under `targets:`.

```bash
kubectl apply -n fleet-default -f - <<EOF
kind: GitRepo
apiVersion: fleet.cattle.io/v1alpha1
metadata:
  name: kustomize
  namespace: fleet-default
spec:
  repo: https://github.com/rancher/fleet-examples
  paths:
  - multi-cluster/kustomize
  targets:
  - name: dev
    clusterSelector:
      matchLabels:
        env: dev

  - name: test
    clusterSelector:
      matchLabels:
        env: test

  - name: prod
    clusterSelector:
      matchLabels:
        env: prod
EOF
```

By applying the gitrepo resource to the upstream cluster, fleet will start to monitor the repository and create deployments:

</TabItem>
<TabItem value="manifests" label="Manifests" default>

An <a href="https://github.com/rancher/fleet-examples/tree/master/multi-cluster/manifests">example using raw Kubernetes YAML and customizing it per target cluster</a>.
The application will be customized as follows per environment:

* Dev clusters: Only the redis leader is deployed and not the followers.
* Test clusters: Scale the front deployment to 3
* Prod clusters: Scale the front deployment to 3 and set the service type to LoadBalancer

The `fleet.yaml` is used to control which 'yaml' overlays are used, depending on the cluster's labels:

```yaml title="fleet.yaml"
namespace: fleet-mc-manifest-example
targetCustomizations:
- name: dev
  clusterSelector:
    matchLabels:
      env: dev
  yaml:
    overlays:
    # Refers to overlays/noreplication folder
    - noreplication

- name: test
  clusterSelector:
    matchLabels:
      env: test
  yaml:
    overlays:
    # Refers to overlays/scale3 folder
    - scale3

- name: prod
  clusterSelector:
    matchLabels:
      env: prod
  yaml:
    # Refers to overlays/servicelb, scale3 folders
    overlays:
    - servicelb
    - scale3
```

To create the deployment, we apply the custom resource to the upstream cluster. The `fleet-default` namespace, by default, contains the downstream cluster resources. The chart will be deployed to all clusters in the fleet-default namespace, which have a labeled cluster resources that matches any entry under `targets:`.

```yaml title="gitrepo.yaml"
kind: GitRepo
apiVersion: fleet.cattle.io/v1alpha1
metadata:
  name: manifests
  namespace: fleet-default
spec:
  repo: https://github.com/rancher/fleet-examples
  paths:
  - multi-cluster/manifests
  targets:
  - name: dev
    clusterSelector:
      matchLabels:
        env: dev

  - name: test
    clusterSelector:
      matchLabels:
        env: test

  - name: prod
    clusterSelector:
      matchLabels:
        env: prod
```

<CodeBlock language="bash">
{`kubectl apply -n fleet-default -f gitrepo.yaml`}
</CodeBlock>

</TabItem>
</Tabs>
