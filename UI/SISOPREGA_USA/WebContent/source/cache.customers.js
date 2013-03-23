/**
 * Provides a handler for rancher data options.
 * 
 * Revision History: 
 * - [DATE] By Alan del Rio: Initial Version. 
 * - [DATE] By Alfredo Pacheco: Integrate with web services. 
 * - 02/03/2013 By Diego Torres: Add rancher user handlers.
 * 
 */
enyo
    .kind(
      {
        name : "cache.customers",
        iLastRanID : null,
        arrObj : [],
        gatewayWasRead : false,
        asyncCallBack : null,
        asyncMethod : "",
//        refreshData : function() {
//          this.gatewayWasRead = false;
//          this.get();
//        },
//        refreshDataAsync : function(callBackObject, callBackMethod) {
//          this.asyncCallBack = callBackObject;
//          this.asyncMethod = callBackMethod;
//          consumingGateway.ReadAsync("Rancher", {}, callBackObject, callBackMethod);
//        },
//        refreshPersonCallBack : function(result) {
//          var objAux = {};
//          var arrAux = [];
//          var selfCacheRancher = this;
//
//          if (result.exceptionId == 0) { // Read
//            // successfully
//            jQuery.each(result.records, function() {
//              jQuery.each(this, function(key, value) {
//                objAux[key] = value;
//              });
//              objTmp = selfCacheRancher.rancherAdapterToIn(objAux);
//              objAux = {};
//              arrAux.push(objTmp);
//            });
//          } else { // Error
//            if (result.exceptionId != "VAL02" && result.exceptionId != "DB02") {
//              // No data found
//              cacheMan.setMessage("", "[Exception ID: " + result.exceptionId + "] Descripción: " + result.exceptionDescription);
//            }
//          }
//
//          // Retrieve Enterprise Ranchers:
//          var cgReadAllEnterpriseRanchers = consumingGateway.Read("EnterpriseRancher", {});
//          if (cgReadAllEnterpriseRanchers.exceptionId == 0) { // Read
//            // successfully
//            jQuery.each(cgReadAllEnterpriseRanchers.records, function() {
//              jQuery.each(this, function(key, value) {
//                objAux[key] = value;
//              });
//              objTmp = selfCacheRancher.enterpriseRancherAdapterToIn(objAux);
//              arrAux.push(objTmp);
//              objAux = {};
//            });
//          } else { // Error
//            if (cgReadAllEnterpriseRanchers.exceptionId != "VAL02" && cgReadAllEnterpriseRanchers.exceptionId == "DB02") {
//              // No data found
//              cacheMan.setMessage("", "[Exception ID: " + cgReadAllEnterpriseRanchers.exceptionId + "] Descripcion: "
//                  + cgReadAllEnterpriseRanchers.exceptionDescription);
//            }
//          }
//          this.arrObj = arrAux;
//          _arrRancherList = arrAux;
//          return this.arrObj;
//        },
        get : function() {
        	
        	
            this.arrObj = [{
              id : "1",
              name : "Este es un cliente",
              address_one : "un domicilio",
              address_two : "una colonia",
              city_id : "1",
              state_id : "1",
              zip_code : "12345",
              rfc : "RFC3456789",
              phone_number : utils.phoneToMask("6561234556"),              
              email : "correo@correo.com",              
              city_name : "Juarez",
              state_name : "Chihuahua"
            },
            {
                id : "2",
                name : "Otro cliente",
                address_one : "un domicilio 2",
                address_two : "una fraccionamiento",
                city_id : "1",
                state_id : "1",
                zip_code : "54231",
                rfc : "RFC39999987",
                phone_number : utils.phoneToMask("6569999990"),              
                email : "email@gmail.com",              
                city_name : "Juarez",
                state_name : "Chihuahua"
              }];
//          if (this.gatewayWasRead == false) {
//            this.gatewayWasRead = true;
//            var objAux = {};
//            var arrAux = [];
//            var selfCacheRancher = this;
//            // Retrieve Ranchers
//            var cgReadAllRanchers = consumingGateway.Read("Rancher", {});
//            if (cgReadAllRanchers.exceptionId == 0) { // Read
//              // successfully
//              jQuery.each(cgReadAllRanchers.records, function() {
//                jQuery.each(this, function(key, value) {
//                  objAux[key] = value;
//                });
//                objTmp = selfCacheRancher.rancherAdapterToIn(objAux);
//                objAux = {};
//                arrAux.push(objTmp);
//              });
//            } else { // Error
//              if (cgReadAllRanchers.exceptionId == "DB02") {
//                //NOTHING TO READ OK
//              } else {
//                if (cgReadAllRanchers.exceptionId != "VAL02") { // No
//                  // data found
//                  cacheMan.setMessage("", "[Exception ID: " + cgReadAllRanchers.exceptionId + "] Descripción: "
//                      + cgReadAllRanchers.exceptionDescription);
//                }
//              }
//            }
//            // Retrieve Enterprise Ranchers:
//            var cgReadAllEnterpriseRanchers = consumingGateway.Read("EnterpriseRancher", {});
//            if (cgReadAllEnterpriseRanchers.exceptionId == 0) { // Read
//              // successfully
//              jQuery.each(cgReadAllEnterpriseRanchers.records, function() {
//                jQuery.each(this, function(key, value) {
//                  objAux[key] = value;
//                });
//                objTmp = selfCacheRancher.enterpriseRancherAdapterToIn(objAux);
//                arrAux.push(objTmp);
//                objAux = {};
//              });
//            } else { // Error
//              if (cgReadAllEnterpriseRanchers.exceptionId == "DB02") {
//                //NOTHING TO READ OK        		
//              } else {
//                if (cgReadAllEnterpriseRanchers.exceptionId != "VAL02") {// No        	
//                  // data
//                  // found
//                  cacheMan.setMessage("", "[Exception ID: " + cgReadAllEnterpriseRanchers.exceptionId + "] Descripcion: "
//                      + cgReadAllEnterpriseRanchers.exceptionDescription);
//                }
//              }
//            }
//            this.arrObj = arrAux;
//            _arrRancherList = arrAux;
//          }
          return this.arrObj;
        },
        
        enterpriseRancherAdapterToIn : function(objRan) {
          var objNew =
            {
              rancher_id : objRan.enterpriseId,
              company_name : objRan.legalName,
              address_one : objRan.addressOne,
              address_two : objRan.addressTwo,
              city_id : objRan.city,
              state_id : objRan.state,
              zip_code : objRan.zipCode,
              rfc : objRan.legalId,
              phone_number : utils.phoneToMask(objRan.telephone),
              phone_number2 : utils.phoneToMask(objRan.telephone2),
              phone_number3 : utils.phoneToMask(objRan.telephone3),
              sms_phone_chosen: objRan.smsPhoneChosen,
              email : objRan.email,
              // Fields out of web service:
              contacts : [],
              billing : [],
              rancher_type : 2,
              city_name : "",
              state_name : ""

            };
          return objNew;
        },
        enterpriseRancherAdapterToOut : function(objRan) {
          // only fields that are in webservice
          var objNew =
            {
              enterpriseId : objRan.rancher_id,
              legalName : objRan.company_name,
              addressOne : objRan.address_one,
              addressTwo : objRan.address_two,
              city : objRan.city_id,
              state : objRan.state_id,
              zipCode : objRan.zip_code,
              legalId : objRan.rfc,
              telephone : utils.phoneOut(objRan.phone_number),
              telephone2 : utils.phoneOut(objRan.phone_number2),
              telephone3 : utils.phoneOut(objRan.phone_number3),
              smsPhoneChosen: objRan.sms_phone_chosen,
              email : objRan.email
            };
          return objNew;
        },
        
       
        
        createEnterpriseRancher : function(objRan, cbObj, cbMethod) {

          var objToSend = this.enterpriseRancherAdapterToOut(objRan);
          delete objToSend.enterpriseId;
          var cgCreateEnterpriseRancher = consumingGateway.Create("EnterpriseRancher", objToSend);
          if (cgCreateEnterpriseRancher.exceptionId == 0) { // Created
            // successfully
            objRan.rancher_id = cgCreateEnterpriseRancher.generatedId;
            this.iLastRanID = objRan.rancher_id;
            // Fields out of webservice
            objRan.billing = [];
            objRan.contacts = [];
            objRan.city_name = "";
            objRan.state_id = "";

            this.arrObj.push(objRan);
            _arrRancherList = this.arrObj;
            if (cbMethod) {
              cbObj[cbMethod]();
            }
            return true;
          } else { // Error
            cacheMan.setMessage("", "[Exception ID: " + cgCreateEnterpriseRancher.exceptionId + "] Descripcion: "
                + cgCreateEnterpriseRancher.exceptionDescription);
            return false;
          }
        },
        
        
        updateEnterpriseRancher : function(objOld, objNew, cbObj, cbMethod) {
          objNew.rancher_id = objOld.rancher_id;
          var objToSend = this.enterpriseRancherAdapterToOut(objNew);
          var cgUpdateEnterpriseRancher = consumingGateway.Update("EnterpriseRancher", objToSend);
          if (cgUpdateEnterpriseRancher.exceptionId == 0) { // Updated
            // successfully
            for (prop in objNew) {
              objOld[prop] = objNew[prop];
            }
            var tamanio = this.get().length;
            for ( var i = 0; i < tamanio; i++) {
              if (this.arrObj[i].rancher_id == objOld.rancher_id) {
                this.arrObj[i] = objOld;
                _arrRancherList = this.arrObj;
                cbObj.objRan = objOld;
                if (cbMethod) {
                  cbObj[cbMethod]();
                }
                return true;
              }
            }
            return false;
          } else { // Error
            cacheMan.setMessage("", "[Exception ID: " + cgUpdateEnterpriseRancher.exceptionId + "] Descripcion: "
                + cgUpdateEnterpriseRancher.exceptionDescription);
            return false;
          }
        },
        del : function(delObj, cbObj, cbMethod) {
          if (delObj.rancher_type == 1) {
            return this.deleteRancher(delObj, cbObj, cbMethod);
          } else {
            return this.deleteEnterpriseRancher(delObj, cbObj, cbMethod);
          }
        },
        
        deleteEnterpriseRancher : function(delObj, cbObj, cbMethod) {
          var objToSend = {};
          objToSend.enterpriseId = delObj.rancher_id;

          var cgDeleteEnterpriseRancher = consumingGateway.Delete("EnterpriseRancher", objToSend);
          if (cgDeleteEnterpriseRancher.exceptionId == 0) { // Deleted
            // successfully
            var tamanio = this.get().length;
            for ( var i = 0; i < tamanio; i++) {
              if (this.arrObj[i].rancher_id == delObj.rancher_id) {
                this.arrObj.splice(i, 1);
                _arrRancherList = this.arrObj;
                if (cbMethod) {
                  cbObj[cbMethod]();
                }
                return true;
              }
            }
            return false;
          } else { // Error
            cacheMan.setMessage("", "[Exception ID: " + cgDeleteEnterpriseRancher.exceptionId + "] Descripcion: "
                + cgDeleteEnterpriseRancher.exceptionDescription);
            return false;
          }
        },
        ls : function() {
          var _arrRancherListLS = [];
          for ( var i = 0; i < this.get().length; i++) {
            if (this.get()[i].rancher_type == 1) {
              _arrRancherListLS.push(
                {
                  caption : this.get()[i].last_name + ' ' + this.get()[i].mother_name + ' ' + this.get()[i].first_name,
                  value : this.get()[i].rancher_id
                });
            } else {
              _arrRancherListLS.push(
                {
                  caption : this.get()[i].company_name,
                  value : this.get()[i].rancher_id
                });
            }
          }
          return _arrRancherListLS;
        },
        getByID : function(iRancherID) {
          for ( var i = 0; i < this.get().length; i++) {
            if (this.get()[i].rancher_id == iRancherID) {
              return this.get()[i];
            }
          }
        },
        
        getAllForList : function() {
          var result = [];
          var ranchers = this.get();
          for (property in ranchers) {
            if (ranchers[property].rancher_type == 1) {
              var rancher =
                {
                  caption : "",
                  value : ranchers[property].rancher_id
                };
              if (ranchers[property].aka != "") {
            	  if(ranchers[property].mother_name != ""){
            		  rancher.caption = ranchers[property].last_name + ' ' + ranchers[property].mother_name + ', ' + ranchers[property].first_name + ' / ' + ranchers[property].aka;
            	  }else{
            		  rancher.caption = ranchers[property].last_name + ', ' + ranchers[property].first_name + ' / ' + ranchers[property].aka;	  
            	  }
                
              } else {
            	  if(ranchers[property].mother_name != ""){
            		  rancher.caption = ranchers[property].last_name + ' ' + ranchers[property].mother_name + ', ' + ranchers[property].first_name;
            	  }else{
            		  rancher.caption = ranchers[property].last_name + ', ' + ranchers[property].first_name;  
            	  }
              }

              result.push(rancher);
            } else {
              var rancher =
                {
                  caption : ranchers[property].company_name,
                  value : ranchers[property].rancher_id
                };
              result.push(rancher);
            }
          }
          return result;

        },
        find : function(criteria, arraySource) {
          var result = [];
          var pattern = new RegExp(criteria, "ig");
          for (element in arraySource) {
            for (property in arraySource[element]) {
              if (pattern.test(arraySource[element][property])) {
                result.push(arraySource[element]);
                break;
              }
            }
          }
          return result;
        },
       
      });
var cacheCustomers = new cache.customers();