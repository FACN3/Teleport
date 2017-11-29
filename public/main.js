
//handles the xhr request
var now = new Date();
const watch = {
  'hours': now.getHours(),
  'minutes': now.getMinutes(),
  'seconds':now.getSeconds()
}
function keepRunning(){
  watch.seconds=watch.seconds+1;
  if(watch.seconds == 60){
    watch.seconds=0;
    watch.minutes=watch.minutes+1;
    if(watch.minutes==60){
      watch.minutes=0;
      watch.hours=watch.hours+1;
      if(watch.hours==24){
        watch.hours = 0;
      }
    }
  }
}

function fetch(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log(xhr.status);
      callback(null,JSON.parse(xhr.responseText));
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
      var clock =JSON.parse(response.clock);
      var timeL=clock.formatted.split(" ")[1].split(":");
      watch.hours=parseInt(timeL[0]);
      watch.minutes=parseInt(timeL[1]);
      watch.seconds=parseInt(timeL[2]);
      console.log(response);
      renderInfos(response);
    }
  });
}

//submitButton`s event listener
document.getElementById('submitButton').addEventListener('click', function(){
  event.preventDefault();
  filterData();
});

//rendering the data
function renderInfos(response) {
  var time_infos = JSON.parse(response.clock);
  var weather_infos = JSON.parse(response.weather);

  var list_other = document.getElementById('other_infos');

  var timestamp = time_infos.formatted;
  var display_time = document.createElement('li');
  display_time.textContent = "Date and Time: " + timestamp;
  list_other.appendChild(display_time);

  var city = time_infos.zoneName;
  var display_city = document.createElement('li');
  display_city.textContent = "Zone: " + city;
  list_other.appendChild(display_city);

  var country = time_infos.countryName;
  var display_country = document.createElement('li');
  display_country.textContent = "Country: " + country;
  list_other.appendChild(display_country);

  var latitude = weather_infos.coord.lat;
  var longitude = weather_infos.coord.lon;
  var coords = document.createElement('li');
  coords.textContent = "Coordinates: " + latitude + ", " + longitude;
  list_other.appendChild(coords);
  console.log(response);

  //------Weather Infos---------//

  var temp_F = weather_infos.main.temp;
  var weather_main = weather_infos.weather[0].description;
  var humidity = weather_infos.main.humidity;
  var wind_speed = weather_infos.wind.speed;
  // var weather_icon = weather_infos.weather[0].icon;

  var list_weather = document.getElementById('weather_infos');

  var temp_display = document.createElement('li');
  temp_display.textContent = "Current Temperature in F: " + temp_F;
  list_weather.appendChild(temp_display);
  var weather_descript = document.createElement('li');
  weather_descript.textContent = weather_main;
  list_weather.appendChild(weather_descript);
  var display_humid = document.createElement('li');
  display_humid.textContent = "Humidity: " + humidity + "%";
  list_weather.appendChild(display_humid);
  var display_wind = document.createElement('li');
  display_wind.textContent = "Wind Speed: " + wind_speed;
  list_weather.appendChild(display_wind);


  // var icon = document.createElement('img');
  // icon.setAttribute("src", weather_icon);

}

function drawFace(ctx, radius) {
  var grad;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2*Math.PI);
  ctx.fillStyle = 'white';
  ctx.fill();
  grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
  grad.addColorStop(0, '#333');
  grad.addColorStop(0.5, 'white');
  grad.addColorStop(1, '#333');
  ctx.strokeStyle = grad;
  ctx.lineWidth = radius*0.1;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
  ctx.fillStyle = '#333';
  ctx.fill();
}

function drawNumbers(ctx, radius) {
  var ang;
  var num;
  ctx.font = radius*0.15 + "px arial";
  ctx.textBaseline="middle";
  ctx.textAlign="center";
  for(num = 1; num < 13; num++){
    ang = num * Math.PI / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius*0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius*0.85);
    ctx.rotate(-ang);
  }
}

function drawTime(ctx, radius){
    var now = new Date();
    // console.log(now);
    var hour = watch.hours;
    var minute = watch.minutes;
    var second = watch.seconds;
    //hour
    hour=hour%12;
    hour=(hour*Math.PI/6)+
    (minute*Math.PI/(6*60))+
    (second*Math.PI/(360*60));
    drawHand(ctx, hour, radius*0.5, radius*0.07);
    //minute
    minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
    drawHand(ctx, minute, radius*0.8, radius*0.07);
    // second
    second=(second*Math.PI/30);
    drawHand(ctx, second, radius*0.9, radius*0.02);
}

function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}

function drawClock() {
  keepRunning();
  drawFace(ctx, radius);
  drawNumbers(ctx, radius);
  drawTime(ctx, radius);
}

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.90
setInterval(drawClock, 1000);
