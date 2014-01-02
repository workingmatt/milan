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

//showImage pseudo code:
// call a function passing an image - done.
// get image aspect ratio (width/height)
// get window dimensions and calculate aspect ratio
// if browser is too wide, set image height to browser height and image width = height * aspect ratio
// if browser is too thin, set image width to browser width and image height = width/aspect ratio
// 
function showImage(imgSrc, divName) {
    var img = document.createElement("img");
    browserWidth = $(window).width();
    browserHeight= $(window).height();
    //var aspectRatio = browserWidth/browserHeight;
    img.src = imgSrc;
    img.width = browserWidth;
    img.height = browserHeight;//$(window).height();//browserHeight;
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
    imgInc.width = 256/(1+(i%4));
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


//** init function fired once page loaded
$(function() {
  var $thegrid = $("#thegrid");
  preLoader();
  //$("#imageDisplay").ready(function() {showImage('images/beardygrin.jpg', '#imageDisplay')});
  //$("#thegrid").ready(function() {showImage('images/beardygrin.jpg', "#thegrid")});
  $('#removeImage').click(function() {removeImage('images/1.png')});
  //** The Grid
  $(document).ready(function(){
    $('#container').height($(window).height());
  });

for(i=0;i<31;i++){
  var imgStr = "images/"+(i+1)+".png";
  addImage(imgStr, i);
}

var containerWidth = $(window).width();
console.log("containerWidth: "+containerWidth);

imagesLoaded('#thegrid', function() {
  $('#thegrid').masonry({
    itemSelector: 'item',
    columnWidth: (1/3),//(containerWidth/50),
    gutter: -0
  });
})
  
  $('#thegrid').masonry();
});//end of init function

