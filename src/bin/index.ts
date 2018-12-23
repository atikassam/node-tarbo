import * as express from 'express';
import {environment} from "@app/env";
import {logger} from "@util/logger";
import {routes} from "@lib/router";
import {connectToDb} from "@util/db";

const app = express();

// Configure routes
app.use('/', routes);

// Connect to database
connectToDb()
    // Start server after database connection stabilised
    .then(() => {
        app.listen(environment.port, () => {
            logger.log('info', `Server started on port: ${environment.port}`)
        });
    });

