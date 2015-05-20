var xSetPage = (function () {
  //  MAKE SETTING ATTRIBUTES QUICKER
  var setAttributes = function (el, attrs) {
    for(var key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
  };

  //  LOAD THE SPLASH PAGE IFRAME AND ADD TO BODY
  var loadIframe = function() {
      var xWindowHeight = window.innerHeight,
          xWindowWidth = window.innerWidth,
          iframeContainer = document.createElement('div'),
          splashIframe = document.createElement('iframe');

      setAttributes(splashIframe, {
        'id': 'splash-iframe',  
        'src':'http://s3.amazonaws.com/static.agency.discovery.com/portal-splash/test.html', 
        'style':'width: 100%; height:' + xWindowHeight + 'px;' 
      });
      setAttributes(iframeContainer, {
        'id': 'splash-container',
        'style': 'position: absolute; top: 0; left: 0; width: 100%; height:' + xWindowHeight + 'px;'
      });
      
      document.body.appendChild(iframeContainer);
      iframeContainer.appendChild(splashIframe);
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
     if (event.data=='removeIframe'){
        var splashFrame = document.getElementById('splash-iframe');
        splashFrame.parentNode.removeChild(splashFrame);
     }
  }

  // RESIZE STUFF
  var setSizes = function () {
    var newHeight = window.innerHeight,
        newWidth = window.innerWidth,
        splashFrame = document.getElementById('splash-iframe'),
        splashContainer = document.getElementById('splash-container');
    splashContainer.setAttribute('style', 'width: 100%; height:' + newHeight + 'px;');
    splashFrame.setAttribute('style', 'position: absolute; top: 0; left: 0; width: 100%; height:' + newHeight + 'px;');
    
  }

  return {
    xReceiveCloseMessage : receiveCloseMessage,
    xSetSizes : setSizes 
  };

})();


window.addEventListener('message', xSetPage.xReceiveCloseMessage, false);
window.addEventListener('resize', xSetPage.xSetSizes);