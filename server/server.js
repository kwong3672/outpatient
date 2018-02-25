const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
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
  let result = {}
  const url = 'https://api.yelp.com/v3/businesses/search';
  const headers = { Authorization: 'Bearer ' + apiKey };
  const limit = 50;
  let params = {
    term:'Physical Therapist',
    location: req.query.location,
    limit,
    offset: 0
  };

  var createPromise = (url, params, headers) => {
    const object2 = Object.assign({}, params);
    return axios.get(url, {params: object2, headers})
  }

  // initial request of Yelp API with max 50
  axios.get(url, { params,headers})

    .then(data => {
      let promiseArray = [];
      let total = data.data.total;
      let businesses = data.data.businesses;

      result.total = total;
      result.businesses = [...businesses];


      // If total businesses > 50 get the rest 
      // Yelp API only returns businesses with a max of 1000
      if (total > businesses.length) {
        // Yelp API only allows 8 concurrent requests.  Returns 429 error if too many requests made at same time
        for (var i = limit; i < total && i < 400; i = i + limit) {
          params.offset += limit;
          const promise = createPromise(url, params, headers)
          promiseArray.push(promise)
        }
        axios.all(promiseArray)
          .then(axios.spread((...args) => {
              for (let i = 0; i < args.length; i++) {
                  result.businesses = [...result.businesses, ...args[i].data.businesses]
              }
              res.send(result);
          }))
          .catch(e => {
            console.log(e);
          });  
      } else {
        res.send(result);
      }
    })
    .catch(e => {
      console.log(e);
    });
});

app.all('*', function(req, res) {
  res.redirect('/');
});


app.listen(port, function() {
  console.log('NodeJS started at' + Date() + 'on port: ', port);
});
