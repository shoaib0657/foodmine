import { connect, ConnectOptions } from "mongoose";

export const dbConnect = () => {
    connect(process.env.MONGODB_URL!, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as ConnectOptions).then(
        () => {
            console.log("Database connected successfully");
        },
        (error) => {
            console.error("Database connection failed");
            console.error(error);
        }
    )
}