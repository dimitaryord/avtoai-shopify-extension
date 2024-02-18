"use strict";function t(t,e,s){const a="light"==e?"#fefefe":"#222831",n="light"==e?"#000000aa":"#ffffffab",i="light"==e?"#000000aa":"#ffffffab",o="light"==e?"black":"white",c=function(t){t=t.substring(1);let e=parseInt(t,16);return.2126*(e>>16&255)+.7152*(e>>8&255)+.0722*(e>>0&255)>150}(t)?"black":"white",r="light"==e?"white":"black";document.documentElement.style.setProperty("--avtoai-assistant-colors-color-theme",t),document.documentElement.style.setProperty("--avtoai-assistant-colors-app-theme",a),document.documentElement.style.setProperty("--avtoai-assistant-colors-widget-button-theme",s),document.documentElement.style.setProperty("--avtoai-assistant-colors-widget-box-border",i),document.documentElement.style.setProperty("--avtoai-assistant-colors-widget-box-shadow",n),document.documentElement.style.setProperty("--avtoai-assistant-colors-text-color",o),document.documentElement.style.setProperty("--avtoai-assistant-colors-color-theme-text-color",c),document.documentElement.style.setProperty("--avtoai-assistant-colors-text-shadow",r)}const e={designComponent:(t,e)=>{const{classes:s,style:a,id:n,text:i}=e;return s&&t.classList.add(...s),a&&Object.assign(t.style,a),n&&(t.id=n),i&&(t.textContent=i),t},div:({classes:t,style:s,id:a,text:n})=>{const i=document.createElement("div");return e.designComponent(i,{classes:t,style:s,id:a,text:n})},a:({classes:t,style:s,id:a,text:n})=>{const i=document.createElement("a");return e.designComponent(i,{classes:t,style:s,id:a,text:n})},h1:({classes:t,style:s,id:a,text:n})=>{const i=document.createElement("h1");return e.designComponent(i,{classes:t,style:s,id:a,text:n})},h2:({classes:t,style:s,id:a,text:n})=>{const i=document.createElement("h2");return e.designComponent(i,{classes:t,style:s,id:a,text:n})},h3:({classes:t,style:s,id:a,text:n})=>{const i=document.createElement("h3");return e.designComponent(i,{classes:t,style:s,id:a,text:n})},h4:({classes:t,style:s,id:a,text:n})=>{const i=document.createElement("h4");return e.designComponent(i,{classes:t,style:s,id:a,text:n})},h5:({classes:t,style:s,id:a,text:n})=>{const i=document.createElement("h5");return e.designComponent(i,{classes:t,style:s,id:a,text:n})},h6:({classes:t,style:s,id:a,text:n})=>{const i=document.createElement("h6");return e.designComponent(i,{classes:t,style:s,id:a,text:n})},p:({classes:t,style:s,id:a,text:n})=>{const i=document.createElement("p");return e.designComponent(i,{classes:t,style:s,id:a,text:n})},button:({classes:t,style:s,id:a,text:n})=>{const i=document.createElement("button");return e.designComponent(i,{classes:t,style:s,id:a,text:n})},input:({classes:t,style:s,id:a,text:n})=>{const i=document.createElement("input");return e.designComponent(i,{classes:t,style:s,id:a,text:n})}};Object.freeze(e);class s{constructor(t,e){t&&t.appendChild(e)}playElementAnimation(t,e,s){t.style.animation="",t.offsetWidth,t.style.animation=e+" "+s}}var a={TextP:class extends s{constructor(t,e,s){const a=document.createElement("p");a.classList.add(s?"avtoai-assistant-p-text-shadow":"avtoai-assistant-p-text"),a.textContent=e,super(t,a)}},ThemeButton:class extends s{constructor(t,s){const a=e.button({id:"avtoai-assistant-theme-button",style:{cursor:"pointer",width:"fit-content",fontSize:"1.5rem",marginBottom:"1.25rem",paddingBlock:"2rem",paddingInline:"2.25rem",borderRadius:"10px",border:"none",color:"var(--avtoai-assistant-colors-color-theme-text-color)",backgroundColor:"var(--avtoai-assistant-colors-color-theme)"},text:s});return super(t,a),a}},ThemeCloseButton:class extends s{constructor(t){const e=document.createElement("div");e.classList.add("avtoai-assistant-theme-close-button-container"),e.id="avtoai-assistant-theme-close-button-container";for(let t=0;t<2;t++){const t=document.createElement("div");t.classList.add("avtoai-assistant-theme-close-button-cross"),t.style.display="block",e.appendChild(t)}super(t,e),this.closeButton=e}},ConditionalRendering:class{constructor(t){if(!t)return null;const e=document.createElement("div");return e.id="avtoai-conditional-rendering-element",e}}};var n={WidgetSection:class extends s{constructor(t,e,s,n){const i=document.createElement("div");i.classList.add(`avtoai-assistant-widget-container-position-${e}`),i.classList.add("avtoai-assistant-widget-container");const o=document.createElement("div");o.id="avtoai-assistant-top-widget-container",new a.TextP(o,"Click Here To Chat",!0);const c=document.createElement("div");c.id="avtoai-assistant-widget-button-container",c.classList.add("avtoai-assistant-widget-button-container"),i.appendChild(o),i.appendChild(c),super(t,i);const[r,d,l]=this.createChatBubble(s,n);c.appendChild(r),this.animatedComponents=l,this.widgetButtonPosition=e,this.button=d}playAnimation(t="normal"){const[e,s]=this.animatedComponents;this.widgetButtonPosition.includes("right")?(e.style.transformOrigin="0% 100%",s.style.transformOrigin="0% 100%",this.playElementAnimation(e,"avtoai-assistant-widget-button-click-animation-right 0.4s forwards",t),this.playElementAnimation(s,"avtoai-assistant-widget-button-border-click-animation-right 0.4s forwards",t)):this.widgetButtonPosition.includes("left")&&(e.style.transformOrigin="0% 0%",s.style.transformOrigin="0% 0%",this.playElementAnimation(e,"avtoai-assistant-widget-button-click-animation-left 0.4s forwards",t),this.playElementAnimation(s,"avtoai-assistant-widget-button-border-click-animation-left 0.4s forwards",t))}createChatBubble(t,e){const s=document.createElement("div");s.classList.add("avtoai-assistant-chat-bubble-parent-element");const a=document.createElement("div");a.classList.add("avtoai-assistant-chat-bubble-triangle-container");const n=document.createElement("div");n.classList.add("avtoai-assistant-chat-bubble-triangle"),n.style.display="block";const i=document.createElement("div");i.classList.add("avtoai-assistant-chat-bubble-triangle-border"),i.style.display="block";const o=document.createElement("div");o.classList.add("avtoai-assistant-chat-bubble-oval"),e&&(o.style.boxShadow="14px 14px 20px var(--avtoai-assistant-colors-widget-box-shadow)");const c=document.createElement("img");return c.loading="lazy",c.src=t,c.alt="avtoai-assistant-widget-image",c.style.width="45px",c.style.height="45px",c.style.borderRadius="50%",o.appendChild(c),a.appendChild(n),a.appendChild(i),s.appendChild(a),s.appendChild(o),[s,o,[n,i]]}}};var i={SideDrawer:class extends s{constructor(t,e,s){const a=document.createElement("div");a.id="avtoai-assistant-side-drawer-container";const n=document.createElement("div");n.classList.add("avtoai-assistant-side-drawer-blur"),n.id="avtoai-assistant-side-drawer-blur","right"==e?n.style.right="0px":"left"==e&&(n.style.left="0px"),n.style.display="block";const i=document.createElement("div");i.classList.add("avtoai-assistant-side-drawer"),i.id="avtoai-assistant-side-drawer","right"==e?(i.style.right="10px",i.style.transform="translate(110%, -50%)"):"left"==e&&(i.style.left="10px",i.style.transform="translate(-110%, -50%)"),a.appendChild(n),a.appendChild(i),super(t,a),this.side=e,this.widgetSection=s,this.isOpen=!1,this.sideDrawerBlur=n,this.content=i,document.addEventListener("click",(t=>{t.target==n&&this.close()}))}close(){this.isOpen=!1,this.playAnimation("reverse"),this.widgetSection&&this.widgetSection.playAnimation("reverse")}open(){this.isOpen=!0,this.playAnimation(),this.widgetSection&&this.widgetSection.playAnimation()}playAnimation(t="normal"){this.playElementAnimation(this.sideDrawerBlur,"avtoai-assistant-slide-blur 0.2s forwards",t),this.playElementAnimation(this.content,`avtoai-assistant-slide-drawer-${this.side} 0.4s ease-out forwards`,t)}}},o=(t,e,s)=>`<svg loading="lazy" viewBox="0 0 16 16" width="${s}" height="${e}" xmlns="http://www.w3.org/2000/svg" fill="none" class="hds-flight-icon--animation-loading"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill="${t}" fill-rule="evenodd" clip-rule="evenodd"> <path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z" opacity=".2"></path> <path d="M7.25.75A.75.75 0 018 0a8 8 0 018 8 .75.75 0 01-1.5 0A6.5 6.5 0 008 1.5a.75.75 0 01-.75-.75z"></path> </g> </g></svg>`;class c extends s{constructor({container:t,assistantName:s,assistantImage:n,startInLoading:i}){const o=e.div({id:"avtoai-assistant-chat-header",classes:["avtoai-assistant-chat-header"]}),c=e.div({id:"avtoai-assistant-chat-header-top-container",style:{display:"flex"}}),r=e.div({id:"avtoai-assistant-chat-header-bottom-container",style:{display:"flex",flexGrow:"1",alignItems:"center",justifyContent:"center"}}),d=e.div({id:"avtoai-assistant-chat-close-button-container",style:{display:"flex",flexGrow:"1",alignItems:"center",justifyContent:"end"}});o.appendChild(c),o.appendChild(r),super(t,o);const l=this.createMenu(),h=new a.ThemeCloseButton(d),{titleContainer:m,titleText:p}=this.createTitle(s,n);c.appendChild(l),c.appendChild(d),i||r.appendChild(m),this.bottomContainer=r,this.titleContainer=m,this.title=p,this.closeButton=h.closeButton}createMenu(){const t=document.createElement("div");t.classList.add("avtoai-assistant-chat-menu-container"),t.id="avtoai-assistant-chat-menu-container";for(let e=0;e<3;e++){const e=document.createElement("div");e.style.display="block",e.classList.add("avtoai-assistant-chat-menu-dot"),t.appendChild(e)}return t}createTitle(t,s){const a=e.div({id:"avtoai-assistant-chat-title-container",classes:["avtoai-assistant-chat-title-container"]}),n=document.createElement("img");n.loading="lazy",n.src=s,n.alt="avtoai-assistant-chat-bot-icon";const i=e.designComponent(n,{style:{width:"50px",height:"50px",borderRadius:"10px",filter:"drop-shadow( var(--avtoai-assistant-colors-widget-box-shadow) 0.1rem 0.1rem )"}}),o=e.h3({classes:["avtoai-assistant-chat-title-text"],text:t});return a.appendChild(i),a.appendChild(o),{titleContainer:a,titleText:o}}setTitle(t){this.title.textContent=t}switchToReady(){this.bottomContainer.appendChild(this.titleContainer)}switchToLoading(){this.bottomContainer.removeChild(this.titleContainer)}}class r extends s{constructor(t){const s=e.div({id:"avtoai-assistant-chat-section-container",style:{display:"flex",overflowY:"auto",flexDirection:"column",flexGrow:"1",alignItems:"flex-start",padding:"1.25rem"}});return super(t,s),s}}class d extends s{constructor(t){const s=e.div({id:"avtoai-assistant-actions-container",classes:["avtoai-assistant-action-section-container"],style:{display:"flex"}}),a=e.div({id:"avtoai-assistant-actions-starters-button-container",classes:["avtoai-assistant-actions-starters-button-container"]});var n;a.innerHTML=`<svg loading="lazy" width="25px" height="25px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--emojione-monotone" preserveAspectRatio="xMidYMid meet">\n<g fill-rule="evenodd">\n<path d="M30.249 2.065C18.612 2.789 12.531 9.379 12 21.296h11.739c.147-4.128 2.451-7.214 6.741-7.669c4.211-.447 8.206.556 9.416 3.435c1.307 3.11-1.627 6.724-3.022 8.241c-2.582 2.813-6.776 4.865-8.95 7.9c-2.131 2.974-2.51 6.887-2.674 11.676h10.346c.145-3.062.349-5.995 1.742-7.898c2.266-3.092 5.65-4.541 8.486-6.983c2.709-2.334 5.559-5.147 6.043-9.501C53.32 7.466 42.683 1.289 30.249 2.065" fill="${n="var(--avtoai-assistant-colors-color-theme-text-color)"}">\n</path>\n<ellipse cx="30.515" cy="55.567" rx="6.532" ry="6.433" fill="${n}">\n</ellipse>\n</g>\n</svg>`;const i=e.div({id:"avtoai-assistant-actions-input-container",classes:["avtoai-assistant-actions-input-container"]}),o=e.input({id:"avtoai-assistant-actions-input",classes:["avtoai-assistant-actions-input"]});o.placeholder="Chat here",i.appendChild(o);const c=e.div({classes:["avtoai-assistant-actions-send"]});c.innerHTML=(t=>`<svg loading="lazy" width="50px" height="50px" viewBox="0 0 24 24" fill="${t}" xmlns="http://www.w3.org/2000/svg">\n    <path d="M6.99811 10.2467L7.43298 11.0077C7.70983 11.4922 7.84825 11.7344 7.84825 12C7.84825 12.2656 7.70983 12.5078 7.43299 12.9923L7.43298 12.9923L6.99811 13.7533C5.75981 15.9203 5.14066 17.0039 5.62348 17.5412C6.1063 18.0785 7.24961 17.5783 9.53623 16.5779L15.8119 13.8323C17.6074 13.0468 18.5051 12.654 18.5051 12C18.5051 11.346 17.6074 10.9532 15.8119 10.1677L9.53624 7.4221C7.24962 6.42171 6.1063 5.92151 5.62348 6.45883C5.14066 6.99615 5.75981 8.07966 6.99811 10.2467Z"/>\n</svg>`)("var(--avtoai-assistant-colors-color-theme-text-color)"),i.appendChild(c),s.appendChild(a),s.appendChild(i),super(t,s),this.input=o,this.sendButton=c,this.content=s}}class l{constructor({drawer:t,assistantName:e,assistantImage:s,startInLoading:a=!0}){const n=new c({container:t.content,assistantName:e,assistantImage:s,startInLoading:a});let i,o,l;n.closeButton.onclick=()=>t.close(),l=this.createLoadingComponent(),a?(i=new r(null),o=new d(null),t.content.appendChild(l)):(i=new r(t.content),o=new d(t.content)),this.container=t.content,this.loading=a,this.sections={headerSection:n,chatSection:i,actionSection:o},this.loadingComponent=l,o.sendButton.onclick=t=>this.onSend(t,o),document.addEventListener("keydown",(async t=>{"Enter"===t.key&&this.onSend(t,o)}))}switchToReady(){this.loading&&(this.sections.headerSection.switchToReady(),this.container.contains(this.loadingComponent)&&this.container.removeChild(this.loadingComponent),this.container.appendChild(this.sections.chatSection),this.container.appendChild(this.sections.actionSection.content),this.loading=!1)}switchToLoading(){this.loading||(this.sections.headerSection.switchToLoading(),this.container.contains(this.sections.chatSection)&&this.container.removeChild(this.sections.chatSection),this.container.contains(this.sections.actionSection.content)&&this.container.removeChild(this.sections.actionSection.content),this.container.appendChild(this.loadingComponent),this.loading=!0)}createLoadingComponent(){const t=e.div({id:"avtoai-assistant-chat-app-loading-container",style:{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}),s=e.div({id:"avtoai-assistant-chat-app-loading",style:{animation:"avtoai-assistant-spin 2s linear infinite",height:"60px"}});return s.innerHTML=o("var(--avtoai-assistant-colors-color-theme)","60px","60px"),t.appendChild(s),t}async onSend(t,s){t&&t.preventDefault();const a=s.input.value.trim();a.length>0&&this.onMessageSent&&(this.sections.actionSection.sendButton.disabled=!0,e.designComponent(this.sections.actionSection.sendButton,{style:{cursor:"default"}}),s.input.value="",await this.onMessageSent(a),this.sections.actionSection.sendButton.disabled=!1,e.designComponent(this.sections.actionSection.sendButton,{style:{cursor:"pointer"}}))}}const h=new class{constructor(){this.staticUrl="/apps/server",this.config={method:"GET",headers:{"Content-Type":"application/json","Shopify-Store-Domain":""},body:JSON.stringify({})}}setShop(t){this.config.headers["Shopify-Store-Domain"]=t}async get(t){try{this.config.method="GET";const e=await fetch(`${this.staticUrl}${t}`,this.config);if(e.ok){return await e.json()}return{error:e}}catch(t){console.error(t.message)}}async post(t,e={}){try{this.config.method="POST",this.config.body=JSON.stringify(e);const s=await fetch(`${this.staticUrl}${t}`,this.config);if(s.ok){return await s.json()}return{error:s}}catch(t){console.error(t.message)}}};function m(t,e){sessionStorage.setItem(t,JSON.stringify(e))}function p(t){const e=sessionStorage.getItem(t);return e?JSON.parse(e):null}async function u({productHandle:t,variantId:e}){try{const s=await fetch(`/products/${t}.js`),a=await s.json(),n=a.variants.find((t=>t.id===parseInt(e)));if(!n)return;let i=n.featured_image;i||(a.featured_image?i=a.featured_image:a.images.length>0&&(i=a.images[0]));return{title:n.name,imageUrl:i?i.startsWith("https:")?i:`https:${i}`:null}}catch(t){throw new Error("Error fetching product details: "+t)}}class g{constructor(t,s,a){const n=e.div({id:"avtoai-assistant-message-container",style:{maxWidth:"80%",borderRadius:"10px",paddingInline:"1.25rem",marginBottom:"1.5rem",alignSelf:"assistant"===s?"flex-start":"flex-end",backgroundColor:"assistant"===s?"var(--avtoai-assistant-colors-message-assistant-bg)":"var(--avtoai-assistant-colors-color-theme)"}}),i=e.p({id:"avtoai-assistant-message",style:{color:"assistant"===s?"black":"var(--avtoai-assistant-colors-color-theme-text-color)"},text:t});return a&&i.appendChild(a),n.appendChild(i),[n,i]}}class v extends s{constructor(t,e,s){const[a,n]=new g(e,s);super(t,a),this.container=a,this.textElement=n}}class y extends s{constructor(t){const s=e.div({id:"avtoai-assistant-chat-app-message-loading",style:{animation:"avtoai-assistant-spin 2s linear infinite",height:"30px"}});s.innerHTML=o("var(--avtoai-assistant-colors-color-theme)","30px","30px");const[a]=new g("","assistant",s);super(t,a)}}class w extends s{constructor(t,{title:s,variantId:n,imageUrl:i}){const o=e.div({id:"avtoai-assistant-chat-app-message-product-card"}),c=e.h3({id:"avtoai-assistant-chat-app-message-product-card-title",text:s}),r=document.createElement("img");r.loading="lazy",r.src=i,r.alt="product-image";const d=r.naturalWidth/r.naturalWidth,l=d>1&&d<=1.5?240:d>1.5?180:300;e.designComponent(r,{style:{width:d*l+"px",height:`${l}px`,marginBottom:"2.25rem"}}),o.appendChild(c),o.appendChild(r);new a.ThemeButton(o,"Add to Card").onclick=async()=>{await async function(t,e){const s={items:[{id:parseInt(t),quantity:e}]};try{const t=await fetch("/cart/add.js",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)});if(t.ok){const e=await t.json();console.log("Item added to cart",e)}else console.error("Failed to add item to cart. Status code:",t.status)}catch(t){console.error("Error adding item to cart:",t)}}(n,1),window.open(window.Shopify.routes.root+"cart")},super(t,o)}}function f(t){const e=t.textContent,s=e.match(/product_handle:\s*([^\s]+)/i),a=e.match(/variant_id:\s*(gid:\/\/shopify\/ProductVariant\/\d+)/i);if(s&&a){const[n,i]=s,[o,c]=a;return t.textContent=e.split(n).join("").split(o).map((t=>t.trim())).join(""),{productHandle:i,variantId:c.split("/").pop()}}}async function x({container:t,messages:e,staticAddedMessages:s}){const a=function(t,e=null,s=0){if(e&&t.childElementCount===e.length-2+s){for(let e=0;e<s;e++)t.removeChild(t.lastChild);return!1}for(;t.firstChild;)t.removeChild(parent.firstChild);return!0}(t,e,s),[n]=new g("","user"),[i]=new g("","assistant"),o=a?e:e.slice(e.length-2,e.length);for(let e=0;e<o.length;e++){const s=o[e],a="assistant"===s.role?i.cloneNode(!0):n.cloneNode(!0);if(a.children[0].textContent=s.messageText,t.appendChild(a),"assistant"===s.role){const t=f(a.children[0]);if(t){const e=await u(t);new w(a,{...e,variantId:t.variantId})}}}}document.addEventListener("DOMContentLoaded",(()=>{!function(){const e=document.getElementById("avtoai-assistant-bot-container"),s=e.getAttribute("data-shop-domain");h.setShop(s),t(e.getAttribute("data-avtoai-color-theme-app"),e.getAttribute("data-avotai-theme-app"),e.getAttribute("data-avtoai-widget-button-color"));const a=e.getAttribute("data-avtoai-chat-position"),o="yes"==e.getAttribute("data-avtoai-widget-button-shadow"),c=e.getAttribute("data-avtoai-widget-button-position"),r=e.getAttribute("data-avtoai-widget-icon-url");e.removeAttribute("data-shop-domain"),e.removeAttribute("data-avtoai-widget-icon-url");const d=new n.WidgetSection(e,c,r,o),u=new i.SideDrawer(e,a,d),g=new l({drawer:u,assistantName:"Avto AI chatbot Here to help you",assistantImage:r});g.onMessageSent=async t=>{const e=p("avtoai-assistant-thread");if(!e)return;new v(g.sections.chatSection,t,"user"),new y(g.sections.chatSection);const s=await h.post("/chat",{userMessage:t,threadId:e});x({container:g.sections.chatSection,messages:s.messages.reverse(),staticAddedMessages:2})},d.button.onclick=async()=>{if(u.isOpen)u.close();else{u.open(),g.switchToLoading();const t=p("avtoai-assistant-thread"),e=p("avtoai-assistant-name");if(t&&e){const e=await h.post("/pull/messages",{threadId:t});e.messages&&x({container:g.sections.chatSection,messages:e.messages.reverse()})}else{const t=await h.post("/create/thread");g.sections.headerSection.setTitle(t.assistantName),m("avtoai-assistant-thread",t.threadId),m("avtoai-assistant-name",t.assistantName)}g.switchToReady()}}}()}));
