import{b as d,j as e,H as g,r as h,M as z,N as C,T as l,P as f,B as w,G as T,D as I,t as m}from"./index-BzevulME.js";import{F as N}from"./chunk-TYTNUPXB-BSOUyq2-.js";import{b as o,u as M}from"./chunk-BFJYVY5L-D4vo-2CR.js";import{T as V}from"./trash-CTULpWQo.js";import"./prompt-DyhpapC0.js";var x=["text/csv"],U=[".csv"],E=({onUploaded:t})=>{const{t:a}=d(),[r,i]=h.useState(),u=s=>{const n=s.find(p=>!x.includes(p.file.type));return n?(i(a("products.media.invalidFileType",{name:n.file.name,types:U.join(", ")})),!0):!1};return e.jsxs("div",{className:"flex flex-col gap-y-4",children:[e.jsx(N,{label:a("products.import.uploadLabel"),hint:a("products.import.uploadHint"),multiple:!1,hasError:!!r,formats:x,onUploaded:s=>{i(void 0),!u(s)&&t(s[0].file)}}),r&&e.jsx("div",{children:e.jsx(T,{variant:"error",children:r})})]})},F=({summary:t})=>{const{t:a}=d();return e.jsxs("div",{className:"shadow-elevation-card-rest bg-ui-bg-component transition-fg rounded-md flex flex-row px-3 py-2",children:[e.jsx(v,{title:t.toCreate.toLocaleString(),description:a("products.import.upload.productsToCreate")}),e.jsx(I,{orientation:"vertical",className:"px-3 h-10"}),e.jsx(v,{title:t.toUpdate.toLocaleString(),description:a("products.import.upload.productsToUpdate")})]})},v=({title:t,description:a})=>e.jsxs("div",{className:"flex-1 flex flex-col justify-center",children:[e.jsx(l,{size:"xlarge",className:"font-sans font-medium",children:t}),e.jsx(l,{leading:"compact",size:"xsmall",weight:"plus",className:"text-ui-fg-subtle",children:a})]}),R=`data:text/csv;charset=utf-8,Product Id;Product Handle;Product Title;Product Subtitle;Product Description;Product Status;Product Thumbnail;Product Weight;Product Length;Product Width;Product Height;Product HS Code;Product Origin Country;Product MID Code;Product Material;Product Collection Title;Product Collection Handle;Product Type;Product Tags;Product Discountable;Product External Id;Product Profile Name;Product Profile Type;Variant Id;Variant Title;Variant SKU;Variant Barcode;Variant Inventory Quantity;Variant Allow Backorder;Variant Manage Inventory;Variant Weight;Variant Length;Variant Width;Variant Height;Variant HS Code;Variant Origin Country;Variant MID Code;Variant Material;Price EUR;Price USD;Option 1 Name;Option 1 Value;Image 1 Url;Image 2 Url
;coffee-mug-v2;Medusa Coffee Mug;;Every programmer's best friend.;published;https://medusa-public-images.s3.eu-west-1.amazonaws.com/coffee-mug.png;400;;;;;;;;;;;;true;;;;;One Size;;;100;false;true;;;;;;;;;1000;1200;Size;One Size;https://medusa-public-images.s3.eu-west-1.amazonaws.com/coffee-mug.png;
;sweatpants-v2;Medusa Sweatpants;;Reimagine the feeling of classic sweatpants. With our cotton sweatpants, everyday essentials no longer have to be ordinary.;published;https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatpants-gray-front.png;400;;;;;;;;;;;;true;;;;;S;;;100;false;true;;;;;;;;;2950;3350;Size;S;https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatpants-gray-front.png;https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatpants-gray-back.png
;sweatpants-v2;Medusa Sweatpants;;Reimagine the feeling of classic sweatpants. With our cotton sweatpants, everyday essentials no longer have to be ordinary.;published;https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatpants-gray-front.png;400;;;;;;;;;;;;true;;;;;M;;;100;false;true;;;;;;;;;2950;3350;Size;M;https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatpants-gray-front.png;https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatpants-gray-back.png
;sweatpants-v2;Medusa Sweatpants;;Reimagine the feeling of classic sweatpants. With our cotton sweatpants, everyday essentials no longer have to be ordinary.;published;https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatpants-gray-front.png;400;;;;;;;;;;;;true;;;;;L;;;100;false;true;;;;;;;;;2950;3350;Size;L;https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatpants-gray-front.png;https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatpants-gray-back.png
;sweatpants-v2;Medusa Sweatpants;;Reimagine the feeling of classic sweatpants. With our cotton sweatpants, everyday essentials no longer have to be ordinary.;published;https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatpants-gray-front.png;400;;;;;;;;;;;;true;;;;;XL;;;100;false;true;;;;;;;;;2950;3350;Size;XL;https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatpants-gray-front.png;https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatpants-gray-back.png
`,D=()=>encodeURI(R),A=()=>{const{t}=d();return e.jsxs(o,{children:[e.jsxs(o.Header,{children:[e.jsx(o.Title,{asChild:!0,children:e.jsx(g,{children:t("products.import.header")})}),e.jsx(o.Description,{className:"sr-only",children:t("products.import.description")})]}),e.jsx(H,{})]})},H=()=>{const{t}=d(),[a,r]=h.useState(),{mutateAsync:i,isPending:u,data:s}=z(),{mutateAsync:n}=C(),{handleSuccess:p}=M(),y=h.useMemo(()=>D(),[]),b=async c=>{r(c.name),await i({file:c},{onError:S=>{m.error(S.message),r(void 0)}})},P=async()=>{s!=null&&s.transaction_id&&await n(s.transaction_id,{onSuccess:()=>{m.info(t("products.import.success.title"),{description:t("products.import.success.description")}),p()},onError:c=>{m.error(c.message)}})},j=[{actions:[{label:t("actions.delete"),icon:e.jsx(V,{}),onClick:()=>r(void 0)}]}];return e.jsxs(e.Fragment,{children:[e.jsxs(o.Body,{children:[e.jsx(g,{level:"h2",children:t("products.import.upload.title")}),e.jsx(l,{size:"small",className:"text-ui-fg-subtle",children:t("products.import.upload.description")}),e.jsx("div",{className:"mt-4",children:a?e.jsx(f,{filename:a,loading:u,activity:t("products.import.upload.preprocessing"),actions:j}):e.jsx(E,{onUploaded:b})}),(s==null?void 0:s.summary)&&!!a&&e.jsx("div",{className:"mt-4",children:e.jsx(F,{summary:s==null?void 0:s.summary})}),e.jsx(g,{className:"mt-6",level:"h2",children:t("products.import.template.title")}),e.jsx(l,{size:"small",className:"text-ui-fg-subtle",children:t("products.import.template.description")}),e.jsx("div",{className:"mt-4",children:e.jsx(f,{filename:"product-import-template.csv",url:y})})]}),e.jsx(o.Footer,{children:e.jsxs("div",{className:"flex items-center gap-x-2",children:[e.jsx(o.Close,{asChild:!0,children:e.jsx(w,{size:"small",variant:"secondary",children:t("actions.cancel")})}),e.jsx(w,{onClick:P,size:"small",disabled:!(s!=null&&s.transaction_id)||!a,children:t("actions.import")})]})})]})};export{A as Component};
