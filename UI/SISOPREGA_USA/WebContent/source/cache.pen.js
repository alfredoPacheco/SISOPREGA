enyo.kind({
	name: "cache.pen", 
	isOccupied: function(penName){
		//TODO:Utilizar webservice para consultar ocupacidad del corral.
		var aleatorio = Math.floor((Math.random()*10)+1);// generar un aleatorio entre el 1 y 10. 
		return aleatorio == 1; // ocupado si el aleatorio es 1. 
		
	}

});
var cachePen=new cache.pen();