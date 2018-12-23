import { connect, connection } from 'mongoose';
import { logger } from './logger';
import { environment } from "@app/env";

// connect to mongo db
const mongoUri: string = environment.mongodb_host;
export function connectToDb(): Promise<any> {
    console.log(`connecting to ${ mongoUri }..`);

    return connect(mongoUri, { server: { socketOptions: { keepAlive: 1 } } })
        .then((res: any) => {
            logger.log('info', `Connected to MongoDB`);
        })
        .catch(() => {
            logger.info(`Unable to connect to database: ${mongoUri}`);
        });
}

connection.on('error', () => {
    throw new Error(`Unable to connect to database: ${mongoUri}`);
});
