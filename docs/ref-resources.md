# List of Deployed Resources

After installing Fleet in Rancher these resources are created in the upstream cluster.

| Type  | Name        | Namespace |
| ----- | ----------- | --------- |
| From Helm, intial setup: | | |
| ClusterRole | fleet-controller | 	- |
| ClusterRole | gitjob | 	- |
| ClusterRoleBinding | fleet-controller | 	- |
| ClusterRoleBinding | gitjob-binding | 	- |
| ConfigMap | fleet-controller | 	cattle-fleet-system |
| Deployment | fleet-controller | 	cattle-fleet-system |
| Deployment | gitjob | 	cattle-fleet-system |
| Role | fleet-controller | 	cattle-fleet-system |
| Role | gitjob | 	cattle-fleet-system |
| RoleBinding | fleet-controller | 	cattle-fleet-system |
| RoleBinding | gitjob | 	cattle-fleet-system |
| Service | gitjob | 	cattle-fleet-system |
| ServiceAccount | fleet-controller | 	cattle-fleet-system |
| ServiceAccount | gitjob | 	cattle-fleet-system |
| Generated: | | |
| clusters.fleet.cattle.io | local | 	fleet-local |
| clusters.provisioning.cattle.io | local | 	fleet-local |
| clusters.management.cattle.io | local | 	- |
| ClusterGroup | 	default |	fleet-local |
| Bundle | fleet-agent-local | 	fleet-local |
| For each registered cluster: | | |
| clusters.provisioning.cattle.io | | by default fleet-default |
| clusters.management.cattle.io | generated |		- |
| clusters.fleet.cattle.io | fleet-default |  |
| Bundle | fleet-default |  |
| BundleDeployment | cluster-fleet-local-local-ID | fleet-agent-local


Also see [namespaces]
