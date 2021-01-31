/**
 * Retorna a data/hora atual em formato de fácil legibilidade.
 * @returns data e hora como string.
 */
const getTimeStamp = (): string => {
    return new Date().toLocaleString();
};

/**
 * Exibe uma mensagem de aviso (e um objeto opcional) no contexto especificado.
 * @param context contexto em que o aviso está sendo emitido.
 * @param message a mensagem a ser exibida no console.
 * @param object objeto opcional a ser inspecionado no console.
 * @returns void.
 */
const warn = (context: string, message: string, object?: any) => {
    if (object) {
        console.warn(`${getTimeStamp()} :: WARN :: ${context} :: ${message}`, object);
    } else {
        console.warn(`${getTimeStamp()} :: WARN :: ${context} :: ${message}`);
    }
};

/**
 * Exibe uma mensagem de erro (e um objeto opcional) no contexto especificado.
 * @param context contexto em que o erro está sendo emitido.
 * @param message a mensagem a ser exibida no console.
 * @param object objeto opcional a a ser inspecionado no console.
 * @returns void.
 */
const error = (context: string, message: string, object?: any) => {
    if (object) {
        console.error(`${getTimeStamp()} :: ERROR :: ${context} :: ${message}`, object);
    } else {
        console.error(`${getTimeStamp()} :: ERROR :: ${context} :: ${message}`);
    }
};

/**
 * Exibe uma mensagem de depuração (e um objeto opcional) no contexto especificado.
 * @param context contexto em que a informação de depuração está sendo emitida.
 * @param message a mensagem a ser exibida no console.
 * @param object objeto opcional a a ser inspecionado no console.
 * @returns void.
 */
const debug = (context: string, message: string, object?: any) => {
    if (object) {
        console.debug(`${getTimeStamp()} :: DEBUG :: ${context} :: ${message}`, object);
    } else {
        console.debug(`${getTimeStamp()} :: DEBUG :: ${context} :: ${message}`);
    }
};

/**
 * Exibe uma mensagem de informação (e um objeto opcional) no contexto especificado.
 * @param context contexto em que a informação está sendo emitida.
 * @param message a mensagem a ser exibida no console.
 * @param object objeto opcional a a ser inspecionado no console.
 * @returns void.
 */
const info = (context: string, message: string, object?: any) => {
    if (object) {
        console.info(`${getTimeStamp()} :: INFO :: ${context} :: ${message}`, object);
    } else {
        console.info(`${getTimeStamp()} :: INFO :: ${context} :: ${message}`);
    }
};

export default {
    info,
    warn,
    error,
    debug,
};
