import { Logger, LoggerOptions, transports, createLogger, format } from "winston";
import * as config from 'config';

export const logger = loggerInit();

interface CustomeLogger extends Logger {
    waitForLogger?: Function;
}

function loggerInit(): CustomeLogger {

    const defaultLevel: string = config.get('logLevel');

    const consoleTransports = new transports.Console({
        format: format.combine(
            format.colorize(),
            format.simple(),
            format.timestamp(),
        )
    })

    const options: LoggerOptions = {
        exitOnError: false,
        level: defaultLevel,
        transports: [
            //
            // - Write to all logs with level `info` and below to `combined.log` 
            // - Write all logs error (and below) to `error.log`.
            //
            new transports.File({ filename: 'logs/combined.log' }),
            new transports.File({ filename: 'logs/error.log', level: 'error' }),
        ],

        exceptionHandlers: [
            consoleTransports,
            new transports.File({ filename: 'logs/exceptions.log' }),
        ]
    };

    let logger: CustomeLogger = createLogger(options);

    if (process.env.NODE_ENV === "development") {
        logger.add(consoleTransports);
    }

    logger.waitForLogger = function () {
        const transportsFinished = logger.transports.map(t => new Promise(resolve => t.on('finish', resolve)));
        logger.end();
        return Promise.all(transportsFinished);
    };

    return logger;
};