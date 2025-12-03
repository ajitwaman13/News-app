import mongoose from "mongoose";
// 
export async function dbconnection() {
  mongoose
    .connect("mongodb://127.0.0.1:27017/NewsDatabase")
    .then(() => {
      console.log("Database is connected...");
    })
    .catch((e) => {
      console.log("Database connection error", e);
    });
}
