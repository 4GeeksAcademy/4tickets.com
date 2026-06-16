
import React from "react";
import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import useGlobalReducer from "../hooks/useGlobalReducer";


import { FollowButton } from "../components/FollowButton.jsx";

export const Single = props => {
  const { store } = useGlobalReducer();
  const { theId } = useParams();


  const singleTodo = store.todos.find(todo => todo.id === parseInt(theId));

  return (
    <div className="container text-center mt-5">
      <h1 className="display-4">Evento: {singleTodo?.title}</h1>


      <div className="my-4">
        {singleTodo && <FollowButton eventId={singleTodo.id} />}
      </div>

      <hr className="my-4" />

      <Link to="/">
        <span className="btn btn-primary btn-lg" role="button">
          Volver a la Home
        </span>
      </Link>
    </div>
  );
};

Single.propTypes = {
  match: PropTypes.object
};