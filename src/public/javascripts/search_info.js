$(document).ready(function(){
	function searchPartial(form){
		var formData = $(form).serializeArray()
		$.get('/Everest/Search/:page', {
			search : formData[0].value
		}).then(function(data){
			$('#search-result').html(data)
		})
	}
	window.searchPartial = searchPartial
})