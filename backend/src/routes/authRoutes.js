import express from "express";

import authenticateUser from "../middleware/authMiddleware.js";
import { getUSerProfile, syncUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/sync", authenticateUser, syncUser);

router.post("/profile", authenticateUser, getUSerProfile);

export default router;
