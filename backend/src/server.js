import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

const app = express();
const PORT = process.env.PORT || 5001;

//Middle Ware
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(rateLimiter);

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

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});
