/**
 * Provides a handler for enterprise rancher data.
 * 
 * Revision History: 
 * - 05/28/2013 By Diego Torres: Initial Version. 
 */
enyo.kind(
  {
    name : "crud.enterpriseRancher",
    kind : "crud.rancher",
    published : {
	entityName : "EnterpriseRancher",
	createKindName : "catalogs.rancher.enterprise.form",
    },
    adapterToIn : function(entityObj) {
	if (entityObj) {
	    if (entityObj.entityName == "EnterpriseRancher") {
		entityObj.rancher_type = 2;
		entityObj.rancherId = entityObj.enterpriseRancherId;
		entityObj.legalName += '';
		entityObj.telephone = entityObj.telephone || "";
		entityObj.idName = this.entityIdName();
		
		entityObj.name = entityObj.legalName.trim();
		return entityObj;
	    }
	}
	return null;
    },
    adapterToList : function(entityObj) {
      var listObj =
        {
          value : 0,
          caption : ""
        };

      listObj.value = utils.parseToNumber(entityObj.rancherId);
      listObj.caption =  entityObj.legalName;;

      return listObj;
    },
    getCatalogsList:function(){
	
	 var arrAdapterList = enyo.clone(this.arrObj);
	 var result = [];
		
	 for ( var i = 0; i < arrAdapterList.length; i++) {
	 var obj = arrAdapterList[i];
	 obj.importantInfo = "" + arrAdapterList[i].name;
	 obj.secundaryInfo = "" + arrAdapterList[i].telephone;
	 result.push(obj);
	 }
	 return result;
   }
  });
var crudEnterpriseRancher = new crud.enterpriseRancher();