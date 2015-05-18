var loadIframe = function() {
    var iframeContainer = document.createElement('div');
    var splashIframe = document.createElement('iframe');
    var windowHeight = window.innerHeight;
    //splashIframe.src = 'http://cnn.com';
    splashIframe.src = 'http://s3.amazonaws.com/static.agency.discovery.com/portal-splash/test.html';
    splashIframe.setAttribute('id', 'splash-iframe')
    iframeContainer.setAttribute('style', 'position: absolute; top: 0; left: 0; width: 100%; height:' + windowHeight + 'px;');
    splashIframe.setAttribute('style', 'width: 100%; height:' + windowHeight + 'px;');
    document.body.appendChild(iframeContainer);
    iframeContainer.appendChild(splashIframe);
}


function setSplashCookie () {
    if (document.cookie.replace(/(?:(?:^|.*;\s*)splashCookie\s*\=\s*([^;]*).*$)|^.*$/, "$1") !== "true") {
        loadIframe();
        document.cookie = "splashCookie=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
    }
 }
 setSplashCookie();

 function receiveCloseMessage(event){
   if (event.data=="removeIframe"){
      var element = document.getElementById('splash-iframe');
      element.parentNode.removeChild(element);
   }
}
window.addEventListener('message', receiveCloseMessage, false);