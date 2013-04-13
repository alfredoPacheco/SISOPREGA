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
	totalHeads : 127,
	totalWeight : 45520,
	aveWeight : 359
    }, {
	shipment_id : 2,
	buyer : "Welton",
	depdate : "01/01",
	deptime : "11:00",
	truck : "La Canada",
	cattleName : "Novillos",
	totalHeads : 178,
	totalWeight : 95130,
	aveWeight : 534.4
    }, {
	shipment_id : 3,
	buyer : "Nely",
	depdate : "01/01",
	deptime : "12:00",
	truck : "VMMA",
	cattleName : "Novillos",
	totalHeads : 219,
	totalWeight : 97220,
	aveWeight : 443.9
    }, {
	shipment_id : 4,
	buyer : "Alvaro Bustillos",
	depdate : "01/01",
	deptime : "13:00",
	truck : "Pendiente",
	cattleName : "Novillos",
	totalHeads : 13,
	totalWeight : 9055,
	aveWeight : 696.5
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