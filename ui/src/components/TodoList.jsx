import React from "react";
import { TodoItem } from "./TodoItem";
import { memo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getTodos, processTodo } from "../todo-service";

const TodoListMemoized = memo(() => {
  const queryClient = useQueryClient();

  const { data: todos, error } = useQuery(["todos"], () => getTodos(), {
    refetchOnWindowFocus: false,
    initialData: () => {
      return [];
    },
  });

  // mutation to update a todo.
  const { mutate: updateTodo } = useMutation(
    (data) => processTodo("UPDATE", data),
    {
      onSuccess: (data) => {
        queryClient.setQueryData(["todo", { id: data.id }], data);
      },
    },
    // invalidate the todos query.
    {
      onSettled: () => {
        queryClient.invalidateQueries(["todos"]);
      },
    }
  );

  const handleToggleTodo = (id) => {
    const updatedTodo = todos.find((todo) => todo.id === id);
    updatedTodo.completed = !updatedTodo.completed;
    updateTodo(updatedTodo);
  };

  return (
    <div className="mt-4">
      {todos?.length
        ? todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} toggleTodo={handleToggleTodo} />
          ))
        : null}
    </div>
  );
});

export const TodoList = TodoListMemoized;
