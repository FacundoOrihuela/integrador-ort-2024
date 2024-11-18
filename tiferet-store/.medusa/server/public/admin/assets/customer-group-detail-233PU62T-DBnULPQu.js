import{u as q,a as E,b as I}from"./chunk-DJPQV344-BJ1r1fg6.js";import{d as z,R as L,d$ as M,a as Q,j as t,dF as $,q as x,r as v,b as l,dS as F,dX as C,H as b,L as H,B as O,u as B,dZ as K,A as S,T as h,p as J,s as Z,t as y}from"./index-BzevulME.js";import{S as W}from"./chunk-2RQLKDBF-Dxhmozx4.js";import{u as X,D as U}from"./chunk-OXHHPLX5-CqH3A1vO.js";import"./lodash-eSu3vCkj.js";import"./chunk-BV7MMCXV-CNMye-hv.js";import"./chunk-QLHWURNJ-CkSrJrxM.js";import{P as w}from"./pencil-square-CuE224vE.js";import{T as G}from"./trash-CTULpWQo.js";import{u as d}from"./use-prompt-SZWNtkO6.js";import{C as k}from"./container-VPG9vkka.js";import{C as f}from"./checkbox-4EYOd90v.js";import{c as V}from"./index-Cdiau-P3.js";import"./chunk-C76H5USB-PWSB2H-5.js";import"./chunk-B4FQDBC3-CaaKRSst.js";import"./chunk-P3UUX2T6-BmAVqeyo.js";import"./format-CrY511gm.js";import"./chunk-ADOCJB6L-Cd1njWd5.js";import"./Trans-CbwTMn7p.js";import"./x-mark-mini-BbWfBVGF.js";import"./chunk-YEDAFXMB-CBc3PzO1.js";import"./chunk-AOFGTNG6-F_1H3ii8.js";import"./chunk-WX2SMNCD-CHpe_MZm.js";import"./plus-mini-D9pXXI65.js";import"./command-bar-Dxfv9HA8.js";import"./index-CgUwoWkB.js";import"./chunk-X4PARRTU-XZk3pZNC.js";import"./date-picker-DbemC0oI.js";import"./popover-C0Ig9DZr.js";import"./triangle-left-mini-NExUVXMr.js";import"./prompt-DyhpapC0.js";var m=10,Y=({group:o})=>{const[s,e]=v.useState({}),{t:r}=l(),i=d(),{searchParams:c,raw:a}=q({pageSize:m}),{customers:p,count:u,isLoading:T,isError:P,error:R}=F({...c,groups:o.id}),g=se(),A=E(["groups"]),{table:D}=X({data:p??[],columns:g,count:u,getRowId:n=>n.id,enablePagination:!0,enableRowSelection:!0,pageSize:m,rowSelection:{state:s,updater:e},meta:{customerGroupId:o.id}});if(P)throw R;const{mutateAsync:N}=C(o.id),_=async()=>{const n=Object.keys(s);await i({title:r("customerGroups.customers.remove.title",{count:n.length}),description:r("customerGroups.customers.remove.description",{count:n.length}),confirmText:r("actions.continue"),cancelText:r("actions.cancel")})&&await N(n,{onSuccess:()=>{e({})}})};return t.jsxs(k,{className:"divide-y p-0",children:[t.jsxs("div",{className:"flex items-center justify-between px-6 py-4",children:[t.jsx(b,{level:"h2",children:r("customers.domain")}),t.jsx(H,{to:`/customer-groups/${o.id}/add-customers`,children:t.jsx(O,{variant:"secondary",size:"small",children:r("general.add")})})]}),t.jsx(U,{table:D,columns:g,pageSize:m,isLoading:T,count:u,navigateTo:n=>`/customers/${n.id}`,filters:A,search:!0,pagination:!0,orderBy:[{key:"email",label:r("fields.email")},{key:"first_name",label:r("fields.firstName")},{key:"last_name",label:r("fields.lastName")},{key:"has_account",label:r("customers.hasAccount")},{key:"created_at",label:r("fields.createdAt")},{key:"updated_at",label:r("fields.updatedAt")}],queryObject:a,commands:[{action:_,label:r("actions.remove"),shortcut:"r"}],noRecords:{message:r("customerGroups.customers.list.noRecordsMessage")}})]})},ee=({customer:o,customerGroupId:s})=>{const{t:e}=l(),{mutateAsync:r}=C(s),i=d(),c=async()=>{await i({title:e("customerGroups.customers.remove.title",{count:1}),description:e("customerGroups.customers.remove.description",{count:1}),confirmText:e("actions.continue"),cancelText:e("actions.cancel")})&&await r([o.id])};return t.jsx(S,{groups:[{actions:[{icon:t.jsx(w,{}),label:e("actions.edit"),to:`/customers/${o.id}/edit`}]},{actions:[{icon:t.jsx(G,{}),label:e("actions.remove"),onClick:c}]}]})},j=V(),se=()=>{const o=I();return v.useMemo(()=>[j.display({id:"select",header:({table:s})=>t.jsx(f,{checked:s.getIsSomePageRowsSelected()?"indeterminate":s.getIsAllPageRowsSelected(),onCheckedChange:e=>s.toggleAllPageRowsSelected(!!e)}),cell:({row:s})=>t.jsx(f,{checked:s.getIsSelected(),onCheckedChange:e=>s.toggleSelected(!!e),onClick:e=>{e.stopPropagation()}})}),...o,j.display({id:"actions",cell:({row:s,table:e})=>{const{customerGroupId:r}=e.options.meta;return t.jsx(ee,{customer:s.original,customerGroupId:r})}})],[o])},te=({group:o})=>{var a;const{t:s}=l(),e=d(),r=B(),{mutateAsync:i}=K(o.id),c=async()=>{await e({title:s("customerGroups.delete.title"),description:s("customerGroups.delete.description",{name:o.name}),confirmText:s("actions.delete"),cancelText:s("actions.cancel")})&&await i(void 0,{onSuccess:()=>{y.success(s("customerGroups.delete.successToast",{name:o.name})),r("/customer-groups",{replace:!0})},onError:u=>{y.error(u.message)}})};return t.jsxs(k,{className:"divide-y p-0",children:[t.jsxs("div",{className:"flex items-center justify-between px-6 py-4",children:[t.jsx(b,{children:o.name}),t.jsx(S,{groups:[{actions:[{icon:t.jsx(w,{}),label:s("actions.edit"),to:`/customer-groups/${o.id}/edit`}]},{actions:[{icon:t.jsx(G,{}),label:s("actions.delete"),onClick:c}]}]})]}),t.jsxs("div",{className:"text-ui-fg-subtle grid grid-cols-2 items-center px-6 py-4",children:[t.jsx(h,{size:"small",leading:"compact",weight:"plus",children:s("customers.domain")}),t.jsx(h,{size:"small",leading:"compact",children:((a=o.customers)==null?void 0:a.length)||"-"})]})]})},Ie=()=>{const o=z(),{id:s}=L(),{customer_group:e,isLoading:r,isError:i,error:c}=M(s,{fields:"+customers.id"},{initialData:o}),{getWidgets:a}=Q();if(r||!e)return t.jsx($,{sections:2,showJSON:!0,showMetadata:!0});if(i)throw c;return t.jsxs(W,{widgets:{before:a("customer_group.details.before"),after:a("customer_group.details.after")},showJSON:!0,showMetadata:!0,data:e,children:[t.jsx(te,{group:e}),t.jsx(Y,{group:e})]})},oe=o=>({queryKey:J.detail(o),queryFn:async()=>Z.admin.customerGroup.retrieve(o,{fields:"+customers.id"})}),ze=async({params:o})=>{const s=o.id,e=oe(s);return x.getQueryData(e.queryKey)??await x.fetchQuery(e)};export{Ie as Component,ze as loader};
