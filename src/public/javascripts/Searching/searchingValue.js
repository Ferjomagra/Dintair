$('select#rubroTarget').on('change', function(){
  var valor = $(this).val()
  console.log(valor)
})


$('#user-search').on('select', function() {
  var valor = $(this).serialize();
  if(valor === "search=") {
    valor = "none"
  }

  $.get('/Dintair/Search?' + valor, function(user) {
    $('#searchResult').html('');
    user.forEach(function(newUser) {
      $('#searchResult').append(`
        <div class='col-lg-4.col-md-4.col-sm-4.col-xs-6'>
          <div class='ourusers'>
            <a href='/Dintair/profile/view/${newUser._id}/${newUser.comp_name}'>
              <img class='img-responsive.img_ourusers', src='${newUser.imageProfile}'>
              <p>${newUser.rubroTarget}</p>
              <p>${newUser.country}</p>
            </a>
          </div>
        </div>
      `);
    });
  });
});

$('#user-search').submit(function(event) {
  event.preventDefault();
});