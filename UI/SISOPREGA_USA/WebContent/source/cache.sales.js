enyo.kind({
    name : "cache.sales",
    cacheData : [ {
	sale_id : 1,
	buyer : "Hascon",
	seller : "",
	cattleName : "Novillos",
	heads : 127,
	weight : 45590,
	aveweight : 359.0,
	saledate : "01/01"
    }, {
	sale_id : 2,
	buyer : "Welton",
	seller : "",
	cattleName : "Novillos",
	heads : 178,
	weight : 95130,
	aveweight : 534.4,
	saledate : "01/01"
    }, {
	sale_id : 3,
	buyer : "Friona",
	seller : "",
	cattleName : "Novillos",
	heads : 219,
	weight : 97220,
	aveweight : 443.9,
	saledate : "01/01"
    }, {
	sale_id : 4,
	buyer : "Alvaro Bustillos",
	cattleName : "Novillos",
	heads : 13,
	weight : 9055,
	aveweight : 696.5,
	saledate : "01/01"
    } ],
    createData : function() {
    },
    readData : function() {
	return this.cacheData;
    },
    sell : function(objSale, cbObj, cbMethod) {
	this.cacheData.push(objSale);
	for(var i=0;i<objSale.detail.length;i++){
	    if(!cachePen.substractHeadsInPen(objSale.detail[i].corral,objSale.detail[i].cabezas)){
		return false;
	    }
	}
	if (cbMethod) {
	    cbObj[cbMethod]();
	}
	return true;
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
var cacheSales = new cache.sales();