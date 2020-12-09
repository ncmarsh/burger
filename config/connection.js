// Dependencies
const mysql = require("mysql");
require("dotenv").config();

// Establish connection to MySQL server
if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: "localhost",
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DB,
    });
};

// Start connection to MySQL
connection.connect(function(err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    
    console.log("connected as id " + connection.threadId);
});
   
// Export connection for the ORM to use
module.exports = connection;