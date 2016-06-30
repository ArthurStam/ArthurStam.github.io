var express = require('express');
var app = express();

app.use('/', express.static(__dirname));

app.get('/', function (req, res) {
	res.sendFile('index.html');
});

app.listen(8001, function (e) {
	if (e) return;
	console.log('Success start on port ' + 8001);
});