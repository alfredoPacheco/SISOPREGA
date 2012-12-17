enyo.kind({
	name: "cache.receptions",
	arrObj:[],//_arrReceptionList,
	receptionWasReadFromGateway:false,	
	arrObjWasFilledUpOnce:false,
	arrReception:[],
	reloadme:function(){
		//AJAX
	},	
	receptionAdapterToIn:function(objReception){
		
		//TODO update cattleType to cattleClass
		var objNew = {
				reception_id:	objReception.receptionId,
				rancher_id:		objReception.rancherId,
				arrival_date:	objReception.dateAllotted,
				cattype_name:	objReception.cattleType,				
				city_id:		objReception.locationId
			};
		objNew.rancher_name="";		
		objNew.cattype_id="";
		objNew.hc_aprox="";		
		objNew.city_name="";
		objNew.weights=[]; 
		objNew.barnyards=[];
		objNew.accepted_count="";
		objNew.inspections=[];
		objNew.feed=[];
		
		return objNew;
	},
	receptionAdapterToOut:function(objReception){

		var objNew = {				
				receptionId:	objReception.reception_id,				
				rancherId:		objReception.rancher_id,
				dateAllotted:	"" + DateOut(objReception.arrival_date),
				cattleType:		objReception.cattype_id,
				
				locationId:	1
			};
		
		return objNew;
	},
	get:function(){
		
		
//		var objNew = {
//				reception_id:	objReception.receptionId,
//				rancher_id:		objReception.rancherId,
//				arrival_date:	objReception.dateAllotted,
//				cattype_name:	objReception.cattleType,				
//				city_id:		objReception.locationId
//			};
//		objNew.rancher_name="";		
//		objNew.cattype_id="";
//		objNew.hc_aprox="";		
//		objNew.city_name="";
//		objNew.weights=[]; 
//		objNew.barnyards=[];
//		objNew.accepted_count="";
//		objNew.inspections=[];
//		objNew.feed=[];
		
		
//var	_arrReceptionList=[
// {
//					reception_id : 1,
//					rancher_id : 1,
//					rancher_name : "BALDOR / DEL RIO MENDEZ ALAN",
//					arrival_date : "2012-09-15",
//					cattype_id : 1,
//					cattype_name : "CABALLOS",
//					hc_aprox : 100,
//					city_id : 1,
//					city_name : "LOCAL",
//					weights : [ {					receptionHeadcount
//						hcw_id : 0,					?
//						hc : 50,					hc
//						weight : 1234				weight
//					} ],
//					barnyards : {
//						"1E5" : "1E5"
//					},
//					accepted_count : "",
//					inspections : [ {
//						rejected_id : 1,
//						rejected_count : 1,
//						reject_id : 1,
//						reject_desc : "ENFERMEDAD"
//					} ],
//					feed : [ {
//						feeding_id : 1, 				feedOrder
//						barnyards : {					
//							"1E5" : "1E5"				feedOrderBarnyard
//						},
//						handling : "ETC",				feedOrder
//						feed : {						
//							"1" : {						feedOrderDetails
//								feed_desc : "MOLIDA",	food.foodId  = feedOrderDetails.foodId
//								feed_units : 1			feedOrderDetails
//							}
//						}
//					} ]
//				}
					
		if (this.arrObjWasFilledUpOnce == false){
			this.arrObjWasFilledUpOnce = true;
			
			this.arrReception = this.getReception();			
			
			var objAux = {};
			this.arrObj = [];
			
			for (var a  in this.arrReception){			
				objAux = this.arrReception[a];
//barnyards::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::			
				var barnyardAux = this.getReceptionBarnyard(objAux.reception_id);
				for (b in barnyardAux){
					try{
						var barnyardName = cacheBY.getByID(barnyardAux[b].barnyardId).barnyard_code;
						objAux.barnyards[barnyardName] = barnyardName;
					}catch(e){}					
				}
//weight:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::				
				var arrHeadcountAux = this.getReceptionHeadcount(objAux.reception_id);
				for (h in arrHeadcountAux){
					var headcountAux = {};
					try{						
						headcountAux.hcw_id = 	arrHeadcountAux[h].headcountId;
						headcountAux.hc = 		arrHeadcountAux[h].hc;
						headcountAux.weight = 	arrHeadcountAux[h].weight;						
					}catch(e){}
					objAux.weights.push(headcountAux);
				}
//TODO inspections::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
				
//feedOrder:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::				

				
//				private long ;
//			    private long  receptionId;
//			    private Date feedDate;
//			    private String feedOriginator;
//			    private String handling;
				var arrFeedAux = this.getFeedOrder(objAux.reception_id);
				for (f in arrFeedAux){
					var feedAux = {};
					try{
						feedAux.feeding_id = 	arrFeedAux[f].orderId;
						feedAux.handling = 		arrFeedAux[f].handling;
						feedAux.weight = 		arrFeedAux[f].weight;
					}catch(e){}	
//feedOrderBarnyard::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::					
					if(feedAux.feeding_id){
						var arrFeedBarnyardAux = this.getFeedOrderBarnyard(feedAux.feeding_id);
						var feedBarnyardAux = {barnyards:{}};						
						for (fb in arrFeedBarnyardAux){
							var barnyardName = cacheBY.getByID(arrFeedBarnyardAux[fb].barnyardId).barnyard_code;
							feedBarnyardAux.barnyards[barnyardName] = barnyardName;							
						}
						feedAux.barnyards = feedBarnyardAux.barnyards;
//feedOrderDetails:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::	
						var arrFeedDetailsAux =  this.getFeedOrderDetails(feedAux.feeding_id);
						var feedDetailsAux = {};
						for (fd in arrFeedDetailsAux){
							feedDetailsAux[fd] = {};
							feedDetailsAux[fd].feed_desc = cacheFeed.getByID(arrFeedDetailsAux[fd].foodId).feed_desc;
							feedDetailsAux[fd].feed_units = arrFeedDetailsAux[fd].quantity;
						}
						feedAux.feed =feedDetailsAux;					
					}										
					objAux.feed.push(feedAux);
				}					
				this.arrObj.push(objAux);
			}
		}
		return this.arrObj;	
	},
	getReception:function(){
//		private long receptionId;
//	    private long rancherId;
//	    private Date dateAllotted;
//	    private long cattleType;
//	    private long locationId;
		    		    
		if (this.receptionWasReadFromGateway == false){
			this.receptionWasReadFromGateway = true;
			var arrAux = [];					
			var self = this;
	//Retrieve Receptions
			var cgReadAll = consumingGateway.Read("Reception", {});
			
			if (cgReadAll.exceptionId == 0){ //Read successfully
				for (item in cgReadAll.records){					
					arrAux.push(self.receptionAdapterToIn(cgReadAll.records[item]));
				}
			}else{ //Error
				if (cgReadAll.exceptionId != "VAL02"){ //No data found
					cacheMan.setMessage("", "[Exception ID: " + cgReadAll.exceptionId + "] Descripción: " + cgReadAll.exceptionDescription);	
				}			
			}						
			this.arrReception =  arrAux;			
		}		
		return this.arrReception;	
	},
	getReceptionBarnyard:function(recID){
//		private long recBarnyardId;
//	    private long receptionId;
//	    private long barnyardId;
		    		    
				
			var arrAux = [];
			var objToSend = {};
			objToSend.receptionId = recID;
			var cgReadAll = consumingGateway.Read("ReceptionBarnyard", objToSend);

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

		return arrAux;
		
	},
	getReceptionHeadcount:function(recID){
//		private long headcountId;
//	    private long receptionId;
//	    private long hc;
//	    private double weight;
//	    private long weightUom;
		    		    
		
			var arrAux = [];
			var objToSend = {};
			objToSend.receptionId = recID;
			var cgReadAll = consumingGateway.Read("ReceptionHeadcount", objToSend);
			
			if (cgReadAll.exceptionId == 0){ //Read successfully
				for (item in cgReadAll.records){
					arrAux.push(cgReadAll.records[item]);
				}
			}
			else{ //Error
				if (cgReadAll.exceptionId != "VAL02"){ //No data found = GW01
					cacheMan.setMessage("", "[Exception ID: " + cgReadAll.exceptionId + "] Descripcion: " + cgReadAll.exceptionDescription);	
				}			
			}				
		
		return arrAux;
		
	},
	getFeedOrder:function(recID){
//		private long orderId;
//	    private long  receptionId;
//	    private Date feedDate;
//	    private String feedOriginator;
//	    private String handling;		    		    
		
		var arrAux = [];
		var objToSend = {};
		objToSend.receptionId = recID;
		var cgReadAll = consumingGateway.Read("FeedOrder", objToSend);
		
		if (cgReadAll.exceptionId == 0){ //Read successfully
			for (item in cgReadAll.records){
				arrAux.push(cgReadAll.records[item]);
			}
		}
		else{ //Error
			if (cgReadAll.exceptionId != "VAL02"){ //No data found = VAL02 for filter
				cacheMan.setMessage("", "[Exception ID: " + cgReadAll.exceptionId + "] Descripcion: " + cgReadAll.exceptionDescription);	
			}			
		}				
		
		return arrAux;
		
	},
	getFeedOrderBarnyard:function(oID){
//		private long feedOrdBarnId;
//		  private long barnyardId;
//		  private long orderId;	    		    
		
		var arrAux = [];
		var objToSend = {};
		objToSend.orderId = oID;
		var cgReadAll = consumingGateway.Read("FeedOrderBarnyard", objToSend);
		
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
		
		return arrAux;
		
	},
	getFeedOrderDetails:function(oID){
//		 private long fodId;
//		 private long orderId;
//		 private long foodId;
//		 private double quantity;  		    
		
		var arrAux = [];
		var objToSend = {};
		objToSend.orderId = oID;
		var cgReadAll = consumingGateway.Read("FeedOrderDetails", objToSend);
		
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
		
		return arrAux;
		
	},
	create:function(objRec,cbObj,cbMethod){
		var objToSend = this.receptionAdapterToOut(objRec);
		delete objToSend.receptionId;
		var cgCreate = consumingGateway.Create("Reception", objToSend);
		if (cgCreate.exceptionId == 0){ //Created successfully			
			objRec.reception_id = cgCreate.generatedId;
			
			this.arrObj.push(objRec);
			_arrReceptionList = this.arrObj;
			
			for (var sKey in objRec.barnyards){
				cacheBY.setOccupied(sKey,objRec.reception_id);
			}
			
			if(cbMethod){
				cbObj[cbMethod]();
			}
			return true;
		}
		else{ //Error			
			cacheMan.setMessage("", "[Exception ID: " + cgCreate.exceptionId + "] Descripcion: " + cgCreate.exceptionDescription);
			return false;
		}
		
	},
	upd:function(objOld,objNew,cbObj,cbMethod){
		objNew.reception_id = objOld.reception_id;
		var objToSend = this.receptionAdapterToOut(objNew);
		var cgUpdate = consumingGateway.Update("Reception", objToSend);
		if (cgUpdate.exceptionId == 0){ //Updated successfully
			for(prop in objNew){
				objOld[prop]=objNew[prop];
			}
			var tamanio = this.get().length;
			for(var i=0;i<tamanio;i++){
				if (this.arrObj[i].reception_id == objOld.reception_id){
					this.arrObj[i] = objOld;
					_arrReceptionList = this.arrObj;
					cbObj.objRec = objOld;
					if(cbMethod){
						cbObj[cbMethod]();
					}
					return true;					
				}
			}
			return false;
		}
		else{ //Error			
			cacheMan.setMessage("", "[Exception ID: " + cgUpdate.exceptionId + "] Descripcion: " + cgUpdate.exceptionDescription);
			return false;
		}		
	},
	getLS:function(){
		var _arrCattleLS=[];
		for(var i=0;i<this.get().length;i++){		
			_arrCattleLS.push({caption:this.get()[i].cattype_name,
									value:this.get()[i].cattype_id});
		}
		return _arrCattleLS;
	},
	getByID:function(iID){		
		var arrTemp=[];
		arrTemp = this.get();
		for(var i=0; i < arrTemp.length; i++){
			if (arrTemp[i].reception_id==iID){
				return arrTemp[i];
			}
		}
		return null;
	},
	//TODO
	deleteByID:function(iID){
		for(var i=0; i<this.get().length;i++){
			if (this.get()[i].reception_id==iID){
				this.get().splice(i, 1);	
			}
		}
	},	
	del:function(delObj,cbObj,cbMethod){		
		var objToSend = {};
		objToSend.receptionId = delObj.reception_id;
		
		var cgDelete = consumingGateway.Delete("Reception", objToSend);
		if (cgDelete.exceptionId == 0){ //Deleted successfully
			var tamanio = this.get().length;
			for(var i=0;i<tamanio;i++){
				if (this.arrObj[i].reception_id == delObj.reception_id){
					this.arrObj.splice(i, 1);
					_arrReceptionList = this.arrObj;
					if(cbMethod){
						cbObj[cbMethod]();
					}
					return true;
					//TODO
					//break;
				}
			}
			return false;
		}
		else{ //Error
			cacheMan.setMessage("", "[Exception ID: " + cgDelete.exceptionId + "] Descripcion: " + cgDelete.exceptionDescription);
			return false;
		}	
	},	
	addWeight:function(objRec,objWeight,cbObj,cbMethod){
		//AJAX
		//Update Local
		objRec.weights.push(objWeight);	
		if(cbMethod){
			cbObj[cbMethod]();
		}	
	},
	updateWeight:function(objRec,objOld,objNew,cbObj,cbMethod){
		for (var sKey in objNew){
			if(objOld[sKey]!=null){
				objOld[sKey]=objNew[sKey];
			}
		}
		if(cbMethod){
			cbObj[cbMethod]();
		}		
	},
	deleteWeight:function(objRec,delObj,cbObj,cbMethod){
		//AJAX
		//Update Local	
		for(var i=0;i<objRec.weights.length;i++){
			if(objRec.weights[i]===delObj){
				objRec.weights.splice(i, 1);	
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
	releaseReceptions:function(arrRec,cbObj,cbMethod){
		//AJAX
		//Update Internal Object	
		for(var sKey in arrRec){
			this.deleteByID(sKey);
		}
		if(cbMethod){
			cbObj[cbMethod]();
		}		
	},
	appendBY:function(objReception,objBY,cbObj,cbMethod){

		for (var sKey in objBY) {
			cacheBY.setOccupied(sKey,objReception.reception_id);
			objReception.barnyards[sKey] = objBY[sKey];
		}
		
		//cacheObj
		if(cbMethod){
			cbObj[cbMethod]();
		}		
	},
	createFeedOrder:function(objRec, objFeed){
//		private long orderId;
//	    private long  receptionId;
//	    private Date feedDate;
//	    private String feedOriginator;
		
		var objToSend = {};
		objToSend.receptionId = objRec.reception_id;
		objToSend.feedDate = "" + DateOut(new Date());
		objToSend.feedOriginator = "alfredo";	
		objToSend.handling = objFeed.handling;
		
		var cgCreate = consumingGateway.Create("FeedOrder", objToSend);
		if (cgCreate.exceptionId == 0){ //Created successfully			
			if (cacheReceptions.createFeedOrderBarnyard(cgCreate.generatedId,objFeed)== true){
				return true;
			}else{
				return false;
			}
			
		}
		else{ //Error			
			cacheMan.setMessage("", "[Exception ID: " + cgCreate.exceptionId + "] Descripcion: " + cgCreate.exceptionDescription);
			return false;
		}
	},
	createFeedOrderBarnyard:function(order_id, objFeed){
//		private long feedOrdBarnId;
//		  private long barnyardId;
//		  private long orderId;

				
		var objToSend = {};
		objToSend.orderId = order_id;
		for (prop in objFeed.barnyards){
			objToSend.barnyardId = cacheBY.getByBarnyard(objFeed.barnyards[prop]);				
		}
		var cgCreate = consumingGateway.Create("FeedOrderBarnyard", objToSend);
		if (cgCreate.exceptionId == 0){ //Created successfully			
			if (cacheReceptions.createFeedOrderDetails(order_id,objFeed)== true){
				return true;
			}
			else {
				return false;
			}
		}
		else{ //Error			
			cacheMan.setMessage("", "[Exception ID: " + cgCreate.exceptionId + "] Descripcion: " + cgCreate.exceptionDescription);
			return false;
		}
	},
	createFeedOrderDetails:function(order_id, objFeed){

//	    private long fodId;
//	    private long orderId;
//	    private long foodId;
//	    private double quantity;
		
		var objToSend = {};
		objToSend.orderId = 	order_id;		
		
		for (obj in objFeed.feed){			
			objToSend.foodId = 		objFeed.feed[obj].feed_id;				
			objToSend.quantity =	objFeed.feed[obj].feed_units;
			
			var cgCreate = consumingGateway.Create("FeedOrderDetails", objToSend);
			if (cgCreate.exceptionId != 0){			
				cacheMan.setMessage("", "[Exception ID: " + cgCreate.exceptionId + "] Descripcion: " + cgCreate.exceptionDescription);
				return false;
			}			
		}
		return true;
		
	},
	
	addFeed:function(objRec,objFeed,cbObj,cbMethod){
		//TODO ACTUAL	
		
		if (objRec.feed.length == 0){
			if (cacheReceptions.createFeedOrder(objRec,objFeed)== true){								
				objRec.feed.push(objFeed);
				if(cbMethod){
					cbObj[cbMethod]();
				}	
			}else { //TODO: do something else
				objRec.feed.push(objFeed);
				if(cbMethod){
					cbObj[cbMethod]();
				}	
			}
		}else{
//			if (cacheReceptions.createFeedOrderDetails(objRec,objFeed)== true){								
//				objRec.feed.push(objFeed);
//				if(cbMethod){
//					cbObj[cbMethod]();
//				}	
//			}else { //TODO: do something else
				objRec.feed.push(objFeed);
				if(cbMethod){
					cbObj[cbMethod]();
				}	
			}
//		}			
	},
	updateFeed:function(objOld,objNew,cbObj,cbMethod){
		//AJAX
		//Update Local		
		for(var sKey in objNew){
			if(objNew[sKey]!=null){
				objOld[sKey]=objNew[sKey];
			}
		}		
		if(cbMethod){
			cbObj[cbMethod]();
		}		
	},
	deleteFeed:function(arrFeed,objFeed,cbObj,cbMethod){
		for(var i=0; i<arrFeed.length;i++){		
			if (arrFeed[i]===objFeed){
				arrFeed.splice(i, 1);
				if(cbMethod){
					cbObj[cbMethod]();
				}
				break;					
			}
		}
	},
	addReject:function(iAccepted,objRec,objReject,cbObj,cbMethod){
		//AJAX
		//REFRESH LOCAL
		if(iAccepted==""){iAccepted=0;}
		objRec.accepted_count=iAccepted;
		if(objReject){
			objRec.inspections.push(objReject);
		}
		if(cbMethod){			
			cbObj[cbMethod]();
		}			
	},
	updateReject:function(iAccepted,objRec,iInspIdx,objReject,cbObj,cbMethod){
		//AJAX
		//REFRESH LOCAL
		if(iAccepted==""){iAccepted=0;}
		objRec.accepted_count=iAccepted;
		objRec.inspections[iInspIdx].rejected_count=objReject.rejected_count;
		objRec.inspections[iInspIdx].reject_id=objReject.reject_id;
		objRec.inspections[iInspIdx].reject_desc=objReject.reject_desc;				
		if(cbMethod){
			cbObj[cbMethod]();
		}			
	},
	deleteReject:function(arrRejects,objReject,cbObj,cbMethod){
		for(var i=0; i<arrRejects.length;i++){		
			if (arrRejects[i]===objReject){
				arrRejects.splice(i, 1);
				if(cbMethod){
					cbObj[cbMethod]();
				}
				break;					
			}
		}
	},				
});
var cacheReceptions= new cache.receptions();


//
//function UTCtoNormalDate(strUTC){
//	var dateFmt = "";
//	if (strUTC != "" && strUTC !== undefined){
//		strAux = strUTC.split(" ");
//		var fmt = new enyo.g11n.DateFmt({format: "yyyy/MM/dd"});
//		var dateFromUTC = new Date(strUTC);			
//		dateFmt = fmt.format(dateFromUTC);
//	}
//	return dateFmt;
//}
//
//function DateOut(normalDate){
//	var dateFmt = "";
//	if (normalDate != "" && normalDate !== undefined){
//		var fmt = new enyo.g11n.DateFmt({format: "MM/dd/yyyy"});
//		var dateNew= new Date(normalDate.substr(0,4),normalDate.substr(5,7),normalDate.substr(8,10));
//		dateFmt = fmt.format(dateNew);
//	}
//	return dateFmt;
//}