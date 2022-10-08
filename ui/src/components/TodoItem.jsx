import React from "react";
import PropTypes from "prop-types";
import { CheckIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useMutation } from "@tanstack/react-query";
import { processTodo } from "../todo-service";

export const TodoItem = ({ todo, toggleTodo }) => {
  // mutation to delete a todo.
  const { mutate: deleteTodo } = useMutation((data) =>
    processTodo("REMOVE", data)
  );

  // Remove a todo from existing list of todos.
  const handleDeleteTodo = (id) => {
    deleteTodo({ id });
  };

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
        onClick={() => handleDeleteTodo(todo.id)}
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
};
