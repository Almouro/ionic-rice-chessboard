'use strict';

(function(){

  var mapModule = angular.module('theodo-test.services', []);

  mapModule.service('mapService', function(){

    this.getBestPath = function(map){
      var N = map.length;
      var M = map[0].length;

      var bestMoves = [];
      for (var j = 0; j < 2; j++) {
        bestMoves[j] = [];
        for(var i = 0; i < N; i++)
          bestMoves[j][i] = {};
      }

      function setBestMoveForPosition(position){
        var i = position[0];
        var j = position[1];
        
        var resultFound = {total: 0, moves: []};

        //Go right
        if(i + 1 < N){
          resultFound = bestMoves[0][i+1];
        }

        //Go down
        if(j + 1 < M){
          var resultFoundDown = bestMoves[1][i];
          if(resultFoundDown.total >= resultFound.total)
            resultFound = resultFoundDown;
        }

        var result = {total: map[i][j] + resultFound.total, moves: resultFound.moves.slice()};
        result.moves.push([i,j]);
        bestMoves[0][i] = result;
      }

      for (var j = M - 1; j >= 0; j--) {
        for (var i = N - 1; i >= 0; i--) {
          setBestMoveForPosition([i,j]);
        }
        bestMoves[1] = bestMoves[0];
      }

      var result = bestMoves[0][0];
      result.moves.reverse();
      return result;
    };
  });

})();
