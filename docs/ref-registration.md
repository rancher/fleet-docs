# Cluster Registration Internals

Detailed analysis of the registration process for clusters. This shows the interaction of controllers, resources and service accounts during the registration of a new downstream cluster or the local cluster.
It's important to note that there are multiple ways to start this:

* Creating a bootstrap config. Fleet does this for the local agent.
* Creating a `Cluster` resource with a kubeconfig. Rancher does this for downstream clusters. See [manager-initiated registration](./cluster-registration.md#manager-initiated).
* Create a `ClusterRegistrationToken` resource, optionally create a `Cluster` resource for a pre-defined (`clientID`) cluster. See [agent-initiated registration](./cluster-registration.md#agent-initiated).

![Registration](/img/FleetRegistration.svg)
