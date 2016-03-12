/*
 * Template Name: Unify - Responsive Bootstrap Template
 * Description: Business, Corporate, Portfolio, E-commerce and Blog Theme.
 * Version: 1.7
 * Author: @htmlstream
 * Website: http://htmlstream.com
*/

var App = function () {
    //Fixed Header
    function handleHeader() {
        //jQuery to collapse the navbar on scroll
        $('#scrollable-body').scroll(function(t) {
            //console.log($(t.currentTarget).position())
            if (t.currentTarget.scrollTop > 150) {
                $(".navbar-fixed-top").addClass("top-nav-collapse").removeClass("top-nav");
                $(".logo-header").addClass("logo-header-colapse");
                // $('.carousel').stop();
                // $(".logo-header").animate({
                //     padding: 54,
                //     marginTop: -75,
                //     //backgroundColor: 'white'
                // }, 1000, "linear", function() {
                //     // Animation complete.
                // });
            } else {
                $(".navbar-fixed-top").addClass("top-nav").removeClass("top-nav-collapse");
                $(".logo-header").removeClass("logo-header-colapse");
                //$('.carousel').stop();
                // $(".logo-header").animate({
                //     padding: 16,
                //     marginTop: -28,
                //     //backgroundColor: '#EAEAEA'
                // }, 1000, "linear", function() {
                //     // Animation complete.
                // });
            }
        });

        //jQuery for page scrolling feature - requires jQuery Easing plugin
        $(function() {
            $('.one-page-header a').bind('click', function(event) {
                var $anchor = $(this);
                $('html, body').stop().animate({
                    scrollTop: $($anchor.attr('href')).offset().top
                }, 1500, 'easeInOutExpo');
                event.preventDefault();
            });
        });
    }


    return {
        init: function () {
            handleHeader();
        },

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
        },       

        //Scroll Bar 
        initScrollBar: function () {
            jQuery('.mCustomScrollbar').mCustomScrollbar({
                theme:"minimal",
                scrollInertia: 300,
                scrollEasing: "linear"
            });
        },

        //Counters 
        initCounter: function () {
            jQuery('.counter').counterUp({
                delay: 10,
                time: 1000
            });
        },

        //Parallax Backgrounds
        initParallaxBg: function () {
             jQuery(window).load(function() {
                jQuery('.parallaxBg').parallax("50%", 0.2);
                jQuery('.parallaxBg1').parallax("50%", 0.4);
            });
        },

        //Animate Dropdown
        initAnimateDropdown: function () {
            function MenuMode() {
                jQuery('.dropdown').on('show.bs.dropdown', function(e){
                    jQuery(this).find('.dropdown-menu').first().stop(true, true).slideDown();
                });
                jQuery('.dropdown').on('hide.bs.dropdown', function(e){
                    jQuery(this).find('.dropdown-menu').first().stop(true, true).slideUp();
                });
            }
         
            jQuery(window).resize(function(){
                if (jQuery(window).width() > 768) {
                    MenuMode();
                }
            });

            if (jQuery(window).width() > 768) {
                MenuMode();
            }
        },

    };

}();