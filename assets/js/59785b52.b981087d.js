"use strict";(self.webpackChunkfleet_docs=self.webpackChunkfleet_docs||[]).push([[7200],{9365:(e,t,a)=>{a.d(t,{A:()=>s});var l=a(6540),n=a(53);const r={tabItem:"tabItem_Ymn6"};function s(e){let{children:t,hidden:a,className:s}=e;return l.createElement("div",{role:"tabpanel",className:(0,n.A)(r.tabItem,s),hidden:a},t)}},1470:(e,t,a)=>{a.d(t,{A:()=>w});var l=a(8168),n=a(6540),r=a(53),s=a(3104),i=a(6347),o=a(7485),c=a(1682),u=a(9466);function d(e){return function(e){return n.Children.map(e,(e=>{if(!e||(0,n.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}(e).map((e=>{let{props:{value:t,label:a,attributes:l,default:n}}=e;return{value:t,label:a,attributes:l,default:n}}))}function p(e){const{values:t,children:a}=e;return(0,n.useMemo)((()=>{const e=t??d(a);return function(e){const t=(0,c.X)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,a])}function h(e){let{value:t,tabValues:a}=e;return a.some((e=>e.value===t))}function g(e){let{queryString:t=!1,groupId:a}=e;const l=(0,i.W6)(),r=function(e){let{queryString:t=!1,groupId:a}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!a)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return a??null}({queryString:t,groupId:a});return[(0,o.aZ)(r),(0,n.useCallback)((e=>{if(!r)return;const t=new URLSearchParams(l.location.search);t.set(r,e),l.replace({...l.location,search:t.toString()})}),[r,l])]}function m(e){const{defaultValue:t,queryString:a=!1,groupId:l}=e,r=p(e),[s,i]=(0,n.useState)((()=>function(e){let{defaultValue:t,tabValues:a}=e;if(0===a.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!h({value:t,tabValues:a}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${a.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const l=a.find((e=>e.default))??a[0];if(!l)throw new Error("Unexpected error: 0 tabValues");return l.value}({defaultValue:t,tabValues:r}))),[o,c]=g({queryString:a,groupId:l}),[d,m]=function(e){let{groupId:t}=e;const a=function(e){return e?`docusaurus.tab.${e}`:null}(t),[l,r]=(0,u.Dv)(a);return[l,(0,n.useCallback)((e=>{a&&r.set(e)}),[a,r])]}({groupId:l}),f=(()=>{const e=o??d;return h({value:e,tabValues:r})?e:null})();(0,n.useLayoutEffect)((()=>{f&&i(f)}),[f]);return{selectedValue:s,selectValue:(0,n.useCallback)((e=>{if(!h({value:e,tabValues:r}))throw new Error(`Can't select invalid tab value=${e}`);i(e),c(e),m(e)}),[c,m,r]),tabValues:r}}var f=a(2303);const y={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};function b(e){let{className:t,block:a,selectedValue:i,selectValue:o,tabValues:c}=e;const u=[],{blockElementScrollPositionUntilNextRender:d}=(0,s.a_)(),p=e=>{const t=e.currentTarget,a=u.indexOf(t),l=c[a].value;l!==i&&(d(t),o(l))},h=e=>{let t=null;switch(e.key){case"Enter":p(e);break;case"ArrowRight":{const a=u.indexOf(e.currentTarget)+1;t=u[a]??u[0];break}case"ArrowLeft":{const a=u.indexOf(e.currentTarget)-1;t=u[a]??u[u.length-1];break}}t?.focus()};return n.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,r.A)("tabs",{"tabs--block":a},t)},c.map((e=>{let{value:t,label:a,attributes:s}=e;return n.createElement("li",(0,l.A)({role:"tab",tabIndex:i===t?0:-1,"aria-selected":i===t,key:t,ref:e=>u.push(e),onKeyDown:h,onClick:p},s,{className:(0,r.A)("tabs__item",y.tabItem,s?.className,{"tabs__item--active":i===t})}),a??t)})))}function v(e){let{lazy:t,children:a,selectedValue:l}=e;const r=(Array.isArray(a)?a:[a]).filter(Boolean);if(t){const e=r.find((e=>e.props.value===l));return e?(0,n.cloneElement)(e,{className:"margin-top--md"}):null}return n.createElement("div",{className:"margin-top--md"},r.map(((e,t)=>(0,n.cloneElement)(e,{key:t,hidden:e.props.value!==l}))))}function A(e){const t=m(e);return n.createElement("div",{className:(0,r.A)("tabs-container",y.tabList)},n.createElement(b,(0,l.A)({},e,t)),n.createElement(v,(0,l.A)({},e,t)))}function w(e){const t=(0,f.A)();return n.createElement(A,(0,l.A)({key:String(t)},e))}},7858:(e,t,a)=>{a.d(t,{e:()=>l});const l={"v0.5":{fleet:"https://github.com/rancher/fleet/releases/download/v0.5.3/fleet-0.5.3.tgz",fleetAgent:"https://github.com/rancher/fleet/releases/download/v0.5.3/fleet-agent-0.5.3.tgz",fleetCRD:"https://github.com/rancher/fleet/releases/download/v0.5.3/fleet-crd-0.5.3.tgz"},"v0.6":{fleet:"https://github.com/rancher/fleet/releases/download/v0.6.0/fleet-0.6.0.tgz",fleetAgent:"https://github.com/rancher/fleet/releases/download/v0.6.0/fleet-agent-0.6.0.tgz",fleetCRD:"https://github.com/rancher/fleet/releases/download/v0.6.0/fleet-crd-0.6.0.tgz"},next:{kubernetes:"1.20.5"}}},6081:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>p,contentTitle:()=>u,default:()=>f,frontMatter:()=>c,metadata:()=>d,toc:()=>h});var l=a(8168),n=(a(6540),a(5680)),r=a(7858),s=a(2355),i=a(1470),o=a(9365);const c={},u="Installation Details",d={unversionedId:"installation",id:"version-0.10/installation",title:"Installation Details",description:"The installation is broken up into two different use cases: single and multi-cluster.",source:"@site/versioned_docs/version-0.10/installation.md",sourceDirName:".",slug:"/installation",permalink:"/0.10/installation",draft:!1,editUrl:"https://github.com/rancher/fleet-docs/edit/main/versioned_docs/version-0.10/installation.md",tags:[],version:"0.10",lastUpdatedAt:1724318679,formattedLastUpdatedAt:"Aug 22, 2024",frontMatter:{},sidebar:"docs",previous:{title:"Custom Resources During Deployment",permalink:"/0.10/resources-during-deployment"},next:{title:"Register Downstream Clusters",permalink:"/0.10/cluster-registration"}},p={},h=[{value:"Prerequisites",id:"prerequisites",level:2},{value:"Default Install",id:"default-install",level:2},{value:"Multi-controller install: sharding",id:"multi-controller-install-sharding",level:2},{value:"Deployment",id:"deployment",level:3},{value:"How it works",id:"how-it-works",level:3},{value:"Configuration for Multi-Cluster",id:"configuration-for-multi-cluster",level:2},{value:"API Server URL and CA certificate",id:"api-server-url-and-ca-certificate",level:3},{value:"Extract CA certificate",id:"extract-ca-certificate",level:4},{value:"Extract API Server",id:"extract-api-server",level:4},{value:"Validate",id:"validate",level:4},{value:"Install for Multi-Cluster",id:"install-for-multi-cluster",level:3}],g={toc:h},m="wrapper";function f(e){let{components:t,...c}=e;return(0,n.yg)(m,(0,l.A)({},g,c,{components:t,mdxType:"MDXLayout"}),(0,n.yg)("h1",{id:"installation-details"},"Installation Details"),(0,n.yg)("p",null,"The installation is broken up into two different use cases: single and multi-cluster.\nThe single cluster install is for if you wish to use GitOps to manage a single cluster,\nin which case you do not need a centralized manager cluster. In the multi-cluster use case\nyou will setup a centralized manager cluster to which you can register clusters."),(0,n.yg)("p",null,"If you are just learning Fleet the single cluster install is the recommended starting\npoint. After which you can move from single cluster to multi-cluster setup down the line."),(0,n.yg)("p",null,(0,n.yg)("img",{src:a(2614).A,width:"520",height:"279"})),(0,n.yg)("p",null,"Single-cluster is the default installation. The same cluster will run both the Fleet\nmanager and the Fleet agent. The cluster will communicate with Git server to\ndeploy resources to this local cluster. This is the simplest setup and very\nuseful for dev/test and small scale setups.  This use case is supported as a valid\nuse case for production."),(0,n.yg)("h2",{id:"prerequisites"},"Prerequisites"),(0,n.yg)(i.A,{mdxType:"Tabs"},(0,n.yg)(o.A,{value:"helm",label:"Helm 3",default:!0,mdxType:"TabItem"},"Fleet is distributed as a Helm chart. Helm 3 is a CLI, has no server side component, and is fairly straight forward. To install the Helm 3 CLI follow the ",(0,n.yg)("a",{href:"https://helm.sh/docs/intro/install"},"official install instructions"),"."),(0,n.yg)(o.A,{value:"kubernetes",label:"Kubernetes",default:!0,mdxType:"TabItem"},"Fleet is a controller running on a Kubernetes cluster so an existing cluster is required. For the single cluster use case you will install Fleet to the cluster which you intend to manage with GitOps. Any Kubernetes community supported version of Kubernetes will work, in practice this means ",r.e.next.kubernetes," or greater.")),(0,n.yg)("h2",{id:"default-install"},"Default Install"),(0,n.yg)("p",null,"Install the following two Helm charts."),(0,n.yg)(i.A,{mdxType:"Tabs"},(0,n.yg)(o.A,{value:"install",label:"Install",default:!0,mdxType:"TabItem"},(0,n.yg)("admonition",{title:"Fleet in Rancher",type:"caution"},(0,n.yg)("p",{parentName:"admonition"},"Rancher has separate helm charts for Fleet and uses a different repository.")),(0,n.yg)("p",null,"First add Fleet's Helm repository."),(0,n.yg)(s.A,{language:"bash",mdxType:"CodeBlock"},"helm repo add fleet https://rancher.github.io/fleet-helm-charts/"),(0,n.yg)("p",null,"Second install the Fleet CustomResourcesDefintions."),(0,n.yg)(s.A,{language:"bash",mdxType:"CodeBlock"},"helm -n cattle-fleet-system install --create-namespace --wait fleet-crd \\\n    fleet/fleet-crd"),(0,n.yg)("p",null,"Third install the Fleet controllers."),(0,n.yg)(s.A,{language:"bash",mdxType:"CodeBlock"},"helm -n cattle-fleet-system install --create-namespace --wait fleet \\\n    fleet/fleet")),(0,n.yg)(o.A,{value:"verify",label:"Verify",mdxType:"TabItem"},(0,n.yg)("p",null,"Fleet should be ready to use now for single cluster. You can check the status of the Fleet controller pods by\nrunning the below commands."),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-bash"},"kubectl -n cattle-fleet-system logs -l app=fleet-controller\nkubectl -n cattle-fleet-system get pods -l app=fleet-controller\n")),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre"},"NAME                                READY   STATUS    RESTARTS   AGE\nfleet-controller-64f49d756b-n57wq   1/1     Running   0          3m21s\n")))),(0,n.yg)("p",null,"You can now ",(0,n.yg)("a",{parentName:"p",href:"/0.10/gitrepo-add"},"register some git repos")," in the ",(0,n.yg)("inlineCode",{parentName:"p"},"fleet-local")," namespace to start deploying Kubernetes resources."),(0,n.yg)("h2",{id:"multi-controller-install-sharding"},"Multi-controller install: sharding"),(0,n.yg)("h3",{id:"deployment"},"Deployment"),(0,n.yg)("p",null,"From 0.10 onwards, Fleet supports static sharding. The Fleet controller chart can be installed with ",(0,n.yg)("inlineCode",{parentName:"p"},"--set\nshards={<comma-separated shard IDs>}"),", which will result in:"),(0,n.yg)("ul",null,(0,n.yg)("li",{parentName:"ul"},"as many Fleet controller deployments as specified unique shard IDs,"),(0,n.yg)("li",{parentName:"ul"},"plus the usual unsharded Fleet controller pod. That latter pod will be the only one containing agent management and\ncleanup containers.")),(0,n.yg)("p",null,"For instance:"),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-bash"},'$ helm -n cattle-fleet-system install --create-namespace --wait --set shards="{foo,bar,baz}" \\\nfleet fleet/fleet\n\n$ kubectl -n cattle-fleet-system get pods -l app=fleet-controller\nNAME                                          READY   STATUS    RESTARTS      AGE\nfleet-controller-78c74fdb85-b6q64             3/3     Running   0             77s\nfleet-controller-shard-bar-777d888865-w2dks   1/1     Running   0             77s\nfleet-controller-shard-baz-6595bd9cb9-27whg   1/1     Running   0             77s\nfleet-controller-shard-foo-85d49b446f-pzxkw   1/1     Running   0             77s\n\n$ kubectl -n cattle-fleet-system get pods -l app=fleet-controller \\\n-o=jsonpath=\'{range .items[*]}{.metadata.name}{"\\t"}{.metadata.labels.fleet\\.cattle\\.io/shard-id}{"\\n"}{end}\'\nfleet-controller-78c74fdb85-b6q64\nfleet-controller-shard-bar-777d888865-w2dks     bar\nfleet-controller-shard-baz-6595bd9cb9-27whg     baz\nfleet-controller-shard-foo-85d49b446f-pzxkw     foo\n')),(0,n.yg)("h3",{id:"how-it-works"},"How it works"),(0,n.yg)("p",null,"With sharding in place, each Fleet controller will process resources bearing its own shard ID. This also holds for the\nunsharded controller, which has no set shard ID and will therefore process all unsharded resources."),(0,n.yg)("p",null,"To deploy a GitRepo for a specific shard, simply add label ",(0,n.yg)("inlineCode",{parentName:"p"},"fleet.cattle.io/shard-ref")," with your desired shard ID as a\nvalue.\nHere is an example:"),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-bash"},"$ kubectl apply -n fleet-local -f - <<EOF\nkind: GitRepo\napiVersion: fleet.cattle.io/v1alpha1\nmetadata:\n  name: sharding-test\n  labels:\n    fleet.cattle.io/shard-ref: foo\nspec:\n  repo: https://github.com/rancher/fleet-examples\n  paths:\n  - single-cluster/helm\nEOF\n")),(0,n.yg)("p",null,"A GitRepo with a label ID for which a Fleet controller is deployed (eg. ",(0,n.yg)("inlineCode",{parentName:"p"},"foo")," in the above example) will then be\nprocessed by that controller."),(0,n.yg)("p",null,"On the other hand, a GitRepo with an unknown label ID (eg. ",(0,n.yg)("inlineCode",{parentName:"p"},"boo")," in the above example) will ",(0,n.yg)("em",{parentName:"p"},"not")," be processed by any\nFleet controller, hence no resources other than the GitRepo itself will be created."),(0,n.yg)("p",null,"Removing or adding supported shard IDs currently requires redeploying Fleet with a new set of shard IDs."),(0,n.yg)("h2",{id:"configuration-for-multi-cluster"},"Configuration for Multi-Cluster"),(0,n.yg)("admonition",{type:"caution"},(0,n.yg)("p",{parentName:"admonition"},"Downstream clusters in Rancher are automatically registered in Fleet. Users can access Fleet under ",(0,n.yg)("inlineCode",{parentName:"p"},"Continuous Delivery")," on Rancher."),(0,n.yg)("p",{parentName:"admonition"},"The multi-cluster install described below is ",(0,n.yg)("strong",{parentName:"p"},"only")," covered in standalone Fleet, which is untested by Rancher QA.")),(0,n.yg)("admonition",{type:"info"},(0,n.yg)("p",{parentName:"admonition"},"The setup is the same as for a single cluster.\nAfter installing the Fleet manager, you will then need to register remote downstream clusters with the Fleet manager."),(0,n.yg)("p",{parentName:"admonition"},"However, to allow for ",(0,n.yg)("a",{parentName:"p",href:"/0.10/cluster-registration#manager-initiated"},"manager-initiated registration")," of downstream clusters, a few extra settings are required. Without the API server URL and the CA, only ",(0,n.yg)("a",{parentName:"p",href:"/0.10/cluster-registration#agent-initiated"},"agent-initiated registration")," of downstream clusters is possible.")),(0,n.yg)("h3",{id:"api-server-url-and-ca-certificate"},"API Server URL and CA certificate"),(0,n.yg)("p",null,"In order for your Fleet management installation to properly work it is important\nthe correct API server URL and CA certificates are configured properly.  The Fleet agents\nwill communicate to the Kubernetes API server URL. This means the Kubernetes\nAPI server must be accessible to the downstream clusters.  You will also need\nto obtain the CA certificate of the API server. The easiest way to obtain this information\nis typically from your kubeconfig file (",(0,n.yg)("inlineCode",{parentName:"p"},"$HOME/.kube/config"),"). The ",(0,n.yg)("inlineCode",{parentName:"p"},"server"),",\n",(0,n.yg)("inlineCode",{parentName:"p"},"certificate-authority-data"),", or ",(0,n.yg)("inlineCode",{parentName:"p"},"certificate-authority")," fields will have these values."),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-yaml",metastring:'title="$HOME/.kube/config"',title:'"$HOME/.kube/config"'},"apiVersion: v1\nclusters:\n- cluster:\n    certificate-authority-data: LS0tLS1CRUdJTi...\n    server: https://example.com:6443\n")),(0,n.yg)("h4",{id:"extract-ca-certificate"},"Extract CA certificate"),(0,n.yg)("p",null,"Please note that the ",(0,n.yg)("inlineCode",{parentName:"p"},"certificate-authority-data")," field is base64 encoded and will need to be\ndecoded before you save it into a file. This can be done by saving the base64 encoded contents to\na file and then running"),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-shell"},"base64 -d encoded-file > ca.pem\n")),(0,n.yg)("p",null,"Next, retrieve the CA certificate from your kubeconfig."),(0,n.yg)(i.A,{mdxType:"Tabs"},(0,n.yg)(o.A,{value:"extractca",label:"Extract First",mdxType:"TabItem"},"If you have `jq` and `base64` available then this one-liners will pull all CA certificates from your `KUBECONFIG` and place then in a file named `ca.pem`.",(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-shell"},"kubectl config view -o json --raw  | jq -r '.clusters[].cluster[\"certificate-authority-data\"]' | base64 -d > ca.pem\n"))),(0,n.yg)(o.A,{value:"extractcas",label:"Multiple Entries",mdxType:"TabItem"},"Or, if you have a multi-cluster setup, you can use this command:",(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-shell"},'# replace CLUSTERNAME with the name of the cluster according to your KUBECONFIG\nkubectl config view -o json --raw  | jq -r \'.clusters[] | select(.name=="CLUSTERNAME").cluster["certificate-authority-data"]\' | base64 -d > ca.pem\n')))),(0,n.yg)("h4",{id:"extract-api-server"},"Extract API Server"),(0,n.yg)("p",null,"If you have a multi-cluster setup, you can use this command:"),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-shell"},'# replace CLUSTERNAME with the name of the cluster according to your KUBECONFIG\nAPI_SERVER_URL=$(kubectl config view -o json --raw  | jq -r \'.clusters[] | select(.name=="CLUSTER").cluster["server"]\')\n# Leave empty if your API server is signed by a well known CA\nAPI_SERVER_CA="ca.pem"\n')),(0,n.yg)("h4",{id:"validate"},"Validate"),(0,n.yg)("p",null,"First validate the server URL is correct."),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-shell"},'curl -fLk "$API_SERVER_URL/version"\n')),(0,n.yg)("p",null,"The output of this command should be JSON with the version of the Kubernetes server or a ",(0,n.yg)("inlineCode",{parentName:"p"},"401 Unauthorized")," error.\nIf you do not get either of these results than please ensure you have the correct URL. The API server port is typically\n6443 for Kubernetes."),(0,n.yg)("p",null,"Next validate that the CA certificate is proper by running the below command.  If your API server is signed by a\nwell known CA then omit the ",(0,n.yg)("inlineCode",{parentName:"p"},'--cacert "$API_SERVER_CA"')," part of the command."),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-shell"},'curl -fL --cacert "$API_SERVER_CA" "$API_SERVER_URL/version"\n')),(0,n.yg)("p",null,"If you get a valid JSON response or an ",(0,n.yg)("inlineCode",{parentName:"p"},"401 Unauthorized")," then it worked. The Unauthorized error is\nonly because the curl command is not setting proper credentials, but this validates that the TLS\nconnection work and the ",(0,n.yg)("inlineCode",{parentName:"p"},"ca.pem")," is correct for this URL. If you get a ",(0,n.yg)("inlineCode",{parentName:"p"},"SSL certificate problem")," then\nthe ",(0,n.yg)("inlineCode",{parentName:"p"},"ca.pem")," is not correct. The contents of the ",(0,n.yg)("inlineCode",{parentName:"p"},"$API_SERVER_CA")," file should look similar to the below:"),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-pem",metastring:'title="ca.pem"',title:'"ca.pem"'},"-----BEGIN CERTIFICATE-----\nMIIBVjCB/qADAgECAgEAMAoGCCqGSM49BAMCMCMxITAfBgNVBAMMGGszcy1zZXJ2\nZXItY2FAMTU5ODM5MDQ0NzAeFw0yMDA4MjUyMTIwNDdaFw0zMDA4MjMyMTIwNDda\nMCMxITAfBgNVBAMMGGszcy1zZXJ2ZXItY2FAMTU5ODM5MDQ0NzBZMBMGByqGSM49\nAgEGCCqGSM49AwEHA0IABDXlQNkXnwUPdbSgGz5Rk6U9ldGFjF6y1YyF36cNGk4E\n0lMgNcVVD9gKuUSXEJk8tzHz3ra/+yTwSL5xQeLHBl+jIzAhMA4GA1UdDwEB/wQE\nAwICpDAPBgNVHRMBAf8EBTADAQH/MAoGCCqGSM49BAMCA0cAMEQCIFMtZ5gGDoDs\nciRyve+T4xbRNVHES39tjjup/LuN4tAgAiAteeB3jgpTMpZyZcOOHl9gpZ8PgEcN\nKDs/pb3fnMTtpA==\n-----END CERTIFICATE-----\n")),(0,n.yg)("h3",{id:"install-for-multi-cluster"},"Install for Multi-Cluster"),(0,n.yg)("p",null,"In the following example it will be assumed the API server URL from the ",(0,n.yg)("inlineCode",{parentName:"p"},"KUBECONFIG")," which is ",(0,n.yg)("inlineCode",{parentName:"p"},"https://example.com:6443"),"\nand the CA certificate is in the file ",(0,n.yg)("inlineCode",{parentName:"p"},"ca.pem"),". If your API server URL is signed by a well-known CA you can\nomit the ",(0,n.yg)("inlineCode",{parentName:"p"},"apiServerCA")," parameter below or just create an empty ",(0,n.yg)("inlineCode",{parentName:"p"},"ca.pem")," file (ie ",(0,n.yg)("inlineCode",{parentName:"p"},"touch ca.pem"),")."),(0,n.yg)("p",null,"Setup the environment with your specific values, e.g.:"),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-shell"},'API_SERVER_URL="https://example.com:6443"\nAPI_SERVER_CA="ca.pem"\n')),(0,n.yg)("p",null,"Once you have validated the API server URL and API server CA parameters, install the following two\nHelm charts."),(0,n.yg)(i.A,{mdxType:"Tabs"},(0,n.yg)(o.A,{value:"install2",label:"Install",default:!0,mdxType:"TabItem"},"First add Fleet's Helm repository.",(0,n.yg)(s.A,{language:"bash",mdxType:"CodeBlock"},"helm repo add fleet https://rancher.github.io/fleet-helm-charts/"),(0,n.yg)("p",null,"Second install the Fleet CustomResourcesDefintions."),(0,n.yg)(s.A,{language:"bash",mdxType:"CodeBlock"},"helm -n cattle-fleet-system install --create-namespace --wait \\\n    fleet-crd"," ",r.e.next.fleetCRD),(0,n.yg)("p",null,"Third install the Fleet controllers."),(0,n.yg)(s.A,{language:"bash",mdxType:"CodeBlock"},'helm -n cattle-fleet-system install --create-namespace --wait \\\n    --set apiServerURL="$API_SERVER_URL" \\\n    --set-file apiServerCA="$API_SERVER_CA" \\\n    fleet'," ",r.e.next.fleet)),(0,n.yg)(o.A,{value:"verifiy2",label:"Verify",mdxType:"TabItem"},"Fleet should be ready to use. You can check the status of the Fleet controller pods by running the below commands.",(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-bash"},"kubectl -n cattle-fleet-system logs -l app=fleet-controller\nkubectl -n cattle-fleet-system get pods -l app=fleet-controller\n")),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre"},"NAME                                READY   STATUS    RESTARTS   AGE\nfleet-controller-64f49d756b-n57wq   1/1     Running   0          3m21s\n")))),(0,n.yg)("p",null,"At this point the Fleet manager should be ready. You can now ",(0,n.yg)("a",{parentName:"p",href:"/0.10/cluster-registration"},"register clusters")," and ",(0,n.yg)("a",{parentName:"p",href:"/0.10/gitrepo-add#create-gitrepo-instance"},"git repos")," with\nthe Fleet manager."))}f.isMDXComponent=!0},2614:(e,t,a)=>{a.d(t,{A:()=>l});const l=a.p+"assets/images/single-cluster-72ee1a61547953f123dd741c02cd2017.png"}}]);