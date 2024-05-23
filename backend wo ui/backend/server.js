import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"

import connectToMongoDB from "./db/connectToMongoDB.js";

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json()); // to parse incomming req from (req.body)
app.use(cookieParser()); // to parse the imcomming cookie from (req.cookies)

//routes for authentication
app.use("/api/auth", authRoutes);

//routes for messages
app.use("/api/messages", messageRoutes);

//routes for user
app.use("/api/users", userRoutes);


app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is running on port ${PORT}`)
});

