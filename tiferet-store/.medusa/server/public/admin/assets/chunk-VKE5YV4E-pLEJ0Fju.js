import{b as c,u as n,dK as l,t as s}from"./index-BzevulME.js";import{u}from"./use-prompt-SZWNtkO6.js";var g=({priceList:t})=>{const{t:e}=c(),a=u(),r=n(),{mutateAsync:i}=l(t.id);return async()=>{await a({title:e("general.areYouSure"),description:e("priceLists.delete.confirmation",{title:t.title}),confirmText:e("actions.delete"),cancelText:e("actions.cancel")})&&await i(void 0,{onSuccess:()=>{s.success(e("priceLists.delete.successToast",{title:t.title})),r("/price-lists")},onError:o=>{s.error(o.message)}})}};export{g as u};
