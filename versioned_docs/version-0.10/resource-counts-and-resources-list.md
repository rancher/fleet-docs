# Resources List

This document outlines the deployed resources, categorized under `Bundles` and `GitRepos`.

## Bundles

The deployed resources within bundles can be found in `status.ResourceKey`. This key represents the actual resources deployed via `bundleDeployments`.

## GitRepos

Similar to bundles, the deployed resources in `GitRepos` are listed in `status.Resources`. This list is also derived from `bundleDeployments`. 

# Resource Counts

## GitRepos

The `status.ResourceCounts` list for GitRepos is derived from `bundleDeployments`.

## Clusters

In Clusters, the `status.ResourceCounts` list is derived from GitRepos.

## ClusterGroups

In ClusterGroups, the `status.ResourceCounts` list is also derived from GitRepos.
