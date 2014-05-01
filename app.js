// Serve Static Files
var express = require('express');
var app = express();
var oneDay = 86400000;
app.use(express.static(__dirname + '/public_files', { maxAge: oneDay}));
app.listen(process.env.PORT || 1313);

// Primus
'use strict';
var Primus = require('primus')
    , http = require('http')
var server = http.createServer(function (request, response) {
    response.writeHead(200, {"Content-Type": "text/html"});
    response.end("Primus!?!?!?");
}), primus = new Primus(server,{});

primus.save(__dirname + '/public_files/js/primus.js');

primus.on('connection', function (spark) {
    spark.on('data', function message(data) {
        console.log(data);
    });
    console.log(spark.address);
});

primus.on('disconnection', function(spark) {
    console.log("Disconnect: " + spark.address);
});

server.listen(1310);
