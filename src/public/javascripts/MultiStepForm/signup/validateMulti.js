//fhotos
var aFile = [];

function isError(obj, text, type){
    var _item = $.trim($(obj).val());
    var _state = 0;
    var _error = '#' + $(obj).attr('data-error-id');

    
    obj.css('border', '1px solid #ff4d4d');
    obj.next().text('text');
}

$('#btnSend').on('click', function(){


    var action = $('#msform').attr('action');
    dataString += '&full_name' + $.trim($('#full_name').val());
    dataString += '&comp_name' + $.trim($('#comp_name').val());
    dataString += '&username' + $.trim($('#username').val());
    dataString += '&password' + $.trim($('#password').val());
    dataString += '&wtpnumber' + $.trim($('#wtpnumber').val());
    dataString += '&rubroTarget' + $.trim($('#rubroTarget').val());
    dataString += '&editable-select1' + $.trim($('#editable-select1').val());
    dataString += '&editable-select2' + $.trim($('#editable-select2').val());


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