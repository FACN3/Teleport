const fs = require('fs');
const path = require('path');
const handleError = require('./handleError');

// handles the rest of the public files
const handleStatic = (request, response) => {
  const filePath = path.join(__dirname, '..', '..', 'public', request.url);
  const extension = request.url.split('.')[1];
  const extensionType = {
    html: 'text/html',
    css: 'text/css',
    js: 'application/javascript',
    ico: 'image/x-icon',
  }[extension];

  fs.readFile(filePath, (error, file) => {
    if (error) {
      handleError(error, request, response);
    } else {
      response.writeHead(200, { 'Context-Type': extensionType });
      response.end(file);
    }
  });
};

module.exports = handleStatic;
