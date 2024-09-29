const {AuthorDatabaseService} = require('./author.database-service');

class AuthorService {

    static async getAuthors(offset, limit) {
        const authors = await AuthorDatabaseService.getAuthors(offset, limit);
        const countAuthors = await AuthorDatabaseService.getAuthorsCount();
        return {authors, countAuthors};
    }

    static async getShortListAuthors() {
        return await AuthorDatabaseService.getShortListAuthors();
    }

}

module.exports = {AuthorService};