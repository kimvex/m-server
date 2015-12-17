var fs    = require('fs'),
    exec  = require('child_process').exec;

var imprimir = function(config){
  config = config || {};
  //command = 'lp ' + config;
  command = 'cd servidor/static/pdf/ \n ls \n lp ' + config;
  child = exec(command, function(error, stdout, stderr){
    if(error){
      throw error;
    }else{
      console.log(stdout);
    }
  });
  //console.log(__dirname);
}

module.exports = imprimir;
