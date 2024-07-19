"use strict";(self.webpackChunkfleet_docs=self.webpackChunkfleet_docs||[]).push([[3333],{9365:(e,t,n)=>{n.d(t,{A:()=>i});var a=n(6540),r=n(53);const l={tabItem:"tabItem_Ymn6"};function i(e){let{children:t,hidden:n,className:i}=e;return a.createElement("div",{role:"tabpanel",className:(0,r.A)(l.tabItem,i),hidden:n},t)}},1470:(e,t,n)=>{n.d(t,{A:()=>N});var a=n(8168),r=n(6540),l=n(53),i=n(3104),s=n(6347),o=n(7485),u=n(1682),c=n(9466);function g(e){return function(e){return r.Children.map(e,(e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}(e).map((e=>{let{props:{value:t,label:n,attributes:a,default:r}}=e;return{value:t,label:n,attributes:a,default:r}}))}function d(e){const{values:t,children:n}=e;return(0,r.useMemo)((()=>{const e=t??g(n);return function(e){const t=(0,u.X)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function p(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function m(e){let{queryString:t=!1,groupId:n}=e;const a=(0,s.W6)(),l=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:t,groupId:n});return[(0,o.aZ)(l),(0,r.useCallback)((e=>{if(!l)return;const t=new URLSearchParams(a.location.search);t.set(l,e),a.replace({...a.location,search:t.toString()})}),[l,a])]}function h(e){const{defaultValue:t,queryString:n=!1,groupId:a}=e,l=d(e),[i,s]=(0,r.useState)((()=>function(e){let{defaultValue:t,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!p({value:t,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const a=n.find((e=>e.default))??n[0];if(!a)throw new Error("Unexpected error: 0 tabValues");return a.value}({defaultValue:t,tabValues:l}))),[o,u]=m({queryString:n,groupId:a}),[g,h]=function(e){let{groupId:t}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(t),[a,l]=(0,c.Dv)(n);return[a,(0,r.useCallback)((e=>{n&&l.set(e)}),[n,l])]}({groupId:a}),y=(()=>{const e=o??g;return p({value:e,tabValues:l})?e:null})();(0,r.useLayoutEffect)((()=>{y&&s(y)}),[y]);return{selectedValue:i,selectValue:(0,r.useCallback)((e=>{if(!p({value:e,tabValues:l}))throw new Error(`Can't select invalid tab value=${e}`);s(e),u(e),h(e)}),[u,h,l]),tabValues:l}}var y=n(2303);const f={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};function b(e){let{className:t,block:n,selectedValue:s,selectValue:o,tabValues:u}=e;const c=[],{blockElementScrollPositionUntilNextRender:g}=(0,i.a_)(),d=e=>{const t=e.currentTarget,n=c.indexOf(t),a=u[n].value;a!==s&&(g(t),o(a))},p=e=>{let t=null;switch(e.key){case"Enter":d(e);break;case"ArrowRight":{const n=c.indexOf(e.currentTarget)+1;t=c[n]??c[0];break}case"ArrowLeft":{const n=c.indexOf(e.currentTarget)-1;t=c[n]??c[c.length-1];break}}t?.focus()};return r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,l.A)("tabs",{"tabs--block":n},t)},u.map((e=>{let{value:t,label:n,attributes:i}=e;return r.createElement("li",(0,a.A)({role:"tab",tabIndex:s===t?0:-1,"aria-selected":s===t,key:t,ref:e=>c.push(e),onKeyDown:p,onClick:d},i,{className:(0,l.A)("tabs__item",f.tabItem,i?.className,{"tabs__item--active":s===t})}),n??t)})))}function v(e){let{lazy:t,children:n,selectedValue:a}=e;const l=(Array.isArray(n)?n:[n]).filter(Boolean);if(t){const e=l.find((e=>e.props.value===a));return e?(0,r.cloneElement)(e,{className:"margin-top--md"}):null}return r.createElement("div",{className:"margin-top--md"},l.map(((e,t)=>(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==a}))))}function w(e){const t=h(e);return r.createElement("div",{className:(0,l.A)("tabs-container",f.tabList)},r.createElement(b,(0,a.A)({},e,t)),r.createElement(v,(0,a.A)({},e,t)))}function N(e){const t=(0,y.A)();return r.createElement(w,(0,a.A)({key:String(t)},e))}},7858:(e,t,n)=>{n.d(t,{e:()=>a});const a={"v0.5":{fleet:"https://github.com/rancher/fleet/releases/download/v0.5.3/fleet-0.5.3.tgz",fleetAgent:"https://github.com/rancher/fleet/releases/download/v0.5.3/fleet-agent-0.5.3.tgz",fleetCRD:"https://github.com/rancher/fleet/releases/download/v0.5.3/fleet-crd-0.5.3.tgz"},"v0.6":{fleet:"https://github.com/rancher/fleet/releases/download/v0.6.0/fleet-0.6.0.tgz",fleetAgent:"https://github.com/rancher/fleet/releases/download/v0.6.0/fleet-agent-0.6.0.tgz",fleetCRD:"https://github.com/rancher/fleet/releases/download/v0.6.0/fleet-crd-0.6.0.tgz"},next:{kubernetes:"1.20.5"}}},860:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>g,contentTitle:()=>u,default:()=>h,frontMatter:()=>o,metadata:()=>c,toc:()=>d});var a=n(8168),r=(n(6540),n(5680)),l=(n(7858),n(2355)),i=n(1470),s=n(9365);const o={},u="Register Downstream Clusters",c={unversionedId:"cluster-registration",id:"cluster-registration",title:"Register Downstream Clusters",description:"Overview",source:"@site/docs/cluster-registration.md",sourceDirName:".",slug:"/cluster-registration",permalink:"/cluster-registration",draft:!1,editUrl:"https://github.com/rancher/fleet-docs/edit/main/docs/cluster-registration.md",tags:[],version:"current",lastUpdatedAt:1721380485,formattedLastUpdatedAt:"Jul 19, 2024",frontMatter:{},sidebar:"docs",previous:{title:"Installation Details",permalink:"/installation"},next:{title:"Create Cluster Groups",permalink:"/cluster-group"}},g={},d=[{value:"Overview",id:"overview",level:2},{value:"Agent-Initiated Registration",id:"agent-initiated-registration",level:3},{value:"Manager-Initiated Registration",id:"manager-initiated-registration",level:3},{value:"Agent Initiated",id:"agent-initiated",level:2},{value:"Cluster Registration Token and Client ID",id:"cluster-registration-token-and-client-id",level:3},{value:"Install Agent For a New Cluster",id:"install-agent-for-a-new-cluster",level:3},{value:"Install Agent For a Predefined Cluster",id:"install-agent-for-a-predefined-cluster",level:3},{value:"Create Cluster Registration Tokens",id:"create-cluster-registration-tokens",level:3},{value:"Token TTL",id:"token-ttl",level:4},{value:"Create a new Token",id:"create-a-new-token",level:4},{value:"Obtaining Token Value (Agent values.yaml)",id:"obtaining-token-value-agent-valuesyaml",level:4},{value:"Manager Initiated",id:"manager-initiated",level:2},{value:"Create Kubeconfig Secret",id:"create-kubeconfig-secret",level:3},{value:"Create Cluster Resource",id:"create-cluster-resource",level:3}],p={toc:d},m="wrapper";function h(e){let{components:t,...n}=e;return(0,r.yg)(m,(0,a.A)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.yg)("h1",{id:"register-downstream-clusters"},"Register Downstream Clusters"),(0,r.yg)("h2",{id:"overview"},"Overview"),(0,r.yg)("p",null,"There are two specific styles to registering clusters. These styles will be referred\nto as ",(0,r.yg)("strong",{parentName:"p"},"agent-initiated")," and ",(0,r.yg)("strong",{parentName:"p"},"manager-initiated")," registration. Typically one would\ngo with the agent-initiated registration but there are specific use cases in which\nmanager-initiated is a better workflow."),(0,r.yg)("h3",{id:"agent-initiated-registration"},"Agent-Initiated Registration"),(0,r.yg)("p",null,"Agent-initiated refers to a pattern in which the downstream cluster installs an agent with a\n",(0,r.yg)("a",{parentName:"p",href:"#create-cluster-registration-tokens"},"cluster registration token")," and optionally a client ID. The cluster\nagent will then make a API request to the Fleet manager and initiate the registration process. Using\nthis process the Manager will never make an outbound API request to the downstream clusters and will thus\nnever need to have direct network access. The downstream cluster only needs to make outbound HTTPS\ncalls to the manager."),(0,r.yg)("h3",{id:"manager-initiated-registration"},"Manager-Initiated Registration"),(0,r.yg)("p",null,"Manager-initiated registration is a process in which you register an existing Kubernetes cluster\nwith the Fleet manager and the Fleet manager will make an API call to the downstream cluster to\ndeploy the agent. This style can place additional network access requirements because the Fleet\nmanager must be able to communicate with the downstream cluster API server for the registration process.\nAfter the cluster is registered there is no further need for the manager to contact the downstream\ncluster API.  This style is more compatible if you wish to manage the creation of all your Kubernetes\nclusters through GitOps using something like ",(0,r.yg)("a",{parentName:"p",href:"https://github.com/kubernetes-sigs/cluster-api"},"cluster-api"),"\nor ",(0,r.yg)("a",{parentName:"p",href:"https://github.com/rancher/rancher"},"Rancher"),"."),(0,r.yg)("h2",{id:"agent-initiated"},"Agent Initiated"),(0,r.yg)("p",null,"A downstream cluster is registered by installing an agent via helm and using the ",(0,r.yg)("strong",{parentName:"p"},"cluster registration token")," and optionally a ",(0,r.yg)("strong",{parentName:"p"},"client ID")," or ",(0,r.yg)("strong",{parentName:"p"},"cluster labels"),"."),(0,r.yg)("admonition",{type:"info"},(0,r.yg)("p",{parentName:"admonition"},"It's not necessary to configure the fleet manager for ",(0,r.yg)("a",{parentName:"p",href:"/installation#configuration-for-multi-cluster"},"multi cluster"),", as the downstream agent we install via Helm will connect to the Kubernetes API of the upstream cluster directly."),(0,r.yg)("p",{parentName:"admonition"},"Agent-initiated registration is normally not used with Rancher.")),(0,r.yg)("h3",{id:"cluster-registration-token-and-client-id"},"Cluster Registration Token and Client ID"),(0,r.yg)("p",null,"The ",(0,r.yg)("strong",{parentName:"p"},"cluster registration token")," is a credential that will authorize the downstream cluster agent to be\nable to initiate the registration process. This is required.\nThe ",(0,r.yg)("a",{parentName:"p",href:"/architecture#security"},"cluster registration token")," is manifested as a ",(0,r.yg)("inlineCode",{parentName:"p"},"values.yaml")," file that will be passed to the ",(0,r.yg)("inlineCode",{parentName:"p"},"helm install")," process.\nAlternatively one can pass the token directly to the helm install command via ",(0,r.yg)("inlineCode",{parentName:"p"},'--set token="$token"'),"."),(0,r.yg)("p",null,"There are two styles of registering an agent. You can have the cluster for this agent dynamically created, in which\ncase you will probably want to specify ",(0,r.yg)("strong",{parentName:"p"},"cluster labels")," upon registration.  Or you can have the agent register to a predefined\ncluster in the Fleet manager, in which case you will need a ",(0,r.yg)("strong",{parentName:"p"},"client ID"),".  The former approach is typically the easiest."),(0,r.yg)("h3",{id:"install-agent-for-a-new-cluster"},"Install Agent For a New Cluster"),(0,r.yg)("p",null,"The Fleet agent is installed as a Helm chart. Following are explanations how to determine and set its parameters."),(0,r.yg)("p",null,"First, follow the ",(0,r.yg)("a",{parentName:"p",href:"#create-cluster-registration-tokens"},"cluster registration token instructions")," to obtain the ",(0,r.yg)("inlineCode",{parentName:"p"},"values.yaml")," which contains\nthe registration token to authenticate against the Fleet cluster."),(0,r.yg)("p",null,"Second, optionally you can define labels that will assigned to the newly created cluster upon registration. After\nregistration is completed an agent cannot change the labels of the cluster. To add cluster labels add\n",(0,r.yg)("inlineCode",{parentName:"p"},"--set-string labels.KEY=VALUE")," to the below Helm command. To add the labels ",(0,r.yg)("inlineCode",{parentName:"p"},"foo=bar")," and ",(0,r.yg)("inlineCode",{parentName:"p"},"bar=baz")," then you would\nadd ",(0,r.yg)("inlineCode",{parentName:"p"},"--set-string labels.foo=bar --set-string labels.bar=baz")," to the command line."),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-shell"},'# Leave blank if you do not want any labels\nCLUSTER_LABELS="--set-string labels.example=true --set-string labels.env=dev"\n')),(0,r.yg)("p",null,"Third, set variables with the Fleet cluster's API Server URL and CA, for the downstream cluster to use for connecting."),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-shell"},"API_SERVER_URL=https://...\nAPI_SERVER_CA_DATA=...\n")),(0,r.yg)("p",null,"Value in ",(0,r.yg)("inlineCode",{parentName:"p"},"API_SERVER_CA_DATA")," can be obtained from a ",(0,r.yg)("inlineCode",{parentName:"p"},".kube/config")," file with valid data to connect to the upstream cluster\n(under the ",(0,r.yg)("inlineCode",{parentName:"p"},"certificate-authority-data")," key). Alternatively it can be obtained from within the upstream cluster itself,\nby looking up the default ServiceAccount secret name (typically prefixed with ",(0,r.yg)("inlineCode",{parentName:"p"},"default-token-"),", in the default namespace),\nunder the ",(0,r.yg)("inlineCode",{parentName:"p"},"ca.crt")," key."),(0,r.yg)("admonition",{type:"caution"},(0,r.yg)("p",{parentName:"admonition"},(0,r.yg)("strong",{parentName:"p"},"Use proper namespace and release name"),":\nFor the agent chart the namespace must be ",(0,r.yg)("inlineCode",{parentName:"p"},"cattle-fleet-system")," and the release name ",(0,r.yg)("inlineCode",{parentName:"p"},"fleet-agent"))),(0,r.yg)("admonition",{title:"Kubectl Context",type:"warning"},(0,r.yg)("p",{parentName:"admonition"},(0,r.yg)("strong",{parentName:"p"},"Ensure you are installing to the right cluster"),":\nHelm will use the default context in ",(0,r.yg)("inlineCode",{parentName:"p"},"${HOME}/.kube/config")," to deploy the agent. Use ",(0,r.yg)("inlineCode",{parentName:"p"},"--kubeconfig")," and ",(0,r.yg)("inlineCode",{parentName:"p"},"--kube-context"),"\nto change which cluster Helm is installing to.")),(0,r.yg)("admonition",{title:"Fleet in Rancher",type:"caution"},(0,r.yg)("p",{parentName:"admonition"},"Rancher has separate helm charts for Fleet and uses a different repository.")),(0,r.yg)("p",null,"Add Fleet's Helm repo."),(0,r.yg)(l.A,{language:"bash",mdxType:"CodeBlock"},"helm repo add fleet https://rancher.github.io/fleet-helm-charts/"),(0,r.yg)("p",null,"Finally, install the agent using Helm."),(0,r.yg)(i.A,{mdxType:"Tabs"},(0,r.yg)(s.A,{value:"helm",label:"Install",default:!0,mdxType:"TabItem"},(0,r.yg)(l.A,{language:"bash",mdxType:"CodeBlock"},'helm -n cattle-fleet-system install --create-namespace --wait \\\n    $CLUSTER_LABELS \\\n    --values values.yaml \\\n    --set apiServerCA="$API_SERVER_CA_DATA" \\\n    --set apiServerURL="$API_SERVER_URL" \\\n    fleet-agent fleet/fleet-agent')),(0,r.yg)(s.A,{value:"validate",label:"Validate",mdxType:"TabItem"},"You can check that status of the fleet pods by running the below commands.",(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-shell"},"# Ensure kubectl is pointing to the right cluster\nkubectl -n cattle-fleet-system logs -l app=fleet-agent\nkubectl -n cattle-fleet-system get pods -l app=fleet-agent\n")))),"The agent should now be deployed.",(0,r.yg)("p",null,"Additionally you should see a new cluster registered in the Fleet manager.  Below is an example of checking that a new cluster\nwas registered in the ",(0,r.yg)("inlineCode",{parentName:"p"},"clusters")," ",(0,r.yg)("a",{parentName:"p",href:"/namespaces"},"namespace"),".  Please ensure your ",(0,r.yg)("inlineCode",{parentName:"p"},"${HOME}/.kube/config")," is pointed to the Fleet\nmanager to run this command."),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-shell"},"kubectl -n clusters get clusters.fleet.cattle.io\n")),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre"},"NAME                   BUNDLES-READY   NODES-READY   SAMPLE-NODE             LAST-SEEN              STATUS\ncluster-ab13e54400f1   1/1             1/1           k3d-cluster2-server-0   2020-08-31T19:23:10Z\n")),(0,r.yg)("h3",{id:"install-agent-for-a-predefined-cluster"},"Install Agent For a Predefined Cluster"),(0,r.yg)("p",null,"Client IDs are for the purpose of predefining clusters in the Fleet manager with existing labels and repos targeted to them.\nA client ID is not required and is just one approach to managing clusters.\nThe ",(0,r.yg)("strong",{parentName:"p"},"client ID")," is a unique string that will identify the cluster.\nThis string is user generated and opaque to the Fleet manager and agent.  It is assumed to be sufficiently unique. For security reasons one should not be able to easily guess this value\nas then one cluster could impersonate another.  The client ID is optional and if not specified the UID field of the ",(0,r.yg)("inlineCode",{parentName:"p"},"kube-system")," namespace\nresource will be used as the client ID. Upon registration if the client ID is found on a ",(0,r.yg)("inlineCode",{parentName:"p"},"Cluster")," resource in the Fleet manager it will associate\nthe agent with that ",(0,r.yg)("inlineCode",{parentName:"p"},"Cluster"),".  If no ",(0,r.yg)("inlineCode",{parentName:"p"},"Cluster")," resource is found with that client ID a new ",(0,r.yg)("inlineCode",{parentName:"p"},"Cluster")," resource will be created with the specific\nclient ID."),(0,r.yg)("p",null,"The Fleet agent is installed as a Helm chart. The only parameters to the helm chart installation should be the cluster registration token, which\nis represented by the ",(0,r.yg)("inlineCode",{parentName:"p"},"values.yaml")," file and the client ID.  The client ID is optional."),(0,r.yg)("p",null,"First, create a ",(0,r.yg)("inlineCode",{parentName:"p"},"Cluster")," in the Fleet Manager with the random client ID you have chosen."),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-yaml"},'kind: Cluster\napiVersion: fleet.cattle.io/v1alpha1\nmetadata:\n  name: my-cluster\n  namespace: clusters\nspec:\n  clientID: "really-random"\n')),(0,r.yg)("p",null,"Second, follow the ","[cluster registration token instructions]","((#create-cluster-registration-tokens) to obtain the ",(0,r.yg)("inlineCode",{parentName:"p"},"values.yaml")," file to be used."),(0,r.yg)("p",null,"Third, setup your environment to use the client ID."),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-shell"},'CLUSTER_CLIENT_ID="really-random"\n')),(0,r.yg)("admonition",{type:"note"},(0,r.yg)("p",{parentName:"admonition"},(0,r.yg)("strong",{parentName:"p"},"Use proper namespace and release name"),":\nFor the agent chart the namespace must be ",(0,r.yg)("inlineCode",{parentName:"p"},"cattle-fleet-system")," and the release name ",(0,r.yg)("inlineCode",{parentName:"p"},"fleet-agent"))),(0,r.yg)("admonition",{type:"note"},(0,r.yg)("p",{parentName:"admonition"},(0,r.yg)("strong",{parentName:"p"},"Ensure you are installing to the right cluster"),":\nHelm will use the default context in ",(0,r.yg)("inlineCode",{parentName:"p"},"${HOME}/.kube/config")," to deploy the agent. Use ",(0,r.yg)("inlineCode",{parentName:"p"},"--kubeconfig")," and ",(0,r.yg)("inlineCode",{parentName:"p"},"--kube-context"),"\nto change which cluster Helm is installing to.")),(0,r.yg)("p",null,"Add Fleet's Helm repo."),(0,r.yg)(l.A,{language:"bash",mdxType:"CodeBlock"},"helm repo add fleet https://rancher.github.io/fleet-helm-charts/"),(0,r.yg)("p",null,"Finally, install the agent using Helm."),(0,r.yg)(i.A,{mdxType:"Tabs"},(0,r.yg)(s.A,{value:"helm2",label:"Install",default:!0,mdxType:"TabItem"},(0,r.yg)(l.A,{language:"bash",mdxType:"CodeBlock"},'helm -n cattle-fleet-system install --create-namespace --wait \\\n    --set clientID="$CLUSTER_CLIENT_ID" \\\n    --values values.yaml \\\n    fleet-agent fleet/fleet-agent')),(0,r.yg)(s.A,{value:"validate2",label:"Validate",mdxType:"TabItem"},"You can check that status of the fleet pods by running the below commands.",(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-shell"},"# Ensure kubectl is pointing to the right cluster\nkubectl -n cattle-fleet-system logs -l app=fleet-agent\nkubectl -n cattle-fleet-system get pods -l app=fleet-agent\n")))),"The agent should now be deployed.",(0,r.yg)("p",null,"Additionally you should see a new cluster registered in the Fleet manager.  Below is an example of checking that a new cluster\nwas registered in the ",(0,r.yg)("inlineCode",{parentName:"p"},"clusters")," ",(0,r.yg)("a",{parentName:"p",href:"/namespaces"},"namespace"),".  Please ensure your ",(0,r.yg)("inlineCode",{parentName:"p"},"${HOME}/.kube/config")," is pointed to the Fleet\nmanager to run this command."),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-shell"},"kubectl -n clusters get clusters.fleet.cattle.io\n")),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre"},"NAME                   BUNDLES-READY   NODES-READY   SAMPLE-NODE             LAST-SEEN              STATUS\nmy-cluster             1/1             1/1           k3d-cluster2-server-0   2020-08-31T19:23:10Z\n")),(0,r.yg)("h3",{id:"create-cluster-registration-tokens"},"Create Cluster Registration Tokens"),(0,r.yg)("admonition",{type:"info"},(0,r.yg)("p",{parentName:"admonition"},(0,r.yg)("strong",{parentName:"p"},"Not needed for Manager-initiated registration"),":\nFor manager-initiated registrations the token is managed by the Fleet manager and does\nnot need to be manually created and obtained.")),(0,r.yg)("p",null,"For an agent-initiated registration the downstream cluster must have a ",(0,r.yg)("a",{parentName:"p",href:"/architecture#security"},"cluster registration token"),".\nCluster registration tokens are used to establish a new identity for a cluster. Internally\ncluster registration tokens are managed by creating Kubernetes service accounts that have the\npermissions to create ",(0,r.yg)("inlineCode",{parentName:"p"},"ClusterRegistrationRequests")," within a specific namespace.  Once the\ncluster is registered a new ",(0,r.yg)("inlineCode",{parentName:"p"},"ServiceAccount")," is created for that cluster that is used as\nthe unique identity of the cluster. The agent is designed to forget the cluster registration\ntoken after registration. While the agent will not maintain a reference to the cluster registration\ntoken after a successful registration please note that usually other system bootstrap scripts do."),(0,r.yg)("p",null,"Since the cluster registration token is forgotten, if you need to re-register a cluster you must\ngive the cluster a new registration token."),(0,r.yg)("h4",{id:"token-ttl"},"Token TTL"),(0,r.yg)("p",null,"Cluster registration tokens can be reused by any cluster in a namespace.  The tokens can be given a TTL\nsuch that it will expire after a specific time."),(0,r.yg)("h4",{id:"create-a-new-token"},"Create a new Token"),(0,r.yg)("p",null,"The ",(0,r.yg)("inlineCode",{parentName:"p"},"ClusterRegistationToken")," is a namespaced type and should be created in the same namespace\nin which you will create ",(0,r.yg)("inlineCode",{parentName:"p"},"GitRepo")," and ",(0,r.yg)("inlineCode",{parentName:"p"},"ClusterGroup")," resources. For in depth details on how namespaces\nare used in Fleet refer to the documentation on ",(0,r.yg)("a",{parentName:"p",href:"/namespaces"},"namespaces"),".  Create a new\ntoken with the below YAML."),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-yaml"},'kind: ClusterRegistrationToken\napiVersion: "fleet.cattle.io/v1alpha1"\nmetadata:\n    name: new-token\n    namespace: clusters\nspec:\n    # A duration string for how long this token is valid for. A value <= 0 or null means infinite time.\n    ttl: 240h\n')),(0,r.yg)("p",null,"After the ",(0,r.yg)("inlineCode",{parentName:"p"},"ClusterRegistrationToken")," is created, Fleet will create a corresponding ",(0,r.yg)("inlineCode",{parentName:"p"},"Secret")," with the same name.\nAs the ",(0,r.yg)("inlineCode",{parentName:"p"},"Secret")," creation is performed asynchronously, you will need to wait until it's available before using it."),(0,r.yg)("p",null,"One way to do so is via the following one-liner:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-shell"},"while ! kubectl --namespace=clusters  get secret new-token; do sleep 5; done\n")),(0,r.yg)("h4",{id:"obtaining-token-value-agent-valuesyaml"},"Obtaining Token Value (Agent values.yaml)"),(0,r.yg)("p",null,"The token value contains YAML content for a ",(0,r.yg)("inlineCode",{parentName:"p"},"values.yaml")," file that is expected to be passed to ",(0,r.yg)("inlineCode",{parentName:"p"},"helm install"),"\nto install the Fleet agent on a downstream cluster."),(0,r.yg)("p",null,"Such value is contained in the ",(0,r.yg)("inlineCode",{parentName:"p"},"values")," field of the ",(0,r.yg)("inlineCode",{parentName:"p"},"Secret")," mentioned above. To obtain the YAML content for the\nabove example one can run the following one-liner:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-shell"},"kubectl --namespace clusters get secret new-token -o 'jsonpath={.data.values}' | base64 --decode > values.yaml\n")),(0,r.yg)("p",null,"Once the ",(0,r.yg)("inlineCode",{parentName:"p"},"values.yaml")," is ready it can be used repeatedly by clusters to register until the TTL expires."),(0,r.yg)("h2",{id:"manager-initiated"},"Manager Initiated"),(0,r.yg)("p",null,"The manager-initiated registration flow is accomplished by creating a\n",(0,r.yg)("inlineCode",{parentName:"p"},"Cluster")," resource in the Fleet Manager that refers to a Kubernetes\n",(0,r.yg)("inlineCode",{parentName:"p"},"Secret")," containing a valid kubeconfig file in the data field called ",(0,r.yg)("inlineCode",{parentName:"p"},"value"),"."),(0,r.yg)("admonition",{type:"info"},(0,r.yg)("p",{parentName:"admonition"},"If you are using Fleet standalone ",(0,r.yg)("em",{parentName:"p"},"without Rancher"),", it must be installed as described in ",(0,r.yg)("a",{parentName:"p",href:"/installation#configuration-for-multi-cluster"},"installation details"),"."),(0,r.yg)("p",{parentName:"admonition"},"The manager-initiated registration is used when you add a cluster from the Rancher dashboard.")),(0,r.yg)("h3",{id:"create-kubeconfig-secret"},"Create Kubeconfig Secret"),(0,r.yg)("p",null,"The format of this secret is intended to match the ",(0,r.yg)("a",{parentName:"p",href:"https://cluster-api.sigs.k8s.io/developer/architecture/controllers/cluster.html#secrets"},"format")," of the kubeconfig\nsecret used in ",(0,r.yg)("a",{parentName:"p",href:"https://github.com/kubernetes-sigs/cluster-api"},"cluster-api"),".\nThis means you can use ",(0,r.yg)("inlineCode",{parentName:"p"},"cluster-api")," to create a cluster that is dynamically registered with Fleet."),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-yaml",metastring:'title="Kubeconfig Secret Example"',title:'"Kubeconfig',Secret:!0,'Example"':!0},"kind: Secret\napiVersion: v1\nmetadata:\n  name: my-cluster-kubeconfig\n  namespace: clusters\ndata:\n  value: YXBpVmVyc2lvbjogdjEKY2x1c3RlcnM6Ci0gY2x1c3RlcjoKICAgIHNlcnZlcjogaHR0cHM6Ly9leGFtcGxlLmNvbTo2NDQzCiAgbmFtZTogY2x1c3Rlcgpjb250ZXh0czoKLSBjb250ZXh0OgogICAgY2x1c3RlcjogY2x1c3RlcgogICAgdXNlcjogdXNlcgogIG5hbWU6IGRlZmF1bHQKY3VycmVudC1jb250ZXh0OiBkZWZhdWx0CmtpbmQ6IENvbmZpZwpwcmVmZXJlbmNlczoge30KdXNlcnM6Ci0gbmFtZTogdXNlcgogIHVzZXI6CiAgICB0b2tlbjogc29tZXRoaW5nCg==\n")),(0,r.yg)("h3",{id:"create-cluster-resource"},"Create Cluster Resource"),(0,r.yg)("p",null,"The cluster resource needs to reference the kubeconfig secret."),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-yaml",metastring:'title="Cluster Resource Example"',title:'"Cluster',Resource:!0,'Example"':!0},'apiVersion: fleet.cattle.io/v1alpha1\nkind: Cluster\nmetadata:\n  name: my-cluster\n  namespace: clusters\n  labels:\n    demo: "true"\n    env: dev\nspec:\n  kubeConfigSecret: my-cluster-kubeconfig\n')))}h.isMDXComponent=!0}}]);