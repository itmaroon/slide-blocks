
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	BlockControls
} from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	RangeControl,
	RadioControl,
	ToolbarDropdownMenu,
	__experimentalBoxControl as BoxControl,
} from '@wordpress/components';
import { MultiImageSelect } from '../../mediaUpload'
import { StyleComp } from './StyleFade';
import { useStyleIframe } from '../iframeFooks';
import ShadowStyle, { ShadowElm } from '../ShadowStyle';
import DraggableBox, { useDraggingMove } from '../DraggableBox';
import './editor.scss';
import { useEffect, useRef } from '@wordpress/element';
import { useElementBackgroundColor, useIsIframeMobile } from '../CustomFooks'
import { justifyCenter, justifyLeft, justifyRight } from '@wordpress/icons';

//スペースのリセットバリュー
const padding_resetValues = {
	top: '0px',
	left: '0px',
	right: '0px',
	bottom: '0px',
}
const padding_mobile_resetValues = {
	top: '20px',
	left: '10px',
	right: '10px',
	bottom: '20px',
}

//単位のリセットバリュー
const units = [
	{ value: 'px', label: 'px' },
	{ value: 'em', label: 'em' },
	{ value: 'rem', label: 'rem' },
];

// アイコンと文字列キーのマッピングを作成
const alignIconMap = {
	left: justifyLeft,
	center: justifyCenter,
	right: justifyRight
};


