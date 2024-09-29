const {QueryTypes} = require('sequelize');
const {SequelizeConnect} = require('../database-connect.service');

class BookDatabaseService {

    static async getBooks(offset = 0, limit = 0) {
        const query = await SequelizeConnect.query(`SELECT test_task_1.get_books($offset, $limit) `, {
            bind: {
                offset,
                limit
            },
            type: QueryTypes.SELECT
        });
        return query[0].get_books;
    }

    static async getBooksCount() {
        const query = await SequelizeConnect.query(`SELECT test_task_1.get_books_count()`, {
            type: QueryTypes.SELECT,
        });
        return query[0].get_books_count;
    }

    static async createBook(bookData, transaction) {
        await SequelizeConnect.query(`CALL test_task_1.create_book($bookData) `, {
            bind: {
                bookData
            },
            transaction
        });
    }

    static async updateBook(bookId, bookData, transaction) {
        await SequelizeConnect.query(`CALL test_task_1.update_book($id, $bookData) `, {
            bind: {
                id: bookId,
                bookData
            },
            transaction
        });
    }

    static async deleteBook(bookId, transaction) {
        await SequelizeConnect.query(`CALL test_task_1.delete_book($id) `, {
            bind: {
                id: bookId
            },
            transaction
        });
    }

}

module.exports = {BookDatabaseService};