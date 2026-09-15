import "vegas/jquery";
import "vegas/dist/vegas.css";
import { styleDataApply } from "itmar-block-packages/front";
import { createFadeStyleCss } from "./StyleFade";
import {
	SLIDER_FRAME_ANIMATION_DURATION,
	getSliderFrameStyle,
	getRoundedFrameMorphValues,
	getRoundedFramePath,
	getRoundedFrameStepValues,
	getRoundedWindowTransforms,
	ROUNDED_FRAME_MORPH_DURATION,
	ROUNDED_FRAME_STEP_DURATION,
	type FrameAnimationMode,
	type FrameType,
	type RoundedWindowLayout,
} from "./framePresets";

const removeStyledComponentClasses = (element: Element) => {
	const classes = Array.from(element.classList) as string[];

	classes.forEach((classValue, index) => {
		if (/^sc-[a-zA-Z0-9]+$/.test(classValue)) {
			element.classList.remove(classValue);
			const generatedClass = classes[index + 1];
			if (generatedClass && /^[a-zA-Z0-9]+$/.test(generatedClass)) {
				element.classList.remove(generatedClass);
			}
		}
	});
};

document.querySelectorAll(".wp-block-itmar-fade-mv").forEach((element) => {
	removeStyledComponentClasses(element);
});

styleDataApply(createFadeStyleCss, ".wp-block-itmar-fade-mv", {
	target: "auto",
	classPrefix: "itmar-fade-style-",
	observe: true,
});

