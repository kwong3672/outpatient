const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config()
const yelp = require('yelp-fusion');

const apiKey = process.env.YELP_API_KEY;
const client = yelp.client(apiKey);

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res){
  const searchRequest = {
  term:'Physical Therapist',
  location: req.query.location,
  limit: 50
};
  client.search(searchRequest).then(response => {
    res.send(response.jsonBody)
  }).catch(e => {
    console.log(e);
  });
});

app.all('*', function(req, res) {
  res.redirect('/');
});


app.listen(port, function() {
  console.log('NodeJS started at' + Date() + 'on port: ', port);
});
