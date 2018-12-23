import * as env from "./environment.default";

export const environment = Object.assign(env.environment, {
    mode: 'development',
    logs: {
        info: './logs/info.log',
        warning: './logs/warning.log',
        error: './logs/error.log',
    }
});