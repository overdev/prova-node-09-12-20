import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';

const CONTEXT = 'Controlador SAMPLE';

const sampleHealthCheck = (req: Request, res: Response, next: NextFunction) => {
    logging.info(CONTEXT, 'Rota de checagem SAMPLE chamada.');

    return res.status(200).json({
        message: 'pong',
    });
};

export default { sampleHealthCheck };
