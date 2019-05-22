
import * as config from 'config';
import * as iCors from "cors";

class corsClass {
    public cors;

    private defaultOrigin: string = config.get('fontendUrl');

    private options: iCors.CorsOptions = {
        origin: this.defaultOrigin,
        allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
        methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    };

    constructor() {
        this.cors = iCors(this.options);
    }
}

export let cors = new corsClass().cors;