var mysql = require('./db/db');

var MySQL = new mysql();

var enviar = function(config){
  config = config || {};
  if(config.des == 2){
    var introducir = MySQL.query("insert into correo(correode,correopara,titulo,mensaje,nombrearchivo,originalname,tipo) values(?,?,?,?,?,?,?)",[config.correoP,config.correo,config.titulo,config.mensaje,config.file,config.fileR,config.des],function(err,respuesta){
      if(err){
        throw err;
      }
      console.log("hol");
      config.res.json('Enviado');
    });
  }else{
    var introducir = MySQL.query("insert into correo(correode,correopara,titulo,mensaje,nombrearchivo,originalname,tipo) values(?,?,?,?,'','',?)",[config.correoP,config.correo,config.titulo,config.mensaje,config.des],function(err,respuesta){
      if(err){
        throw err;
      }
      console.log("es");
      config.res.json('Enviado!');
    });  
  }

}

module.exports = enviar;
