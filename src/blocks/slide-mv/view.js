import { slideBlockSwiperInit } from "itmar-block-packages";

jQuery(function ($) {
	//スワイパーの初期化

	$(".swiper").each(function () {
		//先祖要素に template_unit というクラスを持つ要素がある場合は初期化しない
		if ($(this).closest(".template_unit").length === 0) {
			slideBlockSwiperInit(this);
		}
	});
});
