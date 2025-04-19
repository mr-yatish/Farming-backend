const express = require("express");
const connectDB = require("./db");
require("dotenv").config();
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Create a server instance
const server = http.createServer(app);

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Awake Api
app.get("/", (req, res) => {
  res.send("Server is awake!");
});

// Routes
app.use("/api/records", require("./routes/Record.router"));

// Start the server using `server.listen` instead of `app.listen`
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
