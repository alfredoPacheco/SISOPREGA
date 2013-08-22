enyo.kind(
  {
    name : "crud.inventory",
    kind : "crud.summarized",
    published :
      {
        entityName : "Inventory",
        createKindName : "operations.inventory.form",
      },
    calculateSummary : function() {
      var heads = 0;
      var weight = 0;
      var feed = 0;
      for ( var i = 0; i < this.arrObj.length; i++) {
        heads += Number(this.arrObj[i].heads);
        weight += Number(this.arrObj[i].weight);
        feed += Number(this.arrObj[i].feed);
      }
      
      var objSummary = {
          heads : heads,
          weight : weight,
          feed : feed
      };
      
      this.setObjSummary(objSummary);
    },
    adapterToIn : function(entityObj) {
      if (entityObj) {
        entityObj = this.inherited(arguments);
        
        entityObj.pen = crudPen.getByID(entityObj.penId);
        
        entityObj.aveweight = Number(entityObj.heads) / Number(entityObj.weight);
        return entityObj;
      }
      return null;
    }
  });
var crudInventory = new crud.inventory();