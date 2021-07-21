const input = document.querySelector('input[type="file"]')
input.addEventListener('change', function(e){
   console.log(input.files)
   
   const reader = new FileReader()
   reader.onload = function(){
      //const lines = reader.result.split('\n').map(function(line){
      //   return line.split(',')
      //})
      //console.log(lines)
      const img = new Image()
      
      img.src = reader.result
      document.body.appendChild(img)

      $(img).rcrop({
            
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

      $(img).on('rcrop-changed', function(){
          srcOriginal = $(this).rcrop('getDataURL');
          $('#cropped-original').html('<div><img style="width:100%", src="'+srcOriginal+'"></div>');
      })

      img.toBlob(function(blob){
         const form = new FormData()
         form.append('image', blob, 'newImage.png')
         const xhr = new XMLHttpRequest()
         xhr.open(
            'POST',
            '/Dintair/profile/user/#{user._id}/#{user.comp_name}?_method=put',
            true
         )
         xhr.send(form)
      })
      

      //document.body.appendChild(img)
   }
   
   //reader.readAsText(input.files[0])
   reader.readAsDataURL(input.files[0])
}, false)