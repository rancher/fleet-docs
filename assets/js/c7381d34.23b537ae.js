"use strict";(self.webpackChunkfleet_docs=self.webpackChunkfleet_docs||[]).push([[8162],{5680:(e,t,n)=>{n.d(t,{xA:()=>c,yg:()=>h});var o=n(6540);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=o.createContext({}),u=function(e){var t=o.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=u(e.components);return o.createElement(s.Provider,{value:t},e.children)},g="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},d=o.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),g=u(n),d=r,h=g["".concat(s,".").concat(d)]||g[d]||p[d]||a;return n?o.createElement(h,i(i({ref:t},c),{},{components:n})):o.createElement(h,i({ref:t},c))}));function h(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,i=new Array(a);i[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[g]="string"==typeof e?e:r,i[1]=l;for(var u=2;u<a;u++)i[u]=n[u];return o.createElement.apply(null,i)}return o.createElement.apply(null,n)}d.displayName="MDXCreateElement"},9595:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>p,frontMatter:()=>a,metadata:()=>l,toc:()=>u});var o=n(8168),r=(n(6540),n(5680));const a={},i="Using Webhooks Instead of Polling",l={unversionedId:"webhook",id:"webhook",title:"Using Webhooks Instead of Polling",description:"By default, Fleet utilizes polling (default: every 15 seconds) to pull from a Git repo. This is a convenient default that works reasonably well for a small number of repos (up to a few tens).",source:"@site/docs/webhook.md",sourceDirName:".",slug:"/webhook",permalink:"/webhook",draft:!1,editUrl:"https://github.com/rancher/fleet-docs/edit/main/docs/webhook.md",tags:[],version:"current",lastUpdatedAt:1724318679,formattedLastUpdatedAt:"Aug 22, 2024",frontMatter:{},sidebar:"docs",previous:{title:"Generating Diffs to Ignore Modified GitRepos",permalink:"/bundle-diffs"},next:{title:"Using Image Scan to Update Container Image References",permalink:"/imagescan"}},s={},u=[{value:"1. Configure the webhook service. Fleet uses a gitjob service to handle webhook requests. Create an ingress that points to the gitjob service.",id:"1-configure-the-webhook-service-fleet-uses-a-gitjob-service-to-handle-webhook-requests-create-an-ingress-that-points-to-the-gitjob-service",level:3},{value:"2. Go to your webhook provider and configure the webhook callback url. Here is a Github example.",id:"2-go-to-your-webhook-provider-and-configure-the-webhook-callback-url-here-is-a-github-example",level:3},{value:"3. (Optional) Configure webhook secret. The secret is for validating webhook payload. Make sure to put it in a k8s secret called <code>gitjob-webhook</code> in <code>cattle-fleet-system</code>.",id:"3-optional-configure-webhook-secret-the-secret-is-for-validating-webhook-payload-make-sure-to-put-it-in-a-k8s-secret-called-gitjob-webhook-in-cattle-fleet-system",level:3},{value:"4. Go to your git provider and test the connection. You should get a HTTP response code.",id:"4-go-to-your-git-provider-and-test-the-connection-you-should-get-a-http-response-code",level:3}],c={toc:u},g="wrapper";function p(e){let{components:t,...a}=e;return(0,r.yg)(g,(0,o.A)({},c,a,{components:t,mdxType:"MDXLayout"}),(0,r.yg)("h1",{id:"using-webhooks-instead-of-polling"},"Using Webhooks Instead of Polling"),(0,r.yg)("p",null,"By default, Fleet utilizes polling (default: every 15 seconds) to pull from a Git repo. This is a convenient default that works reasonably well for a small number of repos (up to a few tens)."),(0,r.yg)("p",null,"For installations with multiple tens up to hundreds of Git repos, and in general to reduce latency (the time between a push to Git and fleet reacting to it), configuring webhooks is recommended instead of polling."),(0,r.yg)("p",null,"Fleet currently supports Azure DevOps, GitHub, GitLab, Bitbucket, Bitbucket Server, and Gogs."),(0,r.yg)("h3",{id:"1-configure-the-webhook-service-fleet-uses-a-gitjob-service-to-handle-webhook-requests-create-an-ingress-that-points-to-the-gitjob-service"},"1. Configure the webhook service. Fleet uses a gitjob service to handle webhook requests. Create an ingress that points to the gitjob service."),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-yaml"},"apiVersion: networking.k8s.io/v1\nkind: Ingress\nmetadata:\n  name: webhook-ingress\n  namespace: cattle-fleet-system\nspec:\n  rules:\n  - host: your.domain.com\n    http:\n      paths:\n        - path: /\n          pathType: Prefix\n          backend:\n            service:\n              name: gitjob\n              port:\n                number: 80\n")),(0,r.yg)("p",null,"If you want to have the webhook available using the same host name as your Rancher or another service, you can use the following YAML with the URL ",(0,r.yg)("a",{parentName:"p",href:"http://your.domain.com/gitjob"},"http://your.domain.com/gitjob"),". The below YAML is specific for the Nginx Ingress Controller:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: networking.k8s.io/v1\nkind: Ingress\nmetadata:\n  annotations:\n    nginx.ingress.kubernetes.io/use-regex: "true"\n    nginx.ingress.kubernetes.io/rewrite-target: /$2\n  name: webhook-ingress\n  namespace: cattle-fleet-system\nspec:\n  rules:\n  - host: your.domain.com\n    http:\n      paths:\n        - path: /gitjob(/|$)(.*)\n          pathType: ImplementationSpecific\n          backend:\n            service:\n              name: gitjob\n              port:\n                number: 80\n')),(0,r.yg)("admonition",{type:"info"},(0,r.yg)("p",{parentName:"admonition"},"You can configure ",(0,r.yg)("a",{parentName:"p",href:"https://kubernetes.io/docs/concepts/services-networking/ingress/#tls"},"TLS")," on ingress.")),(0,r.yg)("h3",{id:"2-go-to-your-webhook-provider-and-configure-the-webhook-callback-url-here-is-a-github-example"},"2. Go to your webhook provider and configure the webhook callback url. Here is a Github example."),(0,r.yg)("p",null,(0,r.yg)("img",{src:n(4068).A,width:"1830",height:"1563"})),(0,r.yg)("p",null,"Configuring a secret is optional. This is used to validate the webhook payload as the payload should not be trusted by default.\nIf your webhook server is publicly accessible to the Internet, then it is recommended to configure the secret. If you do configure the\nsecret, follow step 3."),(0,r.yg)("admonition",{type:"note"},(0,r.yg)("p",{parentName:"admonition"},"only application/json is supported due to the limitation of webhook library.")),(0,r.yg)("admonition",{type:"caution"},(0,r.yg)("p",{parentName:"admonition"},"If you configured the webhook the polling interval will be automatically adjusted to 1 hour.")),(0,r.yg)("h3",{id:"3-optional-configure-webhook-secret-the-secret-is-for-validating-webhook-payload-make-sure-to-put-it-in-a-k8s-secret-called-gitjob-webhook-in-cattle-fleet-system"},"3. (Optional) Configure webhook secret. The secret is for validating webhook payload. Make sure to put it in a k8s secret called ",(0,r.yg)("inlineCode",{parentName:"h3"},"gitjob-webhook")," in ",(0,r.yg)("inlineCode",{parentName:"h3"},"cattle-fleet-system"),"."),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:null},"Provider"),(0,r.yg)("th",{parentName:"tr",align:null},"K8s Secret Key"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"GitHub"),(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("inlineCode",{parentName:"td"},"github"))),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"GitLab"),(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("inlineCode",{parentName:"td"},"gitlab"))),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"BitBucket"),(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("inlineCode",{parentName:"td"},"bitbucket"))),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"BitBucketServer"),(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("inlineCode",{parentName:"td"},"bitbucket-server"))),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"Gogs"),(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("inlineCode",{parentName:"td"},"gogs"))),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"Azure DevOps"),(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("inlineCode",{parentName:"td"},"azure-username"))),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"Azure DevOps"),(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("inlineCode",{parentName:"td"},"azure-password"))))),(0,r.yg)("p",null,"For example, to create a secret containing a GitHub secret to validate the webhook payload, run:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-shell"},"kubectl create secret generic gitjob-webhook -n cattle-fleet-system --from-literal=github=webhooksecretvalue\n")),(0,r.yg)("p",null,"For Azure DevOps:"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"Enable basic authentication in Azure"),(0,r.yg)("li",{parentName:"ul"},"Create a secret containing the credentials for the basic authentication")),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-shell"},"kubectl create secret generic gitjob-webhook -n cattle-fleet-system --from-literal=azure-username=user --from-literal=azure-password=pass123\n")),(0,r.yg)("h3",{id:"4-go-to-your-git-provider-and-test-the-connection-you-should-get-a-http-response-code"},"4. Go to your git provider and test the connection. You should get a HTTP response code."))}p.isMDXComponent=!0},4068:(e,t,n)=>{n.d(t,{A:()=>o});const o=n.p+"assets/images/webhook-9c042ab211f1b5438bf70372e92ecdf7.png"}}]);