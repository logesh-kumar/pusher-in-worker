import { TodoForm, TodoList } from "./components";
import { useReactQuerySubscription } from "./hooks/useReactQuerySubscription";

function App() {
  const QUERRY_KEY = ["todos"];
  const CHANNEL_NAME = "todos";

  // Subscribe to the pusher channel and event which is inside a web worker
  useReactQuerySubscription(
    CHANNEL_NAME,
    ["inserted", "updated", "deleted"],
    QUERRY_KEY
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
