import { Request, Response, NextFunction } from 'express';
import IUser from '../interfaces/user.interface';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import logging from '../config/logging';

const CONTEXT: string = 'AUTENTICAÇÃO';

const signJWT = (user: IUser, callback: (error: Error | null, token: string | null) => void): void => {
    let timeSinceEpoch = new Date().getTime();
    let expirationTime = timeSinceEpoch + Number(config.server.token.expireTime) * 100_000;
    let expirationTimeInSec = Math.floor(expirationTime / 1000);

    logging.info(CONTEXT, `Tentativa de logar o usuário ${user.username}.`);

    try {
        jwt.sign({ username: user.username }, config.server.token.secret, { issuer: config.server.token.issuer, algorithm: 'HS256', expiresIn: expirationTimeInSec }, (error, token) => {
            if (error) {
                callback(error, null);
            } else if (token) {
                callback(null, token);
            }
        });
    } catch (error) {
        logging.error(CONTEXT, error.message, error);
        callback(error, null);
    }
};

export default signJWT;
