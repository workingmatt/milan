var express = require('express');
var app = module.exports = express();

app.set('views'. __dirname);
app.set('view engine', 'jade');
app.configure(function() {
    app.use(express.static(__dirname + '../public')); //allows static content in public i.e. images
});

app.get('/sausage', function(req, res){
  res.render('sausage');
});
