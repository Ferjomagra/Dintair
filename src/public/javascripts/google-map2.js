/**
 * @author Dimas Gustavo amadeusc2@gmail.com
 * @version 1.0
 */

$(function() {
    var _base = {
        init : function(){
            //_base.getEdit();
            //_base.item();

            _base.editMap();
        },
        editMap: function(){
            var points = [
                { lat: 36.170603, lng: -114.577065 },
                { lat: 35.144478, lng: -115.33516959999997 }
            ];

            function getBoundsZoomLevel(bounds, mapDim) {
                var WORLD_DIM = { height: 256, width: 256 };
                var ZOOM_MAX = 10;

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
                    position: new google.maps.LatLng(point.lat, point.lng)
                });
            }

            function createBoundsForMarkers(markers) {
                var bounds = new google.maps.LatLngBounds();
                $.each(markers, function() {
                    bounds.extend(this.getPosition());
                });
                return bounds;
            }

            //var $mapDiv = $('#mapDiv');
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













        gMarker: function(obj){
            let map = new google.maps.Map(document.getElementById('map'), {
                center: obj.position,
                zoom:6
            });

            let marker = new google.maps.Marker({
                position:obj.position,
                map: map,
                title: obj.title
            });
        },
        gMarkes: function(obj){

            //console.log('llego aqui---->');
            //console.log(obj[0].position);

            //var position = {lat: parseFloat(obj[0].position.lat), lng: parseFloat(obj[0].position.lng)};
            //console.log(position);


            //estuvo antes
            let map = new google.maps.Map(document.getElementById('map'), {
                center: obj[0].position,
                //center: position,
                zoom:6
            });


            let markers = obj.map(item => {
                return new google.maps.Marker({
                    position: item.position,
                    title: item.title,
                    map:map
                });
            });

            //zoon y center automatico
            var bounds = new google.maps.LatLngBounds();
            console.log(bounds);
            //map.set_zoom(map.getBoundsZoomLevel(bounds));
            map.set_zoom(_base._getBoundsZoomLevel(bounds, map));
            map.set_center(bounds.getCenter());


        },
        getLocation: function(){
            $('select[name=location]').on('change', function(){
                var element = $(this).find('option:selected');
                var position = element.attr("data-position");

                var location = {position: JSON.parse(position), title: element.attr('data-title')};

                _base.gMarker(location);
            });

            $('input[name=locationAll]').on('click', function(){
                var position = $(this).attr('data-location');

                var location = JSON.parse(position);

                _base.gMarkes(location);
            });
        },
        getLocationDefault: function(){
            var element = $('select[name=location] option').eq(0);
            var position = element.attr('data-position');

            var location = {position: JSON.parse(position), title: element.attr('data-title')};

            _base.gMarker(location);
        },
        getEdit: function(){
            var options = {
                center: { lat: 43.654, lng: -79.383 },
                zoom: 10
            };

            map = new google.maps.Map(document.getElementById('map'), options);

            var input = document.getElementById('search');
            var searchBox = new google.maps.places.SearchBox(input);

            map.addListener('bounds_changed', function() {
                searchBox.setBounds(map.getBounds());
            });

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

                    markers.push(new google.maps.Marker({
                        map: map,
                        title: p.name,
                        position: p.geometry.location
                    }));

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

        },
        item: function(){
            $('.content-sitem').on('click', 'article span',function(){
                $(this).parent().remove();
            });

            $('input[name=locationAllEdit]').on('click', function(){
                var location    = [];
                var items       = $('.content-sitem article');

                items.each(function(i){
                    location.push({
                        position: {lat: parseFloat(items.eq(i).attr('data-lat')), lng: parseFloat(items.eq(i).attr('data-lng'))},
                        title: items.eq(i).attr('data-title')
                    });
                });

                console.log(location);

                _base.gMarkes(location);
            });
        },
        addItem: function(location){
            var html = "<article data-lat='" + location.lat + "' data-lng='" + location.lng + "' data-title='" + location.title + "'>";
                    html += location.title;
                    html += '<span>X</span>';
                html += '</article>';

            $('.content-sitem').append(html);
        }

    };

    _base.init();
});