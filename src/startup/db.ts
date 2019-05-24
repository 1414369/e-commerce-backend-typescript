import * as mongoose from 'mongoose';
import * as config from 'config';
import { logger } from '@/helpers';

export function dbInit() {
    const db: string = config.get('db');

    mongoose.connect(db)
        .then(() => logger.info(`Connected to ${db}...`));
}