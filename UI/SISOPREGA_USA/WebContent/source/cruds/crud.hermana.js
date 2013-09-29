enyo.kind(
  {
    name : "crud.hermana",
    kind : "crud.summarized",
    published :
      {
        entityName : "Hermana",
      // createKindName : "operations.purchase.form",
      },
    calculateSummary : function() {
      var heads = 0;
      var weight = 0;
      var objSummary =
        {
          heads : 0,
          weight : 0
        };
      for ( var i = 0; i < this.arrObj.length; i++) {
        for ( var j = 0; j < this.arrObj[i].HermanaCorte.length; j++) {
          heads += Number(this.arrObj[i].HermanaCorte[j].heads);
          weight += Number(this.arrObj[i].HermanaCorte[j].weight);
        }
      }
      objSummary.heads = heads;
      objSummary.weight = weight;
      
      this.setObjSummary(objSummary);
      
    },
    adapterToIn : function(entityObj) {
      if (entityObj) {
        entityObj = this.inherited(arguments);
        var sellerName = '';
        if (crudRancher.getByID(entityObj.rancherId) != null) sellerName = crudRancher.getByID(entityObj.rancherId).name;
        
        if (crudEnterpriseRancher.getByID(entityObj.rancherId)) sellerName = crudEnterpriseRancher.getByID(entityObj.rancherId).name;
        
        entityObj.seller = sellerName;
        
        entityObj.purchaseDate = utils.dateIn(entityObj.deWhen);
        entityObj.aveweight = Number(entityObj.totalHeads) / Number(entityObj.totalWeight);
        return entityObj;
      }
      return null;
    },
    adapterToOut : function(entityObj) {
      return entityObj;
    },
    getCatalogsList : function() {
      
      var arrAdapterList = enyo.clone(this.arrObj);
      var result = [];
      
      for ( var i = 0; i < arrAdapterList.length; i++) {
        var obj = this.adapterToIn(arrAdapterList[i]);
        
        var rancher = crudRancher.getByID(arrAdapterList[i].rancherId);
        if(!rancher)
          rancher = crudEnterpriseRancher.getByID(arrAdapterList[i].rancherId);
        
        var cattleName = crudCattle.getByID(arrAdapterList[i].Reception[0].cattleType).catclassName;
        
        
        obj.importantInfo = "" + arrAdapterList[i].entryNo + " - " + rancher.name;
        obj.secundaryInfo = this.hermanaHeads(obj) + ' cabezas de ' + cattleName + ' : ' + this.hermanaWeight(obj) + ' lbs.';
        result.push(obj);
      }
      return result;
    },
    hermanaHeads : function(hermana){
      var result = 0;
      for(var i=0; i<hermana.HermanaCorte.length; i++){
        result += Number(hermana.HermanaCorte[i].heads);
      }
      return result;
    },
    hermanaWeight : function(hermana){
      var result = 0;
      for(var i=0; i<hermana.HermanaCorte.length; i++){
        result += Number(hermana.HermanaCorte[i].weight);
      }
      return result;
    },
    getAll : function(callbackObject, callbackMethod) {
      var filterDef =
        {
          entryNo : '*'
        }; // Always return all records
      this.isReady = false;
      
      if (callbackObject) {
        this.callbackObject = callbackObject;
        this.callbackMethod = callbackMethod;
      } else {
        this.callbackObject = null;
        this.callbackMethod = '';
      }
      
      if (callbackObject && callbackObject.parentObject != null) {
        consumingGateway.Read(callbackObject.parentObject.entityName, filterDef, this, "getCallBack");
      } else {
        consumingGateway.Read(this.entityName, filterDef, this, "getCallBack");
      }
    }
  });

var crudHermana = new crud.hermana();
