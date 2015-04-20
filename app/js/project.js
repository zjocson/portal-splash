// check if element is in viewport
// if so, then add class

(function($) {

	$(window).on('load resize scroll', function() {
		//addClassToElementInViewport($('.homepage-widget-area-1'), 'animate-bug-icon');
		//addClassToElementInViewport($('.another-thing'), 'animate-thing');
		addClassToDifferentElementInViewport($('.logo-train'), $('.wds-corporate-twitter-ticker'), 'sticky');
	});
	
	function addClassToElementInViewport(element, newClass) {
		if (inViewport(element)) {
			element.addClass(newClass);
		} else {
			element.removeClass(newClass);
		}
	}
	
	function addClassToDifferentElementInViewport(element, differentElement, newClass) {
		if (inViewport(element)) {
			differentElement.addClass(newClass);
		} else {
			differentElement.removeClass(newClass);
		}
	}
	
	function inViewport(element) {
		if (typeof jQuery === "function" && element instanceof jQuery) {
			element = element[0];
		}

		if ( ! element ) {
			return;
		}
		
		var elementBounds = element.getBoundingClientRect();
		
		return (
			elementBounds.top >= 0 &&
			elementBounds.left >= 0 &&
			elementBounds.bottom <= $(window).height() &&
			elementBounds.right <= $(window).width()
		);
	}

})(jQuery);
(function($) {

    $(document).ready(function() {

        // Grayscale images only on browsers IE10+ since they removed support for CSS grayscale filter
        if (getInternetExplorerVersion() >= 10){
            $('.logo-train .slide img').each(function(){
                var el = $(this);
                el.css({"position":"absolute"}).wrap("<div class='img_wrapper' style='display: inline-block'>").clone().addClass('img_grayscale').css({"position":"absolute","z-index":"5","opacity":"1"}).insertBefore(el).queue(function(){
                    var el = $(this);
                    el.parent().css({"width":this.width,"height":this.height});
                    el.dequeue();
                });
                this.src = grayscaleIE10(this.src);
            });

            // Quick animation on IE10+
            $('.logo-train .slide img').hover(
                function () {
                    $(this).parent().find('img:first').stop().animate({opacity:0}, 200);
                },
                function () {
                    $('.img_grayscale').stop().animate({opacity:1}, 200);
                }
            );

            function grayscaleIE10(src){
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');
                var imgObj = new Image();
                imgObj.src = src;
                canvas.width = imgObj.width;
                canvas.height = imgObj.height;
                ctx.drawImage(imgObj, 0, 0);
                var imgPixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
                for(var y = 0; y < imgPixels.height; y++){
                    for(var x = 0; x < imgPixels.width; x++){
                        var i = (y * 4) * imgPixels.width + x * 4;
                        var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
                        imgPixels.data[i] = avg;
                        imgPixels.data[i + 1] = avg;
                        imgPixels.data[i + 2] = avg;
                    }
                }
                ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
                return canvas.toDataURL();
            };
        };

        // Detection function to tell what kind of browser is used
        function getBrowser(){
            var userAgent = navigator.userAgent.toLowerCase();
            $.browser.chrome = /chrome/.test(userAgent);
            $.browser.safari= /webkit/.test(userAgent);
            $.browser.opera=/opera/.test(userAgent);
            $.browser.msie=/msie/.test( userAgent ) && !/opera/.test( userAgent );
            $.browser.mozilla= /mozilla/.test( userAgent ) && !/(compatible|webkit)/.test( userAgent ) || /firefox/.test(userAgent);

            if($.browser.chrome) return "chrome";
            if($.browser.mozilla) return "mozilla";
            if($.browser.opera) return "opera";
            if($.browser.safari) return "safari";
            if($.browser.msie) return "ie";
        };

        // Since IE11 can not be detected like this because the new user agent on IE11 is trying to hide as Mozilla
        // we detect IE11 with this function
        function getInternetExplorerVersion(){
            var rv = -1;
            if (navigator.appName == 'Microsoft Internet Explorer'){
                var ua = navigator.userAgent;
                var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
                if (re.exec(ua) != null)
                    rv = parseFloat( RegExp.$1 );
            }
            else if (navigator.appName == 'Netscape'){
                var ua = navigator.userAgent;
                var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
                if (re.exec(ua) != null)
                    rv = parseFloat( RegExp.$1 );
            }
            return rv;
        };
    });

})(jQuery);
jQuery(document).ready(function($) {
	$('.site-main img').not('.no-tint').each(function() {
		$(this).wrap('<div class="tint"></div>');
	});
});
jQuery(document).ready( function($) {
	
	if (window.innerWidth > 1366) {
		$('#site-navigation').mmenu(
			{
				// options
				slidingSubmenus: false
			}, 
			{
				// configuration
				classNames: {
				fixedElements: 
					{
						fixedTop: "fixedTop",
					}
				}
			}
		);
	} else {
		$('#site-navigation').mmenu(
			{
			slidingSubmenus: false
			}
		);
	}
	
	$('#site-navigation').mmenu().on( "opening.mm", function() {
		
		// Set aria-pressed attribution
		$('.menu-toggle').attr('aria-pressed', 'true');
		
    }).on( "closing.mm", function() {
	    
		// Set aria-pressed attribution
		$('.menu-toggle').attr('aria-pressed', 'false');
	    
    })
	
	if ($('body').hasClass('admin-bar')) {
		$('html').addClass('wp-admin-bar');
	}
	
});
(function($){
	var $c = {
		content: null,
		post: null
	};
	var oldContent = '';
	var interval;

	var init = function() {
		cache();
		events();
	};

	var cache = function() {
		$c.body = $(document.body);
	};

	var events = function() {
		$c.body.on( 'click','.executive .thickbox, .exec-modal', modalLinkClicked );
	};

	var modalLinkClicked = function() {
		$c.post = $(this).data('post');

		if ( ! $c.post ) {
			$c.post = $(this).parents('.executive');
		}

		$c.content = $('#TB_ajaxContent');
		oldContent = $c.content.html();

		clearInterval(interval);

		waitForModal();
	};

	var waitForModal = function(e) {
		if ( $c.content.html() != oldContent ) {
			modalOpened();
			//interval = setInterval( modalOpened, 500 );
		} else {
			setTimeout( waitForModal, 200 );
		}
	};

	var modalOpened = function() {
		if ( $c.content.find('.exec-modal').length > 0 ) {
			return;
		}

		$(window).resize();

		var $nextPost = $c.post.next().children('a');
		var $prevPost = $c.post.prev().children('a');

		if ( $nextPost.length > 0 ) {
			var $nextLink = $('<a href="' + $nextPost.prop('href') + '" class="exec-modal next thickbox"><div><span class="screen-reader-text">Next</span></div></a>').click(function(e){
				e.preventDefault();
				e.stopImmediatePropagation();
				$('#TB_overlay').click();
				setTimeout(function(){
					$nextPost.click();
				}, 400);
			});
			$nextLink.data( 'post', $nextPost.parent() );
			$c.content.append( $nextLink );
		}

		if ( $prevPost.length > 0 ) {
			var $prevLink = $('<a href="' + $prevPost.prop('href') + '" class="exec-modal prev thickbox"><div><span class="screen-reader-text">Previous</span></div></a>').click(function(e){
				e.preventDefault();
				e.stopImmediatePropagation();
				$('#TB_overlay').click();
				setTimeout(function(){
					$prevPost.click();
				}, 400);
			});
			$prevLink.data( 'post', $prevPost.parent() );
			$c.content.append( $prevLink );
		}
	};

	$(init);
})(jQuery);
jQuery(window).resize(function(){
	var $ = jQuery,
		margins = 60,
		vmargins = 120,
		maxwidth = 960,
		TB_WIDTH = 960,
		TB_HEIGHT = 1000,
		wWidth = $(window).width(),
		wHeight = $(window).height(),
		$tbwindow = $("#TB_window");

	if ( wWidth < ( maxwidth + margins * 2 ) ) {
		TB_WIDTH = wWidth - margins * 2;
	}

	TB_HEIGHT = wHeight - vmargins * 2;

	$tbwindow.css({
		marginLeft: '-' + parseInt((TB_WIDTH / 2),10) + 'px',
		width: TB_WIDTH + 'px',

		marginTop: '-' + parseInt((TB_HEIGHT / 2),10) + 'px',
		height: TB_HEIGHT + 'px'
	});

	$tbwindow.children('#TB_ajaxContent').css({
		width: '100%',
		height: '100%'
	});
});

