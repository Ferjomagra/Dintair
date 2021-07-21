
var search = document.forms['formu']['search']
var loaderImg = document.getElementById('loaderImg')

function getData(behavior, page) {
    var dataString = 'search='+ search.value + '&company=' + $('#rubroTarget').val();
    var action = $('#btnSubmit').attr('data-url') + page;

    loaderImg.style.display = 'block'

    $.ajax({
        type: "GET",
        url: action,
        data: dataString,
        dataType: 'json',
        success: function(data) {
            if(data.state == 1){
                var user = data.usuarios;

                if(user){
                    if(!behavior){
                        $('#wrap').html('');
                    }

                    Object.keys(user).forEach(function(key) {
                        var html = '<div class="globo col-lg-4 col-md-4 col-sm-4 col-xs-6">';
                        html += '<div id="ouruser" class="ourusers">';
                        html += '<a href="/Dintair/'+user[key]['_id']+'">';
                        html += '<img src='+user[key]['imageProfile']+' class="img-responsive img_ourusers">';
                        html += '<p class="nombre_user_search">' + user[key]['comp_name'] + '</p>';
                        html += '<p>' + user[key]['rubroTarget'] + '</p>';
                        html += '<p>' + user[key]['country'] + '</p>';
                        html += '</a>';
                        html += '</div>';
                        html += '</div>';

                        $('#wrap').append(html);
                    });
                    


                    //$('#btnSubmit').attr('data-page', (parseInt(page) + 1));
                }
                loaderImg.style.display = 'none'
            }
        },
        error: function(r) {
            console.log("algo esta mal!");
        }
    });

}


$('#btnSubmit').on('click', function (e) {
    var page = 1;

    $('#btnSubmit').attr('data-page', page);

    getData(false, page);

    return false;
});

$(window).scroll(function() {
    if ($(document).height() - $(window).height() == $(window).scrollTop()) {

        var page = $('#btnSubmit').attr('data-page');
        page = parseInt(page) + 1;

        $('#btnSubmit').attr('data-page', page);

        getData(true, page);
    }
});