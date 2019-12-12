var Promise = require("bluebird");


var queryUtils = function(connection){

this.connection = connection;
};






queryUtils.prototype.checkQuery = function(query) {

    var self = this;
    var responseObj = {
        status: false,
        data: ''
    };
    return new Promise(function (resolve, reject) {
        self.connection.query(query, function (error, results, fields) {
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
};
queryUtils.prototype.getQuery = function(query) {

    var self = this;
    var responseObj = {
        status: false,
        data: ''
    };
    return new Promise(function (resolve, reject) {
        self.connection.query(query, function (error, results, fields) {
            if (error) throw error;
            console.log(results);
            if (results) {
                responseObj.status = true;
                responseObj.data = results
            } else {
                responseObj.data = 'query result none';
            }
            resolve(responseObj);
        });
    });
};

queryUtils.prototype.updateQuery = function(query) {
    var self = this;
    var responseObj = {
        status: false,
        data: ''
    }
    return new Promise(function (resolve, reject) {
        self.connection.query(query, function (error, results, fields) {
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

module.exports = queryUtils;