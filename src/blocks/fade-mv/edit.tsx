import { __ } from "@wordpress/i18n";
import vegas from "vegas";
import "vegas/dist/vegas.css";
import {
	useBlockProps,
	InspectorControls,
	BlockControls,
} from "@wordpress/block-editor";
import {
	PanelBody,
	ToggleControl,
	RangeControl,
	RadioControl,
	ToolbarDropdownMenu,
	__experimentalBoxControl as BoxControl,
} from "@wordpress/components";
import { createFadeStyleCss } from "./StyleFade";
import {
	SLIDER_FRAME_ANIMATION_DURATION,
	getSliderFrameStyle,
	getRoundedFrameMorphValues,
	getRoundedFramePath,
	getRoundedFrameStepValues,
	getRoundedWindowTransforms,
	ROUNDED_FRAME_MORPH_DURATION,
	ROUNDED_FRAME_STEP_DURATION,
	type FrameAnimationMode,
	type FrameType,
	type RoundedWindowLayout,
} from "./framePresets";
import {
	MultiImageSelect,
	ShadowStyle,
	ShadowElm,
	DraggableBox,
	useDraggingMove,
	useElementBackgroundColor,
	useIsIframeMobile,
	BlockWidth,
	BlockHeight,
} from "itmar-block-packages";

import "./editor.scss";
import { useEffect, useRef } from "@wordpress/element";
import { justifyCenter, justifyLeft, justifyRight } from "@wordpress/icons";

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

// アイコンと文字列キーのマッピングを作成
const alignIconMap = {
	left: justifyLeft,
	center: justifyCenter,
	right: justifyRight,
};

