enyo.kind({
    name : "cache.shipments",
    lastID : 2,
    cacheData : [ 
//                 Correct model:
//                  {
//	aveWeight : 1.01,
//	buyer : "terecer clinet",
//	cattleName : "Vaquillas",
//	carrier:"Transportista 1",
//	driver : "un chofer",
//	plates : "234567",
//	releaseDate : new Date(), 	//IMPORTANT: this field is the flag for knowing when a shipment has been released
//	shipCarrier : "Transportista 1",
//	shipProgramDateTime : new Date(),
//	shipment_id : 1,
//	totalHeads : 123,
//	totalWeight : 123.23,
//	sale_id:7
//    }, 
//	Finish correct model
//{
//	aveWeight: 1.01,
//	buyer: "sexto cliente",
//	cattleName: "Caballos",
//	shipCarrier: "Transportista 2",
//	shipProgramDateTime: new Date(),
//	shipment_id: 2,
//	totalHeads: 123,
//	totalWeight: 123.23,
//    }
    ],
    createData : function(obj, cbObj, cbMethod) {
	obj.shipment_id = ++this.lastID;
	this.cacheData.push(obj);
	if (cbMethod) {
	    cbObj[cbMethod]();
	}
	return true;
    },
    releaseShip : function(objShip, cbObj, cbMethod) {
	if(!cachePen.substractHeadsInPen(cachePen.getByID(objShip[0].id_inventory).barnyard, objShip.totalHeads)){
	    return false;
	}
	
	if (cbMethod) {
	    cbObj[cbMethod]();
	}
    },
    removeShipBySale:function(sale_id){
	var len = this.cacheData.length;
	for(var i=0;i<len;i++){
	    if(this.cacheData[i].sale_id == sale_id){
		this.cacheData.splice(i,1);
		len--;
	    }
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