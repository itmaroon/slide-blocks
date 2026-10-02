import { __ } from "@wordpress/i18n";
import { createSlideStyleCss } from "./StyleSlide";

import {
	useIsIframeMobile,
	useElementBackgroundColor,
	useDuplicateBlockRemove,
	ShadowElm,
	ShadowStyle,
	BlockWidth,
	BlockHeight,
} from "itmar-block-packages";

import {
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls,
	BlockControls,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
	__experimentalBorderRadiusControl as BorderRadiusControl,
} from "@wordpress/block-editor";
import {
	PanelBody,
	PanelRow,
	Notice,
	ToggleControl,
	RangeControl,
	RadioControl,
	ToolbarDropdownMenu,
	TextControl,
	ComboboxControl,
	__experimentalBoxControl as BoxControl,
	__experimentalBorderBoxControl as BorderBoxControl,
	__experimentalUnitControl as UnitControl,
} from "@wordpress/components";

import "./editor.scss";
import Swiper from "swiper";
import {
	Navigation,
	Pagination,
	Scrollbar,
	EffectCards,
	EffectCoverflow,
	EffectCreative,
	EffectCube,
	EffectFade,
	EffectFlip,
	Parallax,
	Thumbs,
} from "swiper/modules";
import { useEffect, useRef, useState } from "@wordpress/element";
import { useSelect, useDispatch } from "@wordpress/data";
import { createBlock } from "@wordpress/blocks";
import "../customStore";
import { justifyCenter, justifyLeft, justifyRight } from "@wordpress/icons";
import {
	bindCubeMediaReady,
	bindCubeZoomEvents,
	resetCubeSize,
	updateCubeSize,
} from "./cubeSize";

//スペースのリセットバリュー
const padding_resetValues = {
	top: "10px",
	left: "10px",
	right: "10px",
	bottom: "10px",
};

const padding_mobile_resetValues = {
	top: "20px",
	left: "10px",
	right: "10px",
	bottom: "20px",
};

//ボーダーのリセットバリュー
const border_resetValues = {
	top: "0px",
	left: "0px",
	right: "0px",
	bottom: "0px",
};

const units = [
	{ value: "px", label: "px" },
	{ value: "em", label: "em" },
	{ value: "rem", label: "rem" },
];

// アイコンと文字列キーのマッピングを作成
const alignIconMap = {
	left: justifyLeft,
	center: justifyCenter,
	right: justifyRight,
};

//モジュールのマッピング
const effectModule = {
	fade_single_view: EffectFade,
	coverflow: EffectCoverflow,
	coverflow_2: EffectCoverflow,
	cube: EffectCube,
	flip: EffectFlip,
	cards: EffectCards,
	parallax: Parallax,
	thumbs: Thumbs,
};

// 再帰的にブロックを探索して特定のブロックタイプを見つける関数
const findAllBlocksOfType = (blocks, blockType) => {
	let foundBlocks = [];
	blocks.forEach((block) => {
		if (block.name === blockType) {
			foundBlocks.push(block);
		}

		if (block.innerBlocks && block.innerBlocks.length) {
			foundBlocks = [
				...foundBlocks,
				...findAllBlocksOfType(block.innerBlocks, blockType),
			];
		}
	});
	return foundBlocks;
};

//インナーブロックを含めてブロックのクローンを再生成する関数（clientIdの重複を避けるため）
const createBlockRecursively = (block) => {
	// 新しいブロックを作成（インナーブロックなし）
	const newBlock = createBlock(
		block.name,
		block.attributes,
		[], // 空の配列を渡して、元のインナーブロックは含めない
	);

	// インナーブロックがある場合、再帰的に処理
	if (block.innerBlocks && block.innerBlocks.length > 0) {
		newBlock.innerBlocks = block.innerBlocks.map((innerBlock) =>
			createBlockRecursively(innerBlock),
		);
	}

	return newBlock;
};

