import{r as e,m as s,I as d,b6 as g,cZ as x,aN as f,aS as p}from"./index-BzevulME.js";import{X as E}from"./x-mark-mini-BbWfBVGF.js";const b=e.forwardRef(({variant:t="info",dismissible:r=!1,className:a,children:o,...n},c)=>{const[i,l]=e.useState(!1),m={info:g,error:x,success:f,warning:p}[t],u=()=>{l(!0)};return i?null:e.createElement("div",{ref:c,className:s("bg-ui-bg-subtle text-pretty txt-compact-small grid items-start gap-x-2 rounded-lg border p-3",{"grid-cols-[20px_1fr]":!r,"grid-cols-[20px_1fr_20px]":r},a),...n},e.createElement(m,{className:s({"text-ui-tag-red-icon":t==="error","text-ui-tag-green-icon":t==="success","text-ui-tag-orange-icon":t==="warning","text-ui-tag-neutral-icon":t==="info"})}),e.createElement("div",null,o),r&&e.createElement(d,{size:"2xsmall",variant:"transparent",type:"button",onClick:u},e.createElement(E,{className:"text-ui-fg-muted"})))});export{b as A};
