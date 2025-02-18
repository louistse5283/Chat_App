import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

dotenv.config(); // access to the environment variable

const PORT = process.env.PORT; // using the PORT at .env
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true, // allow cookies and authentications to be sent as a request
}));

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

// starting server
server.listen(PORT, () => {
    console.log("server is running on PORT:" + PORT);
    connectDB();
});