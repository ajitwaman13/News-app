import express from "express";
import { dbconnection } from "./config/db.js";
import UserRoutes from "./routes/user_router.js";
import NewsRoutes from "./routes/news_router.js";
import { auth } from "./middleware/auth.js";
const app = express();

const PORT = 3000;

await dbconnection();

app.use(express.json());

// console.log(auth);

// routes
app.use("/api/user", UserRoutes);
app.use("/api/news", NewsRoutes);
// test url
app.get("/", (req, res) => {
  res.json({ message: "backend working ..." });
});

app.listen(PORT, () => {
  console.log("Server running on 3000");
});
