import{af as c,U as i,S as m,ag as l,a0 as p,z as u}from"./CUKDSDKu.js";import{u as d}from"./C7yRjRX2.js";import{c as f}from"./y5KrdXgy.js";function S(a,s){const{title:e,titleTemplate:t,...n}=a;return d({title:e,titleTemplate:t,_flatMeta:n},{...s,transform(r){const o=c({...r._flatMeta});return delete r._flatMeta,{...r,meta:o}}})}const C=i()({name:"VCardActions",props:m(),setup(a,s){let{slots:e}=s;return l({VBtn:{slim:!0,variant:"text"}}),p(()=>{var t;return u("div",{class:["v-card-actions",a.class],style:a.style},[(t=e.default)==null?void 0:t.call(e)])}),{}}}),_=f("v-spacer","div","VSpacer");export{_ as V,C as a,S as u};