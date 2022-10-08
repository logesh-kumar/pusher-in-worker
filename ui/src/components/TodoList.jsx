import React from "react";
import PropTypes from "prop-types";

import { TodoItem } from "./TodoItem";

export const TodoList = ({ todos, toggleTodo, removeTodo }) => {
  return (
    <div className="mt-4">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          removeTodo={removeTodo}
        />
      ))}
    </div>
  );
};

// PropTypes validation.
TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  toggleTodo: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
};
