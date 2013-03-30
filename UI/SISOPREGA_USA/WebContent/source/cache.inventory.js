enyo.kind({
	name: "cache.inventory",
	cacheData:null,
	createData:function(){
	},	
	readData:function(){
		var arrData=[{barnyards:["B8"],cattle_class:"Novillos",cattle_type:"Minis",heads:2,weight:395,
						avgweight:197.5,feed:6,buyers:[],trucks:[]},
					{barnyards:["B8"],cattle_class:"Novillos",cattle_type:"215's",heads:11,weight:3005,
						avgweight:273.2,feed:45,buyers:[],trucks:[]},
					{barnyards:["B1","B12","C2","WB6"],cattle_class:"Novillos",cattle_type:"315's",heads:127,weight:45590,
						avgweight:359.0,feed:0,buyers:[{name:"Hasco",heads:127}],trucks:["Paez Truck"]},						
					{barnyards:["B7","C4","WB10","H7"],cattle_class:"Novillos",cattle_type:"400's",heads:219,weight:97220,
						avgweight:443.9,feed:0,buyers:[{name:"Neely",heads:219}],trucks:["La Canada","Eastmann Truck"]},
					{barnyards:["B13","B25","B27","C5","C8","WB8"],cattle_class:"Novillos",cattle_type:"500's",heads:178,weight:95130,
						avgweight:534.4,feed:0,buyers:[{name:"Welton",heads:178}],trucks:["VMMA","Miller Truck"]},
					{barnyards:["B19"],cattle_class:"Novillos",cattle_type:"615's",heads:13,weight:9055,
						avgweight:696.5,feed:0,	buyers:[{name:"Alvaro Bustillos",heads:13},],trucks:[]},
					{barnyards:["C25B"],cattle_class:"Novillos",cattle_type:"43's",heads:7,weight:3275,
						avgweight:467.9,feed:49,	buyers:[],trucks:[]},																			
					{barnyards:["B6"],cattle_class:"Novillos",cattle_type:"Cuts",heads:5,weight:2035,
						avgweight:407.0,feed:31,buyers:[],trucks:[]},
					{barnyards:["EPCC's"],cattle_class:"Novillos",cattle_type:"Sin 2's",heads:23,weight:6440,
						avgweight:280.0,feed:0,buyers:[],trucks:[]},
					{barnyards:["EPCC's"],cattle_class:"Novillos",cattle_type:"43's",heads:26,weight:8530,
						avgweight:328.1,feed:0,buyers:[],trucks:[]},																																						
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
var cacheInv=new cache.inventory();