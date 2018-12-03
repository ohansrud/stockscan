require('./globals.js');
var fs = require('fs');

function run() {

    console.log('Starting...');

    // RSI2
    // var RSIcontents = fs.readFileSync("./samples/TEL.OL/RSI.json");
    // var RSIvalues = JSON.parse(RSIcontents)["Technical Analysis: RSI"];

    // RSI14
    var RSI14contents = fs.readFileSync("./samples/TEL.OL/RSI14.json");
    var RSI14values = JSON.parse(RSI14contents)["Technical Analysis: RSI"];
    
    //SMA200
    var SMA200contents = fs.readFileSync("./samples/TEL.OL/SMA200.json");
    var SMA200values = JSON.parse(SMA200contents)["Technical Analysis: SMA"];

    //SMA5
    var SMA5contents = fs.readFileSync("./samples/TEL.OL/SMA5.json");
    var SMA5values = JSON.parse(SMA200contents)["Technical Analysis: SMA"];
    
    //PRICE
    var PRICEcontents = fs.readFileSync("./samples/TEL.OL/PRICE.json");
    var PRICEvalues = JSON.parse(PRICEcontents)["Time Series (Daily)"];


    let rsi_yesterday = 0;

    var index = Object.keys(RSI14values).length - 1;

    var bought = false;
    var position_price = 0;
    var profit = 0;

    // for (let index = t; index == 0; index--) 
    while(index > 0){
        let rsi_today = RSI14values[Object.keys(RSI14values)[index]].RSI;
        var date = Object.keys(RSI14values)[index];

        var sma200_today = SMA200values[date];
        var sma5_today = SMA5values[date];
        var price_today = PRICEvalues[date]["4. close"];

        if(bought){
            if(rsi_today < 70 && rsi_yesterday > 70){
                bought = false;
                prof = parseInt(price_today) - position_price;
                profit = profit + prof;
                
                position_price = 0;
                console.log('RSI: ' + rsi_today);
                console.log('Sold: ' + price_today  + ' at: ' + date);
                console.log('Profit: ' + prof);
                console.log('--------------------------');
            }
            
        } else {
            if(sma200_today != null){
                if(price_today > sma200_today["SMA"]){
                    if(rsi_today > 30 && rsi_yesterday < 30){
                        console.log('RSI: ' + rsi_today);
                        console.log('Bought: ' + price_today + ' at: ' + date);
                        position_price = price_today;
                        bought = true;
                    }
                }
            }
        }
        
        rsi_yesterday = rsi_today;
        index--;
    }
    console.log('Profit: ' + profit);
};

run();
