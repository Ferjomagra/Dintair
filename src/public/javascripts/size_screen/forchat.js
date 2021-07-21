function myFunction() {
  var w = window.outerWidth;
  var hr = window.outerHeight;
  var h = window.outerHeight-70-54-20-70;
  var txt = "Window size: width=" + w + ", height=" + hr;
  //console.log(txt)

  var chat = document.getElementById('boxCenterReco2')
  chat.setAttribute("style", "height:"+h+"px");

  var chatsection = document.getElementById('content-chat')
  chatsection.setAttribute("style", "height:"+h+"px");
}