var express = require('express');
var app = express();

var oneDay = 86400000;
app.use(express.static(__dirname + '/public_files', { maxAge: oneDay}));
app.listen(process.env.PORT || 1313);
