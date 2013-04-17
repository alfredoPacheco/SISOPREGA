enyo.kind({
    name : "cache.shipments",
    lastID : 2,
    cacheData : [ {
	aveWeight : 1.01,
	buyer : "terecer clinet",
	carrier : "Transportista 1",
	cattleName : "Vaquillas",
	driver : "un chofer",
	plates : "234567",
	releaseDate : new Date(), 	//IMPORTANT: this field is the flag for knowing when a shipment has been released
	shipCarrier : "Transportista 1",
	shipProgramDateTime : new Date(),
	shipment_id : 1,
	totalHeads : 123,
	totalWeight : 123.23
    }, {
	aveWeight: 1.01,
	buyer: "sexto cliente",
	cattleName: "Caballos",
	shipCarrier: "Transportista 2",
	shipProgramDateTime: new Date(),
	shipment_id: 2,
	totalHeads: 123,
	totalWeight: 123.23,
    }],
    createData : function(obj) {
	obj.shipment_id = ++this.lastID;
	this.cacheData.push(obj);
    },
    releaseShip : function(objShip, cbObj, cbMethod) {
	if (cbMethod) {
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