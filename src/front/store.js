export const initialStore = () => {
	return {
		message: null,
		events: []
	};
};
export default function storeReducer(store, action = {}) {
	switch (action.type) {
		case "set_hello":
			return {
				...store,
				message: action.payload
			};
		case "set_events":
			return {
				...store,
				events: action.payload
			};
		default:
			return store;
	}
}
