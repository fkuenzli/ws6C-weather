var lat = 47.3413346;
var lon = 7.8957823;

var lat_zh = 47.3673;
var lon_zh = 8.55;

var lat_bs = 47.5667;
var lon_bs = 7.6;

var lat_ch = 46.84986;
var lon_ch = 9.53287;

var lat_sg = 47.417928;
var lon_sg = 9.364397;

var lat_aa = 47.3907;
var lon_aa = 8.0459;

angular.module('starter.controllers', [])

  .controller('DashCtrl', function ($scope, $http) {
  })

  .controller('GeoCtrl', function($scope, $cordovaGeolocation) {

  })

  .controller('WeatherStartCtrl', function ($scope, $http, $timeout, $cordovaGeolocation) {

    $scope.init = function () {
      console.log("init");
      var posOptions = {timeout: 10000, enableHighAccuracy: false};
      $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
        lat  = position.coords.latitude
        lon = position.coords.longitude
        console.log(lat + '   ' + lon);

        $scope.getData( lat, lon, $scope.parseDataFront );

        $scope.getData(lat_zh, lon_zh, $scope.parseDataAndAddItem);

        $scope.getData(lat_bs, lon_bs, $scope.parseDataAndAddItem);
        $scope.getData(lat_ch, lon_ch, $scope.parseDataAndAddItem);
        $scope.getData(lat_sg, lon_sg, $scope.parseDataAndAddItem);
        $scope.getData(lat_aa, lon_aa, $scope.parseDataAndAddItem);

      }, function(err) {
        console.log(err)
      });
    };

    $scope.getData = function ( lat, lon, successFunc ) {
      //http://api.openweathermap.org/data/2.5/weather?lat=47.3413346&lon=7.8957823&lang=de&units=metric&APPID=3f32ae699559cc963085bac1b8d45a3d
      var url = "http://api.openweathermap.org/data/2.5/weather";
      var units = "metric";
      var appid = "3f32ae699559cc963085bac1b8d45a3d";
      $http.get(url, {params: {"lat": lat, "lon": lon, "units": units, "APPID": appid}})
        .success(function (data) {
          successFunc(data);
        })
        .error(function (data) {
          console.log("ERROR in function getFrontData");
        });
    };

    $scope.parseDataFront = function (weatherData) {
      console.log("parseDataFront");
      if (weatherData !== undefined) {
        var temperature = weatherData['main']['temp'];
        $scope.current_weather_temp = temperature + "°";
        $scope.current_weather_location = weatherData['name'];
        //$scope.current_weather_condition = weatherData['weather'][0]['main'];
        var icon = weatherData['weather'][0]['icon'];
        $scope.current_weather_icon = "http://openweathermap.org/img/w/" + icon + ".png";
        $scope.current_weather_icon_ionic = getIconAccordingTemperature(temperature);
        $scope.current_weather_text = getTextAccordingTemparature(temperature);

        // Necessary because AngularJS did not want to update the GUI no matter what! $apply didn't work. $digest didn't work.
        document.getElementById('current_weather_temp').innerHTML = temperature + "°";
        document.getElementById('current_weather_location').innerHTML = weatherData['name'];
        document.getElementById('current_weather_icon_ionic').className = "icon " + getIconAccordingTemperature(temperature);
        document.getElementById('current_weather_text').innerHTML = getTextAccordingTemparature(temperature);
      } else {
        console.log('Error parsing data!');
      }

    };

    $scope.parseDataAndAddItem = function (weatherData) {
      console.log("parseDataAndAddItem");
      if (weatherData !== undefined) {
        var temperature = weatherData['main']['temp'];
        var weather_temp = temperature + "°";
        var weather_location = weatherData['name'];
        //$scope.current_weather_condition = weatherData['weather'][0]['main'];
       // var icon = weatherData['weather'][0]['icon'];
        //weather_icon = "http://openweathermap.org/img/w/" + icon + ".png";
        //weather_icon_ionic = getIconAccordingTemperature(temperature);
        //weather_text = getTextAccordingTemparature(temperature);

        // Necessary because AngularJS did not want to update the GUI no matter what! $apply didn't work. $digest didn't work.
        document.getElementById('back').innerHTML += "<div class='back-item'><span class='back-item-title'>" + weather_location + "</span><span class='back-item-temp'>"+ weather_temp +"</span></div>";
      } else {
        console.log('Error parsing data!');
      }

    };
    //$scope.hueValue = 'rgb(' + Math.floor(Math.random() * 256) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256))+ ')';

    var color = getRandomColor();

    console.log(color);
    console.log(shadeColor2(color, -0, 2));

    $scope.hueValue = color;
    $scope.hueValueDark = shadeColor2(color, -0.2);

  })

  .controller('ChatsCtrl', function ($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
      Chats.remove(chat);
    };
  })

  .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('AccountCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  })

  .controller('RequestCtrl', function ($scope) {
  });

var getTextAccordingTemparature = function (temperature) {

  var textsBelowZero = [
    'Eiskalt!',
    'Springt dein Auto noch an?!'
  ];

  var textsZeroToTen = [
    'Zieh dich warm an!'
  ];

  var textsTenToTwenty = [
    'Mal so, mal so!'
  ];

  var textsTwentyToThirty = [
    'Lass\' deine Jacke zuhause!'
  ];

  var textsAboveThirty = [
    'Zieh deine Kleider aus!'
  ];


  if (temperature <= 0) {
    var randomNumber = Math.floor(Math.random() * textsBelowZero.length);
    return textsBelowZero[randomNumber];
  }

  else if (temperature <= 10) {
    var randomNumber = Math.floor(Math.random() * textsZeroToTen.length);
    return textsZeroToTen[randomNumber];
  }

  else if (temperature <= 20) {
    var randomNumber = Math.floor(Math.random() * textsTenToTwenty.length);
    return textsTenToTwenty[randomNumber];
  }

  else if (temperature <= 30) {
    var randomNumber = Math.floor(Math.random() * textsTwentyToThirty.length);
    return textsTwentyToThirty[randomNumber];
  }

  else {
    var randomNumber = Math.floor(Math.random() * textsAboveThirty.length);
    return textsAboveThirty[randomNumber];
  }
}

var getIconAccordingTemperature = function (temperature) {
  if (temperature <= 0) {
    return "ion-ios-snowy";
  }

  else if (temperature <= 10) {
    return "ion-ios-snowy";
  }

  else if (temperature <= 20) {
    return "ion-ios-cloudy-outline";
  }

  else if (temperature <= 30) {
    return "ion-ios-sunny";
  }

  else {
    return "ion-ios-sunny";
  }
}


var getRandomColor = function () {
  var colors = [
    '#1abc9c',
    '#2ecc71',
    '#3498db',
    '#9b59b6',
    '#34495e',
    '#16a085',
    '#27ae60',
    '#2980b9',
    '#8e44ad',
    '#2c3e50',
    '#f1c40f',
    '#e67e22',
    '#e74c3c',
    '#f39c12',
    '#d35400',
    '#c0392b'
  ]

  return colors[Math.floor(Math.random() * colors.length)];

}

function shadeRGBColor(color, percent) {
  var f = color.split(","), t = percent < 0 ? 0 : 255, p = percent < 0 ? percent * -1 : percent, R = parseInt(f[0].slice(4)), G = parseInt(f[1]), B = parseInt(f[2]);
  return "rgb(" + (Math.round((t - R) * p) + R) + "," + (Math.round((t - G) * p) + G) + "," + (Math.round((t - B) * p) + B) + ")";
}

function shadeColor2(color, percent) {
  var f = parseInt(color.slice(1), 16), t = percent < 0 ? 0 : 255, p = percent < 0 ? percent * -1 : percent, R = f >> 16, G = f >> 8 & 0x00FF, B = f & 0x0000FF;
  return "#" + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
}