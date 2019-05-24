
import * as config from 'config';
import * as cors from "cors";

export function corsInit() {
    const defaultOrigin: string = config.get('fontendUrl');

    const options: cors.CorsOptions = {
        origin: defaultOrigin,
        allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
        methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    };

    return cors(options);
}
