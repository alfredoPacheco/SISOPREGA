enyo.kind(
  {
    name : "crud.released",
    kind : "crud",
    published :
      {
        entityName : "Released",
      },
    getByID : function(iID) {
      var entityIdName = 'receptionId';
      for ( var i = 0; i < this.arrObj.length; i++) {
        if (this.arrObj[i][entityIdName] == iID) { return this.arrObj[i]; }
      }
      return null;
    }
  });
var crudReleased = new crud.released();