import * as express from 'express';
import { dbInit, corsInit } from '@/startup';
import { apiRoute, errorHandlesRoute } from '@/_routes';

class App {

    public app: express.Application;

    constructor() {
        // Connect to database
        dbInit();

        this.app = express(); //TK
        this.config();

        // import api routes
        this.app.use(apiRoute)

        // import error handle routes
        this.app.use(errorHandlesRoute)
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