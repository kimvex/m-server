var myslq = require('./db/db');

var MySQL = new myslq();

var mails = function(config){
  config = config || {};
  if(config.id_p == 'contenido_'+config.id){
    var datos = 'select * from correo where Id=? and correopara = ?';
    console.log('dsd');
  }else{
    var datos = 'select * from correo where Id=? and correode = ?';
    console.log('xxx');
  }
  console.log(config.id_p + ' '+  config.id + ' ' + config.us);
  var query = MySQL.query(datos,[config.id,config.us],function(err,respuesta){
        if(err){
          throw err;
        }
        console.log(respuesta);
        config.res.json(respuesta);
   });
}

module.exports = mails;
