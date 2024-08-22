"use strict";(self.webpackChunkfleet_docs=self.webpackChunkfleet_docs||[]).push([[5400],{7858:(e,t,l)=>{l.d(t,{e:()=>s});const s={"v0.5":{fleet:"https://github.com/rancher/fleet/releases/download/v0.5.3/fleet-0.5.3.tgz",fleetAgent:"https://github.com/rancher/fleet/releases/download/v0.5.3/fleet-agent-0.5.3.tgz",fleetCRD:"https://github.com/rancher/fleet/releases/download/v0.5.3/fleet-crd-0.5.3.tgz"},"v0.6":{fleet:"https://github.com/rancher/fleet/releases/download/v0.6.0/fleet-0.6.0.tgz",fleetAgent:"https://github.com/rancher/fleet/releases/download/v0.6.0/fleet-agent-0.6.0.tgz",fleetCRD:"https://github.com/rancher/fleet/releases/download/v0.6.0/fleet-crd-0.6.0.tgz"},next:{kubernetes:"1.20.5"}}},5290:(e,t,l)=>{l.r(t),l.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>p,frontMatter:()=>i,metadata:()=>u,toc:()=>d});var s=l(8168),n=(l(6540),l(5680)),a=l(7858),r=l(2355);const i={},o="Single Cluster Install",u={unversionedId:"single-cluster-install",id:"version-0.5/single-cluster-install",title:"Single Cluster Install",description:"In this use case you have only one cluster.  The cluster will run both the Fleet",source:"@site/versioned_docs/version-0.5/single-cluster-install.md",sourceDirName:".",slug:"/single-cluster-install",permalink:"/0.5/single-cluster-install",draft:!1,editUrl:"https://github.com/rancher/fleet-docs/edit/main/versioned_docs/version-0.5/single-cluster-install.md",tags:[],version:"0.5",lastUpdatedAt:1724318679,formattedLastUpdatedAt:"Aug 22, 2024",frontMatter:{},sidebar:"docs",previous:{title:"Installation",permalink:"/0.5/installation"},next:{title:"Multi Cluster Install",permalink:"/0.5/multi-cluster-install"}},c={},d=[{value:"Prerequisites",id:"prerequisites",level:2},{value:"Helm 3",id:"helm-3",level:3},{value:"Kubernetes",id:"kubernetes",level:3},{value:"Install",id:"install",level:2}],g={toc:d},h="wrapper";function p(e){let{components:t,...i}=e;return(0,n.yg)(h,(0,s.A)({},g,i,{components:t,mdxType:"MDXLayout"}),(0,n.yg)("h1",{id:"single-cluster-install"},"Single Cluster Install"),(0,n.yg)("p",null,(0,n.yg)("img",{src:l(2614).A,width:"520",height:"279"})),(0,n.yg)("p",null,"In this use case you have only one cluster.  The cluster will run both the Fleet\nmanager and the Fleet agent. The cluster will communicate with Git server to\ndeploy resources to this local cluster. This is the simplest setup and very\nuseful for dev/test and small scale setups.  This use case is supported as a valid\nuse case for production."),(0,n.yg)("h2",{id:"prerequisites"},"Prerequisites"),(0,n.yg)("h3",{id:"helm-3"},"Helm 3"),(0,n.yg)("p",null,"Fleet is distributed as a Helm chart. Helm 3 is a CLI, has no server side component, and is\nfairly straight forward. To install the Helm 3 CLI follow the\n",(0,n.yg)("a",{parentName:"p",href:"https://helm.sh/docs/intro/install/"},"official install instructions"),". The TL;DR is"),(0,n.yg)("p",null,"macOS"),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre"},"brew install helm\n")),(0,n.yg)("p",null,"Windows"),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre"},"choco install kubernetes-helm\n")),(0,n.yg)("h3",{id:"kubernetes"},"Kubernetes"),(0,n.yg)("p",null,"Fleet is a controller running on a Kubernetes cluster so an existing cluster is required. For the\nsingle cluster use case you will install Fleet to the cluster which you intend to manage with GitOps.\nAny Kubernetes community supported version of Kubernetes will work, in practice this means 1.15 or greater."),(0,n.yg)("h2",{id:"install"},"Install"),(0,n.yg)("p",null,"Install the following two Helm charts."),(0,n.yg)("p",null,"First install the Fleet CustomResourcesDefintions."),(0,n.yg)(r.A,{language:"bash",mdxType:"CodeBlock"},"helm -n cattle-fleet-system install --create-namespace --wait \\\n    fleet-crd"," ",a.e["v0.5"].fleetCRD),(0,n.yg)("p",null,"Second install the Fleet controllers."),(0,n.yg)(r.A,{language:"bash",mdxType:"CodeBlock"},"helm -n cattle-fleet-system install --create-namespace --wait \\\n    fleet"," ",a.e["v0.5"].fleet),(0,n.yg)("p",null,"Fleet should be ready to use now for single cluster. You can check the status of the Fleet controller pods by\nrunning the below commands."),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-shell"},"kubectl -n cattle-fleet-system logs -l app=fleet-controller\nkubectl -n cattle-fleet-system get pods -l app=fleet-controller\n")),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre"},"NAME                                READY   STATUS    RESTARTS   AGE\nfleet-controller-64f49d756b-n57wq   1/1     Running   0          3m21s\n")),(0,n.yg)("p",null,"You can now ",(0,n.yg)("a",{parentName:"p",href:"/0.5/gitrepo-add"},"register some git repos")," in the ",(0,n.yg)("inlineCode",{parentName:"p"},"fleet-local")," namespace to start deploying Kubernetes resources."))}p.isMDXComponent=!0},2614:(e,t,l)=>{l.d(t,{A:()=>s});const s=l.p+"assets/images/single-cluster-72ee1a61547953f123dd741c02cd2017.png"}}]);