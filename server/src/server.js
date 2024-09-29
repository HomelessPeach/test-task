const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const {application} = require("../config");
const {routerApi} = require("./api/api.route");
const {appRouter} = require("./api/routes/app.route");
const {ErrorMiddleware} = require("./middlewares/error-middleware");

const app = express();


const run = async () => {

    const corsOptions = {
        origin: (origin, callback) => {
            if (application.cors.whiteList.indexOf(origin) !== -1 || origin === undefined) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true
    };


    app
        .use(cors(corsOptions))
        .use(bodyParser.json())
        .use('/api', routerApi)
        .use(express.static(path.join(__dirname, 'public')))
        .use(express.static(path.join(__dirname, 'public/app')))
        .use('/', appRouter)
        .use(ErrorMiddleware)
        .listen(application.port, () => {
            console.info(`App start: http://${application.domain}:${application.port}`);
        });
};

module.exports = {run};