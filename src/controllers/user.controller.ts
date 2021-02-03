import { Request, Response, NextFunction } from 'express';
import bcryptjs from 'bcryptjs';
import logging from '../config/logging';

const CONTEXT: string = 'Controlador USER';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    logging.info(CONTEXT, 'Token validated.');

    return res.status(200).json({
        message: 'Autorizado.',
    });
};

const registerRoute = (req: Request, res: Response, next: NextFunction) => {
    let { username, password } = req.body;

    bcryptjs.hash(password, 10, (hashError: Error, hash: string) => {
        if (hashError) {
            return res.status(500).json({
                message: hashError.message,
                error: hashError,
            });
        }

        // TODO: fazer insert do usuário no banco
    });
};

const loginRoute = (req: Request, res: Response, next: NextFunction) => {};

const getAllUsers = (req: Request, res: Response, next: NextFunction) => {};

export default { validateToken, registerRoute, loginRoute, getAllUsers };
