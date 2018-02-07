const req = require('request');
const handleError = require('./handleError');

// object that holds the data recieved
const dataObj = {
  clock: '',
  weather: '',
};

// send an API request to other server
const handleRequest = (request, response) => {
  const query = request.url.split('=')[1];
  if (query.indexOf('Choose') > -1) {
    response.writeHead(307, { Location: '/' });
  } else {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${
      query
    }&appid=82e45ca76afa605e31bf2540d2afe634`;

    req(weatherUrl, (error, res, body) => {
      if (error) {
        handleError(error, request, response);
      } else {
        dataObj.weather = body;

        // sending the second api
        const parsedBody = JSON.parse(body);
        const { coord: { lon, lat } } = parsedBody;
        // const long = parsedBody.coord.lon;
        const timeUrl = `http://api.timezonedb.com/v2/get-time-zone?key=UOEG6CXIM1AQ&format=json&by=position&lat=${
          lat
        }&lng=${lon}`;

        req(timeUrl, (err, result, timeBody) => {
          if (err) {
            handleError(err, request, response);
          } else {
            dataObj.clock = timeBody;
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify(dataObj));
          }
        });
      }
    });
  }
};

module.exports = handleRequest;
