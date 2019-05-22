import app from "./app";
import { logger } from '@/_helpers';


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    logger.info('listening on port ' + PORT);
})