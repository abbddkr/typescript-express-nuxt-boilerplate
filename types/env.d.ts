declare global{
    namespace NodeJS {
        interface ProcessEnv {
            SERVER_PORT: string,
            NODE_ENV: 'production' | 'dev',
            SECRET_KEY: string,
            DB_DRIVER: string,
            DB_NAME: string,
            DB_USER: string,
            DB_PASS: string,
            SMTP_HOST:string,
            SMTP_PORT:string,
            SMTP_USER:string,
            SMTP_PASS:string,
        }
    }
}

export {}
