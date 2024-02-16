import styled, { css } from 'styled-components';
import { align_prm, space_prm, convertToScss } from '../cssPropertes';

export const StyleComp = ({ attributes, children }) => {
  return (
    <StyledDiv
      attributes={{ ...attributes }}
    >
      {children}
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
${({ attributes }) => {
    const {
      default_val,
      mobile_val,
      shadow_result,
      is_shadow
    } = attributes;

    //スペースの設定
    const default_content_padding_prm = space_prm(default_val.padding_content);
    const mobile_contnt_padding_prm = space_prm(mobile_val.padding_content);
    //ブロックの配置
    const default_block_align = align_prm(default_val.lat_pos);
    const mobile_block_align = align_prm(mobile_val.lat_pos);

    //シャドースタイル
    const box_shadow_style = is_shadow && shadow_result ? convertToScss(shadow_result) : '';
    //位置調整
    const default_tranceform = default_val.is_moveable ? `transform: translate(${default_val.position?.x || 0}, ${default_val.position?.y || 0});` : 'transform: none;';
    const mobile_tranceform = mobile_val.is_moveable ? `transform: translate(${mobile_val.position?.x || 0}, ${mobile_val.position?.y || 0});` : 'transform: none;';

    // 共通のスタイルをここで定義します
    const commonStyle = css`
      position: relative;
      margin-block-start:0;
      overflow: hidden;
      > div{
        width: ${default_val.width}vw;
        height: ${default_val.height}vh;
        ${box_shadow_style};
        ${default_tranceform};
        ${default_block_align};
        padding: ${default_content_padding_prm};
        @media (max-width: 767px) {
          width: ${mobile_val.width}vw;
          height: ${mobile_val.height}vh;
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
  }
  }
`;
