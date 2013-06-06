enyo.kind({
    name : "catalogs.ranchersList",
    kind : enyo.VFlexBox,
    components:[{
	kind:"catalogs.list",
	name:"list",
	flex:1
    }],
    ready : function() {
	// Retrieve ranchers
	cacheRanchers.get(this, 'readCallback');
	// Retrieve enterprise ranchers
	cacheEnterpriseRanchers.get(this, 'readCallback');
    },
    on_select_item:function(inSender, objSel){
	console.debug("obj selected: ");
	console.debug(objSel);
    },
    on_click_add:function(){
	console.debug("click en add");
    },
    on_delete_item:function(inSender, objDel, cbObj, cbMethod){
	console.debug("delete obj:");
	console.debug(objDel);
	if(cbMethod){
	    cbObj[cbMethod]();
	}
	
    },
    readsReceived : 0,
    readCallback : function() {
	this.readsReceived++;
	if (this.readsReceived == 2) {
	    this.readsReceived = 0;
	    this.loadList();	    
	}
    },
    loadList : function() {
	var allItems = [];

	// Manually concat rancher array
	for ( var i = 0; i < cacheRanchers.arrObj.length; i++) {
	    var rancher = cacheRanchers.arrObj[i];
	    rancher.importantInfo = "" + rancher.name;
	    rancher.secundaryInfo = "" + rancher.phone_number || "";
	    allItems.push(rancher);
	}

	// Manually concat enterprise array
	for ( var i = 0; i < cacheEnterpriseRanchers.arrObj.length; i++) {
	    var rancher = cacheEnterpriseRanchers.arrObj[i];
	    rancher.importantInfo = "" + rancher.legalName;
	    rancher.secundaryInfo = "" + rancher.phone_number + "";
	    allItems.push(rancher);
	}

	this.$.list.setItems(allItems);
    },
});