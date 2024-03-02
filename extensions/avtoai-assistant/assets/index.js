"use strict";function t(t,e){const s="light"==e?"#fefefe":"#222831",a="light"==e?"#000000aa":"#ffffffab",n="light"==e?"black":"white",i=function(t){t=t.substring(1);let e=parseInt(t,16);return.2126*(e>>16&255)+.7152*(e>>8&255)+.0722*(e>>0&255)>150}(t)?"black":"white",o="light"==e?"white":"black";document.documentElement.style.setProperty("--avtoai-assistant-colors-color-theme",t),document.documentElement.style.setProperty("--avtoai-assistant-colors-app-theme",s),document.documentElement.style.setProperty("--avtoai-assistant-colors-widget-button-shadow",a),document.documentElement.style.setProperty("--avtoai-assistant-colors-text-color",n),document.documentElement.style.setProperty("--avtoai-assistant-colors-color-theme-text-color",i),document.documentElement.style.setProperty("--avtoai-assistant-colors-text-shadow",o)}const e={designComponent:(t,{classes:e,style:s,id:a,text:n,animate:i,mediaQueries:o})=>{if(e&&t.classList.add(...e),s&&Object.assign(t.style,s),a&&(t.id=a),n&&(t.textContent=n),i&&a){const t=document.createElement("style");document.head.appendChild(t);const e=t.sheet,s=Object.entries(i);for(let[t,n]of s){const s=`\n                    #${a}:${t} {\n                        ${Object.entries(n).map((([t,e])=>`${t}: ${e};\n`))}\n                    }\n                `;e.insertRule(s,0)}}return t},div:({classes:t,style:s,id:a,text:n,hover:i,animate:o})=>{const r=document.createElement("div");return e.designComponent(r,{classes:t,style:s,id:a,text:n,hover:i,animate:o})},a:({classes:t,style:s,id:a,text:n,hover:i,animate:o})=>{const r=document.createElement("a");return e.designComponent(r,{classes:t,style:s,id:a,text:n,hover:i,animate:o})},h1:({classes:t,style:s,id:a,text:n,hover:i,animate:o})=>{const r=document.createElement("h1");return e.designComponent(r,{classes:t,style:s,id:a,text:n,hover:i,animate:o})},h2:({classes:t,style:s,id:a,text:n,hover:i,animate:o})=>{const r=document.createElement("h2");return e.designComponent(r,{classes:t,style:s,id:a,text:n,hover:i,animate:o})},h3:({classes:t,style:s,id:a,text:n,hover:i,animate:o})=>{const r=document.createElement("h3");return e.designComponent(r,{classes:t,style:s,id:a,text:n,hover:i,animate:o})},h4:({classes:t,style:s,id:a,text:n,hover:i,animate:o})=>{const r=document.createElement("h4");return e.designComponent(r,{classes:t,style:s,id:a,text:n,hover:i,animate:o})},h5:({classes:t,style:s,id:a,text:n,hover:i,animate:o})=>{const r=document.createElement("h5");return e.designComponent(r,{classes:t,style:s,id:a,text:n,hover:i,animate:o})},h6:({classes:t,style:s,id:a,text:n,hover:i,animate:o})=>{const r=document.createElement("h6");return e.designComponent(r,{classes:t,style:s,id:a,text:n,hover:i,animate:o})},p:({classes:t,style:s,id:a,text:n,hover:i,animate:o})=>{const r=document.createElement("p");return e.designComponent(r,{classes:t,style:s,id:a,text:n,hover:i,animate:o})},button:({classes:t,style:s,id:a,text:n,hover:i,animate:o})=>{const r=document.createElement("button");return e.designComponent(r,{classes:t,style:s,id:a,text:n,hover:i,animate:o})},input:({classes:t,style:s,id:a,text:n,hover:i,animate:o})=>{const r=document.createElement("input");return e.designComponent(r,{classes:t,style:s,id:a,text:n,hover:i,animate:o})}};Object.freeze(e);class s{constructor(t,e){t&&t.appendChild(e)}playElementAnimation(t,e,s){t.style.animation="",t.offsetWidth,t.style.animation=e+" "+s}}var a={TextP:class extends s{constructor(t,e,s){const a=document.createElement("p");a.classList.add(s?"avtoai-assistant-p-text-shadow":"avtoai-assistant-p-text"),a.textContent=e,super(t,a)}},ThemeButton:class extends s{constructor(t,s){const a=e.button({id:"avtoai-assistant-theme-button",style:{cursor:"pointer",width:"fit-content",fontSize:"1.5rem",marginBottom:"1.25rem",paddingBlock:"2rem",paddingInline:"2.25rem",borderRadius:"10px",border:"none",color:"var(--avtoai-assistant-colors-color-theme-text-color)",backgroundColor:"var(--avtoai-assistant-colors-color-theme)"},text:s});return super(t,a),a}},ThemeCloseButton:class extends s{constructor(t){const e=document.createElement("div");e.classList.add("avtoai-assistant-theme-close-button-container"),e.id="avtoai-assistant-theme-close-button-container";for(let t=0;t<2;t++){const t=document.createElement("div");t.classList.add("avtoai-assistant-theme-close-button-cross"),t.style.display="block",e.appendChild(t)}super(t,e),this.closeButton=e}},ConditionalRendering:class{constructor(t){if(!t)return null;const e=document.createElement("div");return e.id="avtoai-conditional-rendering-element",e}}};class n extends s{constructor({container:t,position:e}){const s=document.createElement("div");s.id="avtoai-assistant-side-drawer-container";const a=document.createElement("div");a.classList.add("avtoai-assistant-side-drawer-blur"),a.id="avtoai-assistant-side-drawer-blur","right"==e?a.style.right="0px":"left"==e&&(a.style.left="0px"),a.style.display="block";const n=document.createElement("div");n.classList.add("avtoai-assistant-side-drawer"),n.id="avtoai-assistant-side-drawer","right"==e?(n.style.right="10px",n.style.transform="translate(110%, -50%)"):"left"==e&&(n.style.left="10px",n.style.transform="translate(-110%, -50%)"),s.appendChild(a),s.appendChild(n),super(t,s),this.side=e,this.isOpen=!1,this.sideDrawerBlur=a,this.content=n,document.addEventListener("click",(t=>{t.target==a&&this.close()}))}close(){this.isOpen=!1,this.playAnimation("reverse")}open(){this.isOpen=!0,this.playAnimation()}playAnimation(t="normal"){this.playElementAnimation(this.sideDrawerBlur,"avtoai-assistant-slide-blur 0.2s forwards",t),this.playElementAnimation(this.content,`avtoai-assistant-slide-drawer-${this.side} 0.4s ease-out forwards`,t)}}var i=(t,e,s)=>`<svg loading="lazy" viewBox="0 0 16 16" width="${s}" height="${e}" xmlns="http://www.w3.org/2000/svg" fill="none" class="hds-flight-icon--animation-loading"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill="${t}" fill-rule="evenodd" clip-rule="evenodd"> <path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z" opacity=".2"></path> <path d="M7.25.75A.75.75 0 018 0a8 8 0 018 8 .75.75 0 01-1.5 0A6.5 6.5 0 008 1.5a.75.75 0 01-.75-.75z"></path> </g> </g></svg>`;class o extends s{constructor({container:t,assistantName:s,assistantImage:n,startInLoading:i}){const o=e.div({id:"avtoai-assistant-chat-header",classes:["avtoai-assistant-chat-header"]}),r=e.div({id:"avtoai-assistant-chat-header-top-container",style:{display:"flex"}}),c=e.div({id:"avtoai-assistant-chat-header-bottom-container",style:{display:"flex",flexGrow:"1",alignItems:"center",justifyContent:"center"}}),l=e.div({id:"avtoai-assistant-chat-close-button-container",style:{display:"flex",flexGrow:"1",alignItems:"center",justifyContent:"end"}});o.appendChild(r),o.appendChild(c),super(t,o);const d=this.createMenu(),h=new a.ThemeCloseButton(l),{titleContainer:m,titleText:p}=this.createTitle(s,n);r.appendChild(d),r.appendChild(l),i||c.appendChild(m),this.bottomContainer=c,this.titleContainer=m,this.title=p,this.closeButton=h.closeButton}createMenu(){const t=document.createElement("div");t.classList.add("avtoai-assistant-chat-menu-container"),t.id="avtoai-assistant-chat-menu-container";for(let e=0;e<3;e++){const e=document.createElement("div");e.style.display="block",e.classList.add("avtoai-assistant-chat-menu-dot"),t.appendChild(e)}return t}createTitle(t,s){const a=e.div({id:"avtoai-assistant-chat-title-container",classes:["avtoai-assistant-chat-title-container"]}),n=document.createElement("img");n.loading="lazy",n.src=s,n.alt="avtoai-assistant-chat-bot-icon";const i=e.designComponent(n,{style:{width:"50px",height:"50px",borderRadius:"10px",filter:"drop-shadow( var(--avtoai-assistant-colors-widget-box-shadow) 0.1rem 0.1rem )"}}),o=e.h3({classes:["avtoai-assistant-chat-title-text"],text:t});return a.appendChild(i),a.appendChild(o),{titleContainer:a,titleText:o}}setTitle(t){this.title.textContent=t}switchToReady(){this.bottomContainer.appendChild(this.titleContainer)}switchToLoading(){this.bottomContainer.removeChild(this.titleContainer)}}class r extends s{constructor(t){const s=e.div({id:"avtoai-assistant-chat-section-container",classes:["avtoai-assistant-chat-scrollbar"],style:{display:"flex",overflowY:"auto",flexDirection:"column",flexGrow:"1",alignItems:"flex-start",padding:"1.25rem"}});return super(t,s),s}}class c extends s{constructor(t,s){const a=e.div({id:"avtoai-assistant-actions-container",classes:["avtoai-assistant-action-section-container"],style:{display:"flex"}}),n=e.div({id:"avtoai-assistant-actions-starters-button-container",classes:["avtoai-assistant-actions-starters-button-container"]}),i=`<svg loading="lazy" width="25px" height="25px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--emojione-monotone" preserveAspectRatio="xMidYMid meet">\n<g fill-rule="evenodd">\n<path d="M30.249 2.065C18.612 2.789 12.531 9.379 12 21.296h11.739c.147-4.128 2.451-7.214 6.741-7.669c4.211-.447 8.206.556 9.416 3.435c1.307 3.11-1.627 6.724-3.022 8.241c-2.582 2.813-6.776 4.865-8.95 7.9c-2.131 2.974-2.51 6.887-2.674 11.676h10.346c.145-3.062.349-5.995 1.742-7.898c2.266-3.092 5.65-4.541 8.486-6.983c2.709-2.334 5.559-5.147 6.043-9.501C53.32 7.466 42.683 1.289 30.249 2.065" fill="${o="var(--avtoai-assistant-colors-color-theme-text-color)"}">\n</path>\n<ellipse cx="30.515" cy="55.567" rx="6.532" ry="6.433" fill="${o}">\n</ellipse>\n</g>\n</svg>`;var o;const r=(t=>`<?xml version="1.0" encoding="utf-8"?>\n<svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n<path fill-rule="evenodd" clip-rule="evenodd" d="M10.4606 1.25H13.5394C15.1427 1.24999 16.3997 1.24999 17.4039 1.34547C18.4274 1.44279 19.2655 1.64457 20.0044 2.09732C20.7781 2.57144 21.4286 3.22194 21.9027 3.99563C22.3554 4.73445 22.5572 5.57256 22.6545 6.59611C22.75 7.60029 22.75 8.85725 22.75 10.4606V11.5278C22.75 12.6691 22.75 13.564 22.7007 14.2868C22.6505 15.0223 22.5468 15.6344 22.3123 16.2004C21.7287 17.6093 20.6093 18.7287 19.2004 19.3123C18.3955 19.6457 17.4786 19.7197 16.2233 19.7413C15.7842 19.7489 15.5061 19.7545 15.2941 19.7779C15.096 19.7999 15.0192 19.832 14.9742 19.8582C14.9268 19.8857 14.8622 19.936 14.7501 20.0898C14.6287 20.2564 14.4916 20.4865 14.2742 20.8539L13.7321 21.7697C12.9585 23.0767 11.0415 23.0767 10.2679 21.7697L9.72579 20.8539C9.50835 20.4865 9.37122 20.2564 9.24985 20.0898C9.13772 19.936 9.07313 19.8857 9.02572 19.8582C8.98078 19.832 8.90399 19.7999 8.70588 19.7779C8.49387 19.7545 8.21575 19.7489 7.77666 19.7413C6.52138 19.7197 5.60454 19.6457 4.79957 19.3123C3.39066 18.7287 2.27128 17.6093 1.68769 16.2004C1.45323 15.6344 1.3495 15.0223 1.29932 14.2868C1.24999 13.564 1.25 12.6691 1.25 11.5278L1.25 10.4606C1.24999 8.85726 1.24999 7.60029 1.34547 6.59611C1.44279 5.57256 1.64457 4.73445 2.09732 3.99563C2.57144 3.22194 3.22194 2.57144 3.99563 2.09732C4.73445 1.64457 5.57256 1.44279 6.59611 1.34547C7.60029 1.24999 8.85726 1.24999 10.4606 1.25ZM6.73809 2.83873C5.82434 2.92561 5.24291 3.09223 4.77938 3.37628C4.20752 3.72672 3.72672 4.20752 3.37628 4.77938C3.09223 5.24291 2.92561 5.82434 2.83873 6.73809C2.75079 7.663 2.75 8.84876 2.75 10.5V11.5C2.75 12.6751 2.75041 13.5189 2.79584 14.1847C2.84081 14.8438 2.92737 15.2736 3.07351 15.6264C3.50486 16.6678 4.33223 17.4951 5.3736 17.9265C5.88923 18.1401 6.54706 18.2199 7.8025 18.2416L7.83432 18.2421C8.23232 18.249 8.58109 18.2549 8.87097 18.287C9.18246 18.3215 9.4871 18.3912 9.77986 18.5615C10.0702 18.7304 10.2795 18.9559 10.4621 19.2063C10.6307 19.4378 10.804 19.7306 11.0004 20.0623L11.5587 21.0057C11.7515 21.3313 12.2485 21.3313 12.4412 21.0057L12.9996 20.0623C13.1959 19.7306 13.3692 19.4378 13.5379 19.2063C13.7204 18.9559 13.9298 18.7304 14.2201 18.5615C14.5129 18.3912 14.8175 18.3215 15.129 18.287C15.4189 18.2549 15.7676 18.249 16.1656 18.2421L16.1975 18.2416C17.4529 18.2199 18.1108 18.1401 18.6264 17.9265C19.6678 17.4951 20.4951 16.6678 20.9265 15.6264C21.0726 15.2736 21.1592 14.8438 21.2042 14.1847C21.2496 13.5189 21.25 12.6751 21.25 11.5V10.5C21.25 8.84876 21.2492 7.663 21.1613 6.73809C21.0744 5.82434 20.9078 5.24291 20.6237 4.77938C20.2733 4.20752 19.7925 3.72672 19.2206 3.37628C18.7571 3.09223 18.1757 2.92561 17.2619 2.83873C16.337 2.75079 15.1512 2.75 13.5 2.75H10.5C8.84876 2.75 7.663 2.75079 6.73809 2.83873ZM7.25 9C7.25 8.58579 7.58579 8.25 8 8.25H16C16.4142 8.25 16.75 8.58579 16.75 9C16.75 9.41421 16.4142 9.75 16 9.75H8C7.58579 9.75 7.25 9.41421 7.25 9ZM7.25 12.5C7.25 12.0858 7.58579 11.75 8 11.75H13.5C13.9142 11.75 14.25 12.0858 14.25 12.5C14.25 12.9142 13.9142 13.25 13.5 13.25H8C7.58579 13.25 7.25 12.9142 7.25 12.5Z" fill="${t}"/>\n</svg>`)("var(--avtoai-assistant-colors-color-theme-text-color)");n.innerHTML=i;const c=e.div({id:"avtoai-assistant-actions-input-container",classes:["avtoai-assistant-actions-input-container"]}),l=e.input({id:"avtoai-assistant-actions-input",classes:["avtoai-assistant-actions-input"]});l.placeholder="Chat here",c.appendChild(l);const d=e.div({classes:["avtoai-assistant-actions-send","avtoai-assistant-actions-send-enabled"]});d.innerHTML=(t=>`<svg loading="lazy" width="50px" height="50px" viewBox="0 0 24 24" fill="${t}" xmlns="http://www.w3.org/2000/svg">\n    <path d="M6.99811 10.2467L7.43298 11.0077C7.70983 11.4922 7.84825 11.7344 7.84825 12C7.84825 12.2656 7.70983 12.5078 7.43299 12.9923L7.43298 12.9923L6.99811 13.7533C5.75981 15.9203 5.14066 17.0039 5.62348 17.5412C6.1063 18.0785 7.24961 17.5783 9.53623 16.5779L15.8119 13.8323C17.6074 13.0468 18.5051 12.654 18.5051 12C18.5051 11.346 17.6074 10.9532 15.8119 10.1677L9.53624 7.4221C7.24962 6.42171 6.1063 5.92151 5.62348 6.45883C5.14066 6.99615 5.75981 8.07966 6.99811 10.2467Z"/>\n</svg>`)("var(--avtoai-assistant-colors-color-theme-text-color)"),c.appendChild(d),a.appendChild(n),a.appendChild(c),super(t,a);const h=this.createStarters(s);this.mode="chat",this.input=l,this.sendButton=d,this.content=a,this.starters=Array.from(h.children),n.onclick=()=>{"chat"===this.mode?(a.removeChild(c),a.appendChild(h),n.innerHTML=r,this.mode="starters"):"starters"===this.mode&&(a.removeChild(h),a.appendChild(c),n.innerHTML=i,this.mode="chat")}}createStarters(t){const s=e.div({id:"avtoai-assistant-chat-actions-starters-container",classes:["avtoai-assistant-chat-scrollbar"],style:{width:"80%",flexGrow:"1",display:"flex",overflowY:"hidden",overflowX:"auto",gap:".25rem",paddingBlock:".5rem",marginInline:".5rem"}});s.addEventListener("wheel",(t=>{t.preventDefault(),s.scrollLeft+=.5*t.deltaY}));for(let a of t){const t=e.div({id:"avtoai-assistant-chat-actions-starter",classes:["avtoai-assistant-chat-actions-starter"],style:{cursor:"pointer",display:"flex",alignItems:"center",height:"55px",textWrap:"nowrap",width:"fit-content",padding:"1rem",fontSize:"14px",borderRadius:"10px",color:"var(--avtoai-assistant-colors-color-theme-text-color)",backgroundColor:"var(--avtoai-assistant-colors-color-theme)",border:"var(--avtoai-assistant-colors-widget-box-border) solid 1px",boxShadow:"var(--avtoai-assistant-colors-widget-box-shadow) 0.1rem 0.1rem"},text:a});s.appendChild(t)}return s}}class l{constructor({drawer:t,assistantName:e,assistantStarters:s=[],assistantImage:a,startInLoading:n=!0}){const i=new o({container:t.content,assistantName:e,assistantImage:a,startInLoading:n});let l,d,h;i.closeButton.onclick=()=>t.close(),h=this.createLoadingComponent(),n?(l=new r(null),d=new c(null,s),t.content.appendChild(h)):(l=new r(t.content),d=new c(t.content,s)),this.container=t.content,this.loading=n,this.sections={headerSection:i,chatSection:l,actionSection:d},this.loadingComponent=h,this.runStatus="completed",d.sendButton.onclick=t=>this.onSend(t,d),d.starters.forEach((t=>{t.onclick=e=>this.onSend(e,d,t.textContent)})),document.addEventListener("keydown",(async t=>{"Enter"===t.key&&this.onSend(t,d)}))}switchToReady(){this.loading&&(this.sections.headerSection.switchToReady(),this.container.contains(this.loadingComponent)&&this.container.removeChild(this.loadingComponent),this.container.appendChild(this.sections.chatSection),this.container.appendChild(this.sections.actionSection.content),this.loading=!1)}switchToLoading(){this.loading||(this.sections.headerSection.switchToLoading(),this.container.contains(this.sections.chatSection)&&this.container.removeChild(this.sections.chatSection),this.container.contains(this.sections.actionSection.content)&&this.container.removeChild(this.sections.actionSection.content),this.container.appendChild(this.loadingComponent),this.loading=!0)}createLoadingComponent(){const t=e.div({id:"avtoai-assistant-chat-app-loading-container",style:{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}),s=e.div({id:"avtoai-assistant-chat-app-loading",style:{animation:"avtoai-assistant-spin 2s linear infinite",height:"60px"}});return s.innerHTML=i("var(--avtoai-assistant-colors-color-theme)","60px","60px"),t.appendChild(s),t}async onSend(t,e,s){t&&t.preventDefault();const a=s||e.input.value.trim();a.length>0&&this.onMessageSent&&"completed"===this.runStatus&&(this.runStatus="in_process",this.sections.actionSection.sendButton.disabled=!0,this.sections.actionSection.sendButton.classList.remove("avtoai-assistant-actions-send-enabled"),e.input.value="",await this.onMessageSent(a),this.runStatus="completed",this.sections.actionSection.sendButton.disabled=!1,this.sections.actionSection.sendButton.classList.add("avtoai-assistant-actions-send-enabled"))}}const d=new class{constructor(){this.staticUrl="/apps/server",this.config={method:"GET",headers:{"Content-Type":"application/json","Shopify-Store-Domain":""},body:JSON.stringify({})}}async get(t){try{this.config.method="GET";const e=await fetch(`${this.staticUrl}${t}`,this.config);if(e.ok){return await e.json()}console.error({error:await e.json()})}catch(t){console.log(t),console.error(t.message)}}async post(t,e={}){try{this.config.method="POST",this.config.body=JSON.stringify(e);const s=await fetch(`${this.staticUrl}${t}`,this.config);if(s.ok){return await s.json()}console.error({error:await s.json()})}catch(t){console.log(t),console.error(t.message)}}};function h(t,e){sessionStorage.setItem(t,JSON.stringify(e))}function m(t){const e=sessionStorage.getItem(t);return e?JSON.parse(e):null}async function p({productHandle:t,variantId:e}){try{const s=await fetch(`/products/${t}.js`),a=await s.json(),n=a.variants.find((t=>t.id===parseInt(e)));let i=n.featured_image;i||(a.featured_image?i=a.featured_image:a.images.length>0&&(i=a.images[0]));return{title:n.name,price:n.price/100,imageUrl:i?i.startsWith("https:")?i:`https:${i}`:null}}catch(t){throw new Error("Error fetching product details: "+t)}}class u{constructor(t,s,a){const n=e.div({id:"avtoai-assistant-message-container",style:{maxWidth:"80%",borderRadius:"10px",paddingInline:"1.25rem",marginBottom:"1.5rem",alignSelf:"assistant"===s?"flex-start":"flex-end",backgroundColor:"assistant"===s?"var(--avtoai-assistant-colors-message-assistant-bg)":"var(--avtoai-assistant-colors-color-theme)"}}),i=e.p({id:"avtoai-assistant-message",style:{color:"assistant"===s?"black":"var(--avtoai-assistant-colors-color-theme-text-color)"},text:t});return a&&i.appendChild(a),n.appendChild(i),[n,i]}}class v extends s{constructor(t,e,s){const[a,n]=new u(e,s);super(t,a),this.container=a,this.textElement=n}}class g extends s{constructor(t){const s=e.div({id:"avtoai-assistant-chat-app-message-loading",style:{animation:"avtoai-assistant-spin 2s linear infinite",height:"30px"}});s.innerHTML=i("var(--avtoai-assistant-colors-color-theme)","30px","30px");const[a]=new u("","assistant",s);super(t,a)}}class C extends s{constructor(t,{title:s,price:a,variantId:n,imageUrl:i}){const o=e.div({id:"avtoai-assistant-chat-app-message-product-card"}),r=e.h3({id:"avtoai-assistant-chat-app-message-product-card-title",style:{marginBlockEnd:"1rem"},text:s}),c=document.createElement("img");c.loading="lazy",c.src=i,c.alt="product-image",e.designComponent(c,{id:"avtoai-assistant-chat-app-message-product-card-image",style:{width:"300px",marginTop:"2.25rem"}});const l=e.p({id:"avtoai-assistant-chat-app-message-card-price",style:{marginBlockStart:"0px",marginBottom:"2.25rem"},text:new Intl.NumberFormat("bg-BG",{style:"currency",currency:"BGN"}).format(a)});o.appendChild(c),o.appendChild(r),o.appendChild(l),super(t,o);const d=this.createAddToCartButton();d.onclick=async()=>{await async function(t,e){const s={items:[{id:parseInt(t),quantity:e}]};try{const t=await fetch("/cart/add.js",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)});if(t.ok){const e=await t.json();console.log("Item added to cart",e)}else console.error("Failed to add item to cart. Status code:",t.status)}catch(t){console.error("Error adding item to cart:",t)}}(n,1),window.open(window.Shopify.routes.root+"cart")},o.appendChild(d)}createAddToCartButton(){return e.button({id:"avtoai-assistant-chat-app-messages-add-to-cart-button",style:{display:"block",cursor:"pointer",width:"300px",marginBottom:"1.25rem",paddingInline:"1.25rem",paddingBlock:"1rem",textAlign:"center",border:"1px solid black",color:"var(--avtoai-assistant-colors-message-assistant-bg)",backgroundColor:"black",transform:"scale(1)",transition:"transform 0.5s"},animate:{hover:{transform:"scale(1.05)"}},text:"Add to Cart"})}}function y(t,e){for(let s of e)t.textContent=t.textContent.replace(s.text,"")}function x(t){const e=t.textContent,s=e.match(/product[ _]handle:\s*([^\s]+)/i),a=e.match(/variant[ _]id:\s*(gid:\/\/shopify\/ProductVariant\/\d+)/i);if(s&&a){const[n,i]=s,[o,r]=a;return t.textContent=e.split(n).join("").split(o).map((t=>t.trim())).join(""),{productHandle:i,variantId:r.split("/").pop()}}}async function f({container:t,messages:e,staticAddedMessages:s}){const{initConversation:a,newMessages:n}=function(t,e=null,s=0){if(0===t.childElementCount)return{initConversation:!0};for(let e=0;e<s;e++)t.removeChild(t.lastChild);return{initConversation:!1,newMessages:e.length-t.childElementCount}}(t,e,s),[i]=new u("","user"),[o]=new u("","assistant"),r=a?e:e.slice(e.length-n,e.length);for(let e=0;e<r.length;e++){const s=r[e],a="assistant"===s.role?o.cloneNode(!0):i.cloneNode(!0);if(a.children[0].textContent=s.messageText,t.appendChild(a),y(a.children[0],s.annotations),"assistant"===s.role){const t=x(a.children[0]);if(t){const e=await p(t);new C(a,{...e,variantId:t.variantId})}}}}function w(){const e=document.getElementById("avtoai-assistant-bot-container"),s=document.getElementById("avtoai-assistant-widget-button");t(e.getAttribute("data-avtoai-color-theme-app"),e.getAttribute("data-avotai-theme-app"));const a=e.getAttribute("data-avtoai-chat-position"),i=e.getAttribute("data-avtoai-chat-image");e.removeAttribute("data-shop-domain"),e.removeAttribute("data-avtoai-chat-image");const o=new n({container:e,position:a}),r=m("avtoai-assistant-chat-name"),c=m("avtoai-assistant-chat-starters"),p=new l({drawer:o,assistantName:r||"Avto AI chatbot Here to help you",assistantStarters:c||["What does this shop sell?"],assistantImage:i});if(p.onMessageSent=async t=>{const e=m("avtoai-assistant-chat-thread");if(!e)return;new v(p.sections.chatSection,t,"user"),new g(p.sections.chatSection),p.sections.chatSection.lastChild.scrollIntoView({behavior:"smooth",block:"end"});const s=await d.post("/chat",{userMessage:t,threadId:e});f({container:p.sections.chatSection,messages:s.messages.reverse(),staticAddedMessages:2})},!s)return console.error("No widget button element found");s.onclick=async()=>{if(o.isOpen)o.close();else{o.open(),p.switchToLoading();const t=m("avtoai-assistant-chat-thread"),e=m("avtoai-assistant-chat-name");if(t&&e){const e=await d.post("/pull/messages",{threadId:t});e.messages&&f({container:p.sections.chatSection,messages:e.messages.reverse()})}else{const t=await d.post("/create/thread");p.sections.headerSection.setTitle(t.assistantName),h("avtoai-assistant-chat-thread",t.threadId),h("avtoai-assistant-chat-name",t.assistantName),h("avtoai-assistant-chat-starters",t.assistantStarters)}p.switchToReady()}}}document.addEventListener("DOMContentLoaded",(()=>{w()}));
