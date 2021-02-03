import dotenv from 'dotenv';

export interface IToken {
    expireTime: string;
    issuer: string;
    secret: string;
}
export interface IServer {
    hostname: string;
    port: string | number;
    token: IToken;
}
export interface IConfig {
    server: IServer;
}

// carrega as variáveis de ambiente.
dotenv.config();

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
    server: SERVER,
};

export default config;
