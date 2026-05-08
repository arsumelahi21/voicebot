import express from "express";

import {
  getRecommendations,
  getMenu,
} from "../controllers/menu.controller.js";

const router = express.Router();

router.get("/", getMenu);

router.post(
  "/recommendations",
  getRecommendations
);

export default router;