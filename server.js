var express = require('express'); 
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var jade = require('jade');
var clients = [];

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set("view options", {layout: false});
app.configure(function() {
    app.use(express.static(__dirname + '/public')); //allows static content in public i.e. images
});

app.get('/', function(req, res){
    res.render('home.jade');
});
app.get('/sausage', function(req, res){
  res.render('sausage.jade');
});
server.listen(3000);

//https://github.com/visionmedia/express/wiki/Migrating-from-2.x-to-3.x
//http.createServer(app).listen(3000);

io.sockets.on('connection', function (socket) {

  clients.push(socket);

  //communicate with one client by using socket instead of sockets
  socket.on('setPseudo', function(data) {
    socket.set('pseudo', data);
    console.log("setPseudo: "+data);
  });

  socket.on('message', function (message) {
   socket.get('pseudo', function (error, name) {
      var data = { 'message' : message, pseudo : name };
      socket.broadcast.emit('message', data);
      console.log("user " + name + " send this : " + message);
   })
  });

  socket.on('disconnect', function() {
    console.log("closing socket: " + socket.id);
    for(var i=0; i<clients.length; i++){
      console.log("clients["+i+"]: " + clients[i].id);
    }
    for(var i=0; i<clients.length; i++){
      if(clients[i] == socket) {
        clients.splice(i,1);
        break;
      }
    }
    for(var i=0; i<clients.length; i++){
      console.log("new clients["+i+"]: " + clients[i].id);
    }
  });//end disconnect event

});//end of io.sockets

