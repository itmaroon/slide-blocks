// notices-store.js
import { createReduxStore, register } from "@wordpress/data";

const DEFAULT_STATE = {
	displayedNotices: [],
};

const store = createReduxStore("itmar-custom/notices", {
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
	},
	selectors: {
		hasNoticeBeenDisplayed(state, noticeId) {
			return state.displayedNotices.includes(noticeId);
		},
	},
});

register(store);
