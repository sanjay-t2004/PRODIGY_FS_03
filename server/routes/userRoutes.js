import express from "express";
import { deleteUser, editUser, fetchAllUsers, login, logout, signup, getOneUserById } from "../controllers/userController.js";
import upload from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.post('/signup', upload.single('image'), signup);
userRouter.post('/login', login);
userRouter.post('/all', fetchAllUsers);

userRouter.get('/one/:id', getOneUserById)

userRouter.get('/logout', logout);

userRouter.put('/edit/:id', upload.single('image'), editUser);

userRouter.delete('/delete/:id', deleteUser);

export default userRouter;