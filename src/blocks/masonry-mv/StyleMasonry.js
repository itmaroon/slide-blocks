import styled, { css } from "styled-components";
import {
	width_prm,
	height_prm,
	max_width_prm,
	align_prm,
	space_prm,
	convertToScss,
	cssValueToString,
} from "itmar-block-packages";
export const StyleComp = ({ attributes, children }) => {
	return <StyledDiv $attr={attributes}>{children}</StyledDiv>;
};

const StyledDiv = styled.div`
	${({ $attr }) => {
		const {
			default_val,
			mobile_val,
			shadow_result,
			shadow_image_result,
			is_shadow,
			is_image_shadow,
		} = $attr;

		//スペースの設定
		const default_content_padding_prm = space_prm(default_val.padding_content);
		const mobile_contnt_padding_prm = space_prm(mobile_val.padding_content);
		//ブロックの配置
		const default_block_align = align_prm(default_val.lat_pos);
		const mobile_block_align = align_prm(mobile_val.lat_pos);
		//ブロック幅
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
		//ブロックの高さ
		const default_height_style = height_prm(
			default_val.height_val,
			default_val.free_height,
		);
		const mobile_height_style = height_prm(
			mobile_val.height_val,
			default_val.free_height,
		);

		//シャドースタイル
		const box_shadow_style =
			is_shadow && shadow_result ? convertToScss(shadow_result) : "";
		const image_shadow_style =
			is_image_shadow && shadow_image_result
				? convertToScss(shadow_image_result)
				: "";

		// 共通のスタイルをここで定義します
		const commonStyle = css`
			position: relative;
			margin-block-start: 0;
			overflow: hidden;
			${default_width_style};
			${default_max_width_style};
			${default_height_style};
			${default_block_align};
			${box_shadow_style};
			@media (max-width: 767px) {
				${mobile_width_style};
				${mobile_max_width_style};
				${mobile_height_style};
				${mobile_block_align};
			}
			.wp-block-itmar-masonry-mv {
				.itmar-masonry-item {
					box-sizing: border-box;
					padding: ${default_content_padding_prm};
					img {
						${image_shadow_style};
					}

					@media (max-width: 767px) {
						padding: ${mobile_contnt_padding_prm};
					}
				}
			}
		`;
		// 共通のスタイルを組み合わせて返します
		return css`
			${commonStyle}
		`;
	}}
`;

export const createMasonryStyleCss = (attributes, scope) => {
	const {
		default_val,
		mobile_val,
		shadow_result,
		shadow_image_result,
		is_shadow,
		is_image_shadow,
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
	const image_shadow_style =
		is_image_shadow && shadow_image_result
			? cssValueToString(convertToScss(shadow_image_result))
			: "";

	return `
		${scope} {
			position: relative;
			margin-block-start: 0;
			overflow: hidden;
			${default_width_style}
			${default_max_width_style}
			${default_height_style}
			${default_block_align}
			${box_shadow_style}
		}
		${scope}.wp-block-itmar-masonry-mv .itmar-masonry-item,
		${scope} .wp-block-itmar-masonry-mv .itmar-masonry-item {
			box-sizing: border-box;
			padding: ${default_content_padding_prm};
		}
		${scope}.wp-block-itmar-masonry-mv .itmar-masonry-item img,
		${scope} .wp-block-itmar-masonry-mv .itmar-masonry-item img {
			${image_shadow_style}
		}
		@media (max-width: 767px) {
			${scope} {
				${mobile_width_style}
				${mobile_max_width_style}
				${mobile_height_style}
				${mobile_block_align}
			}
			${scope}.wp-block-itmar-masonry-mv .itmar-masonry-item,
			${scope} .wp-block-itmar-masonry-mv .itmar-masonry-item {
				padding: ${mobile_contnt_padding_prm};
			}
		}
	`;
};
