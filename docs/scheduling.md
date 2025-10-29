# Scheduling

:::warning
This is an experimental feature.
:::

Fleet supports (starting from version 0.14) the definition of **scheduled intervals** during which new updates to existing deployments are allowed.

This enables users to control **when changes are applied**, independently of when updates are pushed to the Git repository—if desired.

There are many reasons why one might want to define time windows during which changes to a cluster are permitted. For example:

* Outside business hours
* To schedule updates at specific times
* To differentiate update windows between environments (e.g., dev vs prod)

Update scheduling is currently applied at the `Cluster` level.
A `Schedule` resource is defined, which specifies which `Clusters` are affected. Those clusters will only install new updates if permitted by the defined `Schedule`.

Any changes detected by Fleet in the Git repository will still be applied at the `Bundle` level. However, the **agent** responsible for deploying the changes in each affected cluster will only initiate the deployment if the cluster is currently allowed to do so by the corresponding `Schedule`.

This means that when a change is detected in the repository, it will be applied to the `Bundle`, and the status will move to *Waiting Update* until the `Cluster` agent is active and allowed to perform deployments according to its `Schedule`.

If a `Cluster` is not associated with any `Schedule`, updates will be applied immediately.

---

# Schedule Resource

Now let’s look at how to define a `Schedule` and what fields are available.

A `Schedule` is essentially defined by:

* A **cron expression** that indicates its start time
* A **duration**
* The **targets** (clusters) to which it applies

Here’s a basic example of a `Schedule` that uses a simple target definition:

```yaml
apiVersion: fleet.cattle.io/v1alpha1
kind: Schedule
metadata:
  name: schedule-test
  namespace: fleet-local
spec:
  schedule: "0 0 22 * * *"
  duration: 1h
  targets:
    clusters:
      - name: local
        clusterName: local
```

This defines a **1-hour time window** that starts every day at **22:00:00**, and applies to the cluster named *local* in the `fleet-local` namespace.
The targets of a `Schedule` use the **same namespace** as the `Schedule`.

In other words: the *local* `Cluster` will only accept changes from **22:00:00 to 23:00:00**.

Now let’s look at another example where the `Schedule` is used to deploy updates to **downstream clusters** labeled with *env=dev*:

```yaml
apiVersion: fleet.cattle.io/v1alpha1
kind: Schedule
metadata:
  name: schedule-test
  namespace: fleet-default
spec:
  schedule: "0 0 */3 * * *"
  duration: 1h 
  targets:
    clusters:
      - name: targets-dev
        clusterSelector:
          matchLabels:
            env: dev
```

In this case, the `Schedule` allows updates to `Clusters` labeled with *env=dev* **every 3 hours**, for a **duration of 1 hour**.

The way you define target `Clusters` is **identical** to how targets are defined for `GitRepo` resources.
The existing documentation at [GitRepo Targets](./gitrepo-targets.md) also applies to `Schedule` targets.

You can view the full CRD for `Schedule` [here](ref-schedule.md)
