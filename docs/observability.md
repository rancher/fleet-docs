# Observability

## Status Fields

Fleet reports most information via status fields on its custom resources.

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

Fleet supports prometheus metrics. They can be retrieved from these services:

* `monitoring-fleet-controller.cattle-fleet-system.svc.cluster.local:8080/metrics`
* `monitoring-gitjob.cattle-fleet-system.svc.cluster.local:8081/metrics`
