"use strict";(self.webpackChunkfleet_docs=self.webpackChunkfleet_docs||[]).push([[1416],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>m});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),c=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=c(e.components);return a.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,s=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),d=c(n),m=r,h=d["".concat(s,".").concat(m)]||d[m]||u[m]||l;return n?a.createElement(h,o(o({ref:t},p),{},{components:n})):a.createElement(h,o({ref:t},p))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,o=new Array(l);o[0]=d;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i.mdxType="string"==typeof e?e:r,o[1]=i;for(var c=2;c<l;c++)o[c]=n[c];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},5753:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>u,frontMatter:()=>l,metadata:()=>i,toc:()=>c});var a=n(7462),r=(n(7294),n(3905));const l={},o="Create a Bundle Resource",i={unversionedId:"bundle-add",id:"bundle-add",title:"Create a Bundle Resource",description:"Bundles are automatically created by Fleet when a GitRepo is created. In most cases Bundles should not be created",source:"@site/docs/bundle-add.md",sourceDirName:".",slug:"/bundle-add",permalink:"/bundle-add",draft:!1,editUrl:"https://github.com/rancher/fleet-docs/edit/main/docs/bundle-add.md",tags:[],version:"current",lastUpdatedAt:1719574014,formattedLastUpdatedAt:"Jun 28, 2024",frontMatter:{},sidebar:"docs",previous:{title:"Using Image Scan to Update Container Image References",permalink:"/imagescan"},next:{title:"fleet-agent",permalink:"/cli/fleet-agent/"}},s={},c=[{value:"Limitations",id:"limitations",level:2},{value:"Convert a Helm Chart into a Bundle",id:"convert-a-helm-chart-into-a-bundle",level:2}],p={toc:c};function u(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"create-a-bundle-resource"},"Create a Bundle Resource"),(0,r.kt)("p",null,"Bundles are automatically created by Fleet when a ",(0,r.kt)("inlineCode",{parentName:"p"},"GitRepo")," is created. In most cases ",(0,r.kt)("inlineCode",{parentName:"p"},"Bundles")," should not be created\nmanually by the user. If you want to deploy resources from a git repository use a\n",(0,r.kt)("a",{parentName:"p",href:"https://fleet.rancher.io/gitrepo-add"},"GitRepo")," instead."),(0,r.kt)("p",null,"If you want to deploy resources without a git repository follow this guide to create a ",(0,r.kt)("inlineCode",{parentName:"p"},"Bundle"),"."),(0,r.kt)("p",null,"When creating a ",(0,r.kt)("inlineCode",{parentName:"p"},"GitRepo")," Fleet will fetch the resources from a git repository, and add them to a Bundle.\nWhen creating a ",(0,r.kt)("inlineCode",{parentName:"p"},"Bundle")," resources need to be explicitly specified in the ",(0,r.kt)("inlineCode",{parentName:"p"},"Bundle")," Spec.\nResources can be compressed with gz. See ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/rancher/rancher/blob/v2.7.3/pkg/controllers/provisioningv2/managedchart/managedchart.go#L149-L153"},"here"),"\nan example of how Rancher uses compression in go code."),(0,r.kt)("p",null,"If you would like to deploy in downstream clusters, you need to define targets. Targets work similarly to targets in ",(0,r.kt)("inlineCode",{parentName:"p"},"GitRepo"),".\nSee ",(0,r.kt)("a",{parentName:"p",href:"https://fleet.rancher.io/gitrepo-targets#defining-targets"},"Mapping to Downstream Clusters"),"."),(0,r.kt)("p",null,"The following example creates a nginx ",(0,r.kt)("inlineCode",{parentName:"p"},"Deployment")," in the local cluster:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},"kind: Bundle\napiVersion: fleet.cattle.io/v1alpha1\nmetadata:\n  # Any name can be used here\n  name: my-bundle\n  # For single cluster use fleet-local, otherwise use the namespace of\n  # your choosing\n  namespace: fleet-local\nspec:\n  resources:\n  # List of all resources that will be deployed\n  - content: |\n      apiVersion: apps/v1\n      kind: Deployment\n      metadata:\n        name: nginx-deployment\n        labels:\n          app: nginx\n      spec:\n        replicas: 3\n        selector:\n          matchLabels:\n            app: nginx\n        template:\n          metadata:\n            labels:\n              app: nginx\n          spec:\n            containers:\n              - name: nginx\n                image: nginx:1.14.2\n                ports:\n                  - containerPort: 80\n    name: nginx.yaml\n  targets:\n  - clusterName: local\n\n")),(0,r.kt)("h2",{id:"limitations"},"Limitations"),(0,r.kt)("p",null,"Helm options related to downloading the helm chart will be ignored. The helm chart is downloaded by the fleet-cli, which creates the bundles. The bundle has to contain all the resources from the chart. Therefore the bundle will ignore:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"spec.helm.repo")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"spec.helm.charts"))),(0,r.kt)("p",null,"You can't use a ",(0,r.kt)("inlineCode",{parentName:"p"},"fleet.yaml")," in resources, it is only used by the fleet-cli to create bundles."),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"spec.targetRestrictions")," field is not useful, as it is an allow list for targets specified in ",(0,r.kt)("inlineCode",{parentName:"p"},"spec.targets"),". It is not needed, since ",(0,r.kt)("inlineCode",{parentName:"p"},"targets")," are explicitly given in a bundle and an empty ",(0,r.kt)("inlineCode",{parentName:"p"},"targetRestrictions")," defaults to allow."),(0,r.kt)("h2",{id:"convert-a-helm-chart-into-a-bundle"},"Convert a Helm Chart into a Bundle"),(0,r.kt)("p",null,"You can use the Fleet CLI to convert a Helm chart into a bundle."),(0,r.kt)("p",null,'For example, you can download and convert the "external secrets" operator chart like this:'),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"cat > targets.yaml <<EOF\ntargets:\n- clusterSelector: {}\nEOF\n\nmkdir app\ncat > app/fleet.yaml <<EOF\ndefaultNamespace: external-secrets\nhelm:\n  repo: https://charts.external-secrets.io\n  chart: external-secrets\nEOF\n\nfleet apply --compress --targets-file=targets.yaml -n fleet-default -o - external-secrets app > eso-bundle.yaml\n\nkubectl apply -f eso-bundle.yaml\n")),(0,r.kt)("p",null,"Make sure you use a cluster selector in ",(0,r.kt)("inlineCode",{parentName:"p"},"targets.yaml"),", that matches all clusters you want to deploy to."),(0,r.kt)("p",null,"The blog post on ",(0,r.kt)("a",{parentName:"p",href:"https://www.suse.com/c/rancher_blog/fleet-multi-cluster-deployment-with-the-help-of-external-secrets/"},"Fleet: Multi-Cluster Deployment with the Help of External Secrets")," has more information."))}u.isMDXComponent=!0}}]);