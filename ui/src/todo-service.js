// Common todo operations like add, remove etc.
const TODO_URL = `http://localhost:5000/todos`;

// Fetch todos
export const getTodos = () => {
  return fetch(TODO_URL).then((res) => res.json());
};

// Common function that performs `add`, `update` and `remove` operations.
export const processTodo = (type, todo) => {
  let inputType = type.toUpperCase();
  let method = "";
  let API_URL = "";
  let bodyRequired = true;

  if (inputType === "ADD") {
    method = "POST";
    API_URL = TODO_URL;
  } else if (inputType === "UPDATE") {
    method = "PUT";
    API_URL = `${TODO_URL}/${todo.id}`;
  } else if (inputType === "REMOVE") {
    method = "DELETE";
    API_URL = `${TODO_URL}/${todo.id}`;
    bodyRequired = false;
  }

  let reqObj = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  if (bodyRequired) {
    reqObj = { ...reqObj, ...{ body: JSON.stringify(todo) } };
  }

  return fetch(API_URL, reqObj).then((res) => res.json());
};

// There's some duplication of code in the below `api` methods.
// The above `processTodo(...)` function is an attempt to reduce
// duplication vs accepting the trade-off for a slightly larger function.

// Add new todo
export const addTodo = (newTodo) => {
  return fetch(TODO_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(newTodo),
  }).then((res) => res.json());
};

// Update todo
export const updateTodo = (todo) => {
  return fetch(`${TODO_URL}/${todo.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(todo),
  }).then((res) => res.json());
};

// Remove todo by `id` param.
export const removeTodo = (id) => {
  return fetch(`${TODO_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
};
