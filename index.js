var express = require('express')
var bodyParser = require('body-parser');
var port = 3000

var app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'))

app.get('/', function (req, res) {
  res.sendFile('public/index.html');
});

app.get('/query', function (req, res) {
  console.log(req.query);
  res.send('Another One');
});

app.post('/somedata', function (req, res) {
  if (req.query) {
    console.log(req.query);
  }
  if (req.body) {
    console.log(req.body);
  }
  res.send('A POST request!');
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
