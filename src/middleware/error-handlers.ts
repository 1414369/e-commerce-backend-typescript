import { Response, NextFunction, RequestHandler } from "express";
import { logger, HTTPError } from "@/helpers";

export class ErrorHandle {
    static notFoundError = (req, res, next) => {
        throw new HTTPError.Code404("Method not found.");
    };

    static clientError = (err, req, res, next) => {
        if (err instanceof HTTPError.ClientError) {
            logger.warn(err);
            res.status(err.statusCode).send(err.message);
        } else {
            next(err);
        }
    };

    static serverError = (err, req, res, next) => {
        logger.error(err);
        if (process.env.NODE_ENV === "production") {
            res.status(500).send("Internal Server Error");
        } else {
            res.status(500).send(err.stack);
        }
    };
}
