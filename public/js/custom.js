jQuery(document).ready(function(){

    jQuery(".banner-slider").owlCarousel({
        loop: true,
        margin: 24,
        nav: true,
        dots: false,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        autoHeight: true,  // Added autoHeight
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1
            }
        }
    });

    jQuery(".lead-slider").owlCarousel({
        loop: true,
        margin: 24,
        nav: true,
        dots: false,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        autoHeight: true,  // Added autoHeight
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1
            }
        }
    });

    jQuery(".category-slider").owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        dots: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        autoHeight: true,  // Added autoHeight
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 5
            }
        }
    });


        jQuery('.read-more').click(function(e){
          e.preventDefault();
          
          var $this = jQuery(this);
          var $moreText = $this.siblings('.more-text');
          
          if ($moreText.is(':visible')) {
            $moreText.hide();
            $this.text('Read More');
          } else {
            $moreText.show();
            $this.text('Read Less');
          }
        });
      

});
