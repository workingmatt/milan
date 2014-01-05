var socket = io.connect();

//function for button on sausage page
function sausageSqueeze(){
	console.log("sausageSqueeze pressed");
	$('#sausage').append("Matt's Message about poo");
	socket.emit('message', "socketSausageMessage");
}

//beginning of init function
$(function(){

$('#sausageBtn').click(function(){sausageSqueeze();});

}); //end of init function