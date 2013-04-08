enyo.kind({
	name: "cache.purchased",
	cacheData:null,
	createData:function(){
	},	
	readData:function(){
		var arrData=[{inventory:[{purdate:"01/01",seller:"Inventario",cattleName:"Novillos",heads:109,
					   			  weight:40650,aveweight:372.9,reweight:536,rtype:"inv"},],
		                 purchased:[{purdate:"01/02",seller:"SB Livestock Co/Castro",cattleName:"Novillos",heads:68,
						 			 weight:30150,aveweight:443.4},
		  						    {purdate:"01/02",seller:"Ganaderia Apaloosa",cattleName:"Novillos",heads:126,
									 weight:61590,aveweight:422.6},
									{purdate:"01/02",seller:"El Paso Cattle",cattleName:"Novillos",heads:78,
									 weight:32960,aveweight:422.6},
									{purdate:"01/02",seller:"Alvaro Bustillos",cattleName:"Novillos",heads:232,
									 weight:105499,aveweight:454.7}]}];
		arrData=arrData[0].inventory.concat(arrData[0].purchased);
		return arrData;									
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