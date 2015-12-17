$(document).ready(function(){
	function crear(e){
		$.get('/crear',function(datos){
			document.getElementById('cuerpo').innerHTML = datos;
			document.getElementById('formulario-envio').addEventListener('submit',envio);
		});
		$('#formulario-envio').submit(envio);
		function envio(e){
			var formulario = new FormData($("#formulario-envio")[0]);

			$.ajax({
				url:'/envio',
				type: 'POST',
				data: formulario,
				cache: false,
				contentType: false,
				processData: false,
				success: function(data){
					document.getElementById('datos-envio').innerHTML = "<div class='enviado'><h1>Enviado</h1></div>"
				}
			});

			e.preventDefault();

		}

	}


	function mi(e){
		$.ajax({
			url: '/parami',
			type: 'POST',
			success: function(data){
				console.log(data);
				var mensajes;
				for(i in data){
					if(mensajes == undefined){
						mensajes = "<a href='#' id='contenido_"+data[i].Id+"' class='links-correos'><p class='correos-r' id='"+data[i].Id+"'>"+data[i].correode+"    "+data[i].titulo+"</p></a>";
					}else{
						mensajes = "<a href='#' id='contenido_"+data[i].Id+"' class='links-correos'><p class='correos-r' id='"+data[i].Id+"'>"+data[i].correode+"    "+data[i].titulo+"</p></a>" + mensajes;
					}
				}

				document.getElementById('cuerpo').innerHTML = mensajes;
				for(i in data){				
					document.getElementById('contenido_'+data[i].Id+'').addEventListener('click',eventosCorreo);
				}
			}
		});
		e.preventDefault();
	}

	function enviados(e){
		$.ajax({
			url: '/enviados',
			type: 'POST',
			success: function(data){
				console.log(data);
				var mensajes;
				for(i in data){
					if(mensajes == undefined){
						mensajes = "<a href='#' id='enviados_"+data[i].Id+"' class='links-correos'><p class='correos-r' id='"+data[i].Id+"'>"+data[i].correode+"    "+data[i].titulo+"</p></a>";
					}else{
						mensajes = "<a href='#' id='enviados_"+data[i].Id+"' class='links-correos'><p class='correos-r' id='"+data[i].Id+"'>"+data[i].correode+"    "+data[i].titulo+"</p></a>" + mensajes;
					}
				}

				document.getElementById('cuerpo').innerHTML = mensajes;
				for(i in data){				
					document.getElementById('enviados_'+data[i].Id+'').addEventListener('click',eventosCorreo);
				}
			}
		});
	}

	document.getElementById('correos').addEventListener('click',enviados);
	document.getElementById('mis').addEventListener('click',mi);
	document.getElementById('crear').addEventListener('click',crear);
	enviados();

		function eventosCorreo(config){
	    console.log(config);
	    $.ajax({
	      url: '/emails/'+config.target.id+'/'+this.id,
	      type: 'GET',
	      success: function(data){
	        console.log(data);
	        if(data[0].tipo == 2){
	          var texto = '<div class="texto-correo"><h1>'+data[0].titulo+'</h1> \n\n'+'<p>'+data[0].mensaje+'</p>\n<p>'+data[0].originalname+'</p><p><a href="#" id="botonImpresionCorreo"><button class="botonImpresionCorreo" id="'+data[0].nombrearchivo+'">Dar impresion</button></a></p></div>';
	        }else{
	          var texto = '<div class="texto-correo"><h1>'+data[0].titulo+'</h1> \n\n'+'<p>'+data[0].mensaje+'</p>\n<p>'+data[0].originalname+'</p></div>';
	        }
	        document.getElementById('cuerpo').innerHTML = texto;
	        if(data[0].tipo == 2){
	          document.getElementById('botonImpresionCorreo').addEventListener('click',datosImprimir);
	        }
	      }
	    });
		}

		function datosImprimir(e){
		  console.log(e.target.id);
		  $.ajax({
		  	url: '/impresion',
		  	'type': 'POST',
		  	data: {datos: e.target.id},
		  	success: function(data){
		  		document.getElementById('cuerpo').innerHTML = "Imprimiendo..."
		  	}
		  });
		  e.preventDefault();
		}
});