jQuery(function ($) {
	$(".wp-block-itmar-fade-mv").each(function (blockIndex) {
		removeStyledComponentClasses(this);

		const $block = $(this);
		const $frameElement = $block.find(".mv-frame").first();
		const $sliderElement = $block.find(".mv-slider").first();

		if (!$frameElement.get(0) || !$sliderElement.get(0)) return;

		const default_media_info = $sliderElement.data("default-media") || [];
		const mobile_media_info = $sliderElement.data("mobile-media") || [];
		const slide_settings = $sliderElement.data("slide-settings") || {};
		const frame_settings = $frameElement.data("frame-settings") || {};
		const frameType = ($frameElement.data("frame-type") || "none") as FrameType;
		const frameAnimationMode = (frame_settings.animationMode ||
			"continuous") as FrameAnimationMode;
		const frameAnimationDelay = Number(frame_settings.animationDelay ?? 250);
		const frameMorphDuration = Number(
			frame_settings.morphDuration ?? ROUNDED_FRAME_STEP_DURATION,
		);
		const frameWindowLayout = (frame_settings.windowLayout ||
			"single") as RoundedWindowLayout;
		const roundedWindowTransforms =
			getRoundedWindowTransforms(frameWindowLayout);
		const frameMaskId = `itmar-fade-rounded-mask-runtime-${blockIndex}`;
		const transitionDuration = Number(
			slide_settings.transition_duration ?? 2000,
		);
		let frameMaskElement = $block
			.find(".mv-frame-defs mask")
			.first()
			.get(0) as SVGMaskElement | undefined;

		// 古い保存データにもSVGマスクを適用できるよう、不足時は補完する。
		if (frameType === "rounded" && !frameMaskElement) {
			const svgNamespace = "http://www.w3.org/2000/svg";
			const svgElement = document.createElementNS(svgNamespace, "svg");
			const defsElement = document.createElementNS(svgNamespace, "defs");
			frameMaskElement = document.createElementNS(svgNamespace, "mask");

			svgElement.setAttribute("class", "mv-frame-defs");
			svgElement.setAttribute("width", "0");
			svgElement.setAttribute("height", "0");
			svgElement.setAttribute("aria-hidden", "true");
			frameMaskElement.setAttribute("id", frameMaskId);
			frameMaskElement.setAttribute("maskUnits", "objectBoundingBox");
			frameMaskElement.setAttribute(
				"maskContentUnits",
				"objectBoundingBox",
			);
			frameMaskElement.style.maskType = "luminance";
			defsElement.append(frameMaskElement);
			svgElement.append(defsElement);
			$frameElement.before(svgElement);
		}

		const framePathElements: SVGPathElement[] = [];
		const frameMorphElements: (SVGElement & {
			beginElement?: () => void;
		})[] = [];
		if (frameType === "rounded" && frameMaskElement) {
			const svgNamespace = "http://www.w3.org/2000/svg";
			frameMaskElement.setAttribute("id", frameMaskId);
			frameMaskElement.setAttribute("maskUnits", "objectBoundingBox");
			frameMaskElement.setAttribute(
				"maskContentUnits",
				"objectBoundingBox",
			);
			frameMaskElement.style.maskType = "luminance";
			frameMaskElement.replaceChildren();
			const maskBackground = document.createElementNS(svgNamespace, "rect");
			maskBackground.setAttribute("x", "0");
			maskBackground.setAttribute("y", "0");
			maskBackground.setAttribute("width", "1");
			maskBackground.setAttribute("height", "1");
			maskBackground.setAttribute("fill", "white");
			frameMaskElement.append(maskBackground);

			roundedWindowTransforms.forEach((transform, windowIndex) => {
				const pathElement = document.createElementNS(svgNamespace, "path");
				const morphElement = document.createElementNS(
					svgNamespace,
					"animate",
				) as SVGElement & { beginElement?: () => void };

				pathElement.setAttribute("class", "mv-frame-clip-path");
				pathElement.setAttribute("d", getRoundedFramePath(windowIndex));
				pathElement.setAttribute("fill", "black");
				if (transform) pathElement.setAttribute("transform", transform);

				morphElement.setAttribute("class", "mv-frame-morph");
				morphElement.setAttribute("attributeName", "d");
				morphElement.setAttribute("attributeType", "XML");
				morphElement.setAttribute("calcMode", "spline");
				if (frameAnimationMode === "continuous") {
					morphElement.setAttribute("begin", "0s");
					morphElement.setAttribute(
						"dur",
						`${ROUNDED_FRAME_MORPH_DURATION}ms`,
					);
					morphElement.setAttribute("repeatCount", "indefinite");
					morphElement.setAttribute(
						"values",
						getRoundedFrameMorphValues(windowIndex),
					);
					morphElement.setAttribute("keyTimes", "0;0.25;0.5;0.75;1");
					morphElement.setAttribute(
						"keySplines",
						"0.42 0 0.58 1;0.42 0 0.58 1;0.42 0 0.58 1;0.42 0 0.58 1",
					);
				} else {
					morphElement.setAttribute("begin", "indefinite");
					morphElement.setAttribute("dur", `${frameMorphDuration}ms`);
					morphElement.setAttribute("repeatCount", "1");
					morphElement.setAttribute("fill", "freeze");
					morphElement.setAttribute(
						"values",
						getRoundedFrameStepValues(0, windowIndex),
					);
					morphElement.setAttribute("keyTimes", "0;1");
					morphElement.setAttribute("keySplines", "0.42 0 0.58 1");
				}

				pathElement.append(morphElement);
				frameMaskElement?.append(pathElement);
				framePathElements.push(pathElement);
				frameMorphElements.push(morphElement);
			});
		}

		if (frameType === "rounded") {
			let overlayElement = $frameElement
				.find(".mv-frame-overlay")
				.first()
				.get(0) as HTMLDivElement | undefined;
			if (!overlayElement) {
				overlayElement = document.createElement("div");
				overlayElement.className = "mv-frame-overlay";
				$frameElement.append(overlayElement);
			}
			overlayElement.style.setProperty(
				"-webkit-mask",
				`url(#${frameMaskId})`,
			);
			overlayElement.style.setProperty("mask", `url(#${frameMaskId})`);
		}

		let frameMorphTimer: number | null = null;
		let sliderAnimationTimer: number | null = null;
		const sliderBandElement = $frameElement
			.find(".mv-slider-band")
			.first()
			.get(0) as HTMLDivElement | undefined;
		const sliderElement = $frameElement
			.find(".mv-slider")
			.first()
			.get(0) as HTMLElement | undefined;
		if (sliderBandElement && sliderElement) {
			const sliderFrameStyle = getSliderFrameStyle(
				Number(sliderBandElement.dataset.frameTopOffset ?? 0),
				Number(sliderBandElement.dataset.frameBottomOffset ?? 0),
				Number(sliderBandElement.dataset.frameAngle ?? 37.5),
			);
			Object.entries(sliderFrameStyle).forEach(([property, value]) => {
				sliderElement.style.setProperty(property, value);
			});
		}
		const triggerSliderFrame = () => {
			if (frameType !== "slider" || !sliderBandElement) return;
			const sliderAnimationDelay =
				Number.parseFloat(sliderBandElement.style.animationDelay) || 0;

			if (sliderAnimationTimer !== null) {
				window.clearTimeout(sliderAnimationTimer);
			}
			sliderBandElement.style.animationDelay = `${sliderAnimationDelay}ms`;
			sliderBandElement.classList.remove("is-slide-start");
			void sliderBandElement.offsetWidth;
			sliderBandElement.classList.add("is-slide-start");
			sliderAnimationTimer = window.setTimeout(() => {
				sliderAnimationTimer = null;
			}, SLIDER_FRAME_ANIMATION_DURATION + sliderAnimationDelay);
		};

		const triggerRoundedFrameMorph = (index: number) => {
			if (frameType !== "rounded" || frameAnimationMode !== "onChange") {
				return;
			}
			if (frameMorphTimer !== null) window.clearTimeout(frameMorphTimer);

			frameMorphTimer = window.setTimeout(() => {
				framePathElements.forEach((pathElement, windowIndex) => {
					pathElement.setAttribute(
						"d",
						getRoundedFramePath(index + windowIndex),
					);
					const morphElement = frameMorphElements[windowIndex];
					morphElement.setAttribute(
						"values",
						getRoundedFrameStepValues(index, windowIndex),
					);
					morphElement.beginElement?.();
				});
				frameMorphTimer = null;
			}, frameAnimationDelay);
		};


		$frameElement.css("transition-duration", `${transitionDuration}ms`);

		const default_urls = default_media_info
			.filter((item) => item.url)
			.map((item) => ({ src: item.url }));
		const mobile_urls = mobile_media_info
			.filter((item) => item.url)
			.map((item) => ({ src: item.url }));

		const window_flg = () => {
			const windowwidth =
				window.innerWidth || document.documentElement.clientWidth || 0;
			return windowwidth <= 768;
		};

		let mobile_flg = window_flg();

		const initVegas = (isMobile) => {
			const slideArray = isMobile ? mobile_urls : default_urls;

			if ($sliderElement.hasClass("vegas-container")) {
				$sliderElement.vegas("destroy");
			}

			if (slideArray.length !== 0) {
				$sliderElement.vegas({
					overlay: false,
					transition: slide_settings.transition,
					transitionDuration,
					animationDuration: slide_settings.animation_duration,
					animation: slide_settings.animation,
					slides: slideArray,
					timer: slide_settings.is_timer,
					walk: (index: number) => {
					triggerRoundedFrameMorph(index);
					triggerSliderFrame();
					},
				});
				return;
			}

			$sliderElement.vegas({
				cover: false,
				slides: [{ src: `${slide_blocks.plugin_url}/assets/no-image.png` }],
			});
		};

		initVegas(mobile_flg);

		$(window).on("resize", function () {
			const nextMobileFlg = window_flg();
			if (nextMobileFlg === mobile_flg) return;

			mobile_flg = nextMobileFlg;
			initVegas(mobile_flg);
		});
	});
});
