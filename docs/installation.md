import {versions} from '@site/src/fleetVersions';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Installation Details

The installation is broken up into two different use cases: single and multi-cluster.
The single cluster install is for if you wish to use GitOps to manage a single cluster,
in which case you do not need a centralized manager cluster. In the multi-cluster use case
you will setup a centralized manager cluster to which you can register clusters.

If you are just learning Fleet the single cluster install is the recommended starting
point. After which you can move from single cluster to multi-cluster setup down the line.

![](/img/single-cluster.png)

Single-cluster is the default installation. The same cluster will run both the Fleet
manager and the Fleet agent. The cluster will communicate with Git server to
deploy resources to this local cluster. This is the simplest setup and very
useful for dev/test and small scale setups.  This use case is supported as a valid
use case for production.

## Prerequisites

<Tabs>
  <TabItem value="helm" label="Helm 3" default>
  Fleet is distributed as a Helm chart. Helm 3 is a CLI, has no server side component, and is
  fairly straight forward. To install the Helm 3 CLI follow the <a href="https://helm.sh/docs/intro/install">official install instructions</a>.
  </TabItem>
  <TabItem value="kubernetes" label="Kubernetes" default>
  Fleet is a controller running on a Kubernetes cluster so an existing cluster is required. For the
  single cluster use case you will install Fleet to the cluster which you intend to manage with GitOps.
  Any Kubernetes community supported version of Kubernetes will work, in practice this means {versions.next.kubernetes} or greater.
  </TabItem>
</Tabs>

## Default Install

Install the following two Helm charts.

<Tabs>
<TabItem value="install" label="Install" default>
First add Fleet's Helm repository.
<CodeBlock language="bash">
{`helm repo add fleet https://rancher.github.io/fleet-helm-charts/`}
</CodeBlock>

Second install the Fleet CustomResourcesDefintions.
<CodeBlock language="bash">
{`helm -n cattle-fleet-system install --create-namespace --wait fleet-crd \\
    fleet/fleet-crd`}
</CodeBlock>

Third install the Fleet controllers.
<CodeBlock language="bash">
{`helm -n cattle-fleet-system install --create-namespace --wait fleet \\
    fleet/fleet`}
</CodeBlock>
</TabItem>
<TabItem value="verify" label="Verify">

Fleet should be ready to use now for single cluster. You can check the status of the Fleet controller pods by
running the below commands.

```bash
kubectl -n cattle-fleet-system logs -l app=fleet-controller
kubectl -n cattle-fleet-system get pods -l app=fleet-controller
```

```
NAME                                READY   STATUS    RESTARTS   AGE
fleet-controller-64f49d756b-n57wq   1/1     Running   0          3m21s
```
</TabItem>
</Tabs>

You can now [register some git repos](./gitrepo-add.md) in the `fleet-local` namespace to start deploying Kubernetes resources.

## Configuration for Multi-Cluster

:::caution
Downstream clusters in Rancher are automatically registered in Fleet. Users can access Fleet under `Continuous Delivery` on Rancher.

The multi-cluster install described below is **only** covered in standalone Fleet, which is untested by Rancher QA.
:::


:::info
The setup is the same as for a single cluster.
After installing the Fleet manager, you will then need to register remote downstream clusters with the Fleet manager.

However, to allow for [manager-initiated registration](./cluster-registration.md#manager-initiated) of downstream clusters, a few extra settings are required. Without the API server URL and the CA, only [agent-initiated registration](./cluster-registration.md#agent-initiated) of downstream clusters is possible.
:::

### API Server URL and CA certificate

In order for your Fleet management installation to properly work it is important
the correct API server URL and CA certificates are configured properly.  The Fleet agents
will communicate to the Kubernetes API server URL. This means the Kubernetes
API server must be accessible to the downstream clusters.  You will also need
to obtain the CA certificate of the API server. The easiest way to obtain this information
is typically from your kubeconfig file (`$HOME/.kube/config`). The `server`,
`certificate-authority-data`, or `certificate-authority` fields will have these values.

```yaml title="$HOME/.kube/config"
apiVersion: v1
clusters:
- cluster:
    certificate-authority-data: LS0tLS1CRUdJTi...
    server: https://example.com:6443
```

#### Extract CA certificate

Please note that the `certificate-authority-data` field is base64 encoded and will need to be
decoded before you save it into a file. This can be done by saving the base64 encoded contents to
a file and then running

```shell
base64 -d encoded-file > ca.pem
```

Next, retrieve the CA certificate from your kubeconfig.

<Tabs>
<TabItem value="extractca" label="Extract First">
If you have `jq` and `base64` available then this one-liners will pull all CA certificates from your
`KUBECONFIG` and place then in a file named `ca.pem`.

```shell
kubectl config view -o json --raw  | jq -r '.clusters[].cluster["certificate-authority-data"]' | base64 -d > ca.pem
```
</TabItem>
<TabItem value="extractcas" label="Multiple Entries">
Or, if you have a multi-cluster setup, you can use this command:

```shell
# replace CLUSTERNAME with the name of the cluster according to your KUBECONFIG
kubectl config view -o json --raw  | jq -r '.clusters[] | select(.name=="CLUSTERNAME").cluster["certificate-authority-data"]' | base64 -d > ca.pem
```
</TabItem>
</Tabs>


#### Extract API Server

If you have a multi-cluster setup, you can use this command:

```shell
# replace CLUSTERNAME with the name of the cluster according to your KUBECONFIG
API_SERVER_URL=$(kubectl config view -o json --raw  | jq -r '.clusters[] | select(.name=="CLUSTER").cluster["server"]')
# Leave empty if your API server is signed by a well known CA
API_SERVER_CA="ca.pem"
```

#### Validate

First validate the server URL is correct.

```shell
curl -fLk "$API_SERVER_URL/version"
```

The output of this command should be JSON with the version of the Kubernetes server or a `401 Unauthorized` error.
If you do not get either of these results than please ensure you have the correct URL. The API server port is typically
6443 for Kubernetes.

Next validate that the CA certificate is proper by running the below command.  If your API server is signed by a
well known CA then omit the `--cacert "$API_SERVER_CA"` part of the command.

```shell
curl -fL --cacert "$API_SERVER_CA" "$API_SERVER_URL/version"
```

If you get a valid JSON response or an `401 Unauthorized` then it worked. The Unauthorized error is
only because the curl command is not setting proper credentials, but this validates that the TLS
connection work and the `ca.pem` is correct for this URL. If you get a `SSL certificate problem` then
the `ca.pem` is not correct. The contents of the `$API_SERVER_CA` file should look similar to the below:

```pem title="ca.pem"
-----BEGIN CERTIFICATE-----
MIIBVjCB/qADAgECAgEAMAoGCCqGSM49BAMCMCMxITAfBgNVBAMMGGszcy1zZXJ2
ZXItY2FAMTU5ODM5MDQ0NzAeFw0yMDA4MjUyMTIwNDdaFw0zMDA4MjMyMTIwNDda
MCMxITAfBgNVBAMMGGszcy1zZXJ2ZXItY2FAMTU5ODM5MDQ0NzBZMBMGByqGSM49
AgEGCCqGSM49AwEHA0IABDXlQNkXnwUPdbSgGz5Rk6U9ldGFjF6y1YyF36cNGk4E
0lMgNcVVD9gKuUSXEJk8tzHz3ra/+yTwSL5xQeLHBl+jIzAhMA4GA1UdDwEB/wQE
AwICpDAPBgNVHRMBAf8EBTADAQH/MAoGCCqGSM49BAMCA0cAMEQCIFMtZ5gGDoDs
ciRyve+T4xbRNVHES39tjjup/LuN4tAgAiAteeB3jgpTMpZyZcOOHl9gpZ8PgEcN
KDs/pb3fnMTtpA==
-----END CERTIFICATE-----
```

### Install for Multi-Cluster

In the following example it will be assumed the API server URL from the `KUBECONFIG` which is `https://example.com:6443`
and the CA certificate is in the file `ca.pem`. If your API server URL is signed by a well-known CA you can
omit the `apiServerCA` parameter below or just create an empty `ca.pem` file (ie `touch ca.pem`).

Setup the environment with your specific values, e.g.:

```shell
API_SERVER_URL="https://example.com:6443"
API_SERVER_CA="ca.pem"
```

Once you have validated the API server URL and API server CA parameters, install the following two
Helm charts.

<Tabs>
<TabItem value="install2" label="Install" default>
First add Fleet's Helm repository.
<CodeBlock language="bash">
{`helm repo add fleet https://rancher.github.io/fleet-helm-charts/`}
</CodeBlock>

Second install the Fleet CustomResourcesDefintions.
<CodeBlock language="bash">
{`helm -n cattle-fleet-system install --create-namespace --wait \\
    fleet-crd`} {versions.next.fleetCRD}
</CodeBlock>

Third install the Fleet controllers.
<CodeBlock language="bash">
{`helm -n cattle-fleet-system install --create-namespace --wait \\
    --set apiServerURL="$API_SERVER_URL" \\
    --set-file apiServerCA="$API_SERVER_CA" \\
    fleet`} {versions.next.fleet}
</CodeBlock>
</TabItem>

<TabItem value="verifiy2" label="Verify">
Fleet should be ready to use. You can check the status of the Fleet controller pods by running the below commands.

```bash
kubectl -n cattle-fleet-system logs -l app=fleet-controller
kubectl -n cattle-fleet-system get pods -l app=fleet-controller
```

```
NAME                                READY   STATUS    RESTARTS   AGE
fleet-controller-64f49d756b-n57wq   1/1     Running   0          3m21s
```
</TabItem>
</Tabs>

At this point the Fleet manager should be ready. You can now [register clusters](./cluster-registration.md) and [git repos](./gitrepo-add.md#create-gitrepo-instance) with
the Fleet manager.
