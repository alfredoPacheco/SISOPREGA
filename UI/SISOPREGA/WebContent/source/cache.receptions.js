enyo.kind(
  {
    name : "cache.receptions",
    arrObj : [],// _arrReceptionList,
    receptionWasReadFromGateway : false,
    inspectionWasReadFromGateway : false,
    arrObjWasFilledUpOnce : false,
    arrReception : [],
    reloadme : function() {
      // AJAX
    },
    receptionAdapterToIn : function(objReception) {
      var objNew =
        {
          reception_id : objReception.receptionId,
          rancher_id : objReception.rancherId,
          arrival_date : "" + utils.utcToNormalDate(objReception.dateAllotted),
          cattype_id : objReception.cattleType,
          location_id : objReception.locationId,
          zone_id : objReception.zoneId
        };
      var rancherAux = cacheRanchers.getByID(objNew.rancher_id);

      if (rancherAux.rancher_type == 1) {
        objNew.rancher_name = rancherAux.first_name + " " + rancherAux.last_name;
      } else {
        objNew.rancher_name = rancherAux.company_name;
      }

      objNew.cattype_name = cacheCattle.getByID(objNew.cattype_id).cattype_name;
      objNew.hc_aprox = "";
      objNew.location_name = cacheMan.getLocationByID(objNew.location_id).location_name;
      objNew.weights =
        [
          {
            hcw_id : undefined,
            hc : undefined,
            weight : undefined
          } ];
      objNew.barnyards = [];
      objNew.inspections = [];
      objNew.feed = [];
      objNew.color = utils.colorStack.pop();

      return objNew;
    },
    receptionBarnyardAdapterToIn : function(obj) {
      var objNew = {};
      objNew = obj;
      return objNew;
    },
    receptionHeadcountAdapterToIn : function(obj) {
      var objNew = {};
      objNew = obj;
      return objNew;
    },
    feedOrderAdapterToIn : function(obj) {
      var objNew = {};
      objNew = obj;
      return objNew;
    },
    feedOrderBarnyardAdapterToIn : function(obj) {
      var objNew = {};
      objNew = obj;
      return objNew;
    },
    feedOrderDetailsAdapterToIn : function(obj) {
      var objNew = {};
      objNew = obj;
      return objNew;
    },
    inspectionAdapterToIn : function(obj) {
      var objNew = {};
      objNew = obj;
      return objNew;
    },
    inspectionBarnyardAdapterToIn : function(obj) {
      var objNew = {};
      objNew = obj;
      return objNew;
    },
    inspectionDetailsAdapterToIn : function(obj) {
      var objNew = {};
      objNew = obj;
      return objNew;
    },
    receptionAdapterToOut : function(objReception) {

      var objNew =
        {
          receptionId : objReception.reception_id,
          rancherId : objReception.rancher_id,
          dateAllotted : "" + utils.dateOut(objReception.arrival_date),
          cattleType : objReception.cattype_id,
          locationId : objReception.location_id,
          zoneId : objReception.zone_id
        };

      return objNew;
    },
    receptionHeadcountAdapterToOut : function(obj) {
      var objNew =
        {
          headcountId : obj.hcw_id,
          receptionId : obj.reception_id,
          hc : obj.hc,
          weight : obj.weight,
          weightUom : 1
        };

      return objNew;
    },
    get : function() {
      if (this.arrObjWasFilledUpOnce == false) {
        this.arrObjWasFilledUpOnce = true;
        // receptions::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
        this.arrReception = this.getReception();

        var objAux = {};
        this.arrObj = [];

        for ( var a = 0; a<this.arrReception.length;a++) {
          objAux = this.arrReception[a];
          // barnyards::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
          var barnyardAux = this.getReceptionBarnyard(objAux.reception_id);
          for (var b = 0;b<barnyardAux.length;b++) {
            try {
              var barnyard = cacheBY.getByID(barnyardAux[b].barnyardId);
              objAux.barnyards["" + barnyard.zone_id + barnyard.barnyard_code] = "" + barnyard.zone_id + barnyard.barnyard_code;
            } catch (e) {
            }
          }
          // weight:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
          var arrHeadcountAux = this.getReceptionHeadcount(objAux.reception_id);
          for (var h=0;h<arrHeadcountAux.length;h++) {

            try {
              objAux.weights[0].hcw_id = arrHeadcountAux[h].headcountId;
              objAux.weights[0].hc = arrHeadcountAux[h].hc;
              objAux.weights[0].weight = arrHeadcountAux[h].weight;
            } catch (e) {
            }
          }
          if(objAux.weights) objAux.hc_aprox = objAux.weights[0].hc;
          // inspections::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
          // inspections:[{reject_desc:"ENFERMEDAD"}],
          var arrInspectionAux = this.getInspection(objAux.reception_id);
          for (var i=0;i<arrInspectionAux.length;i++) {
            var inspectionAux =
              {
                rejected_count : undefined,
                reject_id : undefined,
                feed_desc : undefined,
                id : undefined,
                weight : undefined,
                weight_uom : undefined
              };
            
              inspectionAux.inspectionDate = utils.utcToNormalDate(arrInspectionAux[i].inspectionDate);
              inspectionAux.comments = arrInspectionAux[i].comments;
              inspectionAux.rejected_id = arrInspectionAux[i].inspectionId;
              // arrFeedAux[i].receptionId;
            
            objAux.weight_rejected = arrInspectionAux[i].weight; //append field weight_rejected
            objAux.weight_rejected_uom = arrInspectionAux[i].weightUom; //append weight_rejected_uom field
            
            // inspections
            // Details::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
            var arrInspectionDetailsAux = this.getInspectionDetails(inspectionAux.rejected_id);

            for (var id=0; id<arrInspectionDetailsAux.length;id++) {
              inspectionAux.rejected_count = arrInspectionDetailsAux[id].hc;
              inspectionAux.reject_id = arrInspectionDetailsAux[id].inspectionCodeId;
              inspectionAux.reject_desc = arrInspectionDetailsAux[id].note;
              inspectionAux.id = arrInspectionDetailsAux[id].inspectionDetailsId;
              inspectionAux.weight = arrInspectionDetailsAux[id].weight;
              inspectionAux.weight_uom = arrInspectionDetailsAux[id].weightUom;
              objAux.inspections.push(enyo.clone(inspectionAux));
            }
          }

          // feedOrder:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
          var arrFeedAux = this.getFeedOrder(objAux.reception_id);
          for (var f=0; f<arrFeedAux.length;f++) {
            var feedAux = {};
//            try {
              feedAux.feeding_id = arrFeedAux[f].orderId;
              feedAux.handling = arrFeedAux[f].handling;
              feedAux.weight = arrFeedAux[f].weight;
              feedAux.dateAndTime = arrFeedAux[f].feedDate;
//            } catch (e) {
//            }
            // feedOrderBarnyard::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
            if (feedAux.feeding_id) {
              var arrFeedBarnyardAux = this.getFeedOrderBarnyard(feedAux.feeding_id);
              var feedBarnyardAux =
                {
                  barnyards : {}
                };
              for (var fb = 0; fb<arrFeedBarnyardAux.length;fb++) {
                var barnyardAux = cacheBY.getByID(arrFeedBarnyardAux[fb].barnyardId);
                feedBarnyardAux.barnyards["" + barnyardAux.zone_id + barnyardAux.barnyard_code] = "" + barnyardAux.zone_id
                    + barnyardAux.barnyard_code;

              }
              feedAux.barnyards = feedBarnyardAux.barnyards;
              // feedOrderDetails:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
              var arrFeedDetailsAux = this.getFeedOrderDetails(feedAux.feeding_id);
              var feedDetailsAux = {};
              var contAux = 1;
              for (var fd=0;fd<arrFeedDetailsAux.length;fd++) {
                feedDetailsAux[contAux] = {};
                feedDetailsAux[contAux].feed_desc = cacheFeed.getByID(arrFeedDetailsAux[fd].foodId).feed_desc;
                feedDetailsAux[contAux].feed_units = arrFeedDetailsAux[fd].quantity;
                feedDetailsAux[contAux].fod_id = arrFeedDetailsAux[fd].fodId;
                contAux++;
              }
              feedAux.feed = feedDetailsAux;
            }
            objAux.feed.push(feedAux);
          }
          this.arrObj.push(objAux);
          // var _arrBYOccupied={"1E5":{reception_id:1},
          // "_B21":{reception_id:2,accepted_count:"",inspections:[]},
          // feed:[{}]};
          for (sKey in objAux.barnyards) {
            cacheBY.arrObjInUse[sKey] =
              {
                reception_id : parseInt(objAux.reception_id)
              };// ,accepted_count:"",inspections:[],feed:[]};
          }
        }
      }
      return this.arrObj;
    },
    getReception : function() {

      if (this.receptionWasReadFromGateway == false) {
        this.receptionWasReadFromGateway = true;
        var arrAux = [];

        var cgReadAll = consumingGateway.Read("Reception", {});

        if (cgReadAll.exceptionId == 0) { // Read successfully
          for(var i = 0; i<cgReadAll.records.length; i++){
            if(cgReadAll.records[i])
              arrAux.push(this.receptionAdapterToIn(cgReadAll.records[i]));
          }
        } else { // Error
          if (cgReadAll.exceptionId != "VAL02") { // No data found
            cacheMan.setMessage("", "[Exception ID: " + cgReadAll.exceptionId + "] Descripción: " + cgReadAll.exceptionDescription);
          }
        }
        this.arrReception = arrAux;
      }
      return this.arrReception;
    },
    getReceptionBarnyard : function(recID) {

      var arrAux = [];
      var objToSend = {};
      objToSend.receptionId = recID;
      var cgReadAll = consumingGateway.Read("ReceptionBarnyard", objToSend);

      if (cgReadAll.exceptionId == 0) { // Read successfully
        for (var item = 0; item<cgReadAll.records.length;item++) {
          arrAux.push(this.receptionBarnyardAdapterToIn(cgReadAll.records[item]));

        }
      } else { // Error
        if (cgReadAll.exceptionId != "VAL02") { // No data found
          cacheMan.setMessage("", "[Exception ID: " + cgReadAll.exceptionId + "] Descripcion: " + cgReadAll.exceptionDescription);
        }
      }
      return arrAux;
    },
    getReceptionHeadcount : function(recID) {
      var arrAux = [];
      var objToSend = {};
      objToSend.receptionId = recID;
      var cgReadAll = consumingGateway.Read("ReceptionHeadcount", objToSend);

      if (cgReadAll.exceptionId == 0) { // Read successfully
        for(var item = 0 ; item < cgReadAll.records.length; item++){
          arrAux.push(this.receptionHeadcountAdapterToIn(cgReadAll.records[item]));
        }
      } else { // Error
        if (cgReadAll.exceptionId != "VAL02") { // No data found
          cacheMan.setMessage("", "[Exception ID: " + cgReadAll.exceptionId + "] Descripcion: " + cgReadAll.exceptionDescription);
        }
      }

      return arrAux;

    },
    getFeedOrder : function(recID) {

      var arrAux = [];
      var objToSend = {};
      objToSend.receptionId = recID;
      var cgReadAll = consumingGateway.Read("FeedOrder", objToSend);

      if (cgReadAll.exceptionId == 0) { // Read successfully
        for(var item=0; item<cgReadAll.records.length;item++) {
          arrAux.push(this.feedOrderAdapterToIn(cgReadAll.records[item]));
        }
      } else { // Error
        if (cgReadAll.exceptionId != "VAL02") { // No data found =
          // VAL02 for filter
          cacheMan.setMessage("", "[Exception ID: " + cgReadAll.exceptionId + "] Descripcion: " + cgReadAll.exceptionDescription);
        }
      }

      return arrAux;

    },
    getFeedOrderBarnyard : function(oID) {

      var arrAux = [];
      var objToSend = {};
      objToSend.orderId = oID;
      var cgReadAll = consumingGateway.Read("FeedOrderBarnyard", objToSend);

      if (cgReadAll.exceptionId == 0) { // Read successfully
        for(var item=0; item<cgReadAll.records.length;item++) {
          arrAux.push(this.feedOrderBarnyardAdapterToIn(cgReadAll.records[item]));
        }
      } else { // Error
        if (cgReadAll.exceptionId != "VAL02") { // No data found
          cacheMan.setMessage("", "[Exception ID: " + cgReadAll.exceptionId + "] Descripcion: " + cgReadAll.exceptionDescription);
        }
      }

      return arrAux;

    },
    getFeedOrderDetails : function(oID) {
      var arrAux = [];
      var objToSend = {};
      objToSend.orderId = oID;
      var cgReadAll = consumingGateway.Read("FeedOrderDetails", objToSend);

      if (cgReadAll.exceptionId == 0) { // Read successfully
        for(var item=0; item<cgReadAll.records.length;item++) {
          arrAux.push(this.feedOrderDetailsAdapterToIn(cgReadAll.records[item]));
        }
      } else { // Error
        if (cgReadAll.exceptionId != "VAL02") { // No data found
          cacheMan.setMessage("", "[Exception ID: " + cgReadAll.exceptionId + "] Descripcion: " + cgReadAll.exceptionDescription);
        }
      }

      return arrAux;

    },
    getInspection : function(recID) {

      var arrAux = [];
      var objToSend = {};
      objToSend.receptionId = recID;
      var cgReadAll = consumingGateway.Read("Inspection", objToSend);

      if (cgReadAll.exceptionId == 0) { // Read successfully
        for(var item=0; item<cgReadAll.records.length;item++) {
          arrAux.push(this.inspectionAdapterToIn(cgReadAll.records[item]));
        }
      } else { // Error
        if (cgReadAll.exceptionId != "VAL02") { // No data found =
          // VAL02 for filter
          cacheMan.setMessage("", "[Exception ID: " + cgReadAll.exceptionId + "] Descripcion: " + cgReadAll.exceptionDescription);
        }
      }

      return arrAux;

    },
    getInspectionBarnyard : function(recID) {

      var arrAux = [];
      var objToSend = {};
      objToSend.orderId = oID;
      var cgReadAll = consumingGateway.Read("InspectionBarnyard", objToSend);

      if (cgReadAll.exceptionId == 0) { // Read successfully
        for(var item=0; item<cgReadAll.records.length;item++) {
          arrAux.push(this.inspectionBarnyardAdapterToIn(cgReadAll.records[item]));
        }
      } else { // Error
        if (cgReadAll.exceptionId != "VAL02") { // No data found
          cacheMan.setMessage("", "[Exception ID: " + cgReadAll.exceptionId + "] Descripcion: " + cgReadAll.exceptionDescription);
        }
      }

      return arrAux;

    },
    getInspectionDetails : function(inspID) {

      var arrAux = [];
      
      if(!inspID)
        return arrAux;
      
      var objToSend = {};
      objToSend.inspectionId = inspID;
      var cgReadAll = consumingGateway.Read("InspectionDetails", objToSend);

      if (cgReadAll.exceptionId == 0) { // Read successfully
        for(var item=0; item<cgReadAll.records.length;item++) {
          arrAux.push(this.inspectionDetailsAdapterToIn(cgReadAll.records[item]));
        }
      } else { // Error
        if (cgReadAll.exceptionId != "VAL02") { // No data found
          cacheMan.setMessage("", "[Exception ID: " + cgReadAll.exceptionId + "] Descripcion: " + cgReadAll.exceptionDescription);
        }
      }

      return arrAux;
    },
    Create : function(objRec, cbObj, cbMethod) {
      var objToSend = this.receptionAdapterToOut(objRec);
      delete objToSend.receptionId;
      var cgCreate = consumingGateway.Create("Reception", objToSend);
      if (cgCreate.exceptionId == 0) { // Created successfully
        objRec.reception_id = cgCreate.generatedId;
        objRec.color = utils.colorStack.pop();
        for ( var sKey in objRec.barnyards) {
          if (!cacheBY.setOccupied(sKey, objRec.reception_id)) {
            cbObj["doCancel"]();
            return;
          }
        }

        if(this.createWeight(objRec.reception_id, objRec.weights[0])){
            if(objRec.weights[0].hc>0){
        	// Send communication to customer
                var today = new Date();
                var month = today.getMonth() + 1;
                var today_sf = month + '/' + today.getDate() + '/' + today.getFullYear();
                var report_name = 'GanadoRecibido?rancherId=' + objRec.rancher_id + '&amp;fromDate=' + today_sf + '&amp;toDate=' + today_sf;
                consumingGateway.SendReport(objRec.rancher_id, report_name);	
            }
        }

        this.arrObj.push(objRec);
        _arrReceptionList = this.arrObj;

        if (cbMethod) {
          cbObj[cbMethod]();
        }

        

        return true;
      } else { // Error
        cacheMan.setMessage("", "[Exception ID: " + cgCreate.exceptionId + "] Descripcion: " + cgCreate.exceptionDescription);
        return false;
      }
    },
    upd : function(objOld, objNew, cbObj, cbMethod) {
      objNew.reception_id = objOld.reception_id;
      var objToSend = this.receptionAdapterToOut(objNew);
      var cgUpdate = consumingGateway.Update("Reception", objToSend);
      if (cgUpdate.exceptionId == 0) { // Updated successfully
	  // TODO UPDATE WEIGHT
	  if (this.updateWeight(objOld.weights[0], objNew.weights[0], cbObj) == true) {
    		var resultPrompt = confirm("Ha editado la cantidad o peso, ¿Desea enviar un aviso al ganadero?");
    		if(resultPrompt){
    		    // Send communication to customer
    		    var today = new Date();
    		    var month = today.getMonth() + 1;
    		    var today_sf = month + '/' + today.getDate() + '/' + today.getFullYear();
    		    var report_name = 'GanadoRecibido?rancherId=' + objNew.rancher_id + '&amp;fromDate=' + today_sf + '&amp;toDate=' + today_sf;
    		    consumingGateway.SendReport(objNew.rancher_id, report_name);	
    		}
	  }
        for (prop in objNew) {
          objOld[prop] = objNew[prop];
        }
        var tamanio = this.get().length;
        for ( var i = 0; i < tamanio; i++) {
          if (this.arrObj[i].reception_id == objOld.reception_id) {
            this.arrObj[i] = objOld;
            _arrReceptionList = this.arrObj;
          }
        }
        if (cbMethod) {
          cbObj[cbMethod]();
        }
        return true;
      } else { // Error
        cacheMan.setMessage("", "[Exception ID: " + cgUpdate.exceptionId + "] Descripcion: " + cgUpdate.exceptionDescription);
        return false;
      }
    },
    getLS : function() {
      var _arrCattleLS = [];
      for ( var i = 0; i < this.get().length; i++) {
        _arrCattleLS.push(
          {
            caption : this.get()[i].cattype_name,
            value : this.get()[i].cattype_id
          });
      }
      return _arrCattleLS;
    },
    getByID : function(iID) {
      var arrTemp = [];
      arrTemp = this.get();
      for ( var i = 0; i < arrTemp.length; i++) {
        if (arrTemp[i].reception_id == iID) {
          return arrTemp[i];
        }
      }
      return null;
    },
    deleteByID : function(iID) {
      for ( var i = 0; i < this.get().length; i++) {
        if (this.get()[i].reception_id == iID) {
          this.get().splice(i, 1);
        }
      }
    },
    del : function(delObj, cbObj, cbMethod) {
      var objToSend = {};
      objToSend.receptionId = delObj.reception_id;

      var cgDelete = consumingGateway.Delete("Reception", objToSend);
      if (cgDelete.exceptionId == 0) { // Deleted successfully
        var tamanio = this.get().length;
        for ( var i = 0; i < tamanio; i++) {
          if (this.arrObj[i].reception_id == delObj.reception_id) {
            this.arrObj.splice(i, 1);
            _arrReceptionList = this.arrObj;
            if (cbMethod) {
              cbObj[cbMethod]();
            }
            return true;
          }
        }
        return false;
      } else { // Error
        cacheMan.setMessage("", "[Exception ID: " + cgDelete.exceptionId + "] Descripcion: " + cgDelete.exceptionDescription);
        return false;
      }
    },
    createWeight : function(receptionID, objWeight) {
      // AJAX
      var objToSend = objWeight;
      objToSend.reception_id = receptionID;
      objToSend = this.receptionHeadcountAdapterToOut(objToSend);
      delete objToSend.headcountId;
      var cgCreate = consumingGateway.Create("ReceptionHeadcount", objToSend);
      if (cgCreate.exceptionId == 0) { // Created successfully
        objWeight.hcw_id = cgCreate.generatedId;
        return true;
      } else { // Error
        cacheMan.setMessage("", "[Exception ID: " + cgCreate.exceptionId + "] Descripcion: " + cgCreate.exceptionDescription);
        return false;
      }
    },
    addWeight : function(objRec, objWeight, cbObj, cbMethod) {
      if (this.createWeight(objRec, objWeight) == true) {
        objRec.weights.push(objWeight);
        if (cbMethod) {
          cbObj[cbMethod]();
        }
      }
    },
    updateWeight : function(objOld, objNew, cbObj) {
	
	
	
	objNew.hcw_id = objOld.hcw_id;
	if(Number(objNew.hc)==Number(objOld.hc)){
	    if(Number(objOld.weight)==Number(objNew.weight)) {
		return false;
	    }
	}
	var objToSend = this.receptionHeadcountAdapterToOut(objNew);
	objToSend.receptionId = cbObj.objRec.reception_id;
	var cgUpdate = consumingGateway.Update("ReceptionHeadcount", objToSend);
	if (cgUpdate.exceptionId == 0) { // Updated successfully
	    for (prop in objNew) {
		objOld[prop] = objNew[prop];
	    }
	    return true;
	} else { // Error
	    cacheMan.setMessage("", "[Exception ID: " + cgUpdate.exceptionId + "] Descripcion: " + cgUpdate.exceptionDescription);
	    return false;
	}
    },
    deleteWeight : function(objRec, delObj, cbObj, cbMethod) {
      // AJAX
      // Update Local
      for ( var i = 0; i < objRec.weights.length; i++) {
        if (objRec.weights[i] === delObj) {
          objRec.weights.splice(i, 1);
          if (cbMethod) {
            cbObj[cbMethod]();
          }
          return true;
          break;
        }
      }
      if (cbMethod) {
        cbObj[cbMethod]();
      }
    },
    updateRejectsWeight:function(objReception, newRejectedWeight, cbObj, cbMethod){
    	var objToSend = {};
        var cgUpdate = null;
        
        objToSend.inspectionId = objReception.inspections[0].rejected_id;
        objToSend.receptionId = objReception.reception_id;
        objToSend.inspectionDate = "" + utils.dateOut(objReception.inspections[0].inspectionDate);
        objToSend.comments = objReception.inspections[0].comments;
        objToSend.weight = newRejectedWeight;        
        objToSend.weightUom="1";//TODO: Pending update weight_uom
        cgUpdate = consumingGateway.Update("Inspection", objToSend);

        if (cgUpdate.exceptionId == 0) { // Updated successfully
//          var tamanio = objRancher.billings.length;
//          for ( var i = 0; i < tamanio; i++) {
//            if (objRancher.billings[i].billing_id == objOld.billing_id) {
//              objRancher.billings[i] = objNew;
//              
//            }
//          }
          objReception.weight_rejected = newRejectedWeight;
          if (cbMethod) {
            cbObj[cbMethod]();
          }
          return true;
          
        } else { // Error
          cacheMan.setMessage("", "[Exception ID: " + cgUpdate.exceptionId + "] Descripcion: " + cgUpdate.exceptionDescription);
          return false;
        }
    },
    releaseReceptions : function(arrRec, cbObj, cbMethod) {
      // AJAX
      // Update Internal Object
      for ( var sKey in arrRec) {
        this.deleteByID(sKey);
      }
      if (cbMethod) {
        cbObj[cbMethod]();
      }
    },
    appendBY : function(objReception, objBY, cbObj, cbMethod) {

      for ( var sKey in objBY) {
        cacheBY.setOccupied(sKey, objReception.reception_id);
        objReception.barnyards[sKey] = objBY[sKey];
      }

      // cacheObj
      if (cbMethod) {
        cbObj[cbMethod]();
      }
    },
    createFeedOrder : function(objRec, objFeed) {
      var objToSend = {};
      objToSend.receptionId = objRec.reception_id;
      objToSend.handling = objFeed.handling;
      objToSend.feedDate = utils.dateTimeOut(objFeed.dateAndTime);
      
      var cgCreate = consumingGateway.Create("FeedOrder", objToSend);
      if (cgCreate.exceptionId == 0) { // Created successfully
        objFeed.feeding_id = cgCreate.generatedId;
        if (cacheReceptions.createFeedOrderBarnyard(cgCreate.generatedId, objFeed) == true) {
          if (cacheReceptions.createFeedOrderDetails(cgCreate.generatedId, objFeed) == true) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      } else { // Error
        cacheMan.setMessage("", "[Exception ID: " + cgCreate.exceptionId + "] Descripcion: " + cgCreate.exceptionDescription);
        return false;
      }
    },
    createFeedOrderBarnyard : function(order_id, objFeed) {
      var objToSend = {};
      objToSend.orderId = order_id;
      for (prop in objFeed.barnyards) {
        objToSend.barnyardId = cacheBY.getByBarnyard(objFeed.barnyards[prop]).barnyard_id;
        var cgCreate = consumingGateway.Create("FeedOrderBarnyard", objToSend);
        if (cgCreate.exceptionId != 0) { //error
          cacheMan.setMessage("", "[Exception ID: " + cgCreate.exceptionId + "] Descripcion: " + cgCreate.exceptionDescription);
          return false;
        }
      }
      return true;
    },
    createFeedOrderDetails : function(order_id, objFeed) {
      var objToSend = {};
      objToSend.orderId = order_id;

      for (obj in objFeed.feed) {
        objToSend.foodId = objFeed.feed[obj].feed_id;
        objToSend.quantity = objFeed.feed[obj].feed_units;

        var cgCreate = consumingGateway.Create("FeedOrderDetails", objToSend);
        if (cgCreate.exceptionId != 0) {
          cacheMan.setMessage("", "[Exception ID: " + cgCreate.exceptionId + "] Descripcion: " + cgCreate.exceptionDescription);
          return false;
        } else {
          objFeed.feed[obj].fod_id = cgCreate.generatedId;
        }
      }
      return true;

    },
    addFeed : function(objRec, objFeed, cbObj, cbMethod) {
      if (cacheReceptions.createFeedOrder(objRec, objFeed) == true) {
        objRec.feed.push(objFeed);
        if (cbMethod) {
          cbObj[cbMethod]();
        }
      }
    },
    updateFeedOrderDetails : function(order_id, objOld, objNew) {
      var objToSend = {};
      objToSend.orderId = order_id;

      for (obj in objNew.feed) {
        objToSend.foodId = objNew.feed[obj].feed_id;
        objToSend.quantity = objNew.feed[obj].feed_units;
        objToSend.fodId = objOld.feed[obj].fod_id;
        objNew.feed[obj].fod_id = objOld.feed[obj].fod_id;

        var cgUpdate = consumingGateway.Update("FeedOrderDetails", objToSend);
        if (cgUpdate.exceptionId != 0) {
          cacheMan.setMessage("", "[Exception ID: " + cgUpdate.exceptionId + "] Descripcion: " + cgUpdate.exceptionDescription);
          return false;
        }
      }
      return true;

    },
    updateFeed : function(objOld, objNew, cbObj, cbMethod) {
      objNew.feeding_id = objOld.feeding_id;
      var objToSend = {};
      objToSend.orderId = objNew.feeding_id;
      objToSend.handling = objNew.handling;
      objToSend.receptionId = cbObj._objRec.reception_id;

      var cgUpdate = consumingGateway.Update("FeedOrder", objToSend);
      if (cgUpdate.exceptionId == 0) { // Updated successfully
        this.updateFeedOrderDetails(objOld.feeding_id, objOld, objNew) == true;
        for (prop in objNew) {
          objOld[prop] = objNew[prop];
        }
      } else { // Error
        cacheMan.setMessage("", "[Exception ID: " + cgUpdate.exceptionId + "] Descripcion: " + cgUpdate.exceptionDescription);
        // return false;
      }
      if (cbMethod) {
        cbObj[cbMethod]();
      }

    },
    deleteFeed : function(arrFeed, objFeed, cbObj, cbMethod) {
      var objToSend = {};
      objToSend.orderId = objFeed.feeding_id;

      var cgDelete = consumingGateway.Delete("FeedOrder", objToSend);
      if (cgDelete.exceptionId == 0) { // Deleted successfully
        for ( var i = 0; i < arrFeed.length; i++) {
          if (arrFeed[i] === objFeed) {
            arrFeed.splice(i, 1);
            if (cbMethod) {
              cbObj[cbMethod]();
            }
            break;
          }
        }
      } else { // Error
        cacheMan.setMessage("", "[Exception ID: " + cgDelete.exceptionId + "] Descripcion: " + cgDelete.exceptionDescription);
      }
    },
    createInspection : function(objRec, objRej) {
      var objToSend = {};
      objToSend.receptionId = objRec.reception_id;
      objToSend.inspectionDate = "" + utils.dateOut(new Date());

      var cgCreate = consumingGateway.Create("Inspection", objToSend);
      if (cgCreate.exceptionId == 0) { // Created successfully
        objRej.rejected_id = cgCreate.generatedId;

        if (!objRej.inspectionDate)
          objRej.inspectionDate = "" + utils.dateOut(new Date());

        if (this.createInspectionBarnyard(cgCreate.generatedId, objRec) == true) {
          if (this.createInspectionDetails(cgCreate.generatedId, objRec, objRej) == true) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      } else { // Error
        cacheMan.setMessage("", "[Exception ID: " + cgCreate.exceptionId + "] Descripcion: " + cgCreate.exceptionDescription);
        return false;
      }
    },
    createInspectionBarnyard : function(inspection_id, objRec, objRej) {
      var objToSend = {};
      objToSend.inspectionId = inspection_id;
      for (prop in objRec.barnyards) {
        objToSend.barnyardId = cacheBY.getByBarnyard(objRec.barnyards[prop]).barnyard_id;
        var cgCreate = consumingGateway.Create("InspectionBarnyard", objToSend);
        if (cgCreate.exceptionId != 0) { // Created successfully
          cacheMan.setMessage("", "[Exception ID: " + cgCreate.exceptionId + "] Descripcion: " + cgCreate.exceptionDescription);
          return false;
        }
      }
      return true;
    },
    createInspectionDetails : function(inspection_id, objRec, objRej) {
      var objToSend = {};
      objToSend.inspectionId = objRej.rejected_id;
      objToSend.inspectionCodeId = objRej.reject_id;
      objToSend.hc = objRej.rejected_count;
      objToSend.weight = 2;
      objToSend.weightUom = 1;
      objToSend.note = objRej.reject_desc;

      var cgCreate = consumingGateway.Create("InspectionDetails", objToSend);
      if (cgCreate.exceptionId == 0) {
        objRej.id = cgCreate.generatedId;
        return true;
      } else { // Error
        cacheMan.setMessage("", "[Exception ID: " + cgCreate.exceptionId + "] Descripcion: " + cgCreate.exceptionDescription);
        return false;
      }

    },
    addReject : function(objRec, objReject, cbObj, cbMethod) {
      if (objReject) {
        if (this.createInspection(objRec, objReject) == true) {
          objRec.inspections.push(objReject);
          if (cbMethod) {
            cbObj[cbMethod]();
          }
        }
      }
    },
    updateReject : function(objRec, iInspIdx, objReject, cbObj, cbMethod) {
      var objToSend = {};
      objToSend.inspectionDetailsId = objRec.inspections[iInspIdx].id;
      objToSend.inspectionId = objRec.inspections[iInspIdx].rejected_id;
      objToSend.inspectionCodeId = objReject.reject_id;
      objToSend.hc = objReject.rejected_count;
      objToSend.weight = 2;
      objToSend.weightUom = 1;
      objToSend.note = objReject.reject_desc;

      var cgUpdate = consumingGateway.Update("InspectionDetails", objToSend);
      if (cgUpdate.exceptionId == 0) { // Updated successfully
        objRec.inspections[iInspIdx].rejected_count = objReject.rejected_count;
        objRec.inspections[iInspIdx].reject_id = objReject.reject_id;
        objRec.inspections[iInspIdx].reject_desc = objReject.reject_desc;
        if (cbMethod) {
          cbObj[cbMethod]();
        }
      } else { // Error
        cacheMan.setMessage("", "[Exception ID: " + cgUpdate.exceptionId + "] Descripcion: " + cgUpdate.exceptionDescription);
      }
    },
    deleteReject : function(arrRejects, objReject, cbObj, cbMethod) {

      var objToSend = {};
      objToSend.inspectionDetailsId = objReject.id;

      var cgDelete = consumingGateway.Delete("InspectionDetails", objToSend);
      if (cgDelete.exceptionId == 0) { // Deleted successfully

        for ( var i = 0; i < arrRejects.length; i++) {
          if (arrRejects[i] === objReject) {
            arrRejects.splice(i, 1);
            if (cbMethod) {
              cbObj[cbMethod]();
            }
            break;
          }
        }
      } else { // Error
        cacheMan.setMessage("", "[Exception ID: " + cgDelete.exceptionId + "] Descripcion: " + cgDelete.exceptionDescription);
      }
    },
    getActiveBYForListByRancherID : function(rancher_id) {
      var result = [];
      var receptions = this.get();
      for (var i= 0; i<receptions.length;i++) {
        if (receptions[i].rancher_id == rancher_id) {
          var barnyards = receptions[i].barnyards;
          for (property in barnyards) {
            var barnyard =
              {
                caption : "",
                value : ""
              };
            barnyard_id = cacheBY.getByBarnyard(barnyards[property]).barnyard_id;
            if (barnyards[property].charAt(0) == 1) {
              barnyard.caption = barnyards[property].substr(1) + " [Chihuahua]";
              barnyard.value = barnyard_id;
              barnyard.barnyard_code = barnyards[property].substr(1);
              barnyard.zone = "Chihuahua";
              barnyard.zone_id = barnyards[property].charAt(0);
              result.push(barnyard);
            } else {
              barnyard.caption = barnyards[property].substr(1) + " [Zona Sur]";
              barnyard.value = barnyard_id;
              barnyard.barnyard_code = barnyards[property].substr(1);
              barnyard.zone = "Zona Sur";
              barnyard.zone_id = barnyards[property].charAt(0);
              result.push(barnyard);
            }
          }
        }
      }
      return result;
    },
    getAllOriginForList : function() {
      var result = [];
      return result;
    },
    getReceptionsByRancherID : function(rancher_id) {
      var result = [];
      var receptions = this.get();
      for (var i =0;i<receptions.length;i++) {
        if (receptions[i].rancher_id == rancher_id) {
          result.push(receptions[i]);
        }
      }
      return result;
    },
    getRanchersByReceptions : function() {
      var arrResult = [];
      var result = [];
      var arrReceptions = this.get();

      for (var i =0;i<arrReceptions.length;i++) {
        for (j in arrReceptions[i].barnyards) {
          var obj =
            {
              value : arrReceptions[i].rancher_id,
              caption : arrReceptions[i].rancher_name
            };
          if (!(arrResult[obj.value] in arrResult)) {
            arrResult[obj.value] = obj;
          }
        }
      }

      for (var i = 0;i<arrResult.length;i++) {
        result.push(arrResult[i]);
      }

      return result;
    },
    refreshData : function() {
      this.receptionWasReadFromGateway = false;
      this.inspectionWasReadFromGateway = false;
      this.arrObjWasFilledUpOnce = false;
      this.get();
    },
    //ADE - Addd inspection comment
    addInspectionComment : function(receptionId, inspectionId, inspectionDate, comments) {
      var objToSend = {};
      objToSend.receptionId = receptionId;
      objToSend.inspectionId = inspectionId;
      objToSend.inspectionDate = utils.dateOut(inspectionDate);
      objToSend.comments = comments;
      var objData = consumingGateway.Update("Inspection", objToSend);
      if (objData.exceptionId == 0) {
        return true;
      } else {
        return false;
      }
    },
    sendInspectionReport : function(rancher_id) {
      // Send communication to customer
      var today = new Date();
      var month = today.getMonth() + 1;
      var today_sf = month + '/' + today.getDate() + '/' + today.getFullYear();
      var report_name = 'InspeccionGanado?rancherId=' + rancher_id + '&amp;fromDate=' + today_sf + '&amp;toDate=' + today_sf;
      consumingGateway.SendReport(rancher_id, report_name);
      cacheMan.setMessage("", "Aviso Enviado");
    }

  });

var cacheReceptions = new cache.receptions();