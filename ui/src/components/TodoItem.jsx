import React from "react";
import PropTypes from "prop-types";
import { CheckIcon, TrashIcon } from "@heroicons/react/24/solid";

export const TodoItem = ({ todo, toggleTodo, removeTodo }) => {
  return (
    <div className="flex justify-between items-center mt-2">
      <div className="flex items-center">
        <button
          onClick={() => toggleTodo(todo.id)}
          className="focus:outline-none"
        >
          {todo.completed ? (
            <div className="w-6 h-6 border border-teal-600">
              <CheckIcon className="w-6 h-6 text-teal-600" />{" "}
            </div>
          ) : (
            <div className="w-6 h-6 border border-teal-600" />
          )}
        </button>
        <span className="p-2">{todo.task}</span>
      </div>
      <button
        onClick={() => removeTodo(todo.id)}
        className="focus:outline-none"
      >
        <TrashIcon className="w-6 h-6 text-red-600" />
      </button>
    </div>
  );
};

// PropTypes validation.
TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  toggleTodo: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
};
