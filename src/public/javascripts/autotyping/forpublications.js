// DISCLAIMER: This function does require jQuery. I've used it here because the project I'm building this for already uses jQuery, so I thought why not. It can be modified quite simply to be done in raw JavaScript.  Just thought I'd let you know.




// This is the funtion you need to copy
// Copy from line 9 to 34

function autoType2(elementClass2, typingSpeed2){
  var thhis = $(elementClass2);
  thhis.css({
    "position": "relative",
    "display": "inline-block",
    "margin": "0 auto",
    "text-align": "center",
    "padding-top": "13px"
  });
  thhis.prepend('<div class="cursor" style="right: initial; text-align:center; margin:0 auto"></div>');


  thhis = thhis.find(".text-js");
  var text = thhis.text().trim().split('');
  var amntOfChars = text.length;
  var newString = "";
  thhis.text("");
  setTimeout(function(){
    thhis.css("opacity",1);
    thhis.prev().removeAttr("style");
    thhis.text("");
    for(var i = 0; i < amntOfChars; i++){
      (function(i,char){
        setTimeout(function() {        
          newString += char;
          thhis.text(newString);
        },i*typingSpeed2);
      })(i+1,text[i]);
    }
  },1300);

}

$(document).ready(function(){
  // Now to start autoTyping just call the autoType function with the 
  // class of outer div
  // The second paramter is the speed between each letter is typed.   
  autoType2(".type-js",50);
});




function autoType(elementClass, typingSpeed){
  var thhis = $(elementClass);
  thhis.css({
    "position": "relative",
    "display": "inline-block",
    "margin": "0 auto",
    "text-align": "center",
    "padding-top": "13px"
  });
  thhis.prepend('<div class="cursor" style="right: initial; text-align:center; margin:0 auto"></div>');
  

  thhis = thhis.find(".text-js_second");
  var text = thhis.text().trim().split('');
  var amntOfChars = text.length;
  var newString = "";
  thhis.text("");
  setTimeout(function(){
    thhis.css("opacity",1);
    thhis.prev().removeAttr("style");
    thhis.text("");
    for(var i = 0; i < amntOfChars; i++){
      (function(i,char){
        setTimeout(function() {        
          newString += char;
          thhis.text(newString);
        },i*typingSpeed);
      })(i+1,text[i]);
    }
  },3800);

}

$(document).ready(function(){
  // Now to start autoTyping just call the autoType function with the 
  // class of outer div
  // The second paramter is the speed between each letter is typed.   
  autoType(".type-js_second",40);
});