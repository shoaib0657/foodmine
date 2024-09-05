import dotenv from 'dotenv'
dotenv.config();

import express from "express";
import cors from "cors"
import foodRouter from "./routes/food.router";
import userRouter from "./routes/user.router";
import orderRouter from './routes/order.router';
import uploadRouter from './routes/upload.router';
import { dbConnect } from '../src/configs/database.config';

dbConnect();

const app = express();

app.get("/", (req, res) => res.send("Express on Vercel"));

app.use(express.json())
app.use(cors({
    credentials: true,
    origin: ["http://localhost:4200", "https://foodmine-akj16wfw6-shoaib0657s-projects.vercel.app"]
}));

//Implement everything on food.service

app.use("/api/foods", foodRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/upload", uploadRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started at http://localhost:` + port);
})

module.exports = app;