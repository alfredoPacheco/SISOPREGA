enyo.kind(
  {
    name : "cache.cattle",
    kind : "crud.cache",
    entityName : "CattleClass",
    adapterToList : function(entityObj) {
      var listObj =
        {
          value : entityObj.cattleClassId,
          caption : entityObj.catclassName
        };
      return listObj;
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
      for ( var i = 0; i < cattleClass.cattleType.length; i++) {
        var auxObj =
          {
            value : cattleClass.cattleType[i].cattleTypeId,
            caption : cattleClass.cattleType[i].cattypeName
          };

        arrList.push(auxObj);
      }
    }
  });
var cacheCattle = new cache.cattle();