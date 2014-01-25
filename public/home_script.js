//Author: Matt Mapleston
var imgCount = 0;
var socket = io.connect();
var backgroundShowing = 0;
var totalImages = 15;

function showImage(imgSrc, divName) {
    var img = document.createElement("img");
    browserWidth = $(window).width();
    browserHeight= $(window).height();
    
    img.src = imgSrc;
    img.width = browserWidth;
    img.alt = "alt text";

    console.log("showImage " +img.src + " in " + divName);
    $(divName).prepend(img); 
}

function addImage(imgStr, inc) {
    var imgInc = document.createElement("img");

    imgInc.src = (imgStr);
    imgInc.alt = ('imgStr');
    imgInc.width = 256/(1+(inc%4));

    $('<div id="item.w" data-i="'+(i+1)+'">')
      .append(imgInc)
      .appendTo('#thegrid');
  }

//called once when the page is refreshed from function() below
function loadGridImages(numImages) { 
  i=0;
  console.log('Loading '+numImages+' images');
  
  for(i=0;i<numImages;i++){
    var imgStr = "images/p"+(i+1)+".png";
    addImage(imgStr, i);
  }
  //$('#thegrid').masonry();

  imagesLoaded('#thegrid', function() {
    $('#thegrid').masonry({
      itemSelector: 'item',
      columnWidth: (1/3),//(containerWidth/50),
      gutter: 6
    });

  })
}

function loadBkgdImage() {
  console.log('Loading Background Image');
  showBackgroundImage(250);

}

function removeImage(removeNum) {
  i=0;
  switch(removeNum){
    case 0: location.reload();break;
    case 1: $('#thegrid div[data-i=1]').remove();break;
    case 2: $('#thegrid div[data-i=2]').remove();break;
    case 3: $('#thegrid div[data-i=3]').remove();break;
    case 4: 
        //this might work if I change the filename to match the order and all intervals are the same
        intervalID = setInterval(function() {
          i++;
          if(i%2 ==1) {
            $('#thegrid div[data-i='+i+']').remove();
          };
          if(i>totalImages) {
            clearInterval(intervalID);
          };
        }, 100);  break;
    case 5:
        //The full show, absolute times from button click
        $("#bgimage").animate({opacity: 0}, 250);
        $("#thegrid").animate({opacity: 1}, 1000);
        setTimeout(function () {$('#thegrid div[data-i=1]').remove();},4000);
        setTimeout(function () {$('#thegrid div[data-i=2]').remove();},8000);
        setTimeout(function () {$('#thegrid div[data-i=3]').remove();},12000);
        setTimeout(function () {$('#thegrid div[data-i=4]').remove();},16000);
        setTimeout(function () {$('#thegrid div[data-i=5]').remove();},19000);
        setTimeout(function () {$('#thegrid div[data-i=6]').remove();},23000);
        setTimeout(function () {$('#thegrid div[data-i=7]').remove();},27000);
        setTimeout(function () {$('#thegrid div[data-i=8]').remove();},31000);
        setTimeout(function () {$('#thegrid div[data-i=9]').remove();},35000);
        setTimeout(function () {$('#thegrid div[data-i=10]').remove();},39000);
        setTimeout(function () {$('#thegrid div[data-i=11]').remove();},43000);
        setTimeout(function () {$('#thegrid div[data-i=12]').remove();},47000);
        setTimeout(function () {$('#thegrid div[data-i=13]').remove();},50000);
        setTimeout(function () {$('#thegrid div[data-i=14]').remove();},55000);
        setTimeout(function () {$('#thegrid div[data-i=15]').remove();},58000);
        setTimeout(function () {$("#bgimage").animate({opacity: 1},12000);}, 50000);break;
    case 6: 
      $('#thegrid div[data-i=2]').remove();
      $('#thegrid div[data-i=4]').remove();
      $('#thegrid div[data-i=6]').remove();
      $('#thegrid div[data-i=8]').remove();
      $('#thegrid div[data-i=10]').remove();
      $('#thegrid div[data-i=12]').remove();
      $('#thegrid div[data-i=14]').remove();
      $('#thegrid div[data-i=16]').remove();
      $('#thegrid div[data-i=18]').remove();
      $('#thegrid div[data-i=20]').remove();
      $('#thegrid div[data-i=22]').remove();
      $('#thegrid div[data-i=24]').remove();
      $('#thegrid div[data-i=26]').remove();
      $('#thegrid div[data-i=28]').remove();
      $('#thegrid div[data-i=30]').remove();break;
    
    //case 7: $('#thegrid div[data-i=7]').remove();break;
    case 7: $("#thegrid").animate({opacity: 1}, 1000);
    case 8: $('#thegrid div[data-i=8]').remove();break;
    case 9: $('#thegrid div').remove();break;
    //Note: transition remove setTimeout(function () {$('#thegrid' div[data-i=n]').animate({height:0, opacity: 0}, 3000);},absTime);
  }

  //$('#thegrid div:last-child').remove();
}

//smooth the resize to stop continuous triggers while resizing window
function debouncer( func , timeout ) {
   var timeoutID , timeout = timeout || 200;
   return function () {
      var scope = this , args = arguments;
      clearTimeout( timeoutID );
      timeoutID = setTimeout( function () {
          func.apply( scope , Array.prototype.slice.call( args ) );
      } , timeout );
   }
}

function showBackgroundImage(fadeInTime) {
  console.log("showBackgroundImage");
  if (!backgroundShowing) {
    $("#bgimage").ready(function(){showImage('/images/bkgd.png', "#bgimage")});
    $("#bgimage").css({top: '10%'});
    $("#bgimage").delay(1*1000).animate({opacity: 1}, fadeInTime);
    backgroundShowing = 1;
  }
}

function showSlides() {
  console.log("showSlides");
  $("#slides").ready(function(){showImage('/images/p1.png', "#slides")});
  $("#slides").animate({opacity: 0.6}, 1000);
}

//Listen for the message containing the number of the button in sausage_script.js
socket.on('message', function(message){
  if(message<100){
  removeImage(message);
} else {
  showBackgroundImage();
}
});

//** init function fired once page loaded
$(function() {

  //set height of content divs given the client's window
  $(document).ready(function(){
    $('#bgwash').height($(window).height());
    $('#bgimage').height($(window).height());
    $('#container').height($(window).height());
    $('#slides').height($(window).height());
  });
  showSlides();
  //add images to #thegrid with id item.w
  //loadGridImages(totalImages);
  loadBkgdImage();
  loadGridImages(totalImages);
  
  //listen for window resize when bkgd is hidden during rejig
  $(window).resize(debouncer(function(){
    $('#bgwash').height($(window).height());
    $('#slides').height($(window).height());

      $('#bgimage img:last-child').delay(300).remove();
    if (backgroundShowing) {
      $("#bgimage").css({opacity: 0});
    
      $('#bgimage img:last-child').delay(300).remove();
      showImage('/images/bkgd.png', "#bgimage");
      $("#bgimage").css({top: '10%'});

      $("#bgimage").delay(1*1000).animate({opacity: 1}, 1000);
    }
  }));
  //alert( $('img[src="images/p1.png"]').length);
  $('#thegrid').masonry();
});

