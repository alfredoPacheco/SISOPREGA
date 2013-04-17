enyo.kind({
    name : "cache.shipments",
    lastID:3,
    cacheData : [ {
	aveWeight: 1.01,
	buyer: "sexto cliente",
	cattleName: "Caballos",
	releaseDate : new Date(),
	shipCarrier: "Chofer 1",
	shipProgramDateTime: new Date(),
	shipment_id: 1,
	totalHeads: 123,
	totalWeight: 123.23,
	truck: ""
    },{
	aveWeight: 1.01,
	buyer: "sexto cliente",
	cattleName: "Caballos",
	releaseDate : new Date(),
	shipCarrier: "Chofer 1",
	shipProgramDateTime: new Date(),
	shipment_id: 2,
	totalHeads: 123,
	totalWeight: 123.23,
	truck: ""
    },
    {
	aveWeight: 1.01,
	buyer: "sexto cliente",
	cattleName: "Caballos",
	releaseDate : new Date(),
	shipCarrier: "Chofer 1",
	shipProgramDateTime: new Date(),
	shipment_id: 3,
	totalHeads: 123,
	totalWeight: 123.23,
	truck: ""
    } ],
    createData : function(obj) {
	obj.shipment_id = ++this.lastID;
	this.cacheData.push(obj);
    },
    releaseShip:function(objShip, cbObj, cbMethod){
	if(cbMethod){
	    cbObj[cbMethod]();
	}
    },
    readData : function() {
	return this.cacheData;
    },
    updateData : function() {
    },
    deleteData : function() {
    },
    adapter : function(arrData) {
	var arrNewData = [];
	var i = 0;
	for ( var objData in arrData) {
	    arrNewData[i] = objData;
	    i++;
	}
	return arrNewData;
    }
});
var cacheShip = new cache.shipments();