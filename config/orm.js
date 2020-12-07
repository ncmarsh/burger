const connection = require("./connection.js");

function printQuestionMarks(num) {
    let questMarkArr = [];
  
    for (let i = 0; i < num; i++) {
        questMarkArr.push("?");
    }
  
    return questMarkArr.toString();
}

function objToSql(ob) {
    let sqlArr = [];
  
    // loop through the keys and push the key/value as a string int arr
    for (let key in ob) {
      let value = ob[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        // if string with spaces, add quotations
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        sqlArr.push(key + "=" + value);
      }
    }
    // translate array of strings to a single comma-separated string
    return sqlArr.toString();
}

const orm = {
    selectAll: function(tableName, cb) {
        const queryString = "SELECT * FROM " + tableName + ";";

        connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    },
    insertOne: function(tableName, cols, vals, cb) {
        const queryString = "INSERT INTO " + tableName + " (" + cols.toString() + ") VALUES (" + printQuestionMarks(vals.length) + ")";
        
        connection.query(queryString, vals, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    },
    updateOne: function(tableName, objColVals, condition, cb) {
        const queryString = "UPDATE " + tableName + " SET " + objToSql(objColVals) + " WHERE " + condition;

        connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    }
};

module.exports = orm;
