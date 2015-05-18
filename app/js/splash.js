var animateSplash = function() {
    $('.main').animate({
        top: '0',
        opacity: '1'
    }, 1000);
}();

function closeIframe() {
   parent.window.postMessage('removeIframe', '*');
}

$( '.close-btn' ).on( 'click', function(e) {
    e.preventDefault();
    closeIframe();
});