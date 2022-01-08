const { Sequelize } = require('sequelize');
const mysql = require('mysql2/promise');


// Option 3: Passing parameters separately (other dialects)

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.HOST,
    dialect: 'mysql'
});

const startConnection = async () => {

    try {
        const connection = await mysql.createConnection({
        host: process.env.HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER, 
        password: process.env.DB_PASS
        });
        //drop db
        // await connection.query('DROP DATABASE IF EXISTS ' + process.env.DB_NAME);
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;` );

        // await sequelize.drop();
        await sequelize.sync({ alter: true, force:true, match: /_test$/ });
        // await sequelize.sync({ alter: true, match: /_test$/ });

        // await sequelize.sync();



        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = {
    startConnection, 
    sequelize
}