
function currentweather() {

  if (navigator.geolocation){

    navigator.geolocation.getCurrentPosition(function(position){

      var lat = position.coords.latitude;
      var lon = position.coords.longitude;
      var weatherURL = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&units=imperial&APPID=fa6eb231f9fb2288695c7834db698e4c&callback"; 

      $.ajax({
        url: weatherURL,
        type: 'GET',
      })
      .done(function(data) {

        $("#city").html(data.name);
        $("#description_weather").html(data.weather[0].description);
        // $("#weather_image").attr("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
        $("#temperature").html(Math.round(data.main.temp) + "&#176");

        // //Thunderstorm
        // if(data.weather[0].id>=200 && data.weather[0].id<=232){  $("#currentWeather").css("background","url('https://upload.wikimedia.org/wikipedia/commons/0/0c/Rooymans2000_-_Morning_Lightning_Strike_in_Singapore_(by).jpg')"); }

        // //Drizzle
        // else if(data.weather[0].id>=300 && data.weather[0].id<=321){  
        //   $("#currentWeather").css("background","url('https://s0.geograph.org.uk/geophotos/04/76/64/4766403_e1f206bf.jpg')"); 
        // }

        // //Rain
        // else if(data.weather[0].id>=500 && data.weather[0].id<=531){  
        //   $("#currentWeather").css("background","url('https://c1.staticflickr.com/1/50/155406169_2bcb8c025f_b.jpg')"); 
        // }

        // //Snow
        // else if(data.weather[0].id>=600 && data.weather[0].id<=622){  
        //   $("#currentWeather").css("background","url('https://res.freestockphotos.biz/pictures/9/9250-snow-covered-trees-pv.jpg')"); }

        // //Atmosphere
        // else if(data.weather[0].id>=701 && data.weather[0].id<=781){ 
        //   $("#currentWeather").css("background","url('https://s0.geograph.org.uk/geophotos/04/58/13/4581325_757d0cff.jpg')"); 
        // }

        // //Clear
        // else if(data.weather[0].id==800){ 
        //   $("#currentWeather").css("background","url('https://c2.staticflickr.com/2/1298/1340979055_a669e8cc70_b.jpg')"); 
        // }

        // //Clouds
        // else if(data.weather[0].id>=801 && data.weather[0].id<=804){ 
        //   $("#currentWeather").css("background","url('https://www.freegreatpicture.com/Max-Pixel/static/photo/1x/Skyporn-Clouds-Skies-Weather-Lookup-Sky-Cloudy-1571791.jpg')"); 
        // }

        // //Extreme
        // else if(data.weather[0].id>=900){ 
        //   $("#currentWeather").css("background","url('https://upload.wikimedia.org/wikipedia/commons/1/1a/Dszpics1.jpg')"); 
        // }
      })
    });
  }
}
currentweather();










