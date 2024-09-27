import { Request, Response, NextFunction } from "express";

const register = async( req: Request, res: Response, next: NextFunction) => {
    res.json({message: 'register'})
}

const login = async( req: Request, res: Response, next: NextFunction) => {
    res.json({message: 'login'})
}


const me = async( req: Request, res: Response, next: NextFunction) => {
    res.json({message: 'me function'})
}

export {
    register, me, login
}