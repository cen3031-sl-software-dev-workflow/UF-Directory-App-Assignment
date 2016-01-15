angular.module('listings').controller('ListingsController', ['$scope', 'Listings', 
  function($scope, Listings) {

    L.mapbox.accessToken = 'pk.eyJ1IjoiamF5Ymx1IiwiYSI6Inp1Uzg1WncifQ.ynx52ZMuvJFiRCmsx5JRlQ';
    var map = L.mapbox.map('map', 'jayblu.jckk452m').setView([29.6520,-82.3250],14);

    $scope.listings = Listings;
    $scope.detailedInfo = undefined;
    $scope.codeName = '';

    
    //Adds a new listing to the listings variable and resets the information on the form
    $scope.addListing = function() {
      $scope.listings.push({
        code: $scope.newCode,
        name: $scope.newName,
        coordinates: { latitude: $scope.newCoordinateX, longitude: $scope.newCoordinateY },
        address: $scope.newAddress
      });

      //Resets the form 
      $scope.newCode = '';
      $scope.newName = '';
      $scope.newCoordinateX = '';
      $scope.newCoordinateY = '';
      $scope.newAddress = '';
    };

    //Deletes a listing at the given index
    $scope.deleteListing = function(index) {
      $scope.listings.splice(index, 1);
    };

    //Updates the detailed info to be shown on the Detailed Info jumbotron
    $scope.showDetails = function(index) {
      if(typeof($scope.listings[index].coordinates) !== 'undefined'){
        L.mapbox.featureLayer().clearLayers();
        L.mapbox.featureLayer({
          type: 'Feature',
          geometry:{
            type: 'Point',
            coordinates:[
              $scope.listings[index].coordinates.longitude,
              $scope.listings[index].coordinates.latitude
            ]
          },
          properties:{
            title: $scope.listings[index].code + "\n" + $scope.listings[index].name,
            description: $scope.listings[index].address,
            'marker-size': 'large',
            'marker-color': '#FC575E',
            'marker-symbol': 'college'
          }
        }).addTo(map);
        $scope.detailedInfo = $scope.listings[index].code+"\n\n"+
                          $scope.listings[index].address+"\n\n("+
                          $scope.listings[index].coordinates.latitude+", "+
                          $scope.listings[index].coordinates.longitude+")\n\n";
        $scope.codeName = $scope.listings[index].name;
        map.setView([$scope.listings[index].coordinates.latitude, $scope.listings[index].coordinates.longitude], 16);
      }else{
        $scope.detailedInfo = "No Details";
      }

      //$scope.detailedInfo = $scope.listings[index];
    };
  }
]);