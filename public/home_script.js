//  Functions:

//  **Media Functions
//        showImage(imgSrc, #divName)
// init function

var imgCount = 0;
var socket = io.connect();

function preLoader() {
  //Create image object. Sequentially set the object's src to the different images
  //This puts them in the cache.
  var i = 0;
  imageObj = new Image();
  for(i=0; i<31; i++) {
    //images[i] = "images/"+(i+1)+".png";
    imageObj.src="images/"+(i+1)+".png";
    imageObj.width = 256/(1+(i%4));
    //imageObj.width=
    //imagObj.height=
  }
}

// **Mediafunctions
function showImage(imgSrc, divName) {
    var img = document.createElement("img");
    browserWidth = $(window).width();
    browserHeight= $(window).height();
    
    img.src = imgSrc;
    img.width = browserWidth;
    //img.height = browserWidth/aspect;//browserHeight;//$(window).height();//browserHeight;
    img.alt = "alt text";

    //$("#imageDisplay").prepend("<img id='theImg' src='images/jum.png'/>"); 
    console.log("showImage " +img.src + " in " + divName);
    $(divName).prepend(img); 
    //console.log("showImg: " + img.src + " w: " + browserWidth + " h: " + browserHeight);
}


//** Grid Functions
function addImage(imgStr, inc) {
    var imgInc = document.createElement("img");
    //var newDiv = $('#thegrid').append($('<div/>', { 'id': 'item'+i}));
    //console.log("newDiv: ", newDiv);
    imgInc.src = (imgStr);
    imgInc.alt = ('imgStr');
    imgInc.width = 128/(1+(inc%4));
    //console.log(i);
    //console.log("imgInc width: "+imgInc.width +"i%4"+(i%4));
    $('<div id="item.w">')
      .append(imgInc)
      .appendTo('#thegrid');
  }

function removeImage(imgStr) {
  console.log("goodbye cowboy: "+imgStr);
  $('#thegrid div:last-child').remove();
  //TODO match imgStr
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

socket.on('message', function(){
  console.log("client just got a message");
  removeImage('images/1.png');
});

//** init function fired once page loaded
$(function() {
  $('#bgwash').height($(window).height()/10);
  $('#bgimage').height($(window).height());
  var containerWidth = $(window).width();

  preLoader();

  $('#removeImage').click(function() {removeImage('images/1.png')});
  //** The Grid
  $(document).ready(function(){
    $('#bgwash').height($(window).height());
    $('#bgimage').height($(window).height());
    $('#container').height($(window).height());
  });

//add images to #thegrid with id item.w
for(i=0;i<31;i++){
  var imgStr = "images/"+(i+1)+".png";
  addImage(imgStr, i);
}

//once images are loaded use masonry to show anything with id=item
imagesLoaded('#thegrid', function() {
  $('#thegrid').masonry({
    itemSelector: 'item',
    columnWidth: (1/3),//(containerWidth/50),
    gutter: -0
  });
  $("#bgimage").ready(function(){showImage('/images/bkgd.png', "#bgimage")});
  $("#bgimage").css({top: '10%'});
  $("#bgimage").delay(1*1000).animate({opacity: 1}, 1000);
})
  
  $('#thegrid').masonry();

  $(window).resize(debouncer(function(){
    console.log("window resized Matt!");
    $("#bgimage").css({opacity: 0});
    $('#bgimage img:last-child').delay(300).remove();

    showImage('/images/bkgd.png', "#bgimage");

    $("#bgimage").css({top: '10%'});
    $("#bgimage").delay(1*1000).animate({opacity: 1}, 1000);
  }));


});//end of init function


  //$("#imageDisplay").ready(function() {showImage('images/beardygrin.jpg', '#imageDisplay')});
    //$("#bgimage").css({zIndex: 1});
