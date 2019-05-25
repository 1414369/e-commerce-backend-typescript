abstract class ClientError extends Error {
    readonly statusCode!: number;
    readonly name!: string;

    constructor(message: object | string) {
        if (message instanceof Object) {
            super(JSON.stringify(message));
        } else {
            super(message);
        }
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

class Code400 extends ClientError {
    readonly statusCode = 400;

    constructor(message: string | object = "Bad Request") {
        super(message);
    }
}

class Code401 extends ClientError {
    readonly statusCode = 401;

    constructor(message: string | object = "Unauthorized") {
        super(message);
    }
}

class Code403 extends ClientError {
    readonly statusCode = 403;

    constructor(message: string | object = "Forbidden") {
        super(message);
    }
}

class Code404 extends ClientError {
    readonly statusCode = 404;

    constructor(message: string | object = "Not found") {
        super(message);
    }
}

export const HTTPError = {
    ClientError,
    Code400,
    Code401,
    Code403,
    Code404,
}