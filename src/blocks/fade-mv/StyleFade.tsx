import {
	width_prm,
	height_prm,
	max_width_prm,
	align_prm,
	space_prm,
	convertToScss,
	cssValueToString,
} from "itmar-block-packages";

/**
 * エディタ・フロントエンド共通のスコープ付きCSSを生成する。
 */
export const createFadeStyleCss = (attributes, scope) => {
	const {
		default_val,
		mobile_val,
		shadow_result,
		is_shadow,
		frameBackgroundOpacity = 1,
	} = attributes;
	const presetSlug = (value) =>
		String(value ?? "").replace(/[^a-zA-Z0-9_-]/g, "");
	const customBackground = attributes.style?.color?.background;
	const customGradient = attributes.style?.color?.gradient;
	const presetBackground = attributes.backgroundColor
		? `var(--wp--preset--color--${presetSlug(attributes.backgroundColor)})`
		: "";
	const presetGradient = attributes.gradient
		? `var(--wp--preset--gradient--${presetSlug(attributes.gradient)})`
		: "";
	const frameBackground =
		customGradient ||
		presetGradient ||
		customBackground ||
		presetBackground ||
		"transparent";
	const backgroundOpacity = Math.min(
		1,
		Math.max(0, Number(frameBackgroundOpacity)),
	);

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
		default_val.free_width,
	);
	const default_max_width_style = max_width_prm(
		default_val.width_val,
		default_val.free_width,
	);
	const mobile_max_width_style = max_width_prm(
		mobile_val.width_val,
		default_val.free_width,
	);
	const default_height_style = height_prm(
		default_val.height_val,
		default_val.free_height,
	);
	const mobile_height_style = height_prm(
		mobile_val.height_val,
		default_val.free_height,
	);
	const box_shadow_style =
		is_shadow && shadow_result
			? cssValueToString(convertToScss(shadow_result))
			: "";
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

	return `
		${scope} {
			position: relative;
			margin-block-start: 0;
			overflow: hidden;
			isolation: isolate;
			--itmar-fade-frame-background: ${frameBackground};
			--itmar-fade-frame-background-opacity: ${backgroundOpacity};
			background: transparent !important;
			background-color: transparent !important;
			background-image: none !important;
			${box_shadow_style}
			${default_width_style}
			${default_max_width_style}
			${default_height_style}
			${default_tranceform}
			${default_block_align}
			padding: ${default_content_padding_prm};
		}
		@media (max-width: 767px) {
			${scope} {
				${mobile_width_style}
				${mobile_max_width_style}
				${mobile_height_style}
				padding: ${mobile_contnt_padding_prm};
				${mobile_tranceform}
				${mobile_block_align}
			}
		}
	`;
};
