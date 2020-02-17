var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("top_bar").style.top = "0";
  } else {
    document.getElementById("top_bar").style.top = "-100px";
  }
  prevScrollpos = currentScrollPos;
}