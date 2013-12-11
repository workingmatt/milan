//Functions:
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

//function showImage(src, width, height, alt) {
//    var img = document.createElement("img");
//    img.src = src;
//    img.width = width;
//    img.height = height;
//    img.alt = alt;

    // This next line will just add it to the <body> tag
//    document.body.appendChild(img);
//}


//init function fired once page loaded
//hide chat controls 2 button listeners
$(function() {
  $("#chatControls").hide();
  $("#pseudoSet").click(function(e) {setPseudo();});
  $("#submit").click(function() {sentMessage();});
//  $.fn.showImage = function() {showImage('http://google.com/images/logo.gif', 276, 110, 'google logo alt');});

});
