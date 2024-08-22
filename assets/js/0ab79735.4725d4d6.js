"use strict";(self.webpackChunkfleet_docs=self.webpackChunkfleet_docs||[]).push([[9147],{9365:(e,t,a)=>{a.d(t,{A:()=>s});var n=a(6540),l=a(53);const r={tabItem:"tabItem_Ymn6"};function s(e){let{children:t,hidden:a,className:s}=e;return n.createElement("div",{role:"tabpanel",className:(0,l.A)(r.tabItem,s),hidden:a},t)}},1470:(e,t,a)=>{a.d(t,{A:()=>w});var n=a(8168),l=a(6540),r=a(53),s=a(3104),i=a(6347),o=a(7485),u=a(1682),c=a(9466);function d(e){return function(e){return l.Children.map(e,(e=>{if(!e||(0,l.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}(e).map((e=>{let{props:{value:t,label:a,attributes:n,default:l}}=e;return{value:t,label:a,attributes:n,default:l}}))}function p(e){const{values:t,children:a}=e;return(0,l.useMemo)((()=>{const e=t??d(a);return function(e){const t=(0,u.X)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,a])}function m(e){let{value:t,tabValues:a}=e;return a.some((e=>e.value===t))}function g(e){let{queryString:t=!1,groupId:a}=e;const n=(0,i.W6)(),r=function(e){let{queryString:t=!1,groupId:a}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!a)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return a??null}({queryString:t,groupId:a});return[(0,o.aZ)(r),(0,l.useCallback)((e=>{if(!r)return;const t=new URLSearchParams(n.location.search);t.set(r,e),n.replace({...n.location,search:t.toString()})}),[r,n])]}function h(e){const{defaultValue:t,queryString:a=!1,groupId:n}=e,r=p(e),[s,i]=(0,l.useState)((()=>function(e){let{defaultValue:t,tabValues:a}=e;if(0===a.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!m({value:t,tabValues:a}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${a.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const n=a.find((e=>e.default))??a[0];if(!n)throw new Error("Unexpected error: 0 tabValues");return n.value}({defaultValue:t,tabValues:r}))),[o,u]=g({queryString:a,groupId:n}),[d,h]=function(e){let{groupId:t}=e;const a=function(e){return e?`docusaurus.tab.${e}`:null}(t),[n,r]=(0,c.Dv)(a);return[n,(0,l.useCallback)((e=>{a&&r.set(e)}),[a,r])]}({groupId:n}),f=(()=>{const e=o??d;return m({value:e,tabValues:r})?e:null})();(0,l.useLayoutEffect)((()=>{f&&i(f)}),[f]);return{selectedValue:s,selectValue:(0,l.useCallback)((e=>{if(!m({value:e,tabValues:r}))throw new Error(`Can't select invalid tab value=${e}`);i(e),u(e),h(e)}),[u,h,r]),tabValues:r}}var f=a(2303);const y={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};function b(e){let{className:t,block:a,selectedValue:i,selectValue:o,tabValues:u}=e;const c=[],{blockElementScrollPositionUntilNextRender:d}=(0,s.a_)(),p=e=>{const t=e.currentTarget,a=c.indexOf(t),n=u[a].value;n!==i&&(d(t),o(n))},m=e=>{let t=null;switch(e.key){case"Enter":p(e);break;case"ArrowRight":{const a=c.indexOf(e.currentTarget)+1;t=c[a]??c[0];break}case"ArrowLeft":{const a=c.indexOf(e.currentTarget)-1;t=c[a]??c[c.length-1];break}}t?.focus()};return l.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,r.A)("tabs",{"tabs--block":a},t)},u.map((e=>{let{value:t,label:a,attributes:s}=e;return l.createElement("li",(0,n.A)({role:"tab",tabIndex:i===t?0:-1,"aria-selected":i===t,key:t,ref:e=>c.push(e),onKeyDown:m,onClick:p},s,{className:(0,r.A)("tabs__item",y.tabItem,s?.className,{"tabs__item--active":i===t})}),a??t)})))}function v(e){let{lazy:t,children:a,selectedValue:n}=e;const r=(Array.isArray(a)?a:[a]).filter(Boolean);if(t){const e=r.find((e=>e.props.value===n));return e?(0,l.cloneElement)(e,{className:"margin-top--md"}):null}return l.createElement("div",{className:"margin-top--md"},r.map(((e,t)=>(0,l.cloneElement)(e,{key:t,hidden:e.props.value!==n}))))}function A(e){const t=h(e);return l.createElement("div",{className:(0,r.A)("tabs-container",y.tabList)},l.createElement(b,(0,n.A)({},e,t)),l.createElement(v,(0,n.A)({},e,t)))}function w(e){const t=(0,f.A)();return l.createElement(A,(0,n.A)({key:String(t)},e))}},7858:(e,t,a)=>{a.d(t,{e:()=>n});const n={"v0.5":{fleet:"https://github.com/rancher/fleet/releases/download/v0.5.3/fleet-0.5.3.tgz",fleetAgent:"https://github.com/rancher/fleet/releases/download/v0.5.3/fleet-agent-0.5.3.tgz",fleetCRD:"https://github.com/rancher/fleet/releases/download/v0.5.3/fleet-crd-0.5.3.tgz"},"v0.6":{fleet:"https://github.com/rancher/fleet/releases/download/v0.6.0/fleet-0.6.0.tgz",fleetAgent:"https://github.com/rancher/fleet/releases/download/v0.6.0/fleet-agent-0.6.0.tgz",fleetCRD:"https://github.com/rancher/fleet/releases/download/v0.6.0/fleet-crd-0.6.0.tgz"},next:{kubernetes:"1.20.5"}}},3814:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>p,contentTitle:()=>c,default:()=>f,frontMatter:()=>u,metadata:()=>d,toc:()=>m});var n=a(8168),l=(a(6540),a(5680)),r=a(7858),s=a(2355),i=a(1470),o=a(9365);const u={},c="Installation Details",d={unversionedId:"installation",id:"version-0.8/installation",title:"Installation Details",description:"The installation is broken up into two different use cases: single and multi-cluster.",source:"@site/versioned_docs/version-0.8/installation.md",sourceDirName:".",slug:"/installation",permalink:"/0.8/installation",draft:!1,editUrl:"https://github.com/rancher/fleet-docs/edit/main/versioned_docs/version-0.8/installation.md",tags:[],version:"0.8",lastUpdatedAt:1724318679,formattedLastUpdatedAt:"Aug 22, 2024",frontMatter:{},sidebar:"docs",previous:{title:"Custom Resources During Deployment",permalink:"/0.8/resources-during-deployment"},next:{title:"Register Downstream Clusters",permalink:"/0.8/cluster-registration"}},p={},m=[{value:"Prerequisites",id:"prerequisites",level:2},{value:"Default Install",id:"default-install",level:2},{value:"Configuration for Multi-Cluster",id:"configuration-for-multi-cluster",level:2},{value:"API Server URL and CA certificate",id:"api-server-url-and-ca-certificate",level:3},{value:"Extract CA certificate",id:"extract-ca-certificate",level:4},{value:"Extract API Server",id:"extract-api-server",level:4},{value:"Validate",id:"validate",level:4},{value:"Install for Multi-Cluster",id:"install-for-multi-cluster",level:3}],g={toc:m},h="wrapper";function f(e){let{components:t,...u}=e;return(0,l.yg)(h,(0,n.A)({},g,u,{components:t,mdxType:"MDXLayout"}),(0,l.yg)("h1",{id:"installation-details"},"Installation Details"),(0,l.yg)("p",null,"The installation is broken up into two different use cases: single and multi-cluster.\nThe single cluster install is for if you wish to use GitOps to manage a single cluster,\nin which case you do not need a centralized manager cluster. In the multi-cluster use case\nyou will setup a centralized manager cluster to which you can register clusters."),(0,l.yg)("p",null,"If you are just learning Fleet the single cluster install is the recommended starting\npoint. After which you can move from single cluster to multi-cluster setup down the line."),(0,l.yg)("p",null,(0,l.yg)("img",{src:a(2614).A,width:"520",height:"279"})),(0,l.yg)("p",null,"Single-cluster is the default installation. The same cluster will run both the Fleet\nmanager and the Fleet agent. The cluster will communicate with Git server to\ndeploy resources to this local cluster. This is the simplest setup and very\nuseful for dev/test and small scale setups.  This use case is supported as a valid\nuse case for production."),(0,l.yg)("h2",{id:"prerequisites"},"Prerequisites"),(0,l.yg)(i.A,{mdxType:"Tabs"},(0,l.yg)(o.A,{value:"helm",label:"Helm 3",default:!0,mdxType:"TabItem"},"Fleet is distributed as a Helm chart. Helm 3 is a CLI, has no server side component, and is fairly straight forward. To install the Helm 3 CLI follow the ",(0,l.yg)("a",{href:"https://helm.sh/docs/intro/install"},"official install instructions"),"."),(0,l.yg)(o.A,{value:"kubernetes",label:"Kubernetes",default:!0,mdxType:"TabItem"},"Fleet is a controller running on a Kubernetes cluster so an existing cluster is required. For the single cluster use case you will install Fleet to the cluster which you intend to manage with GitOps. Any Kubernetes community supported version of Kubernetes will work, in practice this means ",r.e.next.kubernetes," or greater.")),(0,l.yg)("h2",{id:"default-install"},"Default Install"),(0,l.yg)("p",null,"Install the following two Helm charts."),(0,l.yg)(i.A,{mdxType:"Tabs"},(0,l.yg)(o.A,{value:"install",label:"Install",default:!0,mdxType:"TabItem"},(0,l.yg)("admonition",{title:"Fleet in Rancher",type:"caution"},(0,l.yg)("p",{parentName:"admonition"},"Rancher has separate helm charts for Fleet and uses a different repository.")),(0,l.yg)("p",null,"First add Fleet's Helm repository."),(0,l.yg)(s.A,{language:"bash",mdxType:"CodeBlock"},"helm repo add fleet https://rancher.github.io/fleet-helm-charts/"),(0,l.yg)("p",null,"Second install the Fleet CustomResourcesDefintions."),(0,l.yg)(s.A,{language:"bash",mdxType:"CodeBlock"},"helm -n cattle-fleet-system install --create-namespace --wait fleet-crd \\\n    fleet/fleet-crd"),(0,l.yg)("p",null,"Third install the Fleet controllers."),(0,l.yg)(s.A,{language:"bash",mdxType:"CodeBlock"},"helm -n cattle-fleet-system install --create-namespace --wait fleet \\\n    fleet/fleet")),(0,l.yg)(o.A,{value:"verify",label:"Verify",mdxType:"TabItem"},(0,l.yg)("p",null,"Fleet should be ready to use now for single cluster. You can check the status of the Fleet controller pods by\nrunning the below commands."),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-bash"},"kubectl -n cattle-fleet-system logs -l app=fleet-controller\nkubectl -n cattle-fleet-system get pods -l app=fleet-controller\n")),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre"},"NAME                                READY   STATUS    RESTARTS   AGE\nfleet-controller-64f49d756b-n57wq   1/1     Running   0          3m21s\n")))),(0,l.yg)("p",null,"You can now ",(0,l.yg)("a",{parentName:"p",href:"/0.8/gitrepo-add"},"register some git repos")," in the ",(0,l.yg)("inlineCode",{parentName:"p"},"fleet-local")," namespace to start deploying Kubernetes resources."),(0,l.yg)("h2",{id:"configuration-for-multi-cluster"},"Configuration for Multi-Cluster"),(0,l.yg)("admonition",{type:"caution"},(0,l.yg)("p",{parentName:"admonition"},"Downstream clusters in Rancher are automatically registered in Fleet. Users can access Fleet under ",(0,l.yg)("inlineCode",{parentName:"p"},"Continuous Delivery")," on Rancher."),(0,l.yg)("p",{parentName:"admonition"},"The multi-cluster install described below is ",(0,l.yg)("strong",{parentName:"p"},"only")," covered in standalone Fleet, which is untested by Rancher QA.")),(0,l.yg)("admonition",{type:"info"},(0,l.yg)("p",{parentName:"admonition"},"The setup is the same as for a single cluster.\nAfter installing the Fleet manager, you will then need to register remote downstream clusters with the Fleet manager."),(0,l.yg)("p",{parentName:"admonition"},"However, to allow for ",(0,l.yg)("a",{parentName:"p",href:"/0.8/cluster-registration#manager-initiated"},"manager-initiated registration")," of downstream clusters, a few extra settings are required. Without the API server URL and the CA, only ",(0,l.yg)("a",{parentName:"p",href:"/0.8/cluster-registration#agent-initiated"},"agent-initiated registration")," of downstream clusters is possible.")),(0,l.yg)("h3",{id:"api-server-url-and-ca-certificate"},"API Server URL and CA certificate"),(0,l.yg)("p",null,"In order for your Fleet management installation to properly work it is important\nthe correct API server URL and CA certificates are configured properly.  The Fleet agents\nwill communicate to the Kubernetes API server URL. This means the Kubernetes\nAPI server must be accessible to the downstream clusters.  You will also need\nto obtain the CA certificate of the API server. The easiest way to obtain this information\nis typically from your kubeconfig file (",(0,l.yg)("inlineCode",{parentName:"p"},"$HOME/.kube/config"),"). The ",(0,l.yg)("inlineCode",{parentName:"p"},"server"),",\n",(0,l.yg)("inlineCode",{parentName:"p"},"certificate-authority-data"),", or ",(0,l.yg)("inlineCode",{parentName:"p"},"certificate-authority")," fields will have these values."),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-yaml",metastring:'title="$HOME/.kube/config"',title:'"$HOME/.kube/config"'},"apiVersion: v1\nclusters:\n- cluster:\n    certificate-authority-data: LS0tLS1CRUdJTi...\n    server: https://example.com:6443\n")),(0,l.yg)("h4",{id:"extract-ca-certificate"},"Extract CA certificate"),(0,l.yg)("p",null,"Please note that the ",(0,l.yg)("inlineCode",{parentName:"p"},"certificate-authority-data")," field is base64 encoded and will need to be\ndecoded before you save it into a file. This can be done by saving the base64 encoded contents to\na file and then running"),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-shell"},"base64 -d encoded-file > ca.pem\n")),(0,l.yg)("p",null,"Next, retrieve the CA certificate from your kubeconfig."),(0,l.yg)(i.A,{mdxType:"Tabs"},(0,l.yg)(o.A,{value:"extractca",label:"Extract First",mdxType:"TabItem"},"If you have `jq` and `base64` available then this one-liners will pull all CA certificates from your `KUBECONFIG` and place then in a file named `ca.pem`.",(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-shell"},"kubectl config view -o json --raw  | jq -r '.clusters[].cluster[\"certificate-authority-data\"]' | base64 -d > ca.pem\n"))),(0,l.yg)(o.A,{value:"extractcas",label:"Multiple Entries",mdxType:"TabItem"},"Or, if you have a multi-cluster setup, you can use this command:",(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-shell"},'# replace CLUSTERNAME with the name of the cluster according to your KUBECONFIG\nkubectl config view -o json --raw  | jq -r \'.clusters[] | select(.name=="CLUSTERNAME").cluster["certificate-authority-data"]\' | base64 -d > ca.pem\n')))),(0,l.yg)("h4",{id:"extract-api-server"},"Extract API Server"),(0,l.yg)("p",null,"If you have a multi-cluster setup, you can use this command:"),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-shell"},'# replace CLUSTERNAME with the name of the cluster according to your KUBECONFIG\nAPI_SERVER_URL=$(kubectl config view -o json --raw  | jq -r \'.clusters[] | select(.name=="CLUSTER").cluster["server"]\')\n# Leave empty if your API server is signed by a well known CA\nAPI_SERVER_CA="ca.pem"\n')),(0,l.yg)("h4",{id:"validate"},"Validate"),(0,l.yg)("p",null,"First validate the server URL is correct."),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-shell"},'curl -fLk "$API_SERVER_URL/version"\n')),(0,l.yg)("p",null,"The output of this command should be JSON with the version of the Kubernetes server or a ",(0,l.yg)("inlineCode",{parentName:"p"},"401 Unauthorized")," error.\nIf you do not get either of these results than please ensure you have the correct URL. The API server port is typically\n6443 for Kubernetes."),(0,l.yg)("p",null,"Next validate that the CA certificate is proper by running the below command.  If your API server is signed by a\nwell known CA then omit the ",(0,l.yg)("inlineCode",{parentName:"p"},'--cacert "$API_SERVER_CA"')," part of the command."),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-shell"},'curl -fL --cacert "$API_SERVER_CA" "$API_SERVER_URL/version"\n')),(0,l.yg)("p",null,"If you get a valid JSON response or an ",(0,l.yg)("inlineCode",{parentName:"p"},"401 Unauthorized")," then it worked. The Unauthorized error is\nonly because the curl command is not setting proper credentials, but this validates that the TLS\nconnection work and the ",(0,l.yg)("inlineCode",{parentName:"p"},"ca.pem")," is correct for this URL. If you get a ",(0,l.yg)("inlineCode",{parentName:"p"},"SSL certificate problem")," then\nthe ",(0,l.yg)("inlineCode",{parentName:"p"},"ca.pem")," is not correct. The contents of the ",(0,l.yg)("inlineCode",{parentName:"p"},"$API_SERVER_CA")," file should look similar to the below:"),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-pem",metastring:'title="ca.pem"',title:'"ca.pem"'},"-----BEGIN CERTIFICATE-----\nMIIBVjCB/qADAgECAgEAMAoGCCqGSM49BAMCMCMxITAfBgNVBAMMGGszcy1zZXJ2\nZXItY2FAMTU5ODM5MDQ0NzAeFw0yMDA4MjUyMTIwNDdaFw0zMDA4MjMyMTIwNDda\nMCMxITAfBgNVBAMMGGszcy1zZXJ2ZXItY2FAMTU5ODM5MDQ0NzBZMBMGByqGSM49\nAgEGCCqGSM49AwEHA0IABDXlQNkXnwUPdbSgGz5Rk6U9ldGFjF6y1YyF36cNGk4E\n0lMgNcVVD9gKuUSXEJk8tzHz3ra/+yTwSL5xQeLHBl+jIzAhMA4GA1UdDwEB/wQE\nAwICpDAPBgNVHRMBAf8EBTADAQH/MAoGCCqGSM49BAMCA0cAMEQCIFMtZ5gGDoDs\nciRyve+T4xbRNVHES39tjjup/LuN4tAgAiAteeB3jgpTMpZyZcOOHl9gpZ8PgEcN\nKDs/pb3fnMTtpA==\n-----END CERTIFICATE-----\n")),(0,l.yg)("h3",{id:"install-for-multi-cluster"},"Install for Multi-Cluster"),(0,l.yg)("p",null,"In the following example it will be assumed the API server URL from the ",(0,l.yg)("inlineCode",{parentName:"p"},"KUBECONFIG")," which is ",(0,l.yg)("inlineCode",{parentName:"p"},"https://example.com:6443"),"\nand the CA certificate is in the file ",(0,l.yg)("inlineCode",{parentName:"p"},"ca.pem"),". If your API server URL is signed by a well-known CA you can\nomit the ",(0,l.yg)("inlineCode",{parentName:"p"},"apiServerCA")," parameter below or just create an empty ",(0,l.yg)("inlineCode",{parentName:"p"},"ca.pem")," file (ie ",(0,l.yg)("inlineCode",{parentName:"p"},"touch ca.pem"),")."),(0,l.yg)("p",null,"Setup the environment with your specific values, e.g.:"),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-shell"},'API_SERVER_URL="https://example.com:6443"\nAPI_SERVER_CA="ca.pem"\n')),(0,l.yg)("p",null,"Once you have validated the API server URL and API server CA parameters, install the following two\nHelm charts."),(0,l.yg)(i.A,{mdxType:"Tabs"},(0,l.yg)(o.A,{value:"install2",label:"Install",default:!0,mdxType:"TabItem"},"First add Fleet's Helm repository.",(0,l.yg)(s.A,{language:"bash",mdxType:"CodeBlock"},"helm repo add fleet https://rancher.github.io/fleet-helm-charts/"),(0,l.yg)("p",null,"Second install the Fleet CustomResourcesDefintions."),(0,l.yg)(s.A,{language:"bash",mdxType:"CodeBlock"},"helm -n cattle-fleet-system install --create-namespace --wait \\\n    fleet-crd"," ",r.e.next.fleetCRD),(0,l.yg)("p",null,"Third install the Fleet controllers."),(0,l.yg)(s.A,{language:"bash",mdxType:"CodeBlock"},'helm -n cattle-fleet-system install --create-namespace --wait \\\n    --set apiServerURL="$API_SERVER_URL" \\\n    --set-file apiServerCA="$API_SERVER_CA" \\\n    fleet'," ",r.e.next.fleet)),(0,l.yg)(o.A,{value:"verifiy2",label:"Verify",mdxType:"TabItem"},"Fleet should be ready to use. You can check the status of the Fleet controller pods by running the below commands.",(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-bash"},"kubectl -n cattle-fleet-system logs -l app=fleet-controller\nkubectl -n cattle-fleet-system get pods -l app=fleet-controller\n")),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre"},"NAME                                READY   STATUS    RESTARTS   AGE\nfleet-controller-64f49d756b-n57wq   1/1     Running   0          3m21s\n")))),(0,l.yg)("p",null,"At this point the Fleet manager should be ready. You can now ",(0,l.yg)("a",{parentName:"p",href:"/0.8/cluster-registration"},"register clusters")," and ",(0,l.yg)("a",{parentName:"p",href:"/0.8/gitrepo-add#create-gitrepo-instance"},"git repos")," with\nthe Fleet manager."))}f.isMDXComponent=!0},2614:(e,t,a)=>{a.d(t,{A:()=>n});const n=a.p+"assets/images/single-cluster-72ee1a61547953f123dd741c02cd2017.png"}}]);