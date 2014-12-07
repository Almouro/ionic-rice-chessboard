'use strict';

(function(){
  var app = angular.module('theodo-test.controllers', ['theodo-test.services']);

  app.controller('MainController', ['$scope', 'mapService', '$timeout', '$ionicPopup', 
      function($scope, mapService, $timeout, $ionicPopup){

    var DELAY_SELECT_TILE = 100;
    var MAX_MAP_SIZE = 100;
    var MAX_TILE_VALUE = 99;
    var selectTilesTimeout = [];

    function resetMap(options){
      if(!options) options = {}; 
      $scope.total = 0;     

      for(var i = 0; i < $scope.size.rows; i++){
        if(!$scope.map[i]) $scope.map[i] = [];

        for(var j = 0; j < $scope.size.columns; j++){
          var value = 0;

          if(options.random) value = randInt(0,MAX_TILE_VALUE);

          if(!options.keepValues || !$scope.map[i][j]){
            $scope.map[i][j] = {value: value, selected: false};
          }
        }

        $scope.map[i].length = $scope.size.columns;
      }
      $scope.map.length = $scope.size.rows;
    };

    function showParameters(){
      $scope.size.edit = {
        rows: $scope.size.rows,
        columns: $scope.size.columns
      };

      var parametersPopup = $ionicPopup.show({
        templateUrl: 'parameters.html',
        title: 'Map details',
        scope: $scope,
        buttons: [
          { text: 'Close' }
        ]
      });
    }

    (function initScope(){
      $scope.size = {
        rows: 10,
        columns: 10
      };
      $scope.map = [];
      resetMap();
      $scope.MAX_MAP_SIZE = MAX_MAP_SIZE;
      showParameters();
    })();


    $scope.showParameters = function(){
      showParameters();
    };

    $scope.randomize = function(){
      resetMap({random: true});
      resetPath();
    };

    $scope.changeSize = function(){
      if($scope.size.edit.columns && $scope.size.edit.rows){
        $scope.size.columns = $scope.size.edit.columns;
        $scope.size.rows = $scope.size.edit.rows;
        resetMap({keepValues: true});
      }
    }

    function resetPath(){
      selectTilesTimeout.forEach(function(timeout){
        $timeout.cancel(timeout);
      });

      for(var i = 0; i < $scope.size.rows; i++){
        for(var j = 0; j < $scope.size.columns; j++){
          //$scope.map[i][j].selected = false;
          document.getElementById(i+'_'+j).className = "tile";
        }
      }
    }

    $scope.resetPath = function(){
      resetPath();
    }

    $scope.incrTile = function(row, j){
      row[j].value = (row[j].value + 1) % (MAX_TILE_VALUE + 1);
      $scope.resetPath();
    };

    $scope.incrTileReact = function(i, j){
      $scope.map[i][j].value = ($scope.map[i][j].value + 1) % (MAX_TILE_VALUE + 1);
      $scope.resetPath();
    };

    function randInt(n1,n2){
      return Math.floor(Math.random() * (n2-n1+1)) + n1;
    };

    $scope.resetMap = function(){
      resetMap();
      resetPath();
    }

    function calculatePath(){
      resetPath();

      var map_ = [];
      for(var i = 0; i < $scope.size.rows; i++)
        map_[i] = $scope.map[i].map(function(tile){return tile.value});

      var result = mapService.getBestPath(map_);

      $scope.total = 0;

      result.moves.forEach(function(move, index){
        var i = move[0];
        var j = move[1];

        selectTilesTimeout.push($timeout(function(){
          //$scope.map[i][j].selected = true;
          $scope.total += $scope.map[i][j].value;

          document.getElementById(i+'_'+j).className += " selected";
        }, DELAY_SELECT_TILE * (index + 1)));
      });      
    }

    $scope.calculatePath = function(){
      calculatePath();
    };
  }]);

})();