const {handleHome, handleStatic,handleRequest, handleError} = require("./handler.js");

// const routes = {
//   "/" : home,
//   "/style.css" : staticFiles,
//   "/main.js" : staticFiles,
//   "404" : handleError,
//   ""
// }


function router (request, response) {
  let baseUrl = request.url;
  if (baseUrl==="/") {
    handleHome(request, response);

  } else if(baseUrl.pathname==='/submit'){
    handleRequest(request,response);
  } else {
    handleStatic(request, response);
  }
}


module.exports = router;
