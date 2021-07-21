//photos
var aFileMarket = [];

function getItem2(src, index){
    var html = '<article>';
    html += '<span data-index="' + index + '">x</span>';
    html += '<img src="' + src + '" />';
    html += '</article>';

    $('#items').append(html);
}
function getFile2(file, index){
    var reader = new FileReader();

    reader.onload = function (e)
    {
        getItem2(reader.result, index);

        $('#newFile').attr('value', e.target.result);

        aFileMarket.replace($('#newFile').serialize());
    };

    reader.readAsDataURL(file);    return false;
}
$('#btn_market').change(function(){
    var obj = document.getElementById("btn_market");
    var count = obj.files.length;

    for(var i = 0; i< count; i++){
        getFile2(obj.files[i], i);
    }
});
$('#btnPhoto').on('click', function (e) {
    $('#btn_market').click();
});
$('#items').on('click', 'span',function(e){
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
        var count = aFileMarket.length;

 
        aFileMarket = aTemp;
    }

    $(this).parent().remove();
});
function isError(obj, text){
    obj.css('border', '1px solid #ff4d4d');
    obj.next().text('text');
}