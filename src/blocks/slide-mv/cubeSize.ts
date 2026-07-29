type CubeMedia = HTMLImageElement | HTMLVideoElement;
// global.d.ts では "swiper" が型情報を持たないモジュールとして宣言されているため、
// この処理で実際に使用するメンバーだけを構造型として定義する。
export interface CubeSwiperInstance {
	destroyed?: boolean;
	animating?: boolean;
	params: {
		effect?: string;
		loop?: boolean;
	};
	el: HTMLElement;
	slides: HTMLElement[];
	activeIndex: number;
	update: () => void;
	slideTo: (index: number, speed?: number, runCallbacks?: boolean) => unknown;
	slideToLoop: (
		index: number,
		speed?: number,
		runCallbacks?: boolean,
	) => unknown;
	on: (eventName: string, handler: (...args: any[]) => void) => unknown;
	navigation?: {
		update: () => void;
	};
	pagination?: {
		render: () => void;
		update: () => void;
	};
	scrollbar?: {
		updateSize: () => void;
	};
}

const cubeZoomEventsInstalled = new WeakSet<CubeSwiperInstance>();

const setCubeZoomOut = (swiper: CubeSwiperInstance): void => {
	if (!swiper || swiper.destroyed || swiper.params.effect !== "cube") return;

	swiper.el.classList.remove("scale-in");
	swiper.el.classList.add("scale-out");
};

const setCubeZoomIn = (swiper: CubeSwiperInstance): void => {
	if (!swiper || swiper.destroyed || swiper.params.effect !== "cube") return;

	swiper.el.classList.remove("scale-out");
	swiper.el.classList.add("scale-in");
};

export const bindCubeZoomEvents = (swiper: CubeSwiperInstance): void => {
	if (
		!swiper ||
		swiper.destroyed ||
		swiper.params.effect !== "cube" ||
		cubeZoomEventsInstalled.has(swiper)
	) {
		return;
	}

	// 通常の移動だけでなく、スライドが変わらないドラッグにも対応する。
	swiper.on("sliderFirstMove", () => setCubeZoomOut(swiper));
	swiper.on("transitionStart", () => setCubeZoomOut(swiper));

	// touchEndは、スライド変更がキャンセルされて
	// slideChangeTransitionEndが発生しない場合の復旧にもなる。
	swiper.on("touchEnd", () => setCubeZoomIn(swiper));
	swiper.on("transitionEnd", () => setCubeZoomIn(swiper));
	swiper.on("beforeDestroy", () => {
		swiper.el.classList.remove("scale-out", "scale-in");
	});

	setCubeZoomIn(swiper);
	cubeZoomEventsInstalled.add(swiper);
};

const getMediaAspectRatio = (media: CubeMedia): number | null => {
	const attributeWidth = Number(media.getAttribute("width"));
	const attributeHeight = Number(media.getAttribute("height"));

	const intrinsicWidth =
		media.tagName === "VIDEO"
			? (media as HTMLVideoElement).videoWidth
			: (media as HTMLImageElement).naturalWidth;
	const intrinsicHeight =
		media.tagName === "VIDEO"
			? (media as HTMLVideoElement).videoHeight
			: (media as HTMLImageElement).naturalHeight;

	const width = attributeWidth || intrinsicWidth;
	const height = attributeHeight || intrinsicHeight;

	if (width <= 0 || height <= 0) return null;

	return height / width;
};

const applyCubeSize = (
	swiper: CubeSwiperInstance,
	slideIndex: number,
): boolean => {
	if (!swiper || swiper.destroyed || swiper.params.effect !== "cube") {
		return false;
	}

	const normalizedIndex = Math.max(
		0,
		Math.min(Number(slideIndex) || 0, swiper.slides.length - 1),
	);
	const activeSlide = swiper.slides?.[normalizedIndex] as
		| HTMLElement
		| undefined;
	const activeMedia = activeSlide?.querySelector<CubeMedia>("img, video");
	if (!activeMedia) return false;

	const aspectRatio = getMediaAspectRatio(activeMedia);
	if (!aspectRatio) return false;

	const isPortrait = aspectRatio > 1;
	const portraitWidth = window.matchMedia("(min-width: 768px)").matches
		? "55%"
		: "90%";
	const nextWidth = isPortrait ? portraitWidth : "100%";
	const widthChanged = swiper.el.style.width !== nextWidth;

	// 参考実装と同様に、縦長メディアだけSwiper本体の幅を狭める。
	swiper.el.style.width = nextWidth;
	swiper.el.classList.toggle("itmar-cube-portrait", isPortrait);

	// 幅の変更をレイアウトへ反映させてから、縦横比で高さを決める。
	// jQueryのinnerWidth()と同様に、transform: scale()の影響を受けない
	// レイアウト上の幅を使用する。
	const slideWidth = swiper.el.clientWidth;
	if (slideWidth <= 0) return false;

	const nextHeight = `${Math.round(slideWidth * aspectRatio)}px`;
	const heightChanged = swiper.el.style.height !== nextHeight;
	if (heightChanged) {
		swiper.el.style.height = nextHeight;
	}

	return widthChanged || heightChanged;
};

export const updateCubeSize = (swiper: CubeSwiperInstance): void => {
	// 参考実装と同様、Swiper本体の幅・高さだけを変更する。
	// swiper.update()を呼ぶと、Cubeの各面の位置まで遷移中に再計算され、
	// 回転が跳ねたり通常スライドのように見えたりするため実行しない。
	applyCubeSize(swiper, swiper.activeIndex);
};

export const bindCubeMediaReady = (swiper: CubeSwiperInstance): void => {
	swiper.el.querySelectorAll<CubeMedia>("img, video").forEach((media) => {
		const isVideo = media.tagName === "VIDEO";
		const isReady = isVideo
			? (media as HTMLVideoElement).readyState >= 1
			: (media as HTMLImageElement).complete;

		if (isReady) return;

		media.addEventListener(
			isVideo ? "loadedmetadata" : "load",
			() => updateCubeSize(swiper),
			{ once: true },
		);
	});
};

export const resetCubeSize = (swiperElement: HTMLElement): void => {
	swiperElement.style.removeProperty("width");
	swiperElement.style.removeProperty("height");
	swiperElement.classList.remove(
		"itmar-cube-portrait",
		"scale-out",
		"scale-in",
	);
};
