enyo.kind(
  {
    name : "crud.location",
    kind : "crud",
    published: {
	entityName : "Location",
    },
    adapterToList : function(entityObj) {
      var listObj =
        {
          value : entityObj.locationId,
          caption : entityObj.locationName
        };
      return listObj;
    }
  });
var crudLocation = new crud.location();