const fs = require("fs");
const path = require("path");

const handlers = {};

handler.html = (request, response) => {
  handler.staticFiles (request, response, "/index.html");
};

handler.staticFiles = (request, response, url) => {
  const extension = url.split(".")[1];
  const extensionType = {
    html : "text/html",
    css : "text/css",
    js : "javascript/application"
  }[extension];

  fs.readFile(__dirname + "../public/" + url, (error, file) => {
    if(error) {
      handleError(error, request, response);
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





module.exports = handlers;
