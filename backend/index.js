import { MongoClient, ServerApiVersion } from "mongodb";
import express from "express";
import cors from "cors";
import http from "http";
import WebSocket, { WebSocketServer } from "ws";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 8080;




const uri = "mongodb+srv://chatmaster:9t3qm5LQiaFbbTiU@cluster0.knekqnq.mongodb.net/?appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

 await client.connect();

 const db = client.db("messagehouse");
const messageCollection = db.collection("messages");


app.get("/chatmessage", async (req, res) => {
  const messages = await messageCollection.find().sort({ createdAt: 1 }).toArray();
  res.json(messages);
});

// Express routes
app.get("/", (req, res) => {
  res.send("Server is running!");
});



// Create HTTP server
const server = http.createServer(app);

// Attach WebSocket to same server
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("🟢 Client connected");

  ws.on("message", async (message) => {
    const data = JSON.parse(message.toString());
    const chatData = {
      text: data.text,
      sender: data.sender,
      createdAt: new Date()
    };
    await messageCollection.insertOne(chatData); // instantly save
    // broadcast
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(chatData));
      }
    });
  });

  ws.on("close", () => console.log("🔴 Client disconnected"));
});

server.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));