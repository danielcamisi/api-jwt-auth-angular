import express from "express";
import { register, login, me } from "./UserController";
import authenticate from "../middleware/authenticate";
import { Request, Response, NextFunction } from "express";

const userRoute = express.Router();

userRoute.post('/register', register)

userRoute.post('/login', login)

userRoute.get('/me', authenticate, me)

export default userRoute;