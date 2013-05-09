/**
 * Provides a handler for rancher data options.
 * 
 * Revision History: 
 * - [DATE] By Alfredo Pacheco: Initial Version. 
 * - 05/08/2013 By Diego Torres: Integrate with web services.
 * 
 */
enyo.kind(
  {
    name : "cache.providers",
    get : function() {

      // if (this.gatewayWasRead == false) {
      // this.gatewayWasRead = true;
      var objAux = {};
      var arrAux = [];
      var selfCacheSeller = this;
      // Retrieve Providers (sellers)
      var cgReadAllSellers = consumingGateway.Read("Seller", {});
      if (cgReadAllSellers.exceptionId == 0) { // Read success
        jQuery.each(cgReadAllSellers.records, function() {
          jQuery.each(this, function(key, value) {
            objAux[key] = value;
          });
          objTmp = selfCacheSeller.adapterToIn(objAux);
          objAux = {};
          arrAux.push(objTmp);
        });
      } else {
        if (cgReadAllSellers.exceptionId != "DB02" && cgReadAllSellers.exceptionId != "VAL02") {
          cacheMan.setMessage("", "[Exception ID: " + cgReadAllRanchers.exceptionId + "] Descripción: " + cgReadAllRanchers.exceptionDescription);
        }
      }
      return arrAux;
    },
    getAllForList : function() {
      var result = [];
      var items = this.get();
      for ( var index = 0; index < items.length; index++) {
        var item =
          {
            caption : items[index].name,
            value : items[index].id
          };
        result.push(item);
      }
      return result;
    },
    del : function(delObj, cbObj, cbMethod) {
      var objToSend = {};
      objToSend.sellerId = delObj.id;

      var deleteGateway = consumingGateway.Delete("Seller", objToSend);
      if (deleteGateway.exceptionId == 0) { // Deleted
        if (cbMethod) {
          cbObj[cbMethod]();
        }
        return true;
      } else {
        cacheMan.setMessage("", "[Exception ID: " + deleteGateway.exceptionId + "] Descripcion: " + deleteGateway.exceptionDescription);
        return false;
      }
    },
    adapterToIn : function(obj) {
      var objNew =
        {
          id : obj.sellerId,
          name : obj.sellerName,
          address_one : obj.addressOne,
          address_two : obj.addressTwo,
          zip_code : obj.zipCode,
          phone_number : utils.phoneToMask(obj.phone),
          email : obj.email,
          city_name : obj.city,
          state_name : obj.addressState

        };
      return objNew;
    },
    adapterToOut : function(objSeller) {
      // only fields that are in webservice
      var objNew =
        {
          sellerId : objSeller.id,
          sellerName : objSeller.name,
          addressOne : objSeller.address_one,
          addressTwo : objSeller.address_two,
          city : objSeller.city_name,
          addressState : objSeller.state_name,
          zipCode : objSeller.zip_code,
          phone : utils.phoneOut(objSeller.phone_number),
          email : objSeller.email
        };
      return objNew;
    },

    Create : function(obj, cbObj, cbMethod) {
      var objToSend = this.adapterToOut(obj);
      delete objToSend.sellerId;
      var cgCreateSeller = consumingGateway.Create("Seller", objToSend);

      if (cgCreateSeller.exceptionId == 0) {
        obj.id = cgCreateSeller.generatedId;
        if (cbMethod) {
          cbObj[cbMethod]();
        }
        return true;
      } else {
        cacheMan.setMessage("", "[Exception ID: " + cgCreateSeller.exceptionId + "] Descripcion: " + cgCreateSeller.exceptionDescription);
        return false;
      }
    },

    update : function(objOld, objNew, cbObj, cbMethod) {
      objNew.id = objOld.id;
      var objToSend = this.adapterToOut(objNew);
      var updateGateway = consumingGateway.Update("Seller", objToSend);
      if (updateGateway.exceptionId == 0) { // Updated
        if (cbMethod) {
          cbObj[cbMethod]();
        }
        return true;
      } else {
        cacheMan.setMessage("", "[Exception ID: " + updateGateway.exceptionId + "] Descripcion: " + updateGateway.exceptionDescription);
        return false;
      }
    }
  });
var cacheProviders = new cache.providers();