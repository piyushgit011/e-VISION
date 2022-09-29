import express from "express";
import { Login, RegisterUser, UpdateUser, UserDetails } from "../controllers/UserController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route('/').post(RegisterUser).put(protect, UpdateUser)
router.post('/login',Login);
router.get('/:id', UserDetails);

export default router;