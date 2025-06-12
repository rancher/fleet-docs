# Rollout Strategy in Fleet

Fleet uses a rollout strategy to control how apps are deployed across clusters. This feature allows you to define the order and grouping of cluster deployments, enabling controlled rollouts, and safer updates. Fleet evaluates the Ready status of deployments to determine when to proceed with the next phase of a rollout. For more information, refer to [Status Fields](./ref-status-fields.md).

:::note
Rollout strategy applies only to updates. Initial deployments target all clusters at once.
:::

Fleet creates up to 50 BundleDeployments at a time,  regardless of the rollout configuration. After creating a batch, Fleet evaluates the deployment status. If the current batch meets readiness criteria, Fleet proceeds to the next batch. Otherwise, it pauses the rollout.

The rollout behavior is configured in the rolloutStrategy section of the fleet.yaml file. For more information. refer to [rolloutStrategy in fleet.yaml example.](./ref-fleet-yaml.md)

## How Does Partitioning Work?

Partitions are considered non-ready if **any** cluster in the partition is not Ready. Deployment continues only if the number of non-ready partitions remains below maxUnavailablePartitions.

:::note
Fleet deploys up to 50 clusters at a time regardless of partition size.
:::

![A visual asset displaying flow of rollout in Fleet.](../static/img/flow-rollout-fleet.png)

Various limits that can be configured in Fleet:

| Field | Description | Default |
| ----- | ----- | ----- |
| maxUnavailable | Maximum number or percentage of clusters that can be non-ready before halting rollout. | 100% |
| maxUnavailablePartitions | Number or percentage of partitions that can be non-ready at once. | 0 |
| autoPartitionSize | Number or percentage of clusters per auto-created partition. | 25% |
| partitions | Define manual partitions by cluster labels or group. | – |

### Single Partition Rollout

When you don’t define partitions explicitly, Fleet creates a **single partition** containing all clusters. Use the maxUnavailable setting to limit how many clusters can be non-ready at once.

If the number of non-ready clusters exceeds this maxUnavailable limit, Fleet pauses the rollout until the count drops below the threshold.

### Multiple Partitions Rollout

When you configure multiple partitions, Fleet uses maxUnavailablePartitions to limit how many partitions can be non-ready at once. If the number of non-ready partitions exceeds maxUnavailablePartitions, Fleet pauses the rollout.

Fleet supports both automatic and manual rollout partitioning. The rollout behavior is controlled using the [rolloutStrategy section in the fleet.yaml file.](./ref-fleet-yaml.md)

**Automatic Partitioning:** Fleet automatically creates partitions using autoPartitionSize.

* If fewer than 200 clusters, Fleet uses a single partition.  
* If 200+ clusters, partitions are created based on autoPartitionSize.

For example, consider 200 Clusters with following configurations

```yaml
rolloutStrategy:
  maxUnavailablePartitions: 1
  autoPartitionSize: 10%
```

Fleet then creates 20 partitions of 10 clusters each, and if more than one partition becomes non-ready, rollout pauses.

**Manual Partitioning:** You define specific partitions using the partitions field. This gives you fine-grained control over cluster groupings and rollout order.

:::note
If you specify partitions manually, the autoPartitionSize is ignored.
:::

Partitions can be specified by name, cluster selector, and cluster group.

For example, consider creating a partition named canary for production clusters in a specific group:

```yaml
rolloutStrategy:
  partitions:
    - name: canary
      maxUnavailable: 10%
      clusterSelector:
        matchLabels:
          env: prod
      clusterGroup: frontend
```

Fleet then:

1. Selects clusters based on clusterSelector, clusterGroup, or clusterGroupSelector.  
2. Starts rollout to the first partition.  
3. Waits until the partition is **Ready** (or within maxUnavailable threshold).  
4. Proceeds to the next partition.

## Use Cases and Behavior

### Scenario: 50 Clusters( Single Partition) 

```yaml
rolloutStrategy: 
maxUnavailable: 10%
```

* Fleet creates one partition containing all 50 clusters, since no partitions are defined.  
  * No requirement to specify maxUnavailablePartitions, as you have only one.  
* Although there is no specified manual partition and maxUnavailable is set to 10%, Fleet deploys to all 50 clusters at once (batch behavior overrides maxUnavailable initially).  
* Evaluation occurs after all deployments are created.

### Scenario: 100 Clusters( Single Partition) 

```yaml
rolloutStrategy: 
maxUnavailable: 10%
```

* Fleet creates one partition containing all 100clusters, since no partitions are defined.  
  * No requirement to specify maxUnavailablePartitions, as you have only one.  
* Although there is no specified manual partition and maxUnavailable is set to 10%, Fleet deploys to all 50 clusters at once (batch behavior overrides maxUnavailable initially).

If 10 clusters (10% of 100 clusters) are unavailable, the deployment of the remaining 50 clusters are paused until less than 10 clusters are non-ready. 

![A visual asset displaying the partion about rollout in Fleet](../static/img/parition-fleet-rollout.png)

### Scenario: 200 Clusters (Multiple Partitions)

```yaml
rolloutStrategy:
  maxUnavailablePartitions: 1
  autoPartitionSize: 10%
```

* Fleet creates 20 partitions, each with 10 clusters.  
* Deployment proceeds sequentially by partition.  
* If two or more partitions become non-ready, rollout pauses.  
* If one partition is non-ready, rollout can proceed to the next.

### Scenario: 200 Clusters (Strict Readiness)

```yaml
rolloutStrategy:
 maxUnavailablePartitions: 0
 autoPartitionSize: 10%
```

* Fleet creates 20 partitions of 10 clusters each.  
* If **any** cluster in **any** partition is non-ready, rollout is paused.

![A visual asset displaying 200 clusters](../static/img/deploy-50Clusters.png)

