# Cluster Registration Internals


## How does cluster registration work?

This text describes cluster registration with more technical details. The text ignores agent initiated registration, as it’s not commonly used.
[Agent initiated registration](./cluster-registration.md#agent-initiated) is ["`ClusterRegistrationToken` first"](./cluster-registration.md#create-cluster-registration-tokens), which means pre-creating a cluster is optional.

See "[Register Downstream Clusters](./cluster-registration.md)" to learn how to register clusters.

#### Cluster first

`fleet-controller` starts up and may "bootstrap" the local cluster resource. In Rancher creating the local cluster resource is handlded by the fleetcluster controller instead, but otherwise the process is identical.

For manager initiated registration the process is identical for the local cluster or any downstream cluster. It starts by  creating a cluster resource, which refers to a kubeconfig secret.

#### Cluster -> ClusterRegistrationToken + Import Account

Now that a cluster resource exists, `fleet-controller` triggers and runs `import.go` to create the fleet-agent deployment. `fleet-controller` also creates a [`clusterregistrationtoken`](./architecture.md#security) and waits for it to be complete. The `clusterregistationtoken` triggers the creation of the import service account, which can create `clusterregistrations` and read any secret in the system registration namespace (eg "cattle-fleet-clusters-system").
The `import.go` will enqueue itself until the import service account exists, because that’s needed to create the `fleet-agent-bootstrap` secret.
Now, the `fleet-agent` and the bootstrap secret are present on the downstream cluster

#### Fleet-Agent -> ClusterRegistration

Immediately the `fleet-agent` checks for a `fleet-agent-bootstrap` secret (which contains the import kubeconfig) and starts registering if present. Then `fleet-agent` creates a clusterregistration resource in fleet-default on the management cluster, with a random number. The random number will be used for the registration secret’s name.

`fleet-controller` triggers and tries to grant the clusterregistration request to create `fleet-agent`’s serviceaccount and create the `‘c-*’` registration secret with the clients new kubeconfig.
The registration secret name is `hash("clientID-clientRandom")`. The new kubeconfig uses the "request" account. The request account can access the cluster status, `bundledeployments` and `contents`.

### Notes

* The registration starts with the "import" account and pivots to the "request" account.
* The fleet-default namespace has all the cluster registrations, the import account uses a separate namespace.
* Once the agent is registered, `fleet-controller` will trigger on a cluster/namespace change and call manageagent to create a bundle. The agent will update itself to the bundle and since the generation env var changes it will restart.
* If no bootstrap secret exists, the agent will not re-register.


## Diagram

### Process

Detailed analysis of the registration process for clusters. This shows the interaction of controllers, resources and service accounts during the registration of a new downstream cluster or the local cluster.
It's important to note that there are multiple ways to start this:

* Creating a bootstrap config. Fleet does this for the local agent.
* Creating a `Cluster` resource with a kubeconfig. Rancher does this for downstream clusters. See [manager-initiated registration](./cluster-registration.md#manager-initiated).
* Create a `ClusterRegistrationToken` resource, optionally create a `Cluster` resource for a pre-defined (`clientID`) cluster. See [agent-initiated registration](./cluster-registration.md#agent-initiated).

![Registration](/img/FleetRegistration.svg)

### Secrets

This diagram shows the resources created during registration and focuses on the k8s API server configuration.

![Registration Secrets](/img/FleetRegistrationSecrets.svg)
