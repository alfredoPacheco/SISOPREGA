enyo.kind({
	name: "cache.pen", 
	isOccupied: function(penName){
		//TODO:Utilizar webservice para consultar ocupacidad del corral.
		return false;
	}

});
var cachePen=new cache.pen();