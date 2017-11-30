const fs = require('fs');
const path = require('path');
const handleError = require('./handleError');

const handleHome = (request, response) => {
  const filePath = path.join(__dirname, '..', '..', 'public', 'index.html');
  fs.readFile(filePath, (error, file) => {
    if (error) {
      handleError(error, request, response);
    } else {
      response.writeHead(200, { 'Context-Type': 'text/html' });
      response.end(file);
    }
  });
};

module.exports = handleHome;
