import { MasonryControl } from "itmar-block-packages";

jQuery(function ($) {
	//モバイルのフラグ
	let mobile_flg = false;
	//masonry要素の処理
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
