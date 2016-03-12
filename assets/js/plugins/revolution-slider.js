var RevolutionSlider = function () {

    return {
        
        //Revolution Slider - Full Width
        initRSfullWidth: function () {
		    var revapi;
	        jQuery(document).ready(function() {
	            revapi = jQuery('.tp-banner').revolution(
	            {
	                delay:9000,
	                startwidth:1170,
	                startheight:700,
	                hideThumbs:10,
					navigationStyle:"preview4"
	            });
	        });
        },

        //Revolution Slider - Full Width
        initRSfullWidth_v2: function () {
            var revapi;
            jQuery(document).ready(function() {
                revapi = jQuery('.tp-banner').revolution(
                {
                    delay:9000,
                    startwidth:1170,
                    startheight:700,
                    hideThumbs:10,
                    navigationStyle:"preview4",
                    stopAtSlide: 3,
                    stopAfterLoops:1,
                });
            });
        },

        //Revolution Slider - Full Screen Offset Container
        initRSfullScreenOffset: function () {
		    var revapi;
	        jQuery(document).ready(function() {
	           revapi = jQuery('.tp-banner').revolution(
	            {
	                delay:15000,
	                startwidth:1170,
	                startheight:400,
	                hideThumbs:10,
	                fullWidth:"off",
	                fullScreen:"on",
	                hideCaptionAtLimit: "",
	                dottedOverlay:"twoxtwo",
	                navigationStyle:"preview4",
	                fullScreenOffsetContainer: ".header"
	            });
	        });
        }        

    };
}();        