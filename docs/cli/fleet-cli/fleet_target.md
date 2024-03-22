---
title: ""
sidebar_label: "fleet target"
---
## fleet target

Print available targets for a bundle

```
fleet target [flags]
```

### Options

```
  -b, --bundle-file string                Location of the Bundle resource yaml
  -l, --dump-input-list                   Dump the live resources, which impact targeting, like clusters, as YAML
  -h, --help                              help for target
      --kubeconfig string                 Paths to a kubeconfig. Only required if out-of-cluster.
  -n, --namespace string                  Override the namespace of the bundle. Targeting searches this namespace for clusters.
      --zap-devel                         Development Mode defaults(encoder=consoleEncoder,logLevel=Debug,stackTraceLevel=Warn). Production Mode defaults(encoder=jsonEncoder,logLevel=Info,stackTraceLevel=Error) (default true)
      --zap-encoder encoder               Zap log encoding (one of 'json' or 'console')
      --zap-log-level level               Zap Level to configure the verbosity of logging. Can be one of 'debug', 'info', 'error', or any integer value > 0 which corresponds to custom debug levels of increasing verbosity
      --zap-stacktrace-level level        Zap Level at and above which stacktraces are captured (one of 'info', 'error', 'panic').
      --zap-time-encoding time-encoding   Zap time encoding (one of 'epoch', 'millis', 'nano', 'iso8601', 'rfc3339' or 'rfc3339nano'). Defaults to 'epoch'.
```

### SEE ALSO

* [fleet](./fleet)	 - 

