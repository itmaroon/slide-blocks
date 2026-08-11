export type FrameType = "none" | "slider" | "rounded";
export type FrameAnimationMode = "continuous" | "onChange";
export type RoundedWindowLayout = "single" | "triple" | "quintuple";

export const ROUNDED_FRAME_MORPH_DURATION = 8000;
export const ROUNDED_FRAME_STEP_DURATION = 1600;
export const SLIDER_FRAME_ANIMATION_DURATION = 1000;

const clampPercentage = (value: number) => Math.min(100, Math.max(0, value));

export const getSliderFrameStyle = (
	topOffset = 0,
	bottomOffset = 0,
) => {
	const desktopSmallTop = 20 + topOffset;
	const mobileSmallTop = 16 + topOffset;

	return {
		"--itmar-slider-top-left": `${37.5 + topOffset}%`,
		"--itmar-slider-top-right": `${topOffset}%`,
		"--itmar-slider-bottom-left": `${120 + bottomOffset}%`,
		"--itmar-slider-bottom-right": `${82.5 + bottomOffset}%`,
		"--itmar-slider-small-left-top": `${desktopSmallTop}%`,
		"--itmar-slider-small-left-bottom": `${desktopSmallTop + 10}%`,
		"--itmar-slider-small-right-x": `${clampPercentage(
			(desktopSmallTop / 37.5) * 100,
		)}%`,
		"--itmar-slider-mobile-top-left": `${25 + topOffset}%`,
		"--itmar-slider-mobile-top-right": `${topOffset}%`,
		"--itmar-slider-mobile-bottom-left": `${120 + bottomOffset}%`,
		"--itmar-slider-mobile-bottom-right": `${95 + bottomOffset}%`,
		"--itmar-slider-mobile-small-left-top": `${mobileSmallTop}%`,
		"--itmar-slider-mobile-small-left-bottom": `${mobileSmallTop + 10}%`,
		"--itmar-slider-mobile-small-right-x": `${clampPercentage(
			(mobileSmallTop / 25) * 100,
		)}%`,
	};
};

// objectBoundingBox（0〜1）座標で作る、曲線ベースの有機的なフレーム。
// 形状間で滑らかに切り替えられるよう、すべて同じ数・順序の曲線を使う。
export const roundedFramePaths = [
	"M 0.100 0.120 C 0.152 0.060 0.319 0.044 0.420 0.040 C 0.521 0.036 0.766 0.044 0.840 0.090 C 0.914 0.136 0.955 0.280 0.960 0.380 C 0.965 0.480 0.936 0.742 0.880 0.820 C 0.824 0.898 0.648 0.942 0.550 0.950 C 0.452 0.958 0.230 0.944 0.160 0.880 C 0.090 0.816 0.048 0.584 0.040 0.480 C 0.032 0.376 0.048 0.180 0.100 0.120 Z",
	"M 0.160 0.050 C 0.224 0.017 0.419 0.064 0.520 0.080 C 0.621 0.096 0.841 0.106 0.900 0.170 C 0.959 0.234 0.966 0.448 0.950 0.550 C 0.934 0.653 0.855 0.864 0.780 0.920 C 0.705 0.976 0.496 0.979 0.400 0.960 C 0.304 0.941 0.128 0.867 0.080 0.780 C 0.032 0.693 0.039 0.420 0.050 0.320 C 0.061 0.220 0.096 0.083 0.160 0.050 Z",
	"M 0.060 0.240 C 0.101 0.154 0.247 0.077 0.340 0.050 C 0.433 0.023 0.658 0.017 0.740 0.040 C 0.822 0.063 0.910 0.138 0.940 0.220 C 0.970 0.302 0.993 0.542 0.960 0.640 C 0.927 0.738 0.793 0.902 0.700 0.940 C 0.607 0.978 0.370 0.956 0.280 0.920 C 0.190 0.884 0.070 0.773 0.040 0.680 C 0.010 0.587 0.019 0.326 0.060 0.240 Z",
	"M 0.080 0.100 C 0.137 0.043 0.343 0.033 0.450 0.030 C 0.557 0.027 0.790 0.027 0.860 0.080 C 0.930 0.133 0.960 0.311 0.960 0.420 C 0.960 0.529 0.923 0.809 0.860 0.880 C 0.797 0.951 0.601 0.943 0.500 0.940 C 0.399 0.937 0.184 0.927 0.120 0.860 C 0.056 0.793 0.035 0.554 0.030 0.450 C 0.025 0.346 0.023 0.157 0.080 0.100 Z",
] as const;

export const getRoundedFramePath = (index = 0): string =>
	roundedFramePaths[index % roundedFramePaths.length];

export const getRoundedFrameMorphValues = (startIndex = 0): string => {
	const paths = roundedFramePaths.map(
		(_, offset) => getRoundedFramePath(startIndex + offset),
	);
	return [...paths, paths[0]].join(";");
};

export const getRoundedFrameStepValues = (
	index: number,
	offset = 0,
): string =>
	`${getRoundedFramePath(index + offset)};${getRoundedFramePath(
		index + offset + 1,
	)}`;

export const roundedWindowTransforms: Record<
	RoundedWindowLayout,
	readonly string[]
> = {
	single: [""],
	triple: [
		"translate(0.03 0.12) scale(0.56 0.66)",
		"translate(0.64 0.07) scale(0.31 0.36)",
		"translate(0.61 0.57) scale(0.35 0.37)",
	],
	quintuple: [
		"translate(0.04 0.08) scale(0.40 0.43)",
		"translate(0.52 0.04) scale(0.34 0.34)",
		"translate(0.70 0.40) scale(0.27 0.30)",
		"translate(0.39 0.61) scale(0.37 0.36)",
		"translate(0.05 0.62) scale(0.27 0.29)",
	],
};

export const getRoundedWindowTransforms = (
	layout: RoundedWindowLayout = "single",
): readonly string[] =>
	roundedWindowTransforms[layout] ?? roundedWindowTransforms.single;
