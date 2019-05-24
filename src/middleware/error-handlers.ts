import { Response, NextFunction } from "express";
import { logger, HTTPClientError, HTTP404Error } from "@/helpers";

export class ErrorHandle {
    static notFoundError = (res: Response, next: NextFunction) => {
        throw new HTTP404Error("Method not found.");
    };

    static clientError = (err: Error, res: Response, next: NextFunction) => {
        if (err instanceof HTTPClientError) {
            logger.warn(err);
            res.status(err.statusCode).send(err.message);
        } else {
            next(err);
        }
    };

    static serverError = (err: Error, res: Response, next: NextFunction) => {
        logger.error(err);
        if (process.env.NODE_ENV === "production") {
            res.status(500).send("Internal Server Error");
        } else {
            res.status(500).send(err.stack);
        }
    };
}
