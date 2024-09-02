# How to enable experimental features

Fleet supports experimental features that are disabled by default and that can be enabled by the user.

Enabling/disabling experimental feaures is done usign extra environment variales that are available when deploying rancher/fleet.

## Enabling an experimental feature

At the moment we're writing this document fleet has OCI storage as an experimental feature.
### Enabling when installing fleet stand-alone

All you need to do is to pass something like:
```
--set-string extraEnv[0].name=EXPERIMENTAL_OCI_STORAGE \
--set-string extraEnv[0].value=true \
```
to your helm install or update command. 

Please note you have to use `--set-string` because otherwise the boolean value won't work as expected.

### Enabling when installing fleet with rancher

You can also activate the experimental features in `Fleet` when installing `Rancher`.

The parameters are the same, but you have to add the `fleet.` prefix.

```
--set-string fleet.extraEnv[0].name=EXPERIMENTAL_OCI_STORAGE \
--set-string fleet.extraEnv[0].value=true \
```

## Available experimental features

Right now `Fleet` supports the following experimental features:

* [`EXPERIMENTAL_OCI_STORAGE`](./oci-storage.md)