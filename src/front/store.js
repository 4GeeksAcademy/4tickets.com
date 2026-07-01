export const initialStore = () => {
    return {
        message: null,
        events: [],
        followedEvents: [],
        user: null,
        company: null,
        accountType: null
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

        case "toggle_follow_event":
            const eventId = action.payload;
            const isFollowing = store.followedEvents.includes(eventId);

            console.log(
                `Simulando: ${isFollowing ? "Dejando de seguir" : "Siguiendo"} evento ID: ${eventId}`
            );

            return {
                ...store,
                followedEvents: isFollowing
                    ? store.followedEvents.filter((id) => id !== eventId)
                    : [...store.followedEvents, eventId],
            };

        case "login_company":
            return {
                ...store,
                company: action.payload,
                user: null,
                accountType: "company"
            };

        case "login_user":
            return {
                ...store,
                user: action.payload,
                company: null,
                accountType: "user"
            };

        case "logout":
            return {
                ...store,
                user: null,
                company: null,
                accountType: null
            };

        default:
            return store;
    }
}