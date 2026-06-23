export const initialStore = () => {
  return {
    message: null,
    followedEvents: [],
    token: localStorage.getItem("token") || null,
    currentUser: null,
    todos: [
      { id: 1, title: "Make the bed", background: null },
      { id: 2, title: "Do my homework", background: null },
    ],
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_hello":
      return { ...store, message: action.payload };

    case "add_task":
      const { id, color } = action.payload;
      return {
        ...store,
        todos: store.todos.map((todo) =>
          todo.id === id ? { ...todo, background: color } : todo,
        ),
      };

    case "login_success":
      return {
        ...store,
        token: action.payload.token,
        currentUser: action.payload.user,
      };

    case "logout":
      return {
        ...store,
        token: null,
        currentUser: null,
        followedEvents: [],
      };

    case "follow_event":
      return {
        ...store,
        followedEvents: [...store.followedEvents, action.payload],
      };

    case "unfollow_event":
      return {
        ...store,
        followedEvents: store.followedEvents.filter(
          (eventId) => eventId !== action.payload,
        ),
      };

    default:
      throw Error("Unknown action.");
  }
}
