import{C as x}from"./chunk-SLLOACFB-ygX4YwNH.js";import{V as l}from"./chunk-F6ZOHZVB-0kO3FtRN.js";import{a4 as c,a6 as n,dq as o,ai as y,a5 as f,b,dr as j,ab as _,ac as C,t as m,j as e,B as d}from"./index-BzevulME.js";import{K as v}from"./chunk-6HTZNHPT-Dbj6l338.js";import{u as F,R as a}from"./chunk-BFJYVY5L-D4vo-2CR.js";var T={name:"",description:"",campaign_identifier:"",starts_at:null,ends_at:null,budget:{type:"usage",currency_code:null,limit:null}},S=c({name:n().min(1),description:n().optional(),campaign_identifier:n().min(1),starts_at:o().nullable(),ends_at:o().nullable(),budget:c({limit:y().min(0).nullish(),type:f(["spend","usage"]),currency_code:n().nullish()})}),V=()=>{const{t:i}=b(),{handleSuccess:u}=F(),{mutateAsync:p,isPending:g}=j(),r=_({defaultValues:T,resolver:C(S)}),h=r.handleSubmit(async s=>{await p({name:s.name,description:s.description,campaign_identifier:s.campaign_identifier,starts_at:s.starts_at,ends_at:s.ends_at,budget:{type:s.budget.type,limit:s.budget.limit?s.budget.limit:void 0,currency_code:s.budget.currency_code}},{onSuccess:({campaign:t})=>{m.success(i("campaigns.create.successToast",{name:t.name})),u(`/campaigns/${t.id}`)},onError:t=>{m.error(t.message)}})});return e.jsx(a.Form,{form:r,children:e.jsxs(v,{onSubmit:h,className:"flex size-full flex-col overflow-hidden",children:[e.jsxs(a.Header,{children:[e.jsx(a.Title,{asChild:!0,children:e.jsx(l,{children:i("campaigns.create.title")})}),e.jsx(a.Description,{asChild:!0,children:e.jsx(l,{children:i("campaigns.create.description")})})]}),e.jsx(a.Body,{className:"flex size-full flex-col items-center overflow-auto py-16",children:e.jsx(x,{form:r})}),e.jsx(a.Footer,{children:e.jsxs("div",{className:"flex items-center justify-end gap-x-2",children:[e.jsx(a.Close,{asChild:!0,children:e.jsx(d,{size:"small",variant:"secondary",children:i("actions.cancel")})}),e.jsx(d,{size:"small",variant:"primary",type:"submit",isLoading:g,children:i("actions.create")})]})})]})})};export{S as C,T as D,V as a};
