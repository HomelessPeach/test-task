const {QueryTypes} = require('sequelize');
const {SequelizeConnect} = require('../database-connect.service');

class AuthorDatabaseService {

    static async getAuthors(offset = 0, limit = 10) {
        const query = await SequelizeConnect.query(`SELECT test_task_1.get_authors($offset, $limit)`, {
            bind: {
                offset,
                limit
            },
            type: QueryTypes.SELECT,
        });
        return query[0].get_authors;
    }

    static async getAuthorsCount() {
        const query = await SequelizeConnect.query(`SELECT test_task_1.get_authors_count()`, {
            type: QueryTypes.SELECT,
        });
        return query[0].get_authors_count;
    }

    static async getShortListAuthors() {
        const query = await SequelizeConnect.query(`SELECT test_task_1.get_short_list_authors()`, {
            type: QueryTypes.SELECT,
        });
        return query[0].get_short_list_authors;
    }

}

module.exports = {AuthorDatabaseService};