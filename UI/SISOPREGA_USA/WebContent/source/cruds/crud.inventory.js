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
        
        if(arrAux = entityObj.Shrinkage){
            for(var i=0;i<arrAux.length;i++){
        	arrAux[i].dateTime = utils.dateIn(arrAux[i].dateTime);
        	arrAux[i].heads = Number(arrAux[i].heads);
        	arrAux[i].weight = Number(arrAux[i].weight);
        	arrAux[i].shrinkageId = Number(arrAux[i].shrinkageId);
            }
        }
        return entityObj;
      }
      return null;
    },
    adapterToOut : function(entityObj) {
	if(arrAux = entityObj.Shrinkage){
	    for(var i=0;i<arrAux.length;i++){
		arrAux[i].dateTime = utils.dateTimeOut(arrAux[i].dateTime);		
	    }
	}
	return entityObj;
    },
    isPenActiveInInventory:function(sPen){
	for(var i=0;i<this.arrObj.length;i++){
	    if(("" + this.arrObj[i].pen.locationId + this.arrObj[i].pen.barnyardCode) == sPen){		
		return true;		
	    }
	}
	return false;
    },
    getPensList:function(){
	var arrInventory = [];
	var arrActivePens=[];
	arrInventory = enyo.clone(this.arrObj);
	for(var i=0;i<arrInventory.length;i++){
	    var obj={
		caption:arrInventory[i].pen.barnyardCode,
		value:arrInventory[i].pen.penId
	    };
	    obj.object = arrInventory[i];
	    arrActivePens.push(obj);
	}
	return arrActivePens;
    },
    getByPen:function(sPen){
	for(var i=0;i<this.arrObj.length;i++){
	    if(("" + this.arrObj[i].pen.locationId + this.arrObj[i].pen.barnyardCode) == sPen){		
		return this.arrObj[i];
	    }
	}
	return null;
    }
  });
var crudInventory = new crud.inventory();