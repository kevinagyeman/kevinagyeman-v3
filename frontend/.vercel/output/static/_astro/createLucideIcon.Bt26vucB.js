import{r as s}from"./index.BmnMO-Wv.js";const g="https://kevinagyeman-v3.onrender.com/api/projects",v="https://kevinagyeman-v3.onrender.com/api/v1/auth",E="https://kevinagyeman-v3.onrender.com/api/information",I="/admin/dashboard",L=1*1024*1024;/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),h=t=>t.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,r,o)=>o?o.toUpperCase():r.toLowerCase()),i=t=>{const e=h(t);return e.charAt(0).toUpperCase()+e.slice(1)},m=(...t)=>t.filter((e,r,o)=>!!e&&e.trim()!==""&&o.indexOf(e)===r).join(" ").trim(),C=t=>{for(const e in t)if(e.startsWith("aria-")||e==="role"||e==="title")return!0};/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var _={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=s.forwardRef(({color:t="currentColor",size:e=24,strokeWidth:r=2,absoluteStrokeWidth:o,className:n="",children:a,iconNode:p,...c},l)=>s.createElement("svg",{ref:l,..._,width:e,height:e,stroke:t,strokeWidth:o?Number(r)*24/Number(e):r,className:m("lucide",n),...!a&&!C(c)&&{"aria-hidden":"true"},...c},[...p.map(([d,u])=>s.createElement(d,u)),...Array.isArray(a)?a:[a]]));/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R=(t,e)=>{const r=s.forwardRef(({className:o,...n},a)=>s.createElement(f,{ref:a,iconNode:e,className:m(`lucide-${A(i(t))}`,`lucide-${t}`,o),...n}));return r.displayName=i(t),r};export{v as A,I as D,E as I,L as M,g as P,R as c};
