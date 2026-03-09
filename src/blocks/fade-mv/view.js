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
});
