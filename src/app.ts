import * as express from 'express';
import { Pokemons } from "./routes/pokemons";
import { db, cors } from '@/_startup';

class App {

    public app: express.Application;

    public pokeRoutes: Pokemons = new Pokemons();

    constructor() {
        // Start connect to database
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

        // Cors
        this.app.use(cors);
    }

}

export default new App().app;