enyo.kind({
	name: "cache.finance",
	cacheData:null,
	createData:function(){
	},	
	readData:function(){
		var arrData=[{rancher_id:1,rancher_name:"Takeshi Sendo 1",balance:39000,total:70000,currency:"MX",
		              charges:[{charge_id:1,charge_date:"01/12/2013",charge_desc:"Compra de Ganado",
					            amount:50000,pay:21000,currency:"MX",
  					  			payments:[{payment_id:1,paymentDate:"01/01/2013",
								 paymentDesc:"Depositado en la tarjeta de Sendo",
								 paymentTypeID:1,paymentType:"Transeferencia",transactID:123,amount:21000}]},
					  		   {charge_id:2,charge_date:"01/13/2013",charge_desc:"Compra de Ganado",
							   amount:20000,pay:10000,currency:"MX",
							    payments:[{payment_id:1,paymentDate:"01/01/2013",
								 paymentDesc:"Entregado a Aoki",
								 paymentTypeID:1,paymentType:"Efectivo",transactID:123,amount:10000}]},]},
					 {rancher_id:1,rancher_name:"Takeshi Sendo 1",balance:39000,total:70000,currency:"MX",
		              charges:[{charge_id:1,charge_date:"01/12/2013",charge_desc:"Compra de Ganado",
					            amount:50000,pay:21000,currency:"MX",
  					  			payments:[{payment_id:1,paymentDate:"01/01/2013",
								 paymentDesc:"Depositado en la tarjeta de Sendo",
								 paymentTypeID:1,paymentType:"Transeferencia",transactID:123,amount:21000}]},
					  		   {charge_id:2,charge_date:"01/13/2013",charge_desc:"Compra de Ganado",
							   amount:20000,pay:10000,currency:"MX",
							    payments:[{payment_id:1,paymentDate:"01/01/2013",
								 paymentDesc:"Entregado a Aoki",
								 paymentTypeID:1,paymentType:"Efectivo",transactID:123,amount:10000}]},]},														
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
var cacheFin=new cache.finance();