enyo.kind(
  {
    name : "crud.hermana",
    kind : "crud.summarized",
    published :
      {
        entityName : "Hermana",
        //createKindName : "operations.purchase.form",
      },
    calculateSummary : function() {
      var heads = 0;
      var weight = 0;
      var objSummary = {
          heads: 0,
          weight:0
      };
      for ( var i = 0; i < this.arrObj.length; i++) {
        for(var j=0; j < this.arrObj[i].HermanaCorte.length; j++){
          heads += Number(this.arrObj[i].HermanaCorte[j].heads);
          weight += Number(this.arrObj[i].HermanaCorte[j].weight);
        }
      }
      objSummary.heads = heads;
      objSummary.weigth = weight;
      
      this.setObjSummary(objSummary);
      
    },
    adapterToIn : function(entityObj) {
      if (entityObj) {
        entityObj = this.inherited(arguments);
        var sellerName = '';
        if(crudRancher.getByID(entityObj.rancherId)!=null)
          sellerName = crudRancher.getByID(entityObj.rancherId).name;
        
        if(crudEnterpriseRancher.getByID(entityObj.rancherId))
          sellerName = crudEnterpriseRancher.getByID(entityObj.rancherId).name;
        
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
  });

var crudHermana = new crud.hermana();
