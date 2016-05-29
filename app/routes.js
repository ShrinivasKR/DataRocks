// app/routes.js

// grab the nerd model we just created


module.exports = function (app) {

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes


    // route to handle creating goes here (app.post)
    // route to handle delete goes here (app.delete)

    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function (req, res) {
        res.sendFile('www/index.html', { root: __dirname + '/..'}); // load our public/index.html file
    });

};