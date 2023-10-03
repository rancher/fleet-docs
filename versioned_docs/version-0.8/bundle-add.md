# Create a Bundle Resource

Bundles are automatically created by Fleet when a `GitRepo` is created. In most cases `Bundles` should not be created
manually by the user. If you want to deploy resources from a git repository use a
[GitRepo](https://fleet.rancher.io/gitrepo-add) instead.

If you want to deploy resources without a git repository follow this guide to create a `Bundle`.

When creating a `GitRepo` Fleet will fetch the resources from a git repository, and add them to a Bundle.
When creating a `Bundle` resources need to be explicitly specified in the `Bundle` Spec.
Resources can be compressed with gz. See [here](https://github.com/rancher/rancher/blob/v2.7.3/pkg/controllers/provisioningv2/managedchart/managedchart.go#L149-L153)
an example of how Rancher uses compression in go code.

If you would like to deploy in downstream clusters, you need to define targets. Targets work similarly to targets in `GitRepo`.
See [Mapping to Downstream Clusters](https://fleet.rancher.io/gitrepo-targets#defining-targets).

The following example creates a nginx `Deployment` in the local cluster:

```yaml
kind: Bundle
apiVersion: fleet.cattle.io/v1alpha1
metadata:
  # Any name can be used here
  name: my-bundle
  # For single cluster use fleet-local, otherwise use the namespace of
  # your choosing
  namespace: fleet-local
spec:
  resources:
  # List of all resources that will be deployed
  - content: |
      apiVersion: apps/v1
      kind: Deployment
      metadata:
        name: nginx-deployment
        labels:
          app: nginx
      spec:
        replicas: 3
        selector:
          matchLabels:
            app: nginx
        template:
          metadata:
            labels:
              app: nginx
          spec:
            containers:
              - name: nginx
                image: nginx:1.14.2
                ports:
                  - containerPort: 80
    name: nginx.yaml
  targets:
  - clusterName: local

```

## Limitations

Helm options related to downloading the helm chart will be ignored. The helm chart is downloaded by the fleet-cli, which creates the bundles. The bundle has to contain all the resources from the chart. Therefore the bundle will ignore:

* `spec.helm.repo`
* `spec.helm.charts`

You can't use a `fleet.yaml` in resources, it is only used by the fleet-cli to create bundles.

The `spec.targetRestrictions` field is not useful, as it is an allow list for targets specified in `spec.targets`. It is not needed, since `targets` are explicitly given in a bundle and an empty `targetRestrictions` defaults to allow.
