// modules =================================================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// config files
var config = require('./config/db.js');

// set our port
var port = process.env.PORT || 8080;

// set our port
var port = process.env.PORT || 8080;

// connect to our mssql database 
var sql = require('mssql');

// get all data/stuff of the body (POST) parameters
// parse application/json 
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/www'));

// routes ==================================================
require('./app/serverRoutes')(app); // configure our routes

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);

// shoutout to the user                     
console.log('Magic happens on port ' + port);

// expose app           
exports = module.exports = app;

function query() {
    var dbConn = new sql.Connection(config);
    dbConn.connect().then(function () {
        var request = new sql.Request(dbConn);
        request.query("select * from Inventory").then(function (recordSet) {
            console.log(recordSet);
            dbConn.close();
        }).catch(function (err) {
            console.log(err);
            dbConn.close();
        });
    }).catch(function (err) {
        console.log(err);
    });
}

function executeStoredProc() {
    var dbConn = new sql.Connection(config);
    dbConn.connect().then(function () {

        var request = new sql.Request(dbConn);
        request.input('NumRows', sql.Int, 1)
            .execute("uspPopulateIncidents").then(function (recordSet) {
                console.log(recordSet);
                dbConn.close();
            }).catch(function (err) {
                console.log(err);
                dbConn.close();
            });
    }).catch(function (err) {
        console.log(err);
    });
}

function insertRow() {
    var dbConn = new sql.Connection(config);
    dbConn.connect().then(function () {
        var transaction = new sql.Transaction(dbConn);
        transaction.begin().then(function () {
            var request = new sql.Request(transaction);
            request.query("Insert into EmployeeInfo (EmpName,Salary,DeptName,Designation) values ('T.M. Sabnis',13000,'Accounts','Lead')")
                .then(function () {
                    transaction.commit().then(function (recordSet) {
                        console.log(recordSet);
                        dbConn.close();
                    }).catch(function (err) {
                        console.log("Error in Transaction Commit " + err);
                        dbConn.close();
                    });
                }).catch(function (err) {
                    console.log("Error in Transaction Begin " + err);
                    dbConn.close();
                });

        }).catch(function (err) {
            console.log(err);
            dbConn.close();
        });
    }).catch(function (err) {
        console.log(err);
    });
}


query();
// executeStoredProc();
// insertRow();
