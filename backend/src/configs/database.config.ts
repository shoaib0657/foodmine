import { connect, ConnectOptions } from "mongoose";

export const dbConnect = () => {
    connect(process.env.MONGODB_URL!).then(
        () => {
            console.log("Database connected successfully");
        },
        (error) => {
            console.error("Database connection failed");
            console.error(error);
        }
    )
}