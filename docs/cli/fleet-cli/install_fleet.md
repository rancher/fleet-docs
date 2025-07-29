# Fleet CLI

Fleet CLI is a command-line interface(CLI) that allows you to interact directly with Fleet from your local machine. It enables you to create, apply and inspect `bundles` without requiring a `GitRepo`. Typical use cases include:

* Testing and previewing `bundle` contents.
* Creating bundles directly from Helm charts, Kubernetes manifests and `fleet.yaml` files.
* Checking which clusters a `bundle` would target
* Validating deployments without installing Fleet in the cluster

:::note
You can use `fleet apply` without installing Fleet in your clusters. However, for cluster interaction (for example, `fleet target`, `fleet deploy`), Fleet must be installed. For more information, refer to [Install Fleet.](../../installation.md)
:::

## Install Fleet CLI

Fleet CLI is a stand-alone binary you can download from the [Fleet GitHub releases page](https://github.com/rancher/fleet/releases).

**Linux/macOS**

```bash
curl -L -o fleet https://github.com/rancher/fleet/releases/download/v0.12.4/fleet-linux-amd64

# Make it executable and move to PATH

chmod +x fleet

sudo mv fleet /usr/local/bin/
```

**Windows (PowerShell)**

```bash
Invoke-WebRequest -Uri "https://github.com/rancher/fleet/releases/download/v0.12.4/fleet-windows-amd64.exe" -OutFile "fleet.exe"
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

* `fleet target`: Displays which clusters would receive a bundle based on selectors and targeting rules.
  *  This helps you understand how `targets`, `targetOverrides`, `clusterGroups`, and `label` selectors work. For example, `fleet target my-bundle ./manifests.`
* `fleet deploy`: Deploy a `bundle` with or without pushing it to the cluster. 
  * Supports dry-run mode to preview changes applied. For example, `fleet deploy --dry-run my-bundle ./manifests`.
* `fleet apply`: Create or preview a `Bundle` from local files. Works without Fleet installed.
  * This applies for `fleet.yaml`, Helm charts and manifests. For example, `fleet apply my-bundle ./manifests`.  

![A diagram explaining how fleet CLI key commands work.](/img/fleetCLI-key-components.svg)

For more information, refer to [Bundle Lifecycle With the CLI](../../ref-bundle-stages.md#examining-the-bundle-lifecycle-with-the-cli).

## Deploy a Sample Bundle Using Fleet CLI

You can deploy workloads without using GitRepos by applying them locally with the CLI. For example, consider using the [Fleet examples repository](https://github.com/rancher/fleet-examples).

```bash
git clone https://github.com/rancher/fleet-examples  
cd fleet-examples/single-cluster/manifests
```

Apply it to the current cluster:

```bash
fleet apply deployments .  
fleet apply services.  
fleet apply nginx-bundle .
```

This creates a Bundle resource named `nginx-bundle`, `deployments` and `services` in the namespace.

![A screenshot of deploying a sample bundle.](/img/apply-fleet-ss.png)

### Validate the Deployment

After applying a bundle using Fleet CLI, you can validate the deployment by inspecting the `Bundle` and its associated `BundleDeployments`.

Each Fleet-managed cluster lists:

* Which bundles are deployed to it.  
* Their readiness status.  
* Errors or sync issues (if any).

To validate whether your `fleet apply` created a `bundle` and if it’s deployed to the right number of target(s), run: 

```bash
kubectl get bundles.fleet.cattle.io -A
```

![A screenshot validating the fleet deployment.](/img/validate-deployment-ss.png)

You see the following fields:

* `BUNDLEDEPLOYMENTS-READY` shows how many targets are ready out of the total.  
* `STATUS` may show Ready, Modified, or other conditions based on the `rollout`.

:::note:
If this field shows 1/1, the bundle is successfully deployed to one cluster.
:::

To get a detailed view of how the bundle was rendered and applied:

`kubectl get bundles.fleet.cattle.io -n fleet-local my-nginx-bundle -o yaml`

Look for the following fields in the `status` section:

```yaml
status:  
  display:  
    readyClusters: 1/1  
  summary:  
    desiredReady: 1  
    ready: 1  
  conditions:  
    type: Ready  
    status: "True"
```

This indicates that:

* The bundle was scheduled for 1 cluster.  
* The target cluster has acknowledged and applied the resources.  
* The controller marked the deployment as ready.

You can also verify the corresponding `BundleDeployment` object, since each `BundleDeployment` corresponds to a target cluster.

`kubectl get bundledeployments.fleet.cattle.io -A`

## **Troubleshooting**

If the bundle is not ready:

* Check if `fleet-controller` and `fleet-agent` pods are running.  
* Make sure the `fleet-local` cluster is registered:  
* Inspect the bundle for error messages:  
  * `kubectl describe bundle -n fleet-local nginx-bundle`  
* Delete and re-apply the bundle if you encounter Helm ownership conflicts.
