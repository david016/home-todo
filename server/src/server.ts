import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import { router as apiRouter } from "./routes/todo";
import cors from "cors";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.json());
app.use(cors());

app.use("/", apiRouter);

app.get("/", (req, res) => {
  res.send("API is UP");
});

io.on("connection", () => {
  console.log("connect");
});

mongoose.connect("mongodb://localhost:27017/todos").then(() => {
  console.log("connected to mongodb");

  httpServer.listen(3000, () => {
    console.log("API is listening on port 3000");
  });
  // httpServer.listen(4001, () => {
  //   console.log("API is listening on port 4001");
  // });
});