export default function Edit({ attributes, setAttributes, clientId }) {
	const {
		swiper_id,
		relate_id,
		is_thumbnail,
		default_val,
		mobile_val,
		radius_slide,
		is_shadow,
		slideInfo,
		parallax_obj,
		shadow_element,
	} = attributes;

	//モバイルの判定
	const isMobile = useIsIframeMobile();
	// カスタムフックを使用して、重複したitmar/pickup-postsブロックを自動削除し、通知を表示
	useDuplicateBlockRemove(clientId, ["itmar/pickup-posts"]);
	//ブロックの編集関数
	const { updateBlockAttributes } = useDispatch("core/block-editor");

	//ブロックの参照
	const blockRef = useRef(null);
	const blockProps = useBlockProps({
		ref: blockRef,
	});
	const editorStyleClass = `itmar-slide-editor-${clientId.replace(
		/[^a-zA-Z0-9_-]/g,
		"",
	)}`;
	const editorStyleCss = createSlideStyleCss(
		attributes,
		`.${editorStyleClass}`,
	);

	//背景色の取得
	const baseColor = useElementBackgroundColor(blockRef, blockProps.style);

	//背景色変更によるシャドー属性の書き換え
	useEffect(() => {
		if (baseColor) {
			setAttributes({
				shadow_element: { ...shadow_element, baseColor: baseColor },
			});
			const new_shadow = ShadowElm({ ...shadow_element, baseColor: baseColor });
			if (new_shadow) {
				setAttributes({ shadow_result: new_shadow.style });
			}
		}
	}, [baseColor]);

	//インナーブロック
	const TEMPLATE = [["itmar/design-group", {}]];
	const innerBlocksProps = useInnerBlocksProps(
		{ className: "swiper-wrapper" },
		{
			template: TEMPLATE,
			allowedBlocks: ["itmar/design-group", "itmar/pickup-posts"],
			templateLock: false,
		},
	);

	//slideInfo更新によるParallax情報の更新

	useEffect(() => {
		if (slideInfo.effect === "slide_single_view" && parallax_obj != null) {
			setAttributes({
				parallax_obj: {
					type: slideInfo.singleDirection === "horizontal" ? "x" : "y",
					scale: parallax_obj.scale,
					unit: "%",
				},
			});
		} else if (
			slideInfo.effect === "fade_single_view" &&
			slideInfo.fadeMotion === "zoomUp"
		) {
			setAttributes({
				parallax_obj: {
					type: "scale",
					scale: parallax_obj?.scale,
					unit: "",
				},
			});
		} else {
			setAttributes({ parallax_obj: null });
		}
	}, [slideInfo]);

	//スライドにしているitmar/design-groupに必要な情報を記録する
	const innerBlocks = useSelect(
		(select) => {
			return select("core/block-editor").getBlocks(clientId);
		},
		[clientId],
	);

	//swiper属性等の変更
	useEffect(() => {
		innerBlocks.forEach((innerBlock) => {
			if (innerBlock.name === "itmar/design-group") {
				//このブロックのitmar/design-groupのis_swiper属性はtrueにする
				const swiper_flg = { is_swiper: true };
				//Parallaxの情報をitmar/design-groupに記録する
				const parallax_prm =
					parallax_obj != null
						? { parallax_obj: parallax_obj }
						: { parallax_obj: null };
				updateBlockAttributes(innerBlock.clientId, {
					...innerBlock.attributes,
					...swiper_flg,
					...parallax_prm,
				});
			}
		});
	}, [innerBlocks, parallax_obj, clientId]);

	//コアイメージを拡張するためcore/imageにitmar_ex_blockクラスをつける
	const imageBlocks = findAllBlocksOfType(innerBlocks, "core/image");

	useEffect(() => {
		imageBlocks.forEach((imageBlock) => {
			//既にitmar_ex_blockがついている場合は処理しない
			if (!imageBlock.attributes.className?.includes("itmar_ex_block")) {
				updateBlockAttributes(imageBlock.clientId, {
					...imageBlock.attributes,
					className: `itmar_ex_block ${
						imageBlock.attributes.className
							? imageBlock.attributes.className
							: ""
					}`,
				});
			}
		});
	}, [innerBlocks.length, imageBlocks, clientId]);

	//エディタ内のすべてのslide-mvを取得
	const editorBlocks = useSelect((select) => {
		return select("core/block-editor").getBlocks();
	}, []); //エディタ内のブロックを取得

	const { hasNoticeBeenDisplayed } = useSelect((select) => ({
		hasNoticeBeenDisplayed: select("itmar-custom/store").hasNoticeBeenDisplayed,
	})); //カスタムストアを取得
	const { createNotice } = useDispatch("core/notices");
	const { addNotice, resetNotices } = useDispatch("itmar-custom/store");
	//自分以外のid格納用の配列
	const [relateIDs, setRelateIDs] = useState([]);

	useEffect(() => {
		const blocks = findAllBlocksOfType(editorBlocks, "itmar/slide-mv");

		// 他のすべてのブロックのswiper_idを格納する配列を生成
		const otherSwiperIds = blocks
			.filter((block) => block.clientId !== clientId) // 現在のブロックを除外
			.map((block) => {
				// swiper_idを持つオブジェクトを生成
				const id = block.attributes.swiper_id;
				return { value: id, label: id };
			})
			.filter((id) => id != null); // undefinedまたはnullのidを除外
		setRelateIDs(otherSwiperIds);

		// swiper_idの重複を検出するロジック（オブジェクトの配列を扱う方法に変更）
		const hasDuplicates = otherSwiperIds.some(
			(item) => item.value === swiper_id,
		);

		if (hasDuplicates) {
			const noticeId = "duplicate_swiper_id";
			//同じIDのブロックが存在し,エラーメッセージが表示されていなければ、エラーメッセージを出す
			if (!hasNoticeBeenDisplayed(noticeId)) {
				createNotice(
					"error",
					__(
						"A block with the same swiper ID exists. Please change your ID.",
						"slide-blocks",
					),
					{ type: "snackbar" },
				);
				addNotice(noticeId);
			}
		} else {
			// エラー状態が偽（つまり、エラーが解消された）場合、表示済みの通知をリセット
			resetNotices();
		}
	}, [editorBlocks]);

	/*
	 * 送り方向。枚数や間隔と同じく、デスクトップとモバイルで別に持つ。
	 * モバイル側が未設定のときはデスクトップと同じ向きにする（既存の内容を壊さないため、
	 * 既定値の slideInfo には mobileDirection を持たせていない）。
	 */
	const mobileDirection = slideInfo.mobileDirection ?? slideInfo.singleDirection;
	const previewDirection = isMobile ? mobileDirection : slideInfo.singleDirection;

	//parallaxオプションのスイッチ
	const parallax_option = parallax_obj != null ? { parallax: true } : {}; //parallax_optionを定義
	//Swiperエフェクトのオプションをマッピング
	const effectOption = {
		none: {
			centeredSlides: isMobile
				? slideInfo.isActiveCenterMob
				: slideInfo.isActiveCenterDef,
			direction: previewDirection,
			speed: slideInfo.slideSpeed,
			slidesPerView: isMobile
				? slideInfo.mobilePerView
				: slideInfo.defaultPerView,
			spaceBetween: isMobile
				? slideInfo.mobileBetween
				: slideInfo.defaultBetween,
		},
		slide_single_view: {
			...{
				direction: previewDirection,
				loopAdditionalSlides: 1,
				speed: slideInfo.slideSpeed,
				allowTouchMove: false,
			},
			...parallax_option,
		},
		fade_single_view: {
			...{
				speed: slideInfo.slideSpeed,
				effect: "fade",
				fadeEffect: {
					crossFade: true,
				},
			},
			...parallax_option,
		},
		coverflow: {
			centeredSlides: true,
			//slidesPerView: 'auto',
			slidesPerView: 3,
			spaceBetween: isMobile
				? slideInfo.mobileBetween
				: slideInfo.defaultBetween,
			effect: "coverflow",
			coverflowEffect: {
				rotate: 50, // (前後のスライドの回転)
				depth: 100, // (前後のスライドの奥行)
				stretch: 0, // (スライド間のスペース)
				modifier: 1, // (rotate・depth・stretchの値を乗算する)
				scale: 0.9, // (前後のスライドのサイズ比率)
				slideShadows: true, // (前後のスライド表面の影の有無)
			},
		},
		coverflow_2: {
			speed: 500,
			//autoplay:true,
			centeredSlides: true,
			slidesPerView: "auto",
			slideToClickedSlide: true,
			effect: "coverflow",
			coverflowEffect: {
				rotate: 0,
				slideShadows: false,
				stretch: 100,
			},
		},
		cube: {
			speed: 800,
			effect: "cube",
			autoHeight: false,
			cubeEffect: {
				slideShadows: true,
				shadow: true,
				shadowOffset: 40,
				shadowScale: 0.94,
			},
			on: {
				init: function () {
					bindCubeMediaReady(this);
					bindCubeZoomEvents(this);
					window.requestAnimationFrame(() => updateCubeSize(this));
				},
				resize: function () {
					if (!this.animating) {
						window.requestAnimationFrame(() => updateCubeSize(this));
					}
				},
				slideChange: function () {
					updateCubeSize(this);
				},
			},
		},
		flip: {
			effect: "flip",
			flipEffect: {
				limitRotation: true,
				slideShadows: true,
			},
		},
		cards: {
			effect: "cards",
			cardsEffect: {
				perSlideOffset: 8,
				perSlideRotate: 2,
				rotate: true,
				slideShadows: true,
			},
		},
	};

	//swiperオブジェクトを参照して初期化
	const swiperRef = useRef(null);
	const swiperInstance = useRef(null); // Swiperインスタンスを保持するためのref
	const { addSwiperInstance, removeSwiperInstance } =
		useDispatch("itmar-custom/store"); //Swiperインスタンスの格納用カスタムストア
	const [storeObj, setStoreObj] = useState(null); //カスタムストア格納用環境変数

	//スワイパーオブジェクトの生成関数
	const createSwiperObj = () => {
		if (!swiperRef.current) return null;

		const parentElement = swiperRef.current.parentElement;
		if (!parentElement) return null;

		//オプトインするモジュールの配列
		let moduleArray: any[] = [];

		//スワイパーのオプションを生成
		let swiperOptions: any = {
			simulateTouch: false,
			loop: slideInfo.loop,
		};
		//サムネイルスライダーに指定されているとき
		if (is_thumbnail) {
			swiperOptions = {
				...swiperOptions,
				watchSlidesProgress: true,
				watchSlidesVisibility: true,
			};
		}
		//ナビゲーションのセット
		if (slideInfo.navigation.disp) {
			moduleArray = [...moduleArray, Navigation];
			const nextButton = parentElement.querySelector(`.${swiper_id}-next`);
			const prevButton = parentElement.querySelector(`.${swiper_id}-prev`);
			swiperOptions.navigation = {
				nextEl: nextButton,
				prevEl: prevButton,
			};
		}
		//ページネーションのセット
		if (slideInfo.pagination.disp) {
			moduleArray = [...moduleArray, Pagination];
			const pagination = parentElement.querySelector(
				`.${swiper_id}-pagination`,
			);
			swiperOptions.pagination = {
				el: pagination,
			};
		}
		//スクロールバーのセット
		if (slideInfo.scrollbar.disp) {
			moduleArray = [...moduleArray, Scrollbar];
			const scrollbar = parentElement.querySelector(`.${swiper_id}-scrollbar`);
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
		moduleArray = [
			...moduleArray,
			effectModule["parallax"],
			effectModule["thumbs"],
		];
		swiperOptions.modules = moduleArray;

		//インスタンス初期化の実行
		const instance = new Swiper(swiperRef.current, swiperOptions);

		swiperInstance.current = instance;
		//格納用オブジェクトの生成
		const swiperObj = {
			instance: instance,
			swiper_id: swiper_id,
			relate_id: relate_id,
			is_thumbnail: is_thumbnail,
		};

		//格納用の環境変数に保存
		setStoreObj(swiperObj);
		return instance;
	};

	const destroySwiperObj = () => {
		if (!swiperRef.current) return;

		if (swiperInstance.current) {
			const paginationBullets =
				swiperRef.current.parentElement?.querySelectorAll(
					".swiper-pagination-bullet",
				) || [];
			paginationBullets.forEach((bullet) => bullet.remove());

			swiperInstance.current.destroy(false, true);
			swiperInstance.current = null;
		}

		resetCubeSize(swiperRef.current);

		const slides = swiperRef.current.querySelectorAll(".swiper-slide");
		slides.forEach((slide) => {
			const firstDiv = slide.querySelector("div");
			if (firstDiv) {
				firstDiv.removeAttribute("style");
			}

			const shadowDivs = slide.querySelectorAll(
				'div[class^="swiper-slide-shadow"]',
			);
			shadowDivs.forEach((div) => {
				div.remove();
			});
		});

		const cubeShadow = swiperRef.current.querySelectorAll(
			'div[class^="swiper-cube-shadow"]',
		);
		cubeShadow.forEach((div) => {
			div.remove();
		});
	};

	//スワイパーオブジェクト構築の実行
	useEffect(() => {
		if (!swiperRef.current) return;

		let isCancelled = false;
		let timeoutId = null;
		let firstFrameId = null;
		let secondFrameId = null;
		let updateFrameId = null;

		const scheduleInit = () => {
			destroySwiperObj();

			firstFrameId = window.requestAnimationFrame(() => {
				secondFrameId = window.requestAnimationFrame(() => {
					if (isCancelled || !swiperRef.current) return;

					const instance = createSwiperObj();
					updateFrameId = window.requestAnimationFrame(() => {
						if (isCancelled || !instance || instance.destroyed) return;

						instance.update();
						instance.navigation?.update();
						instance.pagination?.render();
						instance.pagination?.update();
						instance.scrollbar?.updateSize();
					});
				});
			});
		};

		timeoutId = window.setTimeout(scheduleInit, 0);

		return () => {
			isCancelled = true;
			if (timeoutId) window.clearTimeout(timeoutId);
			if (firstFrameId) window.cancelAnimationFrame(firstFrameId);
			if (secondFrameId) window.cancelAnimationFrame(secondFrameId);
			if (updateFrameId) window.cancelAnimationFrame(updateFrameId);
		};
	}, [
		innerBlocks,
		slideInfo,
		parallax_obj,
		isMobile,
		swiper_id,
		relate_id,
		is_thumbnail,
	]);
	//カスタムストアを取得してイベントハンドラを設定
	useSelect(
		(select) => {
			// const allObj = select("itmar-custom/store").getSwiperInstances();
			const relateObj =
				select("itmar-custom/store").getSwiperInstanceById(relate_id);
			if (storeObj && relateObj) {
				if (relateObj.is_thumbnail) {
					storeObj.instance.thumbs.swiper = relateObj.instance;
					storeObj.instance.thumbs.init();
					storeObj.instance.thumbs.update(true);
				} else if (!storeObj.is_thumbnail) {
					storeObj.instance.on("slideChangeTransitionStart", (slider) => {
						relateObj.instance.slideToLoop(slider.realIndex, undefined, false);
					});
					relateObj.instance.on("slideChangeTransitionStart", (slider) => {
						storeObj.instance.slideToLoop(slider.realIndex, undefined, false);
					});
				}
			}
		},
		[storeObj],
	);

	//swiperインスタンスをカスタムストアに格納
	useEffect(() => {
		if (storeObj) {
			addSwiperInstance(storeObj);
			// コンポーネントのクリーンアップ時にインスタンスを削除
			return () => {
				removeSwiperInstance(storeObj.swiper_id); // ここでIDを使用
				//swiperInstance.current.instance.destroy();
			};
		}
	}, [storeObj]);

	//ナビゲーションの色情報の更新関数
	const [navigationBgColor, setNavigationBgColor] = useState(
		slideInfo.navigation.bgColor,
	);
	const [navigationBgGradient, setNavigationBgGradient] = useState(
		slideInfo.navigation.bgGradient,
	);
	useEffect(() => {
		const base_color = !(navigationBgColor === undefined)
			? navigationBgColor
			: "var(--itmar-content-back)";

		setAttributes({
			slideInfo: {
				...slideInfo,
				navigation: {
					...slideInfo.navigation,
					bgColor: navigationBgColor === undefined ? "" : navigationBgColor,
					bgGradient: navigationBgGradient,
					shadow_element: {
						...slideInfo.navigation.shadow_element,
						baseColor: base_color,
					},
				},
			},
		});
	}, [navigationBgColor, navigationBgGradient]);

	return (
		<>
			<InspectorControls group="settings">
				<PanelBody
					title={__("Slide Settings", "slide-blocks")}
					initialOpen={true}
					className="form_design_ctrl"
				>
					<PanelBody
						title={__("Global Setting", "slide-blocks")}
						initialOpen={false}
					>
						<TextControl
							label={__("Slide ID", "slide-blocks")}
							value={swiper_id}
							onChange={(value) => setAttributes({ swiper_id: value })}
						/>
						<ComboboxControl
							label={__("ID of the associated slider", "slide-blocks")}
							options={relateIDs}
							value={relate_id}
							onChange={(newValue) => {
								setAttributes({ relate_id: newValue });
							}}
						/>
						<ToggleControl
							label={__("Make it a thumbnail slider", "slide-blocks")}
							checked={is_thumbnail}
							onChange={(newVal) => {
								setAttributes({ is_thumbnail: newVal });
							}}
						/>

						{is_thumbnail && (
							<PanelBody
								title={__("Active Effect", "slide-blocks")}
								initialOpen={true}
							>
								<RangeControl
									value={slideInfo.activeSlideEffect?.blur}
									label={__("Blur(px)", "slide-blocks")}
									max={10}
									min={0}
									step={1}
									onChange={(newVal) => {
										setAttributes({
											slideInfo: {
												...slideInfo,
												activeSlideEffect: {
													...(slideInfo.activeSlideEffect ?? {}),
													blur: newVal,
												},
											},
										});
									}}
									withInputField={true}
								/>
								<RangeControl
									value={slideInfo.activeSlideEffect?.opacity}
									label={__("Opacity", "slide-blocks")}
									max={1}
									min={0}
									step={0.1}
									onChange={(newVal) => {
										setAttributes({
											slideInfo: {
												...slideInfo,
												activeSlideEffect: {
													...(slideInfo.activeSlideEffect ?? {}),
													opacity: newVal,
												},
											},
										});
									}}
									withInputField={true}
								/>
								<RangeControl
									value={slideInfo.activeSlideEffect?.zoom}
									label={__("Zoom", "slide-blocks")}
									max={3}
									min={1}
									step={0.1}
									onChange={(newVal) => {
										setAttributes({
											slideInfo: {
												...slideInfo,
												activeSlideEffect: {
													...(slideInfo.activeSlideEffect ?? {}),
													zoom: newVal,
												},
											},
										});
									}}
									withInputField={true}
								/>
								<ComboboxControl
									label={__("Image Blend Mode", "slide-blocks")}
									options={[
										{ value: "nomal", label: "Nomal" },
										{ value: "hard-light", label: "Hard Light" },
										{ value: "difference", label: "Difference" },
									]}
									value={slideInfo.activeSlideEffect?.blend}
									onChange={(newVal) => {
										setAttributes({
											slideInfo: {
												...slideInfo,
												activeSlideEffect: {
													...(slideInfo.activeSlideEffect ?? {}),
													blend: newVal,
												},
											},
										});
									}}
								/>
								<BorderBoxControl
									label={__("Borders", "slide-blocks")}
									onChange={(newVal) => {
										setAttributes({
											slideInfo: {
												...slideInfo,
												activeSlideEffect: {
													...(slideInfo.activeSlideEffect ?? {}),
													border: newVal,
												},
											},
										});
									}}
									value={slideInfo.activeSlideEffect?.border}
									allowReset={true} // リセットの可否
									resetValues={border_resetValues} // リセット時の値
								/>
							</PanelBody>
						)}

						<ToggleControl
							label={__("Loop", "slide-blocks")}
							checked={slideInfo.loop}
							onChange={(newVal) => {
								setAttributes({ slideInfo: { ...slideInfo, loop: newVal } });
							}}
						/>

						<ToggleControl
							label={__("Is AutoPlay", "slide-blocks")}
							checked={slideInfo.is_autoplay}
							onChange={(newVal) => {
								setAttributes({
									slideInfo: { ...slideInfo, is_autoplay: newVal },
								});
							}}
						/>
						{slideInfo.is_autoplay && (
							<RangeControl
								value={slideInfo.autoplay}
								label={__("Autoplay", "slide-blocks")}
								max={10000}
								min={0}
								step={500}
								onChange={(newVal) => {
									setAttributes({
										slideInfo: { ...slideInfo, autoplay: newVal },
									});
								}}
								withInputField={true}
								help={__(
									"It will automatically slide at the interval you entered. If set to 0, it will slide smoothly non-stop.",
									"slide-blocks",
								)}
							/>
						)}

						<div className="itmar_title_type">
							<RadioControl
								label={__("Effect Type", "slide-blocks")}
								selected={slideInfo.effect}
								options={[
									{ label: __("None", "slide-blocks"), value: "none" },
									{
										label: __("Slide Single", "slide-blocks"),
										value: "slide_single_view",
									},
									{
										label: __("Fade Single", "slide-blocks"),
										value: "fade_single_view",
									},
									{
										label: __("Coverflow 1", "slide-blocks"),
										value: "coverflow",
									},
									{
										label: __("Coverflow 2", "slide-blocks"),
										value: "coverflow_2",
									},
									{ label: __("Cube", "slide-blocks"), value: "cube" },
									{ label: __("Flip", "slide-blocks"), value: "flip" },
									{ label: __("Cards", "slide-blocks"), value: "cards" },
								]}
								onChange={(newVal) => {
									setAttributes({
										slideInfo: { ...slideInfo, effect: newVal },
									});
								}}
							/>
						</div>
						{(slideInfo.effect === "none" ||
							slideInfo.effect === "coverflow_2") && (
							<RangeControl
								label={
									!isMobile
										? __("SlidesPerView(desk top)", "slide-blocks")
										: __("SlidesPerView(mobile)", "slide-blocks")
								}
								value={
									!isMobile ? slideInfo.defaultPerView : slideInfo.mobilePerView
								}
								max={20}
								min={1}
								step={0.1}
								onChange={(newVal) =>
									setAttributes(
										!isMobile
											? { slideInfo: { ...slideInfo, defaultPerView: newVal } }
											: { slideInfo: { ...slideInfo, mobilePerView: newVal } },
									)
								}
								withInputField={true}
							/>
						)}
						{(slideInfo.effect === "none" ||
							slideInfo.effect === "coverflow" ||
							slideInfo.effect === "coverflow_2") && (
							<RangeControl
								label={
									!isMobile
										? __("Slide Space Between(desk top)", "slide-blocks")
										: __("Slide Space Between(mobile)", "slide-blocks")
								}
								value={
									!isMobile ? slideInfo.defaultBetween : slideInfo.mobileBetween
								}
								max={200}
								min={0}
								step={5}
								onChange={(newVal) =>
									setAttributes(
										!isMobile
											? { slideInfo: { ...slideInfo, defaultBetween: newVal } }
											: { slideInfo: { ...slideInfo, mobileBetween: newVal } },
									)
								}
								withInputField={true}
							/>
						)}
						{slideInfo.effect === "none" && (
							<ToggleControl
								label={
									!isMobile
										? __("Active Slide Center(desk top)", "slide-blocks")
										: __("Active Slide Center(mobile)", "slide-blocks")
								}
								checked={
									!isMobile
										? slideInfo.isActiveCenterDef
										: slideInfo.isActiveCenterMob
								}
								onChange={(newVal) => {
									setAttributes(
										!isMobile
											? {
													slideInfo: {
														...slideInfo,
														isActiveCenterDef: newVal,
													},
											  }
											: {
													slideInfo: {
														...slideInfo,
														isActiveCenterMob: newVal,
													},
											  },
									);
								}}
							/>
						)}
						{(slideInfo.effect === "none" ||
							slideInfo.effect === "slide_single_view") && (
							<>
								<div className="itmar_title_type">
									<RadioControl
										label={
											!isMobile
												? __("Slide Direction(desk top)", "slide-blocks")
												: __("Slide Direction(mobile)", "slide-blocks")
										}
										selected={
											!isMobile ? slideInfo.singleDirection : mobileDirection
										}
										options={[
											{
												label: __("Horizontal", "slide-blocks"),
												value: "horizontal",
											},
											{
												label: __("Vertical", "slide-blocks"),
												value: "vertical",
											},
										]}
										onChange={(newVal) => {
											setAttributes({
												slideInfo: !isMobile
													? { ...slideInfo, singleDirection: newVal }
													: { ...slideInfo, mobileDirection: newVal },
											});
										}}
									/>
									{/*
									 * 縦送りは高さが決まっていないと動かない。
									 * 高さが「内容に合わせる」「自動」のままだと、スライドが
									 * 縦に並ぶ余地がなく、送っても何も見えない。
									 */}
									{previewDirection === "vertical" &&
										["fit", "auto"].includes(
											(isMobile ? mobile_val : default_val).height_val,
										) && (
											<Notice status="warning" isDismissible={false}>
												{__(
													"Vertical sliding needs a fixed height. Set the height to a value or 100% in the position settings.",
													"slide-blocks",
												)}
											</Notice>
										)}
									{/*
									 * パララックスの向き（data-swiper-parallax-x / -y）は保存時に
									 * 決まるため、画面幅では切り替わらない。
									 */}
									{parallax_obj != null &&
										mobileDirection !== slideInfo.singleDirection && (
											<Notice status="warning" isDismissible={false}>
												{__(
													"Parallax moves along one axis only. With different directions for desktop and mobile, it follows the desktop direction.",
													"slide-blocks",
												)}
											</Notice>
										)}
								</div>
								<ToggleControl
									label={__("Parallax Slide", "slide-blocks")}
									checked={parallax_obj != null}
									onChange={(newVal) => {
										if (newVal) {
											setAttributes({
												parallax_obj: {
													type:
														slideInfo.singleDirection === "horizontal"
															? "x"
															: "y",
													scale: 50,
													unit: "%",
												},
											});
										} else {
											setAttributes({ parallax_obj: null });
										}
									}}
								/>
							</>
						)}
						{slideInfo.effect === "slide_single_view" &&
							parallax_obj != null && (
								<>
									<RangeControl
										label={__("Parallax Area(%)", "slide-blocks")}
										value={parallax_obj?.scale ? parallax_obj.scale : 0}
										max={100}
										min={0}
										step={10}
										onChange={(newVal) =>
											setAttributes({
												parallax_obj: {
													type:
														slideInfo.singleDirection === "horizontal"
															? "x"
															: "y",
													scale: newVal,
													unit: "%",
												},
											})
										}
										withInputField={true}
									/>
								</>
							)}
						{slideInfo.effect === "fade_single_view" && (
							<>
								<div className="itmar_title_type">
									<RadioControl
										label={__("Fade Motion", "slide-blocks")}
										selected={slideInfo.fadeMotion}
										options={[
											{ label: __("None", "slide-blocks"), value: "none" },
											{ label: __("Zoom Up", "slide-blocks"), value: "zoomUp" },
										]}
										onChange={(newVal) => {
											setAttributes({
												slideInfo: { ...slideInfo, fadeMotion: newVal },
											});
										}}
									/>
								</div>
							</>
						)}
						{slideInfo.effect === "fade_single_view" &&
							slideInfo.fadeMotion === "zoomUp" && (
								<>
									<RangeControl
										label={__("Zoom Scale", "slide-blocks")}
										value={parallax_obj?.scale ? parallax_obj.scale : 1}
										max={3}
										min={1}
										step={0.1}
										onChange={(newVal) =>
											setAttributes({
												parallax_obj: {
													type: "scale",
													scale: newVal,
													unit: "",
												},
											})
										}
										withInputField={true}
									/>
								</>
							)}
						{(slideInfo.effect === "none" ||
							slideInfo.effect === "slide_single_view" ||
							slideInfo.effect === "fade_single_view") && (
							<>
								<RangeControl
									label={__("Speed", "slide-blocks")}
									value={slideInfo.slideSpeed}
									max={10000}
									min={0}
									step={100}
									onChange={(newVal) =>
										setAttributes({
											slideInfo: { ...slideInfo, slideSpeed: newVal },
										})
									}
									withInputField={true}
								/>
							</>
						)}
						{slideInfo.effect === "cube" && (
							<ToggleControl
								label={__("Zoom Up", "slide-blocks")}
								checked={slideInfo.cubeZoom}
								onChange={(newVal) => {
									setAttributes({
										slideInfo: { ...slideInfo, cubeZoom: newVal },
									});
								}}
							/>
						)}
					</PanelBody>

					<PanelBody
						title={__("Navigation Setting", "slide-blocks")}
						initialOpen={false}
					>
						<ToggleControl
							label={__("Display", "slide-blocks")}
							checked={slideInfo.navigation.disp}
							onChange={(newVal) => {
								setAttributes({
									slideInfo: {
										...slideInfo,
										navigation: { ...slideInfo.navigation, disp: newVal },
									},
								});
							}}
						/>
						{slideInfo.navigation.disp && (
							<>
								<div className="itmar_title_type">
									<RadioControl
										label={__("Display Design", "slide-blocks")}
										selected={slideInfo.navigation.design}
										options={[
											{
												label: __("Default", "slide-blocks"),
												value: "default",
											},
											{ label: __("Circle", "slide-blocks"), value: "circle" },
										]}
										onChange={(newVal) => {
											setAttributes({
												slideInfo: {
													...slideInfo,
													navigation: {
														...slideInfo.navigation,
														design: newVal,
													},
												},
											});
										}}
									/>
								</div>

								<UnitControl
									dragDirection="e"
									onChange={(newVal) =>
										setAttributes(
											!isMobile
												? {
														slideInfo: {
															...slideInfo,
															navigation: {
																...slideInfo.navigation,
																defaultSize: newVal,
															},
														},
												  }
												: {
														slideInfo: {
															...slideInfo,
															navigation: {
																...slideInfo.navigation,
																mobileSize: newVal,
															},
														},
												  },
										)
									}
									label={
										!isMobile
											? __("Button Size(desk top)", "block-collections")
											: __("Button Size(mobile)", "block-collections")
									}
									value={
										!isMobile
											? slideInfo.navigation.defaultSize
											: slideInfo.navigation.mobileSize
									}
								/>

								<RangeControl
									label={
										!isMobile
											? __("Horizen position(desk top)", "slide-blocks")
											: __("Horizen position(mobile)", "slide-blocks")
									}
									value={
										!isMobile
											? slideInfo.navigation.defaultHorizonPos
											: slideInfo.navigation.mobileHorizenPos
									}
									max={10}
									min={-10}
									step={0.5}
									onChange={(newVal) =>
										setAttributes(
											!isMobile
												? {
														slideInfo: {
															...slideInfo,
															navigation: {
																...slideInfo.navigation,
																defaultHorizonPos: newVal,
															},
														},
												  }
												: {
														slideInfo: {
															...slideInfo,
															navigation: {
																...slideInfo.navigation,
																mobileHorizenPos: newVal,
															},
														},
												  },
										)
									}
									withInputField={true}
								/>
								<RangeControl
									label={
										!isMobile
											? __("Vertical position(desk top)", "slide-blocks")
											: __("Vertical position(mobile)", "slide-blocks")
									}
									value={
										!isMobile
											? slideInfo.navigation.defaultVertPos
											: slideInfo.navigation.mobileVertPos
									}
									max={95}
									min={5}
									step={5}
									onChange={(newVal) =>
										setAttributes(
											!isMobile
												? {
														slideInfo: {
															...slideInfo,
															navigation: {
																...slideInfo.navigation,
																defaultVertPos: newVal,
															},
														},
												  }
												: {
														slideInfo: {
															...slideInfo,
															navigation: {
																...slideInfo.navigation,
																mobileVertPos: newVal,
															},
														},
												  },
										)
									}
									withInputField={true}
								/>
								<ToggleControl
									label={__("Hover Appear", "slide-blocks")}
									checked={slideInfo.navigation.hoverAppear}
									onChange={(newVal) => {
										setAttributes({
											slideInfo: {
												...slideInfo,
												navigation: {
													...slideInfo.navigation,
													hoverAppear: newVal,
												},
											},
										});
									}}
								/>
							</>
						)}
						{slideInfo.navigation.disp &&
							slideInfo.navigation.design != "default" && (
								<>
									<PanelColorGradientSettings
										title={__("Background Color Setting", "slide-blocks")}
										settings={[
											{
												colorValue: slideInfo.navigation.bgColor,
												gradientValue: slideInfo.navigation.bgGradient,
												label: __("Choose Background color", "slide-blocks"),

												onColorChange: (newValue) => {
													setNavigationBgColor(newValue);
												},
												onGradientChange: (newValue) => {
													setNavigationBgGradient(newValue);
												},
											},
										]}
									/>
									<ToggleControl
										label={__("Is Shadow", "slide-blocks")}
										checked={slideInfo.navigation.is_shadow}
										onChange={(newVal) => {
											setAttributes({
												slideInfo: {
													...slideInfo,
													navigation: {
														...slideInfo.navigation,
														is_shadow: newVal,
													},
												},
											});
										}}
									/>
								</>
							)}
						{slideInfo.navigation.disp &&
							slideInfo.navigation.design != "default" &&
							slideInfo.navigation.is_shadow && (
								<ShadowStyle
									shadowStyle={{ ...slideInfo.navigation.shadow_element }}
									onChange={(newStyle, newState) => {
										setAttributes({
											slideInfo: {
												...slideInfo,
												navigation: {
													...slideInfo.navigation,
													shadow_element: newState,
													shadow_result: newStyle.style,
												},
											},
										});
									}}
								/>
							)}
					</PanelBody>

					<PanelBody
						title={__("Pagenation Setting", "slide-blocks")}
						initialOpen={false}
					>
						<ToggleControl
							label={__("Display", "slide-blocks")}
							checked={slideInfo.pagination.disp}
							onChange={(newVal) => {
								setAttributes({
									slideInfo: {
										...slideInfo,
										pagination: { ...slideInfo.pagination, disp: newVal },
									},
								});
							}}
						/>
						{slideInfo.pagination.disp && (
							<div className="itmar_title_type">
								<RadioControl
									label={__("Design type", "slide-blocks")}
									selected={slideInfo.pagination.design}
									options={[
										{ label: __("Default", "slide-blocks"), value: "default" },
										{ label: __("Bar", "slide-blocks"), value: "bar" },
									]}
									onChange={(newVal) => {
										setAttributes({
											slideInfo: {
												...slideInfo,
												pagination: { ...slideInfo.pagination, design: newVal },
											},
										});
									}}
								/>
							</div>
						)}
					</PanelBody>
					<PanelBody
						title={__("ScrollBar Setting", "slide-blocks")}
						initialOpen={false}
					>
						<ToggleControl
							label={__("Display", "slide-blocks")}
							checked={slideInfo.scrollbar.disp}
							onChange={(newVal) => {
								setAttributes({
									slideInfo: {
										...slideInfo,
										scrollbar: { ...slideInfo.scrollbar, disp: newVal },
									},
								});
							}}
						/>
					</PanelBody>
				</PanelBody>
			</InspectorControls>

			<InspectorControls group="styles">
				<PanelBody
					title={__("Content Style", "slide-blocks")}
					initialOpen={true}
					className="form_design_ctrl"
				>
					<BlockWidth
						attributes={attributes}
						isMobile={isMobile}
						onWidthChange={(key, value) => {
							setAttributes(
								!isMobile
									? { default_val: { ...default_val, [key]: value } }
									: { mobile_val: { ...mobile_val, [key]: value } },
							);
						}}
						onFreeWidthChange={(key, value) => {
							setAttributes(
								!isMobile
									? { default_val: { ...default_val, [key]: value } }
									: { mobile_val: { ...mobile_val, [key]: value } },
							);
						}}
					/>

					<BlockHeight
						attributes={attributes}
						isMobile={isMobile}
						onHeightChange={(value) => {
							setAttributes(
								!isMobile
									? { default_val: { ...default_val, height_val: value } }
									: { mobile_val: { ...mobile_val, height_val: value } },
							);
						}}
						onFreeHeightChange={(value) => {
							setAttributes(
								!isMobile
									? { default_val: { ...default_val, free_height: value } }
									: { mobile_val: { ...mobile_val, free_height: value } },
							);
						}}
					/>

					<BoxControl
						label={
							!isMobile
								? __("Padding settings(desk top)", "slide-blocks")
								: __("Padding settings(mobile)", "slide-blocks")
						}
						values={
							!isMobile
								? default_val.padding_content
								: mobile_val.padding_content
						}
						onChange={(value) =>
							setAttributes(
								!isMobile
									? { default_val: { ...default_val, padding_content: value } }
									: { mobile_val: { ...mobile_val, padding_content: value } },
							)
						}
						units={units} // 許可する単位
						allowReset={true} // リセットの可否
						resetValues={
							!isMobile ? padding_resetValues : padding_mobile_resetValues
						} // リセット時の値
					/>

					<BorderRadiusControl
						values={radius_slide}
						onChange={(newBrVal) =>
							setAttributes({
								radius_slide:
									typeof newBrVal === "string" ? { value: newBrVal } : newBrVal,
							})
						}
					/>

					<ToggleControl
						label={__("Is Shadow", "slide-blocks")}
						checked={is_shadow}
						onChange={(newVal) => {
							setAttributes({ is_shadow: newVal });
						}}
					/>
					{is_shadow && (
						<ShadowStyle
							shadowStyle={{ ...shadow_element }}
							onChange={(newStyle, newState) => {
								setAttributes({ shadow_result: newStyle.style });
								setAttributes({ shadow_element: newState });
							}}
						/>
					)}
				</PanelBody>
			</InspectorControls>

			<BlockControls>
				<ToolbarDropdownMenu
					label={__("Lateral Position", "slide-blocks")}
					icon={
						(!isMobile ? default_val.lat_pos : mobile_val.lat_pos)
							? alignIconMap[
									!isMobile ? default_val.lat_pos : mobile_val.lat_pos
							  ]
							: alignIconMap["center"]
					}
					controls={["left", "center", "right"].map((align) => ({
						icon: alignIconMap[align],
						isActive:
							(!isMobile ? default_val.lat_pos : mobile_val.lat_pos) === align,
						onClick: () =>
							setAttributes(
								!isMobile
									? { default_val: { ...default_val, lat_pos: align } }
									: { mobile_val: { ...mobile_val, lat_pos: align } },
							),
					}))}
				/>
			</BlockControls>

			<div className={`itmar-slide-mv-style-root ${editorStyleClass}`}>
				<style>{editorStyleCss}</style>
				<div {...blockProps}>
					<div className="swiper" ref={swiperRef}>
						<div {...innerBlocksProps}></div>
					</div>
					{/* <!-- ナビゲーションボタンの表示 --> */}
					<div className={`swiper-button-prev ${swiper_id}-prev`}></div>
					<div className={`swiper-button-next ${swiper_id}-next`}></div>
					{/* <!-- ページネーションの表示 --> */}
					<div className={`swiper-pagination ${swiper_id}-pagination`}></div>
					{/* <!-- スクロールバーの表示 --> */}
					<div className={`swiper-scrollbar ${swiper_id}-scrollbar`}></div>
				</div>
			</div>
		</>
	);
}
