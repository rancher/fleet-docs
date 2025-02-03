---
title: ""
sidebar_label: "fleet-agent"
---
## fleet-agent



```
fleet-agent [flags]
```

### Options

```
      --agent-scope string                An identifier used to scope the agent bundleID names, typically the same as namespace
      --debug                             Turn on debug logging
      --debug-level int                   If debugging is enabled, set klog -v=X
  -h, --help                              help for fleet-agent
      --kubeconfig string                 Paths to a kubeconfig. Only required if out-of-cluster.
      --namespace string                  system namespace is the namespace, the agent runs in, e.g. cattle-fleet-system
      --zap-devel                         Development Mode defaults(encoder=consoleEncoder,logLevel=Debug,stackTraceLevel=Warn). Production Mode defaults(encoder=jsonEncoder,logLevel=Info,stackTraceLevel=Error) (default true)
      --zap-encoder encoder               Zap log encoding (one of 'json' or 'console')
      --zap-log-level level               Zap Level to configure the verbosity of logging. Can be one of 'debug', 'info', 'error', or any integer value > 0 which corresponds to custom debug levels of increasing verbosity
      --zap-stacktrace-level level        Zap Level at and above which stacktraces are captured (one of 'info', 'error', 'panic').
      --zap-time-encoding time-encoding   Zap time encoding (one of 'epoch', 'millis', 'nano', 'iso8601', 'rfc3339' or 'rfc3339nano'). Defaults to 'epoch'.
```

### SEE ALSO

* [fleet-agent clusterstatus](fleet-agent_clusterstatus)	 - Continuously report resource status to the upstream cluster
* [fleet-agent register](fleet-agent_register)	 - Register agent with an upstream cluster

