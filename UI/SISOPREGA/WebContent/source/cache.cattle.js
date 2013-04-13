enyo.kind(
  {
    name : "cache.cattle",
    arrCattleType : [],
    arrCattleClass : [],
    cattleTypeWasReadFromGateway : false,
    cattleClassWasReadFromGateway : false,
    cattleTypeAdapterToIn : function(objCattle) {

      var objNew =
        {
          cattype_id : objCattle.cattypeId,
          catclass_id : objCattle.catclassId,
          cattype_name : objCattle.cattypeName
        };

      return objNew;
    },
    cattleClassAdapterToIn : function(objCattle) {

      var objNew =
        {
          catclass_id : objCattle.catclassId,
          catclass_name : objCattle.catclassName
        };

      return objNew;
    },
    cattleTypeAdapterToOut : function(objCattle) {

      var objNew =
        {
          cattypeId : objCattle.cattype_id,
          catclassId : objCattle.catclass_id,
          cattypeName : objCattle.cattype_name
        };

      return objNew;
    },
    getCattleType : function() {
      if (this.cattleTypeWasReadFromGateway == false) {
        this.cattleTypeWasReadFromGateway = true;
        var objAux = {};
        var arrAux = [];
        var selfCacheCattle = this;

        var cgReadAll = consumingGateway.Read("CattleType", {});

        if (cgReadAll.exceptionId == 0) { //Read successfully
          jQuery.each(cgReadAll.records, function() {
            jQuery.each(this, function(key, value) {
              objAux[key] = value;
            });
            var objTmp = selfCacheCattle.cattleTypeAdapterToIn(objAux);
            arrAux.push(objTmp);
          });
        } else { //Error
          if (cgReadAll.exceptionId != "VAL02") { //No data found
            cacheMan.setMessage("", "[Exception ID: " + cgReadAll.exceptionId + "] Descripcion: " + cgReadAll.exceptionDescription);
          }
        }

        this.arrCattleType = arrAux;
        _arrCattleTypeList = arrAux;

      }

      return this.arrCattleType;
    },
    getCattleClass : function() {
      if (this.cattleClassWasReadFromGateway == false) {
        this.cattleClassWasReadFromGateway = true;
        var objAux = {};
        var arrAux = [];
        var selfCacheCattle = this;
        //Retrieve CattleType
        var cgReadAll = consumingGateway.Read("CattleClass", {});
        if (cgReadAll.exceptionId == 0) { //Read successfully
          jQuery.each(cgReadAll.records, function() {
            jQuery.each(this, function(key, value) {
              objAux[key] = value;
            });
            var objTmp = selfCacheCattle.cattleClassAdapterToIn(objAux);
            arrAux.push(objTmp);
          });
        } else { //Error
          if (cgReadAll.exceptionId != "VAL02") { //No data found
            cacheMan.setMessage("", "[Exception ID: " + cgReadAll.exceptionId + "] Descripcion: " + cgReadAll.exceptionDescription);
          }
        }

        this.arrCattleClass = arrAux;
        _arrCattleClassList = arrAux;

      }

      return this.arrCattleClass;
    },
    Create : function(objCat, cbObj, cbMethod) {

      var objToSend = this.cattleTypeAdapterToOut(objCat);
      delete objToSend.cattypeId;
      var cgCreate = consumingGateway.Create("CattleType", objToSend);
      if (cgCreate.exceptionId == 0) { //Created successfully
        objCat.cattype_id = cgCreate.generatedId;

        this.arrCattleType.push(objCat);
        _arrCattleTypeList = this.arrCattleType;
        if (cbMethod) {
          cbObj[cbMethod]();
        }
        return true;
      } else { //Error
        cacheMan.setMessage("", "[Exception ID: " + cgCreate.exceptionId + "] Descripcion: " + cgCreate.exceptionDescription);
        return false;
      }

    },
    upd : function(objOld, objNew, cbObj, cbMethod) {
      objNew.cattype_id = objOld.cattype_id;
      var objToSend = this.cattleTypeAdapterToOut(objNew);
      var cgUpdate = consumingGateway.Update("CattleType", objToSend);
      if (cgUpdate.exceptionId == 0) { //Updated successfully
        for (prop in objNew) {
          objOld[prop] = objNew[prop];
        }
        var tamanio = this.getCattleType().length;
        for ( var i = 0; i < tamanio; i++) {
          if (this.arrCattleType[i].cattype_id == objOld.cattype_id) {
            this.arrCattleType[i] = objOld;
            _arrCattleTypeList = this.arrCattleType;
            cbObj.objRan = objOld;
            if (cbMethod) {
              cbObj[cbMethod]();
            }
            return true;
          }
        }
        return false;
      } else { //Error			
        cacheMan.setMessage("", "[Exception ID: " + cgUpdate.exceptionId + "] Descripcion: " + cgUpdate.exceptionDescription);
        return false;
      }
    },
    getCattleClassLS : function() {
      var _arrCattleLS = [];
      var arrTemp = [];
      arrTemp = this.getCattleClass();
      for ( var i = 0; i < arrTemp.length; i++) {
        _arrCattleLS.push(
          {
            caption : arrTemp[i].catclass_name,
            value : arrTemp[i].catclass_id
          });
      }
      return _arrCattleLS;
    },
    getCattleTypeLS : function() {
      var _arrCattleLS = [];
      var arrTemp = [];
      arrTemp = this.getCattleType();
      for ( var i = 0; i < arrTemp.length; i++) {
        _arrCattleLS.push(
          {
            caption : arrTemp[i].cattype_name,
            value : arrTemp[i].cattype_id
          });
      }
      return _arrCattleLS;
    },
    getByID : function(iID) {
      for ( var i = 0; i < this.getCattleType().length; i++) {
        if (this.getCattleType()[i].cattype_id == iID) {
          return this.getCattleType()[i];
        }
      }
      return null;
    },
    getCattleClassByID : function(iID) {
      var arrTemp = [];
      arrTemp = this.getCattleClass();
      for ( var i = 0; i < arrTemp.length; i++) {
        if (arrTemp[i].catclass_id == iID) {
          return arrTemp[i];
        }
      }
      return null;
    },
    del : function(delObj, cbObj, cbMethod) {

      var objToSend = {};
      objToSend.cattypeId = delObj.cattype_id;

      var cgDelete = consumingGateway.Delete("CattleType", objToSend);
      if (cgDelete.exceptionId == 0) { //Deleted successfully
        var tamanio = this.getCattleType().length;
        for ( var i = 0; i < tamanio; i++) {
          if (this.arrCattleType[i].cattype_id == delObj.cattype_id) {
            this.arrCattleType.splice(i, 1);
            _arrCattleTypeList = this.arrCattleType;
            if (cbMethod) {
              cbObj[cbMethod]();
            }
            return true;
          }
        }
        return false;
      } else { //Error
        cacheMan.setMessage("", "[Exception ID: " + cgDelete.exceptionId + "] Descripcion: " + cgDelete.exceptionDescription);
        return false;
      }
    },
    findCattle : function(criteria) {
      var result = [];
      if (criteria != "") {
        var cattles = this.getCattleType();
        var pattern = new RegExp(criteria.trim(), "ig");
        for (property in cattles) {
          pattern.lastIndex = 0;
          if (pattern.test(cattles[property].cattype_name)) {
            var cattletype =
              {
                caption : cattles[property].cattype_name,
                value : cattles[property].cattype_id
              };
            result.push(cattletype);
          }
        }
      }
      return result;
    },
    getAllCattleType : function() {
      var result = [];
      var cattles = this.getCattleType();
      for (property in cattles) {
        var cattletype =
          {
            caption : cattles[property].cattype_name,
            value : cattles[property].cattype_id
          };
        result.push(cattletype);
      }
      return result;
    },
    refreshData : function() {
      this.cattleTypeWasReadFromGateway = false;
      this.cattleClassWasReadFromGateway = false;
      this.getCattleClass();
      this.getCattleType();
    }
  });
var cacheCattle = new cache.cattle();