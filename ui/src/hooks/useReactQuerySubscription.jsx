import { useQueryClient } from "@tanstack/react-query";
import { worker } from "../main";

/**
 * React hook to subscribe to a pusher channel and event and update the react-query cache.
 * @param {string} channelName
 * @param {string} eventName
 * @param {string} queryKey
 * @param {(data: any, oldData: any) => any} handleQueryCacheUpdate
 * @returns {void}
 */
export const useReactQuerySubscription = (
  channelName,
  eventNames,
  queryKey
) => {
  // Subscribe to the pusher channel and event which is inside a web worker
  worker.postMessage({
    type: "subscribe",
    channelName,
    eventNames,
  });

  const queryClient = useQueryClient();

  // Update the react-query cache when the web worker receives a message
  worker.onmessage = (event) => {
    const { eventName: action, data } = event.data;

    if (action === "updated") {
      // Update the cache with the new data
      queryClient.setQueryData(queryKey, (oldData) => {
        return oldData.map((t) => (t.id === data.id ? data : t));
      });
    } else if (action === "inserted") {
      // Update the cache with the new data
      queryClient.setQueryData(queryKey, (oldData) => {
        if (!oldData.find((t) => t.id === data.id)) {
          return [...oldData, data];
        }
      });
    } else if (action === "deleted") {
      // Update the cache with the new data
      queryClient.setQueryData(queryKey, (oldData) => {
        return oldData.filter((t) => t.id !== data.id);
      });
    }
  };
};
