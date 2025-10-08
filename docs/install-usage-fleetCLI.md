# Install and Use Fleet CLI

Fleet CLI is a command-line interface (CLI) that allows you to interact directly with Fleet from your local machine. It enables you to create, apply and inspect `bundles` without requiring a `GitRepo`. Typical use cases include:

* Testing and previewing `bundle` contents.
* Creating bundles directly from Helm charts, Kubernetes manifests and `fleet.yaml` files.
* Checking which clusters a `bundle` would target
* Validating deployments without installing Fleet in the cluster

:::note
You can use `fleet apply` without installing Fleet in your clusters. However, for cluster interaction (for example, `fleet target`, `fleet deploy`), Fleet must be installed. For more information, refer to [Install Fleet](installation.md).
:::

## Install Fleet CLI

Fleet CLI is a stand-alone binary you can download from the [Fleet GitHub releases page](https://github.com/rancher/fleet/releases).

**Linux/macOS**

```bash
curl -L -o fleet https://github.com/rancher/fleet/releases/latest/download/fleet-linux-amd64

# Make it executable and move to PATH

chmod +x fleet

sudo mv fleet /usr/local/bin/
```

**Windows (PowerShell)**

```bash
Invoke-WebRequest -Uri "https://github.com/rancher/fleet/releases/latest/download/fleet-windows-amd64.exe" -OutFile "fleet.exe"
```

**Verify installation**

```bash
fleet --version
```

## **Prerequisites**

Make sure you have the following tools installed and configured:

* A working Kubernetes cluster (e.g., via k3s, kind, or a cloud provider).  
* `kubectl` is configured for your cluster.  
* helm is installed.  
* Fleet CLI is installed and accessible in your terminal.

**Verify prerequisites**

```bash
kubectl get nodes  
helm version  
fleet --version
```

## Key commands

Fleet provides several CLI commands to create, preview, and deploy bundles. These commands are useful for debugging and understanding the bundle lifecycle.

* `fleet apply`: creates or previews a `bundle` from local files, such as a Helm chart, Kubernetes manifests, or kustomize folders. This command does not require access to a cluster, and therefore works even without Fleet or `kubectl` installed.
  * This applies for `fleet.yaml`, Helm charts and manifests. For example, `fleet apply my-bundle ./manifests`.  
* `fleet target`: Reads a bundle file and evaluates which clusters would receive it, based on selectors and targeting rules such as `targets`, `targetOverrides`, `clusterGroups`, and `label` selectors.
  * For example, `fleet target my-bundle ./manifests.`
* `fleet deploy`: takes the output of `fleet target`, or a dumped `bundledeployment`/content resource and deploys it to a cluster, just like fleet-agent would. You can use it in these scenarios:
  * `fleet apply -o - name ./folder` to check the YAML of the bundle before creating it. For more information, refer to [Convert a Helm chart into a bundle.](#convert-a-helm-chart-into-a-bundle)
  * Use with a target to debug selectors and verify which downstream clusters are targeted.
  * `fleet deploy --dry-run` to print the resources that would be deployed, but without applying them.  

![A diagram explaining how fleet CLI key commands work.](../static/img/fleetCLI-key-components.svg)

For more information, refer to [Bundle Lifecycle With the CLI](ref-bundle-stages.md#examining-the-bundle-lifecycle-with-the-cli).

## Deploy a Sample Bundle Using Fleet CLI

You can deploy workloads without using GitRepos by applying them locally with the CLI. For example, consider using the [Fleet examples repository](https://github.com/rancher/fleet-examples).

```bash
git clone https://github.com/rancher/fleet-examples  
cd fleet-examples/single-cluster
```

Apply it to the current cluster:

```bash
fleet apply -o my-cool-bundle manifests
```

This creates a Bundle resource in the namespace.

## Convert a Helm Chart into a Bundle

You can use the Fleet CLI to convert a Helm chart into a bundle.

For example, you can download and convert the "external secrets" operator chart like this:

```bash
cat > targets.yaml <<EOF
targets:
- clusterSelector: {}
EOF

mkdir app
cat > app/fleet.yaml <<EOF
defaultNamespace: external-secrets
helm:
  repo: https://charts.external-secrets.io
  chart: external-secrets
EOF

fleet apply --compress --targets-file=targets.yaml -n fleet-default -o - external-secrets app > eso-bundle.yaml

kubectl apply -f eso-bundle.yaml
```

Make sure you use a cluster selector in `targets.yaml`, that matches all clusters you want to deploy to.

The blog post on [Fleet: Multi-Cluster Deployment with the Help of External Secrets](https://www.suse.com/c/rancher_blog/fleet-multi-cluster-deployment-with-the-help-of-external-secrets/) has more information.


## **Troubleshooting**

If the bundle is not ready:

* Check if `fleet-controller` and `fleet-agent` pods are running.  
* Make sure the `fleet-local` cluster is registered.
* Inspect the bundle for error messages with:  
  * `kubectl describe bundle -n fleet-local nginx-bundle`  
* Delete and re-apply the bundle if you encounter Helm ownership conflicts.
