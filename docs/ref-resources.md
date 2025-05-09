# List of Deployed Resources

After installing Fleet in Rancher these resources are created in the upstream cluster.
Also see [Namespaces](namespaces).

## From Helm, Intial Setup
| Type  | Name        | Namespace |
| ----- | ----------- | --------- |
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

## Generated By Bootstrap
| Type  | Name        | Namespace |
| ----- | ----------- | --------- |
| clusters.fleet.cattle.io | local | 	fleet-local |
| clusters.provisioning.cattle.io | local | 	fleet-local |
| clusters.management.cattle.io | local | 	- |
| ClusterGroup | 	default |	fleet-local |
| Bundle | fleet-agent-local | 	fleet-local |

## For Each Registered Cluster
| Type  | Name        | Namespace |
| ----- | ----------- | --------- |
| clusters.provisioning.cattle.io | | by default fleet-default |
| clusters.management.cattle.io | generated |		- |
| clusters.fleet.cattle.io | | fleet-default |
| Secret, opaque | kubeconfig | fleet-default |
| ClusterRegistrationToken | | fleet-default |
| ServiceAccount | import | fleet-default |
| RoleBinding | request | fleet-default |
| RoleBinding | request | cluster-fleet-default |
| Role | request | cluster-fleet-default |
| Secret, service-account-token | import-token | fleet-default |
| Namespace | cluster-fleet-default | - |
| ClusterRegistration | fleet-default |  |
| ServiceAccount | request | fleet-default |
| Secret, agent-credential | c-ID | fleet-default |
| Secret, service-account-token | request-token | fleet-default |
| Bundle | fleet-agent-name | fleet-name |
| BundleDeployment | fleet-agent-name | cluster-fleet-default |

## For Each Bundle, Per Cluster
| Type  | Name        | Namespace |
| ----- | ----------- | --------- |
| Bundle | name | fleet-default |
| Secret, bundle| name | fleet-default |
| BundleDeployment | name | cluster-fleet-default |
| Secret, bundle-deployment | name | cluster-fleet-default |
| Secret, opaque (content-access) | name | cluster-fleet-default |
| Content | - | - |

## For Each GitRepo
| Type  | Name        | Namespace |
| ----- | ----------- | --------- |
| ServiceAccount | name | fleet-default  |
| Role | name | fleet-default |
| RoleBinding | name | fleet-default |
| Job | name | fleet-default |
| ConfigMap | name-config | fleet-default |
| Secret | name-cabundle | fleet-default |


