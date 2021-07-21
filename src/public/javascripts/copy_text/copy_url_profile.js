function GeeksForGeeks() { 
  var copyGfGText = document.getElementById("GfGInput"); 
  copyGfGText.select(); 
  document.execCommand("copy"); 
  alert("Enlace copiado"); 
}  