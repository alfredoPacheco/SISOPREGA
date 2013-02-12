var _arrCattleReject=[{reject_id:1,reject_desc:"EMFERMEDAD"},
                      {reject_id:2,reject_desc:"HERIDA"},
                      {reject_id:3,reject_desc:"OTRAS"}];

var _arrFeed=[{feed_id:1,feed_desc:"MOLIDA",feed_units:"KG"},
			  {feed_id:2,feed_desc:"ALFALFA",feed_units:"PACAS"},
			  {feed_id:3,feed_desc:"AVENA",feed_units:"PACAS"},
			  {feed_id:4,feed_desc:"CONCENTRADO",feed_units:"SACOS"},			  
              {feed_id:5,feed_desc:"MAIZ",feed_units:"KG"}];			  
					  
var _arrBYOccupied={"1E5":{reception_id:1},
					"_B21":{reception_id:2,accepted_count:"",inspections:[]},
					 feed:[{}]};
var	_arrReceptionList=[
		{reception_id:1,rancher_id:1,
		 rancher_name:"BALDOR / DEL RIO MENDEZ ALAN", arrival_date:"2012-09-15",
		 cattype_id:1,cattype_name:"CABALLOS",hc_aprox:100,
		 location_id:1,location_name:"CHIHUAHUA",
		 weights:[{hcw_id:0,hc:50,weight:1234}],barnyards:{"1E5":"1E5"},
		 accepted_count:"",
		 inspections:[{rejected_id:1,rejected_count:1,reject_id:1,reject_desc:"ENFERMEDAD"}],
		 feed:[{feeding_id:1,barnyards:{"1E5":"1E5"},handling:"ETC",
		        feed:{"1":{feed_desc:"MOLIDA",feed_units:1}}}]		
		 },		
		{reception_id:2,rancher_id:2,
		 rancher_name:"FUERTE / TORRRES FUERTE DIEGO", arrival_date:"2012-09-16",
		 cattype_id:2,cattype_name:"LLEGUAS",hc_aprox:60,
		 location_id:2,location_name:"FORANEA",
		 weights:[{hcw_id:0,hc:50,weight:1234}],barnyards:{},
		 accepted_count:"",
		 inspections:[],
		 feed:[]		 
		 },
	];	

var _arrZones=[{zone_id:1,zone_name:"Chihuahua"},{zone_id:2,zone_name:"Zona Sur"}];

var _arrRancherList =[
					{rancher_id:1,aka:"BALDOR", first_name:"ALAN", last_name:"DEL RIO", mother_name:"MENDEZ",
					 email_add:"alan.delrio@hotmail.com", birth_date:"1985-09-15",rfc:"RIMA850915",
					 contacts:[],billing:{},rancher_type:1,phone_number:"6561234567",},		
					
					{rancher_id:2,aka:"FUERTE", first_name:"DIEGO", last_name:"TORRES", mother_name:"FUERTE",
					 email_add:"diego.torees.fuerte@gmail.com",birth_date:"1982-04-13",rfc:"TOFD820413",
					 contacts:[],billing:{},rancher_type:1,phone_number:"6561234567",},	
					 
					{rancher_id:3,aka:"SI", company_name:"VACA Y POLLITO",					 
					 contacts:[],billing:{},rancher_type:2,address_one:"",address_two:"",city_id:1,
					 zip_code:"UNZIP",rfc:"UNARFC",phone_number:"6561234567"},	
					];


_arrRancherList[0].contacts.push(enyo.clone(_arrRancherList[1]));
_arrRancherList[0].contacts.push(enyo.clone(_arrRancherList[1]));
_arrRancherList[1].contacts.push(enyo.clone(_arrRancherList[0]));
_arrRancherList[2].contacts.push(enyo.clone(_arrRancherList[0]));

var _arrCattleList=[
				{cattype_id: 1,cattype_name: "CABALLOS"}, 
				{cattype_id: 2,cattype_name: "LLEGUAS"}, 
				{cattype_id: 3,cattype_name: "TOROS"},  
				{cattype_id: 4, cattype_name: "VACAS"}, 				                                
			   ];
