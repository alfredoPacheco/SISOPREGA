enyo
	.kind(
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
		  heads += utils.parseToNumber(this.arrObj[i].heads);
		  weight += utils.parseToNumber(this.arrObj[i].weight);
		  feed += utils.parseToNumber(this.arrObj[i].feed);
		}

		var objSummary =
		{
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

		  entityObj.aveweight = utils.parseToNumber(entityObj.weight) /utils.parseToNumber(entityObj.heads);

		  var cattle_name = crudCattle.getCattleTypeById(entityObj.cattypeId);
		  if (cattle_name) {
			cattle_name = cattle_name.cattypeName;
		  } else {
			cattle_name = "";
		  }
		  entityObj.cattle_name = cattle_name;
		  
		  var quality_name = crudCattleQuality.getByID(entityObj.qualityId);
		  if (quality_name) {
			quality_name = quality_name.qualityName;
		  } else {
			quality_name = "";
		  }
		  entityObj.quality_name = quality_name;
		  
		  
		  if (arrAux = entityObj.Shrinkage) {
			for ( var i = 0; i < arrAux.length; i++) {
			  arrAux[i].dateTime = utils.dateIn(arrAux[i].dateTime);
			  arrAux[i].heads = utils.parseToNumber(arrAux[i].heads);
			  arrAux[i].weight = utils.parseToNumber(arrAux[i].weight);
			  arrAux[i].shrinkageId = utils.parseToNumber(arrAux[i].shrinkageId);
			}
		  }

		  if (arrAux = entityObj.FeedUS) {
			for ( var i = 0; i < arrAux.length; i++) {
			  arrAux[i].dateTime = utils.dateIn(arrAux[i].dateTime);
			  arrAux[i].quantity = utils.parseToNumber(arrAux[i].quantity);
			  arrAux[i].feedUSId = utils.parseToNumber(arrAux[i].feedUSId);
			}
		  }
		  
		  switch(entityObj.sourceType){
		  case '1': //HERMANA
			var rancher = crudRancher.getByID(entityObj.sourceProvider);
			if(rancher==null) rancher = crudEnterpriseRancher.getByID(entityObj.sourceProvider);
			entityObj.sourceProviderName = rancher.name;
			break;
		  case '2': //PURCHASE
			entityObj.sourceProviderName = crudSeller.getByID(entityObj.sourceProvider).sellerName;
			break;
		  case '3': //RESORT
			//entityObj.sourceProviderName = crudRancher.getByID(entityObj.sourceProviderName).name;
			break;
		  }
		  
		  return entityObj;
		}
		return null;
	  },
	  adapterToOut : function(entityObj) {
		if (arrAux = entityObj.Shrinkage) {
		  for ( var i = 0; i < arrAux.length; i++) {
			arrAux[i].dateTime = utils.dateTimeOut(arrAux[i].dateTime);
		  }
		}
		if (arrAux = entityObj.FeedUS) {
		  for ( var i = 0; i < arrAux.length; i++) {
			arrAux[i].dateTime = utils.dateTimeOut(arrAux[i].dateTime);
		  }
		}
		return entityObj;
	  },
	  isPenActiveInInventory : function(sPen) {
		for ( var i = 0; i < this.arrObj.length; i++) {
		  if (("" + this.arrObj[i].pen.locationId + this.arrObj[i].pen.barnyardCode) == sPen) {
			return true;
		  }
		}
		return false;
	  },
	  getPensList : function() {
		var arrInventory = [];
		var arrActivePens = [];
		arrInventory = enyo.clone(this.arrObj);
		for ( var i = 0; i < arrInventory.length; i++) {
		  var obj = crudPen.adapterToList(arrInventory[i].pen);
//		  {
//			caption : arrInventory[i].pen.barnyardCode,
//			value : arrInventory[i].pen.penId
//		  };
		  obj.object = arrInventory[i];
		  arrActivePens.push(obj);
		}
		return arrActivePens;
	  },
	  getByPen : function(sPen) {
		for ( var i = 0; i < this.arrObj.length; i++) {
		  if (("" + this.arrObj[i].pen.locationId + this.arrObj[i].pen.barnyardCode) == sPen) {
			return this.arrObj[i];
		  }
		}
		return null;
	  },
	  getCallBack : function(resultArray) {
		this.arrObj = [];
		for ( var i = 0; i < resultArray.records.length; i++) {
		  var objAux = resultArray.records[i];
		  var innerModelObj = this.adapterToIn(objAux);
		  if (innerModelObj != null)
			this.arrObj.push(innerModelObj);
		}

		for ( var i = 0; i < this.arrObj.length; i++) {
		  if (this.arrObj[i].FeedUS) {
			this.arrObj[i].FeedUS.sort(function(a, b) {
			  return a.feedUSId > b.feedUSId;
			});
		  }
		}

		if (this.callbackObject != null) {
		  var milis = ((Math.random() * 1000) + 500);
		  this.calculateSummary();
		  this.setDataLoaded(true);
		  setTimeout(this.callbackObject[this.callbackMethod](resultArray),
			  milis);
		}
	  },
	  getActiveQualitiesList : function() {
		var arrInventory = [];
		var arrActiveQualities = [];
		arrInventory = enyo.clone(this.arrObj);
		for ( var i = 0; i < arrInventory.length; i++) {
		  var bAlreadyPushed = false;
		  for ( var j = 0; j < arrActiveQualities.length; j++) {
			if (utils.parseToNumber(arrActiveQualities[j].value) == utils.parseToNumber(arrInventory[i].qualityId)) {
			  bAlreadyPushed = true;
			}
		  }
		  if (!bAlreadyPushed) {
			var obj =
			{
			  caption : crudCattleQuality.getByID(arrInventory[i].qualityId).qualityName,
			  value : arrInventory[i].qualityId,
			  cattleTypeId: arrInventory[i].cattypeId
			};
			obj.object = arrInventory[i];
			arrActiveQualities.push(obj);
		  }
		}
		return arrActiveQualities;
	  },
	  getActiveCattlesList : function() {
		var arrInventory = [];
		var arrActiveCattles = [];
		arrInventory = enyo.clone(this.arrObj);
		for ( var i = 0; i < arrInventory.length; i++) {
		  var bAlreadyPushed = false;
		  for ( var j = 0; j < arrActiveCattles.length; j++) {
			if (utils.parseToNumber(arrActiveCattles[j].value) == utils.parseToNumber(arrInventory[i].cattypeId)) {
			  bAlreadyPushed = true;
			}
		  }
		  if (!bAlreadyPushed) {
			var obj =
			{
			  caption : crudCattle.getCattleTypeById(arrInventory[i].cattypeId).cattypeName,
			  value : arrInventory[i].cattypeId
			};
			arrActiveCattles.push(obj);
		  }
		}
		return arrActiveCattles;
	  }

	});
var crudInventory = new crud.inventory();