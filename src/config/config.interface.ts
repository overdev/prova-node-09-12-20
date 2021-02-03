export interface IToken {
    expireTime: string;
    issuer: string;
    secret: string;
}
export interface IServer {
    hostname: number | undefined;
    port: string | number | undefined;
    token: IToken;
}
export interface IConfig {
    mongo: IMongoConnection;
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
    options: IMongoDBOptions;
}
