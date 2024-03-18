import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import { updateUserContoller } from "../controllers/userController.js";

const router = express.Router();

//routes for GET USERS --> GET

router.get("");

//UPDATE USER --> PUT
router.put("/update-user", userAuth, updateUserContoller);
export default router;
