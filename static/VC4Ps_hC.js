import{af as f,d as c}from"./DXqIG5h6.js";function d(t,n){if(typeof Symbol<"u"){const e={...t};return Object.defineProperty(e,Symbol.iterator,{enumerable:!1,value(){let o=0;return{next:()=>({value:n[o++],done:o>n.length})}}}),e}else return Object.assign([...n],t)}typeof WorkerGlobalScope<"u"&&globalThis instanceof WorkerGlobalScope;function p(t){const n=Object.create(null);return e=>n[e]||(n[e]=t(e))}const b=/-(\w)/g,m=p(t=>t.replace(b,(n,e)=>e?e.toUpperCase():""));function y(t={}){const{inheritAttrs:n=!0}=t,e=f(),o=c({setup(s,{slots:l}){return()=>{e.value=l.default}}}),a=c({inheritAttrs:n,setup(s,{attrs:l,slots:i}){return()=>{var u;e.value;const r=(u=e.value)==null?void 0:u.call(e,{...h(l),$slots:i});return n&&(r==null?void 0:r.length)===1?r[0]:r}}});return d({define:o,reuse:a},[o,a])}function h(t){const n={};for(const e in t)n[m(e)]=t[e];return n}export{y as c};