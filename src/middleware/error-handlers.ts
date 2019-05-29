import { logger, HTTPError } from "@/helpers";

export class ErrorHandle {
    static notFoundError = async (req, res, next) => {
        throw new HTTPError.Code404("Method not found.");
    };

    static clientError = async (err, req, res, next) => {
        if (err instanceof HTTPError.ClientError) {
            logger.warn("clientError: ", err);
            res.status(err.statusCode).send(err.message);
            res.end();
        } else {
            next(err);
        }
    };

    static serverError = async (err, req, res, next) => {
        logger.error("serverError: ", err);
        if (process.env.NODE_ENV === "production") {
            res.status(500).send("Internal Server Error");
        } else {
            res.status(500).send(err.stack);
        }

        res.end();
    };
}
