# Setup Multi User

Fleet uses Kubernetes RBAC where possible.

One addition on top of RBAC is the [`GitRepoRestriction`](./namespaces.md#restricting-gitrepos) resource, which can be used to control GitRepo resources in a namespace.

A multi-user fleet setup looks like this:

* tenants don't share namespaces, each tenant has one or more namespaces on the
  upstream cluster, where they can create GitRepo resources
* tenants can't deploy cluster wide resources and are limited to a set of
  namespaces on downstream clusters
* clusters are in a separate namespace

![Shared Clusters](/img/FleetSharedClusters.svg)

:::warning important information

The isolation of tenants is not complete and relies on Kubernetes RBAC to be
set up correctly. Without manual setup from an operator tenants can still
deploy cluster wide resources. Even with the available Fleet restrictions,
users are only restricted to namespaces, but namespaces don't provide much
isolation on their own. E.g. they can still consume as many resources as they
like.

However, the existing Fleet restrictions allow users to share clusters, and
deploy resources without conflicts.

:::

## Example Fleet Standalone 

This would create a user 'fleetuser', who can only manage GitRepo resources in the 'project1' namespace.

```bash
    kubectl create serviceaccount fleetuser
    kubectl create namespace project1
    kubectl create -n project1 role fleetuser --verb=get --verb=list --verb=create --verb=delete --resource=gitrepos.fleet.cattle.io
    kubectl create -n project1 rolebinding fleetuser --serviceaccount=default:fleetuser --role=fleetuser
```

If we want to give access to multiple namespaces, we can use a single cluster role with two role bindings:
```bash
    kubectl create clusterrole fleetuser --verb=get --verb=list --verb=create --verb=delete --resource=gitrepos.fleet.cattle.io
    kubectl create -n project1 rolebinding fleetuser --serviceaccount=default:fleetuser --clusterrole=fleetuser
    kubectl create -n project2 rolebinding fleetuser --serviceaccount=default:fleetuser --clusterrole=fleetuser
```

This makes sure, tenants can't interfere with GitRepo resources from other tenants, since they don't have access to their namespaces.

## Isolated Workspaces in Rancher
 
Users belonging to a specific group/organization within the company, may want to disable visibility of their clusters to users from other groups/organizations of the same company.

In order to achieve this isolation, Rancher provides `GlobalRoles` to allow permissions to the users on certain Kubernetes resources. `GlobalRoles` have the ability to limit access to specific namespaces present on the cluster, thanks to `NamespacedRules`.

When a new fleet workspace is created, a corresponding namespace with an identical name is automatically generated within the Rancher local cluster.
For a user to see and deploy fleet resources in a specific workspace, they need at least the following permissions:
- list/get the `fleetworkspace` cluster-wide resource in the local cluster
- Permissions to create fleet resources (such as `bundles`, `gitrepos`, ...) in the backing namespace for the workspace in the local cluster. 

Let's grant permissions to deploy fleet resources in the `project1` and `project2` fleet workspaces:

- To create the `project1` and `project2` fleet workspaces, you can either do it in the [Rancher UI](https://ranchermanager.docs.rancher.com/integrations-in-rancher/fleet/overview#accessing-fleet-in-the-rancher-ui) or use the following YAML resources:

```yaml
apiVersion: management.cattle.io/v3
kind: FleetWorkspace
metadata:
  name: project1
```

```yaml
apiVersion: management.cattle.io/v3
kind: FleetWorkspace
metadata:
  name: project2
```

- Create a `GlobalRole` that grants permission to deploy fleet resources in the `project1` and `project2` fleet workspaces:

```yaml
apiVersion: management.cattle.io/v3
kind: GlobalRole
metadata:
  name: fleet-projects1and2
namespacedRules:
  project1:
    - apiGroups:
        - fleet.cattle.io
      resources:
        - gitrepos
        - bundles
        - clusterregistrationtokens
        - gitreporestrictions
        - clusters
        - clustergroups
      verbs:
        - '*'
  project2:
    - apiGroups:
        - fleet.cattle.io
      resources:
        - gitrepos
        - bundles
        - clusterregistrationtokens
        - gitreporestrictions
        - clusters
        - clustergroups
      verbs:
        - '*'
rules:
  - apiGroups:
      - management.cattle.io
    resourceNames:
      - project1
      - project2
    resources:
      - fleetworkspaces
    verbs:
      - '*'
```

Assign the `GlobalRole` to users or groups, more info can be found in the [Rancher docs](https://ranchermanager.docs.rancher.com/how-to-guides/new-user-guides/authentication-permissions-and-global-configuration/manage-role-based-access-control-rbac/global-permissions#configuring-global-permissions-for-individual-users)

The user now has access to the `Continuous Delivery` tab in Rancher and can deploy resources to both the `project1` and `project2` workspaces.

In order to have a well organized environment, each workspace should have its own related `GlobalRole` to help with the separation of duties and isolation required by the customer. This way, each user can be assigned to one or more `GlobalRoles`, depending on the needs.

## Allow Access to Clusters

This assumes all GitRepos created by 'fleetuser' have the `team: one` label. Different labels could be used, to select different cluster namespaces.

In each of the user's namespaces, as an admin create a [`BundleNamespaceMapping`](./namespaces.md#cross-namespace-deployments).

```yaml
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
```

The [`target` section](./gitrepo-targets.md) in the GitRepo resource can be used to deploy only to a subset of the matched clusters.

## Restricting Access to Downstream Clusters

Admins can further restrict tenants by creating a `GitRepoRestriction` in each of their namespaces.

```yaml
    kind: GitRepoRestriction
    apiVersion: fleet.cattle.io/v1alpha1
    metadata:
      name: restriction
      namespace: project1

    allowedTargetNamespaces:
      - project1simpleapp
```

This denies the creation of cluster wide resources, which may interfere with other tenants and limit the deployment to the 'project1simpleapp' namespace.

## An Example GitRepo Resource

A GitRepo resource created by a tenant, without admin access could look like this:
```yaml
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
```

This includes the `team: one` label and the required `targetNamespace`.

Together with the previous `BundleNamespaceMapping` it would target all clusters with a `env: dev` label in the 'fleet-default' namespace.

:::note

`BundleNamespaceMappings` do not work with local clusters, so make sure not to target them.

:::
