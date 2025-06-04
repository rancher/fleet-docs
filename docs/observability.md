# Observability

## Status Fields

Fleet reports most information via status fields on its custom resources.
These fields are also used by the Rancher UI to display information about the state of the resources.

See [status fields reference](./ref-status-fields.md) for more information on status fields and conditions.

## K8S Events

Fleet will generate k8s events a user can subscribe to. This is the list of events:

* `Created `- a new git cloning job was created
* `GotNewCommit `- a git repository has a new commit
* `JobDeleted `- a successful git cloning job is removed
* `FailedValidatingSecret `- a git cloning job cannot be created, because a required secret is missing
* `FailedToApplyRestrictions `- the GitRepo resource violates the GitRepoRestriction resource's rules
* `FailedToCheckCommit `- cannot get latest commit from the git server
* `FailedToGetGitJob `- cannot retrieve information from the git cloning job
* `Failed `- polling is disabled, triggered via webhook, but cannot get latest commit from the git server

## Metrics

Fleet publishes prometheus metrics. They can be retrieved from these services:

* `monitoring-fleet-controller.cattle-fleet-system.svc.cluster.local:8080/metrics`
* `monitoring-gitjob.cattle-fleet-system.svc.cluster.local:8081/metrics`

The [collection of exported metrics](https://book.kubebuilder.io/reference/metrics-reference) includes all the information from controller-runtime, like the number of reconciled resources, the number of errors, and the time it took to reconcile.

When the Fleet is used by Rancher and the `rancher-monitoring` chart is
installed, Prometheus is automatically configured to scrape the Fleet metrics.

**_NOTE_** Depending on how many resources are handled by Fleet, metrics may
cause performance issues. If you have a lot of resources, you may want to
disable metrics. You can do this by setting `metrics.enabled` in the
`values.yaml` file to `false` when installing Fleet.
