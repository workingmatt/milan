var socket = io.connect();

//function for button on sausage page
function sausageSqueeze(num){
	console.log("sausageSqueeze"+num+" pressed");
	$('#sausage').append(".");
	socket.emit('message', num);
}

//beginning of init function
$(function(){

$('#sausageBtnA').click(function(){sausageSqueeze(0);});
$('#sausageBtnB').click(function(){sausageSqueeze(100);});

$('#sausageBtn1').click(function(){sausageSqueeze(1);});
$('#sausageBtn2').click(function(){sausageSqueeze(2);});
$('#sausageBtn3').click(function(){sausageSqueeze(3);});
$('#sausageBtn4').click(function(){sausageSqueeze(4);});
$('#sausageBtn5').click(function(){sausageSqueeze(5);});
$('#sausageBtn6').click(function(){sausageSqueeze(6);});
$('#sausageBtn7').click(function(){sausageSqueeze(7);});
$('#sausageBtn8').click(function(){sausageSqueeze(8);});
$('#sausageBtn9').click(function(){sausageSqueeze(9);});
$('#sausageBtn10').click(function(){sausageSqueeze(10);});
}); //end of init function