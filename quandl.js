const request = require('request');
const Quandl = require('quandl');
const api_key = '-1rKcuzwzzCgzCgM6aTC'

let quandl = new Quandl({
    auth_token: api_key,
    api_version: 3
});

// let url = "https://www.quandl.com/api/v3/datasets/FRED/GDP.csv?collapse=annual&rows=6&order=asc&column_index=1&api_key="+api_key;

let url = 'https://www.quandl.com/api/v3/datasets/YAHOO/OL_TEL/data.json?api_key='+api_key;
request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {

// quandl.dataset({ source: "BITCOIN", table: "MTGOXUSD" }, function (err, response) {
//     if (err)
//         throw err;

        console.log(response);
    }

});