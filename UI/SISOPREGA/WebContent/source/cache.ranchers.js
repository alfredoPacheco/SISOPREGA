/**
 * Provides a handler for rancher data options.
 * 
 * Revision History: 
 * - [DATE] By Alan del Rio: Initial Version. 
 * - [DATE] By Alfredo Pacheco: Integrate with web services. 
 * - 02/03/2013 By Diego Torres: Add rancher user handlers.
 * - 05/27/2013 By Diego Torres: Adapt to crud.cache.
 * 
 */
enyo.kind(
  {
    name : "cache.ranchers",
    kind : "crud.cache",
    entityName : "Rancher",
    adapterToIn : function(entityObj) {

      if(entityObj.entityName == "Rancher"){
        entityObj.rancher_type = 1;
        entityObj.aka = entityObj.aka != undefined ? entityObj.aka + '' : '';
        entityObj.motherName = entityObj.motherName != undefined ? entityObj.motherName : '';
        entityObj.emailAdd = entityObj.emailAdd != undefined ? entityObj.emailAdd : '';
        entityObj.phoneNumber = entityObj.phoneNumber != undefined ? entityObj.phoneNumber : '';
        entityObj.phoneNumber2 = entityObj.phoneNumber2 != undefined ? entityObj.phoneNumber2 : '';        
        entityObj.phoneNumber3 = entityObj.phoneNumber3 != undefined ? entityObj.phoneNumber3 : '';
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
      listObj.caption = entityObj.lastName + " " + entityObj.motherName + ", " + entityObj.firstName + " " + entityObj.middleName;
      
      return listObj;
    }
  });