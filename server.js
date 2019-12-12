//create a server with express
var express = require('express')
var app = express();
var _ = require('underscore');
var Promise = require("bluebird");
var path = require('path');
var port = 3000;
var mysql = require('mysql');
var queryUtils = require('./utils/queryUtils.js');//query functions
//db connection
try{
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'VpsPwd@08',
        database: 'authentication'
    });

    connection.connect();
    console.log('################');
    console.log('Database connected sucessfully');
    console.log('################');


}catch(e){
    console.log('################');
    console.log('Database connected failed');
    console.log(e);
    console.log('################');
}



var query = new queryUtils(connection);

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({extended: true})); // to support URL-encoded bodies
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

//set routes
app.get('/', function (req, res) {
    res.redirect('/register')
});

app.get('/register', function (req, res) {
    res.render('register');

});

app.post('/user/register', function (req, res) {
    var resObj = {
        status: false,
        data: ''
    };
    console.log(req.body);
    var firstName = req.body && req.body.firstName ? req.body.firstName : null;
    var lastName = req.body && req.body.lastName ? req.body.lastName : null;
    var email = req.body && req.body.email ? req.body.email : null;
    var password = req.body && req.body.pwd ? req.body.pwd : null;
    if (firstName && email && password) {
        return new Promise(function (resolve, reject) {
            var isAdminExistQuery = 'SELECT EXISTS(SELECT * FROM  users) as result';
            query.checkQuery(isAdminExistQuery).then(function (result) {
                if (result.status) {
                    console.log('registeruser');
                    console.log(email);
                    var getUserQuery = 'SELECT email FROM users where email="' + email + '"';

                    query.getQuery(getUserQuery).then(function (result) {

                        if (_.isEmpty(result.data)) {
                            var registerAsUserQuery = `INSERT INTO users ( firstName, lastName, email, password, userRoleId) VALUES ("${firstName}", "${lastName}","${email}","${password}", 2 ) `;
                            query.updateQuery(registerAsUserQuery).then(function (result) {

                                if (result.status) {

                                    resObj['status'] = true;
                                    resObj['data']='New User Added succesfully';
                                    res.json(resObj);
                                    console.log('###########');
                                    console.log('New user Added succesfully.');
                                    console.log('##########');
                                }
                            })

                        } else {
                            resObj['status'] = false;
                            resObj['data']='Email already Used';
                            res.json(resObj);
                            console.log('##################');
                            console.log('Email already used');
                            console.log('##################');
                        }




                    })

                } else {
                    console.log('##################');
                    console.log('Admin added successfully.');
                    console.log('##################');
                    var registerAsAdminQuery = `INSERT INTO users ( firstName, lastName, email, password, userRoleId) VALUES ("${firstName}", "${lastName}","${email}","${password}", 1) `;
                    query.updateQuery(registerAsAdminQuery).then(function (result) {
                        if(result.status){
                            resObj['status'] = true;
                            resObj['data']='Admin added Successfully';
                            res.json(resObj);
                        }else{
                            resObj['status'] = false;
                            resObj['data']='Please Try again Later';
                            res.json(resObj);
                        }

                    })

                }
            });

        });
    } else {
        resObj['status'] = false;
        resObj['data']='Please fill the *mandatory fields.';
        res.json(resObj);
        console.log('##################');
        console.log('parameter missing');
        console.log('##################');
    }


});


app.listen(port, function () {
    console.log("listening on localhost:"+ port);
});