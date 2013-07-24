enyo.kind({
	name: "cache.sales.price",
	cacheData:null,
	createData:function(){
	},	
	readData:function(){
		var arrData=[{purchase_id:1,purchase_date:"01/01/2013",rancher_name:"Mashiba",heads:700,weight:50000,average:71.42,
		              cattle:[{cpurchase_id:1,cattle_type:"Novillos",heads:300,weight:2000,average:6,price:1},
					  		  {cpurchase_id:1,cattle_type:"Vacas Locas",heads:300,weight:2000,average:6,price:0},
							  {cpurchase_id:1,cattle_type:"Carne de Rata",heads:300,weight:2000,average:6,price:0}							  
							  ]},
					];
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
var cacheSP=new cache.sales.price();