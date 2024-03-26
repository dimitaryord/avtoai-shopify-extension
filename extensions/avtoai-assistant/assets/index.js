"use strict";function t(t,e){const s="light"==e?"#fefefe":"#222831",n="light"==e?"#000000aa":"#ffffffab",a="light"==e?"black":"white",i=function(t){t=t.substring(1);let e=parseInt(t,16);return.2126*(e>>16&255)+.7152*(e>>8&255)+.0722*(e>>0&255)>150}(t)?"black":"white",o="light"==e?"white":"black";document.documentElement.style.setProperty("--avtoai-assistant-colors-color-theme",t),document.documentElement.style.setProperty("--avtoai-assistant-colors-app-theme",s),document.documentElement.style.setProperty("--avtoai-assistant-colors-widget-button-shadow",n),document.documentElement.style.setProperty("--avtoai-assistant-colors-text-color",a),document.documentElement.style.setProperty("--avtoai-assistant-colors-color-theme-text-color",i),document.documentElement.style.setProperty("--avtoai-assistant-colors-text-shadow",o)}const e={designComponent:(t,{classes:e,style:s,id:n,text:a})=>(e&&t.classList.add(...e),s&&Object.assign(t.style,s),n&&(t.id=n),a&&(t.textContent=a),t),div:({classes:t,style:s,id:n,text:a})=>{const i=document.createElement("div");return e.designComponent(i,{classes:t,style:s,id:n,text:a})},a:({classes:t,style:s,id:n,text:a})=>{const i=document.createElement("a");return e.designComponent(i,{classes:t,style:s,id:n,text:a})},h1:({classes:t,style:s,id:n,text:a})=>{const i=document.createElement("h1");return e.designComponent(i,{classes:t,style:s,id:n,text:a})},h2:({classes:t,style:s,id:n,text:a})=>{const i=document.createElement("h2");return e.designComponent(i,{classes:t,style:s,id:n,text:a})},h3:({classes:t,style:s,id:n,text:a})=>{const i=document.createElement("h3");return e.designComponent(i,{classes:t,style:s,id:n,text:a})},h4:({classes:t,style:s,id:n,text:a})=>{const i=document.createElement("h4");return e.designComponent(i,{classes:t,style:s,id:n,text:a})},h5:({classes:t,style:s,id:n,text:a})=>{const i=document.createElement("h5");return e.designComponent(i,{classes:t,style:s,id:n,text:a})},h6:({classes:t,style:s,id:n,text:a})=>{const i=document.createElement("h6");return e.designComponent(i,{classes:t,style:s,id:n,text:a})},p:({classes:t,style:s,id:n,text:a})=>{const i=document.createElement("p");return e.designComponent(i,{classes:t,style:s,id:n,text:a})},button:({classes:t,style:s,id:n,text:a})=>{const i=document.createElement("button");return e.designComponent(i,{classes:t,style:s,id:n,text:a})},input:({classes:t,style:s,id:n,text:a})=>{const i=document.createElement("input");return e.designComponent(i,{classes:t,style:s,id:n,text:a})}};Object.freeze(e);class s{constructor(t,e){t&&t.appendChild(e)}playElementAnimation(t,e,s){t.style.animation="",t.offsetWidth,t.style.animation=e+" "+s}}class n extends s{constructor({container:t,position:e}){const s=document.createElement("div");s.id="avtoai-assistant-side-drawer-container";const n=document.createElement("div");n.classList.add("avtoai-assistant-side-drawer-blur"),n.id="avtoai-assistant-side-drawer-blur","right"==e?n.style.right="0px":"left"==e&&(n.style.left="0px"),n.style.display="block";const a=document.createElement("div");a.classList.add("avtoai-assistant-side-drawer"),a.id="avtoai-assistant-side-drawer","right"==e?(a.style.right="10px",a.style.transform="translate(110%, -50%)"):"left"==e&&(a.style.left="10px",a.style.transform="translate(-110%, -50%)"),s.appendChild(n),s.appendChild(a),super(t,s),this.side=e,this.isOpen=!1,this.sideDrawerBlur=n,this.content=a,document.addEventListener("click",(t=>{t.target==n&&this.close()}))}close(){this.isOpen=!1,this.playAnimation("reverse")}open(){this.isOpen=!0,this.playAnimation()}playAnimation(t="normal"){this.playElementAnimation(this.sideDrawerBlur,"avtoai-assistant-slide-blur 0.2s forwards",t),this.playElementAnimation(this.content,`avtoai-assistant-slide-drawer-${this.side} 0.4s ease-out forwards`,t)}}var a=(t,e,s)=>`<svg loading="lazy" viewBox="0 0 16 16" width="${s}" height="${e}" xmlns="http://www.w3.org/2000/svg" fill="none" class="hds-flight-icon--animation-loading"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill="${t}" fill-rule="evenodd" clip-rule="evenodd"> <path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z" opacity=".2"></path> <path d="M7.25.75A.75.75 0 018 0a8 8 0 018 8 .75.75 0 01-1.5 0A6.5 6.5 0 008 1.5a.75.75 0 01-.75-.75z"></path> </g> </g></svg>`;class i{constructor({container:t,assistantName:s,assistantImage:n,startInLoading:a}){const i=e.div({id:"avtoai-assistant-chat-header",classes:["avtoai-assistant-chat-header"]}),o=e.div({id:"avtoai-assistant-chat-header-container",style:{display:"flex",width:"100%",alignItems:"center"}}),r=e.div({id:"avtoai-assistant-chat-close-button-container",style:{display:"flex",flexGrow:"1",justifyContent:"end",alignItems:"center"}});i.appendChild(o),t&&t.appendChild(i);const c=this.createMenu(),l=e.div({id:"avtoai-assistant-header-close-button",classes:["avtoai-assistant-button-opacity-hover"],style:{cursor:"pointer",display:"flex",justifyContent:"center",alignItems:"center"}});l.innerHTML=`\n<?xml version="1.0" encoding="utf-8"?>\n<svg width="${"40px"}" height="${"25px"}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n<g id="Menu / Close_LG">\n<path id="Vector" d="M21 21L12 12M12 12L3 3M12 12L21.0001 3M12 12L3 21.0001" stroke="${"var(--avtoai-assistant-colors-color-theme-text-color)"}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\n</g>\n</svg>\n`,r.appendChild(l);const{titleContainer:d,titleText:h}=this.createTitle(s,n);o.appendChild(c),a||o.appendChild(d),o.appendChild(r),this.content=o,this.titleContainer=d,this.title=h,this.closeButtonContainer=r,this.closeButton=l}createMenu(){const t=document.createElement("div");t.classList.add("avtoai-assistant-chat-menu-container"),t.id="avtoai-assistant-chat-menu-container";for(let e=0;e<3;e++){const e=document.createElement("div");e.style.display="block",e.classList.add("avtoai-assistant-chat-menu-dot"),t.appendChild(e)}return t}createTitle(t,s){const n=e.div({id:"avtoai-assistant-chat-title-container",classes:["avtoai-assistant-chat-title-container"]}),a=e.div({id:"avtoai-assistant-chat-title-block",style:{display:"flex",alignItems:"center",paddingRight:"2rem"}}),i=document.createElement("img");i.loading="lazy",i.src=s,i.alt="avtoai-assistant-chat-bot-icon";const o=e.designComponent(i,{style:{width:"50px",height:"50px",borderRadius:"10px",filter:"drop-shadow(0px 0px 1px var(--avtoai-assistant-colors-color-theme-text-color))"}}),r=e.h3({classes:["avtoai-assistant-chat-title-text"],text:t});return a.appendChild(o),a.appendChild(r),n.appendChild(a),{titleContainer:n,titleText:r}}setTitle(t){this.title.textContent=t}switchToReady(){this.content.insertBefore(this.titleContainer,this.closeButtonContainer),e.designComponent(this.closeButtonContainer,{style:{flexGrow:"0",justifyContent:"center"}})}switchToLoading(){this.content.removeChild(this.titleContainer),e.designComponent(this.closeButtonContainer,{style:{flexGrow:"1",justifyContent:"end"}})}}class o{constructor(t){const s=e.div({id:"avtoai-assistant-chat-section",style:{flexGrow:"1",display:"flex",overflowY:"hidden"}}),n=e.div({id:"avtoai-assistant-chat-section-greeting-container",style:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",flexGrow:"1",height:"80%"}}),a=e.div({id:"avtoai-assistant-chat-section-greeting-button",style:{cursor:"pointer",display:"flex",justifyContent:"center",alignItems:"center",width:"100px",height:"100px",background:"rgba(137, 134, 134, 0.3)",borderRadius:"50%",boxShadow:"0 4px 30px rgba(0, 0, 0, 0.1)",backdropFilter:"blur(20px)"}}),i=document.createElement("img");i.loading="lazy",i.src=t,i.alt="avtoai-assistant-chat-section-greeting-icon";const o=e.designComponent(i,{style:{width:"85px",height:"85px",borderRadius:"50%"}}),r=e.h2({id:"avtoai-assistant-chat-section-greeting-title",style:{textAlign:"center",color:"var(--avtoai-assistant-colors-text-color)",fontWeight:"bold",marginBlock:"0",marginTop:"2rem"},text:"How can i assist you with this store?"}),c=e.p({id:"avtoai-assistant-chat-section-greeting-body",style:{fontSize:"1rem",fontWeight:"bold",marginTop:"0.5rem",color:"var(--avtoai-assistant-colors-text-color)"},text:"Powered by Avto"});n.appendChild(a),a.appendChild(o),n.appendChild(r),n.appendChild(c);const l=e.div({id:"avtoai-assistant-chat-section-container",classes:["avtoai-assistant-chat-scrollbar"],style:{display:"flex",overflowY:"auto",flexDirection:"column",flexGrow:"1",alignItems:"flex-start",padding:"1.25rem"}});s.appendChild(n),this.element=s,this.greetingContainer=n,this.content=l,this.view="greeting"}startChat(){"greeting"===this.view&&(this.element.removeChild(this.greetingContainer),this.element.appendChild(this.content),this.view="chat")}}class r extends s{constructor(t,s){const n=e.div({id:"avtoai-assistant-actions-container",classes:["avtoai-assistant-action-section-container"],style:{display:"flex"}}),a=e.div({id:"avtoai-assistant-actions-starters-button-container",classes:["avtoai-assistant-actions-starters-button-container"]}),i=`<?xml version="1.0" encoding="utf-8"?>\n\n<svg fill="${"var(--avtoai-assistant-colors-color-theme-text-color)"}" width="30px" height="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">\n\n<g data-name="Layer 2">\n\n<g data-name="question-mark">\n\n<rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"/>\n\n<path d="M17 9A5 5 0 0 0 7 9a1 1 0 0 0 2 0 3 3 0 1 1 3 3 1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-1.1A5 5 0 0 0 17 9z"/>\n\n<circle cx="12" cy="19" r="1"/>\n\n</g>\n\n</g>\n\n</svg>`;const o=(t=>`<?xml version="1.0" encoding="utf-8"?>\n<svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n<path fill-rule="evenodd" clip-rule="evenodd" d="M10.4606 1.25H13.5394C15.1427 1.24999 16.3997 1.24999 17.4039 1.34547C18.4274 1.44279 19.2655 1.64457 20.0044 2.09732C20.7781 2.57144 21.4286 3.22194 21.9027 3.99563C22.3554 4.73445 22.5572 5.57256 22.6545 6.59611C22.75 7.60029 22.75 8.85725 22.75 10.4606V11.5278C22.75 12.6691 22.75 13.564 22.7007 14.2868C22.6505 15.0223 22.5468 15.6344 22.3123 16.2004C21.7287 17.6093 20.6093 18.7287 19.2004 19.3123C18.3955 19.6457 17.4786 19.7197 16.2233 19.7413C15.7842 19.7489 15.5061 19.7545 15.2941 19.7779C15.096 19.7999 15.0192 19.832 14.9742 19.8582C14.9268 19.8857 14.8622 19.936 14.7501 20.0898C14.6287 20.2564 14.4916 20.4865 14.2742 20.8539L13.7321 21.7697C12.9585 23.0767 11.0415 23.0767 10.2679 21.7697L9.72579 20.8539C9.50835 20.4865 9.37122 20.2564 9.24985 20.0898C9.13772 19.936 9.07313 19.8857 9.02572 19.8582C8.98078 19.832 8.90399 19.7999 8.70588 19.7779C8.49387 19.7545 8.21575 19.7489 7.77666 19.7413C6.52138 19.7197 5.60454 19.6457 4.79957 19.3123C3.39066 18.7287 2.27128 17.6093 1.68769 16.2004C1.45323 15.6344 1.3495 15.0223 1.29932 14.2868C1.24999 13.564 1.25 12.6691 1.25 11.5278L1.25 10.4606C1.24999 8.85726 1.24999 7.60029 1.34547 6.59611C1.44279 5.57256 1.64457 4.73445 2.09732 3.99563C2.57144 3.22194 3.22194 2.57144 3.99563 2.09732C4.73445 1.64457 5.57256 1.44279 6.59611 1.34547C7.60029 1.24999 8.85726 1.24999 10.4606 1.25ZM6.73809 2.83873C5.82434 2.92561 5.24291 3.09223 4.77938 3.37628C4.20752 3.72672 3.72672 4.20752 3.37628 4.77938C3.09223 5.24291 2.92561 5.82434 2.83873 6.73809C2.75079 7.663 2.75 8.84876 2.75 10.5V11.5C2.75 12.6751 2.75041 13.5189 2.79584 14.1847C2.84081 14.8438 2.92737 15.2736 3.07351 15.6264C3.50486 16.6678 4.33223 17.4951 5.3736 17.9265C5.88923 18.1401 6.54706 18.2199 7.8025 18.2416L7.83432 18.2421C8.23232 18.249 8.58109 18.2549 8.87097 18.287C9.18246 18.3215 9.4871 18.3912 9.77986 18.5615C10.0702 18.7304 10.2795 18.9559 10.4621 19.2063C10.6307 19.4378 10.804 19.7306 11.0004 20.0623L11.5587 21.0057C11.7515 21.3313 12.2485 21.3313 12.4412 21.0057L12.9996 20.0623C13.1959 19.7306 13.3692 19.4378 13.5379 19.2063C13.7204 18.9559 13.9298 18.7304 14.2201 18.5615C14.5129 18.3912 14.8175 18.3215 15.129 18.287C15.4189 18.2549 15.7676 18.249 16.1656 18.2421L16.1975 18.2416C17.4529 18.2199 18.1108 18.1401 18.6264 17.9265C19.6678 17.4951 20.4951 16.6678 20.9265 15.6264C21.0726 15.2736 21.1592 14.8438 21.2042 14.1847C21.2496 13.5189 21.25 12.6751 21.25 11.5V10.5C21.25 8.84876 21.2492 7.663 21.1613 6.73809C21.0744 5.82434 20.9078 5.24291 20.6237 4.77938C20.2733 4.20752 19.7925 3.72672 19.2206 3.37628C18.7571 3.09223 18.1757 2.92561 17.2619 2.83873C16.337 2.75079 15.1512 2.75 13.5 2.75H10.5C8.84876 2.75 7.663 2.75079 6.73809 2.83873ZM7.25 9C7.25 8.58579 7.58579 8.25 8 8.25H16C16.4142 8.25 16.75 8.58579 16.75 9C16.75 9.41421 16.4142 9.75 16 9.75H8C7.58579 9.75 7.25 9.41421 7.25 9ZM7.25 12.5C7.25 12.0858 7.58579 11.75 8 11.75H13.5C13.9142 11.75 14.25 12.0858 14.25 12.5C14.25 12.9142 13.9142 13.25 13.5 13.25H8C7.58579 13.25 7.25 12.9142 7.25 12.5Z" fill="${t}"/>\n</svg>`)("var(--avtoai-assistant-colors-color-theme-text-color)");a.innerHTML=i;const r=e.div({id:"avtoai-assistant-actions-input-container",classes:["avtoai-assistant-actions-input-container"]}),c=e.input({id:"avtoai-assistant-actions-input",classes:["avtoai-assistant-actions-input"]});c.placeholder="Chat here...",r.appendChild(c),e.div({});const l=e.div({id:"avtoai-assistant-actions-send-button",classes:["avtoai-assistant-actions-send","avtoai-assistant-actions-send-enabled"]});l.innerHTML=(t=>`<svg loading="lazy" width="50px" height="50px" viewBox="0 0 24 24" fill="${t}" xmlns="http://www.w3.org/2000/svg">\n    <path d="M6.99811 10.2467L7.43298 11.0077C7.70983 11.4922 7.84825 11.7344 7.84825 12C7.84825 12.2656 7.70983 12.5078 7.43299 12.9923L7.43298 12.9923L6.99811 13.7533C5.75981 15.9203 5.14066 17.0039 5.62348 17.5412C6.1063 18.0785 7.24961 17.5783 9.53623 16.5779L15.8119 13.8323C17.6074 13.0468 18.5051 12.654 18.5051 12C18.5051 11.346 17.6074 10.9532 15.8119 10.1677L9.53624 7.4221C7.24962 6.42171 6.1063 5.92151 5.62348 6.45883C5.14066 6.99615 5.75981 8.07966 6.99811 10.2467Z"/>\n</svg>`)("var(--avtoai-assistant-colors-text-color)"),r.appendChild(l),n.appendChild(a),n.appendChild(r),super(t,n);const d=this.createStarters(s);this.mode="chat",this.input=c,this.sendButton=l,this.content=n,this.starters=Array.from(d.children),this.startersContent=d,a.onclick=()=>{"chat"===this.mode?(n.removeChild(r),n.appendChild(this.startersContent),a.innerHTML=o,this.mode="starters"):"starters"===this.mode&&(n.removeChild(this.startersContent),n.appendChild(r),a.innerHTML=i,this.mode="chat")}}setStarters(t){const e=this.createStarters(t);this.content.contains(this.startersContent)&&(this.content.insertBefore(e,this.startersContent),this.content.removeChild(this.startersContent)),this.starters=Array.from(e.children),this.startersContent=e}createStarters(t){const s=e.div({id:"avtoai-assistant-chat-actions-starters-container",classes:["avtoai-assistant-chat-scrollbar"],style:{width:"90%",flexGrow:"1",display:"flex",overflowY:"hidden",overflowX:"auto",gap:".25rem",paddingBlock:".5rem",marginInline:".5rem"}});s.addEventListener("wheel",(t=>{t.preventDefault(),s.scrollLeft+=.5*t.deltaY}));for(let n of t.filter((t=>""!==t.trim()))){const t=e.div({id:"avtoai-assistant-chat-actions-starter",classes:["avtoai-assistant-chat-actions-starter"],style:{cursor:"pointer",display:"flex",alignItems:"center",height:"50px",textWrap:"nowrap",width:"fit-content",padding:"1rem",fontSize:"14px",borderRadius:"50px",color:"var(--avtoai-assistant-colors-color-theme-text-color)",backgroundColor:"var(--avtoai-assistant-colors-color-theme)",border:"var(--avtoai-assistant-colors-widget-box-border) solid 1px",boxShadow:"var(--avtoai-assistant-colors-text-color) 0.1rem 0.1rem"},text:n});s.appendChild(t)}return s}}class c{constructor({drawer:t,assistantName:e,assistantStarters:s=[],assistantImage:n,startInLoading:a=!0,disableForMessageSent:c=!0}){const l=new i({container:t.content,assistantName:e,assistantImage:n,startInLoading:a});let d,h,p;l.closeButton.onclick=()=>t.close(),p=this.createLoadingComponent(),a?(d=new o(n),h=new r(null,s),t.content.appendChild(p)):(d=new o(n),h=new r(t.content,s)),this.container=t.content,this.loading=a,this.disableForMessageSent=c,this.sections={headerSection:l,chatSection:d,actionSection:h},this.loadingComponent=p,this.runStatus="completed",h.sendButton.onclick=t=>this.onSend(t,h),h.starters.forEach((t=>{t.onclick=e=>this.onSend(e,h,t.textContent)})),document.addEventListener("keydown",(async t=>{"Enter"===t.key&&this.onSend(t,h)}))}messageSentReady(){this.runStatus="completed",this.sections.actionSection.sendButton.disabled=!1,this.sections.actionSection.sendButton.classList.add("avtoai-assistant-actions-send-enabled")}messageSentStarted(){this.runStatus="in_process",this.sections.actionSection.sendButton.disabled=!0,this.sections.actionSection.sendButton.classList.remove("avtoai-assistant-actions-send-enabled"),this.sections.chatSection.startChat()}switchToReady(){this.loading&&(this.sections.headerSection.switchToReady(),this.container.contains(this.loadingComponent)&&this.container.removeChild(this.loadingComponent),this.container.appendChild(this.sections.chatSection.element),this.container.appendChild(this.sections.actionSection.content),this.loading=!1)}switchToLoading(){this.loading||(this.sections.headerSection.switchToLoading(),this.container.contains(this.sections.chatSection.element)&&this.container.removeChild(this.sections.chatSection.element),this.container.contains(this.sections.actionSection.content)&&this.container.removeChild(this.sections.actionSection.content),this.container.appendChild(this.loadingComponent),this.loading=!0)}createLoadingComponent(){const t=e.div({id:"avtoai-assistant-chat-app-loading-container",style:{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}),s=e.div({id:"avtoai-assistant-chat-app-loading",style:{animation:"avtoai-assistant-spin 2s linear infinite",height:"60px"}});return s.innerHTML=a("var(--avtoai-assistant-colors-color-theme)","60px","60px"),t.appendChild(s),t}async onMessageSent(t){}async onSend(t,e,s){t&&t.preventDefault();const n=s||e.input.value.trim();n.length>0&&this.onMessageSent&&"completed"===this.runStatus&&(this.messageSentStarted(),e.input.value="",await this.onMessageSent(n),this.disableForMessageSent&&this.messageSentReady())}}const l=new class{constructor(){this.staticUrl="/apps/server",this.config={method:"GET",headers:{"Content-Type":"application/json","ngrok-skip-browser-warning":"true"}}}async get(t){try{this.config.method="GET",this.config.body=null;const e=await fetch(`${this.staticUrl}${t}`,this.config);if(e.ok){return await e.json()}console.error({error:e})}catch(t){console.log(t),console.error(t.message)}}async post(t,e={}){try{this.config.method="POST",this.config.body=JSON.stringify(e);const s=await fetch(`${this.staticUrl}${t}`,this.config);if(s.ok){return await s.json()}console.error({error:s})}catch(t){console.log(t),console.error(t.message)}}};function d(t,e){sessionStorage.setItem(t,JSON.stringify(e))}function h(t){const e=sessionStorage.getItem(t);return e?JSON.parse(e):null}function p(t){let e=t.innerHTML.replace(/^### (.*$)/gim,"<h3>$1</h3>").replace(/^## (.*$)/gim,"<h2>$1</h2>").replace(/^# (.*$)/gim,"<h1>$1</h1>").replace(/\*\*(.*)\*\*/gim,"<strong>$1</strong>").replace(/\*(.*)\*/gim,"<em>$1</em>").replace(/\[([^\]]+)\]\(([^)]+)\)/gim,'<a style="text-decoration:none;color:black" href="$2">$1</a>');e=e.replace(/\n/g,"<br>"),t.innerHTML=e}async function m({productHandle:t,variantIds:e}){try{const s=await fetch(`/products/${t}.js`);if(!s.ok)return console.error(`Failed to fetch product: ${s.statusText}`),null;const n=await s.json(),a=e&&e.length>0?n.variants.filter((t=>e.includes(t.id))):null;let i=[];return n.variants.forEach((t=>{let e=t&&t.featured_image?t.featured_image.src:null;e||(n.featured_image?e=n.featured_image:n.images.length>0&&(e=n.images[0])),i.push({displayName:t.name?t.name:n.title,id:t.id,options:t.options,price:t.price?t.price/100:n.price/100,imageUrl:e?e.startsWith("https:")?e:`https:${e}`:null})})),{productHandle:t,defaultVariantId:a&&a[0]?a[0].id:null,variants:i,options:n.options}}catch(e){return console.error(`Error fetching product details for handle "${t}": ${e.message}`),null}}async function g(t){if(0===t.trim().length)return[];const e=function(t,e){const s=t.replaceAll(":"," : "),n=/[",',\s,{,\\[]variant_id[",',\s]\s*:\s*[",',\s].*?\/(\d+)[",',\s,},\]]|[",',\s,{,\\[]id[",',\s]\s*:\s*[",',\s].*?\/(\d+)[",',\s,},\]]/g,a=/[",',\s,{,\\[](product_handle|handle)[",',\s]\s*:\s*[",',\s](.*?-.+?)[",',\s,},\]]/g,i=[],o=[];let r;for(;null!==(r=a.exec(s));)i.push(r[2]);for(;null!==(r=n.exec(s));){const t=r[1]?parseInt(r[1],10):parseInt(r[2],10);isNaN(t)||o.push(t)}return i.map((t=>e({productHandle:t,variantIds:o}).catch((()=>null))))}(t,m);return(await Promise.all(e)).filter((t=>null!==t))}class u{static lastMessageType="empty";constructor(t,s,n,{paddingBlock:a=!1,paddingInline:i=!0,border:o=!1}){const r=e.div({id:"avtoai-assistant-message-container",style:{maxWidth:"90%",borderRadius:"10px",border:o?"1px solid var(--avtoai-assistant-colors-text-color)":"none",paddingInline:i?"1.25em":"0px",paddingBlock:a?"1em":"0px",marginTop:"empty"===u.lastMessageType?"0em":"assistant"===u.lastMessageType&&"assistant"===s?"0.5em":"1em",alignSelf:"assistant"===s?"flex-start":"flex-end",backgroundColor:"assistant"===s?"var(--avtoai-assistant-colors-message-assistant-bg)":"var(--avtoai-assistant-colors-color-theme)"}});u.lastMessageType=s;const c=e.p({id:"avtoai-assistant-message",style:{color:"assistant"===s?"black":"var(--avtoai-assistant-colors-color-theme-text-color)"},text:t});r.appendChild(c),n&&(this.innerContent=n,r.appendChild(n)),this.content=r,this.textElement=c,this.text=c.textContent}isEmpty(){return""===this.text.trim()&&this.content.contains(this.innerContent)}updateMessage(t){this.content.contains(this.innerContent)&&(this.content.removeChild(this.innerContent),e.designComponent(this.content,{style:{paddingInline:"1.25em",paddingBlock:"0px"}})),"string"==typeof t?(this.textElement.textContent=t,this.text=t):"function"==typeof t&&(this.textElement.textContent=t(this.text),this.text=t(this.text)),p(this.textElement)}updateInnerContent(t){this.content.contains(this.innerContent)&&this.content.removeChild(this.innerContent),this.content.appendChild(t),this.innerContent=t}}class v extends u{constructor(t,e,s){super(e,s,null,{}),t.appendChild(this.content)}}class C extends u{constructor(t){const s=e.div({id:"avtoai-assistant-chat-app-message-loading",style:{animation:"avtoai-assistant-spin 2s linear infinite",height:"30px"}});s.innerHTML=a("var(--avtoai-assistant-colors-color-theme)","30px","30px"),super("","assistant",s,{paddingBlock:!0}),t.appendChild(this.content)}}class x extends u{constructor(t,{productHandle:s,defaultVariantId:n,variants:a,options:i}){const o=n?a.find((t=>t.id===n)):a[0],r=e.div({id:"avtoai-assistant-chat-app-product-info-message"});super("","assistant",r,{paddingInline:!1,border:!0});const c=e.h3({id:"avtoai-assistant-chat-app-product-info-message-title",style:{marginBlockEnd:"0.25em",marginInline:"1.25em",fontWeight:"600"},text:o.displayName}),l=e.p({id:"avtoai-assistant-chat-app-message-card-price",style:{marginBlockStart:"0px",marginBottom:"2.25rem",marginInline:"1.25em"},text:this.formatPrice(o.price)}),d=document.createElement("img");d.loading="lazy",d.src=o.imageUrl,d.alt="product-image",e.designComponent(d,{id:"avtoai-assistant-chat-app-product-info-message-image",style:{width:"100%",height:"300px",borderRadius:"10px 10px 0px 0px",objectFit:"cover"}}),r.appendChild(d),r.appendChild(c),r.appendChild(l),t.appendChild(this.content),this.variants=a,this.selectedVariant=o,this.productHandle=s,this.selectedOptions=[...o.options],this.image=d,this.title=c,this.price=l;const h=this.createOptions(i),p=this.createButtonSection();r.appendChild(h),r.appendChild(p)}formatPrice(t){return new Intl.NumberFormat("en-GB",{style:"currency",currency:"GBP"}).format(t)}createOptions(t){const s=e.div({id:"avtoai-assistant-chat-app-product-info-message-options-container",style:{paddingInline:"1.25em",marginBlockEnd:"1.25em"}});return t.forEach(((t,e)=>{const n=this.createOption(t,e);s.appendChild(n)})),s}selectOption(t,s){Array.from(t.parentElement.children).forEach((n=>{n===t?"color"===s?e.designComponent(n,{style:{outline:"3px double black"}}):e.designComponent(n,{style:{opacity:"1"}}):"color"===s?e.designComponent(n,{style:{outline:null}}):e.designComponent(n,{style:{opacity:null}})}))}selectVariant(t,e){this.selectedOptions[e]=t;const s=this.variants.find((t=>t.options.length===this.selectedOptions.length&&t.options.every(((t,e)=>t===this.selectedOptions[e]))));s&&(this.selectedVariant=s,this.image.src=s.imageUrl,this.title.textContent=s.displayName,this.price.textContent=this.formatPrice(s.price))}createOption(t,s){const n=e.div({id:"avtoai-assistant-chat-app-product-info-message-option-container"}),a=e.p({id:"avtoai-assistant-chat-app-product-info-message-option-title",style:{color:"black",fontWeight:"600",fontSize:"12px",marginBlockEnd:"0.25rem"},text:t.name.toUpperCase()}),i=e.div({id:"avtoai-assistant-chat-app-product-info-message-option-wrapper",style:{display:"flex",flexWrap:"wrap"}});return t.values.forEach((n=>{const a="color"===t.name.toLowerCase()||"colour"===t.name.toLowerCase()?"color":"block",o="color"===a?e.div({id:"avtoai-assistant-chat-app-product-info-message-option-color",style:{display:"block",cursor:"pointer",width:"30px",height:"30px",borderRadius:"50%",backgroundColor:n.toLowerCase(),marginBlockEnd:"0.25em",marginInlineEnd:"0.25em"}}):e.div({id:"avtoai-assistant-chat-app-product-info-message-option-other",classes:["avtoai-assistant-button-opacity-hover-4"],style:{minWidth:"50px",cursor:"pointer",display:"flex",justifyContent:"center",alignItems:"center",padding:"0.5rem",borderTop:"2px solid black",borderBottom:"2px solid black",borderLeft:0===t.values.indexOf(n)?"2px solid black":"1px solid black",borderRight:t.values.indexOf(n)===t.values.length-1?"2px solid black":"1px solid black",borderRadius:t.values.indexOf(n)===t.values.length-1?"0px 10px 10px 0px":0===t.values.indexOf(n)?"10px 0px 0px 10px":"none"},text:n});i.appendChild(o),o.onclick=t=>{this.selectOption(t.target,a),this.selectVariant(n,s)},this.selectedVariant.options.includes(n)&&this.selectOption(o,a)})),n.appendChild(a),n.appendChild(i),n}createButtonSection(){const t=e.div({id:"avtoai-assistant-chat-app-product-info-message-buttons-container",style:{display:"flex",paddingInline:"1.25em",marginBottom:"1.25em"}}),s=e.button({id:"avtoai-assistant-chat-app-product-info-message-buttons-view-product",classes:["avtoai-assistant-button-scale-hover"],style:{display:"block",cursor:"pointer",width:"50%",paddingInline:"0.25em",paddingBlock:"0.25em",textAlign:"center",border:"1px solid black",marginInlineEnd:"0.25rem",borderRadius:"50px",color:"black",backgroundColor:"var(--avtoai-assistant-colors-message-assistant-bg)"},text:"View Product"}),n=e.button({id:"avtoai-assistant-chat-app-product-info-message-buttons-add-to-cart",classes:["avtoai-assistant-button-scale-hover"],style:{display:"block",cursor:"pointer",width:"50%",paddingInline:"1.25rem",paddingBlock:"1rem",textAlign:"center",border:"1px solid black",borderRadius:"50px",color:"var(--avtoai-assistant-colors-message-assistant-bg)",backgroundColor:"black "},text:"Add to Cart"});return s.onclick=()=>{window.open(window.Shopify.routes.root+`products/${this.productHandle}`)},n.onclick=async()=>{await async function(t,e){const s={items:[{id:parseInt(t),quantity:e}]};try{const t=await fetch(window.Shopify.routes.root+"cart/add.js",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)});t.ok?(await t.json(),console.log("Item added to cart")):console.error("Failed to add item to cart. Status code:",t.status)}catch(t){console.error("Error adding item to cart:",t)}}(this.selectedVariant.id,1),window.open(window.Shopify.routes.root+"cart")},t.appendChild(s),t.appendChild(n),t}}function y(t,e){if(e&&0!==e.length)for(let s of e)t.textContent=t.textContent.replace(s.text,"")}function f(t){const e=t.textContent,s=e.match(/product[ _]handle:\s*([^\s]+)/i),n=e.match(/variant[ _]id:\s*(gid:\/\/shopify\/ProductVariant\/\d+)/i);if(s&&n){const[a,i]=s,[o,r]=n;return t.textContent=e.split(a).join("").split(o).map((t=>t.trim())).join(""),{productHandle:i,variantId:r.split("/").pop()}}}async function w(){const e=document.getElementById("avtoai-assistant-bot-container"),s=document.getElementById("avtoai-assistant-widget-button");t(e.getAttribute("data-avtoai-color-theme-app"),e.getAttribute("data-avotai-theme-app"));const a=e.getAttribute("data-avtoai-chat-position"),i=e.getAttribute("data-avtoai-chat-image");e.removeAttribute("data-shop-domain"),e.removeAttribute("data-avtoai-chat-image");const o=new n({container:e,position:a}),r=h("avtoai-assistant-chat-name"),m=h("avtoai-assistant-chat-starters");let w,b;const S=new c({drawer:o,assistantName:r||"Avto AI chatbot Here to help you",assistantStarters:m||["What does this shop sell?"],assistantImage:i,disableForMessageSent:!1});if(S.onMessageSent=async t=>{h("avtoai-assistant-chat-thread")&&(new v(S.sections.chatSection.content,t,"user"),b=new C(S.sections.chatSection.content),S.sections.chatSection.content.lastChild.scrollIntoView({behavior:"smooth",block:"end"}),w?w.send(t):console.error("No websocket connection"))},!s)return console.error("No widget button element found");s.onclick=async()=>{if(o.isOpen)o.close();else{let e;o.open(),S.switchToLoading();const s=h("avtoai-assistant-chat-thread"),n=h("avtoai-assistant-chat-name");if(s&&n){const t=await l.post("/pull/messages",{thread_id:s});e=t.accessUrl,t.messages&&t.messages.length>0&&(S.sections.chatSection.startChat(),async function({container:t,messages:e,staticAddedMessages:s}){const{initConversation:n,newMessages:a}=function(t,e=null,s=0){if(0===t.childElementCount)return{initConversation:!0};for(let e=0;e<s;e++)t.removeChild(t.lastChild);return{initConversation:!1,newMessages:e.length-t.childElementCount}}(t,e,s),i=new u("","user",null,{}).content,o=new u("","assistant",null,{}).content,r=n?e:e.slice(e.length-a,e.length);let c;for(let e=0;e<r.length;e++){const s=r[e],n="assistant"===s.role?o.cloneNode(!0):i.cloneNode(!0);n.children[0].textContent=s.messageText,n.style.marginTop="assistant"===c&&"assistant"===s.role?"0.5em":c?"1em":"0em",c=s.role,t.appendChild(n),"assistant"===s.role&&(y(n.children[0],s.annotations),p(n.children[0]),f(n.children[0]))}}({container:S.sections.chatSection.content,messages:t.messages.reverse()}))}else{const t=await l.get("/create/thread");S.sections.headerSection.setTitle(t.assistantName),S.sections.actionSection.setStarters(t.assistantStarters),e=t.accessUrl,d("avtoai-assistant-chat-thread",t.threadId),d("avtoai-assistant-chat-name",t.assistantName),d("avtoai-assistant-chat-starters",t.assistantStarters)}e?(w=await(t=e,new Promise(((e,s)=>{const n=new WebSocket(t);n.onopen=()=>{console.log("connected to AVTO chat"),e(n)},n.onerror=t=>{console.error("AVTO chat error:",t),s(t)}}))),S.switchToReady(),w.onmessage=async t=>{const e=JSON.parse(t.data);if("running"===e.status&&"message_creation"===e.step)b&&b.updateMessage((t=>t+e.chunk));else if("created"===e.status&&"message_creation"===e.step)b&&b.isEmpty()||(b=new C(S.sections.chatSection.content));else if("completed"===e.status&&"no_step"===e.step)S.messageSentReady();else if("created"===e.status&&"code_interpreter"===e.step)b&&b.isEmpty()||(b=new C(S.sections.chatSection.content));else if("done"===e.status&&"code_interpreter"===e.step){console.log(e.code);(await g(e.code)).forEach((t=>new x(S.sections.chatSection.content,t)))}}):console.error("No access url")}var t}}document.addEventListener("DOMContentLoaded",(()=>{w()}));
