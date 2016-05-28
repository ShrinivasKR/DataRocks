var sql = require('mssql');

var config = require('./config.js');

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
