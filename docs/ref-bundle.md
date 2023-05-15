# Bundle Resource

Bundles are automatically created by Fleet when a `GitRepo` is created.

The content of the resource corresponds to the [BundleSpec](./ref-crds#bundlespec).
For more information on how to use the Bundle resource [Create a Bundle Resource](./bundle-add.md).

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
  # Namespace used for resources that do not specify a namespace. 
  # This field is not used to enforce or lock down the deployment to a specific namespace.
  # defaultNamespace: test

  # If present will assign all resource to this
  # namespace and if any cluster scoped resource exists the deployment will fail.
  # targetNamespace: app

  # Kustomize options for the deployment, like the dir containing the kustomization.yaml file.
  # kustomize: ...
  
  # Helm options for the deployment, like the chart name, repo and values.
  # helm: ...
  
  # ServiceAccount which will be used to perform this deployment.
  # serviceAccount: sa

  # ForceSyncGeneration is used to force a redeployment.
  # forceSyncGeneration: 0
  
  # YAML options, if using raw YAML these are names that map to overlays/{name} that will be used to replace or patch a resource.
  # yaml: ...
  
  # Diff can be used to ignore the modified state of objects which are amended at runtime.
  # A specific commit or tag can also be watched.
  #
  # diff: ...
  
  # KeepResources can be used to keep the deployed resources when removing the bundle.
  # keepResources: false
  
  # If set to true, will stop any BundleDeployments from being updated. It will be marked as out of sync.
  # paused: false
  
  # Controls the rollout of bundles, by defining partitions, canaries and percentages for cluster availability.
  # rolloutStrategy: ...

  # Contain the actual resources from the git repo which will be deployed.
  resources:
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

  # Target clusters to deploy to if running Fleet in a multi-cluster
  # style. Refer to the "Mapping to Downstream Clusters" docs for
  # more information.
  #
  # targets: ...

  # This field is used by Fleet internally, and it should not be modified manually.
  # Fleet will copy all targets into targetRestrictions when a Bundle is created for a GitRepo.
  # targetRestrictions: ...

  # Refers to the bundles which must be ready before this bundle can be deployed.
  # dependsOn: ...

```
