/**
 * @author Dimas Gustavo amadeusc2@gmail.com
 * @version 1.0
 */

$(function() {
    var aFile = [];

    var _base = {
        init : function(){
            _base.photo();
            //_base.like();
        },
        photo: function(){
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
                var limit  = parseInt($(this).attr('limit')) - 1;

                for(var i = 0; i< count; i++){
                    if(i <= limit){
                        getFile(obj.files[i], i);
                    }
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
                } else{
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


            $('#btnSend').on('click', function(){
                var action = $('#msform').attr('action');
                var msg = $.trim($('#estemensaje').val());

                if(msg){
                    var dataString = 'estemensaje=' + msg;
                    dataString += '&urldintair=' + $.trim($('#urldintair').val());
                    dataString += '&urlfacebook=' + $.trim($('#urlfacebook').val());
                    dataString += '&urlinstagram=' + $.trim($('#urlinstagram').val());
                    dataString += '&urllinkedin=' + $.trim($('#urllinkedin').val());

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
                            console.log(result);

                            if(result.state == 1){
                                window.location.href = result.data.url;

                            }else{
                                console.log(result.msg);
                            }
                        }
                    });
                }

                return false;
            });
        },
        like: function(){
            $('.js-like').on('click', function(){
                var obj = $(this);
                var action = $('.boxCreatePublication').attr('data-url-like');
                var dataString = 'publication_id=' + $(this).closest('.boxeachpublication').attr('data-id');

                $.ajax({
                    type: "POST",
                    url: action,
                    data: dataString,
                    dataType: 'json',
                    success: function(result) {
                        if(result.state){
                            if(result.data.behavior == 'add'){
                                obj.removeClass('btn-like-not').addClass('btn-like-ok');
                                obj.find('img').attr('src', '/images/recommend-ok.png');
                            } else {
                                obj.removeClass('btn-like-ok').addClass('btn-like-not');
                                obj.find('img').attr('src', '/images/recommend-not.png');
                            }

                            obj.next().parent().find('.js-like-number').text(result.data.like);
                        }

                        console.log(result);
                    }
                });

            });
        }
    };

    _base.init();
});