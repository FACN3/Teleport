const handleHome = require('./handlers/handleHome');
const handleStatic = require('./handlers/handleStatic');
const handleRequest = require('./handlers/handleRequests');

const router = (request, response) => {
  let baseUrl = request.url;
  if (baseUrl === '/') {
    handleHome(request, response);
  } else if (baseUrl.split('?')[0] === '/submit') {
    handleRequest(request, response);
  } else {
    handleStatic(request, response);
  }
};

module.exports = router;
