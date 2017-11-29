const fs = require('fs');
const path = require('path');
const req = require('request');

//ogject that holds the data recieved
const dataObj = {
  'clock':"",
  'weather': ""
}
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
  var parallel =0;
  let query = request.url.split('=')[1];

  // console.log(query);
  let time_url = "https://api.xmltime.com/timeservice?accesskey=RZCuYAuoC3&timestamp=2017-11-29T11%3A12%3A03Z&signature=p5KPBdXxcFbK27E9Ynoyw0%2FLHJ4%3D&version=2&out=js&prettyprint=1&query=" + query + "&geo=1&lang=en&time=1&sun=0&timechanges=0&tz=1&verbosetime=1"
  let weather_url = 'https://api.openweathermap.org/data/2.5/weather?q=' + query+'&appid=82e45ca76afa605e31bf2540d2afe634';
  // console.log(time_url);
  // let content;

  req(time_url, (error, res, body) => {
      // console.log("ERROR: ",error);
    if (error) {
      console.log("error wuth the recieved data : ", error.message);
      handleError(error, request, response);
    } else {
      parallel++;
      console.log("TIME API RESPONSE:  ",body);
      filterData(body,0);
      if(parallel==2){
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.end(JSON.stringify(dataObj));
      }
    }
  });
  req(weather_url, (error, res, body) => {
      // console.log("ERROR: ",error);
    if (error) {
      console.log("error wuth the recieved data : ", error.message);
      handleError(error, request, response);
    } else {
      parallel++;
      console.log("WEATHER API RESPONSE:  ",body);
      filterData(body,1);
      if(parallel==2){
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.end(JSON.stringify(dataObj));
      }
    }
  });
}

//handles the Errors
function handleError(error, request, response) {
  response.writeHead(404, {"Content-Type" : "text/html"});
  response.end("<h1>404 PAGE NOT FOUND </h1>");
};

//filters the data recieved by both apis
function filterData(body,num){
  body = JSON.parse(body);
  if(num==0){
    dataObj['clock']=JSON.stringify(body);
  }
  if(num==1){
    dataObj['weather']=JSON.stringify(body);
  }

}



module.exports = {
  handleHome,
  handleStatic,
  handleRequest,
  handleError
};
