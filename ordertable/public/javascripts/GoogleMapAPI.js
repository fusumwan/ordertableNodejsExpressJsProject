/**************************************************
 // Author: Sum Wan,FU
 // Date: 7-5-2019
 // Description: GoogleMapAPI javascript
 **************************************************/



var GoogleMapAPI = {
  
  /*
   Give a new look to the infowindow close button and image maker.
  */
  
    Geolocation : {
        CreateMap: function (id, options) {
            if (id != null && id != '' && id != undefined) {
                return new google.maps.Map(document.getElementById(id), options);
            }
            return null;
        },
        CreateInfoWindow : function(map,position,content){
            if (map != null && position != null && content != null && content != '') {
                /*
                var infowindow = new google.maps.InfoWindow({
                    content: content
                });

                infowindow.open(map, position);
                */
                return new google.maps.InfoWindow({
                    map: map,
                    position: position,
                    content: content
                });
            }
            return null;
        }
    },
    GeolocationMap : function (id, zoom) {
        this.id = id;
        this.map = null;
        this.zoom_size = zoom;
        this.mapOptions = { zoom: this.zoom_size };
        this.position = null;
        this.cur_position = null;
        this.latlng = null;
        this.def_latitude = 22.282186;
        this.def_longitude = 114.157741;
        this.mapOptions = { zoom: this.zoom_size, center: new google.maps.LatLng(this.def_latitude, this.def_longitude) };
        this.center_pos={lat:0,lng:0};
        this.MapInfoWin = null;
        this.MapInfoWinImgSrc = "data:image/jpeg;base64,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";
        this.UserLocationsInfoWin = new Array();
        this.initialize = function () {
            var This = this;
            this.mapOptions = { zoom: this.zoom_size, center: new google.maps.LatLng(this.def_latitude, this.def_longitude) };
            this.map = GoogleMapAPI.Geolocation.CreateMap(this.id, this.mapOptions);
            if (navigator.geolocation) {
                if (this.latlng == null) {
                    this.SetDefLatitudeLongitude(this.def_latitude, this.def_longitude);
                    this.position = this.CalcLatLng(this.def_latitude, this.def_longitude);
                    this.latlng = new google.maps.LatLng(this.def_latitude, this.def_longitude);
                    //this.MapInfoWin = this.CreateMapInfoWin(this.position, this.MapInfoWinImgSrc);
                }
                navigator.geolocation.getCurrentPosition(function(position) {
                    var pos = {
                      lat: position.coords.latitude,
                      lng: position.coords.longitude
                    };
                    This.SetGoogleMapCenter(pos.lat,pos.lng);
                });

                //this.map.setCenter(this.latlng);
            } else {
                This.handleNoGeolocation(false);
            }
        };

        this.SetDefLatitudeLongitude = function (latitude, longitude) {
            this.def_latitude = latitude;
            this.def_longitude = longitude;
            this.latlng = this.CalcLatLng(latitude, longitude);
        };

        this.CalcLatLng = function (latitude, longitude) {
            return new google.maps.LatLng(latitude, longitude);
        };
        this.SetGoogleMapCenter = function (latitude, longitude) {
            if ((latitude != undefined && latitude != null && latitude != "") &&
                (longitude != undefined && longitude != null && longitude != "") && this.position != null) {
                this.position = this.CalcLatLng(latitude, longitude);
                
                if (this.MapInfoWin != null) {
                    this.MapInfoWin.setPosition(this.position);

                }
                
                this.map.setCenter(this.CalcLatLng(latitude, longitude));
            }
        };

        
        
        this.handleNoGeolocation = function (errorFlag) {
            if (errorFlag) {
                var content = 'Error: The Geolocation service failed.';
            } else {
                var content = 'Error: Your browser doesn\'t support geolocation.';
            }

            var options = {
                map: this.map,
                position: new google.maps.LatLng(this.def_latitude, this.def_longitude),
                content: content
            };

            var infowindow = CreateInfoWindow(options.position, options.content);
            map.setCenter(options.position);
        };
        this.CreateInfoWindow = function (position, content) {
            if (this.map != null && content != "") {
                return GoogleMapAPI.Geolocation.CreateInfoWindow(this.map, position, content);
            }
            return null;
        };
        this.AddUserPosition = function (position, content) {
            if (this.map != null && content != "") {
                return GoogleMapAPI.Geolocation.CreateInfoWindow(this.map, position, '<img src="' + this.MapInfoWinImgSrc + '" width=20px height=20px  >' + content + '</a>');
            }
            return null;
        }
        this.UserMapLocations = new Array();
        this.CloseAllInfos = function () {
            for (var i = 0; i < this.UserLocationsInfoWin.length; i++) {
                this.UserLocationsInfoWin[i].close();
            }
        };
    }
}


function MapControl(id,zoom){
    this.Control=new GoogleMapAPI.GeolocationMap(id, zoom);
    this.initialize=function(){
        this.Control.initialize();
    }
    this.SetMapCenter=function(Latitude, Longitude) {
        if (!(Longitude == 500.0 && Latitude == 500.0)) {
            this.Control.SetGoogleMapCenter(Latitude, Longitude);
        }
    }
    this.CreateInfoWindow=function(Latitude, Longitude, Content) {
        if (!(Longitude == 500.0 && Latitude == 500.0)) {
            var pos1 = this.Control.CalcLatLng(Latitude, Longitude);
            var InfoWin = this.Control.AddUserPosition(pos1, Content);
            this.Control.UserLocationsInfoWin.push(InfoWin);
        }
    }
}






