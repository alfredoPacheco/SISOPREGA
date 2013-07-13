enyo.kind(
  {
    name : "crud.inspectionCode",
    kind : "crud",
    published: {
	entityName : "InspectionCode",
    },
    adapterToList : function(entityObj) {
      var listObj =
        {
          value : entityObj.inspectionCodeId,
          caption : entityObj.inspectionCodeDescription
        };
      return listObj;
    }    
  });
var crudInspectionCode = new crud.inspectionCode();