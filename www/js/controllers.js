angular.module('starter.controllers', [])

  .controller('DashCtrl', function ($scope, $http) {
  })

  .controller('WeatherStartCtrl', function ($scope, $http) {

    var weatherData; // Object

    $scope.$on("$ionicView.loaded", function () {


    });

    $scope.getData = function () {
      //http://api.openweathermap.org/data/2.5/weather?lat=47.3413346&lon=7.8957823&lang=de&units=metric&APPID=3f32ae699559cc963085bac1b8d45a3d
      var url = "http://api.openweathermap.org/data/2.5/weather";
      var units = "metric";
      // TODO get location of user
      var lat = 47.3413346;
      var lon = 7.8957823;
      var appid = "3f32ae699559cc963085bac1b8d45a3d";
      $http.get(url, {params: {"lat": lat, "lon": lon, "units": units, "APPID": appid}})
        .success(function (data) {
          console.log("SUCCESS!");
          weatherData = data;
        })
        .error(function (data) {
          console.log("ERROR in function getData");
        });

    }

    $scope.parseData = function () {
      if (weatherData !== undefined) {

        var temperature = weatherData['main']['temp'];
        temperature = "33";


        $scope.current_weather_temp = temperature + "°";
        $scope.current_weather_location = weatherData['name'];
        //$scope.current_weather_condition = weatherData['weather'][0]['main'];
        icon = weatherData['weather'][0]['icon'];
        $scope.current_weather_icon = "http://openweathermap.org/img/w/" + icon + ".png";
        $scope.current_weather_icon_ionic = getIconAccordingTemperature(temperature);
        $scope.current_weather_text = getTextAccordingTemparature(temperature);


        //console.log(current_weather_condition);
        console.log(current_weather_temp + " Grad Celcius");
        console.log("Du bist in " + current_weather_location);
      } else {
        console.log('Error parsing data!');
      }
    }

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
    'Zieh deine Kleider aus oder suche Schatten!'
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