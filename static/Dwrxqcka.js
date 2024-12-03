import{a as q}from"./FH5iFDyH.js";import{R as g,S as b,U as f,a2 as C,z as t,aD as u,F as A,T as w,V as G,i as p,a4 as U,a5 as J,Q as K}from"./DXqIG5h6.js";import{m as h,p as x,Q as P,V as S,n as k,d as W,a as X,e as Y,y as Z,z as $,A as ee,f as ae,B as te,q as ne,R as de,i as ie,G as le,r as se,u as re,j as ce,C as ue,D as oe,E as ve,k as me,F as ye,l as ke,S as ge,H as be}from"./Bo9Y2Pl6.js";import{V as fe,a as Ce}from"./BC5ghwX7.js";const Ve=g({opacity:[Number,String],...b(),...h()},"VCardSubtitle"),Ie=f()({name:"VCardSubtitle",props:Ve(),setup(e,i){let{slots:n}=i;return C(()=>t(e.tag,{class:["v-card-subtitle",e.class],style:[{"--v-card-subtitle-opacity":e.opacity},e.style]},n)),{}}}),Ae=g({appendAvatar:String,appendIcon:u,prependAvatar:String,prependIcon:u,subtitle:[String,Number],title:[String,Number],...b(),...x()},"VCardItem"),pe=f()({name:"VCardItem",props:Ae(),setup(e,i){let{slots:n}=i;return C(()=>{var s;const a=!!(e.prependAvatar||e.prependIcon),o=!!(a||n.prepend),l=!!(e.appendAvatar||e.appendIcon),v=!!(l||n.append),m=!!(e.title!=null||n.title),y=!!(e.subtitle!=null||n.subtitle);return t("div",{class:["v-card-item",e.class],style:e.style},[o&&t("div",{key:"prepend",class:"v-card-item__prepend"},[n.prepend?t(k,{key:"prepend-defaults",disabled:!a,defaults:{VAvatar:{density:e.density,image:e.prependAvatar},VIcon:{density:e.density,icon:e.prependIcon}}},n.prepend):t(A,null,[e.prependAvatar&&t(P,{key:"prepend-avatar",density:e.density,image:e.prependAvatar},null),e.prependIcon&&t(S,{key:"prepend-icon",density:e.density,icon:e.prependIcon},null)])]),t("div",{class:"v-card-item__content"},[m&&t(fe,{key:"title"},{default:()=>{var d;return[((d=n.title)==null?void 0:d.call(n))??e.title]}}),y&&t(Ie,{key:"subtitle"},{default:()=>{var d;return[((d=n.subtitle)==null?void 0:d.call(n))??e.subtitle]}}),(s=n.default)==null?void 0:s.call(n)]),v&&t("div",{key:"append",class:"v-card-item__append"},[n.append?t(k,{key:"append-defaults",disabled:!l,defaults:{VAvatar:{density:e.density,image:e.appendAvatar},VIcon:{density:e.density,icon:e.appendIcon}}},n.append):t(A,null,[e.appendIcon&&t(S,{key:"append-icon",density:e.density,icon:e.appendIcon},null),e.appendAvatar&&t(P,{key:"append-avatar",density:e.density,image:e.appendAvatar},null)])])])}),{}}}),Pe=g({appendAvatar:String,appendIcon:u,disabled:Boolean,flat:Boolean,hover:Boolean,image:String,link:{type:Boolean,default:void 0},prependAvatar:String,prependIcon:u,ripple:{type:[Boolean,Object],default:!0},subtitle:[String,Number],text:[String,Number],title:[String,Number],...W(),...b(),...x(),...X(),...Y(),...Z(),...$(),...ee(),...ae(),...te(),...h(),...w(),...ne({variant:"elevated"})},"VCard"),De=f()({name:"VCard",directives:{Ripple:de},props:Pe(),setup(e,i){let{attrs:n,slots:a}=i;const{themeClasses:o}=G(e),{borderClasses:l}=ie(e),{colorClasses:v,colorStyles:m,variantClasses:y}=le(e),{densityClasses:s}=se(e),{dimensionStyles:d}=re(e),{elevationClasses:T}=ce(e),{loaderClasses:D}=ue(e),{locationStyles:B}=oe(e),{positionClasses:L}=ve(e),{roundedClasses:_}=me(e),r=ye(e,n),N=p(()=>e.link!==!1&&r.isLink.value),c=p(()=>!e.disabled&&e.link!==!1&&(e.link||r.isClickable.value));return C(()=>{const R=N.value?"a":e.tag,F=!!(a.title||e.title!=null),E=!!(a.subtitle||e.subtitle!=null),j=F||E,z=!!(a.append||e.appendAvatar||e.appendIcon),H=!!(a.prepend||e.prependAvatar||e.prependIcon),M=!!(a.image||e.image),O=j||H||z,Q=!!(a.text||e.text!=null);return U(t(R,K({class:["v-card",{"v-card--disabled":e.disabled,"v-card--flat":e.flat,"v-card--hover":e.hover&&!(e.disabled||e.flat),"v-card--link":c.value},o.value,l.value,v.value,s.value,T.value,D.value,L.value,_.value,y.value,e.class],style:[m.value,d.value,B.value,e.style],onClick:c.value&&r.navigate,tabindex:e.disabled?-1:void 0},r.linkProps),{default:()=>{var V;return[M&&t("div",{key:"image",class:"v-card__image"},[a.image?t(k,{key:"image-defaults",disabled:!e.image,defaults:{VImg:{cover:!0,src:e.image}}},a.image):t(ke,{key:"image-img",cover:!0,src:e.image},null)]),t(ge,{name:"v-card",active:!!e.loading,color:typeof e.loading=="boolean"?void 0:e.loading},{default:a.loader}),O&&t(pe,{key:"item",prependAvatar:e.prependAvatar,prependIcon:e.prependIcon,title:e.title,subtitle:e.subtitle,appendAvatar:e.appendAvatar,appendIcon:e.appendIcon},{default:a.item,prepend:a.prepend,title:a.title,subtitle:a.subtitle,append:a.append}),Q&&t(Ce,{key:"text"},{default:()=>{var I;return[((I=a.text)==null?void 0:I.call(a))??e.text]}}),(V=a.default)==null?void 0:V.call(a),a.actions&&t(q,null,{default:a.actions}),be(c.value,"v-card")]}}),[[J("ripple"),c.value&&e.ripple]])}),{}}});export{De as V,pe as a};