import{E as v}from"./TiEIOpVK.js";import{D as x}from"./CqifZKDs.js";import R from"./Br4RmK0I.js";import{n as f,y as c}from"./BORQtvDy.js";import{d as S,i as s,t as n,v as m,z as C,A as y,F as p,C as g,D as _,E as h}from"./DXqIG5h6.js";import"./Bo9Y2Pl6.js";const k=S({__name:"MPResult",props:{idx:{}},setup(P){const o=P,r=R(),i=s(()=>r.cost(o.idx)),d=s(()=>{const[e,a]=r.timeCost(o.idx);return[e,a,e+a]}),w=s(()=>r.hourly(o.idx,1)),b=s(()=>r.hourly(o.idx,2)),E=s(()=>{const e=r.allIncomes(o.idx);return[{title:"總計",items:[{label:"利潤",value:e.tier2-i.value},{label:"時間",value:`${f(d.value[2],2)}分鐘`}]},{title:"一階加工",items:[{label:"利潤",value:e.tier1},{label:"時間",value:`${f(d.value[0],2)}分鐘`}]},{title:"基本原料",items:[{label:"利潤",value:e.raw-i.value},{label:"成本",value:i.value}]}]}),F=s(()=>{const e=["profit","yield","cost","crafts"],a={};e.forEach(u=>{a[u]=[c(w.value,u),c(b.value,u),c(b.value,`${u}FromRaw`)]});const{profit:l,cost:t,crafts:M}=a;return[{title:"總計",items:[{label:"利潤",value:l[2]-t[2]},{label:"次數",value:M[2]},{label:"成本",value:t[2]}]},{title:"一階到二階",items:[{label:"利潤",value:l[1]-t[1]},{label:"成本",value:t[1]}]},{title:"一階加工",items:[{label:"利潤",value:l[0]-t[0]},{label:"成本",value:t[0]}]}]});return(e,a)=>(n(),m(p,null,[C(v,{title:"總計",btnClass:"px-3 py-1 font-weight-bold",textClass:"px-3 pb-3 rounded-b-xl bg-surface",rounded:"xl",expand:""},{default:y(()=>[(n(!0),m(p,null,g(E.value,(l,t)=>(n(),_(x,{key:t,class:h(["px-4 py-0",t?"my-1":"mt-n1 mb-1"]),title:l.title,titleClass:t?"ms-n4":"d-none",data:l.items},null,8,["class","title","titleClass","data"]))),128))]),_:1}),C(v,{title:"每小時",btnClass:"px-3 py-1 font-weight-bold",textClass:"px-3 pb-3 rounded-b-xl bg-surface",rounded:"xl",expand:""},{default:y(()=>[(n(!0),m(p,null,g(F.value,(l,t)=>(n(),_(x,{key:t,class:h(["px-4 py-0",t?"my-1":"mt-n1 mb-1"]),title:l.title,titleClass:t?"ms-n4":"d-none",data:l.items},null,8,["class","title","titleClass","data"]))),128))]),_:1})],64))}}),H=Object.assign(k,{__name:"MassProcessingMPResult"});export{H as default};