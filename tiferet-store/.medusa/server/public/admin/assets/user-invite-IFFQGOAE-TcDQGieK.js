import{r as A}from"./chunk-K7S5TX6I-CZmLQuG4.js";import{u as D}from"./chunk-C76H5USB-PWSB2H-5.js";import{u as C,a as F,b as L,c as R}from"./chunk-A4BT35CV-SqsKP-PP.js";import{u as U,D as H}from"./chunk-OXHHPLX5-CqH3A1vO.js";import{r as n,aM as z,a4 as q,a6 as B,j as r,b,ab as $,ac as K,w as V,H as I,T as W,x as p,y as J,B as Q,W as h,A as G}from"./index-BzevulME.js";import"./lodash-eSu3vCkj.js";import"./chunk-BV7MMCXV-CNMye-hv.js";import"./chunk-QLHWURNJ-CkSrJrxM.js";import{K as X}from"./chunk-6HTZNHPT-Dbj6l338.js";import{R as f}from"./chunk-BFJYVY5L-D4vo-2CR.js";import{T as Y}from"./Trans-CbwTMn7p.js";import{A as Z}from"./arrow-path-Cwje5jcA.js";import{T as ee}from"./trash-CTULpWQo.js";import{u as re}from"./use-prompt-SZWNtkO6.js";import{A as te}from"./alert-BHRu22_C.js";import{C as ae}from"./container-VPG9vkka.js";import{f as u}from"./format-CrY511gm.js";import{S as y}from"./status-badge-ygmBrzre.js";import{c as se}from"./index-Cdiau-P3.js";import"./chunk-YEDAFXMB-CBc3PzO1.js";import"./chunk-AOFGTNG6-F_1H3ii8.js";import"./chunk-WX2SMNCD-CHpe_MZm.js";import"./plus-mini-D9pXXI65.js";import"./command-bar-Dxfv9HA8.js";import"./index-CgUwoWkB.js";import"./chunk-X4PARRTU-XZk3pZNC.js";import"./date-picker-DbemC0oI.js";import"./popover-C0Ig9DZr.js";import"./x-mark-mini-BbWfBVGF.js";import"./triangle-left-mini-NExUVXMr.js";import"./prompt-DyhpapC0.js";var ie=Object.defineProperty,x=Object.getOwnPropertySymbols,S=Object.prototype.hasOwnProperty,P=Object.prototype.propertyIsEnumerable,M=(e,t,a)=>t in e?ie(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a,ne=(e,t)=>{for(var a in t||(t={}))S.call(t,a)&&M(e,a,t[a]);if(x)for(var a of x(t))P.call(t,a)&&M(e,a,t[a]);return e},oe=(e,t)=>{var a={};for(var s in e)S.call(e,s)&&t.indexOf(s)<0&&(a[s]=e[s]);if(e!=null&&x)for(var s of x(e))t.indexOf(s)<0&&P.call(e,s)&&(a[s]=e[s]);return a};const E=n.forwardRef((e,t)=>{var a=e,{color:s="currentColor"}=a,i=oe(a,["color"]);return n.createElement("svg",ne({xmlns:"http://www.w3.org/2000/svg",width:15,height:15,fill:"none",ref:t},i),n.createElement("g",{stroke:s,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:1.5,clipPath:"url(#a)"},n.createElement("path",{d:"m6.44 3.965 1.59-1.591a3.25 3.25 0 1 1 4.597 4.596l-1.591 1.59M3.964 6.44l-1.59 1.59a3.25 3.25 0 1 0 4.596 4.597l1.59-1.591M5.909 9.09 9.091 5.91"})),n.createElement("defs",null,n.createElement("clipPath",{id:"a"},n.createElement("path",{fill:"#fff",d:"M0 0h15v15H0z"}))))});E.displayName="Link";var le=({prefix:e,pageSize:t=20})=>{const a=D(["offset","q","order","created_at","updated_at"],e),{offset:s,created_at:i,updated_at:o,q:l,order:c}=a;return{searchParams:{limit:t,offset:s?Number(s):0,order:c,created_at:i?JSON.parse(i):void 0,updated_at:o?JSON.parse(o):void 0,q:l},raw:a}},ce=z(A()),de=q({email:B().email()}),j=10,g="usr_invite",me=`${window.location.origin}/app/invite?token=`,pe=()=>{const{t:e}=b(),t=$({defaultValues:{email:""},resolver:K(de)}),{raw:a,searchParams:s}=le({prefix:g,pageSize:j}),{invites:i,count:o,isPending:l,isError:c,error:d}=C(s),w=fe(),{table:N}=U({data:i??[],columns:w,count:o,enablePagination:!0,getRowId:m=>m.id,pageSize:j,prefix:g}),{mutateAsync:O,isPending:T}=F(),k=t.handleSubmit(async m=>{try{await O({email:m.email}),t.reset()}catch(v){if(V(v)&&v.status===400){t.setError("root",{type:"manual",message:v.message});return}}});if(c)throw d;return r.jsx(f.Form,{form:t,children:r.jsxs(X,{onSubmit:k,className:"flex h-full flex-col overflow-hidden",children:[r.jsx(f.Header,{}),r.jsx(f.Body,{className:"flex flex-1 flex-col overflow-hidden",children:r.jsx("div",{className:"flex flex-1 flex-col items-center overflow-y-auto",children:r.jsxs("div",{className:"flex w-full max-w-[720px] flex-col gap-y-8 px-2 py-16",children:[r.jsxs("div",{children:[r.jsx(I,{children:e("users.inviteUser")}),r.jsx(W,{size:"small",className:"text-ui-fg-subtle",children:e("users.inviteUserHint")})]}),t.formState.errors.root&&r.jsx(te,{variant:"error",dismissible:!1,className:"text-balance",children:t.formState.errors.root.message}),r.jsxs("div",{className:"flex flex-col gap-y-4",children:[r.jsx("div",{className:"grid grid-cols-2 gap-4",children:r.jsx(p.Field,{control:t.control,name:"email",render:({field:m})=>r.jsxs(p.Item,{children:[r.jsx(p.Label,{children:e("fields.email")}),r.jsx(p.Control,{children:r.jsx(J,{...m})}),r.jsx(p.ErrorMessage,{})]})})}),r.jsx("div",{className:"flex items-center justify-end",children:r.jsx(Q,{size:"small",variant:"secondary",type:"submit",isLoading:T,children:e("users.sendInvite")})})]}),r.jsxs("div",{className:"flex flex-col gap-y-4",children:[r.jsx(I,{level:"h2",children:e("users.pendingInvites")}),r.jsx(ae,{className:"overflow-hidden p-0",children:r.jsx(H,{table:N,columns:w,count:o,pageSize:j,pagination:!0,search:"autofocus",isLoading:l,queryObject:a,prefix:g,orderBy:[{key:"email",label:e("fields.email")},{key:"created_at",label:e("fields.createdAt")},{key:"updated_at",label:e("fields.updatedAt")}]})})]})]})})})]})})},ue=({invite:e})=>{const{mutateAsync:t}=L(e.id),{mutateAsync:a}=R(e.id),s=re(),{t:i}=b(),o=async()=>{await s({title:i("general.areYouSure"),description:i("users.deleteInviteWarning",{email:e.email}),cancelText:i("actions.cancel"),confirmText:i("actions.delete")})&&await t()},l=async()=>{await a()},c=()=>{const d=`${me}${e.token}`;(0,ce.default)(d)};return r.jsx(G,{groups:[{actions:[{icon:r.jsx(Z,{}),label:i("users.resendInvite"),onClick:l}]},{actions:[{icon:r.jsx(E,{}),label:i("users.copyInviteLink"),onClick:c}]},{actions:[{icon:r.jsx(ee,{}),label:i("actions.delete"),onClick:o}]}]})},_=se(),fe=()=>{const{t:e}=b();return n.useMemo(()=>[_.accessor("email",{header:e("fields.email"),cell:({getValue:t})=>t()}),_.accessor("accepted",{header:e("fields.status"),cell:({getValue:t,row:a})=>{const s=t(),i=new Date(a.original.expires_at)<new Date;return s?r.jsx(h,{content:e("users.acceptedOnDate",{date:u(new Date(a.original.updated_at),"dd MMM, yyyy")}),children:r.jsx(y,{color:"green",children:e("users.inviteStatus.accepted")})}):i?r.jsx(h,{content:e("users.expiredOnDate",{date:u(new Date(a.original.expires_at),"dd MMM, yyyy")}),children:r.jsx(y,{color:"red",children:e("users.inviteStatus.expired")})}):r.jsx(h,{content:r.jsx(Y,{i18nKey:"users.validFromUntil",components:[r.jsx("span",{className:"font-medium"},"from"),r.jsx("span",{className:"font-medium"},"untill")],values:{from:u(new Date(a.original.created_at),"dd MMM, yyyy"),until:u(new Date(a.original.expires_at),"dd MMM, yyyy")}}),children:r.jsx(y,{color:"orange",children:e("users.inviteStatus.pending")})})}}),_.display({id:"actions",cell:({row:t})=>r.jsx(ue,{invite:t.original})})],[e])},Ve=()=>r.jsx(f,{children:r.jsx(pe,{})});export{Ve as Component};
