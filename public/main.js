// var path = require('path');
//handles the xhr request
function myFunction() {
    var d = new Date(Date.now());
    var h = d.getHours();
    var m = d.getMinutes();
	var s = d.getSeconds();
    document.getElementById("demo").innerHTML = h + " : "+m+" : "+s;
}
window.setInterval(myFunction, 1000);
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
  console.log(weather_infos);

  var city = time_infos.locations[0].geo.name;
  var country = time_infos.locations[0].geo.country['name'];
  var latitude = time_infos.locations[0].geo.latitude;
  var longitude = time_infos.locations[0].geo.longitude;
  var timezone = time_infos.locations[0].time.timezone['zonename'];
  console.log("city: " + city + " country: " + country + " coords: " + latitude + " " + longitude + " timezone: " + timezone);

  var list_infos = document.getElementById('other_infos');
  var city_display = document.createElement('li');
  city_display.textContent = "City: " + city;
  list_infos.appendChild(city_display);
  var country_display = document.createElement('li');
  country_display.textContent = "Country: " + country;
  list_infos.appendChild(country_display);
  var coords_display = document.createElement('li');
  coords_display.textContent = "Coords: " + latitude + ", " + longitude;
  list_infos.appendChild(coords_display);
  var timezone_display = document.createElement('li');
  timezone_display.textContent = "Timezone: " + timezone;
  list_infos.appendChild(timezone_display);

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
