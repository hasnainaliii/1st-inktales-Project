import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import userRoutes from "./Routes/userRoutes.js";

const server = express();

server.use(express.json());
server.use(cors());
let PORT = 3000;

mongoose.connect(process.env.DB_LOCATION, { autoIndex: true });

server.use("/api", userRoutes);

server.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
