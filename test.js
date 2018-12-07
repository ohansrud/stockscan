var t = require('./services/apiservice.js');

var task1 = t.getData('SMA', 'AAPL', 2);
var task2 = t.getData('SMA', 'AAPL', 14);

Promise.all([task1, task2]).then(function(values) {
    console.log(values);
});