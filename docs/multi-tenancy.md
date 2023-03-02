# Multi Tenancy

Fleet uses Kubernetes RBAC where possible.

One addition on top of RBAC is the [`GitRepoRestriction`](./namespaces.md#restricting-gitrepos) resource, which can be used to control GitRepo resources in a namespace.

A multi-tenant fleet setup looks like this:

* tenants don't share namespaces, each tenant has one or more namespaces on the
  upstream cluster, where they can create GitRepo resources
* tenants can't deploy cluster wide resources and are limited to a set of
  namespaces on downstream clusters
* clusters are in a separate namespace

![Shared Clusters](/img/FleetSharedClusters.svg)

## Example Tenant

This would create a user 'fleetuser', who can only manage GitRepo resources in the 'project1' namespace.

    kubectl create serviceaccount fleetuser
    kubectl create namespace project1
    kubectl create -n project1 role fleetuser --verb=get --verb=list --verb=create --verb=delete --resource=gitrepos.fleet.cattle.io
    kubectl create -n project1 rolebinding fleetuser --serviceaccount=default:fleetuser --role=fleetuser

If we want to give access to multiple namespaces, we can use a single cluster role with two role bindings:

    kubectl create clusterrole fleetuser --verb=get --verb=list --verb=create --verb=delete --resource=gitrepos.fleet.cattle.io
    kubectl create -n project1 rolebinding fleetuser --serviceaccount=default:fleetuser --clusterrole=fleetuser
    kubectl create -n project2 rolebinding fleetuser --serviceaccount=default:fleetuser --clusterrole=fleetuser

This makes sure, tenants can't interfere with GitRepo resources from other tenants, since they don't have access to their namespaces.

## Allow Access to Clusters

This assumes all GitRepos created by 'fleetuser' have the `team: one` label. Different labels could be used, to select different cluster namespaces.

In each of the user's namespaces, as an admin create a [`BundleNamespaceMapping`](./namespaces.md#cross-namespace-deployments).

    kind: BundleNamespaceMapping
    apiVersion: fleet.cattle.io/v1alpha1
    metadata:
      name: mapping
      namespace: project1

    # Bundles to match by label.
    # The labels are defined in the fleet.yaml # labels field or from the
    # GitRepo metadata.labels field
    bundleSelector:
      matchLabels:
        team: one
        # or target one repo
        #fleet.cattle.io/repo-name: simpleapp

    # Namespaces, containing clusters, to match by label
    namespaceSelector:
      matchLabels:
        kubernetes.io/metadata.name: fleet-default
        # the label is on the namespace
        #workspace: prod

The [`target` section](./gitrepo-targets.md) in the GitRepo resource can be used to deploy only to a subset of the matched clusters.

## Restricting Access to Downstream Clusters

Admins can further restrict tenants by creating a `GitRepoRestriction` in each of their namespaces.

    kind: GitRepoRestriction
    apiVersion: fleet.cattle.io/v1alpha1
    metadata:
      name: restriction
      namespace: project1

    allowedTargetNamespaces:
      - project1simpleapp

This will deny the creation of cluster wide resources, which may interfere with other tenants and limit the deployment to the 'project1simpleapp' namespace.

## An Example GitRepo Resource

A GitRepo resource create by a tenant, without admin access could look like this:

    kind: GitRepo
    apiVersion: fleet.cattle.io/v1alpha1
    metadata:
      name: simpleapp
      namespace: project1
      labels:
        team: one

    spec:
      repo: https://github.com/rancher/fleet-examples
      paths:
      - bundle-diffs

      targetNamespace: project1simpleapp

      # do not match the upstream/local cluster, won't work
      targets:
      - name: dev
        clusterSelector:
          matchLabels:
            env: dev

This includes the `team: one` label and and the required `targetNamespace`.

Together with the previous `BundleNamespaceMapping` it would target all clusters with a `env: dev` label in the 'fleet-default' namespace.

:::note

`BundleNamespaceMappings` do not work with local clusters, so make sure not to target them.

:::
