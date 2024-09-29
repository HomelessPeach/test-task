const {Router} = require("express");
const {BookController} = require("../controllers/book.controller");

const routerBook = Router();

routerBook
    .get('/', BookController.getBooks)
    .post('/', BookController.createBook)
    .put('/:id', BookController.updateBook)
    .delete('/:id', BookController.deleteBook);

module.exports = {routerBook};