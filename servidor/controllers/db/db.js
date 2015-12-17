var mysql = require('mysql');

var MySQL = function(config){
  config = config || {};
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Sp33dstick!',
    database: 'servidor',
    port: 3306
  });
  connection.connect(function(err){
    if(err){
      throw err;
    }
  });

  return connection;
}

module.exports = MySQL;
