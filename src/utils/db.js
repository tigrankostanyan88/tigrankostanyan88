const Sequelize = require('sequelize');

const dbName = process.env.DB_NAME;
const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;

const dbConfig = {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    define: {
        timestamp: false,
        createdAt: false,
        updatedAt: false,
        freezeTableName: true
    }
};

const connect = new Sequelize(dbName, dbUsername, dbPassword, dbConfig);

connect
    .authenticate()
    .then(() => {
        console.log('DB connection ✔️');
    })
    .catch((e) => {
        console.error('Error connecting to the database:', e.message);
    });

const DB = { con: connect, Sequelize };

module.exports = DB;
