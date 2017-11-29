const fs = require('fs');
const path = require('path');
const req = require('request');

//handles the home route - /

function handleHome(request, response) {
  let filePath =path.join(__dirname,'..','public','index.html')  ;
  // handler.staticFiles (request, response, file);
  fs.readFile(filePath, (error, file) => {
    if(error) {
      handleError(error, request, response);
    } else {
    response.writeHead(200, {"Context-Type" : 'text/html'});
    response.end(file);
    }
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
    }else{
      response.writeHead(200, {"Context-Type" : extensionType});
      response.end(file);
    }
  });
};

//send an API request to other server

function handleRequest(request , response){

  let query = request.url.split('=')[1];
  console.log(query);
  let time_url = "https://api.xmltime.com/timeservice?accesskey=RZCuYAuoC3&expires=2017-11-29T10%3A55%3A01%2B00%3A00&signature=6w7yR8inwcK6e%2Fqur0fb5fKug5Y%3D&version=2&out=js&prettyprint=1&query=" + query + "&geo=1&lang=en&time=1&sun=0&timechanges=0&tz=1&verbosetime=1"
  console.log(time_url);
  let content;

  req(time_url, (error, res, body) => {
    if (error) {
      handleError(error, request, response);
    } else {
    content = JSON.parse(body);
    response.writeHead(200, {'Content-Type': 'application/json'});
    console.log(content);
    response.end(JSON.stringify(content));
    }
  });
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
