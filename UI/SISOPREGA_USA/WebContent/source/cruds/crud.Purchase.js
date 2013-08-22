enyo.kind(
  {
    name : "crud.purchase",
    kind : "crud.summarized",
    published :
      {
        entityName : "Purchase",
        createKindName : "operations.purchase.form",
      },
    calculateSummary : function() {
      var heads = 0;
      var weight = 0;
      for ( var i = 0; i < this.arrObj.length; i++) {
        for(var j=0; j < this.arrObj[i].PurchaseDetail.length; j++){
          heads += Number(this.arrObj[i].PurchaseDetail[j].heads);
          weight += Number(this.arrObj[i].PurchaseDetail[j].weight);
        }
      }
      var objSummary = {
          heads : heads,
          weight : weight
      };
      
      this.setObjSummary(objSummary);
      
    },
    adapterToIn : function(entityObj) {
      if (entityObj) {
        entityObj = this.inherited(arguments);
        var seller = null;
        if (seller = crudSeller.getByID(entityObj.supplierId)) {
          entityObj.seller = seller.sellerName;
        } else {
          entityObj.seller = "";
        }
        entityObj.purchaseDate = utils.dateIn(entityObj.purchaseDate);
        entityObj.aveweight = Number(entityObj.totalHeads) / Number(entityObj.totalWeight);
        return entityObj;
      }
      return null;
    },
    adapterToOut : function(entityObj) {
      return entityObj;
    },
  });

var crudPurchase = new crud.purchase();
