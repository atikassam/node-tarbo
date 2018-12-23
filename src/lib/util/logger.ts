import {createLogger, format, transports} from "winston";
import {environment} from "@app/env";

const customFormat = format.printf((info) => {
    // console.log(info.stack);
    return `[${info.timestamp}]: 
\t${JSON.stringify(info)} 
\t${info.stack ? info.stack : ''}
`;
});

export const logger = createLogger({
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        verbose: 3,
        debug: 4,
        silly: 5
    },
    format: format.combine(
        format.timestamp(),
        customFormat
    ),
    transports: [
        new transports.File({ filename: environment.logs.info, level: 'info' }),
        new transports.File({ filename: environment.logs.warning, level: 'warning' }),
        new transports.File({ filename: environment.logs.error, level: 'error' }),
    ]
});

if (environment.mode !== 'prod') {
    logger.add(new transports.Console({
        format: format.simple()
    }));
}