import express from 'express';
import { login, me, register} from './UserController';


const userRoute = express.Router();

userRoute.post('/register', register)

userRoute.post('/login', login)

userRoute.post('/me', me)

export default userRoute;