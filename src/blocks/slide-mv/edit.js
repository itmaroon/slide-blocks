
import { __ } from '@wordpress/i18n';
import { StyleComp } from './StyleSlide';
import { useStyleIframe } from '../iframeFooks';
import ShadowStyle, { ShadowElm } from '../ShadowStyle';
import { useElementBackgroundColor, useIsIframeMobile } from '../CustomFooks';
import {
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls,
	BlockControls,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
	__experimentalBorderRadiusControl as BorderRadiusControl
} from '@wordpress/block-editor';
import {
	PanelBody,
	PanelRow,
	ToggleControl,
	RangeControl,
	RadioControl,
	TextareaControl,
	Notice,
	TextControl,
	ToolbarDropdownMenu,
	__experimentalBoxControl as BoxControl
} from '@wordpress/components';

import './editor.scss';
import Swiper from 'swiper';
import { Navigation, Pagination, Scrollbar, EffectCards, EffectCoverflow, EffectCreative, EffectCube, EffectFade, EffectFlip } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { useState, useRef, useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import DraggableBox, { useDraggingMove } from '../DraggableBox';
import { justifyCenter, justifyLeft, justifyRight } from '@wordpress/icons';

//スペースのリセットバリュー
const padding_resetValues = {
	top: '10px',
	left: '10px',
	right: '10px',
	bottom: '10px',
}

const padding_mobile_resetValues = {
	top: '20px',
	left: '10px',
	right: '10px',
	bottom: '20px',
}

//ボーダーのリセットバリュー
const border_resetValues = {
	top: '0px',
	left: '0px',
	right: '0px',
	bottom: '0px',
}

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



//モジュールのマッピング
const effectModule = {
	coverflow: EffectCoverflow,
	coverflow_2: EffectCoverflow,
	cube: EffectCube,
	flip: EffectFlip,
	cards: EffectCards
}

// 再帰的にブロックを探索して特定のブロックタイプを見つける関数
const findAllBlocksOfType = (blocks, blockType) => {
	let foundBlocks = [];
	blocks.forEach(block => {
		if (block.name === blockType) {
			foundBlocks.push(block);
		}

		if (block.innerBlocks && block.innerBlocks.length) {
			foundBlocks = [...foundBlocks, ...findAllBlocksOfType(block.innerBlocks, blockType)];
		}
	});
	return foundBlocks;
};

export default function Edit({ attributes, setAttributes, clientId }) {
	const {
		default_val,
		mobile_val,
		is_shadow,
		slideInfo,
		shadow_element,
	} = attributes;

	//モバイルの判定
	const isMobile = useIsIframeMobile();

	//ブロックの参照
	const blockRef = useRef(null);
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

	//インナーブロック
	const TEMPLATE = [
		['itmar/design-group', {}],
	];
	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'swiper-wrapper' },
		{
			template: TEMPLATE,
			allowedBlocks: ['itmar/design-group'],
			templateLock: false
		}
	);

	//このブロックのitmar/design-groupのis_swiper属性はtrueにする
	const innerBlocks = useSelect(select => {
		return select('core/block-editor').getBlocks(clientId);
	}, [clientId]);

	const { updateBlockAttributes } = useDispatch('core/block-editor');

	useEffect(() => {
		innerBlocks.forEach(innerBlock => {
			if (innerBlock.name === 'itmar/design-group') {
				const newAttributes = { is_swiper: true };
				updateBlockAttributes(innerBlock.clientId, { ...innerBlock.attributes, ...newAttributes });
			}
		});
	}, [innerBlocks.length, clientId]);

	//コアイメージを拡張するためcore/imageにitmar_ex_blockクラスをつける
	const imageBlocks = findAllBlocksOfType(innerBlocks, 'core/image');

	useEffect(() => {
		imageBlocks.forEach(imageBlock => {
			updateBlockAttributes(imageBlock.clientId, { ...imageBlock.attributes, className: 'itmar_ex_block' });
		});
	}, [innerBlocks.length, clientId]);

	//Swiperエフェクトのオプションをマッピング
	const effectOption = {
		none: {
			centeredSlides: true,
			slidesPerView: isMobile ? slideInfo.mobilePerView : slideInfo.defaultPerView,
			spaceBetween: isMobile ? slideInfo.mobileBetween : slideInfo.defaultBetween,
		},
		coverflow: {
			centeredSlides: true,
			slidesPerView: isMobile ? slideInfo.mobilePerView : slideInfo.defaultPerView,
			spaceBetween: isMobile ? slideInfo.mobileBetween : slideInfo.defaultBetween,
			effect: "coverflow",
			coverflowEffect: {
				rotate: 50,              // (前後のスライドの回転)
				depth: 100,             // (前後のスライドの奥行)
				stretch: isMobile ? 50 : 0, // (スライド間のスペース)
				modifier: 1,            // (rotate・depth・stretchの値を乗算する)
				scale: 0.9,               // (前後のスライドのサイズ比率)
				slideShadows: true,    // (前後のスライド表面の影の有無)
			},
		},
		coverflow_2: {
			centeredSlides: true,
			slidesPerView: isMobile ? slideInfo.mobilePerView : slideInfo.defaultPerView,
			spaceBetween: isMobile ? slideInfo.mobileBetween : slideInfo.defaultBetween,
			effect: "coverflow",
			coverflowEffect: {
				rotate: 0,
				slideShadows: true,
				stretch: isMobile ? 150 : 100,
			},
		},
		cube: {
			effect: "cube",
			cubeEffect: {
				slideShadows: true,             // スライド表面の影の有無
				shadow: true,                   // スライド下の影の有無
				shadowOffset: 20,              // スライド下の影の位置（px）
				shadowScale: 0.94,             //スライド下の影のサイズ比率（0~1）
			},
			on: {
				slideChangeTransitionStart: function () {
					this.el.classList.remove('scale-in');
					this.el.classList.add('scale-out');
				},
				// トランジション終了時
				slideChangeTransitionEnd: function () {
					this.el.classList.remove('scale-out');
					this.el.classList.add('scale-in');
				}
			}
		},
		flip: {
			effect: "flip",
			flipEffect: {
				limitRotation: true,
				slideShadows: true
			}
		},
		cards: {
			effect: "cards",
			cardsEffect: {
				perSlideOffset: 8,
				perSlideRotate: 2,
				rotate: true,
				slideShadows: true
			}
		},
	}


	//swiperオブジェクトを参照して初期化
	const swiperRef = useRef(null);
	const swiperInstance = useRef(null); // Swiperインスタンスを保持するためのref
	//スワイパーオブジェクトの生成関数
	const createSwiperObj = () => {
		const parentElement = swiperRef.current.parentElement;

		//オプトインするモジュールの配列
		let moduleArray = [];

		//スワイパーのオプションを生成
		let swiperOptions = {
			simulateTouch: false,
			loop: slideInfo.loop

		};
		//ナビゲーションのセット
		if (slideInfo.navigation.disp) {
			moduleArray = [...moduleArray, Navigation];
			const nextButton = parentElement.querySelector('.swiper-button-next');
			const prevButton = parentElement.querySelector('.swiper-button-prev');
			swiperOptions.navigation = {
				nextEl: nextButton,
				prevEl: prevButton,
			};
		}
		//ページネーションのセット
		if (slideInfo.pagination.disp) {
			moduleArray = [...moduleArray, Pagination];
			const pagination = parentElement.querySelector('.swiper-pagination');
			swiperOptions.pagination = {
				el: pagination,
			};
		}
		//スクロールバーのセット
		if (slideInfo.scrollbar.disp) {
			moduleArray = [...moduleArray, Scrollbar];
			const scrollbar = parentElement.querySelector('.swiper-scrollbar');
			swiperOptions.scrollbar = {
				el: scrollbar,
			};
		}
		//エフェクトのセット
		if (slideInfo.effect) {
			if (effectModule[slideInfo.effect]) {
				moduleArray = [...moduleArray, effectModule[slideInfo.effect]];
			}
			swiperOptions = { ...swiperOptions, ...effectOption[slideInfo.effect] };
		}

		//モジュールを追加
		swiperOptions.modules = moduleArray;
		//インスタンス初期化の実行
		swiperInstance.current = new Swiper(swiperRef.current, swiperOptions);
	}

	//スワイパーオブジェクト構築の実行
	useEffect(() => {
		if (swiperRef.current) {

			// 既存のSwiperインスタンスがあれば破棄
			if (swiperInstance.current) {
				// Swiper インスタンスを破棄する前に、動的に生成された DOM 要素を削除
				const paginationBullets = swiperRef.current.parentElement.querySelectorAll('.swiper-pagination-bullet');
				paginationBullets.forEach(bullet => bullet.remove());

				swiperInstance.current.destroy(false, true);
			}

			createSwiperObj();
		}

	}, [innerBlocks.length, slideInfo, isMobile]);


	//ナビゲーションの色情報の更新関数
	const [navigationBgColor, setNavigationBgColor] = useState(slideInfo.navigation.bgColor);
	const [navigationBgGradient, setNavigationBgGradient] = useState(slideInfo.navigation.bgGradient);
	useEffect(() => {
		const base_color = !(navigationBgColor === undefined) ? navigationBgColor : 'var(--wp--preset--color--content-back)';

		setAttributes({
			slideInfo: {
				...slideInfo,
				navigation: {
					...slideInfo.navigation,
					bgColor: navigationBgColor === undefined ? '' : navigationBgColor,
					bgGradient: navigationBgGradient,
					shadow_element: {
						...slideInfo.navigation.shadow_element, baseColor: base_color
					}
				}
			}
		});
	}, [navigationBgColor, navigationBgGradient]);


	return (
		<>
			<InspectorControls group="settings">
				<PanelBody title={__("Slide Settings", 'slide-blocks')} initialOpen={true} className="form_design_ctrl">
					<PanelBody title={__("Global Setting", 'slide-blocks')} initialOpen={false}>
						<ToggleControl
							label={__('Loop', 'slide-blocks')}
							checked={slideInfo.loop}

							onChange={(newVal) => {
								setAttributes({ slideInfo: { ...slideInfo, loop: newVal } })
							}}
						/>

						<RangeControl
							value={slideInfo.autoplay}
							label={__("Autoplay", 'slide-blocks')}
							max={10000}
							min={0}
							step={500}
							onChange={(newVal) => {
								setAttributes({ slideInfo: { ...slideInfo, autoplay: newVal } })
							}}
							withInputField={true}
							help={__("It will automatically slide at the interval you entered. If set to 0, it will not slide automatically.", 'slide-blocks')}
						/>

						<div className='itmar_title_type'>
							<RadioControl
								label={__("Effect Type", 'slide-blocks')}
								selected={slideInfo.effect}
								options={[
									{ label: __("None", 'slide-blocks'), value: 'none' },
									{ label: __("Coverflow 1", 'slide-blocks'), value: 'coverflow' },
									{ label: __("Coverflow 2", 'slide-blocks'), value: 'coverflow_2' },
									{ label: __("Cube", 'slide-blocks'), value: 'cube' },
									{ label: __("Flip", 'slide-blocks'), value: 'flip' },
									{ label: __("Cards", 'slide-blocks'), value: 'cards' },

								]}
								onChange={(newVal) => {
									setAttributes({ slideInfo: { ...slideInfo, effect: newVal } })
								}}
							/>
						</div>
						{(slideInfo.effect === 'none' || slideInfo.effect === 'coverflow' || slideInfo.effect === 'coverflow_2') &&
							<>
								<RangeControl
									label={!isMobile ?
										__("SlidesPerView(desk top)", 'slide-blocks')
										: __("SlidesPerView(mobile)", 'slide-blocks')}
									value={!isMobile ? slideInfo.defaultPerView : slideInfo.mobilePerView}

									max={20}
									min={1}
									step={0.1}
									onChange={(newVal) => setAttributes(!isMobile ?
										{ slideInfo: { ...slideInfo, defaultPerView: newVal } }
										: { slideInfo: { ...slideInfo, mobilePerView: newVal } }
									)}
									withInputField={true}
								/>
								<RangeControl
									label={!isMobile ?
										__("Slide Space Between(desk top)", 'slide-blocks')
										: __("Slide Space Between(mobile)", 'slide-blocks')}
									value={!isMobile ? slideInfo.defaultBetween : slideInfo.mobileBetween}

									max={200}
									min={0}
									step={5}
									onChange={(newVal) => setAttributes(!isMobile ?
										{ slideInfo: { ...slideInfo, defaultBetween: newVal } }
										: { slideInfo: { ...slideInfo, mobileBetween: newVal } }
									)}

									withInputField={true}
								/>
							</>
						}
						{slideInfo.effect === 'cube' &&
							<ToggleControl
								label={__('Zoom Up', 'slide-blocks')}
								checked={slideInfo.cubeZoom}

								onChange={(newVal) => {
									setAttributes({ slideInfo: { ...slideInfo, cubeZoom: newVal } })
								}}
							/>
						}
					</PanelBody>

					<PanelBody title={__("Navigation Setting", 'slide-blocks')} initialOpen={false}>
						<ToggleControl
							label={__('Display', 'slide-blocks')}
							checked={slideInfo.navigation.disp}
							onChange={(newVal) => {
								setAttributes({ slideInfo: { ...slideInfo, navigation: { ...slideInfo.navigation, disp: newVal } } })
							}}
						/>
						{slideInfo.navigation.disp &&
							<>
								<div className='itmar_title_type'>
									<RadioControl
										label={__("Display Design", 'slide-blocks')}
										selected={slideInfo.navigation.design}
										options={[
											{ label: __("Default", 'slide-blocks'), value: 'default' },
											{ label: __("Circle", 'slide-blocks'), value: 'circle' },
										]}
										onChange={(newVal) => {
											setAttributes({ slideInfo: { ...slideInfo, navigation: { ...slideInfo.navigation, design: newVal } } })
										}}
									/>
								</div>

								<RangeControl
									label={!isMobile ?
										__("Horizen position(desk top)", 'slide-blocks')
										: __("Horizen position(mobile)", 'slide-blocks')}
									value={!isMobile ? slideInfo.navigation.defaultHorizonPos : slideInfo.navigation.mobileHorizenPos}
									max={10}
									min={-10}
									step={0.5}
									onChange={(newVal) => setAttributes(!isMobile ?
										{ slideInfo: { ...slideInfo, navigation: { ...slideInfo.navigation, defaultHorizonPos: newVal } } }
										: { slideInfo: { ...slideInfo, navigation: { ...slideInfo.navigation, mobileHorizenPos: newVal } } }
									)}
									withInputField={true}
								/>
								<RangeControl
									label={!isMobile ?
										__("Vertical position(desk top)", 'slide-blocks')
										: __("Vertical position(mobile)", 'slide-blocks')}
									value={!isMobile ? slideInfo.navigation.defaultVertPos : slideInfo.navigation.mobileVertPos}
									max={95}
									min={5}
									step={5}
									onChange={(newVal) => setAttributes(!isMobile ?
										{ slideInfo: { ...slideInfo, navigation: { ...slideInfo.navigation, defaultVertPos: newVal } } }
										: { slideInfo: { ...slideInfo, navigation: { ...slideInfo.navigation, mobileVertPos: newVal } } }
									)}
									withInputField={true}
								/>
								<ToggleControl
									label={__('Hover Appear', 'slide-blocks')}
									checked={slideInfo.navigation.hoverAppear}
									onChange={(newVal) => {
										setAttributes({ slideInfo: { ...slideInfo, navigation: { ...slideInfo.navigation, hoverAppear: newVal } } })
									}}
								/>
							</>
						}
						{(slideInfo.navigation.disp && slideInfo.navigation.design != 'default') &&
							<>
								<PanelColorGradientSettings
									title={__("Background Color Setting", 'slide-blocks')}
									settings={[
										{
											colorValue: slideInfo.navigation.bgColor,
											gradientValue: slideInfo.navigation.bgGradient,
											label: __("Choose Background color", 'slide-blocks'),

											onColorChange: (newValue) => {
												setNavigationBgColor(newValue);
											},
											onGradientChange: (newValue) => {
												setNavigationBgGradient(newValue);
											}
										},
									]}
								/>
								<ToggleControl
									label={__('Is Shadow', 'slide-blocks')}
									checked={slideInfo.navigation.is_shadow}
									onChange={(newVal) => {
										setAttributes({ slideInfo: { ...slideInfo, navigation: { ...slideInfo.navigation, is_shadow: newVal } } })
									}}
								/>
							</>
						}
						{(slideInfo.navigation.disp && slideInfo.navigation.design != 'default' && slideInfo.navigation.is_shadow) &&
							<ShadowStyle
								shadowStyle={{ ...slideInfo.navigation.shadow_element }}
								onChange={(newStyle, newState) => {
									setAttributes({ slideInfo: { ...slideInfo, navigation: { ...slideInfo.navigation, shadow_element: newState, shadow_result: newStyle.style } } });

								}}
							/>
						}
					</PanelBody>

					<PanelBody title={__("Pagenation Setting", 'slide-blocks')} initialOpen={false}>
						<ToggleControl
							label={__('Display', 'slide-blocks')}
							checked={slideInfo.pagination.disp}
							onChange={(newVal) => {
								setAttributes({ slideInfo: { ...slideInfo, pagination: { ...slideInfo.pagination, disp: newVal } } })
							}}
						/>
						{slideInfo.pagination.disp &&
							<div className='itmar_title_type'>
								<RadioControl
									label={__("Design type", 'slide-blocks')}
									selected={slideInfo.pagination.design}
									options={[
										{ label: __("Default", 'slide-blocks'), value: 'default' },
										{ label: __("Bar", 'slide-blocks'), value: 'bar' },
									]}
									onChange={(newVal) => {
										setAttributes({ slideInfo: { ...slideInfo, pagination: { ...slideInfo.pagination, design: newVal } } })
									}}
								/>
							</div>

						}
					</PanelBody>
					<PanelBody title={__("ScrollBar Setting", 'slide-blocks')} initialOpen={false}>
						<ToggleControl
							label={__('Display', 'slide-blocks')}
							checked={slideInfo.scrollbar.disp}
							onChange={(newVal) => {
								setAttributes({ slideInfo: { ...slideInfo, scrollbar: { ...slideInfo.scrollbar, disp: newVal } } })
							}}
						/>
					</PanelBody>
				</PanelBody>

			</InspectorControls>

			<InspectorControls group="styles">
				<PanelBody title={__("Content Style", 'slide-blocks')} initialOpen={true} className="form_design_ctrl">
					<RangeControl
						label={!isMobile ?
							__("Width settings(desk top)", 'slide-blocks')
							: __("Width settings(mobile)", 'slide-blocks')}
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
							__("Height settings(desk top)", 'slide-blocks')
							: __("Height settings(mobile)", 'slide-blocks')}
						value={!isMobile ? default_val.height : mobile_val.height}

						max={100}
						min={10}
						step={10}
						onChange={value => setAttributes(!isMobile ?
							{ default_val: { ...default_val, height: value } }
							: { mobile_val: { ...mobile_val, height: value } }
						)}
						withInputField={true}
					/>
					<BoxControl
						label={!isMobile ?
							__("Padding settings(desk top)", 'slide-blocks')
							: __("Padding settings(mobile)", 'slide-blocks')}
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
						label={__('Is Shadow', 'slide-blocks')}
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
						__("Position moveable(desk top)", 'slide-blocks')
						: __("Position moveable(mobile)", 'slide-blocks')}
					initialOpen={true}
				>
					<ToggleControl
						label={__('make it moveable', 'slide-blocks')}
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
					label={__('Lateral Position', 'slide-blocks')}
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
					<div className='swiper' ref={swiperRef}>
						<div {...innerBlocksProps}></div>
					</div>
					{/* <!-- ナビゲーションボタンの表示 --> */}
					<div class="swiper-button-prev"></div>
					<div class="swiper-button-next"></div>
					{/* <!-- ページネーションの表示 --> */}
					<div class="swiper-pagination"></div>
					{/* <!-- スクロールバーの表示 --> */}
					<div class="swiper-scrollbar"></div>
				</div>
			</StyleComp>
		</>
	);
}
