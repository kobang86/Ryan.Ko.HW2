
let getWeather = function(latitude, longitude) {
  //let latitude = '41.8781';
  //let longitude = '-87.6298';

  navigator.geolocation.getCurrentPosition(function(location) {
    console.log("The latitude is " + location.coords.latitude);
    console.log("The longitude is " + location.coords.longitude);

    let openweathermap_api_url = 'https://api.openweathermap.org/data/2.5/weather?'
    openweathermap_api_url += 'lat=' + location.coords.latitude
    openweathermap_api_url += '&lon=' + location.coords.longitude
    openweathermap_api_url +='&appid=4ce6f502d38ddae567bf1702b05e168c&units=imperial'

    let displayError = function(error) {
      console.debug(error);
      window.alert("Sorry, something went wrong.");
    }

    fetch(openweathermap_api_url).then(convertDataToJSON).then(updateWeather).catch(displayError);
  });
}

let convertDataToJSON = function(response) {
  return response.json();
}

let updateWeather = function(dataFromService) {
  console.debug(dataFromService)
  city_name = dataFromService.name;
  temp = dataFromService.main.temp;
  let location = document.getElementById("city");
  location.innerHTML = city_name;
  let weather = document.getElementById("temperature");
  weather.innerHTML = "It is " + temp + " degrees outside.";
  icon = dataFromService.weather[0].icon;
  document.getElementById("weather_img").src="http://openweathermap.org/img/w/"+ icon +".png";

}

let weatherLink = document.getElementById("forecast")
weatherLink.addEventListener("click", getWeather);
// HINT:
// Weather icon example: http://openweathermap.org/img/w/10d.png
// The very last part ('10d.png') can change based on the current conditions.
