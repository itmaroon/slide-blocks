import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls,
} from "@wordpress/block-editor";
import {
	PanelBody,
	ToggleControl,
	RangeControl,
	RadioControl,
	__experimentalBoxControl as BoxControl,
} from "@wordpress/components";
import { createMasonryStyleCss } from "./StyleMasonry";
import {
	MultiImageSelect,
	ShadowStyle,
	ShadowElm,
	useElementBackgroundColor,
	useIsIframeMobile,
	BlockWidth,
	BlockHeight,
	FieldChoiceControl,
	flattenBlocks,
	MasonryControl,
} from "itmar-block-packages";

import "./editor.scss";
import {
	useEffect,
	useMemo,
	useRef,
} from "@wordpress/element";
import { useSelect, useDispatch } from "@wordpress/data";
import { createBlock } from "@wordpress/blocks";

import featuredPlaceholderUrl from "../../../assets/feature_img.png";
import contentPlaceholderUrl from "../../../assets/content_img.png";
import customPlaceholderUrl from "../../../assets/custom_img.png";

//スペースのリセットバリュー
const padding_resetValues = {
	top: "0px",
	left: "0px",
	right: "0px",
	bottom: "0px",
};

const padding_mobile_resetValues = {
	top: "20px",
	left: "10px",
	right: "10px",
	bottom: "20px",
};

//単位のリセットバリュー
const units = [
	{ value: "px", label: "px" },
	{ value: "em", label: "em" },
	{ value: "rem", label: "rem" },
];

//プレースホルダーのイメージ
const placefoler_image = {
	featured: {
		url: featuredPlaceholderUrl,
		type: "image",
	},
	content: {
		url: contentPlaceholderUrl,
		type: "image",
	},
	custom: {
		url: customPlaceholderUrl,
		type: "image",
	},
};

export default function Edit(props) {
	const { attributes, setAttributes, clientId } = props;
	const {
		sourceType,
		choiceFields,
		default_val,
		mobile_val,
		shadow_element,
		shadow_image,
		is_shadow,
		is_image_shadow,
	} = attributes;

	//モバイルの判定
	const isMobile = useIsIframeMobile();

	// ブロック外側ラッパー用（背景色取得とかに使うならこっち）
	const blockRef = useRef(null);
	const editorStyleClass = `itmar-masonry-editor-${clientId.replace(
		/[^a-zA-Z0-9_-]/g,
		"",
	)}`;
	const editorStyleCss = createMasonryStyleCss(
		attributes,
		`.${editorStyleClass}`,
	);

	// @wordpress/element のローカル型宣言では useRef が any のため、
	// 型引数ではなく戻り値側で参照要素の型を指定する
	const gridRef = useRef(null) as { current: HTMLDivElement | null };

	const blockProps = useBlockProps({
		ref: blockRef,
	});

	//インナーブロックのひな型を用意
	const TEMPLATE = [];
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: ["itmar/design-group"],
		template: TEMPLATE,
		templateLock: false,
	});

	//背景色の取得
	const baseColor = useElementBackgroundColor(blockRef, blockProps.style);

	const activeVal = !isMobile ? default_val : mobile_val;
	const columnWidthPercent = 100 / (activeVal.columns || 1);
	//Dynmicの場合のプレースホルダー作成関数
	const createPlaceholderImages = (choiceFields) => {
		const placeholder_images = [];

		choiceFields.forEach((field) => {
			if (field === "content") {
				// content の場合は 3 個
				for (let i = 0; i < 3; i++) {
					placeholder_images.push({ ...placefoler_image.content });
				}
			} else if (field === "featured_media") {
				// featured_media は 1 個
				placeholder_images.push({ ...placefoler_image.featured });
			} else if (field.startsWith("acf_")) {
				// acf_* 系は 1 個
				const acfKey = field.slice(4); // "acf_" 以降の文字列を取り出す（例: "acf_gallery" → "gallery"）

				placeholder_images.push({
					...placefoler_image.custom,
					type: acfKey, // ★ type を acf_ 以下の文字列に置き換える
				});
			}
		});

		return placeholder_images;
	};

	// モバイル画像が未設定の場合は、デスクトップ画像を表示に使用する
	const activeMedia =
		isMobile && mobile_val?.media?.length
			? mobile_val.media
			: default_val?.media || [];

	// 同じ入力からは同じ配列を返し、Masonry の不要な再初期化を防ぐ
	const source_medias = useMemo(
		() =>
			sourceType === "static"
				? activeMedia
				: createPlaceholderImages(choiceFields || []),
		[sourceType, activeMedia, choiceFields],
	);

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

	// MasonryControl 内部の imagesLoaded に画像読み込み待機を任せる
	useEffect(() => {
		const gridEl = gridRef.current;

		// コンテナがまだない / 画像が一枚もないときは何もしない
		if (!gridEl || !source_medias.length) {
			return;
		}

		let animationFrameId: number | undefined;
		let retryTimerId: number | undefined;
		let retryCount = 0;
		let cancelled = false;
		let msnry;

		// MasonryControl 用に必要な情報だけ抽出
		const imagesForMasonry = source_medias.map((m) => ({
			url: m.url,
			alt: m.alt || "",
		}));

		const initializeMasonry = () => {
			if (cancelled) return;

			const gridWindow = gridEl.ownerDocument.defaultView as
				| (Window & { Masonry?: unknown; imagesLoaded?: unknown })
				| null;

			// 初回描画時はライブラリがまだ iframe に読み込まれていないことがある。
			// React の依存値は変化しないため、準備完了まで短時間だけ再試行する。
			if (!gridWindow?.Masonry || !gridWindow.imagesLoaded) {
				if (retryCount < 100) {
					retryCount += 1;
					retryTimerId = window.setTimeout(initializeMasonry, 50);
				}
				return;
			}

			msnry = MasonryControl(gridEl, imagesForMasonry, {
				columns: activeVal.columns || 1,
				renderItems: false, // JSX 側で <figure> を描画しているので false
			});
		};

		// JSX の更新がDOMへ反映された次のフレームで初期化する
		animationFrameId = requestAnimationFrame(() => {
			initializeMasonry();
		});

		return () => {
			cancelled = true;
			if (animationFrameId !== undefined) {
				cancelAnimationFrame(animationFrameId);
			}
			if (retryTimerId !== undefined) {
				window.clearTimeout(retryTimerId);
			}
			if (msnry && typeof msnry.destroy === "function") {
				msnry.destroy();
			}
		};
	}, [source_medias, activeVal.columns]);

	// React が描画した各画像の寸法確定後にも配置を更新する
	const handleMasonryImageLoad = () => {
		const masonryGrid = gridRef.current as
			| (HTMLDivElement & {
					__masonryInstance?: { layout?: () => void };
			  })
			| null;
		masonryGrid?.__masonryInstance?.layout?.();
	};

	const { replaceInnerBlocks } = useDispatch("core/block-editor");

	const { hasPickup, pickupAttributes, swiperBlock } = useSelect(
		(select) => {
			const { getBlock, getBlocks, getBlockParentsByBlockName } =
				select("core/block-editor");

			// このブロックの親の中から、itmar/pickup-posts を探す
			// 第3引数 true で「一番近い親だけ」を返してもらう
			const pickupParents = getBlockParentsByBlockName(
				clientId,
				["itmar/pickup-posts"],
				true,
			);
			//itmar/slide-mvがあればそれを取り出す
			const childBlocks = getBlocks(clientId);
			const flattenChildBlocks = flattenBlocks(childBlocks);
			const slideMvBlock = flattenChildBlocks.find(
				(block) => block.name === "itmar/slide-mv",
			);

			if (!pickupParents.length) {
				return {
					hasPickup: false,
					pickupClientId: null,
					pickupAttributes: null,
				};
			}

			const parentId = pickupParents[0];
			const parentBlock = getBlock(parentId);

			const attrs = parentBlock?.attributes || {};

			return {
				hasPickup: true,
				pickupClientId: parentId,
				pickupAttributes: attrs,
				swiperBlock: slideMvBlock || null,
			};
		},
		[clientId],
	);
	const hasSwiperTemplate = Boolean(
		swiperBlock?.innerBlocks?.[0]?.innerBlocks?.[0],
	);

	//itmar/slide-mvにメディアのデータをimageブロックにして注入
	useEffect(() => {
		if (!swiperBlock || !swiperBlock.clientId) return;

		if (!source_medias.length) return;

		// 1番目の itmar/design-group をテンプレートとして使う
		const templateDesignGroup = swiperBlock.innerBlocks[0];
		const templateImage =
			templateDesignGroup?.innerBlocks && templateDesignGroup.innerBlocks[0];

		const designGroupBaseAttrs = templateDesignGroup?.attributes || {};
		const imageBaseAttrs = templateImage?.attributes || {};
		const imageBaseInnerBlocks = templateImage?.innerBlocks || [];

		// もしテンプレートが無かったら、とりあえず何もしない
		if (!templateDesignGroup || !templateImage) {
			console.warn(
				"[masonry] swiperBlock にテンプレートとなる itmar/design-group / core/image がありません。",
			);
			return;
		}

		// ② source_medias から新しいインナーブロック配列を組み立てる
		const newInnerBlocks = source_medias.map((item) => {
			// core/image の属性 = 元の image 属性をベースに、id/url/alt だけ上書き
			const imageAttrs = {
				...imageBaseAttrs,
				id: item.id,
				url: item.url,
				alt: item.alt ?? imageBaseAttrs.alt ?? "",
			};

			const imageBlock = createBlock(
				"core/image",
				imageAttrs,
				// もし元の core/image の中にさらにインナーブロックがあれば引き継ぐ
				imageBaseInnerBlocks,
			);

			// itmar/design-group の属性 = 元の design-group 属性をコピー
			const designAttrs = {
				...designGroupBaseAttrs,
				// 必要ならここで index ごとの調整もできる
			};
			return createBlock("itmar/design-group", designAttrs, [imageBlock]);
		});

		replaceInnerBlocks(swiperBlock.clientId, newInnerBlocks, false);
	}, [
		swiperBlock?.clientId,
		hasSwiperTemplate, // 子ブロックが遅れて生成された場合にもやり直す
		source_medias,
		replaceInnerBlocks,
	]);

	return (
		<>
			<InspectorControls group="settings">
				<PanelBody
					title={__("Image Source Select", "slide-blocks")}
					initialOpen={true}
					className="form_design_ctrl"
				>
					<div className="itmar_title_type">
						{hasPickup && (
							<RadioControl
								label={__("Sorce Type", "slide-blocks")}
								selected={sourceType}
								options={[
									{ label: __("Static", "slide-blocks"), value: "static" },
									{ label: __("Dynamic", "slide-blocks"), value: "dynamic" },
								]}
								onChange={(changeOption) =>
									setAttributes({
										sourceType: changeOption,
									})
								}
							/>
						)}
					</div>

					{sourceType === "static" && (
						<MultiImageSelect
							attributes={
								!isMobile ? attributes.default_val : attributes.mobile_val
							}
							label={
								!isMobile
									? __("Selected Images(desk top)", "slide-blocks")
									: __("Selected Images(mobile)", "slide-blocks")
							}
							onSelectChange={(media) => {
								// media から map で id プロパティの配列を生成
								const media_ID = media.map((image) => image.id);
								if (!isMobile) {
									setAttributes({
										default_val: {
											...default_val,
											mediaID: media_ID,
											media: media,
										},
									});
								} else {
									setAttributes({
										mobile_val: {
											...mobile_val,
											mediaID: media_ID,
											media: media,
										},
									});
								}
							}}
							onAllDelete={() => {
								if (!isMobile) {
									setAttributes({
										default_val: { ...default_val, mediaID: [], media: [] },
									});
								} else {
									setAttributes({
										mobile_val: { ...mobile_val, mediaID: [], media: [] },
									});
								}
							}}
						/>
					)}
					{sourceType === "dynamic" && (
						<PanelBody
							title={__("Field Source Select", "slide-blocks")}
							initialOpen={true}
							className="form_design_ctrl"
						>
							<FieldChoiceControl
								type="imgField"
								selectedSlug={pickupAttributes?.selectedRest || ""}
								choiceItems={choiceFields}
								blockMap={[]}
								textDomain="slide-blocks"
								onChange={(newChoiceFields) => {
									//選択されたフィールド名の配列を登録
									setAttributes({ choiceFields: newChoiceFields });
								}}
							/>
						</PanelBody>
					)}
				</PanelBody>
				<PanelBody
					title={__("Masonry Option", "slide-blocks")}
					initialOpen={true}
					className="form_design_ctrl"
				>
					<RangeControl
						value={activeVal.columns}
						label={
							!isMobile
								? __("Columns(desk top)", "slide-blocks")
								: __("Columns(mobile)", "slide-blocks")
						}
						max={10}
						min={1}
						step={1}
						onChange={(newVal) => {
							setAttributes(
								!isMobile
									? { default_val: { ...default_val, columns: newVal } }
									: { mobile_val: { ...mobile_val, columns: newVal } },
							);
						}}
						withInputField={true}
					/>
				</PanelBody>
			</InspectorControls>
			<InspectorControls group="styles">
				<PanelBody
					title={__("Whole Block Style", "slide-blocks")}
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
				<PanelBody
					title={__("Individual Image Styles", "slide-blocks")}
					initialOpen={true}
					className="form_design_ctrl"
				>
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
					<ToggleControl
						label={__("Is Shadow", "slide-blocks")}
						checked={is_image_shadow}
						onChange={(newVal) => {
							setAttributes({ is_image_shadow: newVal });
						}}
					/>
					{is_image_shadow && (
						<ShadowStyle
							shadowStyle={{ ...shadow_image }}
							onChange={(newStyle, newState) => {
								setAttributes({ shadow_image_result: newStyle.style });
								setAttributes({ shadow_image: newState });
							}}
						/>
					)}
				</PanelBody>
			</InspectorControls>

			<div className={editorStyleClass}>
				<style>{editorStyleCss}</style>
				<div {...blockProps}>
					<div ref={gridRef} className="itmar-masonry-grid">
						{/* カラム幅の基準になる要素 */}
						<div
							className="itmar-masonry-sizer"
							style={{ width: `${columnWidthPercent}%` }}
						/>

						{/* 画像アイテム */}
						{source_medias.length ? (
							source_medias.map((image, index) => (
								<figure
									key={image.id || index}
									className="itmar-masonry-item"
									style={{
										width: `${columnWidthPercent}%`,
									}}
								>
									<img
										src={image.url}
										alt={image.alt || ""}
										onLoad={handleMasonryImageLoad}
										onError={handleMasonryImageLoad}
										style={{ display: "block", width: "100%", height: "auto" }}
									/>
								</figure>
							))
						) : (
							<p className="itmar-masonry-no-images">
								{__(
									"Please select an image from 'Selected Images' on the right.",
									"slide-blocks",
								)}
							</p>
						)}
					</div>
				</div>
				<div {...innerBlocksProps}></div>
			</div>
		</>
	);
}
