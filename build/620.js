"use strict";(globalThis.webpackChunkslide_blocks=globalThis.webpackChunkslide_blocks||[]).push([[620],{4552:(e,l,t)=>{t.d(l,{_8:()=>s,c5:()=>c,qL:()=>o});var i=t(8496),n=t(948),a=t.n(n);function o(e,l){const[t,n]=(0,i.useState)("");return(0,i.useEffect)((()=>{if(e.current&&l)if(l.backgroundColor&&!l.backgroundColor.startsWith("var(--wp"))n(l.backgroundColor);else if(e.current){const l=getComputedStyle(e.current);n(l.backgroundColor)}}),[l,e]),t}function s(){const[e,l]=(0,i.useState)(!1);return(0,i.useEffect)((()=>{const e=()=>{const e=document.getElementsByName("editor-canvas")[0];e&&e.contentWindow&&l(e.contentWindow.innerWidth<=767)},t=document.getElementsByName("editor-canvas")[0];return t&&t.contentWindow&&t.contentWindow.addEventListener("resize",e),e(),()=>{t&&t.contentWindow&&t.contentWindow.removeEventListener("resize",e)}}),[]),e}function c(e,l){const t=(0,i.useRef)();a()(l,t.current)||(t.current=l),(0,i.useEffect)((()=>e()),[t.current])}},7704:(e,l,t)=>{var i=t(7752);const n={displayedNotices:[],swiperInstances:[]},a=(0,i.createReduxStore)("itmar-custom/store",{reducer(e=n,l){switch(l.type){case"ADD_NOTICE":return{...e,displayedNotices:[...e.displayedNotices,l.noticeId]};case"RESET_NOTICES":return{...e,displayedNotices:[]};case"ADD_SWIPER_INSTANCE":return{...e,swiperInstances:[...e.swiperInstances,l.instance]};case"REMOVE_SWIPER_INSTANCE":return{...e,swiperInstances:e.swiperInstances.filter((e=>e.swiper_id!==l.instanceId))};default:return e}},actions:{addNotice:e=>({type:"ADD_NOTICE",noticeId:e}),resetNotices:()=>({type:"RESET_NOTICES"}),addSwiperInstance:e=>({type:"ADD_SWIPER_INSTANCE",instance:e}),removeSwiperInstance:e=>({type:"REMOVE_SWIPER_INSTANCE",instanceId:e})},selectors:{hasNoticeBeenDisplayed:(e,l)=>e.displayedNotices.includes(l),getSwiperInstances:e=>e.swiperInstances,getSwiperInstanceById:(e,l)=>e.swiperInstances.find((e=>e.swiper_id===l))}});(0,i.register)(a)},4264:(e,l,t)=>{t.d(l,{M:()=>s});var i=t(1280),n=(t(8496),t(4552)),a=t(8392),o=t(2508);function s(e,l){(0,n.c5)((()=>{const t=document.getElementsByName("editor-canvas")[0];if(t){const n=t.contentDocument||t.contentWindow.document,s=new a.W8;(0,o.iC)(s.collectStyles((0,i.createElement)(e,{attributes:l})));const c=s.getStyleTags().replace(/<style[^>]*>|<\/style>/g,""),r=n.createElement("style");return r.innerHTML=c,n.head.appendChild(r),()=>{n.head.removeChild(r)}}}),[l])}},1620:(e,l,t)=>{t.r(l),t.d(l,{default:()=>I});var i=t(1280),n=t(3396),a=t(2008),o=t(4264),s=t(1124),c=t(4552),r=t(9528),d=t(7287),u=t(857),p=t(9819),_=t(8496),f=t(7752),g=(t(7704),t(3424)),m=t(3452),b=t(6728);const v={top:"10px",left:"10px",right:"10px",bottom:"10px"},h={top:"20px",left:"10px",right:"10px",bottom:"20px"},w={top:"0px",left:"0px",right:"0px",bottom:"0px"},E=[{value:"px",label:"px"},{value:"em",label:"em"},{value:"rem",label:"rem"}],C={left:g.c,center:m.c,right:b.c},k={fade_single_view:p.MZ,coverflow:p.sB,coverflow_2:p.sB,cube:p.wZ,flip:p.YR,cards:p.kZ,parallax:p.mw,thumbs:p.Hj},S=(e,l)=>{let t=[];return e.forEach((e=>{e.name===l&&t.push(e),e.innerBlocks&&e.innerBlocks.length&&(t=[...t,...S(e.innerBlocks,l)])})),t};function I({attributes:e,setAttributes:l,clientId:t}){const{swiper_id:g,relate_id:m,is_thumbnail:b,default_val:I,mobile_val:y,radius_slide:x,is_shadow:B,slideInfo:N,parallax_obj:P,shadow_element:D}=e,T=(0,c._8)(),R=(0,_.useRef)(null),A=(0,r.useBlockProps)({ref:R}),F=(0,c.qL)(R,A.style);(0,_.useEffect)((()=>{if(F){l({shadow_element:{...D,baseColor:F}});const e=(0,s.e)({...D,baseColor:F});e&&l({shadow_result:e.style})}}),[F]),(0,o.M)(a.e,e);const V=(0,r.useInnerBlocksProps)({className:"swiper-wrapper"},{template:[["itmar/design-group",{}]],allowedBlocks:["itmar/design-group"],templateLock:!1});(0,_.useEffect)((()=>{"slide_single_view"===N.effect&&null!=P?l({parallax_obj:{type:"horizontal"===N.singleDirection?"x":"y",scale:P.scale,unit:"%"}}):"fade_single_view"===N.effect&&"zoomUp"===N.fadeMotion?l({parallax_obj:{type:"scale",scale:P?.scale,unit:""}}):l({parallax_obj:null})}),[N]);const z=(0,f.useSelect)((e=>e("core/block-editor").getBlocks(t)),[t]),{updateBlockAttributes:M}=(0,f.useDispatch)("core/block-editor");(0,_.useEffect)((()=>{z.forEach((e=>{if("itmar/design-group"===e.name){const l={is_swiper:!0},t=null!=P?{parallax_obj:P}:{parallax_obj:null};M(e.clientId,{...e.attributes,...l,...t})}}))}),[z.length,P,t]);const O=S(z,"core/image");(0,_.useEffect)((()=>{O.forEach((e=>{M(e.clientId,{...e.attributes,className:"itmar_ex_block"})}))}),[z.length,O,t]);const W=(0,f.useSelect)((e=>e("core/block-editor").getBlocks()),[]),{hasNoticeBeenDisplayed:L}=(0,f.useSelect)((e=>({hasNoticeBeenDisplayed:e("itmar-custom/store").hasNoticeBeenDisplayed}))),{createNotice:H}=(0,f.useDispatch)("core/notices"),{addNotice:j,resetNotices:q}=(0,f.useDispatch)("itmar-custom/store"),[Z,$]=(0,_.useState)([]);(0,_.useEffect)((()=>{const e=S(W,"itmar/slide-mv").filter((e=>e.clientId!==t)).map((e=>{const l=e.attributes.swiper_id;return{value:l,label:l}})).filter((e=>null!=e));if($(e),e.some((e=>e.value===g))){const e="duplicate_swiper_id";L(e)||(H("error",(0,n.__)("A block with the same swiper ID exists. Please change your ID.","slide-blocks"),{type:"snackbar"}),j(e))}else q()}),[W]);const G=null!=P?{parallax:!0}:{},U={none:{centeredSlides:N.isActiveCenter,direction:N.singleDirection,speed:N.slideSpeed,slidesPerView:T?N.mobilePerView:N.defaultPerView,spaceBetween:T?N.mobileBetween:N.defaultBetween},slide_single_view:{direction:N.singleDirection,loopAdditionalSlides:1,speed:N.slideSpeed,allowTouchMove:!1,...G},fade_single_view:{speed:N.slideSpeed,effect:"fade",fadeEffect:{crossFade:!0},...G},coverflow:{centeredSlides:!0,slidesPerView:3,spaceBetween:T?N.mobileBetween:N.defaultBetween,effect:"coverflow",coverflowEffect:{rotate:50,depth:100,stretch:T?50:0,modifier:1,scale:.9,slideShadows:!0}},coverflow_2:{speed:500,centeredSlides:!0,slidesPerView:"auto",slideToClickedSlide:!0,effect:"coverflow",coverflowEffect:{rotate:0,slideShadows:!1,stretch:100}},cube:{speed:800,effect:"cube",cubeEffect:{slideShadows:!0,shadow:!0,shadowOffset:40,shadowScale:.94},on:{slideChangeTransitionStart:function(){this.el.classList.remove("scale-in"),this.el.classList.add("scale-out")},slideChangeTransitionEnd:function(){this.el.classList.remove("scale-out"),this.el.classList.add("scale-in")}}},flip:{effect:"flip",flipEffect:{limitRotation:!0,slideShadows:!0}},cards:{effect:"cards",cardsEffect:{perSlideOffset:8,perSlideRotate:2,rotate:!0,slideShadows:!0}}},Y=(0,_.useRef)(null),J=(0,_.useRef)(null),{addSwiperInstance:K,removeSwiperInstance:Q}=(0,f.useDispatch)("itmar-custom/store"),[X,ee]=(0,_.useState)(null);(0,_.useEffect)((()=>{Y.current&&(J.current&&(Y.current.parentElement.querySelectorAll(".swiper-pagination-bullet").forEach((e=>e.remove())),J.current.destroy(!1,!0)),Y.current.querySelectorAll(".swiper-slide").forEach((e=>{const l=e.querySelector("div");l&&l.removeAttribute("style"),e.querySelectorAll('div[class^="swiper-slide-shadow"]').forEach((e=>{e.remove()}))})),Y.current.querySelectorAll('div[class^="swiper-cube-shadow"]').forEach((e=>{e.remove()})),(()=>{const e=Y.current.parentElement;let l=[],t={simulateTouch:!1,loop:N.loop};if(b&&(t={...t,watchSlidesProgress:!0,watchSlidesVisibility:!0}),N.navigation.disp){l=[...l,p._2];const i=e.querySelector(`.${g}-next`),n=e.querySelector(`.${g}-prev`);t.navigation={nextEl:i,prevEl:n}}if(N.pagination.disp){l=[...l,p.eM];const i=e.querySelector(`.${g}-pagination`);t.pagination={el:i}}if(N.scrollbar.disp){l=[...l,p.a1];const i=e.querySelector(`.${g}-scrollbar`);t.scrollbar={el:i}}N.effect&&(k[N.effect]&&(l=[...l,k[N.effect]]),t={...t,...U[N.effect]}),l=[...l,k.parallax,k.thumbs],t.modules=l;const i=new u.c(Y.current,t);J.current=i,ee({instance:i,swiper_id:g,relate_id:m,is_thumbnail:b})})())}),[z.length,N,P,T,g,m,b]),(0,f.useSelect)((e=>{const l=e("itmar-custom/store").getSwiperInstanceById(m);X&&l&&(l.is_thumbnail?(X.instance.thumbs.swiper=l.instance,X.instance.thumbs.init(),X.instance.thumbs.update(!0)):X.is_thumbnail||(X.instance.on("slideChangeTransitionStart",(e=>{l.instance.slideToLoop(e.realIndex,void 0,!1)})),l.instance.on("slideChangeTransitionStart",(e=>{X.instance.slideToLoop(e.realIndex,void 0,!1)}))))}),[X]),(0,_.useEffect)((()=>{if(X)return K(X),()=>{Q(X.swiper_id)}}),[X]);const[le,te]=(0,_.useState)(N.navigation.bgColor),[ie,ne]=(0,_.useState)(N.navigation.bgGradient);return(0,_.useEffect)((()=>{const e=void 0!==le?le:"var(--wp--preset--color--content-back)";l({slideInfo:{...N,navigation:{...N.navigation,bgColor:void 0===le?"":le,bgGradient:ie,shadow_element:{...N.navigation.shadow_element,baseColor:e}}}})}),[le,ie]),(0,i.createElement)(i.Fragment,null,(0,i.createElement)(r.InspectorControls,{group:"settings"},(0,i.createElement)(d.PanelBody,{title:(0,n.__)("Slide Settings","slide-blocks"),initialOpen:!0,className:"form_design_ctrl"},(0,i.createElement)(d.PanelBody,{title:(0,n.__)("Global Setting","slide-blocks"),initialOpen:!1},(0,i.createElement)(d.TextControl,{label:(0,n.__)("Slide ID","slide-blocks"),value:g,onChange:e=>l({swiper_id:e})}),(0,i.createElement)(d.ComboboxControl,{label:(0,n.__)("ID of the associated slider","slide-blocks"),options:Z,value:m,onChange:e=>{l({relate_id:e})}}),(0,i.createElement)(d.ToggleControl,{label:(0,n.__)("Make it a thumbnail slider","slide-blocks"),checked:b,onChange:e=>{l({is_thumbnail:e})}}),b&&(0,i.createElement)(d.PanelBody,{title:(0,n.__)("Active Effect","slide-blocks"),initialOpen:!0},(0,i.createElement)(d.RangeControl,{value:N.activeSlideEffect?.blur,label:(0,n.__)("Blur(px)","slide-blocks"),max:10,min:0,step:1,onChange:e=>{var t;l({slideInfo:{...N,activeSlideEffect:{...null!==(t=N.activeSlideEffect)&&void 0!==t?t:{},blur:e}}})},withInputField:!0}),(0,i.createElement)(d.RangeControl,{value:N.activeSlideEffect?.opacity,label:(0,n.__)("Opacity","slide-blocks"),max:1,min:0,step:.1,onChange:e=>{var t;l({slideInfo:{...N,activeSlideEffect:{...null!==(t=N.activeSlideEffect)&&void 0!==t?t:{},opacity:e}}})},withInputField:!0}),(0,i.createElement)(d.RangeControl,{value:N.activeSlideEffect?.zoom,label:(0,n.__)("Zoom","slide-blocks"),max:3,min:1,step:.1,onChange:e=>{var t;l({slideInfo:{...N,activeSlideEffect:{...null!==(t=N.activeSlideEffect)&&void 0!==t?t:{},zoom:e}}})},withInputField:!0}),(0,i.createElement)(d.ComboboxControl,{label:(0,n.__)("Image Blend Mode","slide-blocks"),options:[{value:"nomal",label:"Nomal"},{value:"hard-light",label:"Hard Light"},{value:"difference",label:"Difference"}],value:N.activeSlideEffect?.blend,onChange:e=>{var t;l({slideInfo:{...N,activeSlideEffect:{...null!==(t=N.activeSlideEffect)&&void 0!==t?t:{},blend:e}}})}}),(0,i.createElement)(d.__experimentalBorderBoxControl,{label:(0,n.__)("Borders","slide-blocks"),onChange:e=>{var t;l({slideInfo:{...N,activeSlideEffect:{...null!==(t=N.activeSlideEffect)&&void 0!==t?t:{},border:e}}})},value:N.activeSlideEffect?.border,allowReset:!0,resetValues:w})),(0,i.createElement)(d.ToggleControl,{label:(0,n.__)("Loop","slide-blocks"),checked:N.loop,onChange:e=>{l({slideInfo:{...N,loop:e}})}}),(0,i.createElement)(d.ToggleControl,{label:(0,n.__)("Is AutoPlay","slide-blocks"),checked:N.is_autoplay,onChange:e=>{l({slideInfo:{...N,is_autoplay:e}})}}),N.is_autoplay&&(0,i.createElement)(d.RangeControl,{value:N.autoplay,label:(0,n.__)("Autoplay","slide-blocks"),max:1e4,min:0,step:500,onChange:e=>{l({slideInfo:{...N,autoplay:e}})},withInputField:!0,help:(0,n.__)("It will automatically slide at the interval you entered. If set to 0, it will slide smoothly non-stop.","slide-blocks")}),(0,i.createElement)("div",{className:"itmar_title_type"},(0,i.createElement)(d.RadioControl,{label:(0,n.__)("Effect Type","slide-blocks"),selected:N.effect,options:[{label:(0,n.__)("None","slide-blocks"),value:"none"},{label:(0,n.__)("Slide Single","slide-blocks"),value:"slide_single_view"},{label:(0,n.__)("Fade Single","slide-blocks"),value:"fade_single_view"},{label:(0,n.__)("Coverflow 1","slide-blocks"),value:"coverflow"},{label:(0,n.__)("Coverflow 2","slide-blocks"),value:"coverflow_2"},{label:(0,n.__)("Cube","slide-blocks"),value:"cube"},{label:(0,n.__)("Flip","slide-blocks"),value:"flip"},{label:(0,n.__)("Cards","slide-blocks"),value:"cards"}],onChange:e=>{l({slideInfo:{...N,effect:e}})}})),("none"===N.effect||"coverflow_2"===N.effect)&&(0,i.createElement)(d.RangeControl,{label:T?(0,n.__)("SlidesPerView(mobile)","slide-blocks"):(0,n.__)("SlidesPerView(desk top)","slide-blocks"),value:T?N.mobilePerView:N.defaultPerView,max:20,min:1,step:.1,onChange:e=>l(T?{slideInfo:{...N,mobilePerView:e}}:{slideInfo:{...N,defaultPerView:e}}),withInputField:!0}),("none"===N.effect||"coverflow"===N.effect||"coverflow_2"===N.effect)&&(0,i.createElement)(d.RangeControl,{label:T?(0,n.__)("Slide Space Between(mobile)","slide-blocks"):(0,n.__)("Slide Space Between(desk top)","slide-blocks"),value:T?N.mobileBetween:N.defaultBetween,max:200,min:0,step:5,onChange:e=>l(T?{slideInfo:{...N,mobileBetween:e}}:{slideInfo:{...N,defaultBetween:e}}),withInputField:!0}),"none"===N.effect&&(0,i.createElement)(d.ToggleControl,{label:(0,n.__)("Active Slide Center","slide-blocks"),checked:N.isActiveCenter,onChange:e=>{l({slideInfo:{...N,isActiveCenter:e}})}}),("none"===N.effect||"slide_single_view"===N.effect)&&(0,i.createElement)(i.Fragment,null,(0,i.createElement)("div",{className:"itmar_title_type"},(0,i.createElement)(d.RadioControl,{label:(0,n.__)("Slide Direction","slide-blocks"),selected:N.singleDirection,options:[{label:(0,n.__)("Horizontal","slide-blocks"),value:"horizontal"},{label:(0,n.__)("Vertical","slide-blocks"),value:"vertical"}],onChange:e=>{l({slideInfo:{...N,singleDirection:e}})}})),(0,i.createElement)(d.ToggleControl,{label:(0,n.__)("Parallax Slide","slide-blocks"),checked:null!=P,onChange:e=>{l(e?{parallax_obj:{type:"horizontal"===N.singleDirection?"x":"y",scale:50,unit:"%"}}:{parallax_obj:null})}})),"slide_single_view"===N.effect&&null!=P&&(0,i.createElement)(i.Fragment,null,(0,i.createElement)(d.RangeControl,{label:(0,n.__)("Parallax Area(%)","slide-blocks"),value:P?.scale?P.scale:0,max:100,min:0,step:10,onChange:e=>l({parallax_obj:{type:"horizontal"===N.singleDirection?"x":"y",scale:e,unit:"%"}}),withInputField:!0})),"fade_single_view"===N.effect&&(0,i.createElement)(i.Fragment,null,(0,i.createElement)("div",{className:"itmar_title_type"},(0,i.createElement)(d.RadioControl,{label:(0,n.__)("Fade Motion","slide-blocks"),selected:N.fadeMotion,options:[{label:(0,n.__)("None","slide-blocks"),value:"none"},{label:(0,n.__)("Zoom Up","slide-blocks"),value:"zoomUp"}],onChange:e=>{l({slideInfo:{...N,fadeMotion:e}})}}))),"fade_single_view"===N.effect&&"zoomUp"===N.fadeMotion&&(0,i.createElement)(i.Fragment,null,(0,i.createElement)(d.RangeControl,{label:(0,n.__)("Zoom Scale","slide-blocks"),value:P?.scale?P.scale:1,max:3,min:1,step:.1,onChange:e=>l({parallax_obj:{type:"scale",scale:e,unit:""}}),withInputField:!0})),("none"===N.effect||"slide_single_view"===N.effect||"fade_single_view"===N.effect)&&(0,i.createElement)(i.Fragment,null,(0,i.createElement)(d.RangeControl,{label:(0,n.__)("Speed","slide-blocks"),value:N.slideSpeed,max:1e4,min:0,step:100,onChange:e=>l({slideInfo:{...N,slideSpeed:e}}),withInputField:!0})),"cube"===N.effect&&(0,i.createElement)(d.ToggleControl,{label:(0,n.__)("Zoom Up","slide-blocks"),checked:N.cubeZoom,onChange:e=>{l({slideInfo:{...N,cubeZoom:e}})}})),(0,i.createElement)(d.PanelBody,{title:(0,n.__)("Navigation Setting","slide-blocks"),initialOpen:!1},(0,i.createElement)(d.ToggleControl,{label:(0,n.__)("Display","slide-blocks"),checked:N.navigation.disp,onChange:e=>{l({slideInfo:{...N,navigation:{...N.navigation,disp:e}}})}}),N.navigation.disp&&(0,i.createElement)(i.Fragment,null,(0,i.createElement)("div",{className:"itmar_title_type"},(0,i.createElement)(d.RadioControl,{label:(0,n.__)("Display Design","slide-blocks"),selected:N.navigation.design,options:[{label:(0,n.__)("Default","slide-blocks"),value:"default"},{label:(0,n.__)("Circle","slide-blocks"),value:"circle"}],onChange:e=>{l({slideInfo:{...N,navigation:{...N.navigation,design:e}}})}})),(0,i.createElement)(d.RangeControl,{label:T?(0,n.__)("Horizen position(mobile)","slide-blocks"):(0,n.__)("Horizen position(desk top)","slide-blocks"),value:T?N.navigation.mobileHorizenPos:N.navigation.defaultHorizonPos,max:10,min:-10,step:.5,onChange:e=>l(T?{slideInfo:{...N,navigation:{...N.navigation,mobileHorizenPos:e}}}:{slideInfo:{...N,navigation:{...N.navigation,defaultHorizonPos:e}}}),withInputField:!0}),(0,i.createElement)(d.RangeControl,{label:T?(0,n.__)("Vertical position(mobile)","slide-blocks"):(0,n.__)("Vertical position(desk top)","slide-blocks"),value:T?N.navigation.mobileVertPos:N.navigation.defaultVertPos,max:95,min:5,step:5,onChange:e=>l(T?{slideInfo:{...N,navigation:{...N.navigation,mobileVertPos:e}}}:{slideInfo:{...N,navigation:{...N.navigation,defaultVertPos:e}}}),withInputField:!0}),(0,i.createElement)(d.ToggleControl,{label:(0,n.__)("Hover Appear","slide-blocks"),checked:N.navigation.hoverAppear,onChange:e=>{l({slideInfo:{...N,navigation:{...N.navigation,hoverAppear:e}}})}})),N.navigation.disp&&"default"!=N.navigation.design&&(0,i.createElement)(i.Fragment,null,(0,i.createElement)(r.__experimentalPanelColorGradientSettings,{title:(0,n.__)("Background Color Setting","slide-blocks"),settings:[{colorValue:N.navigation.bgColor,gradientValue:N.navigation.bgGradient,label:(0,n.__)("Choose Background color","slide-blocks"),onColorChange:e=>{te(e)},onGradientChange:e=>{ne(e)}}]}),(0,i.createElement)(d.ToggleControl,{label:(0,n.__)("Is Shadow","slide-blocks"),checked:N.navigation.is_shadow,onChange:e=>{l({slideInfo:{...N,navigation:{...N.navigation,is_shadow:e}}})}})),N.navigation.disp&&"default"!=N.navigation.design&&N.navigation.is_shadow&&(0,i.createElement)(s.c,{shadowStyle:{...N.navigation.shadow_element},onChange:(e,t)=>{l({slideInfo:{...N,navigation:{...N.navigation,shadow_element:t,shadow_result:e.style}}})}})),(0,i.createElement)(d.PanelBody,{title:(0,n.__)("Pagenation Setting","slide-blocks"),initialOpen:!1},(0,i.createElement)(d.ToggleControl,{label:(0,n.__)("Display","slide-blocks"),checked:N.pagination.disp,onChange:e=>{l({slideInfo:{...N,pagination:{...N.pagination,disp:e}}})}}),N.pagination.disp&&(0,i.createElement)("div",{className:"itmar_title_type"},(0,i.createElement)(d.RadioControl,{label:(0,n.__)("Design type","slide-blocks"),selected:N.pagination.design,options:[{label:(0,n.__)("Default","slide-blocks"),value:"default"},{label:(0,n.__)("Bar","slide-blocks"),value:"bar"}],onChange:e=>{l({slideInfo:{...N,pagination:{...N.pagination,design:e}}})}}))),(0,i.createElement)(d.PanelBody,{title:(0,n.__)("ScrollBar Setting","slide-blocks"),initialOpen:!1},(0,i.createElement)(d.ToggleControl,{label:(0,n.__)("Display","slide-blocks"),checked:N.scrollbar.disp,onChange:e=>{l({slideInfo:{...N,scrollbar:{...N.scrollbar,disp:e}}})}})))),(0,i.createElement)(r.InspectorControls,{group:"styles"},(0,i.createElement)(d.PanelBody,{title:(0,n.__)("Content Style","slide-blocks"),initialOpen:!0,className:"form_design_ctrl"},(0,i.createElement)(d.RangeControl,{label:T?(0,n.__)("Width settings(vw)(mobile)","slide-blocks"):(0,n.__)("Width settings(vw)(desk top)","slide-blocks"),value:T?y.width:I.width,max:100,min:30,step:1,onChange:e=>l(T?{mobile_val:{...y,width:e}}:{default_val:{...I,width:e}}),withInputField:!0}),(0,i.createElement)(d.RangeControl,{label:T?(0,n.__)("Height settings(vh)(mobile)","slide-blocks"):(0,n.__)("Height settings(vh)(desk top)","slide-blocks"),value:T?y.height:I.height,max:100,min:10,step:1,onChange:e=>l(T?{mobile_val:{...y,height:e}}:{default_val:{...I,height:e}}),withInputField:!0}),(0,i.createElement)(d.__experimentalBoxControl,{label:T?(0,n.__)("Padding settings(mobile)","slide-blocks"):(0,n.__)("Padding settings(desk top)","slide-blocks"),values:T?y.padding_content:I.padding_content,onChange:e=>l(T?{mobile_val:{...y,padding_content:e}}:{default_val:{...I,padding_content:e}}),units:E,allowReset:!0,resetValues:T?h:v}),(0,i.createElement)(r.__experimentalBorderRadiusControl,{values:x,onChange:e=>l({radius_slide:"string"==typeof e?{value:e}:e})}),(0,i.createElement)(d.ToggleControl,{label:(0,n.__)("Is Shadow","slide-blocks"),checked:B,onChange:e=>{l({is_shadow:e})}}),B&&(0,i.createElement)(s.c,{shadowStyle:{...D},onChange:(e,t)=>{l({shadow_result:e.style}),l({shadow_element:t})}}))),(0,i.createElement)(r.BlockControls,null,(0,i.createElement)(d.ToolbarDropdownMenu,{label:(0,n.__)("Lateral Position","slide-blocks"),icon:(T?y.lat_pos:I.lat_pos)?C[T?y.lat_pos:I.lat_pos]:C.center,controls:["left","center","right"].map((e=>({icon:C[e],isActive:(T?y.lat_pos:I.lat_pos)===e,onClick:()=>l(T?{mobile_val:{...y,lat_pos:e}}:{default_val:{...I,lat_pos:e}})})))})),(0,i.createElement)(a.e,{attributes:e,isFront:!1},(0,i.createElement)("div",{...A},(0,i.createElement)("div",{className:"swiper",ref:Y},(0,i.createElement)("div",{...V})),(0,i.createElement)("div",{class:`swiper-button-prev ${g}-prev`}),(0,i.createElement)("div",{class:`swiper-button-next ${g}-next`}),(0,i.createElement)("div",{class:`swiper-pagination ${g}-pagination`}),(0,i.createElement)("div",{class:`swiper-scrollbar ${g}-scrollbar`}))))}}}]);
//# sourceMappingURL=620.js.map