// handles the Errors
const handleError = (error, request, response) => {
  response.writeHead(404, { 'Content-Type': 'text/html' });
  response.end('<h1>404 PAGE NOT FOUND </h1>');
};

module.exports = handleError;
