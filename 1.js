const fetch = require('node-fetch');
const fs = require('fs');
const sleep = require('system-sleep');
const moment = require('moment');
const api_key = 'FVEQMUDKFGIXTK0D';

const isClosePriceAboveSMA200 = async function(ticker){
// async function isClosePriceAboveSMA200 (ticker) {

    let url = 'https://www.alphavantage.co/query?function=SMA&symbol=' + ticker + '&interval=daily&time_period=200&series_type=close&apikey=' + api_key;
    let url2 = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=' + ticker + '&apikey=demo' + api_key;
    console.log(ticker);

    try {
        const response = await fetch(url);
        const json = await response.json();

        var yesterday = moment().add(-1, 'days').format("YYYY-MM-DD");

        var sma200yesterday = json['Technical Analysis: SMA'][yesterday].SMA;

        const response2 = await fetch(url2);
        const json2 = await response2.json();

        var closeprice = json2['Global Quote']["08. previous close"];

        if(closeprice > sma200yesterday){
            return true;
        }
        return false;
    } catch (err) {
        console.log(err);
    }  
}

let g = isClosePriceAboveSMA200('VEI.OL');

g.then((res)=> {
    console.log(res);
});
