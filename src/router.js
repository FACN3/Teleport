const {handleHome, handleStatic,handleRequest, handleError} = require("./handler.js");

function router (request, response) {
  let baseUrl = request.url;
  if (baseUrl === "/") {
    // console.log(baseUrl);
    handleHome(request, response);

  } else if (baseUrl.split('?')[0] === '/submit') {
    // console.log(baseUrl);
    handleRequest(request,response);

  } else {
    // console.log(baseUrl);
    handleStatic(request, response);
  }
}

module.exports = router;
