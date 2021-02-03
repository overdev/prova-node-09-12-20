import { Request, Response, NextFunction } from 'express';
import bcryptjs from 'bcryptjs';
import mongoose from 'mongoose';
import logging from '../config/logging';
import User from '../models/user.model';
import IUser from '../interfaces/user.interface';
import signJWT from '../functions/sign-jwt.function';

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

        // faça insert do usuário no banco
        const _user = new User({
            _id: new mongoose.Types.ObjectId(),
            username,
            password: hash,
        });

        return _user
            .save()
            .then((user: IUser) => {
                return res.status(201).json({
                    user,
                });
            })
            .catch((error: Error) => {
                return res.status(500).json({
                    message: error.message,
                    error,
                });
            });
    });
};

const loginRoute = (req: Request, res: Response, next: NextFunction) => {
    let { username, password } = req.body;

    User.find({ username })
        .exec()
        .then((users: IUser[]) => {
            if (users.length !== 1) {
                return res.status(401).json({
                    message: 'Não autorizado',
                });
            }

            bcryptjs.compare(password, users[0].password, (error: Error, result: any) => {
                if (error) {
                    logging.error(CONTEXT, error.message, error);
                    return res.status(401).json({
                        message: 'Não autorizado',
                    });
                } else if (result) {
                    signJWT(users[0], (_error: Error | null, token: string | null) => {
                        if (error) {
                            logging.error(CONTEXT, 'Não foi possível assinar o token', _error);
                            return res.status(401).json({
                                message: 'Não autorizado',
                                error: _error,
                            });
                        } else if (token) {
                            return res.status(200).json({
                                mensagem: 'Autenticação bem sucedida!',
                                token,
                                user: users[0],
                            });
                        }
                    });
                }
            });
        })
        .catch((error: Error) => {
            res.status(500).json({
                message: error.message,
                error,
            });
        });
};

const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
    User.find()
        .select('-password')
        .exec()
        .then((users: IUser[]) => {
            return res.status(200).json({
                users,
                count: users.length,
            });
        })
        .catch((error: Error) => {
            res.status(500).json({
                message: error.message,
                error,
            });
        });
};

export default { validateToken, registerRoute, loginRoute, getAllUsers };
