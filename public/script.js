//  Functions:
// addMessage: a helper functions used by other scripts in this file
// sentMessage: send a message
// setPseudo: set user's pseudonym, send it to the server, show chat controls, hide pseudo bits
// listen to socket
// init function


var socket = io.connect();

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

//showImage pseudo code:
// call a function passing an image - done.
// get image aspect ratio (width/height)
// get window dimensions and calculate aspect ratio
// if browser is too wide, set image height to browser height and image width = height * aspect ratio
// if browser is too thin, set image width to browser width and image height = width/aspect ratio
// 
function showImage(imgSrc) {
    var img = document.createElement("img");
    browserWidth = $(window).width();
    browserHeight= $(window).height();
    //var aspectRatio = browserWidth/browserHeight;
    img.src = imgSrc;
    img.width = browserWidth;
    img.height = browserHeight;//$(window).height();//browserHeight;
    img.alt = "alt text";

    // This next line will just add it to the <body> tag
    //document.body.appendChild(img);
    //$('#imageDisplay').appendChild(img);
    //$('#imageDisplay').appendChild("img");
    //$("#imageDisplay").prepend("<img id='theImg' src='images/jum.png'/>"); 
    $("#imageDisplay").prepend(img); 
    console.log("showImg: " + img.src + " w: " + browserWidth + " h: " + browserHeight);
}

function playSound(sndSrc) {
  console.log("playSound: " + sndSrc);
}

//init function fired once page loaded
//hide chat controls 2 button listeners
$(function() {
  $("#chatControls").hide();
  $("#pseudoSet").click(function(e) {setPseudo();});
  $("#submit").click(function() {sentMessage();});
  $("#audio").click(function() {playSound('sounds/foghorn.wav');});
  $("#audio").click(function() {showImage('images/jum.png')});
  $("#imageDisplay").ready(function() {showImage('images/beardygrin.jpg')});
  //$("#imageDisplay").prepend("<img id='theImg' src='images/jum.png'/>");
  //showImage("http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2010/5/20/1274352435003/Dog-poo-2-002.jpg");
//  $("#imageDisplay")
//  $("#imageDisplay").fullscreenr({width: 1229, height: 768});
//  $.fn.showImage = function() {showImage('http://google.com/images/logo.gif', 276, 110, 'google logo alt');});

});

