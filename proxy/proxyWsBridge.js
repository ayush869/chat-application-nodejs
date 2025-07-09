const WebSocket = require("ws");
const net = require("net");

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", function connection(ws) {
  const socket = new net.Socket();

  // Connect to backend TCP server
  socket.connect(9000, '192.168.1.8', () => {
    console.log('WebSocket client connected → TCP server ready');
  });

  // Relay messages from WebSocket → TCP
  ws.on("message", function incoming(data) {
    socket.write(data);
  });

  // Relay messages from TCP → WebSocket
  socket.on("data", (chunk) => {
    ws.send(chunk.toString());
  });

  // Handle disconnections
  ws.on("close", () => socket.destroy());
  socket.on("close", () => ws.close());
});

console.log("✅ WebSocket proxy running on ws://192.168.1.8:8080");
