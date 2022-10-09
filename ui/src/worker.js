import Pusher from "pusher-js/worker";

const pusher = new Pusher(import.meta.env.VITE_PUSHER_CLIENT_KEY, {
  cluster: "ap2",
  // authEndpoint: 'http://localhost:3000/pusher/auth',
  // auth: {
  //   headers: {
  //     Authorization: 'Bearer PUSHER_APP_SECRET',
  //   },
  // },
});

onmessage = (event) => {
  console.log("Message received from main script");

  // handle channel events from main thread
  const { data } = event;
  if (data.type === "subscribe") {
    const { channelName, eventNames } = data;

    const chan = pusher.subscribe(channelName);

    // loop through event names and bind to channel
    eventNames.forEach((eventName) => {
      chan.bind(eventName, (data) => {
        // send event data to main thread
        postMessage({ eventName, data });
      });
    });
  }
};

// handle pusher events
pusher.connection.bind("connected", () => {
  console.log("connected");
});
