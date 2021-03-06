// document.addEventListener('contextmenu', event => event.preventDefault());
jQuery(document).ready(function($) {
	var map;
    var zoom; 
    var infowindow;
    function detectmob() { 
	 if( navigator.userAgent.match(/Android/i)
	 || navigator.userAgent.match(/webOS/i)
	 || navigator.userAgent.match(/iPhone/i)
	 || navigator.userAgent.match(/iPad/i)
	 || navigator.userAgent.match(/iPod/i)
	 || navigator.userAgent.match(/BlackBerry/i)
	 || navigator.userAgent.match(/Windows Phone/i)
	 ){
	    return true;
	  }
	 else {
	    return false;
	  }
	}
    function initMap(zoom) {
        var pyrmont = {lat: 16.0350837, lng: 108.2094689};
        map = new google.maps.Map(document.getElementById('map'), {
          center: pyrmont,
          zoom: zoom
        });
        infowindow = new google.maps.InfoWindow();
        callback(data)
      }
      function callback(location) {
          for (var i = 0; i < location.length; i++) {
            var icons;
            switch(location[i]["Loại BDS"]){
              case "Biệt Thự":
                  icons = "villa"
                break;
              case "Đất":
                  icons = "land"
                break;
              case "Nhà":
                  icons = "house"
                break;
            }
          	try{
              location[i].geometry = {
                location:{
                  lat : parseFloat(location[i]["Vị trí"].split(", ")[0]),
                  lng : parseFloat(location[i]["Vị trí"].split(", ")[1]),
                },
                icons : `/icon-map/${icons}.svg`
              };
            createMarker(location[i]);
            }catch(e){
              console.log("error");
            }
          }
      }
      var infowindow = new google.maps.InfoWindow({
      });
      function renderMap() {
        if(detectmob()){
          zoom = 11;
          $("#map").css("height","300px")
        }else{
          zoom = 12;
          $("#map").css("height","500px")
        }
      }
      function createMarker(place) {
        var marker = new google.maps.Marker({
          map: map,
          icon: place.geometry.icons,
          position: place.geometry.location,
          title: place["Loại dự án"]
        });
        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place["Loại dự án"]);
          infowindow.open(map, this);
        });
        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });
      }
      if(detectmob()){
      	zoom = 11;
        $("#map").css("height","0px")
      }else{
        zoom = 12;
        $("#map").css("height","0px")
      }
      initMap(zoom);
      if(window.location.pathname!=='/chi-tiet'){
        $(".fa.fa-map").click(function(event) {
          if($("#map").css("height")==="0px"){
            renderMap()
          }else{
            $("#map").css("height","0px")
          }
        });
      }else{
        renderMap()
      }
});