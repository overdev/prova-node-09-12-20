import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import logging from '../config/logging';

const CONTEXT: string = 'AUTENTICAÇÃO';

const extractJWT = (req: Request, res: Response, next: NextFunction) => {
    logging.info(CONTEXT, 'Validando Token');

    let token = req.headers.authorization?.split(' ')[1];

    if (token) {
        jwt.verify(token, config.server.token.secret, (error: Error | null, decoded: any | null) => {
            if (error) {
                return res.status(404).json({
                    message: error.message,
                    error,
                });
            } else {
                res.locals.jwt = decoded;
                next();
            }
        });
    } else {
        return res.status(401).json({
            message: 'Não Autorizado.',
        });
    }
};

export default extractJWT;
