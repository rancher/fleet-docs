# Understanding Helm values.yaml vs. Fleet valuesFiles

When using Fleet with Helm, you often confuse the chart’s built-in `values.yaml` with additional values files referenced in `fleet.yaml`. These files serve different purposes, and it’s important to understand how they interact.

![Understanding Helm values.yaml vs Fleet valuesFiles with best practices](../static/img/helm-value-fleet-yaml.svg)

## Helm chart’s values.yaml

Every Helm chart includes a `values.yaml`. This file contains the default configuration values used when deploying the chart.

* It’s automatically applied by Helm and Fleet. You don’t need to reference it in `fleet.yaml`.  
* It always acts as the baseline when the Fleet agent installs the chart.  
* Any overrides you provide later (via Fleet `valuesFiles` or `values: parameters`) replace or extend these defaults.

**Example directory:**

```bash
.  
├── Chart.yaml  
├── fleet.yaml  
├── README.md  
├── templates/  
│   ├── deployment.yaml  
│   └── service.yaml  
└── values.yaml   \# chart defaults
```

You can use Helm chart’s `values.yaml` file to:

* Provide default settings and allow users to override defaults without modifying the chart itself.  
* Define common Kubernetes resource defaults.

:::note
Helm chart `values.yaml` does not support templating. Any substitutions happen during chart rendering before Fleet applies the chart.

* You cannot use shell-style variables (for example, `${var}`) inside this file.  
* If `${var}` appears, Helm treats it as plain text—you don’t need to escape it.
:::

## **Fleet valuesFiles referenced from fleet.yaml**

Fleet lets you reference additional values files through `fleet.yaml`. These files override or extend the chart’s baseline defaults.

* A values Files entry is equivalent to copy-pasting the contents of that file into the values: section of `fleet.yaml`.  
* It’s mainly a convenience feature for splitting values into multiple files.  
* Unlike Helm chart `values.yaml`, Fleet’s values files support templating, which enables dynamic configuration per environment.

**Example fleet.yaml:**
```yaml
helm:  
  valuesFiles:  
    \- values.prod.yaml   \# overrides baseline
```

You can use fleet `valuesFiles` referenced from `fleet.yaml` to:

* Apply environment-specific overrides (dev, staging, prod).  
* Enable advanced features not included in chart defaults.

## **Best practice**

Whether you use helm `values.yaml`, `fleet.yaml` values:, or `valuesFiles`, never store credentials in these files.

The recommended and safer approach is to use `valuesFrom`, which references Kubernetes Secrets or ConfigMaps. Although this requires creating the Secrets on downstream clusters, it ensures sensitive data is stored securely.
