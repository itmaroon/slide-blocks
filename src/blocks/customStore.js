import { createReduxStore, register } from "@wordpress/data";

const DEFAULT_STATE = {
	displayedNotices: [],
	swiperInstances: [],
};

const store = createReduxStore("itmar-custom/store", {
	reducer(state = DEFAULT_STATE, action) {
		switch (action.type) {
			case "ADD_NOTICE":
				return {
					...state,
					displayedNotices: [...state.displayedNotices, action.noticeId],
				};
			case "RESET_NOTICES":
				return {
					...state,
					displayedNotices: [],
				};
			case "ADD_SWIPER_INSTANCE": // Swiperインスタンスを追加するアクション
				return {
					...state,
					swiperInstances: [...state.swiperInstances, action.instance],
				};
			case "REMOVE_SWIPER_INSTANCE": // Swiperインスタンスを削除するアクション
				return {
					...state,
					swiperInstances: state.swiperInstances.filter(
						(inst) => inst.swiper_id !== action.instanceId,
					),
				};
			default:
				return state;
		}
	},
	actions: {
		addNotice(noticeId) {
			return { type: "ADD_NOTICE", noticeId };
		},
		resetNotices() {
			return { type: "RESET_NOTICES" };
		},
		addSwiperInstance(instance) {
			// Swiperインスタンスを追加
			return { type: "ADD_SWIPER_INSTANCE", instance };
		},
		removeSwiperInstance(instanceId) {
			// Swiperインスタンスを削除
			return { type: "REMOVE_SWIPER_INSTANCE", instanceId };
		},
	},
	selectors: {
		hasNoticeBeenDisplayed(state, noticeId) {
			return state.displayedNotices.includes(noticeId);
		},
		getSwiperInstances(state) {
			// 全てのSwiperインスタンスを取得
			return state.swiperInstances;
		},
		getSwiperInstanceById(state, instanceId) {
			// IDに基づいて特定のSwiperインスタンスを取得
			return state.swiperInstances.find(
				(inst) => inst.swiper_id === instanceId,
			);
		},
	},
});

register(store);
