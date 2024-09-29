const {Sequelize} = require('sequelize');
const {database} = require('../../config');

const SequelizeConnect = new Sequelize({
    dialect: 'postgres',
    host: database.host,
    database: database.database,
    port: database.port,
    username: database.username,
    password: database.password,
});

module.exports = {SequelizeConnect};