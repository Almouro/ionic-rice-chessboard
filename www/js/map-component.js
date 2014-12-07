var Map = React.createClass({displayName: 'Map',
  propTypes: {
    data : React.PropTypes.array.isRequired,
    incr : React.PropTypes.func.isRequired
  },
  render: function(){
    var map = this;
    var rows = this.props.data.map(function(row, i){
      var cols = row.map(function(tile, j){
        var incrTile = function(){
          map.props.incr(i,j);
          map.forceUpdate();
        };
        return React.createElement("div", {className: "tile", id: i + "_" + j, key: i + "_" + j, onClick: incrTile}, " ", tile.value, " ");
      });
      return React.createElement("div", {className: "row", key: i}, cols);
    });

    return React.createElement("div", null, rows);
  }
});