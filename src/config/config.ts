import { IConfig, IServer, IMongoConnection, IMongoDBOptions } from './config.interface';
import dotenv from 'dotenv';

// carrega as variáveis de ambiente.
dotenv.config();

const MONGO_OPTIONS: IMongoDBOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    socketTimeoutMS: 30_000,
    keepAlive: true,
    poolSize: 50,
    autoIndex: false,
    retryWrites: true,
};

const MONGO_USERNAME = process.env.MONGO_USERNAME || 'theUserName';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || 'theUserPassWord';
const MONGO_HOST = process.env.MONGO_HOST || 'cluster0.menhv.mongodb.net/sample?w=majority';

const MONGO_CONNECTION: IMongoConnection = {
    username: MONGO_USERNAME,
    password: MONGO_PASSWORD,
    host: MONGO_HOST,
    url: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}`,
    options: MONGO_OPTIONS,
};

// define a porta, com o default 1337
const SERVER_PORT: any = process.env.SERVER_PORT || 1337;

// define o nome do host, com default 'localhost'
const SERVER_HOSTNAME: any = process.env.SERVER_HOSTNAME || 'localhost';

// definições do jwt
const SERVER_TOKEN_EXPIRETIME: any = process.env.SERVER_TOKEN_EXPIRETIME || '3600';
const SERVER_TOKEN_ISSUER: any = process.env.SERVER_TOKEN_ISSUER || 'ProvaNodeJSHelpper';
const SERVER_TOKEN_SECRET: any = process.env.SERVER_TOKEN_SECRET || ':HELPPER.INTELLIGENT.SOLUTIONS:';

const SERVER: IServer = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
    token: {
        expireTime: SERVER_TOKEN_EXPIRETIME,
        issuer: SERVER_TOKEN_ISSUER,
        secret: SERVER_TOKEN_SECRET,
    },
};

const config: IConfig = {
    mongo: MONGO_CONNECTION,
    server: SERVER,
};

export default config;
