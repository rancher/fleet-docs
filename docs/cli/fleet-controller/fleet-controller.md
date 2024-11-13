---
title: ""
sidebar_label: "fleet-controller"
---
## fleet-controller



```
fleet-controller [flags]
```

### Options

```
      --debug                             Turn on debug logging
      --debug-level int                   If debugging is enabled, set klog -v=X
      --disable-metrics                   disable metrics
  -h, --help                              help for fleet-controller
      --kubeconfig string                 Paths to a kubeconfig. Only required if out-of-cluster.
      --namespace string                  namespace to watch (default "cattle-fleet-system")
      --shard-id string                   only manage resources labeled with a specific shard ID
      --zap-devel                         Development Mode defaults(encoder=consoleEncoder,logLevel=Debug,stackTraceLevel=Warn). Production Mode defaults(encoder=jsonEncoder,logLevel=Info,stackTraceLevel=Error) (default true)
      --zap-encoder encoder               Zap log encoding (one of 'json' or 'console')
      --zap-log-level level               Zap Level to configure the verbosity of logging. Can be one of 'debug', 'info', 'error', or any integer value > 0 which corresponds to custom debug levels of increasing verbosity
      --zap-stacktrace-level level        Zap Level at and above which stacktraces are captured (one of 'info', 'error', 'panic').
      --zap-time-encoding time-encoding   Zap time encoding (one of 'epoch', 'millis', 'nano', 'iso8601', 'rfc3339' or 'rfc3339nano'). Defaults to 'epoch'.
```

### SEE ALSO

* [fleet-controller agentmanagement](./fleet-controller_agentmanagement)	 - 
* [fleet-controller cleanup](./fleet-controller_cleanup)	 - 
* [fleet-controller gitjob](./fleet-controller_gitjob)	 - 

