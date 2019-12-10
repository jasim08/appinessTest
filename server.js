//create a server with express
var express = require('express')
var app = express();
var path = require('path');
var port = 3000;



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res){
    res.redirect('/register')
});

app.get('/register', function(req, res){
    res.render('register', { title: 'Express' });
    res.send('/register redirected')
});

app.listen(port, function(){
    console.log("Example app listening on port "+port);
});