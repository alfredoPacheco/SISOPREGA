enyo.kind({
    name : "cache.pen",
    arrObj : [],
    readFromGateway : true,
    isOccupied : function(by) {
	var arrE = this.get();
	for (var i = 0; i < arrE.length; i++){
	    if (by == arrE[i].barnyard[by]){
	return true;
	}
    }
	return false;
    },
    getOccupiedBY:function(){
	var arrE = this.get();
	for (var i = 0; i < arrE.length; i++){
	    for(var j in arrE[i].barnyard){
		if (arrE[i].barnyard.hasOwnProperty(j)){
		    console.debug(arrE[i].barnyard[j]);    
		}
		
	    }
	}
    },
    get : function (){
	if (this.readFromGateway){
	    this.arrObj = this.getTest(12);
	    this.readFromGateway = false;
	}
	return this.arrObj;
    },
    getByBarnyard : function (by){
	for (var i = 0; i < this.arrObj.length; i++){
	    if (by == this.arrObj[i].barnyard[by]){
		return this.arrObj[i];
	    }
	}
    },
    getTest : function (qty) {
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
	        var mockWeight = Math.floor((Math.random()*450)+100) * mockHeads;
	        var mockRejects = Math.floor(Math.random()*5);
	        var mockRejectsWeight = Math.floor((Math.random()*450)+100) * mockRejects;
	        var numCorral = Math.floor((Math.random() * 12) + 1);
	        var barnyard = [];
	        	barnyard["1" + "C" + numCorral] = "1" + "C" + numCorral; 
	        var mockObj =
	          {
	            recordId : i,
	            cattleType : mockCattleType,
	            cattleName : mockCattleName,
	            heads : mockHeads,
	            weight: mockWeight,
	            rejects : mockRejects,
	            rejectsWeight : mockRejectsWeight,
	            barnyard : barnyard,
	            occupied : 1
	          };
	        result.push(mockObj); 
	      }
	      return result;
    },
    create: function (Obj){
	this.arrObj.push(Obj);
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
    }

});
var cachePen = new cache.pen();
