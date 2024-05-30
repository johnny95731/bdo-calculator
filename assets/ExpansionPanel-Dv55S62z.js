import{d as V,h as i,p as x,o as C,c as h,w as m,l as $,e as y,t as g,k as _,I as D,b9 as v,n as c,q as w,ba as H,J as B,bb as E,K as R,av as M,bc as N,bd as T,be as I,aU as j,M as O,N as z,O as S,P as J,aJ as L,aa as U,bf as W,ay as q,bg as F,bh as K,bi as A,aW as G,_ as Q,b as f,bj as X,ar as Y,bk as Z,C as P,D as ee,j as ae,a as p,m as oe,z as se,$ as te,a5 as le,bl as ne}from"./index-Cy44yjh_.js";const pe=V({__name:"RegionHeader",props:{tag:{default:"label"},title:{default:void 0},icon:{default:void 0},rounded:{default:"t-xl"},color:{default:void 0},textColor:{default:void 0}},setup(o){const e=o,l=i(()=>e.rounded===""?"rounded":H(e.rounded)),t=x(e.icon)??e.icon;return(s,u)=>(C(),h(w(s.tag),{class:c(["px-4 py-1","font-weight-bold text-h6 text-left",s.color?`bg-${s.color}`:"",s.textColor?`text-${s.textColor}`:"",l.value])},{default:m(()=>[s.icon?(C(),h($,{key:0,class:"mr-1"},{default:m(()=>[y(g(_(t)),1)]),_:1})):D("",!0),v(s.$slots,"default",{},()=>[y(g(s.title??"標題"),1)]),v(s.$slots,"append")]),_:3},8,["class"]))}}),re=B({color:String,...E(),...R(),...M(),...N(),...T(),...I(),...j(),...O(),...z()},"VSheet"),fe=S()({name:"VSheet",props:re(),setup(o,e){let{slots:l}=e;const{themeClasses:t}=J(o),{backgroundColorClasses:s,backgroundColorStyles:u}=L(U(o,"color")),{borderClasses:n}=W(o),{dimensionStyles:b}=q(o),{elevationClasses:a}=F(o),{locationStyles:r}=K(o),{positionClasses:d}=A(o),{roundedClasses:k}=G(o);return Q(()=>f(o.tag,{class:["v-sheet",t.value,s.value,n.value,a.value,d.value,k.value,o.class],style:[u.value,b.value,r.value,o.style]},l)),{}}}),ue=B({disabled:Boolean,modelValue:{type:Boolean,default:null},...X()},"VHover"),de=S()({name:"VHover",props:ue(),emits:{"update:modelValue":o=>!0},setup(o,e){let{slots:l}=e;const t=Y(o,"modelValue"),{runOpenDelay:s,runCloseDelay:u}=Z(o,n=>!o.disabled&&(t.value=n));return()=>{var n;return(n=l.default)==null?void 0:n.call(l,{isHovering:t.value,props:{onMouseenter:s,onMouseleave:u}})}}}),ie=V({__name:"ExpansionPanel",props:{title:{default:void 0},baseColor:{default:void 0},panelColor:{default:void 0},hoverColor:{default:void 0},rounded:{default:void 0},class:{default:void 0},btnClass:{default:void 0},textClass:{default:"bg-surface"},expand:{type:Boolean,default:!1},absolute:{type:Boolean,default:!1}},setup(o){const e=o,l=P(!1),t=P(e.expand);ee(()=>e.expand,a=>{t.value=a});const s=i(()=>{let a="";return e.btnClass&&(a=a.concat(` ${e.btnClass}`)),a}),u=i(()=>e.rounded?t.value?`rounded-t-${e.rounded}`:`rounded-${e.rounded}`:""),n=i(()=>{let a=l.value?e.hoverColor||"hover":e.baseColor;return a&&!a.startsWith("bg-")&&a!=="hover"&&(a=`bg-${a}`),a}),b=i(()=>{let a="";return e.textClass.length&&(a=a.concat(e.textClass)),e.panelColor&&(a=a.concat(` bg-${e.panelColor}`)),a});return(a,r)=>(C(),ae("div",{class:c(["panel",e.class,e.rounded?`rounded-${e.rounded}`:""])},[f(de,{"onUpdate:modelValue":r[2]||(r[2]=d=>l.value=d)},{default:m(({props:d})=>[p("button",oe(d,{class:["activator justify-space-between",s.value,u.value],type:"button",onClick:r[1]||(r[1]=k=>t.value=!t.value)}),[p("div",{class:c(["overlay",n.value])},null,2),v(a.$slots,"title",{},()=>[p("div",null,g(e.title),1)],!0),se([t.value],()=>f($,{class:c(["chevron flex-0-0",t.value?"rotate":"",e.rounded==="shaped"?"mr-3":0]),icon:_(x)("expandable"),end:""},null,8,["class","icon"]),r,0)],16)]),_:3}),f(ne,null,{default:m(()=>[te(p("div",{class:c(["content pa-2",b.value,e.absolute?"absolute":""])},[v(a.$slots,"default",{},void 0,!0),v(a.$slots,"text",{},void 0,!0)],2),[[le,t.value]])]),_:3})],2))}}),ce=(o,e)=>{const l=o.__vccOpts||o;for(const[t,s]of e)l[t]=s;return l},me=ce(ie,[["__scopeId","data-v-8b9f6688"]]);export{me as E,fe as V,pe as _,ce as a};
