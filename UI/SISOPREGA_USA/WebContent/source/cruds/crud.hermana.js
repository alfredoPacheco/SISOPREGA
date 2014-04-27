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
      if(this.arrObj){
    	for ( var i = 0; i < this.arrObj.length; i++) {
    	  if(this.arrObj[i].HermanaCorte){
    		for ( var j = 0; j < this.arrObj[i].HermanaCorte.length; j++) {
              heads += utils.parseToNumber(this.arrObj[i].HermanaCorte[j].heads);
              weight += utils.parseToNumber(this.arrObj[i].HermanaCorte[j].weight);
            }
    	  }
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
        entityObj.aveweight = utils.parseToNumber(entityObj.totalHeads) / utils.parseToNumber(entityObj.totalWeight);
        
        if(entityObj.HermanaCorte){
          for ( var i = 0; i < entityObj.HermanaCorte.length; i++) {
            var corte = entityObj.HermanaCorte[i];
            corte.pen_name = crudPen.adapterToList(crudPen.getByID(corte.barnyardId)).caption;
            corte.cattleClassName = crudCattleQuality.getByID(corte.qualityId).qualityName;
          }  
        }
        
        if(entityObj.HermanaCorteExportador){
          for ( var i = 0; i < entityObj.HermanaCorteExportador.length; i++) {
            var corte = entityObj.HermanaCorteExportador[i];
            corte.cattleClassName = crudCattleQuality.getByID(corte.qualityId).qualityName;
          }  
        }
        
        if(entityObj.HermanaExpense){
          for(var i=0; i < entityObj.HermanaExpense.length; i++){
            var expenseConcept = crudExpenseConcept.getByID(entityObj.HermanaExpense[i].conceptId);
            if(expenseConcept){
              var conceptName = crudExpenseConcept.getByID(entityObj.HermanaExpense[i].conceptId).conceptName;
              entityObj.HermanaExpense[i].conceptName = conceptName;
            }
            entityObj.HermanaExpense[i].price = entityObj.HermanaExpense[i].amount;
            entityObj.HermanaExpense[i].expenseConceptId = entityObj.HermanaExpense[i].conceptId;
          }  
        }
        
        
        for ( var i = 0; i < entityObj.Reception.length; i++) {
          var cattleName = crudCattle.getCattleTypeById(entityObj.Reception[i].cattleType).cattypeName;
          
          entityObj.cattleClassName = cattleName;
          entityObj.cattleClass = entityObj.Reception[i].cattleType;
          
          if (entityObj.Reception[i].ReceptionHeadcount) {
            var heads = 0;
            var weight = 0;
            for ( var j = 0; j < entityObj.Reception[i].ReceptionHeadcount.length; j++) {
              heads += utils.parseToNumber(entityObj.Reception[i].ReceptionHeadcount[j].hc);
              weight += utils.parseToNumber(entityObj.Reception[i].ReceptionHeadcount[j].weight);
            }
            entityObj.Reception[i].heads = heads;
            entityObj.Reception[i].weight = weight;
          } else {
            entityObj.Reception[i].heads = 0;
            entityObj.Reception[i].weight = 0;
          }
          
          if(entityObj.Reception[i].Inspection){
            var rejects_heads=0;
            var rejects_weight=0;
            for(var j=0;j<entityObj.Reception[i].Inspection.length;j++){
              if(entityObj.Reception[i].Inspection[j].InspectionDetails){
                for(var k=0;k<entityObj.Reception[i].Inspection[j].InspectionDetails.length;k++){
                  rejects_heads += utils.parseToNumber(entityObj.Reception[i].Inspection[j].InspectionDetails[k].hc);
                  rejects_weight += utils.parseToNumber(entityObj.Reception[i].Inspection[j].InspectionDetails[k].weight);
                }
              }
            }
            entityObj.Reception[i].rejects_heads = rejects_heads;
            entityObj.Reception[i].rejects_weight =entityObj.Reception[i].Inspection[0].weight; //TODO: Double check if there is only one Inspection
          }else{
            entityObj.Reception[i].rejects_heads = 0;
            entityObj.Reception[i].rejects_weight = 0;
          }
        }
        
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
        if (!rancher) rancher = crudEnterpriseRancher.getByID(arrAdapterList[i].rancherId);
        
        var cattleName = crudCattle.getCattleTypeById(arrAdapterList[i].Reception[0].cattleType).cattypeName;
        
        obj.importantInfo = "" + arrAdapterList[i].entryNo + " - " + rancher.name;
        obj.secundaryInfo = this.hermanaHeads(obj) + ' cabezas de ' + cattleName + ' : ' + Number(this.hermanaWeight(obj)).toFixed(0) + ' lbs.';
        result.push(obj);
      }
      return result;
    },
    hermanaHeads : function(hermana) {
      var result = 0;
      for ( var i = 0; i < hermana.HermanaCorte.length; i++) {
        result += utils.parseToNumber(hermana.HermanaCorte[i].heads);
      }
      return result;
    },
    hermanaWeight : function(hermana) {
      var result = 0;
      for ( var i = 0; i < hermana.HermanaCorte.length; i++) {
        result += utils.parseToNumber(hermana.HermanaCorte[i].weight);
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
