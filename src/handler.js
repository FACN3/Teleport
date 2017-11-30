const fs = require('fs');
const path = require('path');
const req = require('request');

// object that holds the data recieved
const dataObj = {
  clock: '',
  weather: '',
};

// filters the data recieved by both apis
function filterData(body, num) {
  // const parsedBody = JSON.parse(body);

  if (num === 0) {
    dataObj.clock = body;
  }
  if (num === 1) {
    dataObj.weather = body;
  }
}

// handles the Errors
function handleError(error, request, response) {
  response.writeHead(404, { 'Content-Type': 'text/html' });
  response.end('<h1>404 PAGE NOT FOUND </h1>');
}

// handles the home route - /
function handleHome(request, response) {
  const filePath = path.join(__dirname, '..', 'public', 'index.html');
  // handler.staticFiles (request, response, file);
  fs.readFile(filePath, (error, file) => {
    if (error) {
      handleError(error, request, response);
    } else {
      response.writeHead(200, { 'Context-Type': 'text/html' });
      response.end(file);
    }
  });
}

// handles the rest of the public files
function handleStatic(request, response) {
  const filePath = path.join(__dirname, '..', 'public', request.url);
  const extension = request.url.split('.')[1];
  const extensionType = {
    html: 'text/html',
    css: 'text/css',
    js: 'application/javascript',
  }[extension];

  fs.readFile(filePath, (error, file) => {
    if (error) {
      handleError(error, request, response);
    } else {
      response.writeHead(200, { 'Context-Type': extensionType });
      response.end(file);
    }
  });
}

// send an API request to other server
function handleRequest(request, response) {
  const query = request.url.split('=')[1];
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${
    query
  }&appid=82e45ca76afa605e31bf2540d2afe634`;

  req(weatherUrl, (error, res, body) => {
    if (error) {
      handleError(error, request, response);
    } else {
      filterData(body, 1);

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
          filterData(timeBody, 0);
          response.writeHead(200, { 'Content-Type': 'application/json' });
          response.end(JSON.stringify(dataObj));
        }
      });
    }
  });
}

module.exports = {
  handleHome,
  handleStatic,
  handleRequest,
  handleError,
};
