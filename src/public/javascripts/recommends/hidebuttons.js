var marcada = 0;
function asignarNota(valor) {
   marcada = valor;
   desmarcarNotas();
}
function desmarcarNotas() {
   document.getElementById('input1').style.backgroundColor='white';

   document.getElementById('input2').style.backgroundColor='white';

   
   marcarNota(marcada);
}
function marcarNota(id) {
   if(id>0)
   {
      document.getElementById("input"+id).style.backgroundColor='#0066cc';
      document.getElementById("input"+id).style.color='#80ccff';
   }
}