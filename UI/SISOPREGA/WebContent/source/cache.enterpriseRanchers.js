/**
 * Provides a handler for enterprise rancher data.
 * 
 * Revision History: 
 * - 05/28/2013 By Diego Torres: Initial Version. 
 */
enyo.kind(
  {
    name : "cache.enterpriseRanchers",
    kind : "crud.cache",
    entityName : "EnterpriseRancher",
    adapterToIn : function(entityObj) {

      if(entityObj.entityName == "EnterpriseRancher"){
        entityObj.rancher_type = 2;
        entityObj.rancherId = entityObj.enterpriseRancherId;
        entityObj.legalName += '';
      }else{
        entityObj = null;
      }

      return entityObj;
    },
    adapterToList : function(entityObj) {
      var listObj =
        {
          value : 0,
          caption : ""
        };

      listObj.value = entityObj.rancherId;
      listObj.caption =  entityObj.legalName;;

      return listObj;
    }
  });
var cacheEnterpriseRanchers = new cache.enterpriseRanchers();