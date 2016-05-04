// code the detect mobile
var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

// change the overflow style depending on device
if(isMobile.any()){
  document.getElementById("ctn").style.overflow = "scroll";
  document.getElementById("main").height = "auto";
  document.getElementById("content").height = "auto";
}else{
  document.getElementById("ctn").style.overflow = "hidden";
}
