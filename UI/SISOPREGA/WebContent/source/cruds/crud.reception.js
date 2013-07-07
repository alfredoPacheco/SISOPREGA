enyo
	.kind({
	    name : "crud.reception",
	    kind : "crud",
	    published : {
		entityName : "Reception",
		createKindName : "operations.reception.form",
	    },
	    getCallBack : function(resultArray) {

		this.arrObj = [];
		for ( var i = 0; i < resultArray.records.length; i++) {
		    var objAux = resultArray.records[i];
		    var innerModelObj = this.adapterToIn(objAux);
		    if (innerModelObj != null)
			this.arrObj.push(innerModelObj);
		}

		crudPen.updateOccupiedBarnyards();

		if (this.callbackObject != null) {
		    var milis = ((Math.random() * 1000) + 500);
		    setTimeout(this.callbackObject[this.callbackMethod]
			    (resultArray), milis);
		}
	    },
	    getRanchersByReceptions : function() {
		var arrResult = [];
		var result = [];
		var arrReceptions = this.arrObj;

		for ( var i = 0; i < arrReceptions.length; i++) {
		    // TODO: Create getRancherByID
		    var obj = {
			value : arrReceptions[i].rancherId,
			caption : "getRancherByID"
		    };
		    if (!(arrResult[obj.value] in arrResult)) {
			arrResult[obj.value] = obj;
		    }
		}
		for ( var i = 0; i < arrResult.length; i++) {
		    result.push(arrResult[i]);
		}
		return result;
	    },
	    getByID : function(iID) {
		var arrTemp = [];
		arrTemp = enyo.clone(this.arrObj);
		for ( var i = 0; i < arrTemp.length; i++) {
		    if (arrTemp[i].receptionId == iID) {
			return arrTemp[i];
		    }
		}
		return null;
	    },
	    appendBY : function(objReception, objBY, cbObj, cbMethod) {

		for ( var sKey in objBY) {
		    var penToAppend = {};
		    penToAppend.penId = crudPen.getByBarnyard(sKey).penId;
		    objReception.Pen.push(penToAppend);
		    // TODO removed pushed if something goes wrong
		    // cacheBY.setOccupied(sKey, objReception.reception_id);
		    // objReception.barnyards[sKey] = objBY[sKey];
		}

		objReception = this.adapterToOut(objReception);
		this.update(objReception, cbObj, cbMethod);

	    },
	    adapterToOut : function(entityObj) {
		entityObj.dateAllotted = utils.dateOut(entityObj.dateAllotted);
		if (entityObj.FeedOrder) {
		    for ( var i = 0; i < entityObj.FeedOrder.length; i++) {
			entityObj.FeedOrder[i].feedDate = utils
				.dateOut(entityObj.FeedOrder[i].feedDate);
		    }
		}
		return entityObj;
	    },
	    adapterToIn : function(entityObj) {
		if(entityObj.Pen){
		    entityObj.penString = "";
			for(var i = 0; i<entityObj.Pen.length;i++){
			    entityObj.penString += "" + entityObj.Pen[i].locationId +entityObj.Pen[i].barnyardCode + ", "; 
			}
			if(entityObj.penString != "") entityObj.penString = entityObj.penString.slice(0,-2);    
		}
		entityObj.dateAllotted = utils.dateIn(entityObj.dateAllotted);
		
		if (entityObj.FeedOrder) {
		    for ( var i = 0; i < entityObj.FeedOrder.length; i++) {
			entityObj.FeedOrder[i].feedDate = utils
				.dateIn(entityObj.FeedOrder[i].feedDate);
		    }
		}
		return this.inherited(arguments);
	    },
	    getActiveBYForListByRancherID : function(rancher_id) {
		var result = [];
		var receptions = this.arrObj;
		for ( var i = 0; i < receptions.length; i++) {
		    if (receptions[i].rancherId == rancher_id) {
			var barnyards = receptions[i].Pen;
			if(barnyards){
			    for ( var j = 0; j < barnyards.length; j++) {
				    var barnyard = {
					caption : "",
					value : ""
				    };

				    barnyard.caption = ""
					    + barnyards[j].barnyardCode
					    + (Number(barnyards[j].locationId) == 1 ? " [Chihuahua]"
						    : " [Zona Sur]");
				    barnyard.value = barnyards[j].penId;
				    barnyard.barnyard_code = barnyards[j].barnyardCode;
				    barnyard.zone_id = barnyards[j].locationId;
				    result.push(barnyard);
				}    
			}else{
			    console.error("Error. No existe arreglo Pen en objeto Reception. {receptionId: " + receptions[i].receptionId + "}");
			}
		    }
		}
		return result;
	    }
	});
var crudReception = new crud.reception();