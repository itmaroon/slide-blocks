import styled, { css } from 'styled-components';
import { width_prm, max_width_prm, align_prm, space_prm, convertToScss } from '../cssPropertes';
import { Arrow } from '../../pseudo';
import { ShadowElm } from '../ShadowStyle';

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
      slideInfo,
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
    const nav_shadow_style = slideInfo.navigation.is_shadow && slideInfo.navigation.shadow_result ? convertToScss(slideInfo.navigation.shadow_result) : '';
    //ホバー時のスタイル
    let hover_shadow_style = '';
    if (slideInfo.navigation.is_shadow && slideInfo.navigation.shadow_result) {
      const hover_elm = ShadowElm({ ...slideInfo.navigation.shadow_element, embos: 'dent' });
      hover_shadow_style = convertToScss(hover_elm.style);
    }
    //位置調整
    const default_tranceform = default_val.is_moveable ? `transform: translate(${default_val.position?.x || 0}, ${default_val.position?.y || 0});` : 'transform: none;';
    const mobile_tranceform = mobile_val.is_moveable ? `transform: translate(${mobile_val.position?.x || 0}, ${mobile_val.position?.y || 0});` : 'transform: none;';

    //ナビゲーションの出現
    const navAppear = css`
    [class^="swiper-button-"]{
      opacity:0;
      visibility:hidden;
      transition:all .3s ease;
    }
    .swiper-button-prev{
      transform: translateX(calc(${slideInfo.navigation.defaultHorizonPos}em + 50px));
      @media (max-width: 767px) {
        transform: translateX(calc(${slideInfo.navigation.mobileHorizenPos}em + 30px));
      }
    }
    .swiper-button-next{
      transform: translateX(calc(${slideInfo.navigation.defaultHorizonPos * -1}em - 50px));
      @media (max-width: 767px) {
        transform: translateX(calc(${slideInfo.navigation.mobileHorizenPos * -1}em - 30px));
      }
    }
    &:hover{
      [class^="swiper-button-"]{
        opacity:1;
        visibility:visible;
      }
      .swiper-button-prev{
        transform: translateX(${slideInfo.navigation.defaultHorizonPos}em);
        @media (max-width: 767px) {
          transform: translateX(${slideInfo.navigation.mobileHorizenPos}em);
        }
      }
      .swiper-button-next{
        transform: translateX(${slideInfo.navigation.defaultHorizonPos * -1}em);
        @media (max-width: 767px) {
          transform: translateX(${slideInfo.navigation.mobileHorizenPos * -1}em);
        }
      }
    }
    `;

    //ナビゲーションのスタイル
    const hideNav = css`
    [class^="swiper-button-"]{
      display: none;
    }
    `
    const defaultNav = css`
    [class^="swiper-button-"]{
      top: ${slideInfo.navigation.defaultVertPos}%;
      color: var(--wp--preset--color--accent-1);
      @media (max-width: 767px) {
        top: ${slideInfo.navigation.mobileVertPos}%;
      }
    }
    .swiper-button-prev{
      transform: translateX(${slideInfo.navigation.defaultHorizonPos}em);
      @media (max-width: 767px) {
        transform: translateX(${slideInfo.navigation.mobileHorizenPos}em);
      }
    }
    .swiper-button-next{
      transform: translateX(${slideInfo.navigation.defaultHorizonPos * -1}em);
      @media (max-width: 767px) {
        transform: translateX(${slideInfo.navigation.mobileHorizenPos * -1}em);
      }
    }
    `

    const circleNav = css`
    [class^="swiper-button-"]{
      top: ${slideInfo.navigation.defaultVertPos}%;
      width: 3em;
			height: 3em;
      border-radius: 50%;
      background-color: ${slideInfo.navigation.bgColor || slideInfo.navigation.bgGradient};
      ${nav_shadow_style};
      transition: box-shadow ease-in-out 0.5s;
      &:hover {
        cursor: pointer;
        ${hover_shadow_style};
      }
      @media (max-width: 767px) {
        top: ${slideInfo.navigation.mobileVertPos}%;
      }
    }
    .swiper-button-prev{
      ${Arrow({ direction: 'left' })}
      transform: translateX(${slideInfo.navigation.defaultHorizonPos}em);
      @media (max-width: 767px) {
        transform: translateX(${slideInfo.navigation.mobileHorizenPos}em);
      }
    }
    .swiper-button-next{
      ${Arrow({ direction: 'right' })}
      transform: translateX(${slideInfo.navigation.defaultHorizonPos * -1}em);
      @media (max-width: 767px) {
        transform: translateX(${slideInfo.navigation.mobileHorizenPos * -1}em);
      }
    }
    `

    //スタイルの選択
    const navMap = {
      'hide': hideNav,
      'default': defaultNav,
      'circle': circleNav
    };
    const navPrm = !slideInfo.navigation.disp ? 'hide' : slideInfo.navigation.design;
    const navStyle = navMap[navPrm];


    //ページネーションのスタイル
    const defaultBullet = css`
    .swiper-pagination-bullet{
      background-color: var(--wp--preset--color--accent-2);
      &.swiper-pagination-bullet-active{
        background-color: var(--wp--preset--color--accent-1);
      }
    }
    `;
    const longBullet = css`
    .swiper-pagination-bullet{
      width:1.6em;
      height:3px;
      vertical-align: top;
      border-radius: 0;
      opacity: 1;
      transition: all 0.8s ease 0s;
      background-color: var(--wp--preset--color--accent-2);
      &.swiper-pagination-bullet-active{
        width: 4rem;
        background-color: var(--wp--preset--color--accent-1);
      }
    }
    `;

    //スタイルの選択
    const bulletMap = {
      'default': defaultBullet,
      'bar': longBullet
    };
    const bulletStyle = bulletMap[slideInfo.pagination.design || null];

    //ズームインアニメ
    const zoom_in = css`
      margin: 0 auto;
      transition:opacity .6s ease, transform .3s ease;
      &.scale-out{
        transform:scale(.7);
      }
      &.scale-in{
        transform:scale(1);
      }
    `

    // 共通のスタイルをここで定義します
    const commonStyle = css`
      position: relative;
      margin-block-start:0;
      > div{
        position: relative;
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
        ${bulletStyle}
        ${navStyle}
        ${slideInfo.navigation.hoverAppear ? navAppear : null}
        .swiper{
          ${slideInfo.cubeZoom ? zoom_in : null}
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
