const rp = require('request-promise');
const $ = require('cheerio');



// let $ = cheerio.load(

let url = 'https://www.oslobors.no/markedsaktivitet/#/list/shares/quotelist/ob/all/all/false';


const scrapeIt = require("scrape-it")

// Promise interface
scrapeIt(url, {
    title: ".stock-list-development"
//   , desc: ".header h2"
//   , avatar: {
//         selector: ".header img"
//       , attr: "src"
//     }
}).then(({ data, response }) => {
    console.log(`Status Code: ${response.statusCode}`)
    console.log(data)
})


// Import the dependencies
const cheerio = require("cheerio")
    , req = require("tinyreq")
    ;

// Define the scrape function
function scrape(url, data, cb) {
    // 1. Create the request
    req(url, (err, body) => {
        if (err) { return cb(err); }

        // 2. Parse the HTML
        let $ = cheerio.load(body)
            , pageData = {}
            ;

        let g = $(".stock-list-development");

        // 3. Extract the data
        Object.keys(data).forEach(k => {
            pageData[k] = $(data[k]).text();
        });

        // Send the data in the callback
        cb(null, pageData);
    });
}

// Extract some data from my website
scrape(url, {
    // Get the website title (from the top header)
    title: ".header",
    table: ".stock-list-development"

    // ...and the description
    // , description: ".header h2"
}, (err, data) => {
    console.log(err || data);
});

// const cheerioReq = require("cheerio-req");

// cheerioReq(url, (err, $) => {
//     // let g = $('.ITEM_SECTOR');

//     console.log($(".stock-list-development").text());
//     // => Ionică Bizău
// });


// let html = $.html();

// var companiesList = [];

// // For each .item, we add all the structure of a company to the companiesList array
// // Don't try to understand what follows because we will do it differently.
// let g = $('.ITEM_SECTOR');
// g.each(function (index, element) {
//     console.log(index);
//     console.log(element);
// });

// const options = {
//     uri: 'https://www.oslobors.no/markedsaktivitet/#/list/shares/quotelist/ob/all/all/false',
//     transform: function (body) {
//         return cheerio.load(body);
//     }
// };

// rp(options)
//     .then(($) => {
//         console.log($);
//         let d = $.html()
//         let h = d('.stock-list-development').text()

//     })
//     .catch((err) => {
//         console.log(err);
//     });