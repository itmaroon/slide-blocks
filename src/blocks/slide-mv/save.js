
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { ServerStyleSheet } from 'styled-components';
import { renderToString } from 'react-dom/server';
import { StyleComp } from './StyleSlide';

export default function save({ attributes }) {
	const {
		slideInfo,
		parallax_obj
	} = attributes;

	const blockProps = useBlockProps.save();

	//styled-componentsのHTML化
	const sheet = new ServerStyleSheet();
	const html = renderToString(sheet.collectStyles(
		<StyleComp
			attributes={attributes}
			isFront={true}
		/>
	));
	const styleTags = sheet.getStyleTags();
	// 正規表現で styled-components のクラス名を取得
	const classMatch = html.match(/class="([^"]+)"/);
	const className = classMatch ? classMatch[1] : "";

	return (
		<>
			<div className={className}>
				<div {...blockProps} >
					{/* <!-- スライダーのメインのコンテナー --> */}
					<div
						class="swiper"
						data-swiper-info={JSON.stringify(slideInfo)}
						data-parallax-option={JSON.stringify(parallax_obj)}
					>
						{/* <!-- スライド .swiper-slide の中に画像を配置 --> */}
						<div class="swiper-wrapper">
							<InnerBlocks.Content />
						</div>
					</div>
					{/* <!-- ナビゲーションボタンの表示 --> */}
					<div class="swiper-button-prev"></div>
					<div class="swiper-button-next"></div>
					{/* <!-- ページネーションの表示 --> */}
					<div class="swiper-pagination"></div>
					{/* <!-- スクロールバーの表示 --> */}
					<div class="swiper-scrollbar"></div>
				</div>
			</div>
			<div className='itmar_style_div' dangerouslySetInnerHTML={{ __html: styleTags }} />
		</>
	)
}
