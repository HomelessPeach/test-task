const {Router} = require("express");
const {AuthorController} = require("../controllers/author.controller");

const routerAuthor = Router();

routerAuthor
    .get('/', AuthorController.getAuthors)
    .get('/shortlist', AuthorController.getShortListAuthors);

module.exports = {routerAuthor};