const DB = require('../utils/db');

const connect = DB.con;
const Sequelize = DB.Sequelize;

DB.models = {
    User: require('./user')(connect, Sequelize.DataTypes),
    Test: require('./test')(connect, Sequelize.DataTypes)
}

module.exports = DB;