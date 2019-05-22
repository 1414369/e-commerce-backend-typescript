import * as express from 'express';
import { Pokemons } from "./routes/pokemons";
import { db } from '@/_startup';

class App {

    public app: express.Application;

    public pokeRoutes: Pokemons = new Pokemons();

    constructor() {
        db();

        this.app = express(); //TK
        this.config();

        this.pokeRoutes.routes(this.app);
    }

    private config(): void {
        // support application/json type post data
        this.app.use(express.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(express.urlencoded({
            extended: false
        }));
    }

}

export default new App().app;