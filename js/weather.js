// Docs at http://simpleweatherjs.com
$(document).ready(function() {
  /* Does your browser support geolocation? */
  if (navigator && navigator.geolocation) {
    $('.js-geolocation').show();
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  } else {
    $('.js-geolocation').hide();
    console.log('Geolocation is not supported');
  }

  loadWeather('Las Vegas',''); //@params location, woeid
  getWeatherForecast('Gardsjo, SWEDEN', '', 'c', 'div_weather1');
  getWeatherForecast('Finnerodja, SWEDEN', '', 'c', 'div_weather2');
  getWeatherForecast('Orebro, SWEDEN', '', 'c', 'div_weather3');
  setInterval(getWeather, 1000); // Update the weather every 1 minutes.
});

function errorCallback(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            $('.js-geolocation').innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            $('.js-geolocation').innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            $('.js-geolocation').innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            $('.js-geolocation').innerHTML = "An unknown error occurred."
            break;
    }
}

function successCallback(position) {
  loadWeather(position.coords.latitude+','+position.coords.longitude); //load weather using your lat/lng coordinates
}

function loadWeather(location, woeid) {
  $.simpleWeather({
    location: location,
    woeid: woeid,
    unit: 'c',
    success: function(weather) {
      if(weather.temp > 10 && weather.temp < 15) {
        $('body').animate({backgroundColor: '#F7AC57'}, 1500);
      } else if(weather.temp > 15 && weather.temp < 20) {
        $('body').animate({backgroundColor: '#0091c2'}, 1500);
      } else {
        $('body').animate({backgroundColor: '##ff1a1a'}, 1500);
      }

      if(weather.currently == 'Partly Cloudy' || weather.currently == 'Mostly Cloudy' || weather.currently == 'Cloudy')
      {
        html = '<h2><i class="fa fa-cloud"></i> '+weather.temp+'&deg;'+weather.units.temp+'</h2>';
      }
      else if(weather.currently == 'Partly Sunny' || weather.currently == 'Mostly Sunny' || weather.currently == 'Sunny')
      {
        html = '<h2><i class="fa fa-sun-o"></i> '+weather.temp+'&deg;'+weather.units.temp+'</h2>';
      }
      else if(weather.currently == 'Partly Rainy' || weather.currently == 'Mostly Rainy' || weather.currently == 'Rainy')
      {
        html = '<h2><i class="fa fa-sun"></i> '+weather.temp+'&deg;'+weather.units.temp+'</h2>';
      }
      else {
        html = '<h2>'+weather.temp+'&deg;'+weather.units.temp+'</h2>';
      }
      
      html += '<ul><li>'+weather.city+', '+weather.region+'</li><br>';
      html += '<li class="currently">'+weather.currently+'</li><br>';
      html += '<li>Humidity '+weather.humidity+'%</li></ul>';
      
      $("#weather").html(html);
    },
    error: function(error) {
      $("#weather").html('<p>'+error+'</p>');
    }
  });
}

function getWeather(location_arg, woeid_arg, units_arg, div_id){
  $.simpleWeather({
    location: location_arg,
    woeid: woeid_arg,
    unit: units_arg,
    success: function(weather) {
      if(weather.temp > 10 && weather.temp < 15) {
        $('#' + div_id).animate({backgroundColor: '#F7AC57'}, 1500);
      } else if(weather.temp > 15 && weather.temp < 20) {
        $('#' + div_id).animate({backgroundColor: '#0091c2'}, 1500);
      } else {
        $('#' + div_id).animate({backgroundColor: '##ff1a1a'}, 1500);
      }

      html = '<h2><i class="icon' + weather.code + '"></i> ' + weather.temp + '&deg;' + weather.units.temp + '</h2>';
      html += '<ul><li>' + weather.city + ', ' + weather.region + '</li>';
      html += '<li class="currently">' + weather.currently + '</li>';
      html += '<li>' + weather.wind.direction + ' ' + weather.wind.speed + ' ' + weather.units.speed + '</li></ul>';

      $("#" + div_id).html(html);
    },
    error: function(error) {
      $("#" + div_id).html('<p>' + error + '</p>');
    }
  });
}

function getWeatherForecast(location_arg, woeid_arg, units_arg, div_id){
  $.simpleWeather({
    location: location_arg,
    woeid: woeid_arg,
    unit: units_arg,
    success: function(weather) {
      if(weather.temp > 10 && weather.temp < 15) {
        $('#' + div_id).animate({backgroundColor: '#F7AC57'}, 1500);
      } else if(weather.temp > 15 && weather.temp < 20) {
        $('#' + div_id).animate({backgroundColor: '#0091c2'}, 1500);
      } else {
        $('#' + div_id).animate({backgroundColor: '##ff1a1a'}, 1500);
      }

      html = '<h2>'+weather.temp+'&deg;'+weather.units.temp+'</h2>';
      html += '<ul><li>'+weather.city+', '+weather.region+'</li>';
      html += '<li class="currently">'+weather.currently+'</li>';
      html += '<li>'+weather.alt.temp+'&deg;C</li></ul>';
      
      for(var i=0;i<weather.forecast.length;i++) {
        html += '<p>'+weather.forecast[i].day+': '+weather.forecast[i].high+'</p>';
      }

      $("#" + div_id).html(html);
    },
    error: function(error) {
      $("#" + div_id).html('<p>'+error+'</p>');
    }
  });
}
