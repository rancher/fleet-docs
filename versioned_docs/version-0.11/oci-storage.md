# OCI Storage

OCI storage is an experimental feature to store a bundle's resources in an OCI registry, instead of k8s resources.
Fleet won't be limited by [`etcd` size limitations](https://etcd.io/docs/v3.4/dev-guide/limit/). However,
Fleet needs write access to a registry and that registry needs to be accessible by the agents in downstream clusters.

## Summary

Fleet stores by default the bundle resources in etcd twice. This is done via the k8s API and there is a size limit, depending on the etcd configuration.

This feature will allow users to choose an OCI registry as storage for bundle resources. The bundle resource will have an empty resource list and a reference to the OCI repository server. The bundledeployment will not point to a content resource, but to an OCI repository server instead.

When using this feature the bundle resources are stored once, in the configured OCI registry, and Fleet won't be tied to possible `etcd` size limitations.

This may me interesting for users who need to store big `Bundles`, and could also be seen as the first step for an `OCIOps` feature in the future.

Once the OCI registry is enabled, Fleet will use it as the source for storing `Bundle` resources.
When Fleet can't access the OCI registry, it won't fall back to default `etcd` storage. Instead, it will log errors so they can be fixed.

## Configuring the OCI registry

OCI registry values should be configured as an extra section in the `GitRepo` yaml.

There are the fields involved:
```
// when ociRegistry is defined Fleet will use oci registry as storage
ociRegistry:
    // reference is the OCI registry url.
    reference: "docker.io/your-user-here"
    // secret name where the credentials for the OCI registry are.
    // expects a generic secret with username and password keys set.
    authSecretName: oci-secret
    // basicHTTP allows Fleet to uses basic http connections to communicate
    // with the registry (defaults to false)
    basicHTTP: false
    // insecureSkipTLS allows connections to the OCI registry
    // without certs (defaults to false)
    insecureSkipTLS: false
```
