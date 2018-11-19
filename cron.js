const request = require('request');
const fs = require('fs');
const sleep = require('system-sleep');
const moment = require('moment')

const yesterday = moment().add(-2, 'days').format('YYYY-MM-DD');
const today = moment().add(-1, 'days').format('YYYY-MM-DD');
const api_key = 'FVEQMUDKFGIXTK0D'

// j = requests.get('https://github.com/timeline.json')

// let url = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=AAPL&apikey=FVEQMUDKFGIXTK0D';
let tickers = ["ASC.OL", "APCL.OL", "AFG.OL", "AKA.OL", "AKER.OL", "AKSO.OL",
  "AKVA.OL", "AMSC.OL", "ABT.OL", "ARCHER.OL", "AFK.OL", "ASETEK.OL", "ATEA.OL", "AUSS.OL", "AVANCE.OL", "AVM.OL", "AWDR.OL", "BAKKA.OL", "BEL.OL",
  "BERGEN.OL", "BIOTEC.OL", "BON.OL", "BRG.OL", "BWLPG.OL", "BWO.OL", "BMA.OL", "DAT.OL",
  "DNB.OL", "DNO.OL", "DOF.OL", "EAM.OL", "EKO.OL", "EMGS.OL", "ENTRA.OL", "EVRY.OL", "FLNG.OL",
  "FOE.OL", "FRO.OL", "FUNCOM.OL", "GJF.OL", "GOGL.OL", "GOD.OL", "GSF.OL", "HNB.OL", "HFISK.OL", "HAVI.OL", "HEX.OL", "HBC.OL", "HLNG.OL", "IDEX.OL",
  "IOX.OL", "ITX.OL", "IMSK.OL", "JIN.OL", "KOA.OL", "KOG.OL", "KVAER.OL", "LSG.OL", "MHG.OL", "NAPA.OL", "NATTO.OL", "NAVA.OL", "NEL.OL", "NEXT.OL", "NMG.OL",
  "NIO.OL", "NOM.OL", "NOD.OL", "NSG.OL", "NHY.OL", "NOF.OL", "NRS.OL", "NAS.OL", "NOR.OL", "NPRO.OL", "NTS.OL", "OCY.OL", "ODL.OL", "ODF.OL", "ODFB.OL", "OLT.OL",
  "OPERA.OL", "ORK.OL", "PEN.OL", "PCIB.OL", "PGS.OL", "PDR.OL", "PHO.OL", "PLCS.OL", "POL.OL", "PRS.OL", "PROS.OL", "PROTCT.OL", "PSI.OL", "QFR.OL", "QEC.OL", "RAKP.OL",
  "REC.OL", "RECSOL.OL", "RENO.OL", "REPANT.OL", "RGT.OL", "RCL.OL", "SALM.OL", "SCI.OL", "SSHIP.OL", "SSO.OL", "SCH.OL",
  "SDRL.OL", "SBO.OL", "SENDEX.OL", "SER.OL", "SEVDR.OL", "SEVAN.OL", "SIOFF.OL", "SKI.OL", "SOFF.OL", "SOLV.OL", "SONG.OL", "SRBANK.OL", "SPU.OL", "EQNR.OL", "SNI.OL",
  "STB.OL", "STORM.OL", "SUBC.OL", "TIL.OL", "TEL.OL", "TELIO.OL", "TGS.OL", "SSC.OL", "THIN.OL", "TOM.OL", "TTS.OL", "VARDIA.OL", "VEI.OL", "VIZ.OL", "WEIFA.OL", "WRL.OL",
  "WBULK.OL", "WWASA.OL", "WWI.OL", "WWIB.OL", "XXL.OL", "YAR.OL", "ZAL.OL", "ZONC.OL"];

// let tickers = ['TEL.OL', 'ATEA.OL']
function run() {

  console.log('Starting...');

  tickers.forEach(ticker => {

    let result_column = 'Technical Analysis: MACD';
    let url = 'https://www.alphavantage.co/query?function=MACD&symbol=' + ticker + '&interval=daily&series_type=close&apikey=' + api_key;

    request(url, function (error, response, body) {
      console.log(url);

      if (!error && response.statusCode == 200) {
        let data = JSON.parse(body)
        let d = data[result_column];

        if (!d) {
          console.log(ticker + ' Error');
          console.log(body);
        } else {
          let macd_today = Object.keys(d)[0].MACD_Hist;
          let macd_yesterday = Object.keys(d)[1].MACD_Hist;
          // writeToFile(ticker);
          console.log(ticker + ' OK');

          if (macd_yesterday < 0 && macd_today > 0) {
            // console.log(ticker = ': MACD Crossed over 0 today!');
            writeToFile(ticker + ': MACD Crossed over 0 today!')
          } else if (macd_yesterday > 0 && macd_today < 0) {
            // console.log(ticker + ': MACD Crossed under 0 today!');
            writeToFile(ticker + ': MACD Crossed under 0 today!')
          } else {
            writeToFile(ticker + ': No results!')
          }
        }
      } else {
        console.log(ticker + ' Error');
      }
    });

    //Wait for 25 seconds
    sleep(25000);

  })

}

function runRSI() {

  console.log('Starting...');

  tickers.forEach(ticker => {

    let result_column = 'Technical Analysis: RSI';
    let url = 'https://www.alphavantage.co/query?function=RSI&symbol=' + ticker + '&interval=weekly&time_period=10&series_type=close&apikey=' + api_key;

    request(url, function (error, response, body) {
      console.log(url);

      if (!error && response.statusCode == 200) {
        let data = JSON.parse(body)
        let d = data[result_column];

        if (!d) {
          console.log(ticker + ' Error');
          console.log(body);
        } else {
          let rsi_today = d[Object.keys(d)[0]].RSI;
          let rsi_yesterday = d[Object.keys(d)[1]].RSI;
          // writeToFile(ticker);
          console.log(ticker + ' OK');
          console.log(rsi_today);
          console.log(rsi_yesterday);


          if (rsi_yesterday < 70 && rsi_today > 70) {
            // console.log(ticker = ': MACD Crossed over 0 today!');
            writeToFile(ticker + ': RSI Crossed over 70 today!')
          } else if (rsi_yesterday > 70 && rsi_today < 70) {
            // console.log(ticker + ': MACD Crossed under 0 today!');
            writeToFile(ticker + ': RSI Crossed under 0 today!')
          } else {
            writeToFile(ticker + ': No results!')
          }
        }
      } else {
        console.log(ticker + ' Error');
      }
    });

    //Wait for 25 seconds
    sleep(25000);

  })

}

function writeToFile(input) {
  fs.appendFile("tmp/result", input + '\n', function (err) {
    if (err) {
      return console.log(err);
    };
    // console.log("The file was saved!");
  });
};

runRSI();