jQuery(document.body).on('click','.thickbox',function(){
	setTimeout(function(){
		jQuery(window).resize();
	}, 500);
});
jQuery(document).ready( function($) {

	var isActive = function(){
		return window.innerWidth > 1366;
	};

	var searchToggle = $('.site-header .search-toggle');
	var searchInput  = $('.site-header .search-field');

	searchToggle.click(function(){
		if ( ! isActive() )
			return;


		if($(this).hasClass('toggled')) {

		    searchInput.animate({
		        'width' : 0
		    }, 300).focus().queue(function(){
					$(this).removeClass('toggled');
					$(this).dequeue();
			});

			$(this).removeClass('toggled');

		} else {

		    searchInput.animate({
		        'width' : 218
		    }, 300).focus().queue(function(){
					$(this).addClass('toggled');
					$(this).dequeue();
			});

			$(this).addClass('toggled');

		}
	});

	// Once opened, check to see if the user isn't hovered or clicking the text field, and then don't do anything like close it
	searchInput.hover( function() {
		$(this).removeClass('unhovered');
	}, function() {
		$(this).addClass('unhovered');
	});

	// If the user is not hovered over the open text field, and they click, go ahead and close it
	$(document).click(function(){
		if(searchInput.hasClass('toggled') && searchInput.hasClass('unhovered')) {
			searchInput.animate({
					'width' : 0
			}, 300).queue(function(){
				$(this).removeClass('toggled');
				$(this).dequeue();
			});
		}
	});

});
( function() {
	var is_webkit = navigator.userAgent.toLowerCase().indexOf( 'webkit' ) > -1,
	    is_opera  = navigator.userAgent.toLowerCase().indexOf( 'opera' )  > -1,
	    is_ie     = navigator.userAgent.toLowerCase().indexOf( 'msie' )   > -1;

	if ( ( is_webkit || is_opera || is_ie ) && document.getElementById && window.addEventListener ) {
		window.addEventListener( 'hashchange', function() {
			var id = location.hash.substring( 1 ),
				element;

			if ( ! /^[A-z0-9_-]+$/.test( id ) ) {
				return;
			}

			element = document.getElementById( id );

			if ( element ) {
				if ( ! /^(?:a|select|input|button|textarea)$/i.test( element.tagName ) ) {
					element.tabIndex = -1;
				}

				element.focus();
			}
		}, false );
	}
})();
( function($) {
	
	var stickyMenu = function() {
		if (window.innerWidth > 1366) {
			$('html').addClass( 'sticky-menu' );
			$('#page').css('padding-top', '140px');
		} else {
			$('html').removeClass( 'sticky-menu' );
			$('#page').css('padding-top', '0');
		}
	}
	
	$(window).resize(stickyMenu);
	$(document).ready(stickyMenu);

} )(jQuery);


window.WDS_Twitter_Ticker = (function($){

	var that = {},
		$c   = {};

	var init = function() {
		that.cache();

		that.run();
	};

	that.cache = function() {
		$c.window = $(window);
		$c.body   = $(document.body);
		$c.tweets = $c.body.find('.tweets');
	};

	that.run = function() {
		$c.tweets.animate( {
			'margin-left': -$c.tweets.children().first().outerWidth( true )
		}, 20000, 'linear', that.next );
	};

	that.next = function() {
		$c.tweets.children().first().appendTo( $c.tweets );
		$c.tweets.css({
			'margin-left': 0
		});

		that.run();
	};

	$(init);
})(jQuery);
