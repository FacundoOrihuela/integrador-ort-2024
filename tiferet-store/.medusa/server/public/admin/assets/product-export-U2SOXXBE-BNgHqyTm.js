import{b as o,j as s,H as c,Q as x,B as i,T as u,t as a}from"./index-BzevulME.js";import{u as m,a as h}from"./chunk-M45EGGOK-G5zTmk25.js";import{D as j}from"./chunk-BV7MMCXV-CNMye-hv.js";import"./chunk-QLHWURNJ-CkSrJrxM.js";import{b as t,u as f}from"./chunk-BFJYVY5L-D4vo-2CR.js";import"./chunk-C76H5USB-PWSB2H-5.js";import"./lodash-eSu3vCkj.js";import"./chunk-X4PARRTU-XZk3pZNC.js";import"./format-CrY511gm.js";import"./date-picker-DbemC0oI.js";import"./popover-C0Ig9DZr.js";import"./index-CgUwoWkB.js";import"./x-mark-mini-BbWfBVGF.js";import"./triangle-left-mini-NExUVXMr.js";import"./prompt-DyhpapC0.js";var v=()=>{const{t:r}=o(),e=h();return s.jsxs("div",{children:[s.jsx(c,{level:"h2",children:r("products.export.filters.title")}),s.jsx(u,{size:"small",className:"text-ui-fg-subtle",children:r("products.export.filters.description")}),s.jsx("div",{className:"mt-4",children:s.jsx(j,{filters:e,readonly:!0})})]})},S=()=>{const{t:r}=o();return s.jsxs(t,{children:[s.jsxs(t.Header,{children:[s.jsx(t.Title,{asChild:!0,children:s.jsx(c,{children:r("products.export.header")})}),s.jsx(t.Description,{className:"sr-only",children:r("products.export.description")})]}),s.jsx(y,{})]})},y=()=>{const{t:r}=o(),{searchParams:e}=m({}),{mutateAsync:n}=x(e),{handleSuccess:l}=f(),d=async()=>{await n({},{onSuccess:()=>{a.info(r("products.export.success.title"),{description:r("products.export.success.description")}),l()},onError:p=>{a.error(p.message)}})};return s.jsxs(s.Fragment,{children:[s.jsx(t.Body,{children:s.jsx(v,{})}),s.jsx(t.Footer,{children:s.jsxs("div",{className:"flex items-center gap-x-2",children:[s.jsx(t.Close,{asChild:!0,children:s.jsx(i,{size:"small",variant:"secondary",children:r("actions.cancel")})}),s.jsx(i,{onClick:d,size:"small",children:r("actions.export")})]})})]})};export{S as Component};
