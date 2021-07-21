
//Definir las variables correspondientes
var opt_PRODUCE = new Array("","Certificado sanitario expedido por la autoridad competente del país de origen", "Certificado de Procedencia del Ministerio de Pesquería o Direcciones Regionales", "Permiso de Importación de OTO / PERU", "Certificado de Conformidad, Constancia de Cumplimiento", "DGAAI-PRODUCE (SAO)")
var opt_MINAGRI = new Array("", "Permiso fitosanitario de Importación del SENASA", "Permiso zoosanitario de Importación del SENASA", "Certificado de Internamiento de SENASA", "Certificado de análisis SENASA", "Certificado fito o zoosanitario del país de origen SENASA", "Permiso de SENASA")
var opt_MININTER = new Array("", "Permiso emitido por SUCAMEC", "Autorización de importación de productos pirotécnicos y materiales relacionados")
var opt_MRREE = new Array("", "Resolución Directoral emitida por el MRREE")
var opt_MINSA = new Array("", "Permiso emitido por DIGEMID", "DIGEMID - Necesita registro y/o receta médica visada", "Permiso emitido por DIGESA")
var opt_MTC = new Array("", "Permiso de Internamiento", "Requiere ser homologado")

//para que permita ejecutar el cambio dinámico

function cambia(){
	var entidad;
	//Se toma el valor del país seleccionado
	entidad = document.formu.entidad[document.formu.entidad.selectedIndex].value;
	//se chequea si el país está definida
	if(entidad != 0){
		//se selecciona las provincias correctas
		mis_opts = eval("opt_"+entidad)
		//se calcula el número de cosas
		num_opts = mis_opts.length;
		//marco el numero de opt en el select
		document.formu.documents.length = num_opts
		//para cada opcion del array, la pongo en el select
		for(i=0;i<num_opts;i++){
			document.formu.documents.options[i].value=mis_opts[i]
			document.formu.documents.options[i].text=mis_opts[i]
		}
	} else{
		//si no había ninguna opt seleccionada, se elimina las cosas del select
		document.formu.opt.length=1;

		document.formu.documents.options[0].value="-";
		document.formu.documents.options[0].text="-";
	}
	//reset de las opciones
	document.formu.documents.options[0].selected=true;
}