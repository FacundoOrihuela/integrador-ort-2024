import{u as p}from"./chunk-C76H5USB-PWSB2H-5.js";import{u as i}from"./chunk-W7625H47-Dk2m8uo5.js";import{a as l}from"./chunk-B4FQDBC3-CaaKRSst.js";import{a as n}from"./chunk-OI7BBNYW-DqLH_Gp-.js";import{b as f,r as x,j as r}from"./index-BzevulME.js";import{c as T}from"./index-Cdiau-P3.js";var C=({prefix:e,pageSize:a=20})=>{const s=p(["offset","q","order","created_at","updated_at"],e),{offset:o,q:c,order:m,created_at:u,updated_at:d}=s;return{searchParams:{limit:a,offset:o?Number(o):0,order:m,created_at:u?JSON.parse(u):void 0,updated_at:d?JSON.parse(d):void 0,q:c},raw:s}},F=()=>i(),t=T(),q=()=>{const{t:e}=f();return x.useMemo(()=>[t.accessor("value",{header:()=>e("fields.value"),cell:({getValue:a})=>r.jsx(n,{text:a()})}),t.accessor("created_at",{header:()=>e("fields.createdAt"),cell:({getValue:a})=>r.jsx(l,{date:a()})}),t.accessor("updated_at",{header:()=>e("fields.updatedAt"),cell:({getValue:a})=>r.jsx(l,{date:a()})})],[e])};export{F as a,q as b,C as u};
