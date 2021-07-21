$(function() {
    var _base = {
        init : function(){
            _base.timeElapsed ();
        },
		timeElapsed : function(){
        	var elementTime = $('.js-content-post .js-time-elapsed');

            if(elementTime.length){
                elementTime.each(function(index, element ){
                    var getTime = _base.getDateElapsed(element.attributes['data-create-at'].value);
                    element.innerText = getTime;
                });
			}
		},
		getDateElapsed: function(dateNow, dateFuture){
			//CALCULOS
            var date_now = new Date(dateNow).getTime();
            var date_future = new Date().getTime();

            var delta = Math.abs(date_future - date_now) / 1000;

            var days = Math.floor(delta / 86400);
            delta -= days * 86400;

            var hours = Math.floor(delta / 3600) % 24;
            delta -= hours * 3600;

            var minutes = Math.floor(delta / 60) % 60;
            delta -= minutes * 60;

            var seconds = delta % 60;

			//MOSTRAR
            var stringDate = '';

            if(days){
                stringDate+= days + ' dias';
            }

            if(hours){
                stringDate = (stringDate.length)? stringDate + ', ' + hours + ' horas' : + hours + ' horas';
            }

            if(minutes){
                stringDate = (stringDate.length)? 'Hace '+ stringDate + ', ' + minutes + ' minutos' : + minutes + ' minutos';
            }

            return stringDate;
		}

    };

    _base.init();
});

