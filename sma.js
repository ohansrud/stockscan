const fetch = require('node-fetch');
const fs = require('fs');
const sleep = require('system-sleep');
const moment = require('moment');
const api_key = 'FVEQMUDKFGIXTK0D';

const isClosePriceAboveSMA200 = async function(ticker){
// async function isClosePriceAboveSMA200 (ticker) {

    let url = 'https://www.alphavantage.co/query?function=SMA&symbol=' + ticker + '&interval=daily&time_period=200&series_type=close&apikey=' + api_key;
    let url2 = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=' + ticker + '&apikey=demo' + api_key;

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

async function getATR (ticker) {
    let url = 'https://www.alphavantage.co/query?function=ATR&symbol=' + ticker + '&interval=daily&time_period=14&series_type=close&apikey=' + api_key;
    try {
        const response = await fetch(url);
        const json = await response.json();

        var yesterday = moment().add(-1, 'days').format("YYYY-MM-DD");

        var atr_yesterday = json['Technical Analysis: ATR'][yesterday].ATR;

        return atr_yesterday;

    }catch(err){
        console.log(err)
    }

}

async function run () {
    // let ticker = 'VEI.OL';
    let tickers = fs.readFileSync('tickers.txt').toString().replace(/\r/g, "").split("\n");

    tickers.forEach(ticker => {
        try {
            let isClosePriceAboveSMA200 = await isClosePriceAboveSMA200(ticker);
            if(isClosePriceAboveSMA200) {
                let url = 'https://www.alphavantage.co/query?function=RSI&symbol=' + ticker + '&interval=daily&time_period=2&series_type=close&apikey=' + api_key;
                const response = await fetch(url);
                const json = await response.json();

                var yesterday = moment().add(-1, 'days').format("YYYY-MM-DD");
                var daybeforeyesterday = moment().add(-2, 'days').format("YYYY-MM-DD");

                var rsi_yesterday = json['Technical Analysis: RSI'][yesterday].RSI;
                var rsi_daybeforeyesterday = json['Technical Analysis: RSI'][daybeforeyesterday].RSI;

                if (rsi_daybeforeyesterday < 90 && rsi_yesterday > 90) {
                    writeToFile(ticker + ': RSI2 Crossed over 90 today!')
                }
                sleep(30000);

            }else {
                sleep(15000);
            }
        } catch(err){
            sleep(15000);
        }
    });
}

function writeToFile(input) {
    fs.appendFile("tmp/result", input + '\n', function (err) {
      if (err) {
        return console.log(err);
      };
    });
  };

await run().then(() => {
    console.log("Completed");
})