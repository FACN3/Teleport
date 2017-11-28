
function fetch(url, callback) {

  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log(xhr.status);
      callback(JSON.parse(xhr.responseText));
    }
    else {
      console.log(xhr.readyState, xhr.status);
    }
  };
  xhr.open('GET', url);
  xhr.send();
}

function drawClock() {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  ctx.beginPath();
  ctx.arc(250, 250, 200, 0, Math.PI * 2, true);
  ctx.stroke();
}

function renderInfos() {

  var place = document.getElementById('cities').value;

  fetch(place, function(error, response) {
    if (error) {
      console.log(error);
    }
    console.log(response);
  });
}

drawClock();
