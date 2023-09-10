//state
let currCity = "London";
let units = "metric";
//selectors
let city = document.querySelector(".weather__city");
let datetime = document.querySelector(".weather__datetime");
let weather__forecast = document.querySelector(".weather__forecast");
let weather__temperature = document.querySelector(".weather__temperature");
let weather__icon=document.querySelector(".weather__icon");
let weather__minmax=document.querySelector(".weather__minmax");
let weather__realfeel=document.querySelector('.weather__realfeel');
let weather__humidity=document.querySelector('.weather__humidity');
let weather__wind=document.querySelector('.weather__wind');
let weather__pressure=document.querySelector('.weather__pressure');

//search
document.querySelector(".weather__search").addEventListener('submit',e=>{
    let search=document.querySelector(".weather__searchform");
//prevent
e.preventDefault();
//change current city
currCity=search.value;
//get weather forecaste
getWeather();
search.value = ""
})
function convertTimeStamp(timestamp, timezone) {
  const convertTimezone = timezone / 3600;
  const date = new Date(timestamp * 1000);

  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: `Etc/GMT${convertTimezone >= 0 ? "-" : "+"}${Math.abs(
      convertTimezone
    )}`,
    // timeZone:'+5:30',
    hour12: true,
  };
  return date.toLocaleString("en-IN", options);
}
function getWeather() {
  const API_KEY = "4f9ec42bd1cf22001c987cbf62b05473";
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${currCity}&appid=${API_KEY}&units=metric`
  )
    .then((res) => res.json())
    .then((data) => {
      city.innerHTML = `${data.name},${data.sys.country}`
      datetime.innerHTML = convertTimeStamp(data.dt, data.timezone);
      weather__forecast.innerHTML = `<p>${data.weather[0].main}`
      weather__temperature.innerHTML = `${data.main.temp.toFixed()}&#176`
      weather__icon.innerHTML=`<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png"/>`
      weather__minmax.innerHTML=`<p>Min:${data.main.temp_min.toFixed()}&#176</p><p>Max:${data.main.temp_max.toFixed()}&#176</p>`
      weather__realfeel.innerHTML=`${data.main.feels_like.toFixed()}&#176`
      weather__humidity.innerHTML=`${data.main.humidity}%`
      weather__wind.innerHTML=`${data.wind.speed}m/s`
      weather__pressure.innerHTML=`${data.main.pressure}hPa`
    });
}

document.body.addEventListener("load", getWeather());
