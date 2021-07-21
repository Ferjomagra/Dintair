function _linkAutomatick(msg, options){
    var defaults = {
        target   : '', //blank,self,parent,top
        className : '',
        rel : ''
    };
    
    var options = $.extend(defaults, options);
    
    target_string = (options.target != '') ? 'target="_'+options.target+'"' : '';
    class_string = (options.className != '') ? 'class="'+options.className+'"' : '';
    rel_string = (options.rel != '') ? 'rel="'+options.rel+'"' : '';
    
    var t = msg;
    
    t = t.replace(/(https\:\/\/|http:\/\/)([www\.]?)([^\s|<]+)/gi,'<a href="$1$2$3" '+target_string+' '+class_string+' '+rel_string+'>$1$2$3</a>');
    t = t.replace(/([^https\:\/\/]|[^http:\/\/]|^)(www)\.([^\s|<]+)/gi,'$1<a href="http://$2.$3" '+target_string+' '+class_string+' '+rel_string+'>$2.$3</a>');
    t = t.replace(/<([^a]|^\/a])([^<>]+)>/g, "&lt;$1$2&gt;").replace(/&lt;\/a&gt;/g, "</a>").replace(/<(.)>/g, "&lt;$1&gt;").replace(/\n/g, '<br />');

    return t;
}