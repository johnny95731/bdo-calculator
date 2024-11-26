import{aS as U,U as T,a9 as qe,aI as Ue,S as N,h as pe,R as y,aT as P,i as v,aU as V,aK as ke,aV as ce,aW as Ye,aX as Ke,aY as Ge,M as de,z as u,F as we,aZ as Je,ag as Qe,a5 as h,aG as xe,T as te,r as ne,V as ae,a_ as Ze,a7 as Y,a0 as A,a$ as et,b0 as tt,Z as z,b1 as se,e as Te,J as X,X as Pe,ac as nt,an as ve,aJ as Ee,aw as Le,aA as ie,b2 as at,b3 as fe,I as me,aC as st,a6 as $e,at as it,b4 as rt,b5 as ge,Q as Be,aH as ot,b6 as lt,a1 as he,a2 as ut,a4 as ct}from"./DPsyiRpY.js";const Re=["top","bottom"],dt=["start","end","left","right"];function vt(e,t){let[n,a]=e.split(" ");return a||(a=U(Re,n)?"start":U(dt,n)?"top":"center"),{side:be(n,t),align:be(a,t)}}function be(e,t){return e==="start"?t?"right":"left":e==="end"?t?"left":"right":e}function Gt(e){return{side:{center:"center",top:"bottom",bottom:"top",left:"right",right:"left"}[e.side],align:e.align}}function Jt(e){return{side:e.side,align:{center:"center",top:"bottom",bottom:"top",left:"right",right:"left"}[e.align]}}function Qt(e){return{side:e.align,align:e.side}}function Zt(e){return U(Re,e.side)?"y":"x"}function en(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"div",n=arguments.length>2?arguments[2]:void 0;return T()({name:n??qe(Ue(e.replace(/__/g,"-"))),props:{tag:{type:String,default:t},...N()},setup(a,i){let{slots:s}=i;return()=>{var r;return pe(a.tag,{class:[e,a.class],style:a.style},(r=s.default)==null?void 0:r.call(s))}}})}const ft={alchemy:"mdi-flask-empty",append:"mdi-plus",character:"mdi-account-circle",close:"mdi-close",delete:"mdi-delete",editable:"mdi-pencil",expandable:"mdi-chevron-down",gear:"mdi-cog",favorite:"mdi-star",goto:"mdi-arrow-right",home:"mdi-home",info:"mdi-information-outline",link:"mdi-link",processing:"mdi-hammer",save:"mdi-file"};function tn(e){return ft[e]}const mt=y({border:[Boolean,Number,String]},"border");function gt(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:P();return{borderClasses:v(()=>{const a=V(e)?e.value:e.border,i=[];if(a===!0||a==="")i.push(`${t}--border`);else if(typeof a=="string"||a===0)for(const s of String(a).split(" "))i.push(`border-${s}`);return i})}}const ht=[null,"default","comfortable","compact"],bt=y({density:{type:String,default:"default",validator:e=>ht.includes(e)}},"density");function yt(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:P();return{densityClasses:v(()=>`${t}--density-${e.density}`)}}const nn=y({elevation:{type:[Number,String],validator(e){const t=parseInt(e);return!isNaN(t)&&t>=0&&t<=24}}},"elevation");function an(e){return{elevationClasses:v(()=>{const n=V(e)?e.value:e.elevation,a=[];return n==null||a.push(`elevation-${n}`),a})}}const re=y({rounded:{type:[Boolean,Number,String],default:void 0},tile:Boolean},"rounded");function oe(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:P();return{roundedClasses:v(()=>{const a=V(e)?e.value:e.rounded,i=V(e)?e.value:e.tile,s=[];if(a===!0||a==="")s.push(`${t}--rounded`);else if(typeof a=="string"||a===0)for(const r of String(a).split(" "))s.push(`rounded-${r}`);else(i||a===!1)&&s.push("rounded-0");return s})}}const le=y({tag:{type:String,default:"div"}},"tag");function ue(e){return ke(()=>{const t=[],n={};if(e.value.background)if(ce(e.value.background)){if(n.backgroundColor=e.value.background,!e.value.text&&Ye(e.value.background)){const a=Ke(e.value.background);if(a.a==null||a.a===1){const i=Ge(a);n.color=i,n.caretColor=i}}}else t.push(`bg-${e.value.background}`);return e.value.text&&(ce(e.value.text)?(n.color=e.value.text,n.caretColor=e.value.text):t.push(`text-${e.value.text}`)),{colorClasses:t,colorStyles:n}})}function ze(e,t){const n=v(()=>({text:V(e)?e.value:t?e[t]:null})),{colorClasses:a,colorStyles:i}=ue(n);return{textColorClasses:a,textColorStyles:i}}function q(e,t){const n=v(()=>({background:V(e)?e.value:t?e[t]:null})),{colorClasses:a,colorStyles:i}=ue(n);return{backgroundColorClasses:a,backgroundColorStyles:i}}const St=["elevated","flat","tonal","outlined","text","plain"];function _t(e,t){return u(we,null,[e&&u("span",{key:"overlay",class:`${t}__overlay`},null),u("span",{key:"underlay",class:`${t}__underlay`},null)])}const Ct=y({color:String,variant:{type:String,default:"elevated",validator:e=>St.includes(e)}},"variant");function pt(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:P();const n=v(()=>{const{variant:s}=de(e);return`${t}--variant-${s}`}),{colorClasses:a,colorStyles:i}=ue(v(()=>{const{variant:s,color:r}=de(e);return{[["elevated","flat"].includes(s)?"background":"text"]:r}}));return{colorClasses:a,colorStyles:i,variantClasses:n}}const kt=y({defaults:Object,disabled:Boolean,reset:[Number,String],root:[Boolean,String],scoped:Boolean},"VDefaultsProvider"),wt=T(!1)({name:"VDefaultsProvider",props:kt(),setup(e,t){let{slots:n}=t;const{defaults:a,disabled:i,reset:s,root:r,scoped:o}=Je(e);return Qe(a,{reset:s,root:r,scoped:o,disabled:i}),()=>{var l;return(l=n.default)==null?void 0:l.call(n)}}}),xt=["x-small","small","default","large","x-large"],Ve=y({size:{type:[String,Number],default:"default"}},"size");function Ne(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:P();return ke(()=>{let n,a;return U(xt,e.size)?n=`${t}--size-${e.size}`:e.size&&(a={width:h(e.size),height:h(e.size)}),{sizeClasses:n,sizeStyles:a}})}const Tt=y({color:String,disabled:Boolean,start:Boolean,end:Boolean,icon:xe,...N(),...Ve(),...le({tag:"i"}),...te()},"VIcon"),Pt=T()({name:"VIcon",props:Tt(),setup(e,t){let{attrs:n,slots:a}=t;const i=ne(),{themeClasses:s}=ae(e),{iconData:r}=Ze(v(()=>i.value||e.icon)),{sizeClasses:o}=Ne(e),{textColorClasses:l,textColorStyles:c}=ze(Y(e,"color"));return A(()=>{var b,f;const d=(b=a.default)==null?void 0:b.call(a);d&&(i.value=(f=et(d).filter(_=>_.type===tt&&_.children&&typeof _.children=="string")[0])==null?void 0:f.children);const g=!!(n.onClick||n.onClickOnce);return u(r.value.component,{tag:e.tag,icon:r.value.icon,class:["v-icon","notranslate",s.value,o.value,l.value,{"v-icon--clickable":g,"v-icon--disabled":e.disabled,"v-icon--start":e.start,"v-icon--end":e.end},e.class],style:[o.value?void 0:{fontSize:h(e.size),height:h(e.size),width:h(e.size)},c.value,e.style],role:g?"button":void 0,"aria-hidden":!g,tabindex:g?e.disabled?-1:0:void 0},{default:()=>[d]})}),{}}});function Et(e,t){const n=ne(),a=z(!1);if(se){const i=new IntersectionObserver(s=>{a.value=!!s.find(r=>r.isIntersecting)},t);Te(()=>{i.disconnect()}),X(n,(s,r)=>{r&&(i.unobserve(r),a.value=!1),s&&i.observe(s)},{flush:"post"})}return{intersectionRef:n,isIntersecting:a}}const Lt=y({height:[Number,String],maxHeight:[Number,String],maxWidth:[Number,String],minHeight:[Number,String],minWidth:[Number,String],width:[Number,String]},"dimension");function $t(e){return{dimensionStyles:v(()=>{const n={},a=h(e.height),i=h(e.maxHeight),s=h(e.maxWidth),r=h(e.minHeight),o=h(e.minWidth),l=h(e.width);return a!=null&&(n.height=a),i!=null&&(n.maxHeight=i),s!=null&&(n.maxWidth=s),r!=null&&(n.minHeight=r),o!=null&&(n.minWidth=o),l!=null&&(n.width=l),n})}}const ye={center:"center",top:"bottom",bottom:"top",left:"right",right:"left"},Bt=y({location:String},"location");function Rt(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,n=arguments.length>2?arguments[2]:void 0;const{isRtl:a}=Pe();return{locationStyles:v(()=>{if(!e.location)return{};const{side:s,align:r}=vt(e.location.split(" ").length>1?e.location:`${e.location} center`,a.value);function o(c){return n?n(c):0}const l={};return s!=="center"&&(t?l[ye[s]]=`calc(100% - ${o(s)}px)`:l[s]=0),r!=="center"?t?l[ye[r]]=`calc(100% - ${o(r)}px)`:l[r]=0:(s==="center"?l.top=l.left="50%":l[{top:"left",bottom:"left",left:"top",right:"top"}[s]]="50%",l.transform={top:"translateX(-50%)",bottom:"translateX(-50%)",left:"translateY(-50%)",right:"translateY(-50%)",center:"translate(-50%, -50%)"}[s]),l})}}const zt=y({absolute:Boolean,active:{type:Boolean,default:!0},bgColor:String,bgOpacity:[Number,String],bufferValue:{type:[Number,String],default:0},bufferColor:String,bufferOpacity:[Number,String],clickable:Boolean,color:String,height:{type:[Number,String],default:4},indeterminate:Boolean,max:{type:[Number,String],default:100},modelValue:{type:[Number,String],default:0},opacity:[Number,String],reverse:Boolean,stream:Boolean,striped:Boolean,roundedBar:Boolean,...N(),...Bt({location:"top"}),...re(),...le(),...te()},"VProgressLinear"),Vt=T()({name:"VProgressLinear",props:zt(),emits:{"update:modelValue":e=>!0},setup(e,t){var O;let{slots:n}=t;const a=nt(e,"modelValue"),{isRtl:i,rtlClasses:s}=Pe(),{themeClasses:r}=ae(e),{locationStyles:o}=Rt(e),{textColorClasses:l,textColorStyles:c}=ze(e,"color"),{backgroundColorClasses:d,backgroundColorStyles:g}=q(v(()=>e.bgColor||e.color)),{backgroundColorClasses:b,backgroundColorStyles:f}=q(v(()=>e.bufferColor||e.bgColor||e.color)),{backgroundColorClasses:_,backgroundColorStyles:w}=q(e,"color"),{roundedClasses:F}=oe(e),{intersectionRef:E,isIntersecting:D}=Et(),x=v(()=>parseFloat(e.max)),p=v(()=>parseFloat(e.height)),L=v(()=>ve(parseFloat(e.bufferValue)/x.value*100,0,100)),I=v(()=>ve(parseFloat(a.value)/x.value*100,0,100)),$=v(()=>i.value!==e.reverse),G=v(()=>e.indeterminate?"fade-transition":"slide-x-transition"),B=Ee&&((O=window.matchMedia)==null?void 0:O.call(window,"(forced-colors: active)").matches);function J(m){if(!E.value)return;const{left:S,right:k,width:R}=E.value.getBoundingClientRect(),j=$.value?R-m.clientX+(k-R):m.clientX-S;a.value=Math.round(j/R*x.value)}return A(()=>u(e.tag,{ref:E,class:["v-progress-linear",{"v-progress-linear--absolute":e.absolute,"v-progress-linear--active":e.active&&D.value,"v-progress-linear--reverse":$.value,"v-progress-linear--rounded":e.rounded,"v-progress-linear--rounded-bar":e.roundedBar,"v-progress-linear--striped":e.striped},F.value,r.value,s.value,e.class],style:[{bottom:e.location==="bottom"?0:void 0,top:e.location==="top"?0:void 0,height:e.active?h(p.value):0,"--v-progress-linear-height":h(p.value),...e.absolute?o.value:{}},e.style],role:"progressbar","aria-hidden":e.active?"false":"true","aria-valuemin":"0","aria-valuemax":e.max,"aria-valuenow":e.indeterminate?void 0:I.value,onClick:e.clickable&&J},{default:()=>[e.stream&&u("div",{key:"stream",class:["v-progress-linear__stream",l.value],style:{...c.value,[$.value?"left":"right"]:h(-p.value),borderTop:`${h(p.value/2)} dotted`,opacity:parseFloat(e.bufferOpacity),top:`calc(50% - ${h(p.value/4)})`,width:h(100-L.value,"%"),"--v-progress-linear-stream-to":h(p.value*($.value?1:-1))}},null),u("div",{class:["v-progress-linear__background",B?void 0:d.value],style:[g.value,{opacity:parseFloat(e.bgOpacity),width:e.stream?0:void 0}]},null),u("div",{class:["v-progress-linear__buffer",B?void 0:b.value],style:[f.value,{opacity:parseFloat(e.bufferOpacity),width:h(L.value,"%")}]},null),u(Le,{name:G.value},{default:()=>[e.indeterminate?u("div",{class:"v-progress-linear__indeterminate"},[["long","short"].map(m=>u("div",{key:m,class:["v-progress-linear__indeterminate",m,B?void 0:_.value],style:w.value},null))]):u("div",{class:["v-progress-linear__determinate",B?void 0:_.value],style:[w.value,{width:h(I.value,"%")}]},null)]}),n.default&&u("div",{class:"v-progress-linear__content"},[n.default({value:I.value,buffer:L.value})])]})),{}}}),sn=y({loading:[Boolean,String]},"loader");function rn(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:P();return{loaderClasses:v(()=>({[`${t}--loading`]:e.loading}))}}function on(e,t){var a;let{slots:n}=t;return u("div",{class:`${e.name}__loader`},[((a=n.default)==null?void 0:a.call(n,{color:e.color,isActive:e.active}))||u(Vt,{absolute:e.absolute,active:e.active,color:e.color,height:"2",indeterminate:!0},null)])}const Nt=["static","relative","fixed","absolute","sticky"],ln=y({position:{type:String,validator:e=>Nt.includes(e)}},"position");function un(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:P();return{positionClasses:v(()=>e.position?`${t}--${e.position}`:void 0)}}function It(){const e=ie("useRoute");return v(()=>{var t;return(t=e==null?void 0:e.proxy)==null?void 0:t.$route})}function cn(){var e,t;return(t=(e=ie("useRouter"))==null?void 0:e.proxy)==null?void 0:t.$router}function dn(e,t){var g,b;const n=at("RouterLink"),a=v(()=>!!(e.href||e.to)),i=v(()=>(a==null?void 0:a.value)||fe(t,"click")||fe(e,"click"));if(typeof n=="string"||!("useLink"in n)){const f=Y(e,"href");return{isLink:a,isClickable:i,href:f,linkProps:me({href:f})}}const s=v(()=>({...e,to:Y(()=>e.to||"")})),r=n.useLink(s.value),o=v(()=>e.to?r:void 0),l=It(),c=v(()=>{var f,_,w;return o.value?e.exact?l.value?((w=o.value.isExactActive)==null?void 0:w.value)&&st(o.value.route.value.query,l.value.query):((_=o.value.isExactActive)==null?void 0:_.value)??!1:((f=o.value.isActive)==null?void 0:f.value)??!1:!1}),d=v(()=>{var f;return e.to?(f=o.value)==null?void 0:f.route.value.href:e.href});return{isLink:a,isClickable:i,isActive:c,route:(g=o.value)==null?void 0:g.route,navigate:(b=o.value)==null?void 0:b.navigate,href:d,linkProps:me({href:d,"aria-current":v(()=>c.value?"page":void 0)})}}const vn=y({href:String,replace:Boolean,to:[String,Object],exact:Boolean},"router");let Q=!1;function fn(e,t){let n=!1,a,i;Ee&&($e(()=>{window.addEventListener("popstate",s),a=e==null?void 0:e.beforeEach((r,o,l)=>{Q?n?t(l):l():setTimeout(()=>n?t(l):l()),Q=!0}),i=e==null?void 0:e.afterEach(()=>{Q=!1})}),it(()=>{window.removeEventListener("popstate",s),a==null||a(),i==null||i()}));function s(r){var o;(o=r.state)!=null&&o.replaced||(n=!0,setTimeout(()=>n=!1))}}const Z=Symbol("rippleStop"),Ot=80;function Se(e,t){e.style.transform=t,e.style.webkitTransform=t}function ee(e){return e.constructor.name==="TouchEvent"}function Ie(e){return e.constructor.name==="KeyboardEvent"}const Ht=function(e,t){var g;let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},a=0,i=0;if(!Ie(e)){const b=t.getBoundingClientRect(),f=ee(e)?e.touches[e.touches.length-1]:e;a=f.clientX-b.left,i=f.clientY-b.top}let s=0,r=.3;(g=t._ripple)!=null&&g.circle?(r=.15,s=t.clientWidth/2,s=n.center?s:s+Math.sqrt((a-s)**2+(i-s)**2)/4):s=Math.sqrt(t.clientWidth**2+t.clientHeight**2)/2;const o=`${(t.clientWidth-s*2)/2}px`,l=`${(t.clientHeight-s*2)/2}px`,c=n.center?o:`${a-s}px`,d=n.center?l:`${i-s}px`;return{radius:s,scale:r,x:c,y:d,centerX:o,centerY:l}},K={show(e,t){var f;let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};if(!((f=t==null?void 0:t._ripple)!=null&&f.enabled))return;const a=document.createElement("span"),i=document.createElement("span");a.appendChild(i),a.className="v-ripple__container",n.class&&(a.className+=` ${n.class}`);const{radius:s,scale:r,x:o,y:l,centerX:c,centerY:d}=Ht(e,t,n),g=`${s*2}px`;i.className="v-ripple__animation",i.style.width=g,i.style.height=g,t.appendChild(a);const b=window.getComputedStyle(t);b&&b.position==="static"&&(t.style.position="relative",t.dataset.previousPosition="static"),i.classList.add("v-ripple__animation--enter"),i.classList.add("v-ripple__animation--visible"),Se(i,`translate(${o}, ${l}) scale3d(${r},${r},${r})`),i.dataset.activated=String(performance.now()),setTimeout(()=>{i.classList.remove("v-ripple__animation--enter"),i.classList.add("v-ripple__animation--in"),Se(i,`translate(${c}, ${d}) scale3d(1,1,1)`)},0)},hide(e){var s;if(!((s=e==null?void 0:e._ripple)!=null&&s.enabled))return;const t=e.getElementsByClassName("v-ripple__animation");if(t.length===0)return;const n=t[t.length-1];if(n.dataset.isHiding)return;n.dataset.isHiding="true";const a=performance.now()-Number(n.dataset.activated),i=Math.max(250-a,0);setTimeout(()=>{n.classList.remove("v-ripple__animation--in"),n.classList.add("v-ripple__animation--out"),setTimeout(()=>{var o;e.getElementsByClassName("v-ripple__animation").length===1&&e.dataset.previousPosition&&(e.style.position=e.dataset.previousPosition,delete e.dataset.previousPosition),((o=n.parentNode)==null?void 0:o.parentNode)===e&&e.removeChild(n.parentNode)},300)},i)}};function Oe(e){return typeof e>"u"||!!e}function H(e){const t={},n=e.currentTarget;if(!(!(n!=null&&n._ripple)||n._ripple.touched||e[Z])){if(e[Z]=!0,ee(e))n._ripple.touched=!0,n._ripple.isTouch=!0;else if(n._ripple.isTouch)return;if(t.center=n._ripple.centered||Ie(e),n._ripple.class&&(t.class=n._ripple.class),ee(e)){if(n._ripple.showTimerCommit)return;n._ripple.showTimerCommit=()=>{K.show(e,n,t)},n._ripple.showTimer=window.setTimeout(()=>{var a;(a=n==null?void 0:n._ripple)!=null&&a.showTimerCommit&&(n._ripple.showTimerCommit(),n._ripple.showTimerCommit=null)},Ot)}else K.show(e,n,t)}}function _e(e){e[Z]=!0}function C(e){const t=e.currentTarget;if(t!=null&&t._ripple){if(window.clearTimeout(t._ripple.showTimer),e.type==="touchend"&&t._ripple.showTimerCommit){t._ripple.showTimerCommit(),t._ripple.showTimerCommit=null,t._ripple.showTimer=window.setTimeout(()=>{C(e)});return}window.setTimeout(()=>{t._ripple&&(t._ripple.touched=!1)}),K.hide(t)}}function He(e){const t=e.currentTarget;t!=null&&t._ripple&&(t._ripple.showTimerCommit&&(t._ripple.showTimerCommit=null),window.clearTimeout(t._ripple.showTimer))}let W=!1;function We(e){!W&&(e.keyCode===ge.enter||e.keyCode===ge.space)&&(W=!0,H(e))}function Ae(e){W=!1,C(e)}function Fe(e){W&&(W=!1,C(e))}function De(e,t,n){const{value:a,modifiers:i}=t,s=Oe(a);if(s||K.hide(e),e._ripple=e._ripple??{},e._ripple.enabled=s,e._ripple.centered=i.center,e._ripple.circle=i.circle,rt(a)&&a.class&&(e._ripple.class=a.class),s&&!n){if(i.stop){e.addEventListener("touchstart",_e,{passive:!0}),e.addEventListener("mousedown",_e);return}e.addEventListener("touchstart",H,{passive:!0}),e.addEventListener("touchend",C,{passive:!0}),e.addEventListener("touchmove",He,{passive:!0}),e.addEventListener("touchcancel",C),e.addEventListener("mousedown",H),e.addEventListener("mouseup",C),e.addEventListener("mouseleave",C),e.addEventListener("keydown",We),e.addEventListener("keyup",Ae),e.addEventListener("blur",Fe),e.addEventListener("dragstart",C,{passive:!0})}else!s&&n&&je(e)}function je(e){e.removeEventListener("mousedown",H),e.removeEventListener("touchstart",H),e.removeEventListener("touchend",C),e.removeEventListener("touchmove",He),e.removeEventListener("touchcancel",C),e.removeEventListener("mouseup",C),e.removeEventListener("mouseleave",C),e.removeEventListener("keydown",We),e.removeEventListener("keyup",Ae),e.removeEventListener("dragstart",C),e.removeEventListener("blur",Fe)}function Wt(e,t){De(e,t,!1)}function At(e){delete e._ripple,je(e)}function Ft(e,t){if(t.value===t.oldValue)return;const n=Oe(t.oldValue);De(e,t,n)}const mn={mounted:Wt,unmounted:At,updated:Ft};function Dt(e){return{aspectStyles:v(()=>{const t=Number(e.aspectRatio);return t?{paddingBottom:String(1/t*100)+"%"}:void 0})}}const Me=y({aspectRatio:[String,Number],contentClass:null,inline:Boolean,...N(),...Lt()},"VResponsive"),Ce=T()({name:"VResponsive",props:Me(),setup(e,t){let{slots:n}=t;const{aspectStyles:a}=Dt(e),{dimensionStyles:i}=$t(e);return A(()=>{var s;return u("div",{class:["v-responsive",{"v-responsive--inline":e.inline},e.class],style:[i.value,e.style]},[u("div",{class:"v-responsive__sizer",style:a.value},null),(s=n.additional)==null?void 0:s.call(n),n.default&&u("div",{class:["v-responsive__content",e.contentClass]},[n.default()])])}),{}}}),jt=y({transition:{type:[Boolean,String,Object],default:"fade-transition",validator:e=>e!==!0}},"transition"),M=(e,t)=>{let{slots:n}=t;const{transition:a,disabled:i,group:s,...r}=e,{component:o=s?ot:Le,...l}=typeof a=="object"?a:{};return pe(o,Be(typeof a=="string"?{name:i?"":a}:l,typeof a=="string"?{}:Object.fromEntries(Object.entries({disabled:i,group:s}).filter(c=>{let[d,g]=c;return g!==void 0})),r),n)};function Mt(e,t){if(!se)return;const n=t.modifiers||{},a=t.value,{handler:i,options:s}=typeof a=="object"?a:{handler:a,options:{}},r=new IntersectionObserver(function(){var g;let o=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],l=arguments.length>1?arguments[1]:void 0;const c=(g=e._observe)==null?void 0:g[t.instance.$.uid];if(!c)return;const d=o.some(b=>b.isIntersecting);i&&(!n.quiet||c.init)&&(!n.once||d||c.init)&&i(d,o,l),d&&n.once?Xe(e,t):c.init=!0},s);e._observe=Object(e._observe),e._observe[t.instance.$.uid]={init:!1,observer:r},r.observe(e)}function Xe(e,t){var a;const n=(a=e._observe)==null?void 0:a[t.instance.$.uid];n&&(n.observer.unobserve(e),delete e._observe[t.instance.$.uid])}const Xt={mounted:Mt,unmounted:Xe},qt=y({absolute:Boolean,alt:String,cover:Boolean,color:String,draggable:{type:[Boolean,String],default:void 0},eager:Boolean,gradient:String,lazySrc:String,options:{type:Object,default:()=>({root:void 0,rootMargin:void 0,threshold:void 0})},sizes:String,src:{type:[String,Object],default:""},crossorigin:String,referrerpolicy:String,srcset:String,position:String,...Me(),...N(),...re(),...jt()},"VImg"),Ut=T()({name:"VImg",directives:{intersect:Xt},props:qt(),emits:{loadstart:e=>!0,load:e=>!0,error:e=>!0},setup(e,t){let{emit:n,slots:a}=t;const{backgroundColorClasses:i,backgroundColorStyles:s}=q(Y(e,"color")),{roundedClasses:r}=oe(e),o=ie("VImg"),l=z(""),c=ne(),d=z(e.eager?"loading":"idle"),g=z(),b=z(),f=v(()=>e.src&&typeof e.src=="object"?{src:e.src.src,srcset:e.srcset||e.src.srcset,lazySrc:e.lazySrc||e.src.lazySrc,aspect:Number(e.aspectRatio||e.src.aspect||0)}:{src:e.src,srcset:e.srcset,lazySrc:e.lazySrc,aspect:Number(e.aspectRatio||0)}),_=v(()=>f.value.aspect||g.value/b.value||0);X(()=>e.src,()=>{w(d.value!=="idle")}),X(_,(m,S)=>{!m&&S&&c.value&&p(c.value)}),lt(()=>w());function w(m){if(!(e.eager&&m)&&!(se&&!m&&!e.eager)){if(d.value="loading",f.value.lazySrc){const S=new Image;S.src=f.value.lazySrc,p(S,null)}f.value.src&&$e(()=>{var S;n("loadstart",((S=c.value)==null?void 0:S.currentSrc)||f.value.src),setTimeout(()=>{var k;if(!o.isUnmounted)if((k=c.value)!=null&&k.complete){if(c.value.naturalWidth||E(),d.value==="error")return;_.value||p(c.value,null),d.value==="loading"&&F()}else _.value||p(c.value),D()})})}}function F(){var m;o.isUnmounted||(D(),p(c.value),d.value="loaded",n("load",((m=c.value)==null?void 0:m.currentSrc)||f.value.src))}function E(){var m;o.isUnmounted||(d.value="error",n("error",((m=c.value)==null?void 0:m.currentSrc)||f.value.src))}function D(){const m=c.value;m&&(l.value=m.currentSrc||m.src)}let x=-1;Te(()=>{clearTimeout(x)});function p(m){let S=arguments.length>1&&arguments[1]!==void 0?arguments[1]:100;const k=()=>{if(clearTimeout(x),o.isUnmounted)return;const{naturalHeight:R,naturalWidth:j}=m;R||j?(g.value=j,b.value=R):!m.complete&&d.value==="loading"&&S!=null?x=window.setTimeout(k,S):(m.currentSrc.endsWith(".svg")||m.currentSrc.startsWith("data:image/svg+xml"))&&(g.value=1,b.value=1)};k()}const L=v(()=>({"v-img__img--cover":e.cover,"v-img__img--contain":!e.cover})),I=()=>{var k;if(!f.value.src||d.value==="idle")return null;const m=u("img",{class:["v-img__img",L.value],style:{objectPosition:e.position},src:f.value.src,srcset:f.value.srcset,alt:e.alt,crossorigin:e.crossorigin,referrerpolicy:e.referrerpolicy,draggable:e.draggable,sizes:e.sizes,ref:c,onLoad:F,onError:E},null),S=(k=a.sources)==null?void 0:k.call(a);return u(M,{transition:e.transition,appear:!0},{default:()=>[he(S?u("picture",{class:"v-img__picture"},[S,m]):m,[[ct,d.value==="loaded"]])]})},$=()=>u(M,{transition:e.transition},{default:()=>[f.value.lazySrc&&d.value!=="loaded"&&u("img",{class:["v-img__img","v-img__img--preload",L.value],style:{objectPosition:e.position},src:f.value.lazySrc,alt:e.alt,crossorigin:e.crossorigin,referrerpolicy:e.referrerpolicy,draggable:e.draggable},null)]}),G=()=>a.placeholder?u(M,{transition:e.transition,appear:!0},{default:()=>[(d.value==="loading"||d.value==="error"&&!a.error)&&u("div",{class:"v-img__placeholder"},[a.placeholder()])]}):null,B=()=>a.error?u(M,{transition:e.transition,appear:!0},{default:()=>[d.value==="error"&&u("div",{class:"v-img__error"},[a.error()])]}):null,J=()=>e.gradient?u("div",{class:"v-img__gradient",style:{backgroundImage:`linear-gradient(${e.gradient})`}},null):null,O=z(!1);{const m=X(_,S=>{S&&(requestAnimationFrame(()=>{requestAnimationFrame(()=>{O.value=!0})}),m())})}return A(()=>{const m=Ce.filterProps(e);return he(u(Ce,Be({class:["v-img",{"v-img--absolute":e.absolute,"v-img--booting":!O.value},i.value,r.value,e.class],style:[{width:h(e.width==="auto"?g.value:e.width)},s.value,e.style]},m,{aspectRatio:_.value,"aria-label":e.alt,role:e.alt?"img":void 0}),{additional:()=>u(we,null,[u(I,null,null),u($,null,null),u(J,null,null),u(G,null,null),u(B,null,null)]),default:a.default}),[[ut("intersect"),{handler:w,options:e.options},null,{once:!0}]])}),{currentSrc:l,image:c,state:d,naturalWidth:g,naturalHeight:b}}}),Yt=y({start:Boolean,end:Boolean,icon:xe,image:String,text:String,...mt(),...N(),...bt(),...re(),...Ve(),...le(),...te(),...Ct({variant:"flat"})},"VAvatar"),gn=T()({name:"VAvatar",props:Yt(),setup(e,t){let{slots:n}=t;const{themeClasses:a}=ae(e),{borderClasses:i}=gt(e),{colorClasses:s,colorStyles:r,variantClasses:o}=pt(e),{densityClasses:l}=yt(e),{roundedClasses:c}=oe(e),{sizeClasses:d,sizeStyles:g}=Ne(e);return A(()=>u(e.tag,{class:["v-avatar",{"v-avatar--start":e.start,"v-avatar--end":e.end},a.value,i.value,s.value,l.value,c.value,d.value,o.value,e.class],style:[r.value,g.value,e.style]},{default:()=>[n.default?u(wt,{key:"content-defaults",defaults:{VImg:{cover:!0,src:e.image},VIcon:{icon:e.icon}}},{default:()=>[n.default()]}):e.image?u(Ut,{key:"image",src:e.image,alt:"",cover:!0},null):e.icon?u(Pt,{key:"icon",icon:e.icon},null):e.text,_t(!1,"v-avatar")]})),{}}});export{ln as A,vn as B,rn as C,Rt as D,un as E,dn as F,pt as G,_t as H,Xt as I,vt as J,Gt as K,Jt as L,M,Qt as N,Zt as O,fn as P,gn as Q,mn as R,on as S,Pt as V,Lt as a,jt as b,en as c,mt as d,nn as e,re as f,tn as g,q as h,gt as i,an as j,oe as k,Ut as l,le as m,wt as n,cn as o,bt as p,Ct as q,yt as r,Ve as s,be as t,$t as u,Ne as v,ze as w,Et as x,sn as y,Bt as z};
