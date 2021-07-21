/**
 * @author Dimas Gustavo amadeusc2@gmail.com
 * @version 1.0
 */

$(function() {
    var _base = {
        init : function(){
            _base.getEdit();
            _base.item();
            _base.getLocationDefault();
            _base.getLocation();
        },
        gMarker: function(obj, behavior){
            let map = new google.maps.Map(document.getElementById('map'), {
                center: obj.position,
                zoom:14
            });

            let marker = new google.maps.Marker({
                position:obj.position,
                map: map,
                title: obj.title
            });

            //no tiene mapa asignado aun
            if(behavior == 'notMap'){
                map.setZoom(2);
                marker.setMap(null);
            }

            if(behavior == 'edit'){
                google.maps.event.addListener(map, 'click', function(event) {
                    if(marker){
                        marker.setMap(null);
                    }

                    marker = new google.maps.Marker({
                        position: event.latLng,
                        map: map
                    });


                    var parent = $('.content-sitem input[type=radio]:checked').parent();

                    parent.attr('data-lat', event.latLng.lat());
                    parent.attr('data-lng', event.latLng.lng());
                    parent.attr('data-title', parent.find('.js-title').text());

                });
            }
        },
        gMarkes: function(points){
            function getBoundsZoomLevel(bounds, mapDim) {
                var WORLD_DIM = { height: 256, width: 256 };
                var ZOOM_MAX = 21;

                function latRad(lat) {
                    var sin = Math.sin(lat * Math.PI / 180);
                    var radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
                    return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
                }

                function zoom(mapPx, worldPx, fraction) {
                    return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2);
                }

                var ne = bounds.getNorthEast();
                var sw = bounds.getSouthWest();

                var latFraction = (latRad(ne.lat()) - latRad(sw.lat())) / Math.PI;

                var lngDiff = ne.lng() - sw.lng();
                var lngFraction = ((lngDiff < 0) ? (lngDiff + 360) : lngDiff) / 360;

                var latZoom = zoom(mapDim.height, WORLD_DIM.height, latFraction);
                var lngZoom = zoom(mapDim.width, WORLD_DIM.width, lngFraction);

                return Math.min(latZoom, lngZoom, ZOOM_MAX);
            }

            function createMarkerForPoint(point) {
                return new google.maps.Marker({
                    position: new google.maps.LatLng(point.lat, point.lng),
                    title: point.title
                });
            }

            function createBoundsForMarkers(markers) {
                var bounds = new google.maps.LatLngBounds();
                $.each(markers, function() {
                    bounds.extend(this.getPosition());
                });
                return bounds;
            }

            var $mapDiv = $('#map');

            var mapDim = {
                height: $mapDiv.height(),
                width: $mapDiv.width()
            }

            var markers = [];
            $.each(points, function() { markers.push(createMarkerForPoint(this)); });

            var bounds = (markers.length > 0) ? createBoundsForMarkers(markers) : null;

            var map = new google.maps.Map($mapDiv[0], {
                center: (bounds) ? bounds.getCenter() : new google.maps.LatLng(0, 0),
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                zoom: (bounds) ? getBoundsZoomLevel(bounds, mapDim) : 0
            });

            $.each(markers, function() { this.setMap(map); });
        },
        getLocation: function(){
            $('select[name=location]').on('change', function(){
                var element = $(this).find('option:selected');
                var gLocation = {
                    position:{
                        lat: parseFloat(element.attr('data-lat')),
                        lng: parseFloat(element.attr('data-lng')),
                    },
                    title: element.attr('data-title')
                };

                _base.gMarker(gLocation, 'default');
            });

            $('input[name=locationAll]').on('click', function(){
                var location    = [];
                var items       = $('select[name=location] option');

                if(items.length > 1){
                    items.each(function(i){
                        location.push({
                            lat: parseFloat(items.eq(i).attr('data-lat')),
                            lng: parseFloat(items.eq(i).attr('data-lng')),
                            title: items.eq(i).attr('data-title')
                        });
                    });

                    _base.gMarkes(location);
                }
            });
        },
        getLocationDefault: function(){
            var option      = $('select[name=location] option');
            var gLocation   = {};
            var behavior    = null;

            if(option.length){
                var element = option.eq(0);

                gLocation = {
                    position:{
                        lat: parseFloat(element.attr('data-lat')),
                        lng: parseFloat(element.attr('data-lng')),
                    },
                    title: element.attr('data-title')
                };

                behavior = 'default';
            } else {
                gLocation = {
                    position:{
                        lat: -7.6605473,
                        lng: -73.9777215,
                    },
                    title: 'Escoja su ubicación'
                };

                behavior = 'notMap';
            }

            _base.gMarker(gLocation, behavior);
        },
        getEdit: function(){
            $('input[name=btnEdit]').on('click', function(){
                $('.g-location').hide();
                $('.g-search').show();

                $('.content-sitem article:first input[type=radio]').click();
            });

            $('input[name=btnSaved]').on('click', function(){
                var location = [];
                var items = $('.content-sitem article');

                if(items.length > 0){
                    items.each(function(i){
                        location.push({
                            'lat':items.eq(i).attr('data-lat'),
                            'lng':items.eq(i).attr('data-lng'),
                            'title':items.eq(i).attr('data-title')
                        });
                    });

                    if(location){
                        var dataString = 'user_id=' + $('#userIdEmisor').val() + '&location=' + JSON.stringify(location);
                        var action = $(this).attr('data-url');

                        $.ajax({
                            type: "POST",
                            url: action,
                            data: dataString,
                            dataType: 'json',
                            success: function(result) {
                                console.log(result);

                                if(result.state == 1){
                                    $('.g-location').show();
                                    $('.g-search').hide();

                                    $('select[name=location] option').remove();

                                    location.map(function(i){
                                        var html = '<option value="0" data-lat="' + i.lat + '" data-lng="' + i.lng + '" data-title="' + i.title + '">' + i.title + '</option>';

                                        $('select[name=location]').append(html);
                                    });

                                    $('select[name=location]').show();
                                    $('input[name=locationAll]').show();

                                    console.log('ok');
                                }else{
                                    console.log('not');
                                }
                            }
                        });
                    }
                }
            });

            var options = {
                center: { lat: 43.654, lng: -79.383 },
                zoom: 10
            };

            var map = new google.maps.Map(document.getElementById('map'), options);

            var input = document.getElementById('search');
            var searchBox = new google.maps.places.SearchBox(input);

            map.addListener('bounds_changed', function() {
                searchBox.setBounds(map.getBounds());
            });

            var marker = null;
            var markers = [];

            searchBox.addListener('places_changed', function () {
                var places = searchBox.getPlaces();

                if (places.length == 0)
                    return;

                markers.forEach(function (m) { m.setMap(null); });
                markers = [];

                var bounds = new google.maps.LatLngBounds();
                places.forEach(function(p) {
                    if (!p.geometry)
                        return;

                    marker = new google.maps.Marker({
                        map: map,
                        title: p.name,
                        position: p.geometry.location
                    });

                    markers.push(marker);

                    if (p.geometry.viewport){
                        bounds.union(p.geometry.viewport);
                    } else {
                        bounds.extend(p.geometry.location);
                    }

                    //conseguir position
                    var location = p.geometry.location;
                    var gLocation = {lat: location.lat(), lng: location.lng(), title: $('input[name=search]').val()}

                    _base.addItem(gLocation);
                });

                map.fitBounds(bounds);
            });

            google.maps.event.addListener(map, 'click', function(event) {
                if(marker){
                    marker.setMap(null);
                }

                marker = new google.maps.Marker({
                    position: event.latLng,
                    map: map
                });
            });

        },

        item: function(){
            $('.content-sitem').on('click', 'article .js-delete',function(){
                $(this).parent().remove();
            });

            $('.content-sitem').on('click', 'article .js-change',function(){
                var parent = $(this).parent();

                if($(this).attr('behavior') == 0){
                    parent.find('.js-title-edit').val(parent.find('.js-title').text());
                    parent.find('.js-title').hide();
                    parent.find('.js-title-edit').show();

                    $(this).attr('behavior', 1);
                    $(this).text('Guardar');
                } else {
                    parent.find('.js-title').text(parent.find('.js-title-edit').val());
                    parent.find('.js-title').show();
                    parent.find('.js-title-edit').hide();

                    parent.attr('data-title', parent.find('.js-title-edit').val());

                    $(this).attr('behavior', 0);
                    $(this).text('Editar dirección');
                }
            });

            $('.content-sitem').on('click', '.js-check',function(){
                if(parseInt($(this).parent().attr('state'))){
                    return false;
                }

                _base.cleanItem();

                //activando
                $(this).parent().attr('state', 1);
                $(this).parent().addClass('active');

                var gLocation = {
                    position:{
                        lat: parseFloat($(this).parent().attr('data-lat')),
                        lng: parseFloat($(this).parent().attr('data-lng')),
                        title: $(this).parent().find('.js-title').text()
                    }
                };

                _base.gMarker(gLocation, 'edit');
            });

            $('input[name=locationAllEdit]').on('click', function(){
                var location    = [];
                var items       = $('.content-sitem article');

                if(items.length > 1){
                    items.each(function(i){
                        location.push({
                            lat: parseFloat(items.eq(i).attr('data-lat')),
                            lng: parseFloat(items.eq(i).attr('data-lng')),
                            title: items.eq(i).attr('data-title')
                        });
                    });

                    _base.cleanItem();
                    _base.gMarkes(location);
                }
            });

        },
        cleanItem: function(){
            var items = $('.content-sitem article');

            items.each(function(i){
                items.eq(i).attr('state', 0);
                items.eq(i).removeClass('active');
            });

            $('.content-sitem article input[type=radio]').removeAttr('checked');
        },
        addItem: function(location){
            var html = "<article data-lat='" + location.lat + "' data-lng='" + location.lng + "' data-title='" + location.title + "' state='0' class='js-item'>";
                    html += '<input type="radio" name="check"  value="" class="js-check">';
                    html += '<b class="js-title">' + location.title + '</b>';
                    html += '<input type="text" name="title"  value="" class="dn js-title-edit">';
                    html += '<span class="js-delete">X</span>';
                    html += '<span class="js-change" behavior="0">Editar dirección</span>';
                html += '</article>';

            $('.content-sitem').prepend(html);

            _base.cleanItem();

            $('.content-sitem article:first input[type=radio]').click();

        }

    };

    _base.init();
});