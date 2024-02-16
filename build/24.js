"use strict";(globalThis.webpackChunkslide_blocks=globalThis.webpackChunkslide_blocks||[]).push([[24],{1024:(e,t,l)=>{l.r(t),l.d(t,{default:()=>I});var n=l(1280),o=l(3396),i=l(5385),a=l(8496),s=l(948),r=l.n(s),c=l(8392),d=l(2508);function u(e,t){!function(l,o){const i=(0,a.useRef)();r()(o,i.current)||(i.current=o),(0,a.useEffect)((()=>(()=>{const l=document.getElementsByName("editor-canvas")[0];if(l){const o=l.contentDocument||l.contentWindow.document,i=new c.W8;(0,d.iC)(i.collectStyles((0,n.createElement)(e,{attributes:t})));const a=i.getStyleTags().replace(/<style[^>]*>|<\/style>/g,""),s=o.createElement("style");return s.innerHTML=a,o.head.appendChild(s),()=>{o.head.removeChild(s)}}})()),[i.current])}(0,[t])}var m=l(2604),g=l(9528),_=l(7287),b=l(1088),p=l(8664),f=l(7752);const v=(e,t,l,n)=>{const o=(0,a.useRef)({x:0,y:0}),i=(0,a.useRef)(!1),s=(0,a.useRef)({x:0,y:0});(0,a.useEffect)((()=>{const a=t.current;if(!e)return void(a&&a.classList.remove("itmar_isDraggable"));const r=l.x.match(/(-?\d+)([a-zA-Z]+)/),c=l.y.match(/(-?\d+)([a-zA-Z]+)/);o.current={x:parseInt(r[1]),y:parseInt(c[1])};const d=e=>{a.classList.add("itmar_isDraggable"),i.current=!0,s.current={x:e.clientX,y:e.clientY}},u=e=>{if(!i.current)return;const t=e.clientX-s.current.x,l=e.clientY-s.current.y,n={x:o.current.x+t,y:o.current.y+l};o.current=n,s.current={x:e.clientX,y:e.clientY},a.style.transform=`translate(${o.current.x}px, ${o.current.y}px)`},m=()=>{i.current=!1,a.style.transform=null,n({x:`${o.current.x}px`,y:`${o.current.y}px`})},g=()=>{i.current=!1};return a&&a.classList.add("itmar_isDraggable"),a.addEventListener("mousedown",d),a.addEventListener("mousemove",u),a.addEventListener("mouseup",m),a.addEventListener("mouseleave",g),()=>{a.removeEventListener("mousedown",d),a.removeEventListener("mousemove",u),a.removeEventListener("mouseup",m),a.removeEventListener("mouseleave",g),a.style.transform=null}}),[e,t,l,n])};function h(e){const t=e.attributes,l=(l,n)=>{if(l){const o={...t,[n]:l};e.onPositionChange(o)}};return(0,n.createElement)(n.Fragment,null,(0,n.createElement)(_.PanelBody,{title:(0,o.__)("Position Setting","itmar_block_collections"),initialOpen:!0},(0,n.createElement)(_.PanelRow,{className:"distance_row"},(0,n.createElement)(_.__experimentalUnitControl,{dragDirection:"e",onChange:e=>l(e,"x"),label:(0,o.__)("Lateral direction","itmar_block_collections"),value:t?.x||0}),(0,n.createElement)(_.__experimentalUnitControl,{dragDirection:"e",onChange:e=>l(e,"y"),label:(0,o.__)("Longitudinal direction","itmar_block_collections"),value:t?.y||0})),(0,n.createElement)(_.PanelRow,{className:"reset_row"},(0,n.createElement)(_.Button,{variant:"secondary",onClick:()=>{e.onPositionChange({x:"0px",y:"0px"})}},(0,o.__)("Reset","itmar_block_collections")))))}var w=l(3424),k=l(3452),E=l(6728);const C={top:"10px",left:"10px",right:"10px",bottom:"10px"},y={top:"20px",left:"10px",right:"10px",bottom:"20px"},x=[{value:"px",label:"px"},{value:"em",label:"em"},{value:"rem",label:"rem"}],P={left:w.c,center:k.c,right:E.c},S={coverflow:p.sB,coverflow_2:p.sB,cube:p.wZ,flip:p.YR,cards:p.kZ},B=(e,t)=>{let l=[];return e.forEach((e=>{e.name===t&&l.push(e),e.innerBlocks&&e.innerBlocks.length&&(l=[...l,...B(e.innerBlocks,t)])})),l};function I({attributes:e,setAttributes:t,clientId:l}){const{default_val:s,mobile_val:r,is_shadow:c,slideInfo:d,shadow_element:w}=e,k=function(){const[e,t]=(0,a.useState)(!1);return(0,a.useEffect)((()=>{const e=()=>{const e=document.getElementsByName("editor-canvas")[0];e&&e.contentWindow&&t(e.contentWindow.innerWidth<=767)},l=document.getElementsByName("editor-canvas")[0];return l&&l.contentWindow&&l.contentWindow.addEventListener("resize",e),e(),()=>{l&&l.contentWindow&&l.contentWindow.removeEventListener("resize",e)}}),[]),e}(),E=(0,a.useRef)(null),I=(0,g.useBlockProps)({ref:E}),R=function(e,t){const[l,n]=(0,a.useState)("");return(0,a.useEffect)((()=>{if(e.current&&t)if(t.backgroundColor&&!t.backgroundColor.startsWith("var(--wp"))n(t.backgroundColor);else if(e.current){const t=getComputedStyle(e.current);n(t.backgroundColor)}}),[t,e]),l}(E,I.style);(0,a.useEffect)((()=>{if(R){t({shadow_element:{...w,baseColor:R}});const e=(0,m.e)({...w,baseColor:R});e&&t({shadow_result:e.style})}}),[R]),u(i.e,e),v(k?r.is_moveable:s.is_moveable,E,k?r.position:s.position,(e=>{t(k?{mobile_val:{...r,position:e}}:{default_val:{...s,position:e}})}));const V=(0,g.useInnerBlocksProps)({className:"swiper-wrapper"},{template:[["itmar/design-group",{}]],allowedBlocks:["itmar/design-group"],templateLock:!1}),L=(0,f.useSelect)((e=>e("core/block-editor").getBlocks(l)),[l]),{updateBlockAttributes:T}=(0,f.useDispatch)("core/block-editor");(0,a.useEffect)((()=>{L.forEach((e=>{if("itmar/design-group"===e.name){const t={is_swiper:!0};T(e.clientId,{...e.attributes,...t})}}))}),[L.length,l]);const D=B(L,"core/image");(0,a.useEffect)((()=>{D.forEach((e=>{T(e.clientId,{...e.attributes,className:"itmar_ex_block"})}))}),[L.length,l]);const N={none:{centeredSlides:!0,slidesPerView:k?d.mobilePerView:d.defaultPerView,spaceBetween:k?d.mobileBetween:d.defaultBetween},coverflow:{centeredSlides:!0,slidesPerView:k?d.mobilePerView:d.defaultPerView,spaceBetween:k?d.mobileBetween:d.defaultBetween,effect:"coverflow",coverflowEffect:{rotate:50,depth:100,stretch:k?50:0,modifier:1,scale:.9,slideShadows:!0}},coverflow_2:{centeredSlides:!0,slidesPerView:k?d.mobilePerView:d.defaultPerView,spaceBetween:k?d.mobileBetween:d.defaultBetween,effect:"coverflow",coverflowEffect:{rotate:0,slideShadows:!0,stretch:k?150:100}},cube:{effect:"cube",cubeEffect:{slideShadows:!0,shadow:!0,shadowOffset:20,shadowScale:.94},on:{slideChangeTransitionStart:function(){this.el.classList.remove("scale-in"),this.el.classList.add("scale-out")},slideChangeTransitionEnd:function(){this.el.classList.remove("scale-out"),this.el.classList.add("scale-in")}}},flip:{effect:"flip",flipEffect:{limitRotation:!0,slideShadows:!0}},cards:{effect:"cards",cardsEffect:{perSlideOffset:8,perSlideRotate:2,rotate:!0,slideShadows:!0}}},F=(0,a.useRef)(null),W=(0,a.useRef)(null);(0,a.useEffect)((()=>{F.current&&(W.current&&(F.current.parentElement.querySelectorAll(".swiper-pagination-bullet").forEach((e=>e.remove())),W.current.destroy(!1,!0)),(()=>{const e=F.current.parentElement;let t=[],l={simulateTouch:!1,loop:d.loop};if(d.navigation.disp){t=[...t,p._2];const n=e.querySelector(".swiper-button-next"),o=e.querySelector(".swiper-button-prev");l.navigation={nextEl:n,prevEl:o}}if(d.pagination.disp){t=[...t,p.eM];const n=e.querySelector(".swiper-pagination");l.pagination={el:n}}if(d.scrollbar.disp){t=[...t,p.a1];const n=e.querySelector(".swiper-scrollbar");l.scrollbar={el:n}}d.effect&&(S[d.effect]&&(t=[...t,S[d.effect]]),l={...l,...N[d.effect]}),l.modules=t,W.current=new b.c(F.current,l)})())}),[L.length,d,k]);const[z,A]=(0,a.useState)(d.navigation.bgColor),[H,O]=(0,a.useState)(d.navigation.bgGradient);return(0,a.useEffect)((()=>{const e=void 0!==z?z:"var(--wp--preset--color--content-back)";t({slideInfo:{...d,navigation:{...d.navigation,bgColor:void 0===z?"":z,bgGradient:H,shadow_element:{...d.navigation.shadow_element,baseColor:e}}}})}),[z,H]),(0,n.createElement)(n.Fragment,null,(0,n.createElement)(g.InspectorControls,{group:"settings"},(0,n.createElement)(_.PanelBody,{title:(0,o.__)("Slide Settings","slide-blocks"),initialOpen:!0,className:"form_design_ctrl"},(0,n.createElement)(_.PanelBody,{title:(0,o.__)("Global Setting","slide-blocks"),initialOpen:!1},(0,n.createElement)(_.ToggleControl,{label:(0,o.__)("Loop","slide-blocks"),checked:d.loop,onChange:e=>{t({slideInfo:{...d,loop:e}})}}),(0,n.createElement)(_.RangeControl,{value:d.autoplay,label:(0,o.__)("Autoplay","slide-blocks"),max:1e4,min:0,step:500,onChange:e=>{t({slideInfo:{...d,autoplay:e}})},withInputField:!0,help:(0,o.__)("It will automatically slide at the interval you entered. If set to 0, it will not slide automatically.","slide-blocks")}),(0,n.createElement)("div",{className:"itmar_title_type"},(0,n.createElement)(_.RadioControl,{label:(0,o.__)("Effect Type","slide-blocks"),selected:d.effect,options:[{label:(0,o.__)("None","slide-blocks"),value:"none"},{label:(0,o.__)("Coverflow 1","slide-blocks"),value:"coverflow"},{label:(0,o.__)("Coverflow 2","slide-blocks"),value:"coverflow_2"},{label:(0,o.__)("Cube","slide-blocks"),value:"cube"},{label:(0,o.__)("Flip","slide-blocks"),value:"flip"},{label:(0,o.__)("Cards","slide-blocks"),value:"cards"}],onChange:e=>{t({slideInfo:{...d,effect:e}})}})),("none"===d.effect||"coverflow"===d.effect||"coverflow_2"===d.effect)&&(0,n.createElement)(n.Fragment,null,(0,n.createElement)(_.RangeControl,{label:k?(0,o.__)("SlidesPerView(mobile)","slide-blocks"):(0,o.__)("SlidesPerView(desk top)","slide-blocks"),value:k?d.mobilePerView:d.defaultPerView,max:20,min:1,step:.1,onChange:e=>t(k?{slideInfo:{...d,mobilePerView:e}}:{slideInfo:{...d,defaultPerView:e}}),withInputField:!0}),(0,n.createElement)(_.RangeControl,{label:k?(0,o.__)("Slide Space Between(mobile)","slide-blocks"):(0,o.__)("Slide Space Between(desk top)","slide-blocks"),value:k?d.mobileBetween:d.defaultBetween,max:200,min:0,step:5,onChange:e=>t(k?{slideInfo:{...d,mobileBetween:e}}:{slideInfo:{...d,defaultBetween:e}}),withInputField:!0})),"cube"===d.effect&&(0,n.createElement)(_.ToggleControl,{label:(0,o.__)("Zoom Up","slide-blocks"),checked:d.cubeZoom,onChange:e=>{t({slideInfo:{...d,cubeZoom:e}})}})),(0,n.createElement)(_.PanelBody,{title:(0,o.__)("Navigation Setting","slide-blocks"),initialOpen:!1},(0,n.createElement)(_.ToggleControl,{label:(0,o.__)("Display","slide-blocks"),checked:d.navigation.disp,onChange:e=>{t({slideInfo:{...d,navigation:{...d.navigation,disp:e}}})}}),d.navigation.disp&&(0,n.createElement)(n.Fragment,null,(0,n.createElement)("div",{className:"itmar_title_type"},(0,n.createElement)(_.RadioControl,{label:(0,o.__)("Display Design","slide-blocks"),selected:d.navigation.design,options:[{label:(0,o.__)("Default","slide-blocks"),value:"default"},{label:(0,o.__)("Circle","slide-blocks"),value:"circle"}],onChange:e=>{t({slideInfo:{...d,navigation:{...d.navigation,design:e}}})}})),(0,n.createElement)(_.RangeControl,{label:k?(0,o.__)("Horizen position(mobile)","slide-blocks"):(0,o.__)("Horizen position(desk top)","slide-blocks"),value:k?d.navigation.mobileHorizenPos:d.navigation.defaultHorizonPos,max:10,min:-10,step:.5,onChange:e=>t(k?{slideInfo:{...d,navigation:{...d.navigation,mobileHorizenPos:e}}}:{slideInfo:{...d,navigation:{...d.navigation,defaultHorizonPos:e}}}),withInputField:!0}),(0,n.createElement)(_.RangeControl,{label:k?(0,o.__)("Vertical position(mobile)","slide-blocks"):(0,o.__)("Vertical position(desk top)","slide-blocks"),value:k?d.navigation.mobileVertPos:d.navigation.defaultVertPos,max:95,min:5,step:5,onChange:e=>t(k?{slideInfo:{...d,navigation:{...d.navigation,mobileVertPos:e}}}:{slideInfo:{...d,navigation:{...d.navigation,defaultVertPos:e}}}),withInputField:!0}),(0,n.createElement)(_.ToggleControl,{label:(0,o.__)("Hover Appear","slide-blocks"),checked:d.navigation.hoverAppear,onChange:e=>{t({slideInfo:{...d,navigation:{...d.navigation,hoverAppear:e}}})}})),d.navigation.disp&&"default"!=d.navigation.design&&(0,n.createElement)(n.Fragment,null,(0,n.createElement)(g.__experimentalPanelColorGradientSettings,{title:(0,o.__)("Background Color Setting","slide-blocks"),settings:[{colorValue:d.navigation.bgColor,gradientValue:d.navigation.bgGradient,label:(0,o.__)("Choose Background color","slide-blocks"),onColorChange:e=>{A(e)},onGradientChange:e=>{O(e)}}]}),(0,n.createElement)(_.ToggleControl,{label:(0,o.__)("Is Shadow","slide-blocks"),checked:d.navigation.is_shadow,onChange:e=>{t({slideInfo:{...d,navigation:{...d.navigation,is_shadow:e}}})}})),d.navigation.disp&&"default"!=d.navigation.design&&d.navigation.is_shadow&&(0,n.createElement)(m.c,{shadowStyle:{...d.navigation.shadow_element},onChange:(e,l)=>{t({slideInfo:{...d,navigation:{...d.navigation,shadow_element:l,shadow_result:e.style}}})}})),(0,n.createElement)(_.PanelBody,{title:(0,o.__)("Pagenation Setting","slide-blocks"),initialOpen:!1},(0,n.createElement)(_.ToggleControl,{label:(0,o.__)("Display","slide-blocks"),checked:d.pagination.disp,onChange:e=>{t({slideInfo:{...d,pagination:{...d.pagination,disp:e}}})}}),d.pagination.disp&&(0,n.createElement)("div",{className:"itmar_title_type"},(0,n.createElement)(_.RadioControl,{label:(0,o.__)("Design type","slide-blocks"),selected:d.pagination.design,options:[{label:(0,o.__)("Default","slide-blocks"),value:"default"},{label:(0,o.__)("Bar","slide-blocks"),value:"bar"}],onChange:e=>{t({slideInfo:{...d,pagination:{...d.pagination,design:e}}})}}))),(0,n.createElement)(_.PanelBody,{title:(0,o.__)("ScrollBar Setting","slide-blocks"),initialOpen:!1},(0,n.createElement)(_.ToggleControl,{label:(0,o.__)("Display","slide-blocks"),checked:d.scrollbar.disp,onChange:e=>{t({slideInfo:{...d,scrollbar:{...d.scrollbar,disp:e}}})}})))),(0,n.createElement)(g.InspectorControls,{group:"styles"},(0,n.createElement)(_.PanelBody,{title:(0,o.__)("Content Style","slide-blocks"),initialOpen:!0,className:"form_design_ctrl"},(0,n.createElement)(_.RangeControl,{label:k?(0,o.__)("Width settings(mobile)","slide-blocks"):(0,o.__)("Width settings(desk top)","slide-blocks"),value:k?r.width:s.width,max:100,min:30,step:10,onChange:e=>t(k?{mobile_val:{...r,width:e}}:{default_val:{...s,width:e}}),withInputField:!0}),(0,n.createElement)(_.RangeControl,{label:k?(0,o.__)("Height settings(mobile)","slide-blocks"):(0,o.__)("Height settings(desk top)","slide-blocks"),value:k?r.height:s.height,max:100,min:10,step:10,onChange:e=>t(k?{mobile_val:{...r,height:e}}:{default_val:{...s,height:e}}),withInputField:!0}),(0,n.createElement)(_.__experimentalBoxControl,{label:k?(0,o.__)("Padding settings(mobile)","slide-blocks"):(0,o.__)("Padding settings(desk top)","slide-blocks"),values:k?r.padding_content:s.padding_content,onChange:e=>t(k?{mobile_val:{...r,padding_content:e}}:{default_val:{...s,padding_content:e}}),units:x,allowReset:!0,resetValues:k?y:C}),(0,n.createElement)(_.ToggleControl,{label:(0,o.__)("Is Shadow","slide-blocks"),checked:c,onChange:e=>{t({is_shadow:e})}}),c&&(0,n.createElement)(m.c,{shadowStyle:{...w},onChange:(e,l)=>{t({shadow_result:e.style}),t({shadow_element:l})}})),(0,n.createElement)(_.PanelBody,{title:k?(0,o.__)("Position moveable(mobile)","slide-blocks"):(0,o.__)("Position moveable(desk top)","slide-blocks"),initialOpen:!0},(0,n.createElement)(_.ToggleControl,{label:(0,o.__)("make it moveable","slide-blocks"),checked:k?r.is_moveable:s.is_moveable,onChange:e=>{t(k?{mobile_val:{...r,is_moveable:e}}:{default_val:{...s,is_moveable:e}})}}),(k?r.is_moveable:s.is_moveable)&&(0,n.createElement)(h,{attributes:k?r.position:s.position,onPositionChange:e=>t(k?{mobile_val:{...r,position:e}}:{default_val:{...s,position:e}})}))),(0,n.createElement)(g.BlockControls,null,(0,n.createElement)(_.ToolbarDropdownMenu,{label:(0,o.__)("Lateral Position","slide-blocks"),icon:(k?r.lat_pos:s.lat_pos)?P[k?r.lat_pos:s.lat_pos]:P.center,controls:["left","center","right"].map((e=>({icon:P[e],isActive:(k?r.lat_pos:s.lat_pos)===e,onClick:()=>t(k?{mobile_val:{...r,lat_pos:e}}:{default_val:{...s,lat_pos:e}})})))})),(0,n.createElement)(i.e,{attributes:e},(0,n.createElement)("div",{...I},(0,n.createElement)("div",{className:"swiper",ref:F},(0,n.createElement)("div",{...V})),(0,n.createElement)("div",{class:"swiper-button-prev"}),(0,n.createElement)("div",{class:"swiper-button-next"}),(0,n.createElement)("div",{class:"swiper-pagination"}),(0,n.createElement)("div",{class:"swiper-scrollbar"}))))}}}]);