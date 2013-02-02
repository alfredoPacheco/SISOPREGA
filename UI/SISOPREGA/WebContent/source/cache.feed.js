enyo.kind({
	name: "cache.feed",
	arrObj:_arrFeed,
	feedWasReadFromGateway:false,
	reloadme:function(){
		//AJAX
	},	
	get:function(){
		
		return this.arrObj;
		
	},	
	Create:function(objCat,cbObj,cbMethod){
		//AJAX
		//SCRIM.on
		//scrimoff
		//chacheMan.showScrim();
		//chacheMan.hideScrim();
		this.arrObj.push(objCat);		
		if(cbMethod){
			cbObj[cbMethod]();
		}				
		return true;
	},
	upd:function(objOld,objNew,cbObj,cbMethod){
		//AJAX
		//Update Internal Object
		for (var sKey in objNew){
			objOld[sKey]=objNew[sKey];
		}
		if(cbMethod){
			cbObj[cbMethod]();
		}		
		return true;
		//return false;		
	},
	getLS:function(){
		var arrLS=[];
		for(var i=0;i<this.get().length;i++){		
			arrLS.push({caption:this.get()[i].feed_desc,
									value:this.get()[i].feed_id});
		}
		return arrLS;
	},
	getByID:function(iID){
		for(var i=0; i<this.get().length;i++){
			if (this.get()[i].feed_id==iID){
				return this.get()[i];
			}
		}
	},
	del:function(delObj,cbObj,cbMethod){		
		//AJAX
		//Update Internal Object	
		for(var i=0;i<this.get().length;i++){
			if(this.get()[i]===delObj){
				this.get().splice(i, 1);	
				if(cbMethod){
					cbObj[cbMethod]();
				}		
				return true;								
				break;
			}
		}
		return false;			
	}
});
var cacheFeed= new cache.feed();