var _gobackStack=[];	

var _arrBarnyardsList=[
		{barnyard_id:1,barnyard_code:"A1",
		 barnyard_capacity:[{cattype_id:1,cattype_name:"CABALLOS",head_count:75}]},
		{barnyard_id:2,barnyard_code:"A2",
		 barnyard_capacity:[{cattype_id:4,cattype_name:"VACAS",head_count:50}]}
	];		

var _arrBarnyardsListCatalog=[
               		{barnyard_id:1,barnyard_code:"A1", zone_id: "1",
               		 barnyard_capacity:[{catclass_id:1,catclass_name:"EQUINO",head_count:75}]},
               		{barnyard_id:2,barnyard_code:"A2", zone_id: "2",
               		 barnyard_capacity:[{catclass_id:4,cattype_name:"BOVINO",head_count:50}]}
               	];	

var _objMainHeader;
var _objPopupHeader;


//function fillRancherLS(){
//	_arrRancherListLS=[];
//	for(var i=0;i<_arrRancherList.length;i++){		
//		if(_arrRancherList[i].rancher_type==1){
//			_arrRancherListLS.push({caption:_arrRancherList[i].last_name  +' '+
//											_arrRancherList[i].mother_name+' '+
//											_arrRancherList[i].first_name,
//									value:_arrRancherList[i].rancher_id});
//		}else{
//			_arrRancherListLS.push({caption:_arrRancherList[i].company_name,
//									value:_arrRancherList[i].rancher_id});				
//		}
//	}	
//}

enyo.kind({
	name: "cache",
	gblLabel:null,
	gblToaster:null,
	gblScrim:null,
	setGlobalLabel:function(objVar){
		this.gblLabel=objVar;
	},
	setGlobalScrim:function(objVar){
		this.gblScrim=objVar;
	},
//	clearBack:function(){
//		for(var i=0;i<_gobackStack.length;i++){
//			this.goBack();
//		}
//	},
	showScrim:function(){
		this.gblScrim.show();
	},
	hideScrim:function(){
		this.gblScrim.hide();
	},
	setGlobalToaster:function(objVar){
		this.gblToaster=objVar;
	},
	setMessage:function(iType,sMsg){
		this.gblToaster.msgMain.setContent(sMsg);
		this.gblToaster.toastMain.open();
	},
	goBack:function(){
		if(_gobackStack.length>0){
			var objGB=_gobackStack.pop();		
			this.gblLabel.setContent(objGB.caption);			
			objGB.paneMan.selectViewByName(objGB.paneName);			
			if(objGB.cbObj){
				objGB.cbObj[objGB.cbMethod]();
			}
		}
	},
	getZonesLS:function(){
		this.updateZonesLS();
		return _arrZonesLS;
	},
	updateZonesLS:function(){
		_arrZonesLS=[];
		for(var i=0;i<_arrZones.length;i++){		
				_arrZonesLS.push({caption:	_arrZones[i].zone_name,
										value:_arrZones[i].zone_id});				
		}					
	},
	getZones:function(){
		return _arrZones;
	},
	getZoneByID:function(iZoneID){
		for(var i=0; i<this.getZones().length;i++){
			if (this.getZones()[i].zone_id==iZoneID){
				return this.getZones()[i];
			}
		}
	},		
});

var cacheMan = new cache();
cacheMan.findZone = function(criteria){				
	var result = [];
	if (criteria != ""){
		var zones = _arrZones;
		var pattern = new RegExp(criteria.trim(), "ig");
		for (property in zones){
			pattern.lastIndex = 0;
			if (pattern.test(zones[property].zone_name)){
				var zone = {caption:zones[property].zone_name,value:zones[property].zone_id};
				result.push(zone);
			}
		}	
	}
	return result;
	};
cacheMan.getAllZonesForList = function() {
	var result = [];
	var zones = _arrZones;	
	for (property in zones){
		var zone = {caption:zones[property].zone_name,value:zones[property].zone_id};
		result.push(zone);
	}
	return result;
};