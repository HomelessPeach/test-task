const {Router} = require("express");
const {routerAuthor} = require("./routes/author.route");
const {routerBook} = require("./routes/book.route");


const routerApi = Router();

routerApi
    .use('/author', routerAuthor)
    .use('/book', routerBook);

module.exports = {routerApi};