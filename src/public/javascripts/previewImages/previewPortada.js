function filePreview(input){
	if(input.files[0]){
		reader = new FileReader();

		reader.onload = function(e){
			$('#uploadForm + img').remove();
			$('#uploadForm').html('<div style="margin: 0 auto;text-align:center;margin-bottom:10px;"><img src="'+e.target.result+'" style="width:100%;", id="image" "/></div>')
			
	
			$('#image').rcrop({
				
			  // full-size crop area
			  full : false,

			  // min / max size of crop area
			  minSize : [20, 20],
			
			  maxSize : [null, null],

			  // preserve the original radio
			  preserveAspectRatio : false,

			  // generate an input with crop data
			  inputs : true,

			  // prefix to input
			
			  inputsPrefix : '',

			  // <a href="https://www.jqueryscript.net/tags.php?/grid/">grid</a> style crop area
			
			  grid : true

			
			});

			$('#image').on('rcrop-changed', function(){
			    srcOriginal = $(this).rcrop('getDataURL');
			    //$('#cropped-original').html('<div><input type="file", name="imagePortadaCrop", id="portada_crop", value="'+srcOriginal+'"><img style="width:100%", src="'+srcOriginal+'"></div>');

                $('#cropped-original').html('<div><img style="width:100%", src="'+srcOriginal+'"></div>');

				$('#imagePortadaCrop').attr('value', srcOriginal);
				console.log(srcOriginal)
			})
		}
		
		reader.readAsDataURL(input.files[0])

	}
}

$("#portada_crop").change(function(){
	filePreview(srcOriginal);

});

$("#portada_image").change(function(){
	filePreview(this);

	var i = $(this)[0].files[0].size

	var siezekiloByte = parseInt(i / 1024);
	console.log(siezekiloByte)

	if(siezekiloByte > 1536){

		var TextField = document.getElementById('TextField')

		var uploadImage = document.getElementById('uploadForm')

		TextField.style.display = 'block'

		uploadImage.style.display = 'none'

	} 

	if(siezekiloByte <= 1536){

		var TextField = document.getElementById('TextField')
		TextField.style.display = 'none'

		var uploadImage = document.getElementById('uploadForm')

		uploadImage.style.display = 'block'

	} 

});