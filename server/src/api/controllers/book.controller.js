const {SequelizeConnect} = require("../../services/database-connect.service");
const {BookService} = require("../../services/book-services/book.service");

class BookController {

    static async getBooks(req, res, next) {
        try {
            const {query} = req;
            const booksData = await BookService.getBooks(query.offset, query.limit);
            res.json(booksData);
        } catch (err) {
            next(err);
        }
    }

    static async createBook(req, res, next) {
        const transaction = await SequelizeConnect.transaction();
        try {
            const {body} = req;
            await BookService.createBook(body, transaction);
            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
            next(err);
        }
    }

    static async updateBook(req, res, next) {
        const transaction = await SequelizeConnect.transaction();
        try {
            const {params, body} = req;
            await BookService.updateBook(params.id, body, transaction);
            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
            next(err);
        }
    }

    static async deleteBook(req, res, next) {
        const transaction = await SequelizeConnect.transaction();
        try {
            const {params} = req;
            await BookService.deleteBook(params.id, transaction);
            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
            next(err);
        }
    }

}

module.exports = {BookController};