export default function Edit(props) {
	const { attributes, setAttributes } = props;
	const {
		default_val,
		mobile_val,
		shadow_element,
		is_shadow,
		slide_settings
	} = attributes;

	//スライドの参照
	const slideRef = useRef(null);

	//モバイルの判定
	const isMobile = useIsIframeMobile();

	//ブロックの参照
	const blockRef = useRef(null);

	//blockPropsの参照
	const blockProps = useBlockProps({
		ref: blockRef,// ここで参照を blockProps に渡しています
	});

	//背景色の取得
	const baseColor = useElementBackgroundColor(blockRef, blockProps.style);

	//背景色変更によるシャドー属性の書き換え
	useEffect(() => {
		if (baseColor) {
			setAttributes({ shadow_element: { ...shadow_element, baseColor: baseColor } });
			const new_shadow = ShadowElm({ ...shadow_element, baseColor: baseColor });
			if (new_shadow) { setAttributes({ shadow_result: new_shadow.style }); }
		}
	}, [baseColor]);

	//サイトエディタの場合はiframeにスタイルをわたす。
	useStyleIframe(StyleComp, attributes);

	//移動可能ブロックならドラッグのカスタムフックを付加
	const handlePositionChange = (newPos) => {
		setAttributes(!isMobile ?
			{ default_val: { ...default_val, position: newPos } }
			: { mobile_val: { ...mobile_val, position: newPos } })
	};
	useDraggingMove(
		!isMobile ? default_val.is_moveable : mobile_val.is_moveable,
		blockRef,
		!isMobile ? default_val.position : mobile_val.position,
		handlePositionChange
	);

	//vegasの初期化・再設定
	let $sliderElement = null;

	useEffect(() => {
		if (slideRef.current) {
			// 要素を取得
			const sliderElement = slideRef.current;

			// sliderElementをjQueryオブジェクトに変換
			$sliderElement = jQuery(sliderElement);

			//スライドの要素
			const render_media = isMobile ? mobile_val.media : default_val.media;
			const slideArray = render_media
				.filter(item => item.url)
				.map(item => ({ src: item.url }));

			//vegasが設定してあれば一旦クリア
			if ($sliderElement.hasClass('vegas-container')) {
				$sliderElement.vegas('destroy');
			}

			if (slideArray.length != 0) {
				$sliderElement.vegas({
					overlay: false,
					transition: slide_settings.transition,
					transitionDuration: slide_settings.transition_duration,
					animationDuration: slide_settings.animation_duration,
					animation: slide_settings.animation,
					slides: slideArray,
					timer: slide_settings.is_timer,
				});
			} else {//画像の設定がなければ単一画像
				$sliderElement.vegas({
					cover: false,
					slides: [
						{ src: `${itmar_block_option.plugin_url}/assets/no-image.png` },
					]
				});
			}
		}
	}, [default_val.media, mobile_val.media, slide_settings, isMobile]);

	return (
		<>
			<InspectorControls group="settings">
				<MultiImageSelect
					attributes={!isMobile ?
						attributes.default_val : attributes.mobile_val}
					label={!isMobile ?
						__("Selected Images(desk top)", 'itmar_mv_blocks')
						: __("Selected Images(mobile)", 'itmar_mv_blocks')}
					onSelectChange={(media) => {
						// media から map で id プロパティの配列を生成
						const media_ID = media.map((image) => image.id);
						if (!isMobile) {
							setAttributes({ default_val: { ...default_val, mediaID: media_ID, media: media } });
						} else {
							setAttributes({ mobile_val: { ...mobile_val, mediaID: media_ID, media: media } });
						}

					}}
					onAllDelete={() => {
						if (!isMobile) {
							setAttributes({ default_val: { ...default_val, mediaID: [], media: [] } });
						} else {
							setAttributes({ mobile_val: { ...mobile_val, mediaID: [], media: [] } });
						}
					}}
				/>
				<PanelBody title={__("Slide Settings", 'itmar_mv_blocks')} initialOpen={true} className="form_design_ctrl">

					<div className='itmar_link_type'>
						<RadioControl
							label={__("Transition", 'itmar_mv_blocks')}
							selected={slide_settings.transition}
							options={[
								{ label: 'fade', value: 'fade' },
								{ label: 'slideLeft', value: 'slideLeft' },
								{ label: 'slideRight', value: 'slideRight' },
								{ label: 'slideUp', value: 'slideUp' },
								{ label: 'slideDown', value: 'slideDown' },
								{ label: 'zoomIn', value: 'zoomIn' },
								{ label: 'zoomOut', value: 'zoomOut' },
								{ label: 'swirlLeft', value: 'swirlLeft' },
								{ label: 'swirlRight', value: 'swirlRight' },
								{ label: 'burn', value: 'burn' },
								{ label: 'flash', value: 'flash' },
								{ label: 'blur', value: 'blur' },
							]}
							onChange={(changeOption) => setAttributes({ slide_settings: { ...slide_settings, transition: changeOption } })}
						/>
						<RangeControl
							value={slide_settings.transition_duration}
							label={__("Transition Duration", 'itmar_mv_blocks')}
							max={5000}
							min={1000}
							step={500}
							onChange={(val) => {
								setAttributes({ slide_settings: { ...slide_settings, transition_duration: val } });
							}}
							withInputField={true}
						/>
					</div>
					<div className='itmar_link_type'>
						<RadioControl
							selected={slide_settings.animation}
							label={__("Animation", 'itmar_mv_blocks')}
							options={[
								{ label: 'kenburns', value: 'kenburns' },
								{ label: 'kenburnsUp', value: 'kenburnsUp' },
								{ label: 'kenburnsDown', value: 'kenburnsDown' },
								{ label: 'kenburnsRight', value: 'kenburnsRight' },
								{ label: 'kenburnsLeft', value: 'kenburnsLeft' },
								{ label: 'kenburnsUpLeft', value: 'kenburnsUpLeft' },
								{ label: 'kenburnsUpRight', value: 'kenburnsUpRight' },
								{ label: 'kenburnsDownLeft', alue: 'kenburnsDownLeft' },
								{ label: 'kenburnsDownRight', value: 'kenburnsDownRight' },
								{ label: 'random', value: 'random' },

							]}
							onChange={(changeOption) => setAttributes({ slide_settings: { ...slide_settings, animation: changeOption } })}
						/>
						<RangeControl
							value={slide_settings.animation_duration}
							label={__("Animation Duration", 'itmar_mv_blocks')}
							max={50000}
							min={10000}
							step={1000}
							onChange={(val) => {
								setAttributes({ slide_settings: { ...slide_settings, animation_duration: val } });
							}}
							withInputField={true}
						/>
					</div>

					<ToggleControl
						label={__('Is Timer Display', 'itmar_mv_blocks')}
						checked={slide_settings.is_timer}
						onChange={(newVal) => {
							setAttributes({ slide_settings: { ...slide_settings, is_timer: newVal } })
						}}
					/>
				</PanelBody>
			</InspectorControls>
			<InspectorControls group="styles">
				<PanelBody title={__("Content Style", 'itmar_mv_blocks')} initialOpen={true} className="form_design_ctrl">
					<RangeControl
						label={!isMobile ?
							__("Width settings(desk top)", 'itmar_mv_blocks')
							: __("Width settings(mobile)", 'itmar_mv_blocks')}
						value={!isMobile ? default_val.width : mobile_val.width}

						max={100}
						min={30}
						step={10}
						onChange={value => setAttributes(!isMobile ?
							{ default_val: { ...default_val, width: value } }
							: { mobile_val: { ...mobile_val, width: value } }
						)}
						withInputField={true}
					/>
					<RangeControl
						label={!isMobile ?
							__("Height settings(desk top)", 'itmar_mv_blocks')
							: __("Height settings(mobile)", 'itmar_mv_blocks')}
						value={!isMobile ? default_val.height : mobile_val.height}

						max={100}
						min={30}
						step={10}
						onChange={value => setAttributes(!isMobile ?
							{ default_val: { ...default_val, height: value } }
							: { mobile_val: { ...mobile_val, height: value } }
						)}
						withInputField={true}
					/>
					<BoxControl
						label={!isMobile ?
							__("Padding settings(desk top)", 'itmar_mv_blocks')
							: __("Padding settings(mobile)", 'itmar_mv_blocks')}
						values={!isMobile ? default_val.padding_content : mobile_val.padding_content}
						onChange={value => setAttributes(!isMobile ?
							{ default_val: { ...default_val, padding_content: value } }
							: { mobile_val: { ...mobile_val, padding_content: value } }
						)}
						units={units}	// 許可する単位
						allowReset={true}	// リセットの可否
						resetValues={!isMobile ? padding_resetValues : padding_mobile_resetValues}	// リセット時の値
					/>

					<ToggleControl
						label={__('Is Shadow', 'itmar_mv_blocks')}
						checked={is_shadow}
						onChange={(newVal) => {
							setAttributes({ is_shadow: newVal })
						}}
					/>
					{is_shadow &&
						<ShadowStyle
							shadowStyle={{ ...shadow_element }}
							onChange={(newStyle, newState) => {
								setAttributes({ shadow_result: newStyle.style });
								setAttributes({ shadow_element: newState })
							}}
						/>
					}
				</PanelBody>
				<PanelBody
					title={!isMobile ?
						__("Position moveable(desk top)", 'itmar_mv_blocks')
						: __("Position moveable(mobile)", 'itmar_mv_blocks')}
					initialOpen={true}
				>
					<ToggleControl
						label={__('make it moveable', 'itmar_mv_blocks')}
						checked={!isMobile ? default_val.is_moveable : mobile_val.is_moveable}
						onChange={(value) => {
							setAttributes(!isMobile ?
								{ default_val: { ...default_val, is_moveable: value } }
								: { mobile_val: { ...mobile_val, is_moveable: value } }
							)
						}}
					/>
					{(!isMobile ? default_val.is_moveable : mobile_val.is_moveable) &&
						<DraggableBox
							attributes={!isMobile ? default_val.position : mobile_val.position}
							onPositionChange={(pos) => setAttributes(!isMobile ?
								{ default_val: { ...default_val, position: pos } }
								: { mobile_val: { ...mobile_val, position: pos } })}
						/>
					}

				</PanelBody>
			</InspectorControls>

			<BlockControls>
				<ToolbarDropdownMenu
					label={__('Lateral Position', 'itmar_mv_blocks')}
					icon={(!isMobile ? default_val.lat_pos : mobile_val.lat_pos) ?
						alignIconMap[!isMobile ? default_val.lat_pos : mobile_val.lat_pos]
						: alignIconMap['center']}
					controls={['left', 'center', 'right'].map(align => ({
						icon: alignIconMap[align],
						isActive: (!isMobile ? default_val.lat_pos : mobile_val.lat_pos) === align,
						onClick: () => setAttributes(!isMobile ?
							{ default_val: { ...default_val, lat_pos: align } }
							: { mobile_val: { ...mobile_val, lat_pos: align } }),
					}))}
				/>
			</BlockControls>

			<StyleComp
				attributes={attributes}
			>
				<div {...blockProps}>
					<div id="mv-slider-area">
						<div id="mv-slider" ref={slideRef}></div>
					</div>
				</div>
			</StyleComp>
		</>
	);
}
