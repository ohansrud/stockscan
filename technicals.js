const SMA = require('technicalindicators').SMA;

const request = require('request');
const fs = require('fs');
const sleep = require('system-sleep');
const moment = require('moment')

const yesterday = moment().add(-2, 'days').format('YYYY-MM-DD');
const today = moment().add(-1, 'days').format('YYYY-MM-DD');
const api_key = 'FVEQMUDKFGIXTK0D'
const ticker = 'IOX.OL';

let url = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + ticker + '&outputsize=full&apikey='+ api_key;

const hasHeadAndShoulder = require('technicalindicators').hasHeadAndShoulder;

const isTrendingUp = require('technicalindicators').isTrendingUp;
const isTrendingDown = require('technicalindicators').isTrendingDown;
const hasDoubleBottom = require('technicalindicators').hasDoubleBottom;
const hasDoubleTop = require('technicalindicators').hasDoubleTop;
 
        // static predictPattern = predictPattern;
        // static hasDoubleBottom = hasDoubleBottom;
        // static hasDoubleTop = hasDoubleTop;
        // static hasHeadAndShoulder = hasHeadAndShoulder;
        // static hasInverseHeadAndShoulder = hasInverseHeadAndShoulder;
        // static isTrendingUp = isTrendingUp;
        // static isTrendingDown = isTrendingDown;

request(url, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    let data = JSON.parse(body)
    let d = data["Time Series (Daily)"];

    if (!d) {
      console.log(ticker + ' Error');
      console.log(body);
    } else {
        let output = parse(d);
        let o = output.slice(0, 250);
        let g = hasDoubleBottom({values : o}).then((result) => {
            console.log('Dobbel topp: '+result);
        })

        let g2 = isTrendingDown({values : output}).then((result) => {
            console.log('Trending down:' + result);
        })
        
        isTrendingUp({values : output}).then((result) => {
            console.log('Trending up:' + result);
        })

        let h = g;

    //   let macd_today = d[Object.keys(d)[0]];
    //   let close = macd_today[Object.keys(macd_today)[3]]
    }
  } else {
    console.log(ticker + ' Error');
  }
});

function parse(values) {
    let result = [];
    Object.keys(values).forEach(element => {
        let h = element

        let macd_today = values[element];
        let close = macd_today[Object.keys(macd_today)[3]]
        closeInt = parseInt(close);
        result.push(closeInt);
    });

    return result;
}


