import{ee as o,a as c,j as e,dF as d,b as m,H as g,T as i,A as p,bP as x}from"./index-BzevulME.js";import{S as f}from"./chunk-2RQLKDBF-Dxhmozx4.js";import{P as j}from"./pencil-square-CuE224vE.js";import{C as u}from"./container-VPG9vkka.js";import"./Trans-CbwTMn7p.js";import"./x-mark-mini-BbWfBVGF.js";var h=({user:a})=>{var l;const{i18n:n,t:s}=m(),r=[a.first_name,a.last_name].filter(Boolean).join(" ");return e.jsxs(u,{className:"divide-y p-0",children:[e.jsxs("div",{className:"flex items-center justify-between px-6 py-4",children:[e.jsxs("div",{children:[e.jsx(g,{children:s("profile.domain")}),e.jsx(i,{className:"text-ui-fg-subtle",size:"small",children:s("profile.manageYourProfileDetails")})]}),e.jsx(p,{groups:[{actions:[{label:s("actions.edit"),to:"edit",icon:e.jsx(j,{})}]}]})]}),e.jsxs("div",{className:"text-ui-fg-subtle grid grid-cols-2 items-center px-6 py-4",children:[e.jsx(i,{size:"small",leading:"compact",weight:"plus",children:s("fields.name")}),e.jsx(i,{size:"small",leading:"compact",children:r||"-"})]}),e.jsxs("div",{className:"grid grid-cols-2 items-center px-6 py-4",children:[e.jsx(i,{size:"small",leading:"compact",weight:"plus",children:s("fields.email")}),e.jsx(i,{size:"small",leading:"compact",children:a.email})]}),e.jsxs("div",{className:"grid grid-cols-2 items-center px-6 py-4",children:[e.jsx(i,{size:"small",leading:"compact",weight:"plus",children:s("profile.fields.languageLabel")}),e.jsx(i,{size:"small",leading:"compact",children:((l=x.find(t=>t.code===n.language))==null?void 0:l.display_name)||"-"})]})]})},N=()=>{const{user:a,isPending:n,isError:s,error:r}=o(),{getWidgets:l}=c();if(n||!a)return e.jsx(d,{sections:1});if(s)throw r;return e.jsx(f,{widgets:{after:l("profile.details.after"),before:l("profile.details.before")},children:e.jsx(h,{user:a})})};export{N as Component};
