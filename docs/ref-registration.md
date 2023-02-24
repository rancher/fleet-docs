# Cluster Registration Internals

Detailed analysis of the registration process for clusters. This shows the interaction of controllers, resources and service accounts during the registration of a new downstream cluster or the local cluster.
It's important to note that there are multiple ways to start this:

* Creating a bootstrap config. Fleet does this for the local agent.
* Creating a `Cluster` resource with a kubeconfig. Rancher does this for downstream clusters.
* Create a `Cluster` resource with an id.
* Create a `ClusterRegistration` resource.

![Registration](/img/FleetRegistration.svg)
