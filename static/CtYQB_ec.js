const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./TiEIOpVK.js","./BORQtvDy.js","./Bo9Y2Pl6.js","./DXqIG5h6.js","./entry.5sh4-81E.css","./VAvatar.CJWBDG6p.css","./VDivider.D4mQKusJ.css","./VSheet.BoVrR00i.css","./DbQADFZB.js","./TXdUHm-A.js","./VDialog.Dn3KEzOw.css","./Dwrxqcka.js","./FH5iFDyH.js","./G5iCGz0r.js","./VSpacer.D0S0a0cH.css","./BC5ghwX7.js","./VCard.8Js4-u2y.css","./qGR58XmQ.js","./DDZGMRPx.js","./BYk5bUkz.js","./VTooltip.DMbNlmg7.css","./VLazy.CvH8ekHL.css","./CqifZKDs.js","./DataTable.Baj7w4oj.css","./BJJCbrzK.js"])))=>i.map(i=>d[i]);
import{R as Be,U as Pe,aX as Re,W as b,i as O,af as ae,a8 as Ce,a2 as Fe,z as r,ag as M,Q as T,d as Ee,r as Ae,J as Oe,I as Ge,t as m,v as p,K as le,M as V,A as d,x as k,F as K,C as W,E as C,b5 as oe,b6 as re,y as S,D as F,G as E,B as A,b7 as Ne,N as J,O as Q,_ as He}from"./DXqIG5h6.js";import{u as Le,d as se,n as _}from"./BORQtvDy.js";import $e from"./BJJCbrzK.js";import{V as X,g as ze}from"./Bo9Y2Pl6.js";import{b as Ue}from"./BYk5bUkz.js";import{m as je,a as Me,c as Ke,b as We,d as Je,u as Qe,p as Xe,e as Ye,f as qe,g as Ze,h as et,i as tt,j as at,V as ie,k as ne,l as de,n as lt}from"./BhludOfS.js";import{m as ot,b as rt,u as st,c as it,d as nt}from"./Cvs29Zxg.js";import{a as dt,V as ct}from"./BC5ghwX7.js";import{V as ut}from"./FH5iFDyH.js";import"./C6wayqaZ.js";import"./B-2XHWvZ.js";import"./G5iCGz0r.js";const mt=Be({...je(),...Me(),...ot(),...rt()},"VDataTableVirtual"),ht=Pe()({name:"VDataTableVirtual",props:mt(),emits:{"update:modelValue":e=>!0,"update:sortBy":e=>!0,"update:options":e=>!0,"update:groupBy":e=>!0,"update:expanded":e=>!0},setup(e,G){let{attrs:N,slots:l}=G;const{groupBy:f}=Ke(e),{sortBy:n,multiSort:H,mustSort:I}=We(e),{disableSort:D}=Re(e),{columns:i,headers:B,filterFunctions:L,sortFunctions:$,sortRawFunctions:z}=Je(e,{groupBy:f,showSelect:b(e,"showSelect"),showExpand:b(e,"showExpand")}),{items:h}=Qe(e,i),P=b(e,"search"),{filteredItems:a}=st(e,h,P,{transform:u=>u.columns,customKeyFilter:L}),{toggleSort:s}=Xe({sortBy:n,multiSort:H,mustSort:I}),{sortByWithGroups:o,opened:t,extractRows:c,isGroupOpen:v,toggleGroup:w}=Ye({groupBy:f,sortBy:n,disableSort:D}),{sortedItems:Y}=qe(e,a,o,{transform:u=>({...u.raw,...u.columns}),sortFunctions:$,sortRawFunctions:z}),{flatItems:U}=Ze(Y,f,t),R=O(()=>c(U.value)),{isSelected:ce,select:ue,selectAll:me,toggleSelect:he,someSelected:ve,allSelected:ye}=et(e,{allItems:R,currentPage:R}),{isExpanded:fe,toggleExpand:be}=tt(e),{containerRef:ge,markerRef:pe,paddingTop:ke,paddingBottom:_e,computedItems:we,handleItemResize:xe,handleScroll:Ve,handleScrollend:Se}=it(e,U),Te=O(()=>we.value.map(u=>u.raw));at({sortBy:n,page:ae(1),itemsPerPage:ae(-1),groupBy:f,search:P}),Ce({VDataTableRows:{hideNoData:b(e,"hideNoData"),noDataText:b(e,"noDataText"),loading:b(e,"loading"),loadingText:b(e,"loadingText")}});const x=O(()=>({sortBy:n.value,toggleSort:s,someSelected:ve.value,allSelected:ye.value,isSelected:ce,select:ue,selectAll:me,toggleSelect:he,isExpanded:fe,toggleExpand:be,isGroupOpen:v,toggleGroup:w,items:R.value.map(u=>u.raw),internalItems:R.value,groupedItems:U.value,columns:i.value,headers:B.value}));Fe(()=>{const u=ie.filterProps(e),Ie=ne.filterProps(e),De=de.filterProps(e);return r(de,T({class:["v-data-table",{"v-data-table--loading":e.loading},e.class],style:e.style},De),{top:()=>{var y;return(y=l.top)==null?void 0:y.call(l,x.value)},wrapper:()=>{var y,q,Z;return r("div",{ref:ge,onScrollPassive:Ve,onScrollend:Se,class:"v-table__wrapper",style:{height:M(e.height)}},[r("table",null,[(y=l.colgroup)==null?void 0:y.call(l,x.value),!e.hideDefaultHeader&&r("thead",{key:"thead"},[r(ie,T(u,{sticky:e.fixedHeader}),l)]),!e.hideDefaultBody&&r("tbody",null,[r("tr",{ref:pe,style:{height:M(ke.value),border:0}},[r("td",{colspan:i.value.length,style:{height:0,border:0}},null)]),(q=l["body.prepend"])==null?void 0:q.call(l,x.value),r(ne,T(N,Ie,{items:Te.value}),{...l,item:g=>r(nt,{key:g.internalItem.index,renderless:!0,"onUpdate:height":j=>xe(g.internalItem.index,j)},{default:j=>{var te;let{itemRef:ee}=j;return((te=l.item)==null?void 0:te.call(l,{...g,itemRef:ee}))??r(lt,T(g.props,{ref:ee,key:g.internalItem.index,index:g.internalItem.index}),l)}})}),(Z=l["body.append"])==null?void 0:Z.call(l,x.value),r("tr",{style:{height:M(_e.value),border:0}},[r("td",{colspan:i.value.length,style:{height:0,border:0}},null)])])])])},bottom:()=>{var y;return(y=l.bottom)==null?void 0:y.call(l,x.value)}})})}}),vt=["colspan","rowSpan","onClick"],yt=["onClick"],ft={class:"d-flex justify-space-between"},bt=Ee({__name:"AlchemyFav",setup(e){const G=J({loader:()=>Q(()=>import("./TiEIOpVK.js").then(a=>a.a),__vite__mapDeps([0,1,2,3,4,5,6,7]),import.meta.url)}),N=J({loader:()=>Q(()=>import("./DbQADFZB.js"),__vite__mapDeps([8,3,4,9,1,2,5,6,10,11,12,13,14,15,16]),import.meta.url)}),l=J({loader:()=>Q(()=>import("./qGR58XmQ.js").then(a=>a.A),__vite__mapDeps([17,3,4,18,2,5,1,6,12,13,14,19,20,21,0,7,8,9,10,11,15,16,22,23,24]),import.meta.url)}),f=Le(),n=$e(),H=[{title:"名稱",key:"name",width:"150px"},{title:"利潤",key:"profit"},{title:"產量",width:"210px",children:[{title:"一般產物",key:"yield.regular",width:"90px"},{title:"稀有產物",key:"yield.rare",width:"90px"}]},{title:"製作時間(分鐘)",key:"time"},{title:"每小時產值",key:"hourlyProfit"},{title:"功能",key:"actions",sortable:!1,width:"100px"}].map(a=>(a.children&&a.children.forEach(s=>s.align="center"),{...a,align:"center"}));function I(){return n.recipes.map((a,s)=>{var c;const o=n.hourly(s),t=n.cost(s);return{name:a.name,profit:_(n.allIncomes(s).total-t,0),time:_(a.timeCost,0),yield:{regular:_(a.num,1),rare:a.rareProd?_(a.rareProd.num,1):null},hourlyProfit:_(o.profit+(((c=o.rareProd)==null?void 0:c.profit)??0)-o.cost,0),hourlyYield:_(o.yield,0)}})}const D=Ae(I());Oe(()=>[n.recipes,f.alchemy,f.profitMargin],()=>{D.value=I()},{deep:!0});const i=Ge({activity:!1,title:null,action:null,idx:null,callback:null}),B=a=>{a==="confirm"&&i.callback!==null&&i.callback(i.idx),Object.assign(i,{activity:!1})},L=a=>{Object.assign(i,{activity:!0,title:"覆蓋表單?",action:"edit",idx:a,callback:n.overrideCurrent})},$=a=>{Object.assign(i,{activity:!0,title:"確定移除?",action:"del",idx:a,callback:n.removeRecipe})},z=a=>{Object.assign(i,{activity:!0,title:"詳細資訊",action:"info",idx:a,callback:null})},h=O(()=>i.action==="info"),P=[{tooltip:"編輯(覆蓋表單)",icon:"editable",callback:L},{tooltip:"刪除",icon:"delete",callback:$},{tooltip:"詳細資訊",icon:"info",callback:z}];return(a,s)=>(m(),p("div",null,[s[0]||(le(-1,!0),(s[0]=r(V(G),{tag:"h3",title:"我的最愛",icon:"favorite",color:"title"})).cacheIndex=0,le(1),s[0]),r(ht,{class:"flex-1-1 h-0 bg-surface",headers:V(H),items:D.value,"fixed-header":"",hover:""},{headers:d(o=>[k("tr",null,[(m(!0),p(K,null,W(o.headers[0],(t,c)=>{var v,w;return m(),p("th",{key:t.title,colspan:t.children?2:1,rowSpan:t.children?1:2,class:C(["v-data-table-column--align-center","v-data-table__th","v-data-table__th--sortable",o.isSorted(t)?"v-data-table__th--sorted":"","header-item bg-content"]),style:oe({width:t.width,borderLeft:c===0?"none":void 0}),onClick:re(Y=>o.toggleSort(t),["stop"])},[k("span",null,S(t.title),1),t.sortable!==!1?(m(),F(X,{key:0,class:"v-data-table-header__sort-icon sort-icon",icon:((v=o.sortBy[0])==null?void 0:v.key)===t.key&&((w=o.sortBy[0])==null?void 0:w.order)==="desc"?"mdi-arrow-down":"mdi-arrow-up"},null,8,["icon"])):E("",!0)],14,vt)}),128))]),k("tr",null,[(m(!0),p(K,null,W(o.headers[1],t=>{var c,v;return m(),p("th",{key:t.title,colspan:"1",rowSpan:1,class:C(["v-data-table-column--align-center","v-data-table__th","v-data-table__th--sortable",o.isSorted(t)?"v-data-table__th--sorted":"","header-item bg-content"]),style:oe({width:t.width}),onClick:re(w=>o.toggleSort(t),["stop"])},[k("span",null,S(t.title),1),t.sortable!==!1?(m(),F(X,{key:0,class:"v-data-table-header__sort-icon sort-icon",icon:((c=o.sortBy[0])==null?void 0:c.key)===t.key&&((v=o.sortBy[0])==null?void 0:v.order)==="desc"?"mdi-arrow-down":"mdi-arrow-up"},null,8,["icon"])):E("",!0)],14,yt)}),128))])]),"item.actions":d(({index:o})=>[k("div",ft,[(m(),p(K,null,W(P,t=>r(Ue,{key:t.icon,location:"top",eager:!1},{activator:d(({props:c})=>[r(X,T({ref_for:!0},c,{icon:V(ze)(t.icon),onClick:v=>t.callback(o)}),null,16,["icon","onClick"])]),default:d(()=>[A(" "+S(t.tooltip),1)]),_:2},1024)),64))])]),bottom:d(()=>s[4]||(s[4]=[k("div",{class:"bg-content rounded-b-lg",style:{"min-height":"40px"}},null,-1)])),_:1},8,["headers","items"]),i.activity?(m(),F(V(N),{key:0,modelValue:i.activity,"onUpdate:modelValue":s[3]||(s[3]=o=>i.activity=o),height:h.value?500:void 0},Ne({title:d(()=>[r(ct,{class:C(["font-weight-bold px-4 py-2 my-0",h.value?"bg-title":""])},{default:d(()=>[A(S(i.title),1)]),_:1},8,["class"])]),actions:d(()=>[r(ut),r(se,{onClick:s[1]||(s[1]=o=>B("cancel"))},{default:d(()=>[A(S(h.value?"關閉":"取消"),1)]),_:1}),h.value?E("",!0):(m(),F(se,{key:0,onClick:s[2]||(s[2]=o=>B("confirm"))},{default:d(()=>s[5]||(s[5]=[A(" 確定 ")])),_:1}))]),_:2},[h.value?{name:"text",fn:d(()=>[r(dt,{class:C(["column-flow flex-1-1 ga-3 px-2 py-3 overflow-y-auto",h.value?"bg-content":""]),style:{height:"0"}},{default:d(()=>[r(V(l),{idx:i.idx??0},null,8,["idx"])]),_:1},8,["class"])]),key:"0"}:void 0]),1032,["modelValue","height"])):E("",!0)]))}}),Pt=Object.assign(He(bt,[["__scopeId","data-v-9ad0ff20"]]),{__name:"AlchemyFav"});export{Pt as default};
