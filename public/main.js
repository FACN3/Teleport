// var path = require('path');
//handles the xhr request
function fetch(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log(xhr.status);
      callback(JSON.parse(xhr.responseText));
    } else {
      console.log(xhr.readyState, xhr.status);
    }
  };
  xhr.open('GET', url);
  xhr.send();
}

//function that handles the data recieved from the server
function filterData() {
  var place = document.getElementById('cities').value;
  searchPath="/submit?search="+place;
  // console.log(searchPath);
  fetch(searchPath, function(error, response) {
    if (error) {
      console.log("error with getting data from the server : ",error);
    }else{
      console.log(response);
    }
  });
}

//submitButton`s event listener
document.getElementById('submitButton').addEventListener('click', function(){
  event.preventDefault();
  filterData();
});

//rendering the data
function renderInfos(){

}

//handling rendering the clock


//handling rendering the weather

//canvas drawing
function drawClock() {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  ctx.beginPath();
  ctx.arc(250, 250, 200, 0, Math.PI * 2, true);
  ctx.stroke();
}



drawClock();
