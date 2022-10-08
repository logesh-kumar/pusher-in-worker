import { TodoForm, TodoList } from "./components";
import { useReactQuerySubscription } from "./hooks/useReactQuerySubscription";

function App() {
  const QUERRY_KEY = ["todos"];
  const CHANNEL_NAME = "todos";

  useReactQuerySubscription(
    CHANNEL_NAME,
    "inserted",
    QUERRY_KEY,
    (newData, oldData) => {
      if (!oldData.find((t) => t.id === newData.id)) {
        return [...oldData, newData];
      }
    }
  );

  useReactQuerySubscription(
    CHANNEL_NAME,
    "deleted",
    QUERRY_KEY,
    (newData, oldData) => {
      return oldData.filter((t) => t.id !== newData.id);
    }
  );

  useReactQuerySubscription(
    CHANNEL_NAME,
    "updated",
    QUERRY_KEY,
    (newData, oldData) => {
      return oldData.map((t) => (t.id === newData.id ? newData : t));
    }
  );

  return (
    <div className="m-auto mt-4 p-4 text-center border border-teal-600 w-96 ">
      <h1 className="text-2xl text-gray-700 mb-4">Todo App</h1>
      <TodoForm />
      <TodoList />
    </div>
  );
}

export default App;
