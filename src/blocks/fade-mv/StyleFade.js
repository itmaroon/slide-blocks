import styled, { css } from "styled-components";
import {
	width_prm,
	height_prm,
	max_width_prm,
	align_prm,
	space_prm,
	convertToScss,
} from "itmar-block-packages";
export const StyleComp = ({ attributes, children }) => {
	return <StyledDiv attributes={{ ...attributes }}>{children}</StyledDiv>;
};

const StyledDiv = styled.div`
	${({ attributes }) => {
		const { isFront, default_val, mobile_val, shadow_result, is_shadow } =
			attributes;

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
		//位置調整
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

		// 共通のスタイルをここで定義します
		const commonStyle = css`
			position: relative;
			margin-block-start: 0;
			overflow: hidden;
			> div {
				${!isFront ? default_width_style : default_max_width_style}
				${default_height_style}
				${box_shadow_style};
				${default_tranceform};
				${default_block_align};
				padding: ${default_content_padding_prm};
				@media (max-width: 767px) {
					${isFront ? mobile_width_style : mobile_max_width_style}
					${mobile_height_style}
					padding: ${mobile_contnt_padding_prm};
					${mobile_tranceform};
					${mobile_block_align};
				}
			}
		`;
		// 共通のスタイルを組み合わせて返します
		return css`
			${commonStyle}
		`;
	}}
`;
