

jQuery(function ($) {
  //vegasの初期化
  //モバイルのフラグ
  let mobile_flg = false;

  //vegasスライダーの要素
  let $sliderElement = $('#mv-slider');

  if ($sliderElement.get(0)) {//vegasスライダーがあるときだけ
    //画像データの取得
    let default_media_info = $sliderElement.data('default-media');
    let mobile_media_info = $sliderElement.data('mobile-media');
    //スライド設定データの取得
    let slide_settings = $sliderElement.data('slide-settings');

    let default_urls = default_media_info
      .filter(item => item.url)
      .map(item => ({ src: item.url }));
    let mobile_urls = mobile_media_info
      .filter(item => item.url)
      .map(item => ({ src: item.url }));

    //vegasの初期化関数
    function initVegas(mobile_flg) {

      let slideArray = [];

      slideArray = mobile_flg
        ? mobile_urls//タブレットサイズ（768px）以下用の画像
        : default_urls//PC用の画像

      //vegasが設定してあれば一旦クリア
      if ($sliderElement.hasClass('vegas-container')) {
        $sliderElement.vegas('destroy');
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
      } else {//画像の設定がなければ単一画像
        $sliderElement.vegas({
          cover: false,
          slides: [
            { src: `${slide_blocks.plugin_url}/assets/no-image.png` },
          ]
        });
      }
    }

    //Windowのフラグ関数
    function window_flg() {
      var windowwidth = window.innerWidth || document.documentElement.clientWidth || 0;
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
  //swiperスライダーの要素
  let $swiperElement = $('#mv-swiper');
  if ($swiperElement.length) {
    let swiper_info = $swiperElement.data('swiper-info');

    //オートプレイのオブジェクトを生成
    const autoplayOption = swiper_info.autoplay != 0 ? { delay: swiper_info.autoplay } : false;

    //Swiperエフェクトのオプションをマッピング
    const effectOption = {
      none: {
        slidesPerView: swiper_info.mobilePerView,
        spaceBetween: swiper_info.mobileBetween,
        breakpoints: {
          // 768px以上の場合
          768: {
            slidesPerView: swiper_info.defaultPerView,
            spaceBetween: swiper_info.defaultBetween,
          }
        }
      },
      coverflow: {
        centeredSlides: true,
        slidesPerView: swiper_info.mobilePerView,
        spaceBetween: swiper_info.mobileBetween,

        effect: "coverflow",
        coverflowEffect: {
          rotate: 50,              // (前後のスライドの回転)
          depth: 100,             // (前後のスライドの奥行)
          stretch: 50, // (スライド間のスペース)
          modifier: 1,            // (rotate・depth・stretchの値を乗算する)
          scale: 0.9,               // (前後のスライドのサイズ比率)
          slideShadows: true,    // (前後のスライド表面の影の有無)
        },
        breakpoints: {
          // 768px以上の場合
          768: {
            slidesPerView: swiper_info.defaultPerView,
            spaceBetween: swiper_info.defaultBetween,
            coverflowEffect: {
              stretch: 0, // (スライド間のスペース)
            }
          }
        },
      },
      coverflow_2: {
        centeredSlides: true,
        slidesPerView: 'auto',
        //spaceBetween: swiper_info.mobileBetween,
        effect: "coverflow",
        coverflowEffect: {
          rotate: 0,
          slideShadows: false,
          stretch: 100,
        },
        on: {
          init: function () {
            change_active_scale(this);
          },
          slideChange: function () {
            change_active_scale(this);
          }
        },
        breakpoints: {
          // 768px以上の場合
          768: {
            coverflowEffect: {
              stretch: 100
            }
          }
        },
      },
      cube: {
        speed: 800,
        effect: "cube",
        cubeEffect: {
          slideShadows: true,             // スライド表面の影の有無
          shadow: true,                   // スライド下の影の有無
          shadowOffset: 40,              // スライド下の影の位置（px）
          shadowScale: 0.94,             //スライド下の影のサイズ比率（0~1）
        },
        on: {
          init: function () {
            if (swiper_info.isSlideFit) {
              change_swiper_scale(this);
            }
          },
          slideChangeTransitionStart: function () {
            this.el.classList.remove('scale-in');
            this.el.classList.add('scale-out');
          },
          slideChangeTransitionEnd: function () {
            this.el.classList.remove('scale-out');
            this.el.classList.add('scale-in');
          },

          // スライド変化時
          slideChange: function () {
            if (swiper_info.isSlideFit) {
              change_swiper_scale(this);
            }
          }
        }
      },
      flip: {
        effect: "flip",
        flipEffect: {
          limitRotation: true,
          slideShadows: true
        }
      },
      cards: {
        effect: "cards",
        cardsEffect: {
          perSlideOffset: 8,
          perSlideRotate: 2,
          rotate: true,
          slideShadows: true
        }
      },
    }

    //スワイパーのオプションを生成
    let swiperOptions = {
      loop: swiper_info.loop,
      autoplay: autoplayOption,

    };
    //ナビゲーションのセット
    if (swiper_info.navigation.disp) {
      swiperOptions.navigation = {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      };
    }
    //ページネーションのセット
    if (swiper_info.pagination.disp) {
      swiperOptions.pagination = {
        el: '.swiper-pagination'
      };
    }
    //スクロールバーのセット
    if (swiper_info.scrollbar.disp) {
      swiperOptions.scrollbar = {
        el: '.swiper-scrollbar'
      };
    }

    //エフェクトのセット
    if (swiper_info.effect) {
      swiperOptions = { ...swiperOptions, ...effectOption[swiper_info.effect] };
    }

    //初期化実行
    new Swiper(".swiper", swiperOptions);
  }



  function change_swiper_scale(swiper_elm) {
    //アクティブなスライドの大きさを変える
    let active_slide = $(swiper_elm.el).find('.swiper-slide').eq(swiper_elm.activeIndex);
    let active_elm = active_slide.children().first();
    // アクティブなスライドの幅を取得
    let slideWidth = active_elm.width();
    // アクティブなスライドの高さを取得
    let slideHeight = active_elm.height();
    let aspect = slideHeight / slideWidth;
    if (aspect > 1) {
      $(swiper_elm.el).css({ 'width': '50%' });

    } else {
      $(swiper_elm.el).css({ 'width': '80%' });
    }
    let slide_width = $(swiper_elm.el).innerWidth();
    let img_height = Math.round(slide_width * aspect) + 'px';
    $(swiper_elm.el).css({ 'height': img_height })

  }

  function change_active_scale(swiper_elm) {
    //アクティブなスライドの大きさを変える
    let frame_arr = $(swiper_elm.el).find('.swiper-slide .group_contents');
    let active_index = swiper_elm.activeIndex;//アクティブスライドのindex
    frame_arr.each(function (index) {
      if (index == active_index) {
        let content_width = $(this).width();
        let content_height = $(this).height();
        //縦長と横長でスタイルを変更
        let aspect = content_height / content_width;
        let disp_width = aspect < 1 ? '240%' : '150%';
        let disp_top = aspect < 1 ? '-3rem' : '-8rem';
        $(this).parent().animate({ 'width': disp_width, 'top': disp_top });
      } else {

        $(this).parent().animate({ 'width': '100%', 'top': '' });

      }
    })
  }
});