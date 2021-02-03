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

export interface IMongoDBOptions {
    useUnifiedTopology: boolean;
    useNewUrlParser: boolean;
    socketTimeoutMS: number;
    keepAlive: boolean;
    poolSize: number;
    autoIndex: boolean;
    retryWrites: boolean;
}

export interface IMongoConnection {
    host: string;
    password: string;
    username: string;
    url: string;
}
