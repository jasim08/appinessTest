//create a server with express
var express = require('express')
var app = express();
var path = require('path');
var port = 3000;
var mysql      = require('mysql');

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));





app.get('/', function(req, res){
    res.redirect('/register')
});

app.get('/register', function(req, res){
    res.render('register');

});

app.post('/user/register', function(req, res){
    console.log(req.body);
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'VpsPwd@08',
        database : 'authentication'
    });
    connection.connect();
    connection.query('SELECT * from userRole', function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results[0].userRoleId);
    });

    connection.end();

});

app.listen(port, function(){
    console.log("Example app listening on port "+port);
});