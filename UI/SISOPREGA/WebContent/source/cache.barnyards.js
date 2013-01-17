enyo.kind({
	name: "cache.barnyards",
	arrObj:_arrBarnyardsList,			//contains records from tables cat_barnyard and cat_barnyard_capacity
	arrObjInUse:{},//_arrBYOccupied,
	arrObjAv:enyo.clone(_arrBarnyardsList),
	arrObjWasFilledUpOnce: false,
	barnyardWasReadFromGateway:false,	
	barnyardCapacityWasReadFromGateway:false,	
	arrCtrlReceptionBarnyard:[],		//will contain records from table ctrl_reception_barnyard
	arrCatBarnyard:[],
	arrCatBarnyardCapacity:[],
	reloadme:function(){
		//AJAX
	},
	barnyardAdapterToIn:function(objBarnyard){
		
//		  _arrBarnyardsList=[
//		{barnyard_id:1,barnyard_code:"A1",
//		 barnyard_capacity:[{cattype_id:1,cattype_name:"CABALLOS",head_count:75}]},
//		{barnyard_id:2,barnyard_code:"A2",
//		 barnyard_capacity:[{cattype_id:4,cattype_name:"VACAS",head_count:50}]}
//		];
				
		var objNew = {
				barnyard_id:		objBarnyard.barnyardId,				
				barnyard_code:		objBarnyard.barnyardCode,
//				available: 			objBarnyard.available,				
				location_id:		objBarnyard.locationId	
			};
		
		return objNew;
	},
	barnyardAdapterToOut:function(objBarnyard){
//		private long barnyardId;    
//	    private String barnyardCode;
//	    private boolean available; 
//	    private long locationId;
		
		var objNew = {				
				barnyardId:			objBarnyard.barnyard_id,				
				barnyardCode:		objBarnyard.barnyard_code,
				available: 			objBarnyard.available,				
				locationId:			objBarnyard.location_id
			};		
		return objNew;
	},
	rec_barnAdapterToIn:function(objRec_Barn){
		
		var objNew = {
				rec_barn_id:	objRec_Barn.recBarnyardId,				
				iReceptionID:	objRec_Barn.receptionId,
				sID: 			objRec_Barn.barnyardId		
				
			};
		
		return objNew;
	},
	rec_barnAdapterToOut:function(objRec_Barn){
//		private long recBarnyardId;
//	    private long receptionId;
//	    private long barnyardId;
		
		var objNew = {				
				recBarnyardId:		objRec_Barn.rec_barn_id,				
				receptionId:		objRec_Barn.iReceptionID,
				barnyardId: 		objRec_Barn.sID
			};		
		return objNew;
	},
	get:function(){
		if (this.arrObjWasFilledUpOnce == false){
			this.arrObjWasFilledUpOnce = true;
			this.arrCatBarnyard = this.getBarnyard();
			this.arrCatBarnyardCapacity = this.getBarnyardCapacity();
			var objAux = {};
			this.arrObj = [];
			
			for (var a  in this.arrCatBarnyard){			
				objAux = this.arrCatBarnyard[a];
				objAux.barnyard_capacity=[{	catclass_id:"",												
											catclass_name:"",
											head_count:0
											}];			
				for(var b in this.arrCatBarnyardCapacity){
					if (this.arrCatBarnyardCapacity[b].barnyardId == this.arrCatBarnyard[a].barnyard_id){
						objAux.barnyard_capacity=[{	catclass_id:this.arrCatBarnyardCapacity[b].catclassId,													
													catclass_name:cacheCattle.getCattleClassByID(this.arrCatBarnyardCapacity[b].catclassId).catclass_name,
													head_count:this.arrCatBarnyardCapacity[b].headCount
													}];
					}
				}
				this.arrObj.push(objAux);
			}
		}
		return this.arrObj;
		
	},
	getBarnyard:function(){
//		private long barnyardId;    
//		private String barnyardCode;
//		private boolean available; 
//		private long locationId;
		    		    
		if (this.barnyardWasReadFromGateway == false){
			this.barnyardWasReadFromGateway = true;
			var arrAux = [];
			
			var cgReadAll = consumingGateway.Read("Barnyard", {});
			
			if (cgReadAll.exceptionId == 0){ //Read successfully
				for (item in cgReadAll.records){
					arrAux.push(this.barnyardAdapterToIn(cgReadAll.records[item]));
				}
			}
			else{ //Error
				if (cgReadAll.exceptionId != "VAL02"){ //No data found
					cacheMan.setMessage("", "[Exception ID: " + cgReadAll.exceptionId + "] Descripcion: " + cgReadAll.exceptionDescription);	
				}
			}			
			this.arrCatBarnyard =  arrAux;
		}
		
		return this.arrCatBarnyard;
	},
	getBarnyardCapacity:function(){
//		private long capacityId;
//	    private long barnyardId;
//	    private long catclassId;
//	    private long headCount;
		    		    
		if (this.barnyardCapacityWasReadFromGateway == false){
			this.barnyardCapacityWasReadFromGateway = true;			
			var arrAux = [];
						
			var cgReadAll = consumingGateway.Read("BarnyardCapacity", {});
			
			if (cgReadAll.exceptionId == 0){ //Read successfully
				for (item in cgReadAll.records){
					arrAux.push(cgReadAll.records[item]);
				}		    	
			}
			else{ //Error
				if (cgReadAll.exceptionId != "VAL02"){ //No data found
					cacheMan.setMessage("", "[Exception ID: " + cgReadAll.exceptionId + "] Descripcion: " + cgReadAll.exceptionDescription);	
				}			
			}
			
			this.arrCatBarnyardCapacity =  arrAux;
			
		}		
		return this.arrCatBarnyardCapacity;
		
	},
	create:function(objCat,cbObj,cbMethod){
		//AJAX
		this.arrObj.push(objCat);
		if(cbMethod){
			cbObj[cbMethod]();
		}				
		return true;
	},	
	upd:function(objOld,objNew,cbObj,cbMethod){
		//AJAX
		//Update Internal Object
		/*for (var sKey in objNew){
			objOld[sKey]=objNew[sKey]
		}*/
		objOld.barnyard_code=objNew.barnyard_code;
		if(cbMethod){
			cbObj[cbMethod]();
		}		
		return true;
		//return false;		
	},
	del:function(delObj,cbObj,cbMethod){		
		//AJAX
		//Update Internal Object	
		for(var i=0;i<this.get().length;i++){
			if(this.get()[i]===delObj){
				this.arrObj.splice(i, 1);	
				if(cbMethod){
					cbObj[cbMethod]();
				}		
				return true;								
				break;
			}
		}
		return false;			
	},	
//	ls:function(){
//		var _arrLS=[];
//		for(var i=0;i<this.get().length;i++){		
//			if(this.get()[i].rancher_type==1){
//				_arrLS.push({caption:this.get()[i].last_name  +' '+
//												this.get()[i].mother_name+' '+
//												this.get()[i].first_name,
//										value:this.get()[i].rancher_id});
//			}else{
//				_arrLS.push({caption:this.get()[i].company_name,
//										value:this.get()[i].rancher_id});				
//			}
//		}
//		return _arrLS;
//	},
	getByID:function(iID){
		for(var i=0; i<this.get().length;i++){
			if (this.get()[i].barnyard_id==iID){
				return this.get()[i];
			}
		}
	},
	getByBarnyard:function(barnyard){
		var arrAux = this.get();
		for(var i=0; i<arrAux.length;i++){
			if (arrAux[i].barnyard_code==barnyard.substr(1)){
				if (arrAux[i].location_id==barnyard.charAt(0)){
					return arrAux[i].barnyard_id;
				}
			}
		}
	},
	addCapacity:function(objBY,objCap,cbObj,cbMethod){		
		//AJAX
		//Update Local
		objBY.barnyard_capacity.push(objCap);
		if(cbMethod){
			cbObj[cbMethod]();
		}		
	},
	updateCapacity:function(objOld,objNew,cbObj,cbMethod){
		//AJAX
		//Update Local		
		for (var sKey in objNew){
			objOld[sKey]=objNew[sKey];
		}		
		if(cbMethod){
			cbObj[cbMethod]();
		}			
	},
	deleteCapacity:function(objBY,objCap,cbObj,cbMethod){
		//AJAX
		//Update Local	
		for(var i=0;i<objBY.barnyard_capacity.length;i++){
			if(objBY.barnyard_capacity[i]===delObj){
				objBY.barnyard_capacity.splice(i, 1);	
				if(cbMethod){
					cbObj[cbMethod]();
				}		
				return true;								
				break;
			}
		}			
		if(cbMethod){
			cbObj[cbMethod]();
		}			
	},
	getAvailable:function(){
		return this.arrObjAv;
	},
	getAvailableByID:function(iID){
		for(var i=0; i<this.getAvailable().length;i++){
			if (this.getAvailable()[i].barnyard_id==iID){
				return this.getAvailable()[i];
			}
		}		
	},
	deleteAvailableByID:function(iID){
		for(var i=0; i<this.getAvailable().length;i++){
			if (this.getAvailable()[i].barnyard_id==iID){
				return this.getAvailable().splice(i, 1);
			}
		}		
	},	
	setOccupied:function(objReception,arrBY,cbObj,cbMethod){
		//AJAX
		//Mark as Occupied
		var objClone;
		for (var sKey in arrBY){
			objClone=enyo.clone(this.getAvailableByID(sKey));
			objClone['occupied']=true;
			objReception.barnyards.push(objClone);
			this.deleteAvailableByID(sKey);
		}
		arrBY={};
		//RefreshAvailable
		if(cbMethod){
			cbObj[cbMethod]();
		}		
	},
	isOccupied:function(sID){
		if(this.arrObjInUse[sID]){
			return true;
		}else{
			return false;
		}
	},
	setOccupied:function(sID,iReceptionID){ //example: setOccupied("1E2","79")
		
		objAux = {};
		objAux.sID = this.getByBarnyard(sID);
		objAux.iReceptionID = iReceptionID;
		var objToSend = this.rec_barnAdapterToOut(objAux);
		delete objToSend.recBarnyardId;
		var cgCreate = consumingGateway.Create("ReceptionBarnyard", objToSend);
		if (cgCreate.exceptionId == 0){ //Created successfully			
			objAux.recBarnyardId = cgCreate.generatedId;
			this.arrObjInUse[sID]={reception_id:parseInt(iReceptionID),accepted_count:"",inspections:[],feed:[]};
		}
		else{ //Error			
			cacheMan.setMessage("", "[Exception ID: " + cgCreate.exceptionId + "] Descripcion: " + cgCreate.exceptionDescription);
			//TODO: do something with arrObjInUse
		}
		
	},
	releaseBY:function(objRec,sID,cbObj,cbMethod){
		
		var objToSend = {};
		objToSend.receptionId = objRec.reception_id;
		objToSend.barnyardId = cacheBY.getByBarnyard(sID);
		var cgDelete = consumingGateway.Delete("ReceptionBarnyard", objToSend);
		if (cgDelete.exceptionId == 0){ //Deleted successfully
			delete objRec.barnyards[sID];
			delete this.arrObjInUse[sID];					
			if(cbMethod){
				cbObj[cbMethod]();
			}	
		}
		else{ //Error
			cacheMan.setMessage("", "[Exception ID: " + cgDelete.exceptionId + "] Descripcion: " + cgDelete.exceptionDescription);			
		}
	},
	inUse:function(){
		return this.arrObjInUse;
	},	
	getBYbyRecID:function(sID){
		var arrBY={};
		for(var sKey in this.arrObjInUse){
			if(this.arrObjInUse[sKey].reception_id==sID){
				arrBY[sKey]=this.arrObjInUse[sKey];
			}
		}
		return arrBY;
	},
	getAllForList:function(){
		var result = [];
		var barnyards = this.get();
		for (property in barnyards){
			var barnyard = {caption:"",value:""};
			if(barnyards[property].location_id==1){						
				barnyard.caption = 	barnyards[property].barnyard_code + " [Chihuahua]";
				barnyard.value = 	barnyards[property].barnyard_id;
				result.push(barnyard);												
			}else{						
				barnyard.caption = barnyards[property].barnyard_code + " [Zona Sur]";
				barnyard.value = 	barnyards[property].barnyard_id;
				result.push(barnyard);						
			}
		}
		return result;
							
	}
});

var cacheBY= new cache.barnyards();