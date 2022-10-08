import React from "react";
import PropTypes from "prop-types";
import { memo } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { processTodo } from "../todo-service";

const TodoFormMemoized = memo(() => {
  // state to hold the todo text.

  const todoText = useRef();

  const queryClient = useQueryClient();

  // mutation to  add a new todo.
  const { mutate: addTodo, error } = useMutation(
    (data) => processTodo("ADD", data),
    {
      onSettled: () => {
        queryClient.invalidateQueries(["todos"]);
      },
    }
  );

  // Add a new todo to the existing list of todos.
  const handleAddTodo = (todoText) => {
    if (todoText.trim() !== "") {
      const newTodo = {
        task: todoText,
        completed: false,
      };
      addTodo(newTodo);
    }
  };

  return (
    <div>
      {error && <p className="mt-2 mb-2 text-red-600">{error.message}</p>}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddTodo(todoText.current.value);
          todoText.current.value = "";
        }}
      >
        <div className="flex justify-between items-center">
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-teal-600"
            placeholder="Add a new todo"
            ref={todoText}
          />
          <button className="ml-3 px-2 py-1 bg-teal-600 text-white rounded focus:outline-none">
            Add
          </button>
        </div>
      </form>
    </div>
  );
});

// Proptype validations.
TodoFormMemoized.propTypes = {
  error: PropTypes.object,
};

export const TodoForm = TodoFormMemoized;
