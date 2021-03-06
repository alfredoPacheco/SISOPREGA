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
		    // Create getRancherByID
		    var rancher = crudRancher.getByID(arrReceptions[i].rancherId);
		    if (rancher == null) {
			rancher = crudEnterpriseRancher.getByID(arrReceptions[i].rancherId);
		    }
		    
		    var rancherName = rancher.name;
		    var obj = {
			value : arrReceptions[i].rancherId,
			caption : rancherName
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
				.dateTimeOut(entityObj.FeedOrder[i].feedDate);
		    }
		}
		if (entityObj.Inspection) {
		    for ( var i = 0; i < entityObj.Inspection.length; i++) {
			entityObj.Inspection[i].inspectionDate = utils
				.dateOut(entityObj.Inspection[i].inspectionDate);
		    }
		}
		return entityObj;
	    },
	    adapterToIn : function(entityObj) {
		if (entityObj.Pen) {
		    entityObj.penString = "";
		    for ( var i = 0; i < entityObj.Pen.length; i++) {
			entityObj.penString += ""
				+ entityObj.Pen[i].barnyardCode + ", ";
		    }
		    if (entityObj.penString != "")
			entityObj.penString = entityObj.penString.slice(0, -2);
		}
		entityObj.dateAllotted = utils.dateIn(entityObj.dateAllotted);

		if (entityObj.FeedOrder) {
		    for ( var i = 0; i < entityObj.FeedOrder.length; i++) {
			entityObj.FeedOrder[i].feedDate = 
			    new Date(utils.parseToNumber(entityObj.FeedOrder[i].feedDate));
		    }
		}
		if (entityObj.Inspection) {
		    for ( var i = 0; i < entityObj.Inspection.length; i++) {
			entityObj.Inspection[i].inspectionDate = utils
				.dateIn(entityObj.Inspection[i].inspectionDate);
		    }
		}

		entityObj.color = entityObj.color || utils.colorStack.pop();
		return this.inherited(arguments);
	    },
	    getActiveBYForListByRancherID : function(rancher_id) {
		var result = [];
		var receptions = this.arrObj;
		for ( var i = 0; i < receptions.length; i++) {
		    if (receptions[i].rancherId == rancher_id) {
			var barnyards = receptions[i].Pen;
			if (barnyards) {
			    for ( var j = 0; j < barnyards.length; j++) {
				var barnyard = {
				    caption : "",
				    value : ""
				};

				barnyard.caption = ""
					+ barnyards[j].barnyardCode
					+ (utils.parseToNumber(barnyards[j].locationId) == 1 ? " [Chihuahua]"
						: " [Zona Sur]");
				barnyard.value = barnyards[j].penId;
				barnyard.barnyard_code = barnyards[j].barnyardCode;
				barnyard.zone_id = barnyards[j].locationId;
				result.push(barnyard);
			    }
			} else {
			    console
				    .error("Error. No existe arreglo Pen en objeto Reception. {receptionId: "
					    + receptions[i].receptionId + "}");
			}
		    }
		}
		return result;
	    },
	    releasePens : function(objReception, arrPens, objCallBack, sMethod) { // arrPens
										    // {1E9:
										    // "1E9",
										    // 1E11:
										    // "1E11"}
		var objRec = enyo.clone(objReception);
		for (sPen in arrPens) {
		    if (arrPens.hasOwnProperty(sPen)) {
			var objPen = crudPen.getByBarnyard(sPen);
			if (objPen) {
			    for ( var i = 0; i < objRec.Pen.length; i++) {
				if (objRec.Pen[i].penId == objPen.penId) {
				    objRec.Pen.splice(i, 1);
				}
			    }
			}
		    }
		}
		this.update(objRec, objCallBack, sMethod);
	    },
	    releaseAllPensInReception : function(objReception, objCallBack,
		    sMethod) {
		var objRec = enyo.clone(objReception);
		delete objRec.Pen;
		this.update(objRec, objCallBack, sMethod);
	    },
	    getReceptionsByRancherID : function(rancher_id) {
		var result = [];
		var receptions = enyo.clone(this.arrObj);
		for ( var i = 0; i < receptions.length; i++) {
		    if (receptions[i].rancherId == rancher_id) {
			result.push(receptions[i]);
		    }
		}
		return result;
	    },
	});
var crudReception = new crud.reception();