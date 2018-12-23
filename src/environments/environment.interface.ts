export interface EnvironmentInterface  {
    mode: 'dev' | 'prod' | '',
    port?: number,
    mongodb_host?: string,
    logs?: {
        info: string,
        warning: string,
        error: string,
    }
};