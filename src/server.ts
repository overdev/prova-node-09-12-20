import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import logging from './config/logging';
import config from './config/config';
// rotas
import userRoutes from './routes/user.route';

// Contexto das mensagens de log referentes a este arquivo
const CONTEXT = 'Servidor';

const router = express();

// CONEXAO COM O MONGODB

mongoose
    .connect(config.mongo.url, config.mongo.options)
    .then((result) => {
        logging.info(CONTEXT, 'Conectado com MongoDB!');
    })
    .catch((error) => {
        logging.error(CONTEXT, error.message, error);
    });

// DEFINIÇÃO DE ALGUNS MIDDLEWARES USADOS NAS REQUESTS

/* Logging das requests */
router.use((req, res, next) => {
    logging.info(CONTEXT, `MÉTODO - ${req.method}, URL - ${req.url}, IP - ${req.socket.remoteAddress}`);

    res.on('finish', () => {
        logging.info(CONTEXT, `MÉTODO - ${req.method}, URL - ${req.url}, IP - ${req.socket.remoteAddress}, STATUS - ${req.statusCode}`);
    });

    next();
});

/* Faz o parse da request */
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

/* Regras da API */
router.use((req, res, next) => {
    // Permite que as requests venham de qualquer lugar (opção dev-only; não usar em produção!)
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-Width, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
        return res.status(200).json({});
    }

    next();
});

// ROTAS
router.use('/api/user', userRoutes);

// TRATAMENTO DE ERROS
router.use((req, res, next) => {
    const error = new Error('Não encontrado.');

    return res.status(404).json({
        message: error.message,
    });

    next();
});

// CRIAÇÃO DO SERVIDOR
const httpServer = http.createServer(router);
httpServer.listen(config.server.port, config.server.hostname, () => logging.info(CONTEXT, `Servidor rodando em ${config.server.hostname}:${config.server.port}`));
