import express from 'express'
import upload from '../middleware/multer.middleware.js';
import { loginUser, logoutUser, registerUser} from '../controller/user.controller.js';
import { authorizedRoles, verifyToken } from '../middleware/auth.middleware.js';


const userRouter  = express.Router()

userRouter.post('/register', upload.single('profilePic'),registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/logout',logoutUser)



export default userRouter;