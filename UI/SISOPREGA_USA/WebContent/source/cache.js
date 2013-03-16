enyo.kind(
  {
    name : "cache",
    gblLabel : null,
    gblToaster : null,
    gblScrim : null,
    loggedUser : null,
    mainView : null,
    setGlobalLabel : function(objVar) {
      this.gblLabel = objVar;
    },
    setGlobalScrim : function(objVar) {
      this.gblScrim = objVar;
    },
    showScrim : function() {
      this.gblScrim.show();
    },
    hideScrim : function() {
      this.gblScrim.hide();
    },
    setGlobalToaster : function(objVar) {
      this.gblToaster = objVar;
    },
    setMessage : function(iType, sMsg) {
      this.gblToaster.msgMain.setContent(sMsg);
      this.gblToaster.toastMain.open();
    },
    goBack : function() {
      if (_gobackStack.length > 0) {
        var objGB = _gobackStack.pop();
        this.gblLabel.setContent(objGB.caption);
        objGB.paneMan.selectViewByName(objGB.paneName);
        if (objGB.cbObj) {
          objGB.cbObj[objGB.cbMethod]();
        }
      }
    }
  });
var cacheMan = new cache();