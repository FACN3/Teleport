const fs = require("fs");
const path = require("path");


//handles the home route - /

function handleHome(request, response) {
  let filePath =path.join(__dirname,'..','public','index.html')  ;
  // handler.staticFiles (request, response, file);
  fs.readFile(filePath, (error, file) => {
    if(error) {
      handleError(error, request, response);
    }
    response.writeHead(200, {"Context-Type" : 'text/html'});
    response.end(file);
  });
}

//handles the rest of the public files

function handleStatic(request, response) {

  let filePath = path.join(__dirname, '..', 'public', request.url);
  const extension = request.url.split(".")[1];
  const extensionType = {
    html : "text/html",
    css : "text/css",
    js : "application/javascript"
  }[extension];

  fs.readFile(filePath, (error, file) => {
    if(error) {
      handleError(error, request, response);
    }
    response.writeHead(200, {"Context-Type" : extensionType});
    response.end(file);
  });
};

//send an API request to other server

function handleRequest(request , response){

}

//handles the Errors
function handleError(error, request, response) {
  response.writeHead(404, {"Content-Type" : "text/html"});
  response.end("<h1>404 PAGE NOT FOUND </h1>");
};





module.exports = {
  handleHome,
  handleStatic,
  handleRequest,
  handleError
};
