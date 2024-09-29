const {AuthorService} = require("../../services/author-services/author.service");

class AuthorController {

    static async getAuthors(req, res, next) {
        try {
            const {query} = req;
            const authorsData = await AuthorService.getAuthors(query.offset, query.limit);
            res.json(authorsData);
        } catch (err) {
            next(err);
        }
    }

    static async getShortListAuthors(req, res, next) {
        try {
            const authorsData = await AuthorService.getShortListAuthors();
            res.json(authorsData);
        } catch (err) {
            next(err);
        }
    }

}

module.exports = {AuthorController};