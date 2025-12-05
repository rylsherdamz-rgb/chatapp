import {io} from "socket.io-client";

const SOCKET_URL = "http://localhost:3000"; // Replace with your server URL

export const socketClient = io(SOCKET_URL, {
  autoConnect: false,
  transports: ["websocket"],
});
