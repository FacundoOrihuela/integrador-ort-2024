import{b as c,u as i,aJ as u,t as a}from"./index-BzevulME.js";import{u as l}from"./use-prompt-SZWNtkO6.js";var f=t=>{const{t:e}=c(),s=i(),o=l(),{mutateAsync:r}=u(t.id);return async()=>{await o({title:e("general.areYouSure"),description:e("categories.delete.confirmation",{name:t.name}),confirmText:e("actions.delete"),cancelText:e("actions.cancel")})&&await r(void 0,{onSuccess:()=>{a.success(e("categories.delete.successToast",{name:t.name})),s("/categories",{replace:!0})},onError:n=>{a.error(n.message)}})}};export{f as u};
