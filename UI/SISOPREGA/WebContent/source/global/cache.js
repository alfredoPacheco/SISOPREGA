var _arrFeed = [ {
    feed_id : 1,
    feed_desc : "MOLIDA",
    feed_units : "KG"
}, {
    feed_id : 2,
    feed_desc : "ALFALFA",
    feed_units : "PACAS"
}, {
    feed_id : 3,
    feed_desc : "AVENA",
    feed_units : "PACAS"
}, {
    feed_id : 4,
    feed_desc : "CONCENTRADO",
    feed_units : "SACOS"
}, {
    feed_id : 5,
    feed_desc : "MAIZ",
    feed_units : "KG"
} ];
var _arrZones = [ {
    zone_id : 1,
    zone_name : "Chihuahua"
}, {
    zone_id : 2,
    zone_name : "Zona Sur"
} ];

var _objMainHeader;
var _objPopupHeader;
var _gobackStack = [];
var _navigatingBack = false;
enyo.kind({
    name : "cache",
    gblLabel : null,
    gblToaster : null,
    gblScrim : null,
    arrLocations : [],
    locationsReadedFromGateway : false,
    setGlobalLabel : function(objVar) {
	this.gblLabel = objVar;
    },
    setGlobalScrim : function(objVar) {
	this.gblScrim = objVar;
    },
    showScrim : function() {
	this.gblScrim.showAtZIndex(32000);
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
	_navigatingBack = true;
	if (_gobackStack.length > 0) {
	    var objGB = _gobackStack.pop();
	    objGB.paneMan.selectViewByName(objGB.paneName);
	    _navigatingBack = false;
	    this.gblLabel.setContent(objGB.caption);
	    if (objGB.cbObj) {
		objGB.cbObj[objGB.cbMethod]();
	    }
	}
    },
    goHome : function() {
	if (_gobackStack.length > 0) {
	    var objGB = _gobackStack[0];
	    objGB.paneMan.selectViewByName(objGB.paneName);
	    this.gblLabel.setContent(objGB.caption);
	    _gobackStack = [];
	    if (objGB.cbObj) {
		objGB.cbObj[objGB.cbMethod]();
	    }
	}
    },
    getZonesLS : function() {
	this.updateZonesLS();
	return _arrZonesLS;
    },
    updateZonesLS : function() {
	_arrZonesLS = [];
	for ( var i = 0; i < _arrZones.length; i++) {
	    _arrZonesLS.push({
		caption : _arrZones[i].zone_name,
		value : _arrZones[i].zone_id
	    });
	}
    },
    getZones : function() {
	return _arrZones;
    },
    getZoneByID : function(iZoneID) {
	for ( var i = 0; i < this.getZones().length; i++) {
	    if (this.getZones()[i].zone_id == iZoneID) {
		return this.getZones()[i];
	    }
	}
    },
    findZone : function(criteria) {
	var result = [];
	if (criteria != "") {
	    var zones = _arrZones;
	    var pattern = new RegExp(criteria.trim(), "ig");
	    for (property in zones) {
		pattern.lastIndex = 0;
		if (pattern.test(zones[property].zone_name)) {
		    var zone = {
			caption : zones[property].zone_name,
			value : zones[property].zone_id
		    };
		    result.push(zone);
		}
	    }
	}
	return result;
    },
    getAllZonesForList : function() {
	var result = [];
	var zones = _arrZones;
	for (property in zones) {
	    var zone = {
		caption : zones[property].zone_name,
		value : zones[property].zone_id
	    };
	    result.push(zone);
	}
	return result;
    },
    getLocations : function() {
	if (this.locationsReadedFromGateway == false) {
	    this.locationsReadedFromGateway = true;
	    var arrAux = [];

	    var cgReadAll = consumingGateway.Read("Location", {});

	    if (cgReadAll.exceptionId == 0) { // Read successfully
		for ( var i = 0; i < cgReadAll.records.length; i++) {
		    var objTmp = {};
		    objTmp.location_id = cgReadAll.records[i].locationId;
		    objTmp.location_name = cgReadAll.records[i].locationName;
		    arrAux.push(objTmp);
		}
	    } else { // Error
		if (cgReadAll.exceptionId != "VAL02") { // No data found
		    cacheMan.setMessage("", "[Exception ID: "
			    + cgReadAll.exceptionId + "] Descripcion: "
			    + cgReadAll.exceptionDescription);
		}
	    }
	    this.arrLocations = arrAux;
	}
	return this.arrLocations;
    },
    createLocation : function(objLocation) {
	var objToSend = {};
	objToSend.locationName = objLocation.location_name;

	var cgCreate = consumingGateway.Create("Location", objToSend);
	if (cgCreate.exceptionId == 0) { // Created successfully
	    objToSend.location_id = cgCreate.generatedId;
	    this.arrLocations.push(objToSend);
	    return true;
	} else { // Error
	    cacheMan.setMessage("", "[Exception ID: " + cgCreate.exceptionId
		    + "] Descripcion: " + cgCreate.exceptionDescription);
	    return false;
	}
    },
    getLocationByID : function(iLocationID) {
	for ( var i = 0; i < this.getLocations().length; i++) {
	    if (this.getLocations()[i].location_id == iLocationID) {
		return this.getLocations()[i];
	    }
	}
    },
    getAllLocationsForList : function() {
	var result = [];
	var locations = this.getLocations();
	for (property in locations) {
	    var location = {
		caption : locations[property].location_name,
		value : locations[property].location_id
	    };
	    result.push(location);
	}
	return result;
    },
    getHighestZIndex : function() {
	var elements = document.getElementsByTagName("*");
	var highest_index = 0;

	for ( var i = 0; i < elements.length - 1; i++) {
	    if (parseInt(elements[i].style.zIndex) > highest_index) {
		highest_index = parseInt(elements[i].style.zIndex);
	    }
	}
	return highest_index;
    }
});

var cacheMan = new cache();