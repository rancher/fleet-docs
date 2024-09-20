"use strict";(self.webpackChunkfleet_docs=self.webpackChunkfleet_docs||[]).push([[9450],{5680:(e,a,t)=>{t.d(a,{xA:()=>c,yg:()=>g});var n=t(6540);function s(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}function l(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);a&&(n=n.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),t.push.apply(t,n)}return t}function r(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?l(Object(t),!0).forEach((function(a){s(e,a,t[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))}))}return e}function i(e,a){if(null==e)return{};var t,n,s=function(e,a){if(null==e)return{};var t,n,s={},l=Object.keys(e);for(n=0;n<l.length;n++)t=l[n],a.indexOf(t)>=0||(s[t]=e[t]);return s}(e,a);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)t=l[n],a.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(s[t]=e[t])}return s}var o=n.createContext({}),p=function(e){var a=n.useContext(o),t=a;return e&&(t="function"==typeof e?e(a):r(r({},a),e)),t},c=function(e){var a=p(e.components);return n.createElement(o.Provider,{value:a},e.children)},m="mdxType",d={inlineCode:"code",wrapper:function(e){var a=e.children;return n.createElement(n.Fragment,{},a)}},u=n.forwardRef((function(e,a){var t=e.components,s=e.mdxType,l=e.originalType,o=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),m=p(t),u=s,g=m["".concat(o,".").concat(u)]||m[u]||d[u]||l;return t?n.createElement(g,r(r({ref:a},c),{},{components:t})):n.createElement(g,r({ref:a},c))}));function g(e,a){var t=arguments,s=a&&a.mdxType;if("string"==typeof e||s){var l=t.length,r=new Array(l);r[0]=u;var i={};for(var o in a)hasOwnProperty.call(a,o)&&(i[o]=a[o]);i.originalType=e,i[m]="string"==typeof e?e:s,r[1]=i;for(var p=2;p<l;p++)r[p]=t[p];return n.createElement.apply(null,r)}return n.createElement.apply(null,t)}u.displayName="MDXCreateElement"},1428:(e,a,t)=>{t.r(a),t.d(a,{assets:()=>o,contentTitle:()=>r,default:()=>d,frontMatter:()=>l,metadata:()=>i,toc:()=>p});var n=t(8168),s=(t(6540),t(5680));const l={toc_max_heading_level:4},r="Namespaces",i={unversionedId:"namespaces",id:"namespaces",title:"Namespaces",description:"Workload Namespaces",source:"@site/docs/namespaces.md",sourceDirName:".",slug:"/namespaces",permalink:"/namespaces",draft:!1,editUrl:"https://github.com/rancher/fleet-docs/edit/main/docs/namespaces.md",tags:[],version:"current",lastUpdatedAt:1726840499,formattedLastUpdatedAt:"Sep 20, 2024",frontMatter:{toc_max_heading_level:4},sidebar:"docs",previous:{title:"Git Repository Contents",permalink:"/gitrepo-content"},next:{title:"Custom Resources During Deployment",permalink:"/resources-during-deployment"}},o={},p=[{value:"Workload Namespaces",id:"workload-namespaces",level:2},{value:"Namespace Creation Behavior in Bundles",id:"namespace-creation-behavior-in-bundles",level:3},{value:"Configuring Workload Namespaces",id:"configuring-workload-namespaces",level:3},{value:"Cross Namespace Deployments",id:"cross-namespace-deployments",level:3},{value:"Restricting GitRepos",id:"restricting-gitrepos",level:3},{value:"Allowed Target Namespaces",id:"allowed-target-namespaces",level:4},{value:"Fleet Namespaces",id:"fleet-namespaces",level:2},{value:"GitRepos, Bundles, Clusters, ClusterGroups",id:"gitrepos-bundles-clusters-clustergroups",level:3},{value:"Internal Namespaces",id:"internal-namespaces",level:3},{value:"Cluster Registration Namespace: fleet-local",id:"cluster-registration-namespace-fleet-local",level:4},{value:"System Namespace: cattle-fleet-system",id:"system-namespace-cattle-fleet-system",level:4},{value:"System Registration Namespace: cattle-fleet-clusters-system",id:"system-registration-namespace-cattle-fleet-clusters-system",level:4},{value:"Cluster Namespaces",id:"cluster-namespaces",level:4}],c={toc:p},m="wrapper";function d(e){let{components:a,...l}=e;return(0,s.yg)(m,(0,n.A)({},c,l,{components:a,mdxType:"MDXLayout"}),(0,s.yg)("h1",{id:"namespaces"},"Namespaces"),(0,s.yg)("h2",{id:"workload-namespaces"},"Workload Namespaces"),(0,s.yg)("h3",{id:"namespace-creation-behavior-in-bundles"},"Namespace Creation Behavior in Bundles"),(0,s.yg)("p",null,"When deploying a Fleet bundle, the specified namespace will automatically be\ncreated if it does not already exist."),(0,s.yg)("h3",{id:"configuring-workload-namespaces"},"Configuring Workload Namespaces"),(0,s.yg)("p",null,"When configuring workload namespaces, it is important to be aware that certain\noptions are designed to override the values of other options or namespace\ndefinitions in workload resources. In some cases, setting namespaces using some\noptions may result in errors if the resources to be deployed contain\nnon-namespaced resources. To get a better understanding of how these options\ninteract, refer to the diagram below. For more details on a specific option,\nplease refer to the ",(0,s.yg)("a",{parentName:"p",href:"/ref-gitrepo"},"GitRepo")," or\n",(0,s.yg)("a",{parentName:"p",href:"/ref-fleet-yaml"},"fleet.yaml")," reference."),(0,s.yg)("p",null,(0,s.yg)("img",{alt:"Configuring Workload Namespaces",src:t(6580).A,width:"408",height:"1046"})),(0,s.yg)("h3",{id:"cross-namespace-deployments"},"Cross Namespace Deployments"),(0,s.yg)("p",null,"It is possible to create a GitRepo that will deploy across namespaces. The\nprimary purpose of this is so that a central privileged team can manage common\nconfiguration for many clusters that are managed by different teams. The way\nthis is accomplished is by creating a ",(0,s.yg)("inlineCode",{parentName:"p"},"BundleNamespaceMapping")," resource in a\ncluster."),(0,s.yg)("p",null,"If you are creating a ",(0,s.yg)("inlineCode",{parentName:"p"},"BundleNamespaceMapping")," resource it is best to do it in a\nnamespace that only contains ",(0,s.yg)("inlineCode",{parentName:"p"},"GitRepos")," and no ",(0,s.yg)("inlineCode",{parentName:"p"},"Clusters"),". It seems to get\nconfusing if you have Clusters in the same repo as the cross namespace\n",(0,s.yg)("inlineCode",{parentName:"p"},"GitRepos")," will still always be evaluated against the current namespace. So if\nyou have clusters in the same namespace you may wish to make them canary\nclusters."),(0,s.yg)("p",null,"A ",(0,s.yg)("inlineCode",{parentName:"p"},"BundleNamespaceMapping")," has only two fields. Which are as below"),(0,s.yg)("pre",null,(0,s.yg)("code",{parentName:"pre",className:"language-yaml"},"kind: BundleNamespaceMapping\napiVersion: fleet.cattle.io/v1alpha1\nmetadata:\n  name: not-important\n  namespace: typically-unique\n\n# Bundles to match by label.  The labels are defined in the fleet.yaml\n# labels field or from the GitRepo metadata.labels field\nbundleSelector:\n  matchLabels:\n    foo: bar\n\n# Namespaces to match by label\nnamespaceSelector:\n  matchLabels:\n    foo: bar\n")),(0,s.yg)("p",null,"If the ",(0,s.yg)("inlineCode",{parentName:"p"},"BundleNamespaceMappings")," ",(0,s.yg)("inlineCode",{parentName:"p"},"bundleSelector")," field matches a ",(0,s.yg)("inlineCode",{parentName:"p"},"Bundles"),"\nlabels then that ",(0,s.yg)("inlineCode",{parentName:"p"},"Bundle")," target criteria will be evaluated against all clusters\nin all namespaces that match ",(0,s.yg)("inlineCode",{parentName:"p"},"namespaceSelector"),". One can specify labels for the\ncreated bundles from git by putting labels in the ",(0,s.yg)("inlineCode",{parentName:"p"},"fleet.yaml")," file or on the\n",(0,s.yg)("inlineCode",{parentName:"p"},"metadata.labels")," field on the ",(0,s.yg)("inlineCode",{parentName:"p"},"GitRepo"),"."),(0,s.yg)("h3",{id:"restricting-gitrepos"},"Restricting GitRepos"),(0,s.yg)("p",null,"A namespace can contain multiple ",(0,s.yg)("inlineCode",{parentName:"p"},"GitRepoRestriction")," resources. All ",(0,s.yg)("inlineCode",{parentName:"p"},"GitRepos"),"\ncreated in that namespace will be checked against the list of restrictions. If a\n",(0,s.yg)("inlineCode",{parentName:"p"},"GitRepo")," violates one of the constraints its ",(0,s.yg)("inlineCode",{parentName:"p"},"BundleDeployment")," will be in an\nerror state and won't be deployed."),(0,s.yg)("p",null,"This can also be used to set the defaults for GitRepo's ",(0,s.yg)("inlineCode",{parentName:"p"},"serviceAccount")," and\n",(0,s.yg)("inlineCode",{parentName:"p"},"clientSecretName")," fields."),(0,s.yg)("pre",null,(0,s.yg)("code",{parentName:"pre",className:"language-yaml"},'kind: GitRepoRestriction\napiVersion: fleet.cattle.io/v1alpha1\nmetadata:\n  name: restriction\n  namespace: typically-unique\nallowedClientSecretNames: []\nallowedRepoPatterns: []\nallowedServiceAccounts: []\nallowedTargetNamespaces: []\ndefaultClientSecretName: ""\ndefaultServiceAccount: ""\n')),(0,s.yg)("h4",{id:"allowed-target-namespaces"},"Allowed Target Namespaces"),(0,s.yg)("p",null,"This can be used to limit a deployment to a set of namespaces on a downstream\ncluster. If an allowedTargetNamespaces restriction is present, all ",(0,s.yg)("inlineCode",{parentName:"p"},"GitRepos"),"\nmust specify a ",(0,s.yg)("inlineCode",{parentName:"p"},"targetNamespace")," and the specified namespace must be in the\nallow list. This also prevents the creation of cluster wide resources."),(0,s.yg)("h2",{id:"fleet-namespaces"},"Fleet Namespaces"),(0,s.yg)("p",null,"All types in the Fleet manager are namespaced. The namespaces of a custom\nresource, e.g. GitRepo, does not influence the namespace of deployed resources."),(0,s.yg)("p",null,"Understanding how namespaces are used in the Fleet manager\nis important to understand the security model and how one can use Fleet in a\nmulti-tenant fashion."),(0,s.yg)("p",null,(0,s.yg)("img",{alt:"Namespace",src:t(2128).A,width:"1437",height:"1731"})),(0,s.yg)("h3",{id:"gitrepos-bundles-clusters-clustergroups"},"GitRepos, Bundles, Clusters, ClusterGroups"),(0,s.yg)("p",null,"All selectors for ",(0,s.yg)("inlineCode",{parentName:"p"},"GitRepo")," targets will be evaluated against the ",(0,s.yg)("inlineCode",{parentName:"p"},"Clusters"),"\nand ",(0,s.yg)("inlineCode",{parentName:"p"},"ClusterGroups")," in the same namespaces. This means that if you give\n",(0,s.yg)("inlineCode",{parentName:"p"},"create")," or ",(0,s.yg)("inlineCode",{parentName:"p"},"update")," privileges to a ",(0,s.yg)("inlineCode",{parentName:"p"},"GitRepo")," type in a namespace, that end\nuser can modify the selector to match any cluster in that namespace. This means\nin practice if you want to have two teams self manage their own ",(0,s.yg)("inlineCode",{parentName:"p"},"GitRepo"),"\nregistrations but they should not be able to target each others clusters, they\nshould be in different namespaces."),(0,s.yg)("p",null,"The cluster registration namespace, called 'workspace' in Rancher, contains the ",(0,s.yg)("inlineCode",{parentName:"p"},"Cluster")," and the\n",(0,s.yg)("inlineCode",{parentName:"p"},"ClusterRegistration")," resources, as well as any ",(0,s.yg)("inlineCode",{parentName:"p"},"GitRepos")," and ",(0,s.yg)("inlineCode",{parentName:"p"},"Bundles"),"."),(0,s.yg)("p",null,"Rancher will create two Fleet workspaces: ",(0,s.yg)("strong",{parentName:"p"},"fleet-default")," and\n",(0,s.yg)("strong",{parentName:"p"},"fleet-local"),"."),(0,s.yg)("ul",null,(0,s.yg)("li",{parentName:"ul"},(0,s.yg)("inlineCode",{parentName:"li"},"fleet-default")," will contain all the downstream clusters that are already\nregistered through Rancher."),(0,s.yg)("li",{parentName:"ul"},(0,s.yg)("inlineCode",{parentName:"li"},"fleet-local")," will contain the local cluster by default. Access to\n",(0,s.yg)("inlineCode",{parentName:"li"},"fleet-local")," is limited.")),(0,s.yg)("admonition",{title:"important information",type:"warning"},(0,s.yg)("p",{parentName:"admonition"},"Deleting the workspace, cluster registration namespace, will delete all the clusters within that namespace.\nThis will uninstall all deployed bundles, except for the fleet agent, from the deleted clusters.")),(0,s.yg)("p",null,"If you are using Fleet in a ",(0,s.yg)("a",{parentName:"p",href:"/concepts"},"single cluster")," style, the namespace\nwill always be ",(0,s.yg)("strong",{parentName:"p"},"fleet-local"),". Check\n",(0,s.yg)("a",{parentName:"p",href:"https://fleet.rancher.io/namespaces/#fleet-local"},"here")," for more on the\n",(0,s.yg)("inlineCode",{parentName:"p"},"fleet-local")," namespace."),(0,s.yg)("p",null,"For a ",(0,s.yg)("a",{parentName:"p",href:"/concepts"},"multi-cluster")," style, please ensure you use the correct\nrepo that will map to the right target clusters."),(0,s.yg)("h3",{id:"internal-namespaces"},"Internal Namespaces"),(0,s.yg)("h4",{id:"cluster-registration-namespace-fleet-local"},"Cluster Registration Namespace: fleet-local"),(0,s.yg)("p",null,"The ",(0,s.yg)("strong",{parentName:"p"},"fleet-local")," namespace is a special namespace used for the single cluster\nuse case or to bootstrap the configuration of the Fleet manager.\nAccess to the local cluster should be limited to operators."),(0,s.yg)("p",null,"When fleet is installed the ",(0,s.yg)("inlineCode",{parentName:"p"},"fleet-local")," namespace is created along with one\n",(0,s.yg)("inlineCode",{parentName:"p"},"Cluster")," called ",(0,s.yg)("inlineCode",{parentName:"p"},"local")," and one ",(0,s.yg)("inlineCode",{parentName:"p"},"ClusterGroup")," called ",(0,s.yg)("inlineCode",{parentName:"p"},"default"),". If no targets\nare specified on a ",(0,s.yg)("inlineCode",{parentName:"p"},"GitRepo"),", it is by default targeted to the ",(0,s.yg)("inlineCode",{parentName:"p"},"ClusterGroup"),"\nnamed ",(0,s.yg)("inlineCode",{parentName:"p"},"default"),". This means that all ",(0,s.yg)("inlineCode",{parentName:"p"},"GitRepos")," created in ",(0,s.yg)("inlineCode",{parentName:"p"},"fleet-local")," will\nautomatically target the ",(0,s.yg)("inlineCode",{parentName:"p"},"local")," ",(0,s.yg)("inlineCode",{parentName:"p"},"Cluster"),". The ",(0,s.yg)("inlineCode",{parentName:"p"},"local")," ",(0,s.yg)("inlineCode",{parentName:"p"},"Cluster")," refers to the\ncluster the Fleet manager is running on."),(0,s.yg)("h4",{id:"system-namespace-cattle-fleet-system"},"System Namespace: cattle-fleet-system"),(0,s.yg)("p",null,"The Fleet controller and Fleet agent run in this namespace. All service accounts\nreferenced by ",(0,s.yg)("inlineCode",{parentName:"p"},"GitRepos")," are expected to live in this namespace in the\ndownstream cluster."),(0,s.yg)("h4",{id:"system-registration-namespace-cattle-fleet-clusters-system"},"System Registration Namespace: cattle-fleet-clusters-system"),(0,s.yg)("p",null,"This namespace holds secrets for the cluster registration process. It should\ncontain no other resources in it, especially secrets."),(0,s.yg)("h4",{id:"cluster-namespaces"},"Cluster Namespaces"),(0,s.yg)("p",null,"For every cluster that is registered a namespace is created by the Fleet manager\nfor that cluster. These namespaces are named in the form\n",(0,s.yg)("inlineCode",{parentName:"p"},"cluster-${namespace}-${cluster}-${random}"),". The purpose of this namespace is\nthat all ",(0,s.yg)("inlineCode",{parentName:"p"},"BundleDeployments")," for that cluster are put into this namespace and\nthen the downstream cluster is given access to watch and update\n",(0,s.yg)("inlineCode",{parentName:"p"},"BundleDeployments")," in that namespace only."))}d.isMDXComponent=!0},2128:(e,a,t)=>{t.d(a,{A:()=>n});const n=t.p+"assets/images/FleetNamespaces-4e461907ba4d5bbf6b309d125383bdb5.svg"},6580:(e,a,t)=>{t.d(a,{A:()=>n});const n=t.p+"assets/images/FleetWorkloadNamespaces-f336f50d9059b8a8e8a5da8da93a7a4b.png"}}]);