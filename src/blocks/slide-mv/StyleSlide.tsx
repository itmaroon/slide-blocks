import {
	width_prm,
	height_prm,
	max_width_prm,
	align_prm,
	space_prm,
	convertToScss,
	cssValueToString,
	borderProperty,
	radius_prm,
	ShadowElm,
	Arrow,
} from "itmar-block-packages";

export const createSlideStyleCss = (attributes, scope) => {
	const {
		is_thumbnail,
		default_val,
		mobile_val,
		radius_slide,
		shadow_result,
		slideInfo,
		is_shadow,
	} = attributes;

	const default_content_padding_prm = space_prm(default_val.padding_content);
	const mobile_contnt_padding_prm = space_prm(mobile_val.padding_content);
	const default_block_align = align_prm(default_val.lat_pos);
	const mobile_block_align = align_prm(mobile_val.lat_pos);
	const default_width_style = width_prm(
		default_val.width_val,
		default_val.free_width,
	);
	const mobile_width_style = width_prm(
		mobile_val.width_val,
		mobile_val.free_width,
	);
	const default_max_width_style = max_width_prm(
		default_val.width_val,
		default_val.free_width,
	);
	const mobile_max_width_style = max_width_prm(
		mobile_val.width_val,
		mobile_val.free_width,
	);
	const default_height_style = height_prm(
		default_val.height_val,
		default_val.free_height,
	);
	const mobile_height_style = height_prm(
		mobile_val.height_val,
		mobile_val.free_height,
	);
	const slide_radius_prm = radius_prm(radius_slide);
	const box_shadow_style =
		is_shadow && shadow_result
			? cssValueToString(convertToScss(shadow_result))
			: "";
	const nav_shadow_style =
		slideInfo.navigation.is_shadow && slideInfo.navigation.shadow_result
			? cssValueToString(convertToScss(slideInfo.navigation.shadow_result))
			: "";
	let hover_shadow_style = "";
	if (slideInfo.navigation.is_shadow && slideInfo.navigation.shadow_result) {
		const hover_elm = ShadowElm({
			...slideInfo.navigation.shadow_element,
			embos: "dent",
		});
		hover_shadow_style = cssValueToString(convertToScss(hover_elm.style));
	}

	const default_tranceform = default_val.is_moveable
		? `transform: translate(${default_val.position?.x || 0}, ${
				default_val.position?.y || 0
		  });`
		: "transform: none;";
	const mobile_tranceform = mobile_val.is_moveable
		? `transform: translate(${mobile_val.position?.x || 0}, ${
				mobile_val.position?.y || 0
		  });`
		: "transform: none;";

	const navBase = `
		${scope} > div .swiper-button-prev,
		${scope} > div .swiper-button-next,
		${scope} > div [class^="swiper-button-"] {
			position: absolute;
			z-index: 10;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 0;
			cursor: pointer;
		}
		${scope} > div .swiper-button-prev::after,
		${scope} > div .swiper-button-next::after,
		${scope} > div [class^="swiper-button-"]::after {
			line-height: 1;
		}
		${scope} > div .swiper-button-prev {
			left: 0;
			right: auto;
		}
		${scope} > div .swiper-button-next {
			right: 0;
			left: auto;
		}
	`;

	const hideNav = `
		${scope} > div .swiper-button-prev,
		${scope} > div .swiper-button-next,
		${scope} > div [class^="swiper-button-"] { display: none; }
	`;
	const defaultNav = `
		${scope} > div .swiper-button-prev,
		${scope} > div .swiper-button-next,
		${scope} > div [class^="swiper-button-"] {
			top: ${slideInfo.navigation.defaultVertPos}%;
			width: ${slideInfo.navigation.defaultSize};
			height: ${slideInfo.navigation.defaultSize};
			color: var(--wp--preset--color--accent-1);
		}
		${scope} > div .swiper-button-prev::after,
		${scope} > div .swiper-button-next::after,
		${scope} > div [class^="swiper-button-"]::after {
			font-size: ${slideInfo.navigation.defaultSize};
		}
		${scope} > div .swiper-button-prev {
			transform: translateX(${slideInfo.navigation.defaultHorizonPos}em);
		}
		${scope} > div .swiper-button-next {
			transform: translateX(${slideInfo.navigation.defaultHorizonPos * -1}em);
		}
		@media (max-width: 767px) {
			${scope} > div .swiper-button-prev,
			${scope} > div .swiper-button-next,
			${scope} > div [class^="swiper-button-"] {
				top: ${slideInfo.navigation.mobileVertPos}%;
				width: ${slideInfo.navigation.mobileSize};
				height: ${slideInfo.navigation.mobileSize};
			}
			${scope} > div .swiper-button-prev::after,
			${scope} > div .swiper-button-next::after,
			${scope} > div [class^="swiper-button-"]::after {
				font-size: ${slideInfo.navigation.mobileSize};
			}
			${scope} > div .swiper-button-prev {
				transform: translateX(${slideInfo.navigation.mobileHorizenPos}em);
			}
			${scope} > div .swiper-button-next {
				transform: translateX(${slideInfo.navigation.mobileHorizenPos * -1}em);
			}
		}
	`;
	const circleNav = `
		${scope} > div .swiper-button-prev,
		${scope} > div .swiper-button-next,
		${scope} > div [class^="swiper-button-"] {
			top: ${slideInfo.navigation.defaultVertPos}%;
			width: ${slideInfo.navigation.defaultSize};
			height: ${slideInfo.navigation.defaultSize};
			border-radius: 50%;
			background: ${slideInfo.navigation.bgColor || slideInfo.navigation.bgGradient};
			${nav_shadow_style}
			transition: box-shadow ease-in-out 0.5s;
		}
		${scope} > div .swiper-button-prev:hover,
		${scope} > div .swiper-button-next:hover,
		${scope} > div [class^="swiper-button-"]:hover {
			cursor: pointer;
			${hover_shadow_style}
		}
		${scope} > div .swiper-button-prev {
			${cssValueToString(Arrow({ direction: "left" }))}
			transform: translateX(${slideInfo.navigation.defaultHorizonPos}em);
		}
		${scope} > div .swiper-button-next {
			${cssValueToString(Arrow({ direction: "right" }))}
			transform: translateX(${slideInfo.navigation.defaultHorizonPos * -1}em);
		}
		@media (max-width: 767px) {
			${scope} > div .swiper-button-prev,
			${scope} > div .swiper-button-next,
			${scope} > div [class^="swiper-button-"] {
				top: ${slideInfo.navigation.mobileVertPos}%;
				width: ${slideInfo.navigation.mobileSize};
				height: ${slideInfo.navigation.mobileSize};
			}
			${scope} > div .swiper-button-prev {
				transform: translateX(${slideInfo.navigation.mobileHorizenPos}em);
			}
			${scope} > div .swiper-button-next {
				transform: translateX(${slideInfo.navigation.mobileHorizenPos * -1}em);
			}
		}
	`;
	const navMap = {
		hide: hideNav,
		default: defaultNav,
		circle: circleNav,
	};
	const navPrm = !slideInfo.navigation.disp
		? "hide"
		: slideInfo.navigation.design;
	const navStyle = navMap[navPrm] || "";

	const navAppear = slideInfo.navigation.hoverAppear
		? `
			${scope} > div [class^="swiper-button-"] {
				opacity: 0;
				visibility: hidden;
				transition: all 0.3s ease;
			}
			${scope} > div .swiper-button-prev {
				transform: translateX(calc(${slideInfo.navigation.defaultHorizonPos}em + 50px));
			}
			${scope} > div .swiper-button-next {
				transform: translateX(calc(${
					slideInfo.navigation.defaultHorizonPos * -1
				}em - 50px));
			}
			${scope} > div:hover [class^="swiper-button-"] {
				opacity: 1;
				visibility: visible;
			}
			${scope} > div:hover .swiper-button-prev {
				transform: translateX(${slideInfo.navigation.defaultHorizonPos}em);
			}
			${scope} > div:hover .swiper-button-next {
				transform: translateX(${slideInfo.navigation.defaultHorizonPos * -1}em);
			}
			@media (max-width: 767px) {
				${scope} > div .swiper-button-prev {
					transform: translateX(calc(${slideInfo.navigation.mobileHorizenPos}em + 30px));
				}
				${scope} > div .swiper-button-next {
					transform: translateX(calc(${
						slideInfo.navigation.mobileHorizenPos * -1
					}em - 30px));
				}
				${scope} > div:hover .swiper-button-prev {
					transform: translateX(${slideInfo.navigation.mobileHorizenPos}em);
				}
				${scope} > div:hover .swiper-button-next {
					transform: translateX(${slideInfo.navigation.mobileHorizenPos * -1}em);
				}
			}
		`
		: "";

	const bulletStyle =
		slideInfo.pagination.design === "bar"
			? `
				${scope} > div .swiper-pagination-bullet {
					width: 1.6em;
					height: 3px;
					vertical-align: top;
					border-radius: 0;
					opacity: 1;
					transition: all 0.8s ease 0s;
					background-color: var(--wp--preset--color--accent-2);
				}
				${scope} > div .swiper-pagination-bullet.swiper-pagination-bullet-active {
					width: 4rem;
					background-color: var(--wp--preset--color--accent-1);
				}
			`
			: `
				${scope} > div .swiper-pagination-bullet {
					background-color: var(--wp--preset--color--accent-2);
				}
				${scope} > div .swiper-pagination-bullet.swiper-pagination-bullet-active {
					background-color: var(--wp--preset--color--accent-1);
				}
			`;

	const zoomStyle = slideInfo.cubeZoom
		? `
			${scope} > div .swiper {
				margin: 0 auto;
				transition: opacity 0.6s ease, transform 0.3s ease;
			}
			${scope} > div .swiper.scale-out { transform: scale(0.7); }
			${scope} > div .swiper.scale-in { transform: scale(1); }
		`
		: "";

	const cubeStyle =
		slideInfo.effect === "cube"
			? `
				${scope} > div .swiper.swiper-cube {
					overflow: clip;
				}
				${scope} > div .swiper.swiper-cube .swiper-slide {
					display: flex;
					align-items: center;
					width: 100%;
					height: 100%;
					overflow: hidden;
					background-color: var(--wp--preset--color--content-back, #fff);
				}
				${scope} > div .swiper.swiper-cube .swiper-slide:not(.swiper-slide-active):not(.swiper-slide-prev):not(.swiper-slide-next) {
					opacity: 0 !important;
					pointer-events: none !important;
				}
				${scope} > div .swiper.swiper-cube .swiper-slide > .itmar-wrap,
				${scope} > div .swiper.swiper-cube .swiper-slide > div:has(> .wp-block-itmar-design-group) {
					width: 100%;
					height: auto;
				}
				${scope} > div .swiper.swiper-cube .swiper-slide > .itmar-wrap > .wp-block-itmar-design-group {
					width: 100%;
				}
			`
			: "";

	const cover2Style =
		slideInfo.effect === "coverflow_2"
			? `
				${scope} > div .swiper .swiper-wrapper {
					position: absolute;
					top: 20%;
				}
				${scope} > div .swiper .swiper-slide {
					width: 30%;
					margin-right: 10px;
					height: 200px;
					position: relative;
					box-shadow: 0 2px 10px 0px #e9e4e4;
					transition: all 1s ease 0s;
					filter: blur(5px);
				}
				${scope} > div .swiper .swiper-slide .group_contents {
					width: 100%;
					position: absolute;
				}
				${scope} > div .swiper .swiper-slide.swiper-slide-active {
					overflow: visible;
					height: fit-content;
					filter: blur(0);
				}
				${scope} > div .swiper .swiper-slide.swiper-slide-active .wp-block-itmar-design-group {
					width: 140%;
					height: ${default_val.height};
					position: absolute;
					left: 50%;
					transform: translateX(-50%);
				}
				@media (max-width: 767px) {
					${scope} > div .swiper .swiper-slide.swiper-slide-active .wp-block-itmar-design-group {
						height: ${mobile_val.height};
					}
				}
			`
			: "";

	const thumbStyle = is_thumbnail
		? `
			${scope} > div .swiper-slide.swiper-slide-thumb-active::after {
				content: "";
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				${cssValueToString(borderProperty(slideInfo.activeSlideEffect?.border))}
			}
			${scope} > div .swiper-slide.swiper-slide-thumb-active .group_contents figure {
				transition: all 0.3s ease 0s;
				filter: blur(${slideInfo.activeSlideEffect?.blur}px);
				opacity: ${slideInfo.activeSlideEffect?.opacity};
				transform: scale(${slideInfo.activeSlideEffect?.zoom});
			}
			${scope} > div .swiper-slide.swiper-slide-thumb-active .group_contents img {
				mix-blend-mode: ${slideInfo.activeSlideEffect?.blend};
			}
		`
		: "";

	const smoothStyle =
		slideInfo.is_autoplay && slideInfo.autoplay === 0
			? `${scope} > div .swiper-wrapper { transition-timing-function: linear; }`
			: "";

	return `
		${scope} {
			position: relative;
			margin-block-start: 0;
			${default_width_style}
			${default_max_width_style}
			${default_height_style}
			${default_tranceform}
			${default_block_align}
		}
		${scope} > div {
			width: 100%;
			height: 100%;
			box-sizing: border-box;
			${box_shadow_style}
			padding: ${default_content_padding_prm};
		}
		${scope} > div .swiper {
			border-radius: ${slide_radius_prm};
		}
		${scope} > div .swiper-wrapper > :not(.swiper-slide) {
			display: none !important;
		}
		@media (max-width: 767px) {
			${scope} {
				${mobile_width_style}
				${mobile_max_width_style}
				${mobile_height_style}
				${mobile_tranceform}
				${mobile_block_align}
			}
			${scope} > div {
				padding: ${mobile_contnt_padding_prm};
			}
		}
		${navBase}
		${bulletStyle}
		${navStyle}
		${navAppear}
		${cubeStyle}
		${zoomStyle}
		${cover2Style}
		${thumbStyle}
		${smoothStyle}
	`;
};

