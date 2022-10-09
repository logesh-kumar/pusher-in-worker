import MyWorker from "./worker?worker";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Register  a web worker to handle the pusher events
export const worker = new MyWorker();

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
