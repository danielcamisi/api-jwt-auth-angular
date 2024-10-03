import { Request, Response, NextFunction } from "express";
import { verify, JwtPayload } from "jsonwebtoken";
import config from "../config/config";

export interface AuthRequest extends Request {
    userId?: string;
}

const authenticate = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.header('Authorization'); // Corrigido para 'Authorization'

    if (!authHeader) {
        res.status(401).json({ message: 'É necessário o token de autorização' });
        return;
    }

    const tokenParts = authHeader.split(" ");

    if (tokenParts[0] !== "Bearer" || !tokenParts[1]) {
        res.status(401).json({ message: 'Formato de token inválido' });
        return;
    }

    const token = tokenParts[1];

    try {
        const decoded = verify(token, config.jwtSecret as string) as JwtPayload;

        if (!decoded.sub) {
            res.status(401).json({ message: 'Token não contém informações necessárias' });
            return;
        }

        (req as AuthRequest).userId = decoded.sub;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token não autorizado' });
        return;
    }
}

export default authenticate;