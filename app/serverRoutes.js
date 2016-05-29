// app/routes.js

// grab the nerd model we just created
var config = require('../config/db.js');

// connect to our mssql database 
var sql = require('mssql');
var dbConn = new sql.Connection(config);

module.exports = function (app) {

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes


    // route to handle creating goes here (app.post)
    // route to handle delete goes here (app.delete)

    app.get('/api/motorcycles', function (req, res) {
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

    });


    function executeStoredProc() {
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


    executeStoredProc();
    // executeStoredProc();
    // insertRow();
    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function (req, res) {
        res.sendFile('www/index.html', { root: __dirname + '/..' }); // load our public/index.html file
    });

    app.get('')

};