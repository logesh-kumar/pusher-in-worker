import React from "react";
import PropTypes from "prop-types";

export const TodoForm = ({
  error,
  todoText,
  handleTodoTextChange,
  addTodo,
}) => {
  // create a new todo item with tailwind css

  return (
    <div>
      {error && <p className="mt-2 mb-2 text-red-600">{error.message}</p>}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleTodoTextChange("");
        }}
      >
        <div className="flex justify-between items-center">
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-teal-600"
            placeholder="Add a new todo"
            value={todoText}
            onChange={(e) => handleTodoTextChange(e.target.value)}
          />
          <button
            className="ml-3 px-2 py-1 bg-teal-600 text-white rounded focus:outline-none"
            onClick={addTodo}
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

// Proptype validations.
TodoForm.propTypes = {
  error: PropTypes.object,
  todoText: PropTypes.string.isRequired,
  handleTodoTextChange: PropTypes.func.isRequired,
  addTodo: PropTypes.func.isRequired,
};
