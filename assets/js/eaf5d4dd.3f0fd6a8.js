"use strict";(self.webpackChunkfleet_docs=self.webpackChunkfleet_docs||[]).push([[2954],{5680:(e,t,r)=>{r.d(t,{xA:()=>g,yg:()=>m});var n=r(6540);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},l=Object.keys(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var c=n.createContext({}),s=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},g=function(e){var t=s(e.components);return n.createElement(c.Provider,{value:t},e.children)},f="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,l=e.originalType,c=e.parentName,g=i(e,["components","mdxType","originalType","parentName"]),f=s(r),d=a,m=f["".concat(c,".").concat(d)]||f[d]||p[d]||l;return r?n.createElement(m,o(o({ref:t},g),{},{components:r})):n.createElement(m,o({ref:t},g))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=r.length,o=new Array(l);o[0]=d;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i[f]="string"==typeof e?e:a,o[1]=i;for(var s=2;s<l;s++)o[s]=r[s];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},9979:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>p,frontMatter:()=>l,metadata:()=>i,toc:()=>s});var n=r(8168),a=(r(6540),r(5680));const l={title:"",sidebar_label:"fleet-manager gitjob"},o=void 0,i={unversionedId:"cli/fleet-controller/fleet-manager_gitjob",id:"cli/fleet-controller/fleet-manager_gitjob",title:"",description:"fleet-manager gitjob",source:"@site/docs/cli/fleet-controller/fleet-manager_gitjob.md",sourceDirName:"cli/fleet-controller",slug:"/cli/fleet-controller/fleet-manager_gitjob",permalink:"/cli/fleet-controller/fleet-manager_gitjob",draft:!1,editUrl:"https://github.com/rancher/fleet-docs/edit/main/docs/cli/fleet-controller/fleet-manager_gitjob.md",tags:[],version:"current",lastUpdatedAt:1721380485,formattedLastUpdatedAt:"Jul 19, 2024",frontMatter:{title:"",sidebar_label:"fleet-manager gitjob"}},c={},s=[{value:"fleet-manager gitjob",id:"fleet-manager-gitjob",level:2},{value:"Options",id:"options",level:3},{value:"Options inherited from parent commands",id:"options-inherited-from-parent-commands",level:3},{value:"SEE ALSO",id:"see-also",level:3}],g={toc:s},f="wrapper";function p(e){let{components:t,...r}=e;return(0,a.yg)(f,(0,n.A)({},g,r,{components:t,mdxType:"MDXLayout"}),(0,a.yg)("h2",{id:"fleet-manager-gitjob"},"fleet-manager gitjob"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre"},"fleet-manager gitjob [flags]\n")),(0,a.yg)("h3",{id:"options"},"Options"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre"},'      --debug                         Turn on debug logging\n      --debug-level int               If debugging is enabled, set klog -v=X\n      --gitjob-image string           The gitjob image that will be used in the generated job. (default "rancher/fleet:dev")\n  -h, --help                          help for gitjob\n      --kubeconfig string             Kubeconfig file\n      --leader-elect                  Enable leader election for controller manager. Enabling this will ensure there is only one active controller manager.\n      --listen string                 The port the webhook listens. (default ":8080")\n      --metrics-bind-address string   The address the metric endpoint binds to. (default ":8081")\n      --namespace string              namespace to watch (default "cattle-fleet-system")\n')),(0,a.yg)("h3",{id:"options-inherited-from-parent-commands"},"Options inherited from parent commands"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre"},"      --disable-gitops    disable gitops components\n      --disable-metrics   disable metrics\n      --shard-id string   only manage resources labeled with a specific shard ID\n")),(0,a.yg)("h3",{id:"see-also"},"SEE ALSO"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("a",{parentName:"li",href:"./fleet-manager"},"fleet-manager"),"\t -")))}p.isMDXComponent=!0}}]);