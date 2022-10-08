const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1489193",
  key: "b98ddfec11d4154fe75b",
  secret: "ef85ec552f5f98d99c64",
  cluster: "ap2",
  useTLS: true
});

pusher.trigger("my-channel", "my-event", {
  message: "hello world"
});