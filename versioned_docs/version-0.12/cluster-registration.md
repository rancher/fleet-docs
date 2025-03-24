import {versions} from '@site/src/fleetVersions';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Register Downstream Clusters

## Overview

There are two specific styles to registering clusters. These styles will be referred
to as **agent-initiated** and **manager-initiated** registration. Typically one would
go with the agent-initiated registration but there are specific use cases in which
manager-initiated is a better workflow.

### Agent-Initiated Registration

Agent-initiated refers to a pattern in which the downstream cluster installs an agent with a
[cluster registration token](#create-cluster-registration-tokens) and optionally a client ID. The cluster
agent will then make a API request to the Fleet manager and initiate the registration process. Using
this process the Manager will never make an outbound API request to the downstream clusters and will thus
never need to have direct network access. The downstream cluster only needs to make outbound HTTPS
calls to the manager.

### Manager-Initiated Registration

Manager-initiated registration is a process in which you register an existing Kubernetes cluster
with the Fleet manager and the Fleet manager will make an API call to the downstream cluster to
deploy the agent. This style can place additional network access requirements because the Fleet
manager must be able to communicate with the downstream cluster API server for the registration process.
After the cluster is registered there is no further need for the manager to contact the downstream
cluster API.  This style is more compatible if you wish to manage the creation of all your Kubernetes
clusters through GitOps using something like [cluster-api](https://github.com/kubernetes-sigs/cluster-api)
or [Rancher](https://github.com/rancher/rancher).

## Agent Initiated

A downstream cluster is registered by installing an agent via helm and using the **cluster registration token** and optionally a **client ID** or **cluster labels**.

:::info
It's not necessary to configure the fleet manager for [multi cluster](./installation.md#configuration-for-multi-cluster), as the downstream agent we install via Helm will connect to the Kubernetes API of the upstream cluster directly.

Agent-initiated registration is normally not used with Rancher.
:::

### Cluster Registration Token and Client ID

The **cluster registration token** is a credential that will authorize the downstream cluster agent to be
able to initiate the registration process. This is required.
The [cluster registration token](./architecture.md#security) is manifested as a `values.yaml` file that will be passed to the `helm install` process.
Alternatively one can pass the token directly to the helm install command via `--set token="$token"`.

There are two styles of registering an agent. You can have the cluster for this agent dynamically created, in which
case you will probably want to specify **cluster labels** upon registration.  Or you can have the agent register to a predefined
cluster in the Fleet manager, in which case you will need a **client ID**.  The former approach is typically the easiest.

### Install Agent For a New Cluster

The Fleet agent is installed as a Helm chart. Following are explanations how to determine and set its parameters.

First, follow the [cluster registration token instructions](#create-cluster-registration-tokens) to obtain the `values.yaml` which contains
the registration token to authenticate against the Fleet cluster.

Second, optionally you can define labels that will assigned to the newly created cluster upon registration. After
registration is completed an agent cannot change the labels of the cluster. To add cluster labels add
`--set-string labels.KEY=VALUE` to the below Helm command. To add the labels `foo=bar` and `bar=baz` then you would
add `--set-string labels.foo=bar --set-string labels.bar=baz` to the command line.

```shell
# Leave blank if you do not want any labels
CLUSTER_LABELS="--set-string labels.example=true --set-string labels.env=dev"
```

Third, set variables with the Fleet cluster's API Server URL and CA, for the downstream cluster to use for connecting.

```shell
API_SERVER_URL=https://<API_URL>:6443
API_SERVER_CA_DATA=...
```

If the API server is not listening on the https port (443), the `API_SERVER_URL` should include the port, e.g. `https://<API_URL>:6443`. The URL can be found in the `.kube/config` file.
Value in `API_SERVER_CA_DATA` can be obtained from a `.kube/config` file with valid data to connect to the upstream cluster
(under the `certificate-authority-data` key). Alternatively it can be obtained from within the upstream cluster itself,
by looking up the default ServiceAccount secret name (typically prefixed with `default-token-`, in the default namespace),
under the `ca.crt` key.


:::warning Kubectl Context

__Ensure you are installing to the right cluster__:
Helm will use the default context in `${HOME}/.kube/config` to deploy the agent. Use `--kubeconfig` and `--kube-context`
to change which cluster Helm is installing to.

:::

:::caution Fleet in Rancher
Rancher has separate helm charts for Fleet and uses a different repository.
:::

Add Fleet's Helm repo.
<CodeBlock language="bash">
{`helm repo add fleet https://rancher.github.io/fleet-helm-charts/`}
</CodeBlock>

:::caution

__Use proper namespace and release name__:
For the agent chart the namespace must be `cattle-fleet-system` and the release name `fleet-agent`

:::


Finally, install the agent using Helm.
<Tabs>
  <TabItem value="helm" label="Install" default>
<CodeBlock language="bash">
{`helm -n cattle-fleet-system install --create-namespace --wait \\
    $CLUSTER_LABELS \\
    --values values.yaml \\
    --set apiServerCA="$API_SERVER_CA_DATA" \\
    --set apiServerURL="$API_SERVER_URL" \\
    fleet-agent fleet/fleet-agent`}
</CodeBlock>
</TabItem>
<TabItem value="validate" label="Validate">
You can check that status of the fleet pods by running the below commands.

```shell
# Ensure kubectl is pointing to the right cluster
kubectl -n cattle-fleet-system logs -l app=fleet-agent
kubectl -n cattle-fleet-system get pods -l app=fleet-agent
```
</TabItem>
</Tabs>
The agent should now be deployed.

Additionally you should see a new cluster registered in the Fleet manager.  Below is an example of checking that a new cluster
was registered in the `clusters` [namespace](./namespaces.md).  Please ensure your `${HOME}/.kube/config` is pointed to the Fleet
manager to run this command.

```shell
kubectl -n clusters get clusters.fleet.cattle.io
```
```
NAME                   BUNDLES-READY   NODES-READY   SAMPLE-NODE             LAST-SEEN              STATUS
cluster-ab13e54400f1   1/1             1/1           k3d-cluster2-server-0   2020-08-31T19:23:10Z
```

### Install Agent For a Predefined Cluster

Client IDs are for the purpose of predefining clusters in the Fleet manager with existing labels and repos targeted to them.
A client ID is not required and is just one approach to managing clusters.
The **client ID** is a unique string that will identify the cluster.
This string is user generated and opaque to the Fleet manager and agent.  It is assumed to be sufficiently unique. For security reasons one should not be able to easily guess this value
as then one cluster could impersonate another.  The client ID is optional and if not specified the UID field of the `kube-system` namespace
resource will be used as the client ID. Upon registration if the client ID is found on a `Cluster` resource in the Fleet manager it will associate
the agent with that `Cluster`.  If no `Cluster` resource is found with that client ID a new `Cluster` resource will be created with the specific
client ID.

The Fleet agent is installed as a Helm chart. The only parameters to the helm chart installation should be the cluster registration token, which
is represented by the `values.yaml` file and the client ID.  The client ID is optional.


First, create a `Cluster` in the Fleet Manager with the random client ID you have chosen.

```yaml
kind: Cluster
apiVersion: fleet.cattle.io/v1alpha1
metadata:
  name: my-cluster
  namespace: clusters
spec:
  clientID: "really-random"
```

Second, follow the [cluster registration token instructions]((#create-cluster-registration-tokens) to obtain the `values.yaml` file to be used.

Third, setup your environment to use the client ID.

```shell
CLUSTER_CLIENT_ID="really-random"
```

:::note

__Use proper namespace and release name__:
For the agent chart the namespace must be `cattle-fleet-system` and the release name `fleet-agent`

:::

:::note

__Ensure you are installing to the right cluster__:
Helm will use the default context in `${HOME}/.kube/config` to deploy the agent. Use `--kubeconfig` and `--kube-context`
to change which cluster Helm is installing to.

:::

Add Fleet's Helm repo.
<CodeBlock language="bash">
{`helm repo add fleet https://rancher.github.io/fleet-helm-charts/`}
</CodeBlock>

Finally, install the agent using Helm.

<Tabs>
  <TabItem value="helm2" label="Install" default>
<CodeBlock language="bash">
{`helm -n cattle-fleet-system install --create-namespace --wait \\
    --set clientID="$CLUSTER_CLIENT_ID" \\
    --values values.yaml \\
    fleet-agent fleet/fleet-agent`}
</CodeBlock>

</TabItem>
<TabItem value="validate2" label="Validate">
You can check that status of the fleet pods by running the below commands.

```shell
# Ensure kubectl is pointing to the right cluster
kubectl -n cattle-fleet-system logs -l app=fleet-agent
kubectl -n cattle-fleet-system get pods -l app=fleet-agent
```
</TabItem>
</Tabs>
The agent should now be deployed.

Additionally you should see a new cluster registered in the Fleet manager.  Below is an example of checking that a new cluster
was registered in the `clusters` [namespace](./namespaces.md).  Please ensure your `${HOME}/.kube/config` is pointed to the Fleet
manager to run this command.

```shell
kubectl -n clusters get clusters.fleet.cattle.io
```
```
NAME                   BUNDLES-READY   NODES-READY   SAMPLE-NODE             LAST-SEEN              STATUS
my-cluster             1/1             1/1           k3d-cluster2-server-0   2020-08-31T19:23:10Z
```

### Create Cluster Registration Tokens

:::info

__Not needed for Manager-initiated registration__:
For manager-initiated registrations the token is managed by the Fleet manager and does
not need to be manually created and obtained.

:::

For an agent-initiated registration the downstream cluster must have a [cluster registration token](./architecture.md#security).
Cluster registration tokens are used to establish a new identity for a cluster. Internally
cluster registration tokens are managed by creating Kubernetes service accounts that have the
permissions to create `ClusterRegistrationRequests` within a specific namespace.  Once the
cluster is registered a new `ServiceAccount` is created for that cluster that is used as
the unique identity of the cluster. The agent is designed to forget the cluster registration
token after registration. While the agent will not maintain a reference to the cluster registration
token after a successful registration please note that usually other system bootstrap scripts do.

Since the cluster registration token is forgotten, if you need to re-register a cluster you must
give the cluster a new registration token.

#### Token TTL

Cluster registration tokens can be reused by any cluster in a namespace.  The tokens can be given a TTL
such that it will expire after a specific time.

#### Create a new Token

The `ClusterRegistationToken` is a namespaced type and should be created in the same namespace
in which you will create `GitRepo` and `ClusterGroup` resources. For in depth details on how namespaces
are used in Fleet refer to the documentation on [namespaces](./namespaces.md).  Create a new
token with the below YAML.

```yaml
kind: ClusterRegistrationToken
apiVersion: "fleet.cattle.io/v1alpha1"
metadata:
    name: new-token
    namespace: clusters
spec:
    # A duration string for how long this token is valid for. A value <= 0 or null means infinite time.
    ttl: 240h
```

After the `ClusterRegistrationToken` is created, Fleet will create a corresponding `Secret` with the same name.
As the `Secret` creation is performed asynchronously, you will need to wait until it's available before using it.

One way to do so is via the following one-liner:
```shell
while ! kubectl --namespace=clusters  get secret new-token; do sleep 5; done
```

#### Obtaining Token Value (Agent values.yaml)

The token value contains YAML content for a `values.yaml` file that is expected to be passed to `helm install`
to install the Fleet agent on a downstream cluster.

Such value is contained in the `values` field of the `Secret` mentioned above. To obtain the YAML content for the
above example one can run the following one-liner:
```shell
kubectl --namespace clusters get secret new-token -o 'jsonpath={.data.values}' | base64 --decode > values.yaml
```

Once the `values.yaml` is ready it can be used repeatedly by clusters to register until the TTL expires.

## Manager Initiated

The manager-initiated registration flow is accomplished by creating a
`Cluster` resource in the Fleet Manager that refers to a Kubernetes
`Secret` containing a valid kubeconfig file in the data field called `value`.


:::info
If you are using Fleet standalone *without Rancher*, it must be installed as described in [installation details](./installation.md#configuration-for-multi-cluster).

The manager-initiated registration is used when you add a cluster from the Rancher dashboard.
:::

### Create Kubeconfig Secret

The format of this secret is intended to match the [format](https://cluster-api.sigs.k8s.io/developer/architecture/controllers/cluster.html#secrets) of the kubeconfig
secret used in [cluster-api](https://github.com/kubernetes-sigs/cluster-api).
This means you can use `cluster-api` to create a cluster that is dynamically registered with Fleet.

```yaml title="Kubeconfig Secret Example"
kind: Secret
apiVersion: v1
metadata:
  name: my-cluster-kubeconfig
  namespace: clusters
data:
  value: YXBpVmVyc2lvbjogdjEKY2x1c3RlcnM6Ci0gY2x1c3RlcjoKICAgIHNlcnZlcjogaHR0cHM6Ly9leGFtcGxlLmNvbTo2NDQzCiAgbmFtZTogY2x1c3Rlcgpjb250ZXh0czoKLSBjb250ZXh0OgogICAgY2x1c3RlcjogY2x1c3RlcgogICAgdXNlcjogdXNlcgogIG5hbWU6IGRlZmF1bHQKY3VycmVudC1jb250ZXh0OiBkZWZhdWx0CmtpbmQ6IENvbmZpZwpwcmVmZXJlbmNlczoge30KdXNlcnM6Ci0gbmFtZTogdXNlcgogIHVzZXI6CiAgICB0b2tlbjogc29tZXRoaW5nCg==
```

### Create Cluster Resource

The cluster resource needs to reference the kubeconfig secret.

```yaml title="Cluster Resource Example"
apiVersion: fleet.cattle.io/v1alpha1
kind: Cluster
metadata:
  name: my-cluster
  namespace: clusters
  labels:
    demo: "true"
    env: dev
spec:
  kubeConfigSecret: my-cluster-kubeconfig
```
