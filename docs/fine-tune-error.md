# **Fine Tuning Error Detection**

Fleet monitors the `status` field of deployed resources to determine whether a `Bundle` is healthy or in error. In certain cases, Fleet may interpret a condition in the status field as an error, even if it is expected or harmless.

You can adjust this behavior in two ways:

* Ignore conditions in `fleet.yaml`  
* Customize error mappings with environment variables

![A visual flow of fine tuning error detections](../static/img/fine-tune-error-flow.svg)

:::note
You should rarely need to configure readiness detection in Fleet with environment variables. If you do, open an issue or submit a pull request to help improve the default readiness detection.
:::

## **Ignore conditions in `fleet.yaml`**

Use the `ignore.conditions` setting in the `fleet.yaml` file to tell Fleet to ignore specific conditions.

```yaml
# from https://fleet.rancher.io/ref-fleet-yaml

# Ignore fields when monitoring a Bundle. This can be used when Fleet thinks
# some conditions in Custom Resources makes the Bundle to be in an error state
# when it shouldn't.
ignore:

  # Conditions to be ignored
  conditions:

    # In this example a condition will be ignored if it contains
    # {"type": "Active", "status", "False"}
    - type: Active
      status: "False"
```

This method is useful when a custom resource or controller sets conditions that cause Fleet to mark a Bundle as failed, even though the resource is healthy.

![A visual flow of ignore condition during fine tuning error detection](../static/img/fine-tune-error-ingore.svg)

## **Configure error mapping with environment variables**

In Fleet **v0.13**, error detection was enhanced to give you more control. You can use the environment variable  `CATTLE_WRANGLER_CHECK_GVK_ERROR_MAPPING` to customize how resource conditions are interpreted.

This variable lets you define, by `Group`,`Version`,`Kind` (GVK), which condition values should be treated as errors or explicitly not treated as errors.

Set this variable in your Fleet Helm chart deployment (`values.yaml`) using `extraEnv`. The value must be JSON.

```yaml
# Extra environment variables passed to the fleet pods.
# extraEnv:
# - name: OCI_STORAGE
#   value: "false"
```
:::note
This setting is global to all Fleet controllers and applies to every `GitRepo`. If you need to adjust error handling only for a specific Bundle, use the `ignoreConditions` option in `fleet.yaml` instead.
:::

### Merging behavior

When you override mappings with `CATTLE_WRANGLER_CHECK_GVK_ERROR_MAPPING`:

* New Conditions are merged with predefined conditions.  
* Condition values are replaced for any condition you redefine.

For example, consider the Default mapping: 

`HelmChart.Failed=["True"]`

This means `Failed=True` is treated as an error.

When you override with:

* `HelmChart.Failed=["False"]`  
* `HelmChart.Ready=["False"]`

This results in 

* `Failed=["False"]` replaces the default mapping. This means **`Failed=False`** is now treated as an error.  
* `Ready=["False"]` is added, so **`Ready=False`** is also treated as an error.  
* Other conditions unchanged.

### Disable error interpretation example

Assume that every value of `Failed` was previously interpreted as an error, for example:

```json
{ "type": "Failed", "status": ["True", "False"] }
```
You can narrow this mapping to treat only `Failed=True` as an error by setting:

```json
[
  {
    "gvk": "sample.cattle.io/v1, Kind=Sample",
    "conditionMappings": [
      { "type": "Failed", "status": ["True"] } 
    ]
  }
]
```

This configuration means only **`Failed=True`** is treated as an error. `Failed=False` is no longer considered an error.

You can also disable errors for any value of `Failed` by

```json
{ "type": "Failed", "status": [""] } 

```

This configuration ensures that **no value of `Failed`** is treated as an error.

:::note
Overriding conditions only affects the default error mappings (refer to [Default error mappings](#default-error-mappings)). Fleet may still mark a resource as an error because other checks, such as those from the `kstatus` library, continue to run after your customization.
:::

### Enable error interpretation example

```json
[
  {
    "gvk": "sample.cattle.io/v1, Kind=Sample",
    "conditionMappings": [
      { "type": "Failed", "status": ["True"] }
    ]
  }
]

```

Here, `Failed=True` is treated as an error.

## Default error mappings {#default-error-mappings}

Fleet adds default error mappings to interpret certain resource conditions in the `status` field as errors. These mappings are applied besides to other readiness checks, such as those performed by the Kubernetes `kstatus` library.

The following default mappings apply:

* **HelmChart** (`helm.cattle.io/v1`)  
  * `JobCreated`: Neither `True` nor `False` is considered an error.  
  * `Failed`: `True` is considered an error.  
* **Node** (`v1`)  
  * `OutOfDisk`: `True` is considered an error.  
  * `MemoryPressure`: `True` is considered an error.  
  * `DiskPressure`: `True` is considered an error.  
  * `NetworkUnavailable`: `True` is considered an error.  
* **Deployment** (`apps/v1`)  
  * `ReplicaFailure`: `True` is considered an error.  
  * `Progressing`: `False` is considered an error.  
* **ReplicaSet** (`apps/v1`)  
  * `ReplicaFailure`: `True` is considered an error.

### Fallback mapping

If a resource does not match the listed GVKs, Fleet applies a fallback mapping:

* Any `Group` and `Version` with any kind

  * `Stalled`: `True` is considered an error.  
  * `Failed`: `True` is considered an error.

