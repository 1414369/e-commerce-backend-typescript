import * as express from 'express';
import { db, cors } from '@/_startup';
import rootRoute from '@/routes';

class App {

    public app: express.Application;

    constructor() {
        // Start connect to database
        db();

        this.app = express(); //TK
        this.config();

        // import all routes
        this.app.use(rootRoute)
    }

    private config(): void {
        // support application/json type post data
        this.app.use(express.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(express.urlencoded({
            extended: false
        }));

        // Cors
        this.app.use(cors);
    }

}

export default new App().app;