/**
 * @author Dimas Gustavo amadeusc2@gmail.com
 * @version 1.0 
 */
$(function() { 
    var _base = {
        init : function(){
            _base.loader();
            _base.select();
            _base.write();
        },
        getData : function(state, page) {
            var dataString = 'search=';
            var action = $('#result').attr('data-url') + '/' + page;
            
            $('#loaderImg').show();

            $.ajax({
                type: "GET",
                url: action,
                data: dataString,
                dataType: 'json',
                success: function(result) {
                    var user = result.data;

                    if(user.length){    
                        if(result.state == 1){
                            $('#sectionLoader').hide();
                            $('#sectionResult').css({display:"block", overflow:"auto"});
                            $('#btnRedactar').css({display:"block"});
                            $('.js-publication').attr('style','display: block !important');
                            $('.btnAction').attr('style', 'background-color: white');
                        } 
                        console.log(user);
                        Object.keys(user).forEach(function(key) {
                            var count = $('#result input[type=checkbox]').length;                                
                            count = count + 1;

                            $('#numItem').text(count);

                            var html = '<tr style="text-align:left">';
                                html += '<td>';

                                if(state == 1){
                                    html += '<input type="checkbox" name="vehicle1" value="' + user[key]['username'] + '" checked="true" comp_name="'+user[key]['comp_name']+'"  imageProfile="'+user[key]['imageProfile']+'"  representative="' + user[key]['full_name'] + '" data-id="' + user[key]['_id'] + '">';
                                } else {
                                    html += '<input type="checkbox" name="vehicle1" value="' + user[key]['username'] + '" representative="' + user[key]['full_name'] + '" data-id="' + user[key]['_id'] + '">';
                                }
                                    
                                html += '</td>';
                                /*html += '<td>' + count + '</td>';*/
                                /*html += '<td style="width:20%"><a href="#" class="js-chat-link" target="_blank" data-id="' + user[key]['_id'] + '">Conversar</a></td>';*/
                                
                                html += '<td style="width:0%"><a href="/Dintair/'+user[key]['_id']+'" target="_blank">Ver</a></td>';
                                html += '<td>' + "<img style='width:40px;text-align:center' src="+user[key]['imageProfile']+ ">" + '</td>';
                                html += '<td style="width:20%; max-width:60px; overflow:auto;white-space:nowrap">' + user[key]['comp_name'] + '</td>';
                                html += '<td style="width:20%">' + user[key]['rubroTarget'] + '</td>';
                                html += '<td style="width:20%">' + user[key]['full_name'] + '</td>';
                                html += '<td style="width:20%">' + user[key]['username'] + '</td>';
                                html += '<td style="width:20%">' + user[key]['country'] + '</td>';
                       
                                    
                                html += '</tr>';

                            $('#result').append(html);
                        });
                    }
                    
                    $('#loaderImg').hide();
                },
                error: function(r) {
                    console.log("algo esta mal!");
                }
            });
        },
        select : function(){
            var result = $('#result');

            $('#chxAll').on('click', function(e){
                if($(this).is(':checked')){
                    result.find('input[type=checkbox]').attr('checked', true);
                } else {
                    result.find('input[type=checkbox]').attr('checked', false);
                }
            })
        },
        write : function() {
            $('#btnRedactar').on('click', function(e){
                e.preventDefault();

                var item = $('#result').find('input[type=checkbox]');
                var email = '';
                var representative = '';
                var comp_name = '';
                var imageProfile = '';

                $.map(item, function(value, index){
                    if(item.eq(index).is(':checked')){
                        email = (email)? email + ',' + item.eq(index).val() : item.eq(index).val();
                        representative = (representative)? representative + ',' + item.eq(index).attr('representative') : item.eq(index).attr('representative');
                        comp_name = (comp_name)? comp_name + ',' + item.eq(index).attr('comp_name') : item.eq(index).attr('comp_name');
                        imageProfile = (imageProfile)? imageProfile + ',' + item.eq(index).attr('imageProfile') : item.eq(index).attr('imageProfile');
                    }
                });

                if(email){
                    var dataString = 'email=' + email + '&representative=' + representative + '&comp_name=' + comp_name + '&imageProfile=' + imageProfile;
                    var action = $('#btnRedactar').attr('data-email');

                    $.ajax({
                        type: "POST",
                        url: action,
                        data: dataString,
                        dataType: 'json',
                        success: function(result) {
                            if(result.state){
                                window.location.href = "/Dintair/create/publication";
                            } else {
                                console.log(result.msg);
                            }
                        },
                        error: function(r) {
                            console.log("algo esta mal!");
                        }
                    });
                }

                return false;
            });
        },
        loader: function(){
            var page = 1;
            var state = 1;
            
            setTimeout(function(){
                _base.getData(state, page) 
            }, 3000);

            $(window).scroll(function() {
                if ($(document).height() - $(window).height() == $(window).scrollTop()) {
            
                    var page = $('#result').attr('data-page');
                    page = parseInt(page) + 1;
            
                    $('#result').attr('data-page', page);

                    state = 2;
            
                    _base.getData(state, page);
                }
            });
        }

    };
        
    _base.init();
});
