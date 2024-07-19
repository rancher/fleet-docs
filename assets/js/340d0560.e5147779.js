"use strict";(self.webpackChunkfleet_docs=self.webpackChunkfleet_docs||[]).push([[3441],{5680:(e,t,n)=>{n.d(t,{xA:()=>u,yg:()=>d});var r=n(6540);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),s=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=s(e.components);return r.createElement(c.Provider,{value:t},e.children)},f="mdxType",g={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},p=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,l=e.originalType,c=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),f=s(n),p=a,d=f["".concat(c,".").concat(p)]||f[p]||g[p]||l;return n?r.createElement(d,o(o({ref:t},u),{},{components:n})):r.createElement(d,o({ref:t},u))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=n.length,o=new Array(l);o[0]=p;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i[f]="string"==typeof e?e:a,o[1]=i;for(var s=2;s<l;s++)o[s]=n[s];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}p.displayName="MDXCreateElement"},5496:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>g,frontMatter:()=>l,metadata:()=>i,toc:()=>s});var r=n(8168),a=(n(6540),n(5680));const l={title:"",sidebar_label:"fleet-agent"},o=void 0,i={unversionedId:"cli/fleet-agent/fleet-agent",id:"cli/fleet-agent/fleet-agent",title:"",description:"fleet-agent",source:"@site/docs/cli/fleet-agent/fleet-agent.md",sourceDirName:"cli/fleet-agent",slug:"/cli/fleet-agent/",permalink:"/cli/fleet-agent/",draft:!1,editUrl:"https://github.com/rancher/fleet-docs/edit/main/docs/cli/fleet-agent/fleet-agent.md",tags:[],version:"current",lastUpdatedAt:1721380485,formattedLastUpdatedAt:"Jul 19, 2024",frontMatter:{title:"",sidebar_label:"fleet-agent"},sidebar:"docs",previous:{title:"Create a Bundle Resource",permalink:"/bundle-add"},next:{title:"fleet-agent clusterstatus",permalink:"/cli/fleet-agent/fleet-agent_clusterstatus"}},c={},s=[{value:"fleet-agent",id:"fleet-agent",level:2},{value:"Options",id:"options",level:3},{value:"SEE ALSO",id:"see-also",level:3}],u={toc:s},f="wrapper";function g(e){let{components:t,...n}=e;return(0,a.yg)(f,(0,r.A)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,a.yg)("h2",{id:"fleet-agent"},"fleet-agent"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre"},"fleet-agent [flags]\n")),(0,a.yg)("h3",{id:"options"},"Options"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre"},"      --agent-scope string                An identifier used to scope the agent bundleID names, typically the same as namespace\n      --debug                             Turn on debug logging\n      --debug-level int                   If debugging is enabled, set klog -v=X\n  -h, --help                              help for fleet-agent\n      --kubeconfig string                 Paths to a kubeconfig. Only required if out-of-cluster.\n      --namespace string                  system namespace is the namespace, the agent runs in, e.g. cattle-fleet-system\n      --zap-devel                         Development Mode defaults(encoder=consoleEncoder,logLevel=Debug,stackTraceLevel=Warn). Production Mode defaults(encoder=jsonEncoder,logLevel=Info,stackTraceLevel=Error) (default true)\n      --zap-encoder encoder               Zap log encoding (one of 'json' or 'console')\n      --zap-log-level level               Zap Level to configure the verbosity of logging. Can be one of 'debug', 'info', 'error', or any integer value > 0 which corresponds to custom debug levels of increasing verbosity\n      --zap-stacktrace-level level        Zap Level at and above which stacktraces are captured (one of 'info', 'error', 'panic').\n      --zap-time-encoding time-encoding   Zap time encoding (one of 'epoch', 'millis', 'nano', 'iso8601', 'rfc3339' or 'rfc3339nano'). Defaults to 'epoch'.\n")),(0,a.yg)("h3",{id:"see-also"},"SEE ALSO"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("a",{parentName:"li",href:"./fleet-agent_clusterstatus"},"fleet-agent clusterstatus"),"\t - Continuously report resource status to the upstream cluster"),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("a",{parentName:"li",href:"./fleet-agent_register"},"fleet-agent register"),"\t - Register agent with an upstream cluster")))}g.isMDXComponent=!0}}]);