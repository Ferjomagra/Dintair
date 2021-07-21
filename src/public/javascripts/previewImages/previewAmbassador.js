//photos
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

        aFile.replace($('#newFile').serialize());
    };

    reader.readAsDataURL(file);
    return false;
}

$('#ambassadorIMGs').change(function(){
    var obj = document.getElementById("ambassadorIMGs");
    var count = obj.files.length;

    for(var i = 0; i< count; i++){
        getFile(obj.files[i], i);
    }
});

$('#btnFhoto').on('click', function (e) {
    $('#ambassadorIMGs').click();
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

 
        aFile = aTemp;
    }

    $(this).parent().remove();
});

function isError(obj, text){
    obj.css('border', '1px solid #ff4d4d');
    obj.next().text('text');
}