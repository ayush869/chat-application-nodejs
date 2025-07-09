const net = require("net");
const db = require("../db/connection");
const clients = {};

const server = net.createServer((socket) => {
  let userKey = null;

  socket.on("data", async (data) => {
    try {
      const message = JSON.parse(data.toString());
      console.log("Received from client:", message);

      // First time login
      if (message.api_uni && message.api_key && !userKey) {
        const [rows] = await db.query(
          "SELECT * FROM users WHERE api_uni = ? AND api_key = ?",
          [message.api_uni, message.api_key]
        );

        if (rows.length > 0) {
          userKey = message.api_uni;
          clients[userKey] = socket;
          socket.write(JSON.stringify({ status: "Authenticated" }));
        } else {
          socket.write(JSON.stringify({ error: "Invalid credentials" }));
          socket.end();
        }
        return;
      }

      // Chat message delivery
      if (message.to && message.msg && userKey) {
        const toSocket = clients[message.to];
        if (toSocket) {
          toSocket.write(JSON.stringify({ from: userKey, msg: message.msg }));
        }
      }
    } catch (err) {
      console.error("Error parsing socket data:", err.message);
    }
  });

  socket.on("end", () => {
    if (userKey) {
      delete clients[userKey];
      console.log(`${userKey} disconnected`);
    }
  });
});

server.listen(9000, '192.168.1.8', () => {
  console.log("✅ TCP Socket Server running on port TCP Server running on 192.168.1.8:9000");
});
