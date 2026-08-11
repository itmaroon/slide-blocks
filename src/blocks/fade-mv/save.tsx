import { useBlockProps } from "@wordpress/block-editor";
import {
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

const removeStyledComponentClasses = (className = "") => {
	const classes = String(className).split(/\s+/).filter(Boolean);

	return classes
		.filter((classValue, index) => {
			if (/^sc-[a-zA-Z0-9]+$/.test(classValue)) return false;
			if (index > 0 && /^sc-[a-zA-Z0-9]+$/.test(classes[index - 1])) {
				return false;
			}
			return true;
		})
		.join(" ");
};

export default function save({ attributes }) {
	const { default_val, mobile_val, slide_settings } = attributes;
	const frameType: FrameType = attributes.frameType ?? "none";
	const frameAnimationMode: FrameAnimationMode =
		attributes.frameAnimationMode ?? "continuous";
	const frameAnimationDelay = Number(attributes.frameAnimationDelay ?? 250);
	const frameMorphDuration = Number(
		attributes.frameMorphDuration ?? ROUNDED_FRAME_STEP_DURATION,
	);
	const frameWindowLayout: RoundedWindowLayout =
		attributes.frameWindowLayout ?? "single";
	const roundedWindowTransforms =
		getRoundedWindowTransforms(frameWindowLayout);
	const frameSettings = {
		animationMode: frameAnimationMode,
		animationDelay: frameAnimationDelay,
		morphDuration: frameMorphDuration,
		windowLayout: frameWindowLayout,
	};
	const className = removeStyledComponentClasses(attributes.className);

	const blockProps = useBlockProps.save({
		className,
		"data-attributes": JSON.stringify(attributes),
	});

	return (
		<div {...blockProps}>
			<svg
				className="mv-frame-defs"
				width="0"
				height="0"
				aria-hidden="true"
				focusable="false"
			>
				<defs>
					<mask
						id="itmar-fade-rounded-mask"
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
										frameAnimationMode === "continuous"
											? "0s"
											: "indefinite"
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
				data-frame-settings={JSON.stringify(frameSettings)}
			>
				<div
					id="mv-slider"
					className="mv-slider"
					data-default-media={JSON.stringify(default_val.media)}
					data-mobile-media={JSON.stringify(mobile_val.media)}
					data-slide-settings={JSON.stringify(slide_settings)}
				/>
				{frameType === "slider" && (
					<>
						<div
							className="mv-slider-band"
							data-frame-top-offset={attributes.sliderFrameTopOffset ?? 0}
							data-frame-bottom-offset={attributes.sliderFrameBottomOffset ?? 0}
							style={{
								animationDelay: `${attributes.sliderAnimationDelay ?? 0}ms`,
							}}
						/>
						<div className="mv-slider-triangle" />
					</>
				)}
				{frameType === "rounded" && (
					<div
						className="mv-frame-overlay"
						style={{
							WebkitMask: "url(#itmar-fade-rounded-mask)",
							mask: "url(#itmar-fade-rounded-mask)",
						}}
					/>
				)}
			</div>
		</div>
	);
}
