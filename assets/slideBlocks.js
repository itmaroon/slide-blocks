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
			slideBlockSwiperInit($(this));
		}
	});
});

//Swiper初期化関数
function slideBlockSwiperInit($swiperElement) {
	let swiperInstances = [];

	let swiper_id = $swiperElement.data("swiper-id");
	let relate_id = $swiperElement.data("relate-id");
	let is_thumbnail = $swiperElement.data("thumb-flg");
	let swiper_info = $swiperElement.data("swiper-info");
	let parallax_obj = $swiperElement.data("parallax-option");

	const parallax_option = parallax_obj != null ? { parallax: true } : {}; //parallax_optionを定義
	//オートプレイのオブジェクトを生成
	const autoplayOption = swiper_info.is_autoplay
		? {
				freeMode: {
					enabled: true,
					momentum: false,
				},
				autoplay: {
					delay: swiper_info.autoplay,
					stopOnLastSlide: false, // 最後のスライドに到達したら自動再生を停止しない
					disableOnInteraction: false, // ユーザーの操作後も自動再生を停止しない
				},
		  }
		: {};

	//Swiperエフェクトのオプションをマッピング
	const effectOption = {
		none: {
			centeredSlides: swiper_info.isActiveCenter,
			direction: swiper_info.singleDirection,
			speed: swiper_info.slideSpeed,
			slidesPerView: swiper_info.mobilePerView,
			spaceBetween: swiper_info.mobileBetween,
			breakpoints: {
				// 768px以上の場合
				768: {
					slidesPerView: swiper_info.defaultPerView,
					spaceBetween: swiper_info.defaultBetween,
				},
			},
		},
		slide_single_view: {
			...{
				direction: swiper_info.singleDirection,
				loopAdditionalSlides: 1,
				speed: swiper_info.slideSpeed,
				allowTouchMove: false,
			},
			...parallax_option,
		},
		fade_single_view: {
			...{
				speed: swiper_info.slideSpeed,
				effect: "fade",
				fadeEffect: {
					crossFade: true,
				},
			},
			...parallax_option,
		},
		coverflow: {
			centeredSlides: true,
			slidesPerView: 3,
			spaceBetween: swiper_info.mobileBetween,

			effect: "coverflow",
			coverflowEffect: {
				rotate: 50, // (前後のスライドの回転)
				depth: 100, // (前後のスライドの奥行)
				stretch: 0, // (スライド間のスペース)
				modifier: 1, // (rotate・depth・stretchの値を乗算する)
				scale: 0.9, // (前後のスライドのサイズ比率)
				slideShadows: true, // (前後のスライド表面の影の有無)
			},
			breakpoints: {
				// 768px以上の場合
				768: {
					spaceBetween: swiper_info.defaultBetween,
					coverflowEffect: {
						stretch: 0, // (スライド間のスペース)
					},
				},
			},
		},
		coverflow_2: {
			centeredSlides: true,
			slidesPerView: "auto",
			//spaceBetween: swiper_info.mobileBetween,
			effect: "coverflow",
			coverflowEffect: {
				rotate: 0,
				slideShadows: false,
				stretch: 100,
			},
			breakpoints: {
				// 768px以上の場合
				768: {
					coverflowEffect: {
						stretch: 100,
					},
				},
			},
		},
		cube: {
			speed: 800,
			effect: "cube",
			cubeEffect: {
				slideShadows: true, // スライド表面の影の有無
				shadow: true, // スライド下の影の有無
				shadowOffset: 40, // スライド下の影の位置（px）
				shadowScale: 0.94, //スライド下の影のサイズ比率（0~1）
			},
			on: {
				slideChangeTransitionStart: function () {
					this.el.classList.remove("scale-in");
					this.el.classList.add("scale-out");
				},
				slideChangeTransitionEnd: function () {
					this.el.classList.remove("scale-out");
					this.el.classList.add("scale-in");
				},
			},
		},
		flip: {
			effect: "flip",
			flipEffect: {
				limitRotation: true,
				slideShadows: true,
			},
		},
		cards: {
			effect: "cards",
			cardsEffect: {
				perSlideOffset: 8,
				perSlideRotate: 2,
				rotate: true,
				slideShadows: true,
			},
		},
	};

	//スワイパーのオプションを生成
	let swiperOptions = {
		loop: swiper_info.loop,
		...autoplayOption,
	};
	//サムネイルスライダーに指定されているとき
	if (is_thumbnail) {
		swiperOptions = {
			...swiperOptions,
			watchSlidesProgress: true,
			watchSlidesVisibility: true,
			freeMode: true,
			slideToClickedSlide: true,
		};
	}

	//ナビゲーションのセット
	if (swiper_info.navigation.disp) {
		swiperOptions.navigation = {
			nextEl: `.${swiper_id}-next`,
			prevEl: `.${swiper_id}-prev`,
		};
	}
	//ページネーションのセット
	if (swiper_info.pagination.disp) {
		swiperOptions.pagination = {
			el: `.${swiper_id}-pagination`,
		};
	}
	//スクロールバーのセット
	if (swiper_info.scrollbar.disp) {
		swiperOptions.scrollbar = {
			el: `.${swiper_id}-scrollbar`,
		};
	}

	//エフェクトのセット
	if (swiper_info.effect) {
		swiperOptions = {
			...swiperOptions,
			...effectOption[swiper_info.effect],
		};
	}

	//初期化実行

	const instance = new Swiper($swiperElement[0], swiperOptions);

	//結果保存
	const swiperObj = {
		instance: instance,
		swiper_id: swiper_id,
		relate_id: relate_id,
		is_thumbnail: is_thumbnail,
	};
	swiperInstances.push(swiperObj);

	//スライドの関連付け処理
	swiperInstances.forEach((swiperInstance) => {
		//関連スライダーのidが設定されている場合のみ処理する
		if (swiperInstance.relate_id) {
			//関連スライダーを検索
			const relate_swiper = swiperInstances.find(
				(swiper) => swiper.swiper_id === swiperInstance.relate_id,
			);

			if (relate_swiper) {
				//関連スライダーがサムネイルスライダーに指定されている場合
				if (relate_swiper.is_thumbnail) {
					swiperInstance.instance.thumbs.swiper = relate_swiper.instance;
					swiperInstance.instance.thumbs.init();
					swiperInstance.instance.thumbs.update(true);
				} else if (!swiperInstance.is_thumbnail) {
					//swiperInstance.instance.controller.control = relate_swiper.instance;
					swiperInstance.instance.on("slideChangeTransitionStart", (slider) => {
						relate_swiper.instance.slideToLoop(
							slider.realIndex,
							undefined,
							false,
						);
					});
					relate_swiper.instance.on("slideChangeTransitionStart", (slider) => {
						swiperInstance.instance.slideToLoop(
							slider.realIndex,
							undefined,
							false,
						);
					});
				}
			}
		}
	});
}
