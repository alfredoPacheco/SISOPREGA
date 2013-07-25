enyo.kind(
  {
    name : "cache.purchased",
    objPurchased :
      {
        inventory : {},
        purchased : []
      },
    createPurchase : function(objPurchase) {
      
      for ( var purIdx = 0; purIdx < this.objPurchased.purchased.length; purIdx++) {
        if (this.objPurchased.purchased[purIdx].cattleName == objPurchase.cattleName) {
          this.objPurchased.purchased[purIdx].heads = Number(this.objPurchased.purchased[purIdx].heads) + Number(objPurchase.heads);
          this.objPurchased.purchased[purIdx].weight = Number(this.objPurchased.purchased[purIdx].weight) + Number(objPurchase.weight);
          this.objPurchased.purchased[purIdx].aveweight = this.objPurchased.purchased[purIdx].weight / this.objPurchased.purchased[purIdx].heads;  
          return false;
        }
      }

      this.objPurchased.purchased.push(objPurchase);
      // TODO: Found record to add purchase based on type and class
      // TODO: Add heads and weight
      
    },
    setInventory : function(objInventory) {
      this.objPurchased.inventory = objInventory;
    },
    get : function() {
      // TODO: Retrieve from database.      
      return this.objPurchased;
    }
  });
var crudPurchase = new cache.purchased();