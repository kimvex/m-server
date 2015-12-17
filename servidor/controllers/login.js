var mysql   = require('./db/db'),
    session = require('express-session'),
    moment  = require('moment');

var MySQL = new mysql();

var login = function(config){
  config = config || {};

  var entrar = MySQL.query("select * from usuarios where Email=?",[config.correo],function(err, respuesta){
    if(err){
      throw err;
    }
    if(respuesta[0] == undefined){
      config.res.json('cmal');
    }else{
      var pregunta = MySQL.query("select contrasena from usuarios where Email=?",[config.correo],function(error,resultado){
        if(error){
          throw error;
        }

        if(config.contra == resultado[0].contrasena){
          config.sol.session.name = config.correo;
          config.sol.session.cookie.expires = moment().add(14, 'days').unix();
          config.res.json('entrar');
        }else{
          config.res.json('conmal');
        }
      });
    }
    
  });
}

module.exports = login;
