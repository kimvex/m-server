var express = require('express'),
    swig    = require('swig'),
    parser  = require('body-parser'),
    cors    = require('cors'),
    session = require('express-session'),
    multer  = require('multer'),
    upload  = multer({dest: './servidor/static/pdf/'});
    pass    = process.env.SECRET,
    login   = require('./controllers/login'),
    recibido= require('./controllers/recibidos'),
    enviados= require('./controllers/enviados'),
    enviar  = require('./controllers/enviar'),
    mails   = require('./controllers/mails'),
    impresion = require('./controllers/imprimir');

var servidor = function(config){
  config = config || {};
  this.app = express();
  this.app = express();
  this.app.use(parser.json());
  this.app.use(cors());
  this.app.use(parser.urlencoded({extended:true}));
  this.app.use(session({secret: pass,resave:false,saveUninitialized:true}));
  this.app.engine('html',swig.renderFile);
  this.app.set('view engine', 'html');
  this.app.set('views',__dirname + '/templetes');
  this.app.use(express.static(__dirname + '/static'));
  swig.setDefaults({varControls:['<<','>>']});

  function validar(sol,res,next){
    if(!sol.session.name){
      res.redirect('/');
    }else{
      next();
    }
  }

  function iniciado(sol,res,next){
    if(sol.session.name){
      res.redirect('/correos');
    }else{
      next();
    }
  }

  this.app.get('/',iniciado,function(sol,res,next){
    res.render('index');
  });

  this.app.post('/entrada',function(sol,res){
    var datos = {
      correo: sol.body.usuario,
      contra: sol.body.contra,
      sol:sol,
      res:res
    }
    var logueo = new login(datos);
  })

  this.app.get('/correos',validar,function(sol,res,next){
    res.render('dentro');
  });

  this.app.post('/enviados',validar,function(sol,res,next){
    var datos = {
      sol: sol,
      res: res
    }
    var mailEviado = new enviados(datos);
  });

  this.app.post('/envio',upload.single('img'),function(sol,res,next){
    if(sol.file == undefined){
      var datos = {
        correo: sol.body.correo,
        titulo: sol.body.titulo,
        mensaje: sol.body.mensaje,
        correoP: sol.session.name,
        sol: sol,
        res: res,
        des: 1
      }

      var envia = new enviar(datos);
    }else{    
      var datos = {
        correo: sol.body.correo,
        titulo: sol.body.titulo,
        mensaje: sol.body.mensaje,
        correoP: sol.session.name,
        file: sol.file.filename,
        fileR: sol.file.originalname,
        sol: sol,
        res: res,
        des: 2
      }

      var envia = new enviar(datos);
    }
  });

  this.app.post('/parami',validar,function(sol,res,next){
    var datos = {
      sol: sol,
      res: res
    }
    var recibidos = new recibido(datos);
  });

  this.app.get('/crear',validar,function(sol,res,next){
    res.render('crear');
  });

  this.app.get('/emails/:id/:id_p',function(sol,res,next){
    console.log(sol.params);
    var datos = {
      id: sol.params.id,
      sol: sol,
      res: res,
      us: sol.session.name,
      id_p: sol.params.id_p 
    }
    var correos = new mails(datos);
  });

  this.app.post('/impresion',function(sol,res,next){
    console.log(sol.body.datos);
    var imprime = new impresion(sol.body.datos);
    res.send('ens');
  });

  this.app.get('/salir',function(sol,res,next){
    sol.session.destroy();
    res.redirect('/');
  });


}

module.exports = servidor;
