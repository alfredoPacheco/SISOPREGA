enyo.kind({
    name : "cache.charges",
    arrObj : [],
	arrData : [{charge_id:1,charge_desc:"Cargo UNO",charge_price:1}, 
		               {charge_id:2,charge_desc:"Cargo DOS",charge_price:2},
					   {charge_id:3,charge_desc:"Cargo TRES",charge_price:3},
					   {charge_id:4,charge_desc:"Cargo CUATRO",charge_price:4}, 
					   {charge_id:5,charge_desc:"CARGO N",charge_price:1000}],
    getList : function() {
		var arrData=[];
		for ( var i = 0; i < this.arrData.length; i++) {
			var obj = {
				id:this.arrData[i].charge_id,
				value : this.arrData[i].charge_id,
				caption : this.arrData[i].charge_desc,
				charge_desc:this.arrData[i].charge_desc,				
				charge_price:this.arrData[i].charge_price,
			};
			arrData.push(obj);
		}					   
		return arrData;
    },
	addData:function(arrData,cbObj,cbFunction){
		//TODO:Sort
		this.arrData.push(arrData);
		cbObj[cbFunction]();
	}

});
var cacheCharges = new cache.charges();
