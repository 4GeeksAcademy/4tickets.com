import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const FollowButton = ({ eventId }) => {

    const { store, dispatch } = useGlobalReducer();

    const isFollowing = store.followedEvents?.includes(eventId);

    const handleFollowClick = () => {
        dispatch({
            type: "toggle_follow_event",
            payload: eventId
        });
    };

    return (
        <button
            onClick={handleFollowClick}
            className={`btn ${isFollowing ? 'btn-danger' : 'btn-outline-danger'}`}
        >
            {isFollowing ? '❤️ Siguiendo' : '🤍 Seguir evento'}
        </button>
    );
};