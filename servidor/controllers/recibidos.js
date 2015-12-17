var mysql = require('./db/db.js');

var MySQL = new mysql();

var recibidos = function(config){
  config = config || {};

  var pregunta = MySQL.query("select * from correo where correopara=?",[config.sol.session.name],function(err,respuesta){
    if(err){
      throw err;
    }

    config.res.json(respuesta);
  });
}

module.exports = recibidos;
