var mysql = require('mysql');
/* If the node mysql module is not found on your system, you may
 * need to do an "sudo npm install -g mysql". */

/* You'll need to fill the following out with your mysql username and password.
 * database: "chat" specifies that we're using the database called
 * "chat", which we created by running schema.sql.*/
var dbConnection = mysql.createConnection({
  user: "root",
  password: "",
  database: "chat"
});

dbConnection.connect();
/* Now you can make queries to the Mysql database using the
 * dbConnection.query() method.
 * See https://github.com/felixge/node-mysql for more details about
 * using this module.*/




exports.findAllMessages = function(callback){
  dbConnection.query('SELECT content, userID, roomnames FROM messages', function(error, result) {
    if (error) {
      callback(error);
    } else {
      callback(error, result);
    }
  });
};

exports.findUser = function(username, callback){
  dbConnection.query('SELECT usernames, userID As id FROM users WHERE usernames= ?', [username], function(error, result){
    if(error){
      callback(error);
    } else if (result === undefined) {
      exports.saveUser(username, function (error, result) {
        if (error) { throw error; }
        exports.findUser(username, function(error, result) {
          if (error) { throw error; }
          callback(error, result);
        });
      });
    } else {
      callback(error, result);
    }
  });
};

exports.saveUser = function(username, callback){
  dbConnection.query('INSERT INTO users ( usernames ) VALUES ("'+username+'")', function(error, result) {
    console.log('results: ', result);
    if (error) {
      console.log(error);
    } else {
      callback(error, result);
    }
  });
};

exports.saveMessage = function(message, userid, roomname, callback){
/*  if (userid === undefined) {
    dbConnection()
  }
*/  dbConnection.query('INSERT INTO messages ( content, userID, roomnames ) VALUES ("'+message+'", '+userid+', "'+roomname+'")', function(error, result) {
    if (error) {
      console.log(error);
    } else {
      callback(result);
    }
  });
};



// Inserting into messages
//
/*INSERT INTO messages (message, userId, roomname)
SELECT 'message', id, 'roomname'
FROM users
WHERE username = 'Sean'*/
