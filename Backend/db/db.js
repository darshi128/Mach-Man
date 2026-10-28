import mongoose from "mongoose";

export const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "Mach_Man",
        });

        console.log("Database connected successfully");
    } catch (err) {
        console.log("Error connecting to mongoDB:", err.message);
    }
};