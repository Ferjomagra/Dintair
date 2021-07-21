
//Definir las variables correspondientes
var opt_Argentina = new Array("","Buenos Aires","Córdoba","Corrientes","Salta","Sante Fe","Tucumán")
var opt_Bolivia = new Array("","Cochabamba","La Paz","Santa Cruz")
var opt_Chile = new Array("","Antofagasta","Libertador General Bernardo O'Higgins","Santiago","Tarapacá","Valparaíso")
var opt_Colombia = new Array("","Cartagena","Bogotá", "Medellín")
var opt_Cuba = new Array("","Camagüey","Ciego de Ávila","Cienfuegos","La Habana","Las Tunas","Santiago de Cuba","Villa Clara")
var opt_Ecuador = new Array("","Azuay","Guayas","Manabi","Pichincha","Santo Domingo")
var opt_ElSalvador = new Array("","San Salvador")
var opt_Guatemala = new Array("","Guatemala")
var opt_Honduras = new Array("","Cortés","Francisco Morazán")
var opt_México = new Array("","Distrito Federal","Jalisco","Michoacán","Nuevo León","Puebla")
var opt_Paraguay = new Array("","Concepción","Distrito Capital")
var opt_Perú = new Array("","Amazonas","Áncash","Apurímac","Arequipa","Ayacucho","Cajamarca","Cusco","Huancavelica","Huánuco","Ica","Junín","La Libertad","Lambayeque","Lima","Loreto","Madre de Dios","Moquegua","Pasco","Piura","Puno","San Martín","Tacna","Tumbes","Ucayali")
var opt_Uruaguay = new Array("","Montevideo","Río Negro","San José","Soriano")
var opt_Venezuela = new Array("","Distrito Capital")

//para que permita ejecutar el cambio dinámico

function cambia(){
	var country;
	//Se toma el valor del país seleccionado
	country = document.formu.country[document.formu.country.selectedIndex].value;
	//se chequea si el país está definida
	if(country != 0){
		//se selecciona las provincias correctas
		mis_opts = eval("opt_"+country)
		//se calcula el número de cosas
		num_opts = mis_opts.length;
		//marco el numero de opt en el select
		document.formu.provincia.length = num_opts
		//para cada opcion del array, la pongo en el select
		for(i=0;i<num_opts;i++){
			document.formu.provincia.options[i].value=mis_opts[i]
			document.formu.provincia.options[i].text=mis_opts[i]
		}
	} else{
		//si no había ninguna opt seleccionada, se elimina las cosas del select
		document.formu.opt.length=1;

		document.formu.provincia.options[0].value="-";
		document.formu.provincia.options[0].text="-";
	}
	//reset de las opciones
	document.formu.provincia.options[0].selected=true;
}