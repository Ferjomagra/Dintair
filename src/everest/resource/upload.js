const fs = require('fs')

module.exports = function(){
    var _obj = {
        init: function( ) {
            return _obj.load(param)
        },
        /*no utilizar no esta funcionando bien*/
        /*load: function (param){
            var result = {state: 0, msg: 'no se pudo guardar'};
            var rFileAll = [];
            var files = param.files;

            files.map((item) => {
                var newFile = _obj._getFile(item);
                //var nameFile = _getRandom(5) + '-' + req.body.id + '.' + newFile.type;
                var nameFile = _obj._getRandom(5) + '-' + param.id + '.' + newFile.type;
                var routeFile = './uploads/' + nameFile;

                fs.writeFile(routeFile, newFile.data, {encoding: 'base64'}, function(err) {
                    if (err) {
                        console.log('err', err);
                    } else {
                        console.log('success');
                        rFileAll.push(routeFile);
                        console.log(rFileAll)
                    }
                });
            });

            if(rFileAll){
                result = {state: 1, msg: 'ok', data: rFileAll};
            }

            return result;
        },*/
        _getRandom: function(num) {
            num = (num) ? num : 5;

            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < num; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        },
        _getFile: function(file){
            var getFile = file.split(';base64,');
            var typeFile = ['image/png', 'image/jpeg', 'image/jpg' , 'image/gif', 'image/bmp'];
            var getType = 'tavo';

            for(var i = 0; i < typeFile.length; i++){
                if(getFile[0].indexOf(typeFile[i]) > 0){

                    var temp = typeFile[i].split('/');
                    getType = temp[1];
                }
            }

            return {type: getType, data: getFile[1]};
        }

    }

    return _obj;
};