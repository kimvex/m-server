$(document).ready(function(){

	function entrar(e){
		var data = {
			usuario: document.getElementById('usuario').value,
			contra: document.getElementById('contra').value
		}

		$.ajax({
			url: "/entrada",
			type: "POST",
			dataType: 'json',
			data: data,
			success: function(data){
				if(data == "cmal"){
					alert('El correo no existe');
				}else{
					if(data == "comal"){
						alert('La contraseña esta mal');
					}else{
						window.location = '/correos';
					}
				}
			} 
		});

		e.preventDefault();
	}

	document.getElementById('formulario').addEventListener('submit',entrar);
});
