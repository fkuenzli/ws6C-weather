angular.module( 'starter.controllers', [] )

  .controller( 'DashCtrl', function ( $scope, $http ) {

    var weatherData; // Object

    $scope.getData = function () {
      //http://api.openweathermap.org/data/2.5/weather?lat=47.3413346&lon=7.8957823&lang=de&units=metric&APPID=3f32ae699559cc963085bac1b8d45a3d
      var url = "http://api.openweathermap.org/data/2.5/weather";
      var units = "metric";
      var lat = 47.3413346;
      var lon = 7.8957823;
      var appid = "3f32ae699559cc963085bac1b8d45a3d";
      $http.get( url, { params: { "lat": lat, "lon": lon, "units": units, "APPID": appid } } )
        .success( function ( data ) {
          console.log( "SUCCESS!" );
          weatherData = data;
        } )
        .error( function ( data ) {
          console.log( "ERROR in function getData" );
        } );

    }

    $scope.parseData = function () {
      if ( weatherData !== undefined ) {
        var weather = weatherData[ 'weather' ][ 0 ][ 'main' ];
        console.log( weather );
      } else {
        console.log( 'Error parsing data!' );
      }
    }

  } )

  .controller( 'ChatsCtrl', function ( $scope, Chats ) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function ( chat ) {
      Chats.remove( chat );
    };
  } )

  .controller( 'ChatDetailCtrl', function ( $scope, $stateParams, Chats ) {
    $scope.chat = Chats.get( $stateParams.chatId );
  } )

  .controller( 'AccountCtrl', function ( $scope ) {
    $scope.settings = {
      enableFriends: true
    };
  } )

  .controller( 'RequestCtrl', function ( $scope ) {
  } );

