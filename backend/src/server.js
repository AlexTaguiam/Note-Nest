import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import path from "path";

import notesRoutes from "./routes/notesRoutes.js";

import authRoutes from "./routes/authRoutes.js";
import { connectDB } from "./config/db.js";
// import rateLimiter from "./middleware/rateLimiter.js";
import { error } from "console";

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

//Middle Ware
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}

app.use(express.json());
// app.use(rateLimiter);

// app.use((req, res, next) => {
//   req.timeNow = Date.now();
//   console.log(
//     `The Method used is ${req.method} at ${new Date(
//       req.timeNow
//     )} and the URL is ${req.url}`
//   );
//   next();
// });
app.use("/api/notes", notesRoutes);
app.use("/api/auth", authRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server started on PORT:", PORT);
    });
  })
  .catch((err) => {
    console.error("failed to connect to DB:", err);
    process.exit(1);
  });
