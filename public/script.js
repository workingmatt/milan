//  Functions:
//  **Chat
//        addMessage: a helper functions used by other scripts in this file
//        sentMessage: send a message
//        setPseudo: set user's pseudonym, send it to the server, show chat controls, hide pseudo bits
//        listen to socket for message event (incoming messages from other clients
//
//  **Media Functions
//        showImage(imgSrc, #divName)
//        playSound(sound source)
// init function


var socket = io.connect();

// **Chat functions
function addMessage(msg, pseudo) {
  $("#chatEntries").append('<div class="message"><p>' + pseudo + ' : ' + msg + '</p></div>');
}

function sentMessage() {
  if ($('#messageInput').val() != "") {
    socket.emit('message', $('#messageInput').val());
    addMessage($('#messageInput').val(), "Me", new Date().toISOString(), true);
    $('#messageInput').val('');
  }
}

function setPseudo() {
  if ($("pseudoInput").val() != "") {
    socket.emit('setPseudo', $("#pseudoInput").val());
    $('#chatControls').show();
    $('#pseudoInput').hide();
    $('#pseudoSet').hide();
    console.log("script.js pseudo is: " + $("#pseudoInput").val());
  }
}

//Like the server side receive incoming messages
socket.on('message', function(data) {
  addMessage(data['message'], data['pseudo']);
});


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

function playSound(sndSrc) {
  console.log("playSound: " + sndSrc);
}

//init function fired once page loaded
//hide chat controls 2 button listeners
$(function() {
  var $thegrid = $("#thegrid");
  $("#chatControls").hide();
  $("#pseudoControls").hide();
  //$("#pseudoSet").click(function(e) {setPseudo();});
  //$("#submit").click(function() {sentMessage();});
  //$("#audio").click(function() {playSound('sounds/foghorn.wav');});
  //$("#audio").click(function() {showImage('images/jum.png', '#imageDisplay')});
  //$("#imageDisplay").ready(function() {showImage('images/beardygrin.jpg', '#imageDisplay')});
  //$("#thegrid").ready(function() {showImage('images/beardygrin.jpg', "#thegrid")});
  //$("thegrid").gridalicious('append', boxes)
  
  
  //** The Grid
 imagesLoaded('#thegrid', function() {
  console.log("Got to images Loades");
    $('#thegrid').masonry({
      itemSelector: 'item',
      columnWidth: 126,
      gutter: 1
    });
    console.log("grid options done");
 })
  
  $('#thegrid').masonry();
  //var msnry = new Masonry( $('#thegrid'), {
  //  itemSelector: 'item',
  //  columnWidth: 70
  //});
  //var msnry = new Masonry('#thegrid');

  //var thegrid = document.querySelector('#thegrid');
  //var msnry = new Masonry( thegrid, {
  //  columnWidth: 600,
  //  itemSelector: '.item'
  //});
  
    //$thegrid.loaded(function() {
  //  $thegrid.masonry({
  //    itemSelector: '.masonryImage',
  //    columnWidth: 100
  //  });
  //});

  //var msnry = $thegrid.data('masonry');
  //console.log("msnry: "+ msnry);
  
   //.append(('<img id="theImg2" src="images/2.png"/>'))
   //.addItems(('<img id="theImg3" src="images/3.png"/>'));
});

