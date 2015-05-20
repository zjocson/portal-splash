var xSetPage = (function () {

  //  LOAD THE SPLASH PAGE IFRAME AND ADD TO BODY
  var loadIframe = function () {
        var xWindowHeight = window.innerHeight,
          iframeContainer = document.createElement('div'),
          splashIframe = document.createElement('iframe');
        document.body.appendChild(iframeContainer);
        iframeContainer.appendChild(splashIframe);
        splashIframe.src = 'http://s3.amazonaws.com/static.agency.discovery.com/portal-splash/test.html';
        splashIframe.setAttribute('style', 'width: 100%; height:' + xWindowHeight + 'px;');
        splashIframe.id = 'splash-iframe';
        iframeContainer.id = 'splash-container';
        iframeContainer.setAttribute('style', 'position: absolute; top: 0; left: 0; width: 100%; height:' + xWindowHeight + 'px;');
  };
  // COOKIE FOR SPLASH PAGE, SHOW ONCE
  var setSplashCookie = (function () {
      if (document.cookie.replace(/(?:(?:^|.*;\s*)splashCookie\s*\=\s*([^;]*).*$)|^.*$/, "$1") !== "true") {
          loadIframe();
          document.cookie = "splashCookie=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
      }
   })();

  // RECEIVE MESSAGE FROM WITHIN IFRAME 
  var receiveCloseMessage = function(event) {
     if (event.data==='removeIframe'){
        var splashFrame = document.getElementById('splash-iframe');
        splashFrame.parentNode.removeChild(splashFrame);
     }
  };

  // BASIC DEBOUNCE
  function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  //RESIZE STUFF
  var setSizes = debounce(function () {
    var newHeight = window.innerHeight,
        splashFrame = document.getElementById('splash-iframe'),
        splashContainer = document.getElementById('splash-container');
    splashContainer.setAttribute('style', 'width: 100%; height:' + newHeight + 'px;');
    splashFrame.setAttribute('style', 'position: absolute; top: 0; left: 0; width: 100%; height:' + newHeight + 'px;' );
  }, 250);

  return {
    xReceiveCloseMessage: receiveCloseMessage,
    xSetSizes: setSizes 
  };

})();


window.addEventListener('message', xSetPage.xReceiveCloseMessage, false);
window.addEventListener('resize', function () {
  if (document.getElementById('splash-container') !== null ) {
    xSetPage.xSetSizes();
  } else {
    console.log('resized');
  }
});