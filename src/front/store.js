export const initialStore = () => {
  return {
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      },
    ],

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

    case "add_task":
      const { id, color } = action.payload;
      return {
        ...store,
        todos: store.todos.map((todo) =>
          todo.id === id ? { ...todo, background: color } : todo,
        ),
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
          ? store.followedEvents.filter((id) => id !== eventId) // Lo quita
          : [...store.followedEvents, eventId], // Lo añade
      };

    default:
      throw Error("Unknown action.");
  }
}
