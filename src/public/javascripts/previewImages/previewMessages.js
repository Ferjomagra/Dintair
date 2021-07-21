function filePreview(input){
	if(input.files && input.files[0]){
		var reader = new FileReader();

		reader.onload = function(e){
			$('#uploadForm + img').remove();
			$('#uploadForm').after('<div style="margin: 0 auto;text-align:center;"><img src="'+e.target.result+'" width="150px;" /></div>')
		}
		reader.readAsDataURL(input.files[0])
	}
}


$("#btn_enviar").change(function(){
	filePreview(this);
});