export default function Edit(props) {
	const { attributes, setAttributes, clientId } = props;
	const { default_val, mobile_val, shadow_element, is_shadow, slide_settings } =
		attributes;
	const frameType: FrameType = attributes.frameType ?? "none";
	const frameAnimationMode: FrameAnimationMode =
		attributes.frameAnimationMode ?? "continuous";
	const frameAnimationDelay = Number(attributes.frameAnimationDelay ?? 250);
	const frameMorphDuration = Number(
		attributes.frameMorphDuration ?? ROUNDED_FRAME_STEP_DURATION,
	);
	const frameWindowLayout: RoundedWindowLayout =
		attributes.frameWindowLayout ?? "single";
	const roundedWindowTransforms = getRoundedWindowTransforms(frameWindowLayout);
	const sliderFrameTopOffset = attributes.sliderFrameTopOffset ?? 0;
	const sliderFrameBottomOffset = attributes.sliderFrameBottomOffset ?? 0;
	const sliderFrameStyle = getSliderFrameStyle(
		sliderFrameTopOffset,
		sliderFrameBottomOffset,
	);
	const sliderAnimationDelay = attributes.sliderAnimationDelay ?? 0;
	const safeClientId = clientId.replace(/[^a-zA-Z0-9_-]/g, "");
	const frameMaskId = `itmar-fade-rounded-mask-${safeClientId}`;

	//スライドの参照
	const slideRef = useRef(null);
	const vegasInstance = useRef(null);
	const frameMaskRef = useRef(null) as {
		current: SVGMaskElement | null;
	};

	const frameMorphTimerRef = useRef(null) as {
		current: number | null;
	};
	const sliderBandRef = useRef(null) as {
		current: HTMLDivElement | null;
	};
	const sliderAnimationTimerRef = useRef(null) as {
		current: number | null;
	};
	//モバイルの判定
	const isMobile = useIsIframeMobile();

	//ブロックの参照
	const blockRef = useRef(null);
	const editorStyleClass = `itmar-fade-editor-${safeClientId}`;
	const editorStyleCss = createFadeStyleCss(attributes, `.${editorStyleClass}`);

	//blockPropsの参照
	const blockProps = useBlockProps({
		ref: blockRef,
		className: editorStyleClass,
	});

	//背景色の取得
	const baseColor = useElementBackgroundColor(blockRef, blockProps.style);

	//背景色変更によるシャドー属性の書き換え
	useEffect(() => {
		const sliderElement = sliderBandRef.current?.parentElement?.querySelector(
			".mv-slider",
		) as HTMLElement | null;
		if (!sliderElement) return;

		Object.entries(sliderFrameStyle).forEach(([property, value]) => {
			sliderElement.style.setProperty(property, value);
		});
	}, [sliderFrameTopOffset, sliderFrameBottomOffset]);

	const triggerSliderFrame = () => {
		const sliderBand = sliderBandRef.current;
		if (frameType !== "slider" || !sliderBand) return;
		const animationDelay = Number.parseFloat(sliderBand.style.animationDelay) || 0;

		if (sliderAnimationTimerRef.current !== null) {
			window.clearTimeout(sliderAnimationTimerRef.current);
		}
		sliderBand.classList.remove("is-slide-start");
		void sliderBand.offsetWidth;
		sliderBand.classList.add("is-slide-start");
		sliderAnimationTimerRef.current = window.setTimeout(() => {
			sliderBand.classList.remove("is-slide-start");
			sliderAnimationTimerRef.current = null;
		}, SLIDER_FRAME_ANIMATION_DURATION + animationDelay);
	};

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

	//移動可能ブロックならドラッグのカスタムフックを付加
	const handlePositionChange = (newPos) => {
		setAttributes(
			!isMobile
				? { default_val: { ...default_val, position: newPos } }
				: { mobile_val: { ...mobile_val, position: newPos } },
		);
	};
	useDraggingMove(
		!isMobile ? default_val.is_moveable : mobile_val.is_moveable,
		blockRef,
		!isMobile ? default_val.position : mobile_val.position,
		handlePositionChange,
	);

	const triggerRoundedFrameMorph = (index: number) => {
		if (frameType !== "rounded" || frameAnimationMode !== "onChange") {
			return;
		}

		if (frameMorphTimerRef.current !== null) {
			window.clearTimeout(frameMorphTimerRef.current);
		}
		frameMorphTimerRef.current = window.setTimeout(() => {
			const pathElements =
				frameMaskRef.current?.querySelectorAll<SVGPathElement>(
					".mv-frame-clip-path",
				);
			pathElements?.forEach((pathElement, windowIndex) => {
				pathElement.setAttribute("d", getRoundedFramePath(index + windowIndex));
				const animateElement = pathElement.querySelector(".mv-frame-morph") as
					| (SVGElement & { beginElement?: () => void })
					| null;
				if (!animateElement) return;

				animateElement.setAttribute(
					"values",
					getRoundedFrameStepValues(index, windowIndex),
				);
				animateElement.setAttribute("dur", `${frameMorphDuration}ms`);
				animateElement.beginElement?.();
			});
			frameMorphTimerRef.current = null;
		}, frameAnimationDelay);
	};

	//vegasの初期化・再設定
	useEffect(() => {
		const sliderElement = slideRef.current;
		if (!sliderElement) return;

		const render_media = isMobile ? mobile_val.media : default_val.media;
		const slideArray = render_media
			.filter((item) => item.url)
			.map((item) => ({ src: item.url }));

		vegasInstance.current?.destroy();

		vegasInstance.current = vegas(
			sliderElement,
			slideArray.length !== 0
				? {
						overlay: false,
						transition: slide_settings.transition,
						transitionDuration: slide_settings.transition_duration,
						animationDuration: slide_settings.animation_duration,
						animation: slide_settings.animation,
						slides: slideArray,
						timer: slide_settings.is_timer,
						walk: (index: number) => {
					triggerRoundedFrameMorph(index);
					triggerSliderFrame();
						},
				  }
				: {
						cover: false,
						slides: [{ src: `${slide_blocks.plugin_url}/assets/no-image.png` }],
				  },
		);

		return () => {
			if (frameMorphTimerRef.current !== null) {
				window.clearTimeout(frameMorphTimerRef.current);
				frameMorphTimerRef.current = null;
			}
			if (sliderAnimationTimerRef.current !== null) {
				window.clearTimeout(sliderAnimationTimerRef.current);
				sliderAnimationTimerRef.current = null;
			}
			vegasInstance.current?.destroy();
			vegasInstance.current = null;
		};
	}, [
		default_val.media,
		mobile_val.media,
		slide_settings,
		isMobile,
		frameType,
		frameAnimationMode,
		frameAnimationDelay,
		frameMorphDuration,
		frameWindowLayout,
	]);

	return (
		<>
			<InspectorControls group="settings">
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
								mobile_val: { ...mobile_val, mediaID: media_ID, media: media },
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
				<PanelBody
					title={__("Slide Settings", "slide-blocks")}
					initialOpen={true}
					className="form_design_ctrl"
				>
					<div className="itmar_link_type">
						<RadioControl
							label={__("Transition", "slide-blocks")}
							selected={slide_settings.transition}
							options={[
								{ label: "fade", value: "fade" },
								{ label: "slideLeft", value: "slideLeft" },
								{ label: "slideRight", value: "slideRight" },
								{ label: "slideUp", value: "slideUp" },
								{ label: "slideDown", value: "slideDown" },
								{ label: "zoomIn", value: "zoomIn" },
								{ label: "zoomOut", value: "zoomOut" },
								{ label: "swirlLeft", value: "swirlLeft" },
								{ label: "swirlRight", value: "swirlRight" },
								{ label: "burn", value: "burn" },
								{ label: "flash", value: "flash" },
								{ label: "blur", value: "blur" },
							]}
							onChange={(changeOption) =>
								setAttributes({
									slide_settings: {
										...slide_settings,
										transition: changeOption,
									},
								})
							}
						/>
						<RangeControl
							value={slide_settings.transition_duration}
							label={__("Transition Duration", "slide-blocks")}
							max={5000}
							min={1000}
							step={500}
							onChange={(val) => {
								setAttributes({
									slide_settings: {
										...slide_settings,
										transition_duration: val,
									},
								});
							}}
							withInputField={true}
						/>
					</div>
					<div className="itmar_link_type">
						<RadioControl
							selected={slide_settings.animation}
							label={__("Animation", "slide-blocks")}
							options={[
								{ label: "kenburns", value: "kenburns" },
								{ label: "kenburnsUp", value: "kenburnsUp" },
								{ label: "kenburnsDown", value: "kenburnsDown" },
								{ label: "kenburnsRight", value: "kenburnsRight" },
								{ label: "kenburnsLeft", value: "kenburnsLeft" },
								{ label: "kenburnsUpLeft", value: "kenburnsUpLeft" },
								{ label: "kenburnsUpRight", value: "kenburnsUpRight" },
								{ label: "kenburnsDownLeft", alue: "kenburnsDownLeft" },
								{ label: "kenburnsDownRight", value: "kenburnsDownRight" },
								{ label: "random", value: "random" },
							]}
							onChange={(changeOption) =>
								setAttributes({
									slide_settings: {
										...slide_settings,
										animation: changeOption,
									},
								})
							}
						/>
					</div>
					<div className="itmar_link_type">
						<RangeControl
							value={slide_settings.animation_duration}
							label={__("Animation Duration", "slide-blocks")}
							max={50000}
							min={10000}
							step={1000}
							onChange={(val) => {
								setAttributes({
									slide_settings: {
										...slide_settings,
										animation_duration: val,
									},
								});
							}}
							withInputField={true}
						/>
					</div>

					<ToggleControl
						label={__("Is Timer Display", "slide-blocks")}
						checked={slide_settings.is_timer}
						onChange={(newVal) => {
							setAttributes({
								slide_settings: { ...slide_settings, is_timer: newVal },
							});
						}}
					/>
				</PanelBody>
				<PanelBody
					title={__("Frame Settings", "slide-blocks")}
					initialOpen={false}
				>
					<div className="itmar_link_type">
						<RadioControl
							selected={(attributes.frameType ?? "none") as FrameType}
							options={[
								{ label: __("None", "slide-blocks"), value: "none" },
								{ label: __("Slider", "slide-blocks"), value: "slider" },
								{ label: __("Rounded", "slide-blocks"), value: "rounded" },
							]}
							onChange={(value) =>
								setAttributes({ frameType: value as FrameType })
							}
						/>
					</div>

					<RangeControl
						label={__("Background Opacity", "slide-blocks")}
						value={attributes.frameBackgroundOpacity ?? 1}
						min={0}
						max={1}
						step={0.05}
						onChange={(value) =>
							setAttributes({ frameBackgroundOpacity: value })
						}
						withInputField={true}
					/>

				{frameType === "slider" && (
					<>
						<RangeControl
							label={__("Upper Line Offset (%)", "slide-blocks")}
							value={sliderFrameTopOffset}
							onChange={(value) =>
								setAttributes({ sliderFrameTopOffset: value ?? 0 })
							}
							min={-15}
							max={20}
							step={1}
						/>
						<RangeControl
							label={__("Lower Line Offset (%)", "slide-blocks")}
							value={sliderFrameBottomOffset}
							onChange={(value) =>
								setAttributes({ sliderFrameBottomOffset: value ?? 0 })
							}
							min={-20}
							max={20}
							step={1}
						/>
						<RangeControl
						label={__("Slider Delay (ms)", "slide-blocks")}
						value={sliderAnimationDelay}
						onChange={(value) =>
							setAttributes({ sliderAnimationDelay: value ?? 0 })
						}
						min={0}
						max={2000}
							step={50}
						/>
					</>
				)}
				{frameType === "rounded" && (
						<>
							<div className="itmar_link_type">
								<RadioControl
									label={__("Window Layout", "slide-blocks")}
									selected={frameWindowLayout}
									options={[
										{ label: __("Single", "slide-blocks"), value: "single" },
										{ label: __("3 Windows", "slide-blocks"), value: "triple" },
										{
											label: __("5 Windows", "slide-blocks"),
											value: "quintuple",
										},
									]}
									onChange={(value) =>
										setAttributes({
											frameWindowLayout: value as RoundedWindowLayout,
										})
									}
								/>
								<RadioControl
									label={__("Frame Animation", "slide-blocks")}
									selected={frameAnimationMode}
									options={[
										{
											label: __("Continuous", "slide-blocks"),
											value: "continuous",
										},
										{
											label: __("On Image Change", "slide-blocks"),
											value: "onChange",
										},
									]}
									onChange={(value) =>
										setAttributes({
											frameAnimationMode: value as FrameAnimationMode,
										})
									}
								/>
							</div>
							{frameAnimationMode === "onChange" && (
								<>
									<div className="itmar_link_type">
										<RangeControl
											label={__("Animation Delay", "slide-blocks")}
											value={frameAnimationDelay}
											min={0}
											max={2000}
											step={100}
											onChange={(value) =>
												setAttributes({ frameAnimationDelay: value })
											}
											withInputField={true}
										/>
									</div>
									<div className="itmar_link_type">
										<RangeControl
											label={__("Morph Duration", "slide-blocks")}
											value={frameMorphDuration}
											min={500}
											max={4000}
											step={100}
											onChange={(value) =>
												setAttributes({ frameMorphDuration: value })
											}
											withInputField={true}
										/>
									</div>
								</>
							)}
						</>
					)}
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
					title={
						!isMobile
							? __("Position moveable(desk top)", "slide-blocks")
							: __("Position moveable(mobile)", "slide-blocks")
					}
					initialOpen={true}
				>
					<ToggleControl
						label={__("make it moveable", "slide-blocks")}
						checked={
							!isMobile ? default_val.is_moveable : mobile_val.is_moveable
						}
						onChange={(value) => {
							setAttributes(
								!isMobile
									? { default_val: { ...default_val, is_moveable: value } }
									: { mobile_val: { ...mobile_val, is_moveable: value } },
							);
						}}
					/>
					{(!isMobile ? default_val.is_moveable : mobile_val.is_moveable) && (
						<DraggableBox
							attributes={
								!isMobile ? default_val.position : mobile_val.position
							}
							onPositionChange={(pos) =>
								setAttributes(
									!isMobile
										? { default_val: { ...default_val, position: pos } }
										: { mobile_val: { ...mobile_val, position: pos } },
								)
							}
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

			<div {...blockProps}>
				<style>{editorStyleCss}</style>
				<svg
					className="mv-frame-defs"
					width="0"
					height="0"
					aria-hidden="true"
					focusable="false"
				>
					<defs>
						<mask
							ref={frameMaskRef}
							id={frameMaskId}
							maskUnits="objectBoundingBox"
							maskContentUnits="objectBoundingBox"
							style={{ maskType: "luminance" }}
						>
							<rect x="0" y="0" width="1" height="1" fill="white" />
							{roundedWindowTransforms.map((transform, windowIndex) => (
								<path
									key={`${frameWindowLayout}-${windowIndex}`}
									className="mv-frame-clip-path"
									transform={transform || undefined}
									fill="black"
									d={getRoundedFramePath(windowIndex)}
								>
									<animate
										className="mv-frame-morph"
										attributeName="d"
										attributeType="XML"
										begin={
											frameAnimationMode === "continuous" ? "0s" : "indefinite"
										}
										dur={`${
											frameAnimationMode === "continuous"
												? ROUNDED_FRAME_MORPH_DURATION
												: frameMorphDuration
										}ms`}
										repeatCount={
											frameAnimationMode === "continuous" ? "indefinite" : "1"
										}
										fill={
											frameAnimationMode === "continuous" ? "remove" : "freeze"
										}
										values={
											frameAnimationMode === "continuous"
												? getRoundedFrameMorphValues(windowIndex)
												: getRoundedFrameStepValues(0, windowIndex)
										}
										calcMode="spline"
										keyTimes={
											frameAnimationMode === "continuous"
												? "0;0.25;0.5;0.75;1"
												: "0;1"
										}
										keySplines={
											frameAnimationMode === "continuous"
												? "0.42 0 0.58 1;0.42 0 0.58 1;0.42 0 0.58 1;0.42 0 0.58 1"
												: "0.42 0 0.58 1"
										}
									/>
								</path>
							))}
						</mask>
					</defs>
				</svg>
				<div
					id="mv-slider-area"
					className="mv-frame"
					data-frame-type={frameType}
					style={{
						transitionDuration: `${slide_settings.transition_duration}ms`,
					}}
				>
					<div id="mv-slider" className="mv-slider" ref={slideRef}></div>
				{frameType === "slider" && (
					<>
						<div
							ref={sliderBandRef}
							className="mv-slider-band"
							data-frame-top-offset={sliderFrameTopOffset}
							data-frame-bottom-offset={sliderFrameBottomOffset}
							style={{ animationDelay: `${sliderAnimationDelay}ms` }}
						/>
						<div className="mv-slider-triangle" />
					</>
				)}
				{frameType === "rounded" && (
					<div
						className="mv-frame-overlay"
							style={{
								WebkitMask: `url(#${frameMaskId})`,
								mask: `url(#${frameMaskId})`,
							}}
						/>
					)}
				</div>
			</div>
		</>
	);
}
