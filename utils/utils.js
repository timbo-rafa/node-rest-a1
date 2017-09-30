const constants = require('./const')
const mung = require('express-mung')

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
    request.method, request.url)
  next()
}

module.exports.mungjson = mung.json(
  function transform(body, req, res) {
    if (body instanceof Array) {
      console.log(getTime(),'ARRAY RESPONSE', res.statusCode, body.length)
    } else console.log(getTime(), 'RESPONSE', res.statusCode, body)
    return body
  }
)

module.exports.getTime = getTime