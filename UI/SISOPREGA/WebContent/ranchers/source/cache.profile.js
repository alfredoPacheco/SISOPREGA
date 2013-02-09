/** 
 * Updates rancher profile
 * 
 * Revision History:  
 * - 02/07/2013 Alan del Rio
 *  
 * */
enyo.kind({
    name : "cache.profile",
    objRancher:null,
    read: function(iRancherType){		
		var objResponse = consumingGateway.Read("Rancher", {});				
		if(objResponse.exceptionId == 'VAL02'){
			var objResponse = consumingGateway.Read("EnterpriseRancher", {});
			if(objResponse.exceptionId == '0'){
				this.objRancher=this.enterpriseAdapterRead(objResponse.records[0]);
			}
		}else{
			if(objResponse.exceptionId == 'VAL02'){
				this.objRancher=this.personAdapterRead(objResponse.records[0]);
			}
		}
		
		if(objResponse.exceptionId != '0'){
			alert('Error al cargar profile');
		}
    },
    
	update: function(objUpdate){
		if(this.objRancher.enterpriseId){
			var objResp = consumingGateway.Update("EnterpriseRancher",objUpdate);
		}else{
			var objResp = consumingGateway.Update("Rancher",objUpdate);	
		}				
		if (objResp.exceptionId == "0"){
			this.objRancher=objUpdate;
			return true;
		}else{
			alert('Error al actualizar profile');
			return false;
		}
	},	
	changePassword:function(){					
		var cgReadAll = consumingGateway.Update("RancherUser", objData);		
		if (cgReadAll.exceptionId == 0){
			return true;
		}else{
			return false;
		}		
	},
	personAdapterRead:function(source){
        var target={aka : source.aka,
		            birth_date : "" + source.birth_date,
		            email_add : source.emailAddress,
		            first_name : source.firstName,
		            last_name : source.lastName,
		            mother_name : source.motherName,
		            phone_number : source.phone};	
		return target;
	},	
	enterpriseAdapterRead:function(source){
		 var target ={
				  enterpriseId:source.enterpriseId,
				  company_name: source.legalName,
				  address_one: source.addressOne,
				  address_two: source.addressTwo,
				  city_id: source.city,
				  state_id: source.state,
				  zip_code: source.zipCode	,
				  rfc: source.legalId,
				  phone_number: source.telephone,
				  email: source.email};
		return target;
	},	
  });
var cacheProfile = new cache.profile();