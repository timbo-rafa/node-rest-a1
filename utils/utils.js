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

module.exports.requestLogger = function requestLogger(request, response, next) {
  console.log(getTime(), 'REQUEST', 
    request.method, request.url, request.params)
  next()
}

module.exports.getTime = getTime