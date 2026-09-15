import { slideBlockSwiperInit, styleDataApply } from "itmar-block-packages/front";
import { createSlideStyleCss } from "./StyleSlide";
import "swiper/swiper-bundle.css";
import {
	bindCubeMediaReady,
	bindCubeZoomEvents,
	updateCubeSize,
} from "./cubeSize";
import type { CubeSwiperInstance } from "./cubeSize";

type SwiperElement = HTMLElement & { swiper?: CubeSwiperInstance };
type SlideRequestDetail = { index: number };

const scheduledSwipers = new WeakSet<SwiperElement>();
const sizeObservers = new WeakMap<SwiperElement, ResizeObserver>();
const pendingSlideIndexes = new WeakMap<SwiperElement, number>();
const cubeSizeEventsInstalled = new WeakSet<CubeSwiperInstance>();

const getSlideStyleRoot = (element: Element): Element => {
	const parent = element.parentElement;
	if (parent?.classList.contains("itmar-slide-mv-style-root")) {
		return parent;
	}

	// 旧保存形式でも現在の共通スタイル用ラッパーと同じ階層にそろえる。
	const styleRoot = element.ownerDocument.createElement("div");
	styleRoot.className = "itmar-slide-mv-style-root";
	element.before(styleRoot);
	styleRoot.append(element);
	return styleRoot;
};

styleDataApply(createSlideStyleCss, ".wp-block-itmar-slide-mv", {
	getTarget: getSlideStyleRoot,
	classPrefix: "itmar-slide-style-",
	observe: true,
});

const bindCubeSizeEvents = (cubeInstance: CubeSwiperInstance): void => {
	if (
		cubeInstance.destroyed ||
		cubeInstance.params.effect !== "cube" ||
		cubeSizeEventsInstalled.has(cubeInstance)
	) {
		return;
	}

	cubeSizeEventsInstalled.add(cubeInstance);

	const syncCubeSizeOnResize = () => {
		if (cubeInstance.animating) return;
		window.requestAnimationFrame(() => updateCubeSize(cubeInstance));
	};

	bindCubeMediaReady(cubeInstance);
	bindCubeZoomEvents(cubeInstance);
	cubeInstance.on("resize", syncCubeSizeOnResize);
	cubeInstance.on("slideChange", () => updateCubeSize(cubeInstance));
	syncCubeSizeOnResize();
};

const moveToPendingSlide = (
	swiperElement: SwiperElement,
	instance: CubeSwiperInstance,
): void => {
	const requestedIndex = pendingSlideIndexes.get(swiperElement);
	if (requestedIndex === undefined) return;

	pendingSlideIndexes.delete(swiperElement);

	instance.update();

	if (instance.params.loop && typeof instance.slideToLoop === "function") {
		instance.slideToLoop(requestedIndex, 0, false);
	} else {
		instance.slideTo(requestedIndex, 0, false);
	}
};

const waitForPositiveWidth = (swiperElement: SwiperElement): void => {
	if (sizeObservers.has(swiperElement)) return;

	const observer = new ResizeObserver(() => {
		if (!swiperElement.isConnected) {
			observer.disconnect();
			sizeObservers.delete(swiperElement);
			return;
		}

		if (swiperElement.clientWidth <= 0) return;

		observer.disconnect();
		sizeObservers.delete(swiperElement);
		initSwiperWhenReady(swiperElement);
	});

	sizeObservers.set(swiperElement, observer);
	observer.observe(swiperElement);
};

const initSwiperWhenReady = (swiperElement: SwiperElement) => {
	if (scheduledSwipers.has(swiperElement)) return;
	scheduledSwipers.add(swiperElement);

	window.setTimeout(() => {
		window.requestAnimationFrame(() => {
			window.requestAnimationFrame(() => {
				scheduledSwipers.delete(swiperElement);

				if (!swiperElement.isConnected) return;

				if (swiperElement.closest(".template_unit")) return;

				if (swiperElement.clientWidth <= 0) {
					waitForPositiveWidth(swiperElement);
					return;
				}

				let instance = swiperElement.swiper;
				if (!instance || instance.destroyed) {
					slideBlockSwiperInit(swiperElement);
					instance = swiperElement.swiper;
				}

				if (!instance || instance.destroyed) return;

				bindCubeSizeEvents(instance);
				moveToPendingSlide(swiperElement, instance);
			});
		});
	}, 0);
};

const scanSwipers = (root: ParentNode): void => {
	if (
		root instanceof HTMLElement &&
		root.matches(".wp-block-itmar-slide-mv .swiper")
	) {
		initSwiperWhenReady(root as SwiperElement);
	}

	root
		.querySelectorAll<SwiperElement>(".wp-block-itmar-slide-mv .swiper")
		.forEach((swiperElement) => {
			initSwiperWhenReady(swiperElement);
		});
};

document.addEventListener("itmar:slide-mv-request", (event) => {
	const customEvent = event as CustomEvent<SlideRequestDetail>;
	const swiperElement = customEvent.target;
	const requestedIndex = Number(customEvent.detail?.index);

	if (
		!(swiperElement instanceof HTMLElement) ||
		!swiperElement.matches(".wp-block-itmar-slide-mv .swiper") ||
		!Number.isFinite(requestedIndex)
	) {
		return;
	}

	pendingSlideIndexes.set(swiperElement as SwiperElement, requestedIndex);
	initSwiperWhenReady(swiperElement as SwiperElement);
});

jQuery(function () {
	// 最初から存在するSwiperを初期化する。
	scanSwipers(document);

	// query-blocksなどが後から追加するSwiperもslide-blocks側で検出する。
	const observer = new MutationObserver((mutations) => {
		mutations.forEach((mutation) => {
			mutation.addedNodes.forEach((node) => {
				if (!(node instanceof HTMLElement)) return;
				scanSwipers(node);
			});
		});
	});

	observer.observe(document.body, {
		childList: true,
		subtree: true,
	});
});
