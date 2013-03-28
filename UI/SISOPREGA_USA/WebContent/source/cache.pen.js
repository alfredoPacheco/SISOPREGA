enyo.kind(
  {
    name : "cache.pen",
    isOccupied : function(penName) {
      //TODO:Utilizar webservice para consultar ocupacidad del corral.
      return false;
    },
    getList : function() {
      var result = [];
      // TODO: Use web service to retrieve list of pens

      var pen_names =
        [ "EB1", "EB3", "EB5", "WB1", "WB3", "WB5" ];

      for ( var i = 0; i < pen_names.length; i++) {
        var pen =
          {
            value : i,
            caption : pen_names[i]
          };
        result.push(pen);
      }

      return result;
    }

  });
var cachePen = new cache.pen();
