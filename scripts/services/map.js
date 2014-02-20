angular.module('myApp')
    .service('leafletService', function() {

            L.Icon.Default.imagePath = "media/images/leaflet";
            var map, sidebar;

            function initMap() {

                map = L.map('map').setView([51.505, -0.09], 13);

                // leaflet sidebar
                sidebar = L.control.sidebar('sidebar', {
                        position: 'left'
                    });

                map.addControl(sidebar);
                sidebar.toggle();

                // add an OpenStreetMap tile layer
                L.tileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);

                // add a marker in the given location, attach some popup content to it and open the popup
                L.marker([51.5, -0.09]).addTo(map)
                    .bindPopup('A pretty CSS3 popup. <br> Easily customizable.')
                    .openPopup();
            }

            return {
                createMap : function() {
                    initMap();
                },
                getMap : function() {
                    return map;
                }
            };
    });
