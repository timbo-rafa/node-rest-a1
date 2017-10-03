const constants = require('./const')

var getTime = function getTime() {
    var date = new Date();
    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;
    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;
    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;
    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return "[" + year + constants.DATE_SEPARATOR + month + constants.DATE_SEPARATOR + day
      + " " + hour + constants.HOUR_SEPARATOR + min + constants.HOUR_SEPARATOR + sec + "]";
}

var requestCount = {}
module.exports.requestLogger = function requestLogger(request, response, next) {
  //console.log(getTime(), 'REQUEST',  request.method, request.url, request.params)
  
  //initialize counter of url if it does not exist
  if (!requestCount[request.url]) {
    requestCount[request.url] = {}
  }
  //initialize counter of method if it does not exist
  if (!requestCount[request.url][request.method]) {
    requestCount[request.url][request.method] = 0
  }

    //increment counter for url and method
    requestCount[request.url][request.method] += 1

    console.log('======== REQUEST COUNT =========')
    //list requested url and method counter
    //console.log(requestCount[request.url][request.method] + " " + request.method.toString() + "(s) at", request.url)
    // list all available counters
    Object.keys(requestCount).forEach( function listUrl (url) {
      Object.keys(requestCount[url]).forEach( function listMethod (method) {
        console.log(requestCount[url][method] + " " + method + "(s) at", url)
      } )
    })
    console.log('================================')
  next()
}

module.exports.getTime = getTime