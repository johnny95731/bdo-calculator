import{I as p}from"./CMexsFRB.js";import{C as i}from"./BUXEVmFi.js";import u from"./BvXaYIhm.js";import r from"./DRsQRCKw.js";import{V as n,b as s}from"./CeIna3vb.js";import{d as v,t as w,v as y,z as m,M as t,A as d}from"./DPsyiRpY.js";import"./D8ei0Eur.js";import"./BTDi6Uru.js";import"./BIF_erWj.js";import"./DoaB3Qut.js";import"./BFBVYC-1.js";import"./CwiqMsm9.js";import"./BIQ7D7eS.js";const f={class:"d-flex my-3 ps-5 pe-3 pt-5 pb-4 ga-3 rounded-xl bg-surface"},b=v({__name:"AlchemyRaw",props:{idx:{},raw:{}},setup(c){const l=r();return(e,o)=>(w(),y("div",f,[m(p,{class:"name-input",density:"compact","model-value":e.raw.name,"onUpdate:modelValue":o[0]||(o[0]=a=>t(l).updateRaw(e.idx,"name",a??""))},null,8,["model-value"]),m(n,{label:"擁有數量",density:"compact",type:"number",inputmode:"decimal",min:"0","model-value":e.raw.num,"onUpdate:modelValue":o[1]||(o[1]=a=>t(l).updateRaw(e.idx,"num",a))},null,8,["model-value"]),m(n,{label:"消耗",density:"compact",type:"number",inputmode:"decimal",min:"0","model-value":e.raw.consumption,"onUpdate:modelValue":o[2]||(o[2]=a=>t(l).updateRaw(e.idx,"consumption",a))},null,8,["model-value"]),m(n,{label:"售出價",density:"compact",type:"number",inputmode:"decimal",min:"0","model-value":e.raw.price,"onUpdate:modelValue":o[3]||(o[3]=a=>t(l).updateRaw(e.idx,"price",a))},{default:d(()=>[m(s,{activator:"parent",location:"top"},{default:d(()=>[m(u,{title:"實際領取",value:e.raw.unitProfit},null,8,["value"])]),_:1})]),_:1},8,["model-value"]),m(n,{label:"成本",density:"compact",type:"number",inputmode:"decimal",min:"0","model-value":e.raw.cost,"onUpdate:modelValue":o[4]||(o[4]=a=>t(l).updateRaw(e.idx,"cost",a))},null,8,["model-value"]),m(i,{type:"close",onClick:o[5]||(o[5]=a=>t(l).removeRaw(e.idx))})]))}}),x=Object.assign(b,{__name:"AlchemyRaw"});export{x as default};
