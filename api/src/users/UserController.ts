import { Request, Response, NextFunction } from "express";
import UserSchema from './UserSchema';
import createHttpError from 'http-errors';
import bcrypt from 'bcrypt'; 
import { sign } from "jsonwebtoken";
import config from "../config/config";
import { AuthRequest } from "../middleware/authenticate";

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name, email, password } = req.body;

    // Verifique se todos os campos estão preenchidos
    if (!name || !email || !password) {
        res.status(400).json({ error: 'Todos os campos precisam ser preenchidos' });
        return; // Usar return apenas para evitar a execução adicional
    }

    try {
        const user = await UserSchema.findOne({ email });
        if (user) {
            res.status(400).json({ error: 'O Usuário já existe' });
            return; // Usar return aqui também
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await UserSchema.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            status: true,
            message: 'O usuário foi criado',
            data: { _id: newUser._id, email: newUser.email },
        });
    } catch (error) {
        next(createHttpError(500, 'Algo deu errado! :(')); // Passar erro para o middleware de tratamento de erro
    }
}

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body;

    // Verifique se todos os campos estão preenchidos
    if (!email || !password) {
        res.status(400).json({ error: 'Todos os campos precisam ser preenchidos' });
        return; // Usar return aqui também
    }

    try {
        const user = await UserSchema.findOne({ email });
        if (!user) {
            res.status(400).json({ error: 'O Usuário não foi encontrado' });
            return; // Usar return aqui também
        }

        const isPasswordMatch = await bcrypt.compare(password, user!.password);
        if (!isPasswordMatch) {
            res.status(400).json({ error: 'Credenciais incorretas' });
            return; // Usar return aqui também
        }

        const token = sign({ sub: user!._id }, config.jwtSecret as string, {
            expiresIn: '1d',
        });

        res.status(200).json({
            status: true,
            message: 'Usuário logado',
            data: { _id: user!._id, email: user!.email, name: user!.name, token } // Incluindo o token na resposta
        });
    } catch (error) {
        next(createHttpError(500, 'Algo deu errado! :(')); // Passar erro para o middleware de tratamento de erro
    }
}
const me = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const _request = req as AuthRequest;
    try {
        const user = await UserSchema.findById(_request.userId);
        if (!user) {
            res.status(404).json({ error: 'Usuário não encontrado' });
            return; // Usar return aqui também
        }

        res.status(200).json({
            status: true,
            data: { _id: user._id, email: user.email, name: user.name }
        });
    } catch (error) {
        next(createHttpError(500, 'Algo deu errado! :(')); // Passar erro para o middleware de tratamento de erro
    }
}


   export { me};

