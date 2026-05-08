import express from "express";

import { SESSIONS } from "../data/session.store.js";

const router = express.Router();

router.get("/", (_, res) => {
  res.json(SESSIONS);
});

export default router;