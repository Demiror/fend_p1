function collapseNavbar() {
  if ($('.navbar-inverse').offset().top > 50) {
    $('.navbar-fixed-top').removeClass('large');
  } else {
    $('.navbar-fixed-top').addClass('large');
  }
}

$(window).scroll(collapseNavbar);

$(function () {
  $('a.page-scroll').bind('click', function (event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: $($anchor.attr('href')).offset().top,
    }, 1500);
    event.preventDefault();
  });
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function () {
  if ($(this).attr('class') !=
  'dropdown-toggle active' && $(this).attr('class') != 'dropdown-toggle') {
    $('.navbar-toggle:visible').click();
  }
});
