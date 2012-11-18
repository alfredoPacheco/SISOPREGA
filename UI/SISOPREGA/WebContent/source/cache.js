var _arrCities=[{city_id:1,city_name:"LOCAL"},{city_id:2,city_name:"FORANEA"}];

var _arrRancherList =[
  					{	rancher_id:1,
  						aka:"BALDOR",  						
  						first_name:"ALAN", 
  						last_name:"DEL RIO", 
  						mother_name:"MENDEZ",
  						email_add:"alan.delrio@hotmail.com", 
  						birth_date:"1985-09-15",
  						rfc:"RIMA850915",
  						contacts:[],
  						billing:{},
  						rancher_type:1,
  						phone_number:"6561234567"
  					},		
  					
  					{	rancher_id:2,
  						aka:"FUERTE", 
  						first_name:"DIEGO", 
  						last_name:"TORRES", 
  						mother_name:"FUERTE",
  						email_add:"diego.torees.fuerte@gmail.com",
  						birth_date:"1982-04-13",
  						rfc:"TOFD820413",
  						contacts:[],
  						billing:{},
  						rancher_type:1,
  						phone_number:"6561234567"
  					},	
  					 
  					{	rancher_id:3,
  						aka:"SI", 
  						company_name:"VACA Y POLLITO",					 
  						contacts:[],
  						billing:{},
  						rancher_type:2,
  						address_one:"",
  						address_two:"",
  						city_id:1,
  						zip_code:"UNZIP",
  						rfc:"UNARFC",
  						phone_number:"6561234567"}	
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
var	_arrReceptionList=[
		{reception_id:1,rancher_id:1,rancher_name:"BALDOR / DEL RIO MENDEZ ALAN", arrival_date:"2012-09-15",
		 cattype_id:1,cattype_name:"CABALLOS",hc_aprox:100,
		 city_id:1,city_name:"JUAREZ/CHIHUAHUA",
		 weights:[{hcw_id:0,hc:50,weight:1234},{hcw_id:1,hc:50,weight:5678}],
		 barnyards:[{barnyard_id:3,barnyard_code:"A3",occupied:true,
		 barnyard_capacity:[{cattype_id:1,cattype_name:"CABALLOS",head_count:75}]},]},		
		{reception_id:2,rancher_id:2,rancher_name:"FUERTE / TORRRES FUERTE DIEGO", arrival_date:"2012-09-16",
		 cattype_id:2,cattype_name:"LLEGUAS",hc_aprox:60,city_id:2,city_name:"SONORA/CABORCA",
		 weights:[],barnyards:[]},								
	];
var _gobackStack=[];	

var _arrBarnyardsList=[
		{barnyard_id:1,barnyard_code:"A1",
		 barnyard_capacity:[{cattype_id:1,cattype_name:"CABALLOS",head_count:75}]},
		{barnyard_id:2,barnyard_code:"A2",
		 barnyard_capacity:[{cattype_id:4,cattype_name:"VACAS",head_count:50}]}
	];		


var _objMainHeader;

function fillRancherLS(){
	_arrRancherListLS=[];
	for(var i=0;i<_arrRancherList.length;i++){		
		if(_arrRancherList[i].rancher_type==1){
			_arrRancherListLS.push({caption:_arrRancherList[i].last_name  +' '+
											_arrRancherList[i].mother_name+' '+
											_arrRancherList[i].first_name,
									value:_arrRancherList[i].rancher_id});
		}else{
			_arrRancherListLS.push({caption:_arrRancherList[i].company_name,
									value:_arrRancherList[i].rancher_id});				
		}
	}	
}

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
	clearBack:function(){
		for(var i=0;i<_gobackStack.length;i++){
			this.goBack();
		}
	},
	showScrim:function(){
		this.gblScrim.show();
	},
	setGlobalToaster:function(objVar){
		this.gblToaster=objVar;
	},
	setMessage:function(iType,sTitle, sMsg){
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
	getCitiesLS:function(){
		this.updateCitiesLS();
		return _arrCitiesLS;
	},
	updateCitiesLS:function(){
		_arrCitiesLS=[];
		for(var i=0;i<_arrCities.length;i++){		
				_arrCitiesLS.push({caption:	_arrCities[i].city_name,
										value:_arrCities[i].city_id});				
		}					
	},
	getCities:function(){
		return _arrCities;
	},	
	getCityByID:function(iCityID){
		for(var i=0; i<this.getCities().length;i++){
			if (this.getCities()[i].city_id==iCityID){
				return this.getCities()[i];
			}
		}
	},			
});

var cacheMan = new cache();