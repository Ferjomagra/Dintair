//fhotos
var aFile = [];

function getItem(src, index){
    var html = '<article>';
    html += '<span data-index="' + index + '">x</span>';
    html += '<img src="' + src + '" />';
    html += '</article>';

    $('#ct-items').append(html);
}

function getFile(file, index){
    var reader = new FileReader();

    reader.onload = function (e)
    {
        getItem(reader.result, index);

        $('#newFile').attr('value', e.target.result);

        aFile.push($('#newFile').serialize());
    };

    reader.readAsDataURL(file);
    return false;
}

$('#btnFiles').change(function(){
    var obj = document.getElementById("btnFiles");
    var count = obj.files.length;

    for(var i = 0; i< count; i++){
        getFile(obj.files[i], i);
    }
});

$('#btnFhoto').on('click', function (e) {
    $('#btnFiles').click();
});

$('#ct-items').on('click', 'span',function(e){
    var obj = $(this);

    if(obj.attr('data-img')){
        var fileOld = $('#fileOld').val();
        var tFile = fileOld.split('---');
        var nFile = '';

        tFile.map(function(item){
            if(obj.attr('data-img') != item){
                nFile = (nFile)? nFile + '---' + item : item;
            }
        });

        $('#fileOld').attr('value', nFile);
    } else {
        var index  = obj.attr('data-index');

        var aTemp = [];
        var count = aFile.length;

        for(var i = 0; i < count; i++ ){
            if(index != i){
                aTemp.push(aFile[i]);
            }
        }

        aFile = aTemp;
    }

    $(this).parent().remove();
});

function isError(obj, text){
    obj.css('border', '1px solid #ff4d4d');
    obj.next().text('text');
}

$('#btnSend').on('click', function(){


    var action = $('#msform').attr('action');

    var dataString = 'id=' + $.trim($('#id').val());
    dataString += '&nombre=' + $.trim($('#nombre').val());
    dataString += '&iam=' + $.trim($('input[name="iam"]:checked').val());
    dataString += '&link=' + $.trim($('#link').val());
    dataString += '&aeropost_link=' + $.trim($('#aeropost_link').val());
    dataString += '&entidad=' + $.trim($('.entidad').val());
    dataString += '&documents=' + $.trim($('.documents').val());
    dataString += '&subpartida=' + $.trim($('#subpartida').val());
    dataString += '&comentario=' + $.trim($('#comentario').val());

    dataString += '&tupa_permiso=' + $.trim($('#tupa_permiso').val());
    dataString += '&precio_permiso=' + $.trim($('#precio_permiso').val());
    dataString += '&url_tramite=' + $.trim($('#url_tramite').val());

    if($('#fileOld')){
        dataString += '&fileOld=' + $.trim($('#fileOld').val());
    }

    dataString += '&files=' + JSON.stringify(aFile);

    $('#loaderImg').css('display', 'block');
    $('#btnSend').attr('disabled', true);

    $.ajax({
        type: "POST",
        url: action,
        data: dataString,
        dataType: 'json',
        success: function(result) {
            if(result.state == 1){
                console.log(result.msg);
                window.location.href = result.data.url;
            }else{
                console.log(result.msg);
            }
        }
    });

    return false;
});