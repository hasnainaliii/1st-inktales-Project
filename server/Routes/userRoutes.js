import express from "express";

import { userSignIn, userSignUp } from "../controller/userController.js";

const userRoutes = express.Router();

userRoutes.post("/signin", userSignIn);
userRoutes.post("/signup", userSignUp);

export default userRoutes;
