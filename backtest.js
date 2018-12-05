require('./globals.js');
var fs = require('fs');

function run() {

    console.log('Starting...');

    //ATR
    var ATRcontents = fs.readFileSync("./samples/TEL.OL/ATR.json");
    var ATRvalues = JSON.parse(ATRcontents)["Technical Analysis: ATR"];
    
    //RSI2
    var RSI8contents = fs.readFileSync("./samples/TEL.OL/RSI.json");
    var RSI8values = JSON.parse(RSI8contents)["Technical Analysis: RSI"];

    // RSI14
    var RSI14contents = fs.readFileSync("./samples/TEL.OL/RSI14.json");
    var RSI14values = JSON.parse(RSI14contents)["Technical Analysis: RSI"];
    
    //SMA200
    var SMA200contents = fs.readFileSync("./samples/TEL.OL/SMA200.json");
    var SMA200values = JSON.parse(SMA200contents)["Technical Analysis: SMA"];

    //MACD
    var MACDcontents = fs.readFileSync("./samples/TEL.OL/MACD.json");
    var MACDvalues = JSON.parse(MACDcontents)["Technical Analysis: MACD"];
    
    //SMA5
    var SMA5contents = fs.readFileSync("./samples/TEL.OL/SMA5.json");
    var SMA5values = JSON.parse(SMA200contents)["Technical Analysis: SMA"];
    
    //PRICE
    var PRICEcontents = fs.readFileSync("./samples/TEL.OL/PRICE.json");
    var PRICEvalues = JSON.parse(PRICEcontents)["Time Series (Daily)"];


    let rsi_yesterday = 0;
    let macd_yesterday = 0;

    var index = Object.keys(PRICEvalues).length - 1;

    var bought = false;
    var position_price = 0;
    var profit = 0;
    var wins = 0;
    var losses = 0;
    var price_today = 0;

    var stoploss = 0;
    var takewin = 0;
    var trades = 0;
    var hold_days = 0;
    var total_hold_days = 0;
    
    // for (let index = t; index == 0; index--) 
    while(index > 0){
        var date = Object.keys(PRICEvalues)[index];
        // console.log(index);
        // console.log(date);

        // let rsi_today = RSI8values[Object.keys(RSI8values)[index]];

        // var macd_today = MACDvalues[date];
        var price_today, rsi_today, sma200_today, atr_today;

        try{
            rsi_today = parseInt(RSI8values[date]["RSI"]);
            sma200_today = parseInt(SMA200values[date]["SMA"]);
            atr_today = parseInt(ATRvalues[date]["ATR"]);
            price_today = parseInt(PRICEvalues[date]["4. close"]);
        }catch(ex){
            // console.log("No values")
            index--;
            continue;
        }
        
        if(price_today == 0 || rsi_today == 0 || sma200_today == 0 || atr_today == 0){
            // console.log("No values")            
            index--;
            continue;
        }

        if(bought == true){
            if(price_today > takewin || price_today < stoploss){

                bought = false;
                prof = price_today - position_price;
                if(prof > 0){
                    wins++;
                } else {
                    losses++;
                }
                profit = profit + prof;
                position_price = 0;
                console.log('RSI: ' + rsi_today);
                console.log('Sold: ' + price_today  + ' at: ' + date);
                console.log('Profit: ' + prof);
                console.log('Hold Days: ' + hold_days);
                console.log('--------------------------');       
            } else {
                hold_days++;
                total_hold_days++;
                // stoploss = price_today - (atr_today);
                // takewin = price_today + (2*atr_today);
            }
        } else {
            if(price_today > sma200_today){
                //RSI bikker over 20
                if(rsi_today> 30 && rsi_yesterday < 30){
                    // if(macd_today["MACD_Hist"] > 0 && macd_yesterday["MACD_Hist"] < 0){
                        console.log('RSI: ' + rsi_today);
                        console.log('Bought: ' + price_today + ' at: ' + date);
                        position_price = price_today;
                        bought = true;
                        hold_days = 0;
                        var atr = atr_today;
                        if(atr == 0){
                            atr = price_today/10;
                        }
                        stoploss = price_today - (atr);
                        takewin = price_today + (atr);
                        trades++;
                        console.log("Stoploss: " + stoploss);
                        console.log("Takewin: " + takewin);
                    // }
                }
            }
        }
        
        rsi_yesterday = rsi_today;
        // macd_yesterday = macd_today;
        index--;
    }

    if(bought){
        prof = parseInt(price_today) - position_price;
        profit = profit + prof;
    }
    console.log('Trades: ' + trades);
    console.log('Profit: ' + profit);
    console.log('Wins: ' + wins);
    console.log('Losses: ' + losses);
    console.log('Avg. Hold Days: ' + total_hold_days/trades);
};

run();
