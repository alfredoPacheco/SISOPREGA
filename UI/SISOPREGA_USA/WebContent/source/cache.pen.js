enyo.kind({
    name : "cache.pen",
    arrObj : [],
    readFromGateway : true,
    lastID : 0,
    isOccupied : function(by) {
	var arrPens = this.get();
	for ( var i = 0; i < arrPens.length; i++) {
	    if (by == arrPens[i].barnyard[by]) {
		return true;
	    }
	}
	return false;
    },
    getOccupiedBY : function() {
	var arrPens = this.get();
	for ( var i = 0; i < arrPens.length; i++) {
	    for ( var j in arrPens[i].barnyard) {
		if (arrPens[i].barnyard.hasOwnProperty(j)) {
		    console.debug(arrPens[i].barnyard[j]);
		}
	    }
	}
    },
    get : function() {
	if (this.readFromGateway) {
	    this.arrObj = this.getTest(12);
	    this.readFromGateway = false;
	}
	return this.arrObj;
    },
    getByBarnyard : function(by) {
	for ( var i = 0; i < this.arrObj.length; i++) {
	    if (by == this.arrObj[i].barnyard[by]) {
		return this.arrObj[i];
	    }
	}
    },
    getTest : function(qty) {
	var result = [];
	for ( var i = 0; i < qty; i++) {
	    var mockCattleType = Math.floor((Math.random() * 4) + 1);
	    var mockCattleName = 'Novillos';
	    switch (mockCattleType) {
	    case 1:
		mockCattleName = "Novillos";
		break;
	    case 2:
		mockCattleName = "Vaquillas";
		break;
	    case 3:
		mockCattleName = "Caballos";
		break;
	    default:
		mockCattleName = "Novillos";
		mockCattleType = 1;
	    }

	    var mockHeads = Math.floor((Math.random() * 350) + 150);
	    var mockWeight = Math.floor((Math.random() * 450) + 100)
		    * mockHeads;
	    var mockRejects = Math.floor(Math.random() * 5);
	    var mockRejectsWeight = Math.floor((Math.random() * 450) + 100)
		    * mockRejects;
	    var numCorral = Math.floor((Math.random() * 12) + 1);
	    var barnyard = [];
	    barnyard["1" + "C" + numCorral] = "1" + "C" + numCorral;
	    var mockObj = {
		recordId : ++this.lastID,
		cattleType : mockCattleType,
		cattleName : mockCattleName,
		heads : mockHeads,
		weight : mockWeight,
		rejects : mockRejects,
		rejectsWeight : mockRejectsWeight,
		barnyard : barnyard,
		feed : {
		    dateAndTime : null,
		    quantity : 0
		},
		occupied : 1
	    };
	    result.push(mockObj);
	}
	return result;
    },
    create : function(obj) {
	obj.recordId = ++this.lastID;
	this.arrObj.push(obj);
	return true;
    },
    update : function(objNew) {
	var arrPens = this.get();
	for ( var i = 0; i < arrPens.length; i++) {
	    if (objNew.recordId == arrPens[i].recordId) {
		arrPens[i] = objNew;
		return true;
	    }
	}
	return false;
    },
    movePen : function(objFrom, objTo, objMovement) {
	objFrom.heads = parseInt(objFrom.heads) - parseInt(objMovement.heads);
	objFrom.weight = parseInt(objFrom.weight) - parseInt(objMovement.weight);
	objTo.heads = parseInt(objTo.heads) + parseInt(objMovement.heads);
	objTo.weight = parseInt(objTo.weight) + parseInt(objMovement.weight);
	if (this.update(objFrom))
	    if (this.create(objTo))
		return true;
	return false;
    },
    getList : function() {
	var result = [];
	// TODO: Use web service to retrieve list of pens

	var pen_names = [ "EB1", "EB3", "EB5", "WB1", "WB3", "WB5" ];

	for ( var i = 0; i < pen_names.length; i++) {
	    var pen = {
		value : i,
		caption : pen_names[i]
	    };
	    result.push(pen);
	}

	return result;
    },
    addFeed : function(objPen, objFeed) {
	var obj = this.getByID(objPen.recordId);
	if (obj){
	    obj.feed = objFeed;
	    return true;
	}
	alert ("Error al intentar guardad el alimento");
	return false;
    },
    getByID : function(id) {
	for ( var i = 0; i < this.arrObj.length; i++) {
	    if (id == this.arrObj[i].recordId) {
		return this.arrObj[i];
	    }
	}
	return null;
    }

});
var cachePen = new cache.pen();
