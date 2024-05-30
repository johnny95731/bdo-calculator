const __vite__fileDeps=["./TheDialog-CzgpP-Bg.js","./TheDialog.vue_vue_type_script_setup_true_lang-Di-3ecDA.js","./VDialog-6Fd2q5zs.js","./index-CyQvApnK.js","./index-CJRCcq6m.css","./VDialog-CSuU2VW-.css","./MPResult-DRtqk8nC.js","./ExpansionPanel-BW-gqJtl.js","./ExpansionPanel-BqEw9TtZ.css","./DataTable-PPssR5ae.js","./DataTable-CJ7D-dFE.css"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
import{d as W,bv as X,g as ee,B as ae,C as b,D as z,a9 as te,h as le,o as v,c as y,w as i,v as M,b as o,k as f,a as V,j as w,F as R,E as N,bw as oe,n as I,bx as se,t as _,l as j,I as S,m as ie,p as ne,e as h,ab as re,af as L,Z as p,ad as ce,ae as ue,by as de,bp as ve,bq as me,ah as fe,ai as G,aj as O,A as C,bz as g,r as D}from"./index-CyQvApnK.js";import{_ as pe,a as be}from"./ExpansionPanel-BW-gqJtl.js";import{V as ge}from"./VDataTable-dodxSJ7s.js";import{V as ke}from"./VTooltip-BOZ_ktLx.js";import{a as ye}from"./filter-BvXrCLne.js";const _e={class:"bg-content"},he=["onClick"],Ce={class:"d-flex justify-space-between"},P=10,xe=W({__name:"MPFavs",setup(Ve){X(l=>({"279bbedf":F.value}));const U=G({loader:()=>O(()=>import("./TheDialog-CzgpP-Bg.js"),__vite__mapDeps([0,1,2,3,4,5]),import.meta.url)}),Y=G({loader:()=>O(()=>import("./MPResult-DRtqk8nC.js"),__vite__mapDeps([6,3,4,7,8,9,10]),import.meta.url)}),$=ee(),n=ae(),s=b(1),F=b(1);function T(l){const t=Math.ceil(n.recipes.length/P);F.value=l!==t?P:n.recipes.length%P}T(s.value),z(s,l=>T(l));const q=[{title:"名稱",key:"name",width:"150px"},{title:"總利潤",key:"profit"},{title:"加工時間(分鐘)",key:"time"},{title:"每小時產值",key:"hourlyProfit"},{title:"功能",key:"actions",sortable:!1,width:"100px"}].map(l=>({...l,align:"center",class:"bg-black"}));function B(){return n.recipes.map((l,t)=>{const e=n.hourly(t,2).reduce((r,u)=>(r.profit+=u.profitFromRaw,r.yield+=u.yieldFromRaw,r),{profit:0,yield:0}),a=n.timeCost(t);return{name:l.name,profit:C(n.allIncomes(t).tier2),time:C(a[0]+a[1]),hourlyProfit:C(e.profit),hourlyYield:C(e.yield)}})}const k=b(B());function A(){return n.recipes.map((l,t)=>{const e=(()=>{const[u,x]=n.timeCost(t);return[u,x,u+x]})(),a=n.hourly(t,1),r=n.allIncomes(t);return[{class:"text-grey-darken-1",textSize:"h6",label:"基本材料",value:""},{label:"出售利潤",value:r.raw},{label:"總數量",value:g(l.raw,"num")},{class:"mt-3 text-grey-darken-1",textSize:"h6",label:"一階加工",value:""},{label:"利潤",value:r.tier1},{label:"加工時間",value:`${D(e[0])}分鐘`},{label:"估計產量",value:g(l.tier1,"num")},{label:"每小時產值",value:g(a,"profit")},{label:"每小時產量",value:g(a,"yield")},{class:"mt-3 text-grey-darken-1",textSize:"h6",label:"二階加工",value:""},{label:"加工利潤",value:r.tier2},{label:"加工時間",value:`${D(e[1])}分鐘`},{label:"估計產量",value:g(l.tier2,"num")},{label:"從原料加工",value:`${D(e[0]+e[1])}分鐘`},{label:"每小時產值",value:k.value[t].hourlyProfit},{label:"每小時產量",value:k.value[t].hourlyYield}]})}const H=b(A());z(()=>[n.recipes,$.avgCraft,$.profitMargin],()=>{k.value=B(),H.value=A()},{deep:!0});const d=b(!1),c=te({title:null,action:null,idx:null,callback:null}),E=l=>{l==="confirm"&&c.callback!==null&&c.callback(c.idx),d.value=!1},Z=l=>{Object.assign(c,{title:"覆蓋表單?",action:"edit",idx:l,callback:n.overrideCurrent}),d.value=!0},J=l=>{Object.assign(c,{title:"確定移除?",action:"del",idx:l,callback:n.removeFav}),d.value=!0},K=l=>{Object.assign(c,{title:"詳細資訊",action:"info",idx:l,callback:null}),d.value=!0},m=le(()=>c.action==="info"),Q=[{tooltip:"編輯(覆蓋表單)",icon:"editable",callback:Z},{tooltip:"刪除",icon:"delete",callback:J},{tooltip:"詳細資訊",icon:"info",callback:K}];return(l,t)=>(v(),y(fe,{fluid:"",class:"d-flex"},{default:i(()=>[t[0]||(M(-1),t[0]=o(pe,{tag:"h3",title:"我的最愛",icon:"favorite",color:"title"}),M(1),t[0]),o(ge,{class:"flex-1-1 bg-surface",headers:f(q),items:k.value,page:s.value},{headers:i(e=>[V("tr",_e,[(v(!0),w(R,null,N(e.columns,a=>{var r,u;return v(),w("th",{key:a.title,onClick:oe(x=>e.toggleSort(a),["stop"]),class:I(["v-data-table-column--align-center","v-data-table__th","v-data-table__th--sortable",e.isSorted(a)?"v-data-table__th--sorted":""]),style:se({width:a.width})},[V("span",null,_(a.title),1),a.sortable!==!1?(v(),y(j,{key:0,class:"v-data-table-header__sort-icon sort-icon",icon:((r=e.sortBy[0])==null?void 0:r.key)===a.key&&((u=e.sortBy[0])==null?void 0:u.order)==="desc"?"mdi-arrow-down":"mdi-arrow-up"},null,8,["icon"])):S("",!0)],14,he)}),128))])]),"item.actions":i(({index:e})=>[V("div",Ce,[(v(),w(R,null,N(Q,a=>o(ke,{key:a.icon,location:"top",eager:!1},{activator:i(({props:r})=>[o(j,ie(r,{icon:f(ne)(a.icon),onClick:u=>a.callback(e)}),null,16,["icon","onClick"])]),default:i(()=>[h(" "+_(a.tooltip),1)]),_:2},1024)),64))])]),bottom:i(e=>[o(re,{class:"bg-content rounded-b-lg",divided:""},{default:i(()=>[o(L),o(ye,{class:"flex-0-0 mr-2 align-self-center",density:"compact",variant:"plain",modelValue:e.page,items:[...Array(e.pageCount).keys()].map(a=>a+1),"onUpdate:modelValue":t[1]||(t[1]=a=>s.value=a)},null,8,["modelValue","items"]),o(p,{icon:"mdi-page-first",variant:"text",size:"large",disabled:s.value===1,onClick:t[2]||(t[2]=a=>s.value=1)},null,8,["disabled"]),o(p,{icon:"mdi-chevron-left",variant:"text",disabled:s.value===1,onClick:a=>{s.value=f(ce)(s.value,e.pageCount)}},null,8,["disabled","onClick"]),o(p,{icon:"mdi-chevron-right",variant:"text",disabled:s.value===e.pageCount,onClick:a=>s.value=f(ue)(s.value,e.pageCount)},null,8,["disabled","onClick"]),o(p,{icon:"mdi-page-last",variant:"text",disabled:s.value===e.pageCount,onClick:a=>s.value=e.pageCount},null,8,["disabled","onClick"])]),_:2},1024)]),_:1},8,["headers","items","page"]),d.value?(v(),y(f(U),{key:0,modelValue:d.value,"onUpdate:modelValue":t[5]||(t[5]=e=>d.value=e),height:m.value?500:void 0},de({title:i(()=>[o(ve,{class:I(["font-weight-bold px-4 py-2 my-0",m.value?"bg-title":""])},{default:i(()=>[h(_(c.title),1)]),_:1},8,["class"])]),actions:i(()=>[o(L),o(p,{onClick:t[3]||(t[3]=e=>E("cancel"))},{default:i(()=>[h(_(m.value?"關閉":"取消"),1)]),_:1}),m.value?S("",!0):(v(),y(p,{key:0,onClick:t[4]||(t[4]=e=>E("confirm"))},{default:i(()=>[h(" 確定 ")]),_:1}))]),_:2},[m.value?{name:"text",fn:i(()=>[o(me,{class:I(["column-flow flex-1-1 ga-3 px-2 py-3 overflow-y-auto",m.value?"bg-content":""]),style:{height:"0"}},{default:i(()=>[o(f(Y),{idx:c.idx??0},null,8,["idx"])]),_:1},8,["class"])]),key:"0"}:void 0]),1032,["modelValue","height"])):S("",!0)]),_:1}))}}),$e=be(xe,[["__scopeId","data-v-9e6585a8"]]);export{$e as default};
