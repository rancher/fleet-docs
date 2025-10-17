# How to enable experimental features

Fleet supports experimental features that are disabled by default and that can be enabled by the user.

Enabling/disabling experimental features is done using extra environment variables that are available when deploying `rancher/fleet`.

See also "[Configure Fleet Install Options in Rancher](./ref-configuration#configure-fleet-install-options-in-rancher)".

## Available experimental features

Fleet currently supports the following experimental features, toggled through their respective environment variables:
* Scheduling: [`EXPERIMENTAL_SCHEDULES`](./scheduling.md)
* Automated propagation of resources to downstream clusters:
[`EXPERIMENTAL_COPY_RESOURCES_DOWNSTREAM`](./experimental-downstream-resources.md)

## Enabling an experimental feature

### Enabling when installing Fleet stand-alone

All you need to do is to pass something like:
```
--set-string extraEnv[0].name=EXPERIMENTAL_SCHEDULES \
--set-string extraEnv[0].value=true \
```
to your helm install or update command.

Please note you have to use `--set-string` because otherwise the boolean value won't work as expected.

### Enabling when installing Fleet with Rancher

You can also activate the experimental features in Fleet when installing Rancher.

The parameters are the same, but you have to add the `fleet.` prefix.

```
--set-string fleet.extraEnv[0].name=EXPERIMENTAL_SCHEDULES \
--set-string fleet.extraEnv[0].value=true \
```
