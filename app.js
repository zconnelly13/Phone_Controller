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

server.listen(1310);
