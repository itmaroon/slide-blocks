import { MasonryControl, slideBlockSwiperInit } from "itmar-block-packages";

jQuery(function ($) {
	//vegasの初期化
	//モバイルのフラグ
	let mobile_flg = false;

	//vegasスライダーの要素
	let $sliderElement = $("#mv-slider");

	if ($sliderElement.get(0)) {
		//vegasスライダーがあるときだけ
		//画像データの取得
		let default_media_info = $sliderElement.data("default-media");
		let mobile_media_info = $sliderElement.data("mobile-media");
		//スライド設定データの取得
		let slide_settings = $sliderElement.data("slide-settings");

		let default_urls = default_media_info
			.filter((item) => item.url)
			.map((item) => ({ src: item.url }));
		let mobile_urls = mobile_media_info
			.filter((item) => item.url)
			.map((item) => ({ src: item.url }));

		//vegasの初期化関数
		function initVegas(mobile_flg) {
			let slideArray = [];

			slideArray = mobile_flg
				? mobile_urls //タブレットサイズ（768px）以下用の画像
				: default_urls; //PC用の画像

			//vegasが設定してあれば一旦クリア
			if ($sliderElement.hasClass("vegas-container")) {
				$sliderElement.vegas("destroy");
			}

			if (slideArray.length != 0) {
				//Vegas全体の設定
				$sliderElement.vegas({
					overlay: false,
					transition: slide_settings.transition,
					transitionDuration: slide_settings.transition_duration,
					animationDuration: slide_settings.animation_duration,
					animation: slide_settings.animation,
					slides: slideArray,
					timer: slide_settings.is_timer,
				});
			} else {
				//画像の設定がなければ単一画像
				$sliderElement.vegas({
					cover: false,
					slides: [{ src: `${slide_blocks.plugin_url}/assets/no-image.png` }],
				});
			}
		}

		//Windowのフラグ関数
		function window_flg() {
			var windowwidth =
				window.innerWidth || document.documentElement.clientWidth || 0;
			if (windowwidth > 768) {
				return false;
			} else {
				return true;
			}
		}

		//最初の初期化
		initVegas(window_flg());

		$(window).resize(function () {
			if (window_flg() != mobile_flg) {
				mobile_flg = window_flg();
				initVegas(window_flg());
			}
		});
	}

	//スワイパーの初期化

	$(".swiper").each(function () {
		//先祖要素に template_unit というクラスを持つ要素がある場合は初期化しない
		if ($(this).closest(".template_unit").length === 0) {
			slideBlockSwiperInit(this);
		}
	});

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

/**
 * ACF/SCF の画像フィールド値から URL を取り出すユーティリティ
 *  - { url: "..." }
 *  - { sizes: { large: "..." } }
 *  - 文字列 URL
 */
function extractImageUrlFromAcfValue(value) {
	if (!value) return null;

	if (typeof value === "string") {
		if (/^https?:\/\//.test(value)) return value;
		return null; // IDだけなどはここでは扱わない
	}

	if (typeof value === "object") {
		if (value.url) return value.url;
		if (value.sizes?.large) return value.sizes.large;
		if (value.sizes?.full) return value.sizes.full;
	}

	return null;
}

/**
 * 現在表示中の投稿から、アイキャッチ＋指定ACFフィールドの画像URLを取得
 *
 * @param {Object} options
 * @param {string} options.restBase  - 例: "posts", "my_cpt"
 * @param {number} options.postId
 * @param {string[]} options.acfImageFields - 例: ["main_image", "gallery"]
 * @param {boolean} options.includeFeatured - アイキャッチを含めるか
 *
 * @returns {Promise<Array<{ url: string, type: string, field: string }>>}
 */
async function fetchPostImageUrls({
	restBase,
	postId,
	acfImageFields = [],
	includeFeatured = true,
}) {
	const endpoint = `/wp-json/wp/v2/${restBase}/${postId}?_embed&acf_format=standard&_fields=featured_media,_embedded,acf`;

	const res = await fetch(endpoint);
	if (!res.ok) {
		console.error("Failed to fetch post data", res.status, res.statusText);
		return [];
	}
}
