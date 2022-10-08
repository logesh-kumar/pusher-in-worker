import { useChannel } from "@harelpls/use-pusher";
import { useEvent } from "@harelpls/use-pusher";
import { useQueryClient } from "@tanstack/react-query";

/**
 * React hook to subscribe to a pusher channel and event and update the react-query cache.
 * @param {string} channelName
 * @param {string} eventName
 * @param {string} queryKey
 * @param {(data: any, oldData: any) => any} handleQueryCacheUpdate
 * @returns {void}
 * @example
 * useReactQuerySubscription(
 * "todos",
 * "insert",
 * ["todos"],
 * (data, oldData) => [...oldData, data]
 * );
 */
export const useReactQuerySubscription = (
  channelName,
  eventName,
  queryKey,
  handleQueryCacheUpdate
) => {
  const channel = useChannel(channelName);
  const queryClient = useQueryClient();

  useEvent(channel, eventName, (data) => {
    queryClient.setQueryData(queryKey, (oldData) =>
      handleQueryCacheUpdate(data, oldData)
    );
  });
};
