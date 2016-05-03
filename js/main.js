// code to detect mobile
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  document.getElementById("ctn").style.overflow = scroll;
}else{
  document.getElementById("ctn").style.overflow = hidden;
}
