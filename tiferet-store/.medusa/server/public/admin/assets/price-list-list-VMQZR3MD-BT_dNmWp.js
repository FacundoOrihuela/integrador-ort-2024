import{u as g}from"./chunk-VKE5YV4E-pLEJ0Fju.js";import{g as b}from"./chunk-G2J2T2QU-DqyL9897.js";import{T as h,a as j}from"./chunk-OI7BBNYW-DqLH_Gp-.js";import{a as P,j as t,b as n,dJ as T,H as L,T as v,B as y,L as C,r as S,k as D,A as k}from"./index-BzevulME.js";import{S as A}from"./chunk-ADOCJB6L-Cd1njWd5.js";import{u as w}from"./chunk-W7625H47-Dk2m8uo5.js";import{S as E}from"./chunk-2RQLKDBF-Dxhmozx4.js";import{u as _,D as q}from"./chunk-OXHHPLX5-CqH3A1vO.js";import"./lodash-eSu3vCkj.js";import{u as z}from"./chunk-C76H5USB-PWSB2H-5.js";import"./chunk-BV7MMCXV-CNMye-hv.js";import"./chunk-QLHWURNJ-CkSrJrxM.js";import{P as H}from"./pencil-square-CuE224vE.js";import{T as F}from"./trash-CTULpWQo.js";import{C as N}from"./container-VPG9vkka.js";import{c as B}from"./index-Cdiau-P3.js";import"./use-prompt-SZWNtkO6.js";import"./prompt-DyhpapC0.js";import"./chunk-6GU6IDUA-CDc7wW5L.js";import"./chunk-P3UUX2T6-BmAVqeyo.js";import"./Trans-CbwTMn7p.js";import"./x-mark-mini-BbWfBVGF.js";import"./chunk-YEDAFXMB-CBc3PzO1.js";import"./chunk-AOFGTNG6-F_1H3ii8.js";import"./chunk-WX2SMNCD-CHpe_MZm.js";import"./plus-mini-D9pXXI65.js";import"./command-bar-Dxfv9HA8.js";import"./index-CgUwoWkB.js";import"./chunk-X4PARRTU-XZk3pZNC.js";import"./format-CrY511gm.js";import"./date-picker-DbemC0oI.js";import"./popover-C0Ig9DZr.js";import"./triangle-left-mini-NExUVXMr.js";var I=({priceList:e})=>{const{t:r}=n(),s=g({priceList:e});return t.jsx(k,{groups:[{actions:[{label:r("actions.edit"),to:`${e.id}/edit`,icon:t.jsx(H,{})}]},{actions:[{label:r("actions.delete"),onClick:s,icon:t.jsx(F,{})}]}]})},o=B(),M=()=>{const{t:e}=n();return S.useMemo(()=>[o.accessor("title",{header:()=>t.jsx(h,{text:e("fields.title")}),cell:r=>r.getValue()}),o.accessor("status",{header:e("priceLists.fields.status.label"),cell:({row:r})=>{const{color:s,text:a}=b(e,r.original);return t.jsx(A,{color:s,children:a})}}),o.accessor("prices",{header:e("priceLists.fields.priceOverrides.header"),cell:r=>{var s;return t.jsx(j,{text:`${((s=r.getValue())==null?void 0:s.length)||"-"}`})}}),o.display({id:"actions",cell:({row:r})=>t.jsx(I,{priceList:r.original})})],[e])},O=()=>w(),Q=({pageSize:e=20,prefix:r})=>{var i;const s=z(["offset","q","order","status"],r);return{searchParams:{limit:e,offset:s.offset?Number(s.offset):0,order:s.order,status:(i=s.status)==null?void 0:i.split(","),q:s.q},raw:s}},c=20,R=()=>{const{t:e}=n(),{searchParams:r,raw:s}=Q({pageSize:c}),{price_lists:a,count:i,isLoading:p,isError:d,error:u}=T(r,{placeholderData:D}),f=O(),m=M(),{table:x}=_({data:a||[],columns:m,count:i,enablePagination:!0,getRowId:l=>l.id,pageSize:c});if(d)throw u;return t.jsxs(N,{className:"divide-y p-0",children:[t.jsxs("div",{className:"flex items-center justify-between px-6 py-4",children:[t.jsxs("div",{children:[t.jsx(L,{children:e("priceLists.domain")}),t.jsx(v,{className:"text-ui-fg-subtle",size:"small",children:e("priceLists.subtitle")})]}),t.jsx(y,{size:"small",variant:"secondary",asChild:!0,children:t.jsx(C,{to:"create",children:e("actions.create")})})]}),t.jsx(q,{table:x,columns:m,count:i,filters:f,orderBy:[{key:"title",label:e("fields.title")},{key:"status",label:e("fields.status")},{key:"created_at",label:e("fields.createdAt")},{key:"updated_at",label:e("fields.updatedAt")}],queryObject:s,pageSize:c,navigateTo:l=>l.original.id,isLoading:p,pagination:!0,search:!0})]})},ve=()=>{const{getWidgets:e}=P();return t.jsx(E,{widgets:{after:e("price_list.list.after"),before:e("price_list.list.before")},children:t.jsx(R,{})})};export{ve as Component};
