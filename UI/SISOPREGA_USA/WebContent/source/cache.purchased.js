enyo.kind({
	name: "cache.purchased",
	cacheData:null,
	createData:function(){
	},	
	readData:function(){
		var arrData=[{inventory:[{seller:"Inventory",cattle_class:"Novillos",heads:109,weight:40650,aveweight:372.9,reweight:536},],
		                 purchased:[{seller:"SB Livestock Co/Castro",cattle_class:"Novillos",heads:68,weight:30150,aveweight:443.4},
		  						    {seller:"Ganaderia Apaloosa",cattle_class:"Novillos",heads:126,weight:61590,aveweight:422.6},
									{seller:"El Paso Cattle",cattle_class:"Novillos",heads:78,weight:32960,aveweight:422.6},
									{seller:"Alvaro Bustillos",cattle_class:"Novillos",heads:232,weight:105499,aveweight:454.7}]}];
	},
	updateData:function(){
	},
	deleteData:function(){
	},	
	adapter:function(arrData){
		var arrNewData=[];
		var i=0;
		for(var objData in arrData){			
			arrNewData[i]=objData;
			i++;
		}		
		return arrNewData;
	}
});
var cachePur=new cache.purchased();