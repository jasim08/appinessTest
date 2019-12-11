//create a server with express
var express = require('express')
var app = express();
var Promise = require("bluebird");
var path = require('path');
var port = 3000;
var mysql = require('mysql');

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({extended: true})); // to support URL-encoded bodies
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'vps',
    database: 'appinessTest'
});

connection.connect();


app.get('/', function (req, res) {
    res.redirect('/register')
});

app.get('/register', function (req, res) {
    res.render('register');

});

app.post('/user/register', function (req, res) {
    console.log(req.body);
    var firstName = req.body && req.body.firstName ? req.body.firstName : null;
    var lastName = req.body && req.body.lastName ? req.body.lastName : null;
    var email = req.body && req.body.email ? req.body.email : null;
    var password = req.body && req.body.pwd ? req.body.pwd : null;
    if (firstName && email && password) {
        return new Promise(function (resolve, reject) {
            var isAdminExistQuery = 'SELECT EXISTS(SELECT * FROM  users) as result';
            ExecuteQuery(isAdminExistQuery).then(function (result) {
                if (result.status) {
                    console.log('registeruser');
                    var registerAsUserQuery = `INSERT INTO users ( firstName, lastName, email, password, userRoleId) VALUES ("${firstName}", "${lastName}","${email}","${password}", 2 ) `;
                    updateQuery(registerAsUserQuery).then(function (result) {
                        console.log(result);
                    })
                } else {
                    console.log('registerAdmin');
                    var registerAsAdminQuery = `INSERT INTO users ( firstName, lastName, email, password, userRoleId) VALUES ("${firstName}", "${lastName}","${email}","${password}", 1) `;
                    updateQuery(registerAsAdminQuery).then(function (result) {
                        console.log(result);
                    })

                }
            });

        });
    } else {
        console.log('parameter missing');
    }


});

function ExecuteQuery(query) {
    var responseObj = {
        status: false,
        data: ''
    };
    return new Promise(function (resolve, reject) {
        connection.query(query, function (error, results, fields) {
            if (error) throw error;
            console.log(results);
            if (results[0].result) {
                responseObj.status = true;
                responseObj.data = results[0].result;
            } else {
                responseObj.data = 'query result none';
            }
            resolve(responseObj);
        });
    });
}

function updateQuery(query) {
    var responseObj = {
        status: false,
        data: ''
    }
    return new Promise(function (resolve, reject) {
        connection.query(query, function (error, results, fields) {
            if (error) throw error;
            console.log(results);
            if (results) {
                responseObj.status = true;
                responseObj.data = results;
            } else {
                responseObj.data = 'query result none';
            }
            resolve(responseObj);
        });
    });
}

app.listen(port, function () {
    console.log("Example app listening on port " + port);
});