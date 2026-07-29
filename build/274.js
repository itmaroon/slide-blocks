"use strict";(globalThis.webpackChunkslide_blocks=globalThis.webpackChunkslide_blocks||[]).push([[274],{1824(e,i,t){var a=t(7143);const l={displayedNotices:[],swiperInstances:[]},o=(0,a.createReduxStore)("itmar-custom/store",{reducer(e=l,i){switch(i.type){case"ADD_NOTICE":return{...e,displayedNotices:[...e.displayedNotices,i.noticeId]};case"RESET_NOTICES":return{...e,displayedNotices:[]};case"ADD_SWIPER_INSTANCE":return{...e,swiperInstances:[...e.swiperInstances,i.instance]};case"REMOVE_SWIPER_INSTANCE":return{...e,swiperInstances:e.swiperInstances.filter(e=>e.swiper_id!==i.instanceId)};default:return e}},actions:{addNotice:e=>({type:"ADD_NOTICE",noticeId:e}),resetNotices:()=>({type:"RESET_NOTICES"}),addSwiperInstance:e=>({type:"ADD_SWIPER_INSTANCE",instance:e}),removeSwiperInstance:e=>({type:"REMOVE_SWIPER_INSTANCE",instanceId:e})},selectors:{hasNoticeBeenDisplayed:(e,i)=>e.displayedNotices.includes(i),getSwiperInstances:e=>e.swiperInstances,getSwiperInstanceById:(e,i)=>e.swiperInstances.find(e=>e.swiper_id===i)}});(0,a.register)(o)},2792(e,i,t){var a=t(9716),l=t(6435),o=t(9435),n=t(7224),s=t(790);const r=a.Ay.div`
	${({$attr:e})=>{const{is_thumbnail:i,default_val:t,mobile_val:s,radius_slide:r,shadow_result:d,slideInfo:c,is_shadow:p}=e,u=(0,l.fS)(t.padding_content),f=(0,l.fS)(s.padding_content),g=(0,l.ac)(t.lat_pos),b=(0,l.ac)(s.lat_pos),h=(0,l.dy)(t.width_val,t.free_width),m=(0,l.dy)(s.width_val,s.free_width),_=(0,l.a6)(t.width_val,t.free_width),v=(0,l.a6)(s.width_val,s.free_width),w=(0,l.wt)(t.height_val,t.free_height),x=(0,l.wt)(s.height_val,s.free_height),k=(0,l.tk)(r),S=p&&d?(0,l.xm)(d):"",y=c.navigation.is_shadow&&c.navigation.shadow_result?(0,l.xm)(c.navigation.shadow_result):"";let C="";if(c.navigation.is_shadow&&c.navigation.shadow_result){const e=(0,o.b)({...c.navigation.shadow_element,embos:"dent"});C=(0,l.xm)(e.style)}const I=t.is_moveable?`transform: translate(${t.position?.x||0}, ${t.position?.y||0});`:"transform: none;",$=s.is_moveable?`transform: translate(${s.position?.x||0}, ${s.position?.y||0});`:"transform: none;",j=a.AH`
			.swiper-button-prev,
			.swiper-button-next,
			[class^="swiper-button-"] {
				position: absolute;
				z-index: 10;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-top: 0;
				cursor: pointer;
			}
			.swiper-button-prev::after,
			.swiper-button-next::after,
			[class^="swiper-button-"]::after {
				line-height: 1;
			}
			.swiper-button-prev {
				left: 0;
				right: auto;
			}
			.swiper-button-next {
				right: 0;
				left: auto;
			}
		`,A=a.AH`
			.swiper-button-prev,
			.swiper-button-next,
			[class^="swiper-button-"] {
				opacity: 0;
				visibility: hidden;
				transition: all 0.3s ease;
			}
			.swiper-button-prev {
				transform: translateX(
					calc(${c.navigation.defaultHorizonPos}em + 50px)
				);
				@media (max-width: 767px) {
					transform: translateX(
						calc(${c.navigation.mobileHorizenPos}em + 30px)
					);
				}
			}
			.swiper-button-next {
				transform: translateX(
					calc(${-1*c.navigation.defaultHorizonPos}em - 50px)
				);
				@media (max-width: 767px) {
					transform: translateX(
						calc(${-1*c.navigation.mobileHorizenPos}em - 30px)
					);
				}
			}
			&:hover {
				.swiper-button-prev,
				.swiper-button-next,
				[class^="swiper-button-"] {
					opacity: 1;
					visibility: visible;
				}
				.swiper-button-prev {
					transform: translateX(${c.navigation.defaultHorizonPos}em);
					@media (max-width: 767px) {
						transform: translateX(${c.navigation.mobileHorizenPos}em);
					}
				}
				.swiper-button-next {
					transform: translateX(
						${-1*c.navigation.defaultHorizonPos}em
					);
					@media (max-width: 767px) {
						transform: translateX(
							${-1*c.navigation.mobileHorizenPos}em
						);
					}
				}
			}
		`,E={hide:a.AH`
			.swiper-button-prev,
			.swiper-button-next,
			[class^="swiper-button-"] {
				display: none;
			}
		`,default:a.AH`
			.swiper-button-prev,
			.swiper-button-next,
			[class^="swiper-button-"] {
				top: ${c.navigation.defaultVertPos}%;
				width: ${c.navigation.defaultSize};
				height: ${c.navigation.defaultSize};
				color: var(--wp--preset--color--accent-1);
				&::after {
					font-size: ${c.navigation.defaultSize};
				}
				@media (max-width: 767px) {
					top: ${c.navigation.mobileVertPos}%;
					width: ${c.navigation.mobileSize};
					height: ${c.navigation.mobileSize};
					&::after {
						font-size: ${c.navigation.mobileSize};
					}
				}
			}
			.swiper-button-prev {
				transform: translateX(${c.navigation.defaultHorizonPos}em);
				@media (max-width: 767px) {
					transform: translateX(${c.navigation.mobileHorizenPos}em);
				}
			}
			.swiper-button-next {
				transform: translateX(${-1*c.navigation.defaultHorizonPos}em);
				@media (max-width: 767px) {
					transform: translateX(
						${-1*c.navigation.mobileHorizenPos}em
					);
				}
			}
		`,circle:a.AH`
			.swiper-button-prev,
			.swiper-button-next,
			[class^="swiper-button-"] {
				top: ${c.navigation.defaultVertPos}%;
				width: ${c.navigation.defaultSize};
				height: ${c.navigation.defaultSize};
				border-radius: 50%;
				background-color: ${c.navigation.bgColor||c.navigation.bgGradient};
				${y};
				transition: box-shadow ease-in-out 0.5s;
				&:hover {
					cursor: pointer;
					${C};
				}
				@media (max-width: 767px) {
					top: ${c.navigation.mobileVertPos}%;
					width: ${c.navigation.mobileSize};
					height: ${c.navigation.mobileSize};
				}
			}
			.swiper-button-prev {
				${(0,n.i)({direction:"left"})}
				transform: translateX(${c.navigation.defaultHorizonPos}em);
				@media (max-width: 767px) {
					transform: translateX(${c.navigation.mobileHorizenPos}em);
				}
			}
			.swiper-button-next {
				${(0,n.i)({direction:"right"})}
				transform: translateX(${-1*c.navigation.defaultHorizonPos}em);
				@media (max-width: 767px) {
					transform: translateX(
						${-1*c.navigation.mobileHorizenPos}em
					);
				}
			}
		`}[c.navigation.disp?c.navigation.design:"hide"],P={default:a.AH`
			.swiper-pagination-bullet {
				background-color: var(--wp--preset--color--accent-2);
				&.swiper-pagination-bullet-active {
					background-color: var(--wp--preset--color--accent-1);
				}
			}
		`,bar:a.AH`
			.swiper-pagination-bullet {
				width: 1.6em;
				height: 3px;
				vertical-align: top;
				border-radius: 0;
				opacity: 1;
				transition: all 0.8s ease 0s;
				background-color: var(--wp--preset--color--accent-2);
				&.swiper-pagination-bullet-active {
					width: 4rem;
					background-color: var(--wp--preset--color--accent-1);
				}
			}
		`}[c.pagination.design||null],z=a.AH`
			margin: 0 auto;
			transition:
				opacity 0.6s ease,
				transform 0.3s ease;
			&.scale-out {
				transform: scale(0.7);
			}
			&.scale-in {
				transform: scale(1);
			}
		`,N=a.AH`
			position: relative;
			margin-block-start: 0;
			${h}
			${_}
			${w}
			${I};
			${g};
			@media (max-width: 767px) {
				${m}
				${v}
				${x}
				${$};
				${b};
			}
			> div {
				width: 100%;
				height: 100%;
				box-sizing: border-box;
				${S};
				padding: ${u};
				@media (max-width: 767px) {
					padding: ${f};
				}
				${j}
				${P}
				${E}
				${c.navigation.hoverAppear?A:null}
				.swiper {
					border-radius: ${k};
					${c.cubeZoom?z:null}
				}
				.swiper-wrapper > :not(.swiper-slide) {
					display: none !important;
				}
			}
		`,B="cube"===c.effect?a.AH`
						> div .swiper.swiper-cube {
							overflow: clip;
						}
						> div .swiper.swiper-cube .swiper-slide {
							display: flex;
							align-items: center;
							width: 100%;
							height: 100%;
							overflow: hidden;
							background-color: var(--wp--preset--color--content-back, #fff);
						}
						> div
							.swiper.swiper-cube
							.swiper-slide:not(.swiper-slide-active):not(
								.swiper-slide-prev
							):not(.swiper-slide-next) {
							opacity: 0 !important;
							pointer-events: none !important;
						}
						> div .swiper.swiper-cube .swiper-slide > .itmar-wrap,
						> div
							.swiper.swiper-cube
							.swiper-slide
							> div:has(> .wp-block-itmar-design-group) {
							width: 100%;
							height: auto;
						}
						> div
							.swiper.swiper-cube
							.swiper-slide
							> .itmar-wrap
							> .wp-block-itmar-design-group {
							width: 100%;
						}
				  `:null,D=a.AH`
			> div {
				.swiper {
					.swiper-wrapper {
						position: absolute;
						top: 20%;
					}

					.swiper-slide {
						width: 30%;
						margin-right: 10px;
						height: 200px;
						position: relative;
						box-shadow: 0 2px 10px 0px #e9e4e4;
						transition: all 1s ease 0s;
						filter: blur(5px);
						.group_contents {
							width: 100%;
							position: absolute;
						}
						&.swiper-slide-active {
							overflow: visible;
							height: fit-content;
							filter: blur(0);
							.wp-block-itmar-design-group {
								width: 140%;
								height: ${t.height};
								position: absolute;
								left: 50%;
								transform: translateX(-50%);
								@media (max-width: 767px) {
									height: ${s.height};
								}
							}
						}
					}
				}
			}
		`,H=a.AH`
			&::after {
				content: "";
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				${(0,l.gA)(c.activeSlideEffect?.border)};
			}
		`,R=a.AH`
			> div {
				.swiper-slide {
					&.swiper-slide-thumb-active {
						${H}
						.group_contents {
							figure {
								transition: all 0.3s ease 0s;
								filter: blur(${c.activeSlideEffect?.blur}px);
								opacity: ${c.activeSlideEffect?.opacity};
								transform: scale(${c.activeSlideEffect?.zoom});
							}
							. img {
								mix-blend-mode: ${c.activeSlideEffect?.blend};
							}
						}
					}
				}
			}
		`,T=a.AH`
			> div {
				.swiper-wrapper {
					transition-timing-function: linear;
				}
			}
		`,F={coverflow_2:D}["fade_single_view"===c.effect?`${c.effect}_${c.fadeMotion}`:c.effect]||null,V=i?R:null,O=c.is_autoplay&&0===c.autoplay?T:null;return a.AH`
			${N}
			${B}
			${F}
			${V}
			${O}
		`}}
`;t.d(i,["B",0,({attributes:e,children:i})=>(0,s.jsx)(r,{$attr:e,children:i})])},510(e,i,t){const a=new WeakSet,l=e=>{e&&!e.destroyed&&"cube"===e.params.effect&&(e.el.classList.remove("scale-in"),e.el.classList.add("scale-out"))},o=e=>{e&&!e.destroyed&&"cube"===e.params.effect&&(e.el.classList.remove("scale-out"),e.el.classList.add("scale-in"))},n=e=>{((e,i)=>{if(!e||e.destroyed||"cube"!==e.params.effect)return!1;const t=Math.max(0,Math.min(Number(i)||0,e.slides.length-1)),a=e.slides?.[t],l=a?.querySelector("img, video");if(!l)return!1;const o=(e=>{const i=Number(e.getAttribute("width")),t=Number(e.getAttribute("height")),a="VIDEO"===e.tagName?e.videoWidth:e.naturalWidth,l="VIDEO"===e.tagName?e.videoHeight:e.naturalHeight,o=i||a,n=t||l;return o<=0||n<=0?null:n/o})(l);if(!o)return!1;const n=o>1,s=window.matchMedia("(min-width: 768px)").matches?"55%":"90%",r=n?s:"100%",d=e.el.style.width!==r;e.el.style.width=r,e.el.classList.toggle("itmar-cube-portrait",n);const c=e.el.clientWidth;if(c<=0)return!1;const p=`${Math.round(c*o)}px`,u=e.el.style.height!==p;u&&(e.el.style.height=p)})(e,e.activeIndex)};t.d(i,["O",0,n,"Rk",0,e=>{!e||e.destroyed||"cube"!==e.params.effect||a.has(e)||(e.on("sliderFirstMove",()=>l(e)),e.on("transitionStart",()=>l(e)),e.on("touchEnd",()=>o(e)),e.on("transitionEnd",()=>o(e)),e.on("beforeDestroy",()=>{e.el.classList.remove("scale-out","scale-in")}),o(e),a.add(e))},"_O",0,e=>{e.el.querySelectorAll("img, video").forEach(i=>{const t="VIDEO"===i.tagName;(t?i.readyState>=1:i.complete)||i.addEventListener(t?"loadedmetadata":"load",()=>n(e),{once:!0})})},"sZ",0,e=>{e.style.removeProperty("width"),e.style.removeProperty("height"),e.classList.remove("itmar-cube-portrait","scale-out","scale-in")}])},5274(e,i,t){t.r(i),t.d(i,{default:()=>R});var a=t(7723),l=t(2792),o=t(1451),n=t(9435),s=t(9820),r=t(4715),d=t(6427),c=t(402),p=t(6546),u=t(3412),f=t(6374),g=t(9821),b=t(8827),h=t(3850),m=t(9307),_=t(9189),v=t(3717),w=t(6789),x=t(6087),k=t(9491),S=t(9716),y=t(7143),C=(t(4997),t(1824),t(1482)),I=t(4418),$=t(3373),j=t(510),A=t(790);const E={top:"10px",left:"10px",right:"10px",bottom:"10px"},P={top:"20px",left:"10px",right:"10px",bottom:"20px"},z={top:"0px",left:"0px",right:"0px",bottom:"0px"},N=[{value:"px",label:"px"},{value:"em",label:"em"},{value:"rem",label:"rem"}],B={left:C.A,center:I.A,right:$.A},D={fade_single_view:h.A,coverflow:v.A,coverflow_2:v.A,cube:m.A,flip:_.A,cards:w.A,parallax:g.A,thumbs:b.A},H=(e,i)=>{let t=[];return e.forEach(e=>{e.name===i&&t.push(e),e.innerBlocks&&e.innerBlocks.length&&(t=[...t,...H(e.innerBlocks,i)])}),t};function R({attributes:e,setAttributes:i,clientId:t}){const{swiper_id:g,relate_id:b,is_thumbnail:h,default_val:m,mobile_val:_,radius_slide:v,is_shadow:w,slideInfo:C,parallax_obj:I,shadow_element:$}=e,R=(0,o.yJ)();(0,o.cy)(t,["itmar/pickup-posts"]);const{updateBlockAttributes:T}=(0,y.useDispatch)("core/block-editor"),F=(0,x.useRef)(null),[V,O]=(0,x.useState)(null),M=(0,x.useCallback)(e=>{O(e?.ownerDocument.head??null)},[]),q=(0,k.useMergeRefs)([F,M]),X=(0,r.useBlockProps)({ref:q}),L=(0,o.pL)(F,X.style);(0,x.useEffect)(()=>{if(L){i({shadow_element:{...$,baseColor:L}});const e=(0,n.b)({...$,baseColor:L});e&&i({shadow_result:e.style})}},[L]);const W=(0,r.useInnerBlocksProps)({className:"swiper-wrapper"},{template:[["itmar/design-group",{}]],allowedBlocks:["itmar/design-group","itmar/pickup-posts"],templateLock:!1});(0,x.useEffect)(()=>{"slide_single_view"===C.effect&&null!=I?i({parallax_obj:{type:"horizontal"===C.singleDirection?"x":"y",scale:I.scale,unit:"%"}}):"fade_single_view"===C.effect&&"zoomUp"===C.fadeMotion?i({parallax_obj:{type:"scale",scale:I?.scale,unit:""}}):i({parallax_obj:null})},[C]);const Z=(0,y.useSelect)(e=>e("core/block-editor").getBlocks(t),[t]);(0,x.useEffect)(()=>{Z.forEach(e=>{if("itmar/design-group"===e.name){const i={is_swiper:!0},t=null!=I?{parallax_obj:I}:{parallax_obj:null};T(e.clientId,{...e.attributes,...i,...t})}})},[Z,I,t]);const G=H(Z,"core/image");(0,x.useEffect)(()=>{G.forEach(e=>{e.attributes.className?.includes("itmar_ex_block")||T(e.clientId,{...e.attributes,className:`itmar_ex_block ${e.attributes.className?e.attributes.className:""}`})})},[Z.length,G,t]);const U=(0,y.useSelect)(e=>e("core/block-editor").getBlocks(),[]),{hasNoticeBeenDisplayed:J}=(0,y.useSelect)(e=>({hasNoticeBeenDisplayed:e("itmar-custom/store").hasNoticeBeenDisplayed})),{createNotice:K}=(0,y.useDispatch)("core/notices"),{addNotice:Q,resetNotices:Y}=(0,y.useDispatch)("itmar-custom/store"),[ee,ie]=(0,x.useState)([]);(0,x.useEffect)(()=>{const e=H(U,"itmar/slide-mv").filter(e=>e.clientId!==t).map(e=>{const i=e.attributes.swiper_id;return{value:i,label:i}}).filter(e=>null!=e);if(ie(e),e.some(e=>e.value===g)){const e="duplicate_swiper_id";J(e)||(K("error",(0,a.__)("A block with the same swiper ID exists. Please change your ID.","slide-blocks"),{type:"snackbar"}),Q(e))}else Y()},[U]);const te=null!=I?{parallax:!0}:{},ae={none:{centeredSlides:C.isActiveCenter,direction:C.singleDirection,speed:C.slideSpeed,slidesPerView:R?C.mobilePerView:C.defaultPerView,spaceBetween:R?C.mobileBetween:C.defaultBetween},slide_single_view:{direction:C.singleDirection,loopAdditionalSlides:1,speed:C.slideSpeed,allowTouchMove:!1,...te},fade_single_view:{speed:C.slideSpeed,effect:"fade",fadeEffect:{crossFade:!0},...te},coverflow:{centeredSlides:!0,slidesPerView:3,spaceBetween:R?C.mobileBetween:C.defaultBetween,effect:"coverflow",coverflowEffect:{rotate:50,depth:100,stretch:0,modifier:1,scale:.9,slideShadows:!0}},coverflow_2:{speed:500,centeredSlides:!0,slidesPerView:"auto",slideToClickedSlide:!0,effect:"coverflow",coverflowEffect:{rotate:0,slideShadows:!1,stretch:100}},cube:{speed:800,effect:"cube",autoHeight:!1,cubeEffect:{slideShadows:!0,shadow:!0,shadowOffset:40,shadowScale:.94},on:{init:function(){(0,j._O)(this),(0,j.Rk)(this),window.requestAnimationFrame(()=>(0,j.O)(this))},resize:function(){this.animating||window.requestAnimationFrame(()=>(0,j.O)(this))},slideChange:function(){(0,j.O)(this)}}},flip:{effect:"flip",flipEffect:{limitRotation:!0,slideShadows:!0}},cards:{effect:"cards",cardsEffect:{perSlideOffset:8,perSlideRotate:2,rotate:!0,slideShadows:!0}}},le=(0,x.useRef)(null),oe=(0,x.useRef)(null),{addSwiperInstance:ne,removeSwiperInstance:se}=(0,y.useDispatch)("itmar-custom/store"),[re,de]=(0,x.useState)(null);(0,x.useEffect)(()=>{if(!le.current)return;let e=!1,i=null,t=null,a=null,l=null;return i=window.setTimeout(()=>{le.current&&(oe.current&&((le.current.parentElement?.querySelectorAll(".swiper-pagination-bullet")||[]).forEach(e=>e.remove()),oe.current.destroy(!1,!0),oe.current=null),(0,j.sZ)(le.current),le.current.querySelectorAll(".swiper-slide").forEach(e=>{const i=e.querySelector("div");i&&i.removeAttribute("style"),e.querySelectorAll('div[class^="swiper-slide-shadow"]').forEach(e=>{e.remove()})}),le.current.querySelectorAll('div[class^="swiper-cube-shadow"]').forEach(e=>{e.remove()})),t=window.requestAnimationFrame(()=>{a=window.requestAnimationFrame(()=>{if(e||!le.current)return;const i=(()=>{if(!le.current)return null;const e=le.current.parentElement;if(!e)return null;let i=[],t={simulateTouch:!1,loop:C.loop};if(h&&(t={...t,watchSlidesProgress:!0,watchSlidesVisibility:!0}),C.navigation.disp){i=[...i,p.A];const a=e.querySelector(`.${g}-next`),l=e.querySelector(`.${g}-prev`);t.navigation={nextEl:a,prevEl:l}}if(C.pagination.disp){i=[...i,u.A];const a=e.querySelector(`.${g}-pagination`);t.pagination={el:a}}if(C.scrollbar.disp){i=[...i,f.A];const a=e.querySelector(`.${g}-scrollbar`);t.scrollbar={el:a}}C.effect&&(D[C.effect]&&(i=[...i,D[C.effect]]),t={...t,...ae[C.effect]}),i=[...i,D.parallax,D.thumbs],t.modules=i;const a=new c.A(le.current,t);return oe.current=a,de({instance:a,swiper_id:g,relate_id:b,is_thumbnail:h}),a})();l=window.requestAnimationFrame(()=>{e||!i||i.destroyed||(i.update(),i.navigation?.update(),i.pagination?.render(),i.pagination?.update(),i.scrollbar?.updateSize())})})})},0),()=>{e=!0,i&&window.clearTimeout(i),t&&window.cancelAnimationFrame(t),a&&window.cancelAnimationFrame(a),l&&window.cancelAnimationFrame(l)}},[Z,C,I,R,g,b,h]),(0,y.useSelect)(e=>{const i=e("itmar-custom/store").getSwiperInstanceById(b);re&&i&&(i.is_thumbnail?(re.instance.thumbs.swiper=i.instance,re.instance.thumbs.init(),re.instance.thumbs.update(!0)):re.is_thumbnail||(re.instance.on("slideChangeTransitionStart",e=>{i.instance.slideToLoop(e.realIndex,void 0,!1)}),i.instance.on("slideChangeTransitionStart",e=>{re.instance.slideToLoop(e.realIndex,void 0,!1)})))},[re]),(0,x.useEffect)(()=>{if(re)return ne(re),()=>{se(re.swiper_id)}},[re]);const[ce,pe]=(0,x.useState)(C.navigation.bgColor),[ue,fe]=(0,x.useState)(C.navigation.bgGradient);return(0,x.useEffect)(()=>{const e=void 0!==ce?ce:"var(--wp--preset--color--content-back)";i({slideInfo:{...C,navigation:{...C.navigation,bgColor:void 0===ce?"":ce,bgGradient:ue,shadow_element:{...C.navigation.shadow_element,baseColor:e}}}})},[ce,ue]),(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)(r.InspectorControls,{group:"settings",children:(0,A.jsxs)(d.PanelBody,{title:(0,a.__)("Slide Settings","slide-blocks"),initialOpen:!0,className:"form_design_ctrl",children:[(0,A.jsxs)(d.PanelBody,{title:(0,a.__)("Global Setting","slide-blocks"),initialOpen:!1,children:[(0,A.jsx)(d.TextControl,{label:(0,a.__)("Slide ID","slide-blocks"),value:g,onChange:e=>i({swiper_id:e})}),(0,A.jsx)(d.ComboboxControl,{label:(0,a.__)("ID of the associated slider","slide-blocks"),options:ee,value:b,onChange:e=>{i({relate_id:e})}}),(0,A.jsx)(d.ToggleControl,{label:(0,a.__)("Make it a thumbnail slider","slide-blocks"),checked:h,onChange:e=>{i({is_thumbnail:e})}}),h&&(0,A.jsxs)(d.PanelBody,{title:(0,a.__)("Active Effect","slide-blocks"),initialOpen:!0,children:[(0,A.jsx)(d.RangeControl,{value:C.activeSlideEffect?.blur,label:(0,a.__)("Blur(px)","slide-blocks"),max:10,min:0,step:1,onChange:e=>{i({slideInfo:{...C,activeSlideEffect:{...C.activeSlideEffect??{},blur:e}}})},withInputField:!0}),(0,A.jsx)(d.RangeControl,{value:C.activeSlideEffect?.opacity,label:(0,a.__)("Opacity","slide-blocks"),max:1,min:0,step:.1,onChange:e=>{i({slideInfo:{...C,activeSlideEffect:{...C.activeSlideEffect??{},opacity:e}}})},withInputField:!0}),(0,A.jsx)(d.RangeControl,{value:C.activeSlideEffect?.zoom,label:(0,a.__)("Zoom","slide-blocks"),max:3,min:1,step:.1,onChange:e=>{i({slideInfo:{...C,activeSlideEffect:{...C.activeSlideEffect??{},zoom:e}}})},withInputField:!0}),(0,A.jsx)(d.ComboboxControl,{label:(0,a.__)("Image Blend Mode","slide-blocks"),options:[{value:"nomal",label:"Nomal"},{value:"hard-light",label:"Hard Light"},{value:"difference",label:"Difference"}],value:C.activeSlideEffect?.blend,onChange:e=>{i({slideInfo:{...C,activeSlideEffect:{...C.activeSlideEffect??{},blend:e}}})}}),(0,A.jsx)(d.__experimentalBorderBoxControl,{label:(0,a.__)("Borders","slide-blocks"),onChange:e=>{i({slideInfo:{...C,activeSlideEffect:{...C.activeSlideEffect??{},border:e}}})},value:C.activeSlideEffect?.border,allowReset:!0,resetValues:z})]}),(0,A.jsx)(d.ToggleControl,{label:(0,a.__)("Loop","slide-blocks"),checked:C.loop,onChange:e=>{i({slideInfo:{...C,loop:e}})}}),(0,A.jsx)(d.ToggleControl,{label:(0,a.__)("Is AutoPlay","slide-blocks"),checked:C.is_autoplay,onChange:e=>{i({slideInfo:{...C,is_autoplay:e}})}}),C.is_autoplay&&(0,A.jsx)(d.RangeControl,{value:C.autoplay,label:(0,a.__)("Autoplay","slide-blocks"),max:1e4,min:0,step:500,onChange:e=>{i({slideInfo:{...C,autoplay:e}})},withInputField:!0,help:(0,a.__)("It will automatically slide at the interval you entered. If set to 0, it will slide smoothly non-stop.","slide-blocks")}),(0,A.jsx)("div",{className:"itmar_title_type",children:(0,A.jsx)(d.RadioControl,{label:(0,a.__)("Effect Type","slide-blocks"),selected:C.effect,options:[{label:(0,a.__)("None","slide-blocks"),value:"none"},{label:(0,a.__)("Slide Single","slide-blocks"),value:"slide_single_view"},{label:(0,a.__)("Fade Single","slide-blocks"),value:"fade_single_view"},{label:(0,a.__)("Coverflow 1","slide-blocks"),value:"coverflow"},{label:(0,a.__)("Coverflow 2","slide-blocks"),value:"coverflow_2"},{label:(0,a.__)("Cube","slide-blocks"),value:"cube"},{label:(0,a.__)("Flip","slide-blocks"),value:"flip"},{label:(0,a.__)("Cards","slide-blocks"),value:"cards"}],onChange:e=>{i({slideInfo:{...C,effect:e}})}})}),("none"===C.effect||"coverflow_2"===C.effect)&&(0,A.jsx)(d.RangeControl,{label:R?(0,a.__)("SlidesPerView(mobile)","slide-blocks"):(0,a.__)("SlidesPerView(desk top)","slide-blocks"),value:R?C.mobilePerView:C.defaultPerView,max:20,min:1,step:.1,onChange:e=>i(R?{slideInfo:{...C,mobilePerView:e}}:{slideInfo:{...C,defaultPerView:e}}),withInputField:!0}),("none"===C.effect||"coverflow"===C.effect||"coverflow_2"===C.effect)&&(0,A.jsx)(d.RangeControl,{label:R?(0,a.__)("Slide Space Between(mobile)","slide-blocks"):(0,a.__)("Slide Space Between(desk top)","slide-blocks"),value:R?C.mobileBetween:C.defaultBetween,max:200,min:0,step:5,onChange:e=>i(R?{slideInfo:{...C,mobileBetween:e}}:{slideInfo:{...C,defaultBetween:e}}),withInputField:!0}),"none"===C.effect&&(0,A.jsx)(d.ToggleControl,{label:(0,a.__)("Active Slide Center","slide-blocks"),checked:C.isActiveCenter,onChange:e=>{i({slideInfo:{...C,isActiveCenter:e}})}}),("none"===C.effect||"slide_single_view"===C.effect)&&(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)("div",{className:"itmar_title_type",children:(0,A.jsx)(d.RadioControl,{label:(0,a.__)("Slide Direction","slide-blocks"),selected:C.singleDirection,options:[{label:(0,a.__)("Horizontal","slide-blocks"),value:"horizontal"},{label:(0,a.__)("Vertical","slide-blocks"),value:"vertical"}],onChange:e=>{i({slideInfo:{...C,singleDirection:e}})}})}),(0,A.jsx)(d.ToggleControl,{label:(0,a.__)("Parallax Slide","slide-blocks"),checked:null!=I,onChange:e=>{i(e?{parallax_obj:{type:"horizontal"===C.singleDirection?"x":"y",scale:50,unit:"%"}}:{parallax_obj:null})}})]}),"slide_single_view"===C.effect&&null!=I&&(0,A.jsx)(A.Fragment,{children:(0,A.jsx)(d.RangeControl,{label:(0,a.__)("Parallax Area(%)","slide-blocks"),value:I?.scale?I.scale:0,max:100,min:0,step:10,onChange:e=>i({parallax_obj:{type:"horizontal"===C.singleDirection?"x":"y",scale:e,unit:"%"}}),withInputField:!0})}),"fade_single_view"===C.effect&&(0,A.jsx)(A.Fragment,{children:(0,A.jsx)("div",{className:"itmar_title_type",children:(0,A.jsx)(d.RadioControl,{label:(0,a.__)("Fade Motion","slide-blocks"),selected:C.fadeMotion,options:[{label:(0,a.__)("None","slide-blocks"),value:"none"},{label:(0,a.__)("Zoom Up","slide-blocks"),value:"zoomUp"}],onChange:e=>{i({slideInfo:{...C,fadeMotion:e}})}})})}),"fade_single_view"===C.effect&&"zoomUp"===C.fadeMotion&&(0,A.jsx)(A.Fragment,{children:(0,A.jsx)(d.RangeControl,{label:(0,a.__)("Zoom Scale","slide-blocks"),value:I?.scale?I.scale:1,max:3,min:1,step:.1,onChange:e=>i({parallax_obj:{type:"scale",scale:e,unit:""}}),withInputField:!0})}),("none"===C.effect||"slide_single_view"===C.effect||"fade_single_view"===C.effect)&&(0,A.jsx)(A.Fragment,{children:(0,A.jsx)(d.RangeControl,{label:(0,a.__)("Speed","slide-blocks"),value:C.slideSpeed,max:1e4,min:0,step:100,onChange:e=>i({slideInfo:{...C,slideSpeed:e}}),withInputField:!0})}),"cube"===C.effect&&(0,A.jsx)(d.ToggleControl,{label:(0,a.__)("Zoom Up","slide-blocks"),checked:C.cubeZoom,onChange:e=>{i({slideInfo:{...C,cubeZoom:e}})}})]}),(0,A.jsxs)(d.PanelBody,{title:(0,a.__)("Navigation Setting","slide-blocks"),initialOpen:!1,children:[(0,A.jsx)(d.ToggleControl,{label:(0,a.__)("Display","slide-blocks"),checked:C.navigation.disp,onChange:e=>{i({slideInfo:{...C,navigation:{...C.navigation,disp:e}}})}}),C.navigation.disp&&(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)("div",{className:"itmar_title_type",children:(0,A.jsx)(d.RadioControl,{label:(0,a.__)("Display Design","slide-blocks"),selected:C.navigation.design,options:[{label:(0,a.__)("Default","slide-blocks"),value:"default"},{label:(0,a.__)("Circle","slide-blocks"),value:"circle"}],onChange:e=>{i({slideInfo:{...C,navigation:{...C.navigation,design:e}}})}})}),(0,A.jsx)(d.__experimentalUnitControl,{dragDirection:"e",onChange:e=>i(R?{slideInfo:{...C,navigation:{...C.navigation,mobileSize:e}}}:{slideInfo:{...C,navigation:{...C.navigation,defaultSize:e}}}),label:R?(0,a.__)("Button Size(mobile)","block-collections"):(0,a.__)("Button Size(desk top)","block-collections"),value:R?C.navigation.mobileSize:C.navigation.defaultSize}),(0,A.jsx)(d.RangeControl,{label:R?(0,a.__)("Horizen position(mobile)","slide-blocks"):(0,a.__)("Horizen position(desk top)","slide-blocks"),value:R?C.navigation.mobileHorizenPos:C.navigation.defaultHorizonPos,max:10,min:-10,step:.5,onChange:e=>i(R?{slideInfo:{...C,navigation:{...C.navigation,mobileHorizenPos:e}}}:{slideInfo:{...C,navigation:{...C.navigation,defaultHorizonPos:e}}}),withInputField:!0}),(0,A.jsx)(d.RangeControl,{label:R?(0,a.__)("Vertical position(mobile)","slide-blocks"):(0,a.__)("Vertical position(desk top)","slide-blocks"),value:R?C.navigation.mobileVertPos:C.navigation.defaultVertPos,max:95,min:5,step:5,onChange:e=>i(R?{slideInfo:{...C,navigation:{...C.navigation,mobileVertPos:e}}}:{slideInfo:{...C,navigation:{...C.navigation,defaultVertPos:e}}}),withInputField:!0}),(0,A.jsx)(d.ToggleControl,{label:(0,a.__)("Hover Appear","slide-blocks"),checked:C.navigation.hoverAppear,onChange:e=>{i({slideInfo:{...C,navigation:{...C.navigation,hoverAppear:e}}})}})]}),C.navigation.disp&&"default"!=C.navigation.design&&(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)(r.__experimentalPanelColorGradientSettings,{title:(0,a.__)("Background Color Setting","slide-blocks"),settings:[{colorValue:C.navigation.bgColor,gradientValue:C.navigation.bgGradient,label:(0,a.__)("Choose Background color","slide-blocks"),onColorChange:e=>{pe(e)},onGradientChange:e=>{fe(e)}}]}),(0,A.jsx)(d.ToggleControl,{label:(0,a.__)("Is Shadow","slide-blocks"),checked:C.navigation.is_shadow,onChange:e=>{i({slideInfo:{...C,navigation:{...C.navigation,is_shadow:e}}})}})]}),C.navigation.disp&&"default"!=C.navigation.design&&C.navigation.is_shadow&&(0,A.jsx)(n.A,{shadowStyle:{...C.navigation.shadow_element},onChange:(e,t)=>{i({slideInfo:{...C,navigation:{...C.navigation,shadow_element:t,shadow_result:e.style}}})}})]}),(0,A.jsxs)(d.PanelBody,{title:(0,a.__)("Pagenation Setting","slide-blocks"),initialOpen:!1,children:[(0,A.jsx)(d.ToggleControl,{label:(0,a.__)("Display","slide-blocks"),checked:C.pagination.disp,onChange:e=>{i({slideInfo:{...C,pagination:{...C.pagination,disp:e}}})}}),C.pagination.disp&&(0,A.jsx)("div",{className:"itmar_title_type",children:(0,A.jsx)(d.RadioControl,{label:(0,a.__)("Design type","slide-blocks"),selected:C.pagination.design,options:[{label:(0,a.__)("Default","slide-blocks"),value:"default"},{label:(0,a.__)("Bar","slide-blocks"),value:"bar"}],onChange:e=>{i({slideInfo:{...C,pagination:{...C.pagination,design:e}}})}})})]}),(0,A.jsx)(d.PanelBody,{title:(0,a.__)("ScrollBar Setting","slide-blocks"),initialOpen:!1,children:(0,A.jsx)(d.ToggleControl,{label:(0,a.__)("Display","slide-blocks"),checked:C.scrollbar.disp,onChange:e=>{i({slideInfo:{...C,scrollbar:{...C.scrollbar,disp:e}}})}})})]})}),(0,A.jsx)(r.InspectorControls,{group:"styles",children:(0,A.jsxs)(d.PanelBody,{title:(0,a.__)("Content Style","slide-blocks"),initialOpen:!0,className:"form_design_ctrl",children:[(0,A.jsx)(s.qx,{attributes:e,isMobile:R,onWidthChange:(e,t)=>{i(R?{mobile_val:{..._,[e]:t}}:{default_val:{...m,[e]:t}})},onFreeWidthChange:(e,t)=>{i(R?{mobile_val:{..._,[e]:t}}:{default_val:{...m,[e]:t}})}}),(0,A.jsx)(s.Jy,{attributes:e,isMobile:R,onHeightChange:e=>{i(R?{mobile_val:{..._,height_val:e}}:{default_val:{...m,height_val:e}})},onFreeHeightChange:e=>{i(R?{mobile_val:{..._,free_height:e}}:{default_val:{...m,free_height:e}})}}),(0,A.jsx)(d.__experimentalBoxControl,{label:R?(0,a.__)("Padding settings(mobile)","slide-blocks"):(0,a.__)("Padding settings(desk top)","slide-blocks"),values:R?_.padding_content:m.padding_content,onChange:e=>i(R?{mobile_val:{..._,padding_content:e}}:{default_val:{...m,padding_content:e}}),units:N,allowReset:!0,resetValues:R?P:E}),(0,A.jsx)(r.__experimentalBorderRadiusControl,{values:v,onChange:e=>i({radius_slide:"string"==typeof e?{value:e}:e})}),(0,A.jsx)(d.ToggleControl,{label:(0,a.__)("Is Shadow","slide-blocks"),checked:w,onChange:e=>{i({is_shadow:e})}}),w&&(0,A.jsx)(n.A,{shadowStyle:{...$},onChange:(e,t)=>{i({shadow_result:e.style}),i({shadow_element:t})}})]})}),(0,A.jsx)(r.BlockControls,{children:(0,A.jsx)(d.ToolbarDropdownMenu,{label:(0,a.__)("Lateral Position","slide-blocks"),icon:(R?_.lat_pos:m.lat_pos)?B[R?_.lat_pos:m.lat_pos]:B.center,controls:["left","center","right"].map(e=>({icon:B[e],isActive:(R?_.lat_pos:m.lat_pos)===e,onClick:()=>i(R?{mobile_val:{..._,lat_pos:e}}:{default_val:{...m,lat_pos:e}})}))})}),(0,A.jsx)(S.ID,{target:V??void 0,children:(0,A.jsx)(l.B,{attributes:e,children:(0,A.jsxs)("div",{...X,children:[(0,A.jsx)("div",{className:"swiper",ref:le,children:(0,A.jsx)("div",{...W})}),(0,A.jsx)("div",{className:`swiper-button-prev ${g}-prev`}),(0,A.jsx)("div",{className:`swiper-button-next ${g}-next`}),(0,A.jsx)("div",{className:`swiper-pagination ${g}-pagination`}),(0,A.jsx)("div",{className:`swiper-scrollbar ${g}-scrollbar`})]})})})]})}}}]);
//# sourceMappingURL=274.js.map?ver=0b3d0dba22f8cd025b88