/**
 * @author Dimas Gustavo amadeusc2@gmail.com
 * @version 1.0
 */

$(function() {
    var _base = {
        init : function(){
            _base.link();
        },
        link: function(){
            var obj = $('.js-content-post .msg-post');

            $.each(obj, function(index, item){                
                var objP = obj.eq(index).find('p');
                
                $.each(objP, function(indexP, itemP){
                    var html = _linkAutomatick(itemP.innerHTML, {
                        target: 'blank', //blank,self,parent,top
                        className : '',
                        rel : 'nofollow'
                    });

                    objP.eq(indexP).html(html);

                });
            });
        },
       
    };

    _base.init();
});