import express from "express";
import { createWork, getClassWork, getWorkDetails } from "../controllers/workController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route('/').get(protect, getClassWork).post(createWork);
router.get('/:id', getWorkDetails);

export default router;