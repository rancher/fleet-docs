# OCI Storage

## Summary

Fleet stores by default the bundle resources in etcd twice. This is done via the k8s API and there is a size limit, depending on the etcd configuration.

This feature will allow users to choose an OCI registry as storage for bundle resources. The bundle resource will have an empty resource list and a reference to the OCI repository server. The bundledeployment will not point to a content resource, but to an OCI repository server instead.

When using this feature the bundle resources are stored once, in the configured OCI registry, and `Fleet` won't be tied to possible `etcd` size limitations.

This might me interesting for users that either need to store big `Bundles` and could also be seen as the first step for a `OCIOps` feature in the future.

Once the OCI regitry is enabled `Fleet` will use it as the source for storing `Bundle`'s resources. 
It won't fallback to the default `etcd` version when something fails accessing the OCI registry. The user will get an error in that case to fix the possible error. 

## Configuring the OCI registry

OCI registry values should be configured as an extra section in the `GitRepo` yaml.

There are the fields involved:
```
// when ociRegistry is defined fleet will use oci registry as storage
ociRegistry:
    // url is the OCI registry url.
    url: "docker.io/your-user-here"
    // secret name where the credentials for the OCI registry are.
    // expects a generic secret with username and password keys set.
    authSecretName: oci-secret
    // basicHTTP allows fleet to uses basic http connections to communicate
    // with the registry (defaults to false)
    basicHTTP: false
    // insecureSkipTLS allows connections to the OCI registry
    // without certs (defaults to false)
    insecureSkipTLS: false
```
