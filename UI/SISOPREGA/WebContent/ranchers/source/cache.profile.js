/** 
 * Updates rancher profile
 * 
 * Revision History:  
 * - 02/07/2013 Alan del Rio
 * - 02/18/2013 Diego Torres : Add handler for pedimentos list.
 *  
 * */
enyo.kind({
    name : "cache.profile",
    objRancher:null,
    read: function(iRancherType){		
		var objResponse = consumingGateway.Read("Rancher", {});				
		if(objResponse.exceptionId == 'VAL02'){
			objResponse = consumingGateway.Read("EnterpriseRancher", {});
			if(objResponse.exceptionId == '0'){
				this.objRancher=this.enterpriseAdapterRead(objResponse.records[0]);
			}
		}else{
			if(objResponse.exceptionId == '0'){
				this.objRancher=this.personAdapterRead(objResponse.records[0]);
			}
		}
		
		if(objResponse.exceptionId != '0'){
			alert('Error al cargar profile');
		}else{
			this.objRancher.phone_number=phoneToMask(this.objRancher.phone_number);
		}
    },
    
	update: function(objUpdate){
		objUpdate.phone_number=phoneOut(objUpdate.phone_number);
		var objResp = null;
		if(this.objRancher.enterpriseId){
			objResp = consumingGateway.Update("EnterpriseRancher",objUpdate);
		}else{
			objResp = consumingGateway.Update("Rancher",objUpdate);	
		}				
		if (objResp.exceptionId == "0"){
			this.objRancher=objUpdate;
			return true;
		}else{
			return false;
		}
	},	
	changePassword:function(objData){					
		var cgReadAll = consumingGateway.Update("RancherUser", objData);		
		if (cgReadAll.exceptionId == 0){
			return true;
		}else{
			return false;
		}		
	},
	personAdapterRead:function(source){
		if(source.birthDate<0){
			source.birthDate="";
		}
        var target={rancherId:source.rancherId,
        			aka : source.aka,
		            birthDate: "" + UTCtoNormalDate(source.birthDate),
		            emailAddress: source.emailAddress,
		            firstName: source.firstName,
		            lastName: source.lastName,
		            motherName: source.motherName,
		            phone: source.phone};
		return target;
	},	
	enterpriseAdapterRead:function(source){
		 var target ={enterpriseId:source.enterpriseId,
				  legalName: source.legalName,
				  addressOne: source.addressOne,
				  addressTwo: source.addressTwo,
				  city: source.city,
				  state: source.state,
				  zipCode: source.zipCode	,
				  legalId: source.legalId,
				  telephone: source.telephone,
				  email: source.email};
		return target;
	},
	changePassword:function(userName,currentPW,newPW){		
		 response=consumingGateway.changePassword(userName,currentPW,newPW);
		 if(response == "OK"){
			 return true;
		 }else{
			 return false;
		 }
			 
	},
	getPedimentos : function(){
	  var objAux = {};
      var arrAux = [];
      var cgReadPedimentos = null;
      
      cgReadPedimentos = consumingGateway.Read("Pedimento", {});
      if (cgReadPedimentos.exceptionId == 0) { // Read successfully
        jQuery.each(cgReadPedimentos.records, function() {
          jQuery.each(this, function(key, value) {
            objAux[key] = value;
          });
          objAux.fechaPedimento = "" + UTCtoNormalDate(objAux.fechaPedimento);
          arrAux.push(objAux);
          objAux = {};
        });
      }
      return arrAux;
	}
  });
var cacheProfile = new cache.profile();