

window.onload = currentweather();



function currentweather() {

var lat="";
var long="";
  
  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
    

    console.log("latitude: " + position.coords.latitude + "<br>longitude: " + position.coords.longitude);
       
      lat = position.coords.latitude;
      long = position.coords.longitude;
      var weatherURL = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&APPID=fa6eb231f9fb2288695c7834db698e4c&callback=JSON_CALLBACK"; 
      
      $.getJSON(weatherURL).done(function(data){
     $("#city").html(json.name);
     $("#description_weather").html(json.weather[0].description);
     $("#weather_image").attr("src", "http://openweathermap.org/img/w/" + json.weather[0].icon + ".png");
     $("#temperature").html(json.main.temp);
    });
    });
  	}
  }
  currentweather()

  
  // //Thunderstorm
  // if(res.weather[0].id>=200 && res.weather[0].id<=232){  $("body").css("background","url('https://upload.wikimedia.org/wikipedia/commons/0/0c/Rooymans2000_-_Morning_Lightning_Strike_in_Singapore_(by).jpg')"); }

  //   //Drizzle
  // if(res.weather[0].id>=300 && res.weather[0].id<=321){  $("body").css("background","url('https://s0.geograph.org.uk/geophotos/04/76/64/4766403_e1f206bf.jpg')"); }
  
  // //Rain
  // if(res.weather[0].id>=500 && res.weather[0].id<=531){  $("body").css("background","url('https://c1.staticflickr.com/1/50/155406169_2bcb8c025f_b.jpg')"); }
  
  // //Snow
  // if(res.weather[0].id>=600 && res.weather[0].id<=622){  $("body").css("background","url('http://res.freestockphotos.biz/pictures/9/9250-snow-covered-trees-pv.jpg')"); }
  
  // //Atmosphere
  // else if(res.weather[0].id>=701 && res.weather[0].id<=781){ $("body").css("background","url('https://s0.geograph.org.uk/geophotos/04/58/13/4581325_757d0cff.jpg')"); }
  
  // //Clear
  // else if(res.weather[0].id==800){ $("body").css("background","url('https://c2.staticflickr.com/2/1298/1340979055_a669e8cc70_b.jpg')"); }
  
  // //Clouds
  //  else if(res.weather[0].id>=801 && res.weather[0].id<=804){ $("body").css("background","url('http://www.freegreatpicture.com/Max-Pixel/static/photo/1x/Skyporn-Clouds-Skies-Weather-Lookup-Sky-Cloudy-1571791.jpg')"); }

  // //Extreme
  // else if(res.weather[0].id>=900){ $("body").css("background","url('https://upload.wikimedia.org/wikipedia/commons/1/1a/Dszpics1.jpg')"); }
  
  // $("body").css("background-size","1400px 1000px");
  
 











