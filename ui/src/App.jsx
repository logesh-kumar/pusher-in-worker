import { useEvent } from "@harelpls/use-pusher";
import { useChannel } from "@harelpls/use-pusher";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useState } from "react";
import { TodoForm, TodoList, TodoFilter } from "./components";
import { getTodos, processTodo } from "./todo-service";

// Helper function to retrieve list of todos based on current filter.
const getVisibleTodos = (todos, filter = "SHOW_ALL") => {
  switch (filter) {
    case "SHOW_ALL":
      return todos;
    case "SHOW_ACTIVE":
      return todos.filter((todo) => !todo.completed);
    case "SHOW_COMPLETED":
      return todos.filter((todo) => todo.completed);
    default:
      return todos;
  }
};

function App() {
  // State variables.
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("");
  const [todoText, setTodoText] = useState("");
  const [error, setError] = useState(null);
  const [updateMessage, setUpdateMessage] = useState("");

  // Add a new todo to the existing list of todos.
  const addTodo = (todo) => {
    if (todoText.trim() !== "") {
      const newTodo = {
        task: todoText,
        completed: false,
      };
      setError(null);

      processTodo("Add", newTodo).then((data) => {
        // update the todo list with the new todo item
        setTodos([
          ...todos,
          {
            id: data.id,
            task: data.task,
            completed: data.completed,
          },
        ]);
      });
    } else {
      setError("Please enter a valid todo.");
    }
  };

  // Remove a todo from existing list of todos.
  const removeTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);

    processTodo("Remove", { id }).then(() => console.log("Removed Todo."));
  };

  // Do a strike-through on/off effect for toggling the todo.
  const toggleTodo = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      } else {
        return todo;
      }
    });
    setTodos(updatedTodos);

    processTodo("Update", {
      id,
      completed: updatedTodos.find((todo) => todo.id === id).completed,
    }).then(() => console.log("Updated Todo."));
  };

  // Handler function to manage current todo text.
  const handleTodoTextChange = (val) => {
    setTodoText(val);
  };

  useQuery(["todos"], () => getTodos(), {
    onSuccess: (data) => {
      setTodos(data);
    },
    refetchOnWindowFocus: false,
  });

  const channel = useChannel("todos");
  useEvent(channel, "inserted", (data) => {
    // check if the todo is already in the list
    if (!todos.find((todo) => todo.id === data.id)) {
      setTodos((todos) => [...todos, data]);
    }
  });

  useEvent(channel, "deleted", (data) => {
    // remove the todo from the list
    setTodos((todos) => todos.filter((todo) => todo.id !== data.id));
  });

  useEvent(channel, "updated", (data) => {
    // update the todo list item with the new data
    setTodos((todos) =>
      todos.map((todo) => {
        if (todo.id === data.id) {
          return data;
        } else {
          return todo;
        }
      })
    );
  });

  return (
    <div className="m-auto mt-4 p-4 text-center border border-teal-600 w-96 ">
      <h1 className="text-2xl text-gray-700 mb-4">Todo App</h1>
      {updateMessage && (
        <span
          className={`${
            updateMessage.includes("Removed") ? "text-red-600" : "text-teal-600"
          } mt-3 mb-3 inline-block`}
        >
          {updateMessage}
        </span>
      )}
      <TodoForm
        error={error}
        todoText={todoText}
        handleTodoTextChange={handleTodoTextChange}
        addTodo={addTodo}
      />
      <TodoList
        todos={getVisibleTodos(todos, filter)}
        toggleTodo={toggleTodo}
        removeTodo={removeTodo}
      />
      <TodoFilter
        currentFilter={filter}
        onClick={(filter) => setFilter({ filter })}
      />
    </div>
  );
}

export default App;
