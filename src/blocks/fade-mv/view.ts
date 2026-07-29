import { styleDataApply } from "itmar-block-packages";
import { createFadeStyleCss } from "./StyleFade";

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
	$(".wp-block-itmar-fade-mv").each(function () {
		removeStyledComponentClasses(this);

		const $block = $(this);
		const $sliderElement = $block.find(".mv-slider").first();

		if (!$sliderElement.get(0)) return;

		const default_media_info = $sliderElement.data("default-media") || [];
		const mobile_media_info = $sliderElement.data("mobile-media") || [];
		const slide_settings = $sliderElement.data("slide-settings") || {};

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
					transitionDuration: slide_settings.transition_duration,
					animationDuration: slide_settings.animation_duration,
					animation: slide_settings.animation,
					slides: slideArray,
					timer: slide_settings.is_timer,
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
