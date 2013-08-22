enyo.kind(
  {
    name : "crud.summarized",
    kind : "crud",
    objSummary : {},
    published :
    {
      objSummary : null,
      dataLoaded: false
    },
    getCallBack : function(resultArray) {
      this.arrObj = [];
      for ( var i = 0; i < resultArray.records.length; i++) {
        var objAux = resultArray.records[i];
        var innerModelObj = this.adapterToIn(objAux);
        if (innerModelObj != null) this.arrObj.push(innerModelObj);
      }
      
      if (this.callbackObject != null) {
        var milis = ((Math.random() * 1000) + 500);
        this.calculateSummary();
        this.setDataLoaded(true);
        setTimeout(this.callbackObject[this.callbackMethod](resultArray), milis);
      }
    }
  });