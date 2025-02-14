
var date = new Date();
var months = ["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"];

function getWeatherInfo() {
  var inputCountry = document.getElementById("inputCountry").value;
  var inputCity = document.getElementById("inputCity").value;

  document.getElementById("city").innerText = `Girdiğiniz Ülke: ${inputCountry}, Şehir: ${inputCity}`;

  
const url = `https://api.openweathermap.org/data/2.5/forecast?q=${inputCity},${inputCountry}&appid=69f27776fcc2ef53fa6dea89dd4a4aeb&lang=TR&units=metric`;
  axios.get(url)
    .then(function (response) {
      TodayInfo(response);
      OneDayLater(response);
      TwoDayLater(response);
      ThreeDayLater(response);
      FourDayLater(response);
    })
    .catch(function (error) {
      if (error.response) {
        let message = error.response.data.message;
        let status = error.response.status;
        console.log(`HATA >>> HTTP Kodu : ${status}  Hata Mesajı : ${message} `);
      } else {
        console.log(`HATA >>> Hata Mesajı : ${error} `);
      }
    });
}


function TodayInfo(response) {
  let city = response.data.city.name;
  let country = response.data.city.country;
  let celsius = response.data.list[0].main.temp;
  let weather = response.data.list[0].weather[0].description;
  let requestDate = date.getDate() + " " + months[(Number((String(response.data.list[0].dt_txt)).slice(5, 7))) - 1];

  let cityElement = document.getElementById("city");
  cityElement.innerHTML = `<h1>${city} , ${country}</h1>`;

  document.getElementById("celsius").innerText = celsius.toFixed(0) + "°C";
  document.getElementById("date").innerText = requestDate;
  document.getElementById("result").innerText = Capitalize(weather);

  console.log(`BAŞARILI >>> Şehir : ${city}   Ülke : ${country}   Derece : ${celsius}°C   Hava Durumu : ${weather}   Sorgulama Tarihi : ${requestDate + " " + date.getFullYear()}`);
}

function OneDayLater(response){
      let weather=response.data.list[8].weather[0].description;
      let celsius =response.data.list[8].main.temp;
      let requestDate =(String(response.data.list[8].dt_txt)).slice(8,10)+" "+months[(Number((String(response.data.list[8].dt_txt)).slice(5,7)))-1];
      
      document.getElementById("one-text").innerText=celsius.toFixed(0)+"°C";
      document.getElementById("one-date").innerText=requestDate;
      document.getElementById("one-weather").innerText=Capitalize(weather);

}

function TwoDayLater(response){
      let weather=response.data.list[16].weather[0].description;
      let celsius =response.data.list[16].main.temp;
      let requestDate =(String(response.data.list[16].dt_txt)).slice(8,10)+" "+months[(Number((String(response.data.list[16].dt_txt)).slice(5,7)))-1];
      
      document.getElementById("two-text").innerText=celsius.toFixed(0)+"°C";
      document.getElementById("two-date").innerText=requestDate;
      document.getElementById("two-weather").innerText=Capitalize(weather);
}


function ThreeDayLater(response){
      let weather=response.data.list[24].weather[0].description;
      let celsius =response.data.list[24].main.temp;
      let requestDate =(String(response.data.list[24].dt_txt)).slice(8,10)+" "+months[(Number((String(response.data.list[24].dt_txt)).slice(5,7)))-1];

      document.getElementById("three-weather").innerText=Capitalize(weather);
      document.getElementById("three-text").innerText=celsius.toFixed(0)+"°C";
      document.getElementById("three-date").innerText=requestDate;
}


function FourDayLater(response){
      let celsius =response.data.list[32].main.temp;
      let requestDate =(String(response.data.list[32].dt_txt)).slice(8,10)+" "+months[(Number((String(response.data.list[32].dt_txt)).slice(5,7)))-1];
      let weather=response.data.list[32].weather[0].description;
      document.getElementById("four-weather").innerText=Capitalize(weather);
      document.getElementById("four-text").innerText=celsius.toFixed(0)+"°C";
      document.getElementById("four-date").innerText=requestDate;

}


function Capitalize(weather){
  let weathers=weather.split(" ");
  let text="";
  for (let i = 0; i < weathers.length; i++) {
   weathers[i]=weathers[i][0].toUpperCase()+weathers[i].slice(1).toLowerCase();
  text=text+" "+weathers[i];
  }
  return text;
}

document.addEventListener("DOMContentLoaded", function () {
  const backgroundAnimation = document.getElementById("background-animation");
  const currentHour = new Date().getHours();

  if (currentHour >= 6 && currentHour < 18) {
    backgroundAnimation.style.backgroundImage = "url('sunlight-sky-clouds-airplane-horizon-atmosphere-513861-wallhere.com.jpg')";
  } else {

    backgroundAnimation.style.backgroundImage = "url('510438-night-sky-desktop.jpg')";
  }


 
})

