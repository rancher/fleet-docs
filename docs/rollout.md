# Roll-out

Roll-out can be used to specify the order of clusters or groups to which the
applications should be deployed to. It is also a mean to control the deployment
process, for example, to ensure that the application is deployed to a certain
number of clusters successfully before proceeding to other ones. For that, the
`Ready` status condition is evaluated.

For an example of all configuration options, have a look the
[`fleet.yaml` reference](./ref-fleet-yaml.md). The relevant section is
`rolloutStrategy`.

TODO(PSE): Investigate initial deployments

󰋼 An initial deployment will always be performed to all clusters. The roll-out
strategy is only applied to subsequent deployments (updates).

## Use Cases

 Independent of the number of partitions, up to 50 Bundle Deployments are
created at once before the status of those Deployments is evaluated.

That means, regardless of the configuration in `MaxUnavailable` and
`MaxUnavailablePartitions`, Fleet will deploy up to 50 Deployments at once, then
check their status and decide whether to continue with the next batch of
Deployments or pause the deployment until the already deployed Deployments are
Ready.

### Single Partition

If you only have a single partition, `MaxUnavailable` is the option to make sure
a percentage or fixed number of clusters are Ready before the deployment is
continued. If `MaxUnavailable` is reached, the deployment is paused.

### Multiple Partitions

If you have multiple partitions, you can use `MaxUnavailablePartitions` to
control how many partitions can be unavailable at the same time. This is useful
if you want to ensure that a certain number of clusters have successfully been
deployed to a group of clusters (partition) before proceeding to the next group.

## How Does Partitioning Work?

Partitions are considered non-ready if a single cluster in that partition is not
Ready. This means that if you have a partition with 10 clusters and 1 cluster is
not Ready, the entire partition is considered non-ready.

## Automatic Partitioning

Automatic partitioning is based on the number of clusters and the
`autoPartitionSize` setting. Fleet will automatically create partitions based on
the number of clusters and the specified size.

If you have less than 200 clusters, Fleet will create a single partition with
the size of all clusters. If you have more than 200 clusters, Fleet will use the
value of `autoPartitionSize` to create partitions of that size.

### Manual Partitioning

You can create partitions manually by specifying the `partitions` field in the
`rolloutStrategy`. This allows you to define specific groups of clusters that
should be deployed to in a specific order. If you specify partitions manually,
the `autoPartitionSize` will be ignored.

Partitions can be specified by name, cluster selector, and cluster group.

TODO(PSE) provide an example for manual partitioning?

## Example Use Cases

- 50 Clusters

  ```yaml
  rolloutStrategy:
    maxUnavailable: 10%
  ```

  `autoPartitionSize` is not set, as it will not have any effect with 50
  clusters. Therefore, we also do not need to specify
  `maxUnavailablePartitions`, as we will have only one.

  Since we have also not specified manual partitions, Fleet will create a single
  partition with all 50 clusters.

  Even though we have specified `maxUnavailable` to be `10%`, Fleet will deploy
  to all 50 clusters at once before evaluating the status of the Deployments,
  effectively bypassing the `maxUnavailable` setting.

- 100 Clusters

  ```yaml
  rolloutStrategy:
    maxUnavailable: 10%
  ```

  `autoPartitionSize` is not set, as it will not have any effect with 100
  clusters. Therefore, we also do not need to specify
  `maxUnavailablePartitions`, as we will have only one.

  Since we have also not specified manual partitions, Fleet will create a single
  partition with all 100 clusters.

  Even though we have specified `maxUnavailable` to be `10%`, Fleet will deploy
  to 50 clusters at once before evaluating the status of the Deployments.

  If 10 clusters (10% of 100 clusters) are unavailable, the deployment of the
  remaining 50 clusters will be paused until less than 10 clusters are
  non-ready. Which means it will continue with the deployment of the remaining
  50 clusters if one of the 10 clusters becomes Ready again.

- 200 Clusters

  ```yaml
  rolloutStrategy:
    maxUnavailablePartitions: 1
    autoPartitionSize: 10%
  ```

  With 200 partitions, Fleet will create 20 partitions of 10 clusters each. The
  deployment will be paused if two partitions are considered non-ready.

  Assuming we have three partitions, of which the first to be deployed becomes
  non-ready. The deployment will continue with the second and third partition
  for as long as there aren't any more clusters in the second and third
  partition that are non-ready.

- 200 Clusters

  ```yaml
  rolloutStrategy:
    maxUnavailablePartitions: 0
    autoPartitionSize: 10%
  ```

  With 200 partitions, Fleet will create 20 partitions of 10 clusters each. The
  deployment will be paused if any cluster in any partitions is not ready.
