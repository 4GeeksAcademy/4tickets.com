export const initialStore = () => {
  return {
    message: null,

    events: [
      {
        id: 1,
        title: "Torneo Retro Gaming & Indie",
        description:
          "Compite en los mejores roguelikes y clásicos arcade. ¡Demuestra tu destreza esquivando lágrimas y enemigos!",
        price: 15,
        capacity: 100,
        image_url:
          "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=400&auto=format&fit=crop",
        location: "Murcia Centro",
        date: "2026-07-15",
      },
      {
        id: 2,
        title: "Masterclass de Boxeo",
        description:
          "Aprende técnica, mejora tu guardia y suda la camiseta en esta sesión intensiva con saco y sparring.",
        price: 25,
        capacity: 20,
        image_url:
          "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=400&auto=format&fit=crop",
        location: "Gimnasio Sur, Murcia",
        date: "2026-07-20",
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
