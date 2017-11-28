const fs = require("fs");
const path = require("path");

const handler = {};

handler.html = (request, response) => {
  var file = 'index.html';
  handler.staticFiles (request, response, file);
};

handler.staticFiles = (request, response, url) => {

  let filePath = path.join(__dirname, '..', 'public', url);
  const extension = url.split(".")[1];
  console.log(extension);
  const extensionType = {
    html : "text/html",
    css : "text/css",
    js : "application/javascript"
  }[extension];

  fs.readFile(filePath, (error, file) => {
    if(error) {
      handler.handleError(error, request, response);
    }
    response.writeHead(200, {"Context-Type" : extensionType});
    response.end(file);
  });
};

//handler.model -> needs to be written

handler.handleError = (error, request, response) => {
  response.writeHead(404, {"Content-Type" : "text/html"});
  response.end("An error has occured", error);
};





module.exports = handler;
