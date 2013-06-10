/*
 * common functionality for CRUD.
 * */
enyo.kind(
  {
    name : "crud.cache",
    entityName : "",
    arrObj : [],
    callbackObject: null,
    callbackMethod: '',
    alreadyLoaded:false,
    adapterToOut : function(entityObj) {
      return entityObj;
    },
    adapterToList : function(entityObj){
      return entityObj;
    },
    get : function(callbackObject, callbackMethod) {
      var filterDef = {}; // Always return all records
      
      if(callbackObject){
        this.callbackObject = callbackObject;
        this.callbackMethod = callbackMethod;
      } else {
        this.callbackObject = null;
        this.callbackMethod = '';
      }
      
      if(this.alreadyLoaded){
	if(this.callbackObject != null){
	    var milis = ((Math.random()*1000)+500);
	    setTimeout(this.callbackObject[this.callbackMethod](), milis);
	}else{
	    cacheMan.hideScrim();
	}
      } else{
	  consumingGateway.Read(this.entityName, filterDef, this, "getCallBack");  
      }
      
    },
    getCallBack : function(resultArray) {

      this.arrObj = [];
      for(var i = 0; i < resultArray.records.length; i++){
        var objAux = resultArray.records[i];
        var innerModelObj = this.adapterToIn(objAux);
        if(innerModelObj != null)
          this.arrObj.push(innerModelObj);
      }
      this.alreadyLoaded = true;
      
      if(this.callbackObject != null){
        var milis = ((Math.random()*1000)+500);
        setTimeout(this.callbackObject[this.callbackMethod](), milis);
      }else{
        cacheMan.hideScrim();
      }
      
    },
    getList : function(captionFieldName, valueFieldName) {
      var arrResult = [];
      for ( var i = 0; i < this.arrObj.length; i++) {
        var objTemp = this.adapterToList(this.arrObj[i]);
        arrResult.push(objTemp);
      }
      return arrResult;
    },
    create : function(objEntity,callbackObject, callbackMethod){
      cacheMan.showScrim();
      var outerObj = this.adapterToOut(objEntity);
      consumingGateway.Create(this.entityName, outerObj, callbackObject, callbackMethod);
    },
    update : function(objEntity){
      cacheMan.showScrim();
      var outerObj = this.adapterToOut(objEntity);
      consumingGateway.Update(this.entityName, outerObj, this, "saveCallBack");
    },
    remove : function(entityId){
      cacheMan.showScrim();
      var filterDef = { id: entityId };
      conumingGateway.Delete(this.entityName, filterDef, this, "saveCallBack");
    },
    saveCallBack : function (resultObj){
      this.get();
    }
  });