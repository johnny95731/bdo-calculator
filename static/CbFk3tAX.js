const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./DbQADFZB.js","./DXqIG5h6.js","./entry.5sh4-81E.css","./TXdUHm-A.js","./BORQtvDy.js","./Bo9Y2Pl6.js","./VAvatar.CJWBDG6p.css","./VDivider.D4mQKusJ.css","./VDialog.Dn3KEzOw.css","./Dwrxqcka.js","./FH5iFDyH.js","./G5iCGz0r.js","./VSpacer.D0S0a0cH.css","./BC5ghwX7.js","./VCard.8Js4-u2y.css","./Cp3vQNwO.js","./TiEIOpVK.js","./VSheet.BoVrR00i.css","./Br4RmK0I.js","./BhludOfS.js","./Cvs29Zxg.js","./BYk5bUkz.js","./VTooltip.DMbNlmg7.css","./C6wayqaZ.js","./VMenu.C20d_WXR.css","./B-2XHWvZ.js","./VSlideGroup.BsYIg1rJ.css","./filter.BlnvcX2D.css","./VDataTable.CGRkVslf.css","./B2VOzmSH.js","./MPFavs.BbaR9kBg.css","./ZMHoHgMW.js","./CqifZKDs.js","./DataTable.Baj7w4oj.css"])))=>i.map(i=>d[i]);
import{d as Z,t as i,D as P,A as n,z as e,M as o,i as B,r as A,J as ie,v as y,x as Y,B as z,y as O,F as x,C as G,P as te,Q as ce,G as j,E as ve,K as I,R as fe,S as ge,T as ye,U as de,V as Ve,I as be,W as le,N as Q,O as X}from"./DXqIG5h6.js";import J from"./LWoSWI-m.js";import{V as L,E as xe,R as W}from"./TiEIOpVK.js";import{C as _,c as we,u as ke,V as ae,a as oe,b as q}from"./DDZGMRPx.js";import{I as me}from"./BUqNHsce.js";import ee from"./Br4RmK0I.js";import{V as w,b as K}from"./BYk5bUkz.js";import{c as Ce}from"./VC4Ps_hC.js";import{n as Ie,r as ne,m as Re,e as Te,f as he,g as Pe,V as Se,d as M,p as Ue,h as $e,c as Ne,i as se}from"./BORQtvDy.js";import{V as Ee,g as Ge,m as Fe}from"./Bo9Y2Pl6.js";import{V as ue,a as Be}from"./Cvs29Zxg.js";import{V as De}from"./C6wayqaZ.js";import{u as Me,a as Oe,V as Ae}from"./FH5iFDyH.js";import{V as ze,a as je}from"./D1ogLJnA.js";import{V as Le}from"./B2VOzmSH.js";import"./BaAJO5sB.js";import"./B-2XHWvZ.js";import"./G5iCGz0r.js";const He=Z({__name:"TheRaw",props:{idx:{},raw:{}},setup(V){const g=ee();return(d,l)=>(i(),P(L,{class:"d-flex align-center my-3 ps-5 pe-3 pt-5 pb-4 ga-2",rounded:"xl"},{default:n(()=>[e(me,{class:"name-input",density:"compact","model-value":d.raw.name,onChange:l[0]||(l[0]=s=>o(g).updateName(0,d.idx,s||""))},null,8,["model-value"]),e(w,{label:"數量",density:"compact",type:"number",inputmode:"decimal",min:"0","model-value":d.raw.num,"onUpdate:modelValue":l[1]||(l[1]=s=>o(g).updateRaw("num",d.idx,s))},null,8,["model-value"]),e(w,{label:"售出價",density:"compact",type:"number",inputmode:"decimal",min:"0","model-value":d.raw.price,"onUpdate:modelValue":l[2]||(l[2]=s=>o(g).updateRaw("price",d.idx,s))},{default:n(()=>[e(K,{activator:"parent",location:"top"},{default:n(()=>[e(J,{title:"實際領取",value:d.raw.unitProfit},null,8,["value"])]),_:1})]),_:1},8,["model-value"]),e(w,{label:"成本",density:"compact",type:"number",inputmode:"decimal",min:"0","model-value":d.raw.cost,"onUpdate:modelValue":l[3]||(l[3]=s=>o(g).updateRaw("cost",d.idx,s))},null,8,["model-value"]),e(_,{type:"close",onClick:l[4]||(l[4]=s=>o(g).removeGoods(0,d.idx))})]),_:1}))}}),We=Object.assign(He,{__name:"MassProcessingTheRaw"}),qe={style:{width:"3.1em","text-align-last":"justify"}},_e={key:1,class:"text-caption"},Je=Z({__name:"TheProduct",props:{idx:{},product:{},lowTierNames:{},selectedRaws:{},tier:{},hourlyInfo:{}},setup(V){const[g,d]=Ce(),l=V,s=ee(),E=B(()=>{const{num:c,unitProfit:m,cost:r,timeCost:b}=l.product,k=[{title:"利潤",value:ne(c*(m-r))},{title:"成本",value:ne(r),unit:"/個"},{title:"產量",value:c},{title:"",value:b,unit:"分鐘"}],U=[...l.tier===2?[{title:"產值(從原料)",value:l.hourlyInfo.profitFromRaw-l.hourlyInfo.costFromRaw},{title:"產量(從原料)",value:l.hourlyInfo.yieldFromRaw}]:[],{title:"產值",value:l.hourlyInfo.profit},{title:"產量",value:l.hourlyInfo.yield},{title:"加工",value:l.hourlyInfo.crafts,unit:"份"}];return[k,U]}),u=B(()=>l.product.raw.map(c=>c.name)),S=A([]),R=A([]),h=()=>{R.value=[],S.value=l.lowTierNames.filter(c=>{const m=u.value.includes(c);return!l.selectedRaws.includes(c)||m?(R.value.push(m),!0):!1})};return h(),ie(()=>[u.value,l.selectedRaws,l.lowTierNames],()=>{h()},{deep:!0}),(c,m)=>(i(),y(x,null,[e(o(g),null,{default:n(({label:r,tooltip:b,chips:k})=>[e(L,{class:"d-flex align-center px-2 py-1 ga-2 text-caption"},{default:n(()=>[Y("span",qe,[z(O(r)+" ",1),e(K,{activator:"parent",text:b},null,8,["text"])]),(i(!0),y(x,null,G(k,({title:U,value:f,unit:v},D,H,$)=>{const N=[f];if($&&$.key===U&&te($,N))return $;const F=(i(),P(ue,{key:U,size:"small",variant:"outlined",density:"compact"},{default:n(()=>[z(O(`${U} ${typeof f=="number"?o(Ie)(f):f}${v||""}`),1)]),_:2},1024));return F.memo=N,F},m,0),128))]),_:2},1024)]),_:1}),e(L,{class:"my-3 ps-3 pe-1 pt-4 pb-4 ga-2",rounded:"xl"},{default:n(()=>[e(o(d),{label:"產出",tooltip:"從原料數量估計",chips:E.value[0]},null,8,["chips"]),e(o(d),{label:"每小時",tooltip:"從平均產出及大量加工時間估計。",chips:E.value[1]},null,8,["chips"]),e(L,{class:"d-flex align-end px-2 py-1 ga-3"},{default:n(()=>[e(me,{class:"name-input",density:"compact","model-value":c.product.name,onChange:m[2]||(m[2]=r=>o(s).updateName(c.tier,l.idx,r||""))},null,8,["model-value"]),e(Be,{class:"flex-1-1","bg-color":"surface",multiple:"",rounded:"lg",density:"compact",label:"原料",items:S.value,"model-value":u.value},{item:n(({index:r,item:b,props:k})=>[e(De,ce(k,{title:"",variant:"flat"}),{default:n(()=>[e(we,{label:k.title,density:"compact",modelValue:R.value[r],"onUpdate:modelValue":U=>o(s).updateRawOfProduct(l.tier,l.idx,!R.value[r],b.value)},null,8,["label","modelValue","onUpdate:modelValue"])]),_:2},1040)]),selection:n(({item:r,index:b})=>[b<1?(i(),P(ue,{key:0,density:"compact",size:"small"},{default:n(()=>[z(O(r.title),1)]),_:2},1024)):j("",!0),b===1?(i(),y("span",_e," (+"+O(l.product.raw.length-1)+" others) ",1)):j("",!0)]),_:1},8,["items","model-value"]),e(w,{label:"平均成品數量",class:"product-input",type:"number",inputmode:"decimal",step:"0.1",min:"0",density:"compact","model-value":c.product.avgyield,"onUpdate:modelValue":m[3]||(m[3]=r=>o(s).updateProduct("avgyield",l.tier,l.idx,r))},null,8,["model-value"]),e(w,{label:"售出價",class:ve("product-input"),type:"number",inputmode:"decimal",min:"0",density:"compact","model-value":c.product.price,"onUpdate:modelValue":m[4]||(m[4]=r=>o(s).updateProduct("price",l.tier,l.idx,r))},{default:n(()=>[e(K,{activator:"parent",location:"top"},{default:n(()=>[e(J,{title:"實際領取",value:c.product.unitProfit},null,8,["value"])]),_:1})]),_:1},8,["model-value"]),e(w,{label:"大量加工時間",class:"product-input",type:"number",inputmode:"decimal",min:"60",max:"90",density:"compact","model-value":c.product.mpTime,"onUpdate:modelValue":m[5]||(m[5]=r=>o(s).updateProduct("mpTime",l.tier,l.idx,r))},null,8,["model-value"]),m[6]||(I(-1,!0),(m[6]=e(Ee,{class:"align-self-center",icon:o(Ge)("close"),onClick:r=>o(s).removeGoods(l.tier,c.idx)},null,8,["icon","onClick"])).cacheIndex=6,I(1),m[6])]),_:1}),e(xe,{class:"mt-2",btnClass:"px-2 py-1 text-caption font-weight-bold","text-class":"ps-4 text-left",baseColor:"transparent",rounded:"lg",title:`原料消耗量(預設為${c.tier===1?"5":"10"})`,"aria-label":"原料消耗量"},{default:n(()=>[(i(!0),y(x,null,G(c.product.raw,({name:r,consumption:b},k,U,f)=>{const v=[b];if(f&&f.key===k&&te(f,v))return f;const D=(i(),P(w,{key:k,class:"d-inline-block mr-3 consumption",label:r,type:"number",inputmode:"decimal",min:"1",density:"compact","model-value":b,"onUpdate:modelValue":H=>o(s).updateProduct("consumption",l.tier,l.idx,[k,H])},null,8,["label","model-value","onUpdate:modelValue"]));return D.memo=v,D},m,7),128))]),_:1},8,["title"])]),_:1})],64))}}),re=Object.assign(Je,{__name:"MassProcessingTheProduct"}),pe=Symbol.for("vuetify:v-item-group"),Ke=fe({...ge(),...Re({selectedClass:"v-item--selected"}),...Fe(),...ye()},"VItemGroup"),Qe=de()({name:"VItemGroup",props:Ke(),emits:{"update:modelValue":V=>!0},setup(V,g){let{slots:d}=g;const{themeClasses:l}=Ve(V),{isSelected:s,select:E,next:u,prev:S,selected:R}=Te(V,pe);return()=>e(V.tag,{class:["v-item-group",l.value,V.class],style:V.style},{default:()=>{var h;return[(h=d.default)==null?void 0:h.call(d,{isSelected:s,select:E,next:u,prev:S,selected:R.value})]}})}}),Xe=de()({name:"VItem",props:he(),emits:{"group:selected":V=>!0},setup(V,g){let{slots:d}=g;const{isSelected:l,select:s,toggle:E,selectedClass:u,value:S,disabled:R}=Pe(V,pe);return()=>{var h;return(h=d.default)==null?void 0:h.call(d,{isSelected:l.value,selectedClass:u.value,select:s,toggle:E,value:S.value,disabled:R.value})}}}),Ye={class:"full-height column-flow"},Ze={class:"column-flow flex-1-1 ga-3 px-2 py-3 overflow-y-auto",style:{height:"0"}},et=1,bt=Z({__name:"processing",setup(V){const g=Q({loader:()=>X(()=>import("./DbQADFZB.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14]),import.meta.url)}),d=Q({loader:()=>X(()=>import("./Cp3vQNwO.js"),__vite__mapDeps([15,1,2,16,4,5,6,7,17,18,19,20,21,22,23,24,25,26,27,28,10,11,12,13,29,30]),import.meta.url)}),l=Q({loader:()=>X(()=>import("./ZMHoHgMW.js"),__vite__mapDeps([31,16,4,5,1,2,6,7,17,32,33,18]),import.meta.url)});Me({title:"黑色沙漠交易所計算機 - 加工",ogTitle:"黑色沙漠交易所計算機 - 加工",description:"計算黑色沙漠中加工及產生的利潤、時間以及產量等，並可透過產物需求量估計原料需求量。",ogDescription:"計算黑色沙漠中加工及產生的利潤、時間以及產量等，並可透過產物需求量估計原料需求量。"});const s=A(et),E=["基本材料","一階加工","二階加工"],u=ee(),S=B(()=>{const p=u.raw.map(t=>t.name);return[p,p.concat(u.tier1.map(t=>t.name))]}),R=B(()=>{const p=[];return u.tier1.forEach(t=>{p.push(...t.raw.map(a=>a.name))}),p}),h=B(()=>{const p=[];return u.tier2.forEach(t=>{p.push(...t.raw.map(a=>a.name))}),p.concat(R.value)}),c=B(()=>u.hourly(-1,1)),m=B(()=>u.hourly(-1,2)),r=be({show:!1,example:"wood"}),b=[{text:"範例一",target:"wood"},{text:"範例二",target:"alloy"},{text:"清空",target:"empty"}];function k(p){Object.assign(r,{show:!0,example:p})}function U(){u.overrideCurrent(r.example),Object.assign(r,{show:!1})}const f=A(!1),v=A(u.tier2[0].name);function D(){var p;f.value=!0,v.value||(v.value=(p=u.tier2[0])==null?void 0:p.name)}ie(()=>{var p;return(p=u.tier2[0])==null?void 0:p.name},(p,t)=>{p&&(!v.value||t===v.value)&&(v.value=p)});function H(){v.value.length&&(u.appendFav(v.value),f.value=!1)}const $=ke(),N=le(()=>$.processing.tier2),F=le(()=>$.processing.tier1);return(p,t)=>(i(),y(x,null,[Y("section",Ye,[e(W,{tag:"h2",title:"加工",icon:"processing",color:"processing"}),e(ae,{class:"bg-processing-lighten-2"},{default:n(()=>[e(q,{class:"column-flow"},{default:n(()=>[e(ze,{modelValue:s.value,"onUpdate:modelValue":t[3]||(t[3]=a=>s.value=a),class:"flex-1-1 overflow-y-scroll"},{default:n(()=>[(i(),y(x,null,G(3,a=>e(je,{key:a,class:"h-100",value:a},{default:n(()=>[e(W,{tag:"h3",title:E[a-1],color:"processing-lighten-1",rounded:"0"},null,8,["title"]),e(L,{class:"bg-transparent text-center px-4 py-3",rounded:"lg"},{default:n(()=>[s.value===1?(i(),y(x,{key:0},[(i(!0),y(x,null,G(o(u).raw,(T,C)=>(i(),P(We,{key:C,raw:T,idx:C},null,8,["raw","idx"]))),128)),e(_,{type:"append",disabled:o(u).raw.length>=25,onClick:t[0]||(t[0]=T=>o(u).appendGoods(0))},null,8,["disabled"])],64)):s.value===2?(i(),y(x,{key:1},[(i(!0),y(x,null,G(o(u).tier1,(T,C)=>(i(),P(re,{key:C,tier:1,product:T,hourlyInfo:c.value[C],idx:C,lowTierNames:S.value[0],selectedRaws:R.value},null,8,["product","hourlyInfo","idx","lowTierNames","selectedRaws"]))),128)),e(_,{type:"append",disabled:o(u).tier1.length>=10,onClick:t[1]||(t[1]=T=>o(u).appendGoods(1))},null,8,["disabled"])],64)):(i(),y(x,{key:2},[(i(!0),y(x,null,G(o(u).tier2,(T,C)=>(i(),P(re,{key:C,tier:2,product:T,hourlyInfo:m.value[C],idx:C,lowTierNames:S.value[1],selectedRaws:h.value},null,8,["product","hourlyInfo","idx","lowTierNames","selectedRaws"]))),128)),e(_,{type:"append",disabled:o(u).tier2.length>=5,onClick:t[2]||(t[2]=T=>o(u).appendGoods(2))},null,8,["disabled"])],64))]),_:1})]),_:2},1032,["value"])),64))]),_:1},8,["modelValue"]),e(Oe,{class:"justify-space-between px-4 py-2 bg-processing-lighten-1"},{default:n(()=>[t[4]||(I(-1,!0),(t[4]=e(M,{icon:"mdi-chevron-left",variant:"text",onClick:a=>s.value=o(Ue)(s.value,3)},null,8,["onClick"])).cacheIndex=4,I(1),t[4]),e(Qe,{modelValue:s.value,"onUpdate:modelValue":t[5]||(t[5]=a=>s.value=a),class:"text-center",mandatory:""},{default:n(()=>[(i(),y(x,null,G(3,a=>e(Xe,{key:`btn-${a}`,value:a},{default:n(({isSelected:T,toggle:C})=>[e(M,{variant:T?"outlined":"text",icon:"mdi-record",onClick:C},null,8,["variant","onClick"])]),_:2},1032,["value"])),64))]),_:1},8,["modelValue"]),t[6]||(I(-1,!0),(t[6]=e(M,{icon:"mdi-chevron-right",variant:"text",onClick:a=>s.value=o($e)(s.value,3)},null,8,["onClick"])).cacheIndex=6,I(1),t[6])]),_:1})]),_:1}),t[7]||(I(-1,!0),(t[7]=e(Ne,{vertical:"",thickness:"3",opacity:"1",color:"surface"})).cacheIndex=7,I(1),t[7]),e(q,{class:"column-flow h-100",cols:"3"},{default:n(()=>[e(W,{tag:"h3",title:"結果",color:"processing-lighten-1",rounded:"0"}),Y("div",Ze,[e(o(l),{idx:-1})])]),_:1})]),_:1}),t[8]||(I(-1,!0),(t[8]=e(Se,{class:"ga-5 px-4 py-2 bg-processing",variant:"text",rounded:"b-lg t-0"},{default:n(()=>[(i(),y(x,null,G(b,a=>e(M,{key:a.target,"prepend-icon":a.target==="empty"?"mdi-broom":"mdi-lightbulb-outline",rounded:"lg",class:"font-weight-bold",onClick:T=>k(a.target)},{default:n(()=>[z(O(a.text)+" ",1),a.target!=="empty"?(i(),P(K,{key:0,text:o(se)[a.target].name,activator:"parent",location:"bottom"},null,8,["text"])):j("",!0)]),_:2},1032,["prepend-icon","onClick"])),64)),e(Ae),e(M,{"prepend-icon":"mdi-file",density:"compact",rounded:"lg",class:"font-weight-bold",variant:"elevated","base-color":"processing-darken-1",onClick:D},{default:n(()=>t[20]||(t[20]=[z(" 儲存 ")])),_:1})]),_:1})).cacheIndex=8,I(1),t[8]),r.show?(i(),P(o(g),{key:0,modelValue:r.show,"onUpdate:modelValue":t[9]||(t[9]=a=>r.show=a),title:"覆蓋表單?",text:`範例 ${o(se)[r.example].name}`,onConfirm:t[10]||(t[10]=a=>U())},null,8,["modelValue","text"])):j("",!0),f.value?(i(),P(o(g),{key:1,modelValue:f.value,"onUpdate:modelValue":t[12]||(t[12]=a=>f.value=a),title:"儲存最愛","confirm-disabled":v.value.length===0,onConfirm:t[13]||(t[13]=a=>H())},{default:n(()=>[e(w,{modelValue:v.value,"onUpdate:modelValue":t[11]||(t[11]=a=>v.value=a),label:"名稱"},null,8,["modelValue"])]),_:1},8,["modelValue","confirm-disabled"])):j("",!0)]),e(oe,{tag:"section","min-height":400,options:{threshold:.2},transition:"fade-transition"},{default:n(()=>[e(o(d),{class:"full-height column-flow"})]),_:1}),e(oe,{tag:"section","min-height":50,options:{threshold:1},transition:"fade-transition"},{default:n(()=>[e(Le,{class:"my-4 pa-0 overflow-hidden rounded-t-xl rounded-b-lg"},{default:n(()=>[t[14]||(I(-1,!0),(t[14]=e(W,{tag:"h3",title:"原料需求估計",icon:"mdi-calculator-variant-outline",color:"title"})).cacheIndex=14,I(1),t[14]),e(ae,{class:"h-100 bg-surface px-2 py-2 ga-2 bg-content"},{default:n(()=>[e(q,{class:"d-flex align-center ga-3 px-5 pt-4 pb-2 rounded-xl bg-surface"},{default:n(()=>[e(w,{modelValue:N.value.demand,"onUpdate:modelValue":t[15]||(t[15]=a=>N.value.demand=a),label:"產量需求",density:"compact",type:"number",inputmode:"decimal",min:"1"},null,8,["modelValue"]),e(w,{modelValue:N.value.avgyield,"onUpdate:modelValue":t[16]||(t[16]=a=>N.value.avgyield=a),label:"二階加工產量",density:"compact",type:"number",inputmode:"decimal",min:"1",step:"any"},null,8,["modelValue"]),e(w,{modelValue:N.value.consumption,"onUpdate:modelValue":t[17]||(t[17]=a=>N.value.consumption=a),label:"一階原料消耗量",density:"compact",type:"number",inputmode:"decimal",min:"1"},null,8,["modelValue"]),e(w,{modelValue:F.value.avgyield,"onUpdate:modelValue":t[18]||(t[18]=a=>F.value.avgyield=a),label:"一階加工產量",density:"compact",type:"number",inputmode:"decimal",min:"1",step:"any"},null,8,["modelValue"]),e(w,{modelValue:F.value.consumption,"onUpdate:modelValue":t[19]||(t[19]=a=>F.value.consumption=a),label:"基本材料消耗量",density:"compact",type:"number",inputmode:"decimal",min:"1"},null,8,["modelValue"])]),_:1}),e(q,{class:"text-subtitle-2 px-5 py-3 rounded-xl bg-surface",cols:"3"},{default:n(()=>[e(J,{title:"基本材料需求量",value:o($).processingT0Req,titleSize:"body-2"},null,8,["value"]),e(J,{title:"一階產物需求量",value:o($).processingT1Req,titleSize:"body-2"},null,8,["value"])]),_:1})]),_:1})]),_:1})]),_:1})],64))}});export{bt as default};