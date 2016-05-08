/*--------------------------------------------------------------
# Subnav - Sticky Nav on scroll
--------------------------------------------------------------*/
var subNav = $('.subnav');
var stickyNav = $('.sticky-nav');
if ($.find(".subnav")[0]) {
  $('.subnav li a, .anchor-btn').click(function(e) {
    if ($(this).attr('href')[0] == '#') {
      e.preventDefault();
      var href = $.attr(this, 'href');
      $('html, body').animate({
        scrollTop: $(href).offset().top - 15
      }, 1000, function() {
        // window.location.hash = href;
        if (history.pushState) {
          history.pushState(null, null, href);
        } else {
          location.hash = href;
        }
      });
    }
  });
  var subnavPos = $('.subnav').offset().top;
  $(window).on('resize', function() {
    if ($(window).width() < 768) { //below sm
      subnavPos = $('.subnav').offset().top;
      if ($('.subnav').hasClass('fixed')) {
        $('.subnav').removeClass('fixed');
      };
    } else {
      if (!$('.subnav').hasClass('fixed')) {
        subnavPos = $('.subnav').offset().top;
      };
    };
  });
  $(window).scroll(function() {
    scroll = $(window).scrollTop();
    if ($(window).width() >= 768) { //above sm
      if (scroll >= subnavPos) {
        $('.subnav').addClass('fixed');
        //$('.sticky-nav li a').addClass('active');
      } else {
        $('.subnav').removeClass('fixed');
      };
      $('.sticky-nav a').each(function() {
        var currentLink = $(this);
        var refElement = $(currentLink.attr("href"));
        if (refElement.position().top <= scroll && refElement.position()
          .top + refElement.height() > scroll) {
          $('.sticky-nav li a').removeClass("active");
          currentLink.addClass("active");
        } else {
          currentLink.removeClass("active");
        }
      });
    }
  });
}