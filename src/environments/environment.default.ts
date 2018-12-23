import {EnvironmentInterface} from "./environment.interface";

export const environment: EnvironmentInterface  = {
    mode: 'dev',
    port: 8080,
    mongodb_host: 'mongodb://localhost/api_v2',
    logs: {
        info: './logs/info.log',
        warning: './logs/warning.log',
        error: './logs/error.log',
    }
};