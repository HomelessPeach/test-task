const {BookDatabaseService} = require("./book.database-service");

class BookService {

    static async getBooks(offset, limit) {
        const books = await BookDatabaseService.getBooks(offset, limit);
        const countBooks = await BookDatabaseService.getBooksCount();
        return {books, countBooks};
    }

    static async createBook(bookData, transaction) {
        const clearBookData = BookService.clearBookData(bookData);
        await BookDatabaseService.createBook(clearBookData, transaction);
    }

    static async updateBook(bookId, bookData, transaction) {
        const clearBookData = BookService.clearBookData(bookData);
        await BookDatabaseService.updateBook(bookId, clearBookData, transaction);
    }

    static async deleteBook(bookId, transaction) {
        await BookDatabaseService.deleteBook(bookId, transaction);
    }

    static clearBookData (bookData) {
        return {
            title: bookData.title,
            releaseDate: bookData.releaseDate || null,
            price: bookData.price || null,
            mark: bookData.mark || null,
            authorId: bookData.authorId || null,

        }
    }
}

module.exports = {BookService};