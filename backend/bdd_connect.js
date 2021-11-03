// const Sequelize = require('sequelize');
// require('dotenv').config()

// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_MDP, {
//     host: 'localhost',
//     port: 3306,
//     dialect: 'mysql'
// }
// );


// sequelize.authenticate()
//     .then(() => console.log('Connection has been established successfully.'))
//     .catch((err) => console.log('Unable to connect to the database:', err));


// module.exports = sequelize;
// global.sequelize = sequelize;

const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'groupomania_db'
});

// simple query
connection.query(
  'SELECT * FROM `Users` ',
  function(err, results, fields) {
      console.log('Voici tous les utilisateurs dans la basse de donée')
    // console.log(results); // results contains rows returned by server
    console.log(results); // results contains rows returned by server
    // console.log(fields); // fields contains extra meta data about results, if available
  }
);
module.exports = connection