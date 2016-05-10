var	$parent = $(".video-tiles"),
    $aside = $(".aside"),
	$asideTarget = $(".aside-details"),
	$asideClose = $("a.close"),
	$tilesParent = $(".tiles-a"),
	$tiles = $tilesParent.find("a"),
	slideClass = "show-detail";

// tile click
$tiles.on("click", function(e) {
  e.preventDefault();
  e.stopPropagation();
    if(!$("html").hasClass(slideClass)) {
	  $tiles.removeClass("active");
	  $(this).addClass("active");
      $(this).attr("aria-expanded","true");
      loadTileData($(this));
    } else {
      killAside();
      $(this).attr("aria-expanded","false");
    }
});

// kill aside
$asideClose.on("click", function(e) {
  e.preventDefault();
  killAside();
});

// load data to aside
function loadTileData(target) {
  var $this = $(target),
    itemHtml = $this.find(".details").html();
    $asideTarget.html(itemHtml);
    showAside();
}

// show/hide aside
function showAside() {
  if(!$("html").hasClass(slideClass)) {
    $("html").toggleClass(slideClass);
    $aside.attr("aria-hidden","false");
    $aside.addClass("show");
	focusCloseButton();
  }
}

// handle esc key
window.addEventListener("keyup", function(e){
// grab key pressed
var code = (e.keyCode ? e.keyCode : e.which);
// escape
if(code === 27) {
  killAside();
  videoStop();
}
}, false);

// kill aside
		function killAside(){
			if($("html").hasClass(slideClass)){
				$("html").removeClass(slideClass);
				sendFocusBack();
				$aside.removeClass("show");
				$aside.attr("aria-hidden","true");
				$tiles.attr("aria-expanded","false");
			}
		}

		// send focus to close button
		function focusCloseButton(){
			$asideClose.focus();
		}

		// send focus back to item that triggered event
		function sendFocusBack(){
			$(".active").focus();
		}

		// handle body click to close off-canvas
		$parent.on("click",function(e){
			if($("html").hasClass(slideClass)){
				killAside();
			}
		});


// poster frame click event
$(document).on('click','.js-video-poster',function(ev) {
  ev.preventDefault();
  var $poster = $(this);
  var $wrapper = $poster.closest('.js-video-wrapper');
  videoPlay($wrapper);
});

// play the targeted video (and hide the poster frame)
function videoPlay($wrapper) {
  var $iframe = $wrapper.find('.js-video-iframe');
  var src = $iframe.data('src');
  // hide poster
  $wrapper.addClass('video-wrapper-active');
  // add iframe src in, starting the video
  $iframe.attr('src',src);
}

// stop the targeted/all videos (and re-instate the poster frames)
function videoStop($wrapper) {
  // if we're stopping all videos on page
  if (!$wrapper) {
    var $wrapper = $('.js-video-wrapper');
    var $iframe = $('.js-video-iframe');
  // if we're stopping a particular video
  } else {
    var $iframe = $wrapper.find('.js-video-iframe');
  }
  // reveal poster
  $wrapper.removeClass('video-wrapper-active');
  // remove youtube link, stopping the video from playing in the background
  $iframe.attr('src','');
}
