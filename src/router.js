const {home, staticFiles,handleRequest, handleError} = require("./handler.js");

// const routes = {
//   "/" : home,
//   "/style.css" : staticFiles,
//   "/main.js" : staticFiles,
//   "404" : handleError,
//   ""
// }


function router (request, response) {
  let baseUrl = request.url;
  if(baseUrl==="/") {
    home(request, response);
  }else if(url.pathname==='/submit'){
    handleRequest(request,response);
  }

  else{
    staticFiles(request, response);
  }
}


module.exports = router;
