import{ct as l,s as n,d7 as y,aC as p,q as s,dd as o}from"./index-BzevulME.js";var d="shipping_options",r=y(d),v=(e,i,a)=>{const{data:t,...u}=l({queryFn:()=>n.admin.shippingOption.retrieve(e,i),queryKey:r.detail(e),...a});return{...t,...u}},O=(e,i)=>{const{data:a,...t}=l({queryFn:()=>n.admin.shippingOption.list(e),queryKey:r.list(e),...i});return{...a,...t}},g=e=>p({mutationFn:i=>n.admin.shippingOption.create(i),onSuccess:(i,a,t)=>{s.invalidateQueries({queryKey:o.all}),s.invalidateQueries({queryKey:r.all})},...e}),h=(e,i)=>p({mutationFn:a=>n.admin.shippingOption.update(e,a),onSuccess:(a,t,u)=>{s.invalidateQueries({queryKey:o.all}),s.invalidateQueries({queryKey:r.all})},...i}),q=(e,i)=>p({mutationFn:()=>n.admin.shippingOption.delete(e),onSuccess:(a,t,u)=>{s.invalidateQueries({queryKey:o.all}),s.invalidateQueries({queryKey:r.all})},...i});export{q as a,g as b,h as c,v as d,r as s,O as u};
