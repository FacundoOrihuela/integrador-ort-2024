import{L as Q}from"./chunk-I3VB6NM2-DDnzIFnQ.js";import{u as B}from"./chunk-VKE5YV4E-pLEJ0Fju.js";import{g as M}from"./chunk-G2J2T2QU-DqyL9897.js";import{D as F}from"./chunk-EGEHMMNW-B7mb5mW5.js";import{u as I}from"./chunk-RJSD5KRU-mqyE7pqx.js";import{q as P,R as K,dN as Y,a as $,j as e,U as J,dO as G,s as U,b as u,H as j,A as m,dM as W,aH as X,T as d,u as Z,r as C,e as V,k as ee,dP as L,Y as se,t as p}from"./index-BzevulME.js";import{u as te,a as ie}from"./chunk-M45EGGOK-G5zTmk25.js";import{T as g}from"./chunk-2RQLKDBF-Dxhmozx4.js";import{u as re,D as ae}from"./chunk-OXHHPLX5-CqH3A1vO.js";import"./lodash-eSu3vCkj.js";import"./chunk-BV7MMCXV-CNMye-hv.js";import"./chunk-QLHWURNJ-CkSrJrxM.js";import{P as x}from"./pencil-square-CuE224vE.js";import{T as k}from"./trash-CTULpWQo.js";import{u as N}from"./use-prompt-SZWNtkO6.js";import{C as y}from"./container-VPG9vkka.js";import{S as oe}from"./status-badge-ygmBrzre.js";import{C as S}from"./checkbox-4EYOd90v.js";import{c as ce}from"./index-Cdiau-P3.js";import"./chunk-6GU6IDUA-CDc7wW5L.js";import"./chunk-X4PARRTU-XZk3pZNC.js";import"./format-CrY511gm.js";import"./chunk-RERSP5B2-BGmEOTLu.js";import"./chunk-ADOCJB6L-Cd1njWd5.js";import"./chunk-P3UUX2T6-BmAVqeyo.js";import"./chunk-C76H5USB-PWSB2H-5.js";import"./Trans-CbwTMn7p.js";import"./x-mark-mini-BbWfBVGF.js";import"./chunk-YEDAFXMB-CBc3PzO1.js";import"./chunk-AOFGTNG6-F_1H3ii8.js";import"./chunk-WX2SMNCD-CHpe_MZm.js";import"./plus-mini-D9pXXI65.js";import"./command-bar-Dxfv9HA8.js";import"./index-CgUwoWkB.js";import"./date-picker-DbemC0oI.js";import"./popover-C0Ig9DZr.js";import"./triangle-left-mini-NExUVXMr.js";import"./prompt-DyhpapC0.js";var ne=i=>({queryKey:G.detail(i),queryFn:async()=>U.admin.priceList.retrieve(i)}),Ve=async({params:i})=>{const s=i.id,t=ne(s);return P.getQueryData(t.queryKey)??await P.fetchQuery(t)},le=({priceList:i})=>{const{t:s}=u();return e.jsxs(y,{className:"flex flex-col gap-y-4",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx(j,{level:"h2",children:s("priceLists.configuration.header")}),e.jsx(de,{priceList:i})]}),e.jsx(m,{groups:[{actions:[{label:s("actions.edit"),to:"configuration",icon:e.jsx(x,{})}]}]})]}),e.jsx(F,{endsAt:i.ends_at,startsAt:i.starts_at,showTime:!0})]})},de=({priceList:i})=>{const{t:s}=u(),t=i.rules.customer_group_id,{customer_groups:r,isPending:a,isError:o,error:n}=W({id:t},{enabled:!!(t!=null&&t.length)});if(o)throw n;return t!=null&&t.length?a||!r?e.jsx(X,{className:"h-5 w-full max-w-48"}):e.jsxs("div",{className:"txt-small-plus text-ui-fg-muted flex items-center gap-x-1.5",children:[e.jsx("span",{className:"text-ui-fg-subtle",children:s("priceLists.fields.customerAvailability.attribute")}),e.jsx("span",{children:"·"}),e.jsx(Q,{list:r.map(c=>c.name),n:1,className:"txt-small-plus text-ui-fg-muted"})]}):null},ue=({priceList:i})=>{var c;const{t:s}=u(),t=((c=i.prices)==null?void 0:c.length)||0,{color:r,text:a}=M(s,i),o=B({priceList:i}),n=i.type==="sale"?s("priceLists.fields.type.options.sale.label"):s("priceLists.fields.type.options.override.label");return e.jsxs(y,{className:"divide-y p-0",children:[e.jsxs("div",{className:"flex items-center justify-between px-6 py-4",children:[e.jsx(j,{children:i.title}),e.jsxs("div",{className:"flex items-center gap-x-4",children:[e.jsx(oe,{color:r,children:a}),e.jsx(m,{groups:[{actions:[{label:s("actions.edit"),to:"edit",icon:e.jsx(x,{})}]},{actions:[{label:s("actions.delete"),onClick:o,icon:e.jsx(k,{})}]}]})]})]}),e.jsxs("div",{className:"text-ui-fg-subtle grid grid-cols-2 items-center px-6 py-4",children:[e.jsx(d,{leading:"compact",size:"small",weight:"plus",children:s("fields.type")}),e.jsx(d,{size:"small",className:"text-pretty",children:n})]}),e.jsxs("div",{className:"text-ui-fg-subtle grid grid-cols-2 items-center px-6 py-4",children:[e.jsx(d,{leading:"compact",size:"small",weight:"plus",children:s("fields.description")}),e.jsx(d,{size:"small",className:"text-pretty",children:i.description})]}),e.jsxs("div",{className:"text-ui-fg-subtle grid grid-cols-2 items-center px-6 py-4",children:[e.jsx(d,{leading:"compact",size:"small",weight:"plus",children:s("priceLists.fields.priceOverrides.label")}),e.jsx(d,{size:"small",className:"text-pretty",children:t||"-"})]})]})},f=10,h="p",pe=({priceList:i})=>{const{t:s}=u(),t=Z(),r=N(),[a,o]=C.useState({}),{searchParams:n,raw:c}=te({pageSize:f,prefix:h}),{products:T,count:b,isLoading:D,isError:A,error:_}=V({...n,price_list_id:[i.id]},{placeholderData:ee}),E=ie(),v=xe(i),{mutateAsync:R}=L(i.id),{table:z}=re({data:T||[],count:b,columns:v,enablePagination:!0,enableRowSelection:!0,pageSize:f,getRowId:l=>l.id,rowSelection:{state:a,updater:o},prefix:h}),O=async()=>{await r({title:s("general.areYouSure"),description:s("priceLists.products.delete.confirmation",{count:Object.keys(a).length}),confirmText:s("actions.delete"),cancelText:s("actions.cancel")})&&R({remove:Object.keys(a)},{onSuccess:()=>{p.success(s("priceLists.products.delete.successToast",{count:Object.keys(a).length})),o({})},onError:H=>{p.error(H.message)}})},q=async()=>{const l=Object.keys(a).join(",");t(`products/edit?ids[]=${l}`)};if(A)throw _;return e.jsxs(y,{className:"divide-y p-0",children:[e.jsxs("div",{className:"flex items-center justify-between px-6 py-4",children:[e.jsx(j,{children:s("priceLists.products.header")}),e.jsx(m,{groups:[{actions:[{label:s("priceLists.products.actions.addProducts"),to:"products/add",icon:e.jsx(se,{})},{label:s("priceLists.products.actions.editPrices"),to:"products/edit",icon:e.jsx(x,{})}]}]})]}),e.jsx(ae,{table:z,filters:E,columns:v,count:b,pageSize:f,isLoading:D,navigateTo:l=>`/products/${l.original.id}`,orderBy:[{key:"title",label:s("fields.title")},{key:"created_at",label:s("fields.createdAt")},{key:"updated_at",label:s("fields.updatedAt")}],commands:[{action:q,label:s("actions.edit"),shortcut:"e"},{action:O,label:s("actions.delete"),shortcut:"d"}],pagination:!0,search:!0,prefix:h,queryObject:c})]})},me=({product:i,priceList:s})=>{const{t}=u(),r=N(),{mutateAsync:a}=L(s.id),o=async()=>{await r({title:t("general.areYouSure"),description:t("priceLists.products.delete.confirmation",{count:1}),confirmText:t("actions.delete"),cancelText:t("actions.cancel")})&&a({remove:[i.id]},{onSuccess:()=>{p.success(t("priceLists.products.delete.successToast",{count:1}))},onError:c=>{p.error(c.message)}})};return e.jsx(m,{groups:[{actions:[{icon:e.jsx(x,{}),label:t("priceLists.products.actions.editPrices"),to:`products/edit?ids[]=${i.id}`}]},{actions:[{icon:e.jsx(k,{}),label:t("actions.remove"),onClick:o}]}]})},w=ce(),xe=i=>{const s=I();return C.useMemo(()=>[w.display({id:"select",header:({table:t})=>e.jsx(S,{checked:t.getIsSomePageRowsSelected()?"indeterminate":t.getIsAllPageRowsSelected(),onCheckedChange:r=>t.toggleAllPageRowsSelected(!!r)}),cell:({row:t})=>e.jsx(S,{checked:t.getIsSelected(),onCheckedChange:r=>t.toggleSelected(!!r),onClick:r=>{r.stopPropagation()}})}),...s,w.display({id:"actions",cell:({row:t})=>e.jsx(me,{product:t.original,priceList:i})})],[s,i])},es=()=>{const{id:i}=K(),{price_list:s,isLoading:t,isError:r,error:a}=Y(i),{getWidgets:o}=$();if(t||!s)return e.jsx(J,{mainSections:2,sidebarSections:1,showJSON:!0});if(r)throw a;return e.jsxs(g,{widgets:{after:o("price_list.details.after"),before:o("price_list.details.before"),sideAfter:o("price_list.details.side.after"),sideBefore:o("price_list.details.side.before")},data:s,showJSON:!0,children:[e.jsxs(g.Main,{children:[e.jsx(ue,{priceList:s}),e.jsx(pe,{priceList:s})]}),e.jsx(g.Sidebar,{children:e.jsx(le,{priceList:s})})]})};export{es as Component,Ve as loader};
