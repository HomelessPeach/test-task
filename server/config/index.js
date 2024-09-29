require('dotenv').config();

module.exports = {
    application: {
        domain: process.env.DOMAIN || 'localhost',
        port: process.env.PORT,
        cors: {
            whiteList: [
                'http://localhost:3000',
                `http://${process.env.DOMAIN}:${process.env.PORT}`,
            ],
        }
    },
    database: {
        host: process.env.POSTGRES_HOST,
        database: process.env.POSTGRES_DATABASE,
        port: process.env.POSTGRES_PORT,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
    }
};