import {EnvironmentInterface} from "./environment.interface";
import * as env from "./environment.default";

export const environment: EnvironmentInterface  = Object.assign(env.environment, {
    mode: 'dev',
    port: 8082,
    logs: {
        info: './logs/info.log',
        warning: './logs/warning.log',
        error: './logs/error.log',
    }
});