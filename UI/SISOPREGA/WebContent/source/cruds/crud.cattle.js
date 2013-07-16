enyo.kind(
  {
    name : "crud.cattle",
    kind : "crud",
    published: {
	entityName : "CattleClass",
    },
    adapterToList : function(entityObj) {
      var listObj =
        {
          value : entityObj.cattleClassId,
          caption : entityObj.catclassName
        };
      return listObj;
    },
    getCattleTypeById : function(cattleTypeId){
	for(var i=0; i<this.arrObj.length; i++){
	    for(var j=0;j<this.arrObj[i].CattleType.length; j++){
		if(this.arrObj[i].CattleType[j].cattleTypeId == cattleTypeId){
		    return this.arrObj[i].CattleType[j];
		}
	    }
	}
	return null;
    },
    getCattleTypeList : function(cattleClassId) {
      var arrList = [];
      for ( var i = 0; i < this.arrObj.length; i++) {
        if (cattleClassId) {
          if(cattleClassId == this.arrObj[i].cattleClassId)
            this.fillCattleTypeListWithCattleClass(arrList, this.arrObj[i]);
        } else {
          this.fillCattleTypeListWithCattleClass(arrList, this.arrObj[i]);
        }
      }
      return arrList;
    },
    fillCattleTypeListWithCattleClass : function(arrList, cattleClass) {
      for ( var i = 0; i < cattleClass.CattleType.length; i++) {
        var auxObj =
          {
            value : cattleClass.CattleType[i].cattleTypeId,
            caption : cattleClass.CattleType[i].cattypeName
          };

        arrList.push(auxObj);
      }
    }
  });
var crudCattle = new crud.cattle();