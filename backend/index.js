import { WebSocketServer } from "ws";

const PORT = 8080;

const wss = new WebSocketServer({ port: PORT });

console.log(`✅ WebSocket server running on ws://localhost:${PORT}`);

wss.on("connection", (ws) => {
  console.log("🟢 Client connected");

  ws.on("message", (message) => {
    try {
      // 🔶 Change 1: Parse JSON message
      const data = JSON.parse(message.toString()); // 🔶

      // 🔶 Change 2: Broadcast parsed JSON to all clients
      wss.clients.forEach((client) => {
        if (client.readyState === ws.OPEN) {
          client.send(JSON.stringify(data)); // 🔶
        }
      });
    } catch (e) {
      console.log("❌ Invalid message format", e);
    }
  });

  ws.on("close", () => {
    console.log("🔴 Client disconnected");
  });
});

