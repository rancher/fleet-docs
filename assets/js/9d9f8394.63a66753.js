"use strict";(self.webpackChunkfleet_docs=self.webpackChunkfleet_docs||[]).push([[9360],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>u});var a=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=a.createContext({}),p=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},c=function(e){var t=p(e.components);return a.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},h=a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,l=e.originalType,s=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),h=p(n),u=o,m=h["".concat(s,".").concat(u)]||h[u]||d[u]||l;return n?a.createElement(m,r(r({ref:t},c),{},{components:n})):a.createElement(m,r({ref:t},c))}));function u(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var l=n.length,r=new Array(l);r[0]=h;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i.mdxType="string"==typeof e?e:o,r[1]=i;for(var p=2;p<l;p++)r[p]=n[p];return a.createElement.apply(null,r)}return a.createElement.apply(null,n)}h.displayName="MDXCreateElement"},9222:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>r,default:()=>d,frontMatter:()=>l,metadata:()=>i,toc:()=>p});var a=n(7462),o=(n(7294),n(3905));const l={},r="Troubleshooting",i={unversionedId:"troubleshooting",id:"troubleshooting",title:"Troubleshooting",description:"This section contains commands and tips to troubleshoot Fleet.",source:"@site/docs/troubleshooting.md",sourceDirName:".",slug:"/troubleshooting",permalink:"/next/troubleshooting",draft:!1,editUrl:"https://github.com/rancher/fleet-docs/edit/main/docs/troubleshooting.md",tags:[],version:"current",lastUpdatedAt:1677161410,formattedLastUpdatedAt:"Feb 23, 2023",frontMatter:{},sidebar:"docs",previous:{title:"Image scan",permalink:"/next/imagescan"},next:{title:"Advanced Users",permalink:"/next/advanced-users"}},s={},p=[{value:"<strong>How Do I...</strong>",id:"how-do-i",level:2},{value:"Fetch the log from <code>fleet-controller</code>?",id:"fetch-the-log-from-fleet-controller",level:3},{value:"Fetch the log from the <code>fleet-agent</code>?",id:"fetch-the-log-from-the-fleet-agent",level:3},{value:"Fetch detailed error logs from <code>GitRepos</code> and <code>Bundles</code>?",id:"fetch-detailed-error-logs-from-gitrepos-and-bundles",level:3},{value:"Check a chart rendering error in <code>Kustomize</code>?",id:"check-a-chart-rendering-error-in-kustomize",level:3},{value:"Check errors about watching or checking out the <code>GitRepo</code>, or about the downloaded Helm repo in <code>fleet.yaml</code>?",id:"check-errors-about-watching-or-checking-out-the-gitrepo-or-about-the-downloaded-helm-repo-in-fleetyaml",level:3},{value:"Check the status of the <code>fleet-controller</code>?",id:"check-the-status-of-the-fleet-controller",level:3},{value:"Migrate the local cluster to the Fleet default cluster?",id:"migrate-the-local-cluster-to-the-fleet-default-cluster",level:3},{value:"Enable debug logging for <code>fleet-controller</code> and <code>fleet-agent</code>?",id:"enable-debug-logging-for-fleet-controller-and-fleet-agent",level:3},{value:"<strong>Additional Solutions for Other Fleet Issues</strong>",id:"additional-solutions-for-other-fleet-issues",level:2},{value:"Naming conventions for CRDs",id:"naming-conventions-for-crds",level:3},{value:"HTTP secrets in Github",id:"http-secrets-in-github",level:3},{value:"Fleet fails with bad response code: 403",id:"fleet-fails-with-bad-response-code-403",level:3},{value:"Helm chart repo: certificate signed by unknown authority",id:"helm-chart-repo-certificate-signed-by-unknown-authority",level:3},{value:"Fleet deployment stuck in modified state",id:"fleet-deployment-stuck-in-modified-state",level:3},{value:"<code>GitRepo</code> or <code>Bundle</code> stuck in modified state",id:"gitrepo-or-bundle-stuck-in-modified-state",level:3},{value:"Bundle has a Horizontal Pod Autoscaler (HPA) in modified state",id:"bundle-has-a-horizontal-pod-autoscaler-hpa-in-modified-state",level:3},{value:"What if the cluster is unavailable, or is in a <code>WaitCheckIn</code> state?",id:"what-if-the-cluster-is-unavailable-or-is-in-a-waitcheckin-state",level:3},{value:"GitRepo complains with <code>gzip: invalid header</code>",id:"gitrepo-complains-with-gzip-invalid-header",level:3},{value:"Agent is no longer registered",id:"agent-is-no-longer-registered",level:3}],c={toc:p};function d(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"troubleshooting"},"Troubleshooting"),(0,o.kt)("p",null,"This section contains commands and tips to troubleshoot Fleet."),(0,o.kt)("h2",{id:"how-do-i"},(0,o.kt)("strong",{parentName:"h2"},"How Do I...")),(0,o.kt)("h3",{id:"fetch-the-log-from-fleet-controller"},"Fetch the log from ",(0,o.kt)("inlineCode",{parentName:"h3"},"fleet-controller"),"?"),(0,o.kt)("p",null,"In the local management cluster where the ",(0,o.kt)("inlineCode",{parentName:"p"},"fleet-controller")," is deployed, run the following command with your specific ",(0,o.kt)("inlineCode",{parentName:"p"},"fleet-controller")," pod name filled in:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"$ kubectl logs -l app=fleet-controller -n cattle-fleet-system\n")),(0,o.kt)("h3",{id:"fetch-the-log-from-the-fleet-agent"},"Fetch the log from the ",(0,o.kt)("inlineCode",{parentName:"h3"},"fleet-agent"),"?"),(0,o.kt)("p",null,"Go to each downstream cluster and run the following command for the local cluster with your specific ",(0,o.kt)("inlineCode",{parentName:"p"},"fleet-agent")," pod name filled in:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"# Downstream cluster\n$ kubectl logs -l app=fleet-agent -n cattle-fleet-system\n# Local cluster\n$ kubectl logs -l app=fleet-agent -n cattle-local-fleet-system\n")),(0,o.kt)("h3",{id:"fetch-detailed-error-logs-from-gitrepos-and-bundles"},"Fetch detailed error logs from ",(0,o.kt)("inlineCode",{parentName:"h3"},"GitRepos")," and ",(0,o.kt)("inlineCode",{parentName:"h3"},"Bundles"),"?"),(0,o.kt)("p",null,"Normally, errors should appear in the Rancher UI. However, if there is not enough information displayed about the error there, you can research further by trying one or more of the following as needed:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"For more information about the bundle, click on ",(0,o.kt)("inlineCode",{parentName:"li"},"bundle"),", and the YAML mode will be enabled. "),(0,o.kt)("li",{parentName:"ul"},"For more information about the GitRepo, click on ",(0,o.kt)("inlineCode",{parentName:"li"},"GitRepo"),", then click on ",(0,o.kt)("inlineCode",{parentName:"li"},"View Yaml")," in the upper right of the screen. After viewing the YAML, check ",(0,o.kt)("inlineCode",{parentName:"li"},"status.conditions"),"; a detailed error message should be displayed here."),(0,o.kt)("li",{parentName:"ul"},"Check the ",(0,o.kt)("inlineCode",{parentName:"li"},"fleet-controller")," for synching errors."),(0,o.kt)("li",{parentName:"ul"},"Check the ",(0,o.kt)("inlineCode",{parentName:"li"},"fleet-agent")," log in the downstream cluster if you encounter issues when deploying the bundle.")),(0,o.kt)("h3",{id:"check-a-chart-rendering-error-in-kustomize"},"Check a chart rendering error in ",(0,o.kt)("inlineCode",{parentName:"h3"},"Kustomize"),"?"),(0,o.kt)("p",null,"Check the ",(0,o.kt)("a",{parentName:"p",href:"/next/troubleshooting#fetch-the-log-from-fleet-controller"},(0,o.kt)("inlineCode",{parentName:"a"},"fleet-controller")," logs")," and the ",(0,o.kt)("a",{parentName:"p",href:"/next/troubleshooting#fetch-the-log-from-the-fleet-agent"},(0,o.kt)("inlineCode",{parentName:"a"},"fleet-agent")," logs"),"."),(0,o.kt)("h3",{id:"check-errors-about-watching-or-checking-out-the-gitrepo-or-about-the-downloaded-helm-repo-in-fleetyaml"},"Check errors about watching or checking out the ",(0,o.kt)("inlineCode",{parentName:"h3"},"GitRepo"),", or about the downloaded Helm repo in ",(0,o.kt)("inlineCode",{parentName:"h3"},"fleet.yaml"),"?"),(0,o.kt)("p",null,"Check the ",(0,o.kt)("inlineCode",{parentName:"p"},"gitjob-controller")," logs using the following command with your specific ",(0,o.kt)("inlineCode",{parentName:"p"},"gitjob")," pod name filled in:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"$ kubectl logs -f $gitjob-pod-name -n cattle-fleet-system\n")),(0,o.kt)("p",null,"Note that there are two containers inside the pod: the ",(0,o.kt)("inlineCode",{parentName:"p"},"step-git-source")," container that clones the git repo, and the ",(0,o.kt)("inlineCode",{parentName:"p"},"fleet")," container that applies bundles based on the git repo. "),(0,o.kt)("p",null,"The pods will usually have images named ",(0,o.kt)("inlineCode",{parentName:"p"},"rancher/tekton-utils")," with the ",(0,o.kt)("inlineCode",{parentName:"p"},"gitRepo")," name as a prefix. Check the logs for these Kubernetes job pods in the local management cluster as follows, filling in your specific ",(0,o.kt)("inlineCode",{parentName:"p"},"gitRepoName")," pod name and namespace:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"$ kubectl logs -f $gitRepoName-pod-name -n namespace\n")),(0,o.kt)("h3",{id:"check-the-status-of-the-fleet-controller"},"Check the status of the ",(0,o.kt)("inlineCode",{parentName:"h3"},"fleet-controller"),"?"),(0,o.kt)("p",null,"You can check the status of the ",(0,o.kt)("inlineCode",{parentName:"p"},"fleet-controller")," pods by running the commands below:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"kubectl -n cattle-fleet-system logs -l app=fleet-controller\nkubectl -n cattle-fleet-system get pods -l app=fleet-controller\n")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"NAME                                READY   STATUS    RESTARTS   AGE\nfleet-controller-64f49d756b-n57wq   1/1     Running   0          3m21s\n")),(0,o.kt)("h3",{id:"migrate-the-local-cluster-to-the-fleet-default-cluster"},"Migrate the local cluster to the Fleet default cluster?"),(0,o.kt)("p",null,"For users who want to deploy to the local cluster as well, they may move the cluster from ",(0,o.kt)("inlineCode",{parentName:"p"},"fleet-local")," to ",(0,o.kt)("inlineCode",{parentName:"p"},"fleet-default")," in the Rancher UI as follows:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"To get to Fleet in Rancher, click \u2630 > Continuous Delivery."),(0,o.kt)("li",{parentName:"ul"},"Under the ",(0,o.kt)("strong",{parentName:"li"},"Clusters")," menu, select the ",(0,o.kt)("strong",{parentName:"li"},"local")," cluster by checking the box to the left."),(0,o.kt)("li",{parentName:"ul"},"Select ",(0,o.kt)("strong",{parentName:"li"},"Assign to")," from the tabs above the cluster."),(0,o.kt)("li",{parentName:"ul"},"Select ",(0,o.kt)("strong",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"strong"},"fleet-default"))," from the ",(0,o.kt)("strong",{parentName:"li"},"Assign Cluster To")," dropdown.")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Result"),": The cluster will be migrated to ",(0,o.kt)("inlineCode",{parentName:"p"},"fleet-default"),"."),(0,o.kt)("h3",{id:"enable-debug-logging-for-fleet-controller-and-fleet-agent"},"Enable debug logging for ",(0,o.kt)("inlineCode",{parentName:"h3"},"fleet-controller")," and ",(0,o.kt)("inlineCode",{parentName:"h3"},"fleet-agent"),"?"),(0,o.kt)("p",null,"Available in Rancher v2.6.3 (Fleet v0.3.8), the ability to enable debug logging has been added."),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Go to the ",(0,o.kt)("strong",{parentName:"li"},"Dashboard"),", then click on the ",(0,o.kt)("strong",{parentName:"li"},"local cluster")," in the left navigation menu "),(0,o.kt)("li",{parentName:"ul"},"Select ",(0,o.kt)("strong",{parentName:"li"},"Apps & Marketplace"),", then ",(0,o.kt)("strong",{parentName:"li"},"Installed Apps")," from the dropdown "),(0,o.kt)("li",{parentName:"ul"},"From there, you will upgrade the Fleet chart with the value ",(0,o.kt)("inlineCode",{parentName:"li"},"debug=true"),". You can also set ",(0,o.kt)("inlineCode",{parentName:"li"},"debugLevel=5")," if desired.")),(0,o.kt)("h2",{id:"additional-solutions-for-other-fleet-issues"},(0,o.kt)("strong",{parentName:"h2"},"Additional Solutions for Other Fleet Issues")),(0,o.kt)("h3",{id:"naming-conventions-for-crds"},"Naming conventions for CRDs"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"For CRD terms like ",(0,o.kt)("inlineCode",{parentName:"p"},"clusters")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"gitrepos"),", you must reference the full CRD name. For example, the cluster CRD's complete name is ",(0,o.kt)("inlineCode",{parentName:"p"},"cluster.fleet.cattle.io"),", and the gitrepo CRD's complete name is ",(0,o.kt)("inlineCode",{parentName:"p"},"gitrepo.fleet.cattle.io"),".")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"p"},"Bundles"),", which are created from the ",(0,o.kt)("inlineCode",{parentName:"p"},"GitRepo"),", follow the pattern ",(0,o.kt)("inlineCode",{parentName:"p"},"$gitrepoName-$path")," in the same workspace/namespace where the ",(0,o.kt)("inlineCode",{parentName:"p"},"GitRepo")," was created. Note that ",(0,o.kt)("inlineCode",{parentName:"p"},"$path")," is the path directory in the git repository that contains the ",(0,o.kt)("inlineCode",{parentName:"p"},"bundle")," (",(0,o.kt)("inlineCode",{parentName:"p"},"fleet.yaml"),").")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"p"},"BundleDeployments"),", which are created from the ",(0,o.kt)("inlineCode",{parentName:"p"},"bundle"),", follow the pattern ",(0,o.kt)("inlineCode",{parentName:"p"},"$bundleName-$clusterName")," in the namespace ",(0,o.kt)("inlineCode",{parentName:"p"},"clusters-$workspace-$cluster-$generateHash"),". Note that ",(0,o.kt)("inlineCode",{parentName:"p"},"$clusterName")," is the cluster to which the bundle will be deployed."))),(0,o.kt)("h3",{id:"http-secrets-in-github"},"HTTP secrets in Github"),(0,o.kt)("p",null,"When testing Fleet with private git repositories, you will notice that HTTP secrets are no longer supported in Github. To work around this issue, follow these steps:"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Create a ",(0,o.kt)("a",{parentName:"li",href:"https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token"},"personal access token")," in Github."),(0,o.kt)("li",{parentName:"ol"},"In Rancher, create an HTTP ",(0,o.kt)("a",{parentName:"li",href:"https://rancher.com/docs/rancher/v2.6/en/k8s-in-rancher/secrets/"},"secret")," with your Github username."),(0,o.kt)("li",{parentName:"ol"},"Use your token as the secret.")),(0,o.kt)("h3",{id:"fleet-fails-with-bad-response-code-403"},"Fleet fails with bad response code: 403"),(0,o.kt)("p",null,"If your GitJob returns the error below, the problem may be that Fleet cannot access the Helm repo you specified in your ",(0,o.kt)("a",{parentName:"p",href:"/next/gitrepo-structure"},(0,o.kt)("inlineCode",{parentName:"a"},"fleet.yaml")),":"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'time="2021-11-04T09:21:24Z" level=fatal msg="bad response code: 403"\n')),(0,o.kt)("p",null,"Perform the following steps to assess:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Check that your repo is accessible from your dev machine, and that you can download the Helm chart successfully"),(0,o.kt)("li",{parentName:"ul"},"Check that your credentials for the git repo are valid")),(0,o.kt)("h3",{id:"helm-chart-repo-certificate-signed-by-unknown-authority"},"Helm chart repo: certificate signed by unknown authority"),(0,o.kt)("p",null,"If your GitJob returns the error below, you may have added the wrong certificate chain:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'time="2021-11-11T05:55:08Z" level=fatal msg="Get \\"https://helm.intra/virtual-helm/index.yaml\\": x509: certificate signed by unknown authority" \n')),(0,o.kt)("p",null,"Please verify your certificate with the following command:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"context=playground-local\nkubectl get secret -n fleet-default helm-repo -o jsonpath=\"{['data']['cacerts']}\" --context $context | base64 -d | openssl x509 -text -noout\nCertificate:\n    Data:\n        Version: 3 (0x2)\n        Serial Number:\n            7a:1e:df:79:5f:b0:e0:be:49:de:11:5e:d9:9c:a9:71\n        Signature Algorithm: sha512WithRSAEncryption\n        Issuer: C = CH, O = MY COMPANY, CN = NOP Root CA G3\n...\n\n")),(0,o.kt)("h3",{id:"fleet-deployment-stuck-in-modified-state"},"Fleet deployment stuck in modified state"),(0,o.kt)("p",null,'When you deploy bundles to Fleet, some of the components are modified, and this causes the "modified" flag in the Fleet environment.'),(0,o.kt)("p",null,"To ignore the modified flag for the differences between the Helm install generated by ",(0,o.kt)("inlineCode",{parentName:"p"},"fleet.yaml")," and the resource in your cluster, add a ",(0,o.kt)("inlineCode",{parentName:"p"},"diff.comparePatches")," to the ",(0,o.kt)("inlineCode",{parentName:"p"},"fleet.yaml")," for your Deployment, as shown in this example:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yaml"},'defaultNamespace: <namespace name> \nhelm:  \n  releaseName: <release name>  \n  repo: <repo name> \n  chart: <chart name>\ndiff:  \n  comparePatches:  \n  - apiVersion: apps/v1\n    kind: Deployment\n    operations:\n    - {"op":"remove", "path":"/spec/template/spec/hostNetwork"}\n    - {"op":"remove", "path":"/spec/template/spec/nodeSelector"}\n    jsonPointers: # jsonPointers allows to ignore diffs at certain json path\n    - "/spec/template/spec/priorityClassName"\n    - "/spec/template/spec/tolerations" \n')),(0,o.kt)("p",null,"To determine which operations should be removed, observe the logs from ",(0,o.kt)("inlineCode",{parentName:"p"},"fleet-agent")," on the target cluster. You should see entries similar to the following:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-text"},'level=error msg="bundle monitoring-monitoring: deployment.apps monitoring/monitoring-monitoring-kube-state-metrics modified {\\"spec\\":{\\"template\\":{\\"spec\\":{\\"hostNetwork\\":false}}}}"\n')),(0,o.kt)("p",null,"Based on the above log, you can add the following entry to remove the operation:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json"},'{"op":"remove", "path":"/spec/template/spec/hostNetwork"}\n')),(0,o.kt)("h3",{id:"gitrepo-or-bundle-stuck-in-modified-state"},(0,o.kt)("inlineCode",{parentName:"h3"},"GitRepo")," or ",(0,o.kt)("inlineCode",{parentName:"h3"},"Bundle")," stuck in modified state"),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Modified")," means that there is a mismatch between the actual state and the desired state, the source of truth, which lives in the git repository."),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Check the ",(0,o.kt)("a",{parentName:"p",href:"/next/bundle-diffs"},"bundle diffs documentation")," for more information. ")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"You can also force update the ",(0,o.kt)("inlineCode",{parentName:"p"},"gitrepo")," to perform a manual resync. Select ",(0,o.kt)("strong",{parentName:"p"},"GitRepo")," on the left navigation bar, then select ",(0,o.kt)("strong",{parentName:"p"},"Force Update"),"."))),(0,o.kt)("h3",{id:"bundle-has-a-horizontal-pod-autoscaler-hpa-in-modified-state"},"Bundle has a Horizontal Pod Autoscaler (HPA) in modified state"),(0,o.kt)("p",null,"For bundles with an HPA, the expected state is ",(0,o.kt)("inlineCode",{parentName:"p"},"Modified"),", as the bundle contains fields that differ from the state of the Bundle at deployment - usually ",(0,o.kt)("inlineCode",{parentName:"p"},"ReplicaSet"),"."),(0,o.kt)("p",null,"You must define a patch in the ",(0,o.kt)("inlineCode",{parentName:"p"},"fleet.yaml")," to ignore this field according to ",(0,o.kt)("a",{parentName:"p",href:"#gitrepo-or-bundle-stuck-in-modified-state"},(0,o.kt)("inlineCode",{parentName:"a"},"GitRepo")," or ",(0,o.kt)("inlineCode",{parentName:"a"},"Bundle")," stuck in modified state"),"."),(0,o.kt)("p",null,"Here is an example of such a patch for the deployment ",(0,o.kt)("inlineCode",{parentName:"p"},"nginx")," in namespace ",(0,o.kt)("inlineCode",{parentName:"p"},"default"),":"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yaml"},'diff:\n  comparePatches:\n  - apiVersion: apps/v1\n    kind: Deployment\n    name: nginx\n    namespace: default\n    operations:\n    - {"op": "remove", "path": "/spec/replicas"}\n')),(0,o.kt)("h3",{id:"what-if-the-cluster-is-unavailable-or-is-in-a-waitcheckin-state"},"What if the cluster is unavailable, or is in a ",(0,o.kt)("inlineCode",{parentName:"h3"},"WaitCheckIn")," state?"),(0,o.kt)("p",null,"You will need to re-import and restart the registration process: Select ",(0,o.kt)("strong",{parentName:"p"},"Cluster")," on the left navigation bar, then select ",(0,o.kt)("strong",{parentName:"p"},"Force Update")),(0,o.kt)("admonition",{type:"caution"},(0,o.kt)("p",{parentName:"admonition"},(0,o.kt)("strong",{parentName:"p"},"WaitCheckIn status for Rancher v2.5"),":\nThe cluster will show in ",(0,o.kt)("inlineCode",{parentName:"p"},"WaitCheckIn")," status because the ",(0,o.kt)("inlineCode",{parentName:"p"},"fleet-controller")," is attempting to communicate with Fleet using the Rancher service IP. However, Fleet must communicate directly with Rancher via the Kubernetes service DNS using service discovery, not through the proxy. For more, see the ",(0,o.kt)("a",{parentName:"p",href:"https://rancher.com/docs/rancher/v2.5/en/installation/other-installation-methods/behind-proxy/install-rancher/#install-rancher"},"Rancher docs"),".")),(0,o.kt)("h3",{id:"gitrepo-complains-with-gzip-invalid-header"},"GitRepo complains with ",(0,o.kt)("inlineCode",{parentName:"h3"},"gzip: invalid header")),(0,o.kt)("p",null,"When you see an error like the one below ..."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"Error opening a gzip reader for /tmp/getter154967024/archive: gzip: invalid header\n")),(0,o.kt)("p",null,"... the content of the helm chart is incorrect. Manually download the chart to your local machine and check the content."),(0,o.kt)("h3",{id:"agent-is-no-longer-registered"},"Agent is no longer registered"),(0,o.kt)("p",null,"You can force a redeployment of an agent for a given cluster by setting ",(0,o.kt)("inlineCode",{parentName:"p"},"redeployAgentGeneration"),"."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},'kubectl patch clusters.fleet.cattle.io -n fleet-local local --type=json -p \'[{"op": "add", "path": "/spec/redeployAgentGeneration", "value": -1}]\'\n')))}d.isMDXComponent=!0}}]);