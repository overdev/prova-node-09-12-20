import dotenv from 'dotenv';

// carrega as variáveis de ambiente.
dotenv.config();

// define a porta, com o default 1337
const SERVER_PORT: any = process.env.SERVER_PORT || 1337;

// define o nome do host, com default 'localhost'
const SERVER_HOSTNAME: any = process.env.SERVER_HOSTNAME || 'localhost';

const SERVER: any = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
};

const config: any = {
    server: SERVER,
};

export default config;
