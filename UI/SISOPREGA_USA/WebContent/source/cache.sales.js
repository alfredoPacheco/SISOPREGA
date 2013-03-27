enyo.kind({
	name: "cache.sales",
	cacheData:null,
	createData:function(){
	},	
	readData:function(){
		var arrData=[{buyer:"ELLLC",seller:"",cattle_class:"Novillos",heads:126,weight:61590,aveweight:422.6},
					 {buyer:"ELLLC",seller:"",cattle_class:"Novillos",heads:78,weight:32960,aveweight:422.6},
					 {buyer:"ELLLC",seller:"",cattle_class:"Novillos",heads:232,weight:105499,aveweight:454.7}];
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
var cacheSales=new cache.sales();