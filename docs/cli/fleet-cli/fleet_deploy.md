---
title: ""
sidebar_label: "fleet deploy"
---
## fleet deploy

Deploy a bundledeployment/content resource to a cluster, by creating a Helm release. This will not deploy the bundledeployment/content resources directly to the cluster.

```
fleet deploy [flags]
```

### Options

```
  -a, --agent-namespace string            Set the agent namespace, normally cattle-fleet-system. If set, fleet agent will garbage collect the helm release, i.e. delete it if the bundledeployment is missing.
  -d, --dry-run                           Print the resources that would be deployed, but do not actually deploy them
  -h, --help                              help for deploy
  -i, --input-file string                 Location of the YAML file containing the content and the bundledeployment resource
      --kube-version string               For dry runs, sets the Kubernetes version to assume when validating Chart Kubernetes version constraints.
      --kubeconfig string                 Paths to a kubeconfig. Only required if out-of-cluster.
  -n, --namespace string                  Set the default namespace. Deploy helm chart into this namespace.
      --zap-devel                         Development Mode defaults(encoder=consoleEncoder,logLevel=Debug,stackTraceLevel=Warn). Production Mode defaults(encoder=jsonEncoder,logLevel=Info,stackTraceLevel=Error) (default true)
      --zap-encoder encoder               Zap log encoding (one of 'json' or 'console')
      --zap-log-level level               Zap Level to configure the verbosity of logging. Can be one of 'debug', 'info', 'error', or any integer value > 0 which corresponds to custom debug levels of increasing verbosity
      --zap-stacktrace-level level        Zap Level at and above which stacktraces are captured (one of 'info', 'error', 'panic').
      --zap-time-encoding time-encoding   Zap time encoding (one of 'epoch', 'millis', 'nano', 'iso8601', 'rfc3339' or 'rfc3339nano'). Defaults to 'epoch'.
```

### SEE ALSO

* [fleet](./fleet)	 - 

