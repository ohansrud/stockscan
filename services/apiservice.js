const sleep = require('system-sleep');
const buildUrl = require('build-url');
const axios = require('axios');

const rootUrl = 'https://www.alphavantage.co';
const path = 'query';
const api_key = 'FVEQMUDKFGIXTK0D'

counter = [];

module.exports = {
    getData: async function(func, ticker, time_period){
        counter++;
        var d = new Date();
        var n = d.getMinutes();
        

        var url = buildUrl(rootUrl, {
            path: path,
            queryParams: {
                function: func,
                symbol: ticker,
                interval: 'daily',
                time_period: time_period, 
                series_type: 'close', 
                apikey: api_key
            }
        });
        return await axios.get(url);
    }
}