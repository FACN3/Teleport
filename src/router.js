const {html, staticFiles, handleError} = require("./handler.js");

const routes = {
  "/" : html,
  "/style.css" : staticFiles,
  "/main.js" : staticFiles,
  "404" : handleError
}


function router (request, response) {
  if(routes[request.url]) {
    routes[request.url](request, response, request.url);
  }
  else {
    routes[404]("404, page not found", request, response);
  }
}


module.exports = router;
