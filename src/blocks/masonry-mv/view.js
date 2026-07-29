import { MasonryControl, styleDataApply } from "itmar-block-packages";
import { createMasonryStyleCss } from "./StyleMasonry";

const removeStyledComponentClasses = (element) => {
	const classes = Array.from(element.classList);

	classes.forEach((classValue, index) => {
		if (/^sc-[a-zA-Z0-9]+$/.test(classValue)) {
			element.classList.remove(classValue);
			const generatedClass = classes[index + 1];
			if (generatedClass && /^[a-zA-Z0-9]+$/.test(generatedClass)) {
				element.classList.remove(generatedClass);
			}
		}
	});
};

document.querySelectorAll(".wp-block-itmar-masonry-mv").forEach((element) => {
	removeStyledComponentClasses(element);
});

styleDataApply(createMasonryStyleCss, ".wp-block-itmar-masonry-mv", {
	getTarget: (el) =>
		el.parentElement?.classList.contains("itmar-masonry-mv-style-root")
			? el.parentElement
			: el,
	classPrefix: "itmar-masonry-style-",
	observe: true,
});

jQuery(function ($) {
	//モバイルのフラグ
	let mobile_flg = false;
	//masonry要素の処理
	$(".wp-block-itmar-masonry-mv").each(function () {
		removeStyledComponentClasses(this);
	});

	const grids = document.querySelectorAll(".itmar-masonry-grid");
	if (!grids.length) return;

	grids.forEach((gridEl) => {
		const {
			sourceType,
			defaultMedia,
			mobileMedia,
			defaultColumns,
			mobileColumns,
			choiceFields,
		} = gridEl.dataset;

		// 列数を決定
		const columns = mobile_flg
			? parseInt(mobileColumns || defaultColumns || "1", 10)
			: parseInt(defaultColumns || "1", 10);

		let media = [];
		//sourceTypeがstaticのときはここでマソンリーをレンダリング、dynamicの時はpickupのレンダリングに任せる
		if (sourceType === "static") {
			try {
				media = JSON.parse(
					mobile_flg ? mobileMedia || "[]" : defaultMedia || "[]",
				);
			} catch (e) {
				console.error("Failed to parse media JSON", e);
				media = [];
			}

			//マソンリーレイアウト初期化
			MasonryControl(gridEl, media, {
				columns,
				renderItems: true, // フロントではこの関数内で <figure> を描画
			});
		}
	});
});
