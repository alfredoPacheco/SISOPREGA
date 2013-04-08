enyo.kind({
    name : "cache.shipments",
    lastID:4,
    cacheData : [ {
	shipment_id : 1,
	buyer : "Hascon",
	depdate : "01/01",
	deptime : "09:00",
	truck : "PAEZ Truck",
	cattleName : "Novillos",
	heads : 127,
	weight : 45520,
	aveweight : 359
    }, {
	shipment_id : 2,
	buyer : "Welton",
	depdate : "01/01",
	deptime : "11:00",
	truck : "La Canada",
	cattleName : "Novillos",
	heads : 178,
	weight : 95130,
	aveweight : 534.4
    }, {
	shipment_id : 3,
	buyer : "Nely",
	depdate : "01/01",
	deptime : "12:00",
	truck : "VMMA",
	cattleName : "Novillos",
	heads : 219,
	weight : 97220,
	aveweight : 443.9
    }, {
	shipment_id : 4,
	buyer : "Alvaro Bustillos",
	depdate : "01/01",
	deptime : "13:00",
	truck : "Pendiente",
	cattleName : "Novillos",
	heads : 13,
	weight : 9055,
	aveweight : 696.5
    } ],
    createData : function(obj) {
	obj.shipment_id = ++this.lastID;
	this.cacheData.push(obj);
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