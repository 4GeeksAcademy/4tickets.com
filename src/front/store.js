export const initialStore = () => {
  return {
    message: null,
    events: [],
    followedEvents: [],
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_hello":
      return {
        ...store,
        message: action.payload,
      };

    case "set_events":
      return {
        ...store,
        events: action.payload,
      };

    case "toggle_follow_event":
      const eventId = action.payload;
      const isFollowing = store.followedEvents.includes(eventId);

      console.log(
        `Simulando: ${isFollowing ? "Dejando de seguir" : "Siguiendo"} evento ID: ${eventId}`,
      );

      return {
        ...store,
        followedEvents: isFollowing
          ? store.followedEvents.filter((id) => id !== eventId)
          : [...store.followedEvents, eventId],
      };

    default:
      return store;
  }
}
