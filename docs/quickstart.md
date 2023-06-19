import {versions} from '@site/src/fleetVersions';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Quick Start

![](/img/single-cluster.png)

Who needs documentation, lets just run this thing!

## Install

 Fleet is distributed as a Helm chart. Helm 3 is a CLI, has no server side component, and is
  fairly straight forward. To install the Helm 3 CLI follow the <a href="https://helm.sh/docs/intro/install">official install instructions</a>.

<Tabs>
  <TabItem value="linux" label="Linux/Mac" default>
    <CodeBlock language="bash">
    brew install helm
    </CodeBlock>
  </TabItem>
  <TabItem value="windows" label="Windows" default>
    <CodeBlock language="bash">
    choco install kubernetes-helm
    </CodeBlock>
  </TabItem>
</Tabs>

Install the Fleet Helm charts (there's two because we separate out CRDs for ultimate flexibility.)

<CodeBlock language="bash">
{`helm -n cattle-fleet-system install --create-namespace --wait \\
    fleet-crd`} {versions.next.fleetCRD}
{`
helm -n cattle-fleet-system install --create-namespace --wait \\
    fleet`} {versions.next.fleet}
</CodeBlock>

## Add a Git Repo to Watch

Change `spec.repo` to your git repo of choice.  Kubernetes manifest files that should
be deployed should be in `/manifests` in your repo.

```bash
cat > example.yaml << "EOF"
apiVersion: fleet.cattle.io/v1alpha1
kind: GitRepo
metadata:
  name: sample
  # This namespace is special and auto-wired to deploy to the local cluster
  namespace: fleet-local
spec:
  # Everything from this repo will be ran in this cluster. You trust me right?
  repo: "https://github.com/rancher/fleet-examples"
  paths:
  - simple
EOF

kubectl apply -f example.yaml
```

## Get Status

Get status of what fleet is doing

```shell
kubectl -n fleet-local get fleet
```

You should see something like this get created in your cluster.

```
kubectl get deploy frontend
```
```
NAME       READY   UP-TO-DATE   AVAILABLE   AGE
frontend   3/3     3            3           116m
```

Enjoy and read the [docs](https://rancher.github.io/fleet).
