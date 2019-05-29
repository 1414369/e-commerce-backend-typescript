import * as express from 'express';
import { dbInit, corsInit, unhandledRejection } from '@/startup';
import { apiRouter, errorHandlesRouteInit } from '@/_routes';
import 'express-async-errors';
class App {

    public app: express.Application;

    constructor() {
        unhandledRejection();

        // Connect to database
        dbInit();

        this.app = express(); //TK
        this.config();

        // import api routes
        this.app.use(apiRouter);

        // import api routes
        errorHandlesRouteInit(this.app);
    }

    private config(): void {
        // support application/json type post data
        this.app.use(express.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(express.urlencoded({
            extended: false
        }));

        // Cors
        this.app.use(corsInit());
    }

}

export default new App().app;