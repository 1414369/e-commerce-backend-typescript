import { ErrorHandle } from '@/middleware';
import * as express from 'express';
import { dbInit, corsInit, unhandledRejection } from '@/startup';
import { apiRouter } from '@/api';
import 'express-async-errors';
class App {

    public app: express.Application;

    constructor() {
        unhandledRejection();

        // Connect to database
        dbInit();

        this.app = express(); //TK
        this.config();

        this.app.route("/").options((req, res, next) => {
            res.writeHead(200);
            res.end();
        })

        // import api routes
        this.app.use(apiRouter);

        //Error handler
        this.app.use(ErrorHandle.notFoundError);
        this.app.use(ErrorHandle.clientError);
        this.app.use(ErrorHandle.serverError);
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