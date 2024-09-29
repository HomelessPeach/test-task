const {Router} = require("express");
const {AppController} = require("../controllers/app.controller")

const appRouter = Router()

appRouter
    .get('/*', AppController.getReactApp);

module.exports = {appRouter};