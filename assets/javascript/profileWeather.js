
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
        $("#descriptionWeather").html(data.weather[0].description);
        $("#temperature").html(Math.round(data.main.temp) + "&#176");

        //Thunderstorm
        if(data.weather[0].id>=200 && data.weather[0].id<=232){  
            $("#weatherIcon").attr("src", "assets/images/thunderstorm.png");
        }

        //Drizzle
        else if(data.weather[0].id>=300 && data.weather[0].id<=321){  
          $("#weatherIcon").attr("src", "assets/images/drizzle.png");
        }

        //Rain
        else if(data.weather[0].id>=500 && data.weather[0].id<=531){  
          $("#weatherIcon").attr("src", "assets/images/rain.png");
        }

        //Snow
        else if(data.weather[0].id>=600 && data.weather[0].id<=622){  
          $("#weatherIcon").attr("src", "assets/images/snow.png");
        }

        //Atmosphere
        else if(data.weather[0].id>=701 && data.weather[0].id<=781){ 
          $("#weatherIcon").attr("src", "assets/images/hazy.png");
        }

        //Clear
        else if(data.weather[0].id==800){ 
          $("#weatherIcon").attr("src", "assets/images/clear.png");
        }

        //Clouds
        else if(data.weather[0].id>=801 && data.weather[0].id<=804){ 
          $("#weatherIcon").attr("src", "assets/images/cloudy.png");
        }

        //Extreme
        else if(data.weather[0].id>=900){ 
          $("#weatherIcon").attr("src", "assets/images/hail.png");
        }
      })
    });
  }
}
currentweather();










