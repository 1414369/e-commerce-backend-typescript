import { Logger, LoggerOptions, transports, createLogger, format } from "winston";
import * as config from 'config';

class loggerClass {
    public logger: Logger

    private defaultLevel: string = config.get('logLevel');

    private options: LoggerOptions = {
        exitOnError: false,
        level: this.defaultLevel,
        transports: [
            //
            // - Write to all logs with level `info` and below to `combined.log` 
            // - Write all logs error (and below) to `error.log`.
            //
            new transports.File({ filename: 'logs/combined.log' }),
            new transports.File({ filename: 'logs/error.log', level: 'error' }),
        ],

        exceptionHandlers: [
            new transports.Console(),
            new transports.File({ filename: 'logs/exceptions.log' }),
        ]
    };

    constructor() {
        this.logger = createLogger(this.options);

        if (process.env.NODE_ENV === "development") {
            this.logger.add(new transports.Console({
                format: format.combine(
                    format.colorize(),
                    format.simple(),
                    format.timestamp(),
                )
            }));
        }
    }
}

export let logger = new loggerClass().logger;