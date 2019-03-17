var express = require('express')
var bodyParser = require('body-parser');
var port = 3000

var app = express()

var state = {
  name: "guy",
  job: "programmer"
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'))

app.get('/', function (req, res) {
  res.sendFile('public/index.html');
});

app.get('/careers', function (req, res) {
  res.sendFile(__dirname + '/public/careers.html');
});

app.get('/data', function (req, res) {
  res.json(state);
});

app.post('/add', function (req, res) {
  state.name = req.body.name;
  state.job = req.body.job;
  console.log(req.body);
  res.send('OK');
});

app.get('/query', function (req, res) {
  console.log(req.query);
  res.json();
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
