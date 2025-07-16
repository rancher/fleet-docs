# Fleet CLI

Fleet CLI is a command-line interface(CLI) that allows you to interact directly with Fleet from your local machine. It provides a practical way to:

* Apply Kubernetes manifests locally without needing a Git repository
* Experiment or test workloads in a development environment

## Install Fleet CLI
Fleet can be installed and used entirely through the command line. This document walks you through:

* Installing the Fleet CLI.  
* Installing Fleet into a Kubernetes cluster.
* Deploy and validate workloads using `fleet apply`.

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

# Install Fleet in Your Cluster

Fleet needs to be installed in the Kubernetes cluster using Helm. By default, the controller runs in the `cattle-fleet-system` namespace.

### Step 1: Install Fleet in the Cluster

Create the `cattle-fleet-system` namespace and install the Fleet CRDs and controller using Helm:

```bash
# Add Fleet Helm repo  
helm repo add rancher-latest https://releases.rancher.com/server-charts/latest  
helm repo update

# Note: You can use any namespace you want.  
# Create namespace  
kubectl create namespace cattle-fleet-system
```

### Step 2: Install Fleet CRDs and controller

```bash
# Install Fleet
helm install fleet-crd fleet/fleet-crd -n cattle-fleet-system --create-namespace --wait
helm install fleet fleet/fleet -n cattle-fleet-system --create-namespace --wait
```

### Step 3: Verify Fleet Is Running

Check the pods in the cattle-fleet-system namespace:

```bash
kubectl get pods -n cattle-fleet-system
```

You should see pods like:

![A screenshot of pods running.](/img/get-pods-ss.png)

## Deploy a Sample Bundle Using Fleet CLI

You can deploy workloads without using GitRepos by applying them locally with the CLI. For example, consider using the [Fleet examples repository](https://github.com/rancher/fleet-examples).

```bash
git clone https://github.com/rancher/fleet-examples  
cd fleet-examples/manifests
```

Apply it to the current cluster:

```bash
fleet apply deployments .  
fleet apply services.  
fleet apply nginx-bundle .
```

This creates a Bundle resource named `nginx-bundle`, `deployments` and `services` in the namespace.

![A screenshot of deploying a sample bundle.](/img/apply-fleet-ss.png)

### How fleet apply Works

If you run `fleet apply`, the Fleet CLI packages the local content , including `manifests`, `charts`, and `fleet.yaml`. Then creates a Kubernetes Bundle custom resource (CR) in your cluster.

The Fleet controller then performs the following steps:

* Resolves targets from `fleet.yaml` or defaults to the local cluster (fleet-local)  
* Creates one `BundleDeployment` per target, representing where the bundle should be applied  
* Applies the Kubernetes resources defined in the bundle to the target cluster and namespace

:::note
This process is fully local and does not depend on Git.
:::

If you use a GitRepo CR automates this same process. The controller watches the specified Git repository and:

* Regenerates the `Bundle` automatically on changes (commits, branch updates)  
* Applies the same deployment logic as Fleet CLI

:::note
Use `fleet apply` for local testing and CI pipelines. Use GitRepo for GitOps automation in staging and production environments.
:::

![A diagram explaining how fleet apply works.](/img/fleet-working-diag.png)

### Validate the Deployment

After applying a bundle using Fleet CLI, you can validate the deployment by inspecting the `Bundle` and its associated `BundleDeployments`.

Each Fleet-managed cluster lists:

* Which bundles are deployed to it.  
* Their readiness status.  
* Errors or sync issues (if any).

To validate whether your fleet apply created a bundle and if it’s deployed to the right number of target(s), run: 

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
