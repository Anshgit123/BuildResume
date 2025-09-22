import express from "express";
import { getUserprofile, loginUser, registerUser } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";


const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)

//PROTECTED ROUTE AS TOKEN IS REQUIRED HERE 
userRouter.get('/profile', protect, getUserprofile)

export default userRouter