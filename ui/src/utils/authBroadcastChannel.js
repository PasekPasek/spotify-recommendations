const channel = new BroadcastChannel('spotify-auth');

export const postBcMessage = (msg) => channel.postMessage(msg);

export const addBcMessageListener = (callback) => {
    channel.onmessage = (event) => callback(event);
};
