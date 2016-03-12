var ContactPage = function () {

    return {
        
    	//Basic Map
        initMap: function () {
			var map;
			$(document).ready(function(){
			  map = new GMaps({
				div: '#contact',
				scrollwheel: false,	
                zoom: 13,			
				lat: 45.5245,
				lng: -122.6499
			  });
			  
			  var marker = map.addMarker({
				lat: 45.5245,
				lng: -122.6499,
	            title: 'Nuestro Jardín Academy, Spanish Immersion Preschool'
		       });
			});
        },

        //Panorama Map
        initPanorama: function () {
		    var panorama;
		    $(document).ready(function(){
		      panorama = GMaps.createPanorama({
		        el: '#panorama',
		        lat : 45.5245,
		        lng : -122.6499
		      });
		    });
		}        

    };
}();