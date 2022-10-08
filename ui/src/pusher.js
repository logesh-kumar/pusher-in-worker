export const config = {
  // required config props
  clientKey: import.meta.env.VITE_PUSHER_CLIENT_KEY,
  cluster: "ap2",

  // optional if you'd like to trigger events. BYO endpoint.
  // see "Trigger Server" below for more info
  //triggerEndpoint: "/pusher/trigger",

  // required for private/presence channels
  // also sends auth headers to trigger endpoint
  //authEndpoint: "/pusher/auth",
  //   auth: {
  //     headers: { Authorization: "Bearer token" },
  //   },
};
