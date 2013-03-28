/**
 * Provides a handler for rancher data options.
 * 
 * Revision History: 
 * - [DATE] By Alan del Rio: Initial Version. 
 * - [DATE] By Alfredo Pacheco: Integrate with web services. 
 * - 02/03/2013 By Diego Torres: Add rancher user handlers.
 * 
 */

var _arrDrivers = [{
    id : 1,
    name : "Chofer 1",
    address_one : "un domicilio",
    address_two : "una colonia",
    city_id : "1",
    state_id : "1",
    zip_code : "13212",
    phone_number : utils.phoneToMask("6569999999"),              
    city_name : "Juarez",
    state_name : "Chihuahua",
    contacts:[{id:1,contact:"Contacto de chofer 1", phone:utils.phoneToMask("6561232323")},
              {id:2,contact:"Contacto 2 de chofer 1", phone:utils.phoneToMask("6562222222")},
              {id:3,contact:"Contacto 3 de chofer 1", phone:utils.phoneToMask("6563333333")},
              ]
  },
  {
      id : 2,
      name : "Chofer 2",
      address_one : "un domicilio 2",
      address_two : "una fraccionamiento",
      city_id : "1",
      state_id : "1",
      zip_code : "54231",
      phone_number : utils.phoneToMask("6561111111"),              
      city_name : "Juarez",
      state_name : "Chihuahua",
      contacts:[{id:4,contact:"Contacto de chofer 2", phone:utils.phoneToMask("6566666666")},
                {id:5,contact:"Contacto 2 de chofer 2", phone:utils.phoneToMask("6567777777")},
                {id:6,contact:"Contacto 3 de chofer 2", phone:utils.phoneToMask("6568888888")},
                ]
    }];

enyo
    .kind(
      {
        name : "cache.drivers",
        iLastRanID : null,
        arrObj : _arrDrivers,
        gatewayWasRead : false,
        asyncCallBack : null,
        asyncMethod : "",
        actual_id:2,
        actual_contact_id:6,
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
        del : function(delObj, cbObj, cbMethod) {
//        	var objToSend = {};
//            objToSend.enterpriseId = delObj.rancher_id;

//            var cgDeleteEnterpriseRancher = consumingGateway.Delete("EnterpriseRancher", objToSend);
//            if (cgDeleteEnterpriseRancher.exceptionId == 0) { // Deleted
              // successfully
              var tamanio = this.get().length;
              for ( var i = 0; i < tamanio; i++) {
                if (this.arrObj[i].id == delObj.id) {
                  this.arrObj.splice(i, 1);                  
                  if (cbMethod) {
                    cbObj[cbMethod]();
                  }
                  return true;
                }
              }
              return false;
//            } else { // Error
//              cacheMan.setMessage("", "[Exception ID: " + cgDeleteEnterpriseRancher.exceptionId + "] Descripcion: "
//                  + cgDeleteEnterpriseRancher.exceptionDescription);
//              return false;
//            }
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
        
       
        
        Create : function(obj, cbObj, cbMethod) {

//          var objToSend = this.enterpriseRancherAdapterToOut(objRan);
//          delete objToSend.enterpriseId;
//          var cgCreateEnterpriseRancher = consumingGateway.Create("EnterpriseRancher", objToSend);
//          if (cgCreateEnterpriseRancher.exceptionId == 0) { // Created
//            // successfully
//            objRan.rancher_id = cgCreateEnterpriseRancher.generatedId;
//            this.iLastRanID = objRan.rancher_id;
//            // Fields out of webservice
//            obj.billing = [];
//            obj.contacts = [];
//            obj.city_name = "";
//            obj.state_id = "";
        	obj.id = ++this.actual_id;
            this.arrObj.push(obj);
            if (cbMethod) {
              cbObj[cbMethod]();
            }
            return true;
//          } else { // Error
//            cacheMan.setMessage("", "[Exception ID: " + cgCreateEnterpriseRancher.exceptionId + "] Descripcion: "
//                + cgCreateEnterpriseRancher.exceptionDescription);
//            return false;
//          }
        },
        
        
        update : function(objOld, objNew, cbObj, cbMethod) {
          objNew.id = objOld.id;
//          var objToSend = this.enterpriseRancherAdapterToOut(objNew);
//          var cgUpdateEnterpriseRancher = consumingGateway.Update("EnterpriseRancher", objToSend);
//          if (cgUpdateEnterpriseRancher.exceptionId == 0) { // Updated
            // successfully
            for (prop in objNew) {
              objOld[prop] = objNew[prop];
            }
            var tamanio = this.get().length;
            for ( var i = 0; i < tamanio; i++) {
              if (this.arrObj[i].id == objOld.id) {
                this.arrObj[i] = objOld;
                if (cbMethod) {
                  cbObj[cbMethod]();
                }
                return true;
              }
            }
            return false;
//          } else { // Error
//            cacheMan.setMessage("", "[Exception ID: " + cgUpdateEnterpriseRancher.exceptionId + "] Descripcion: "
//                + cgUpdateEnterpriseRancher.exceptionDescription);
//            return false;
//          }
        },
        getAllForList : function() {
    		var result = [];
    		var items = this.get();
    		for (var index = 0; index<items.length; index++) {
    			var item = {
    				caption : items[index].name,
    				value : items[index].id
    			};
    			result.push(item);
    		}
    		return result;
    	},
        getContacts : function(obj) {
            for (i in this.contactsReadFromGateway) {
              if (this.contactsReadFromGateway[i] == obj.rancher_id) {
                return obj.contacts;
              }
            }
            var objAux = {};
            var arrAux = [];
            var selfCacheRancher = this;
            var objToSend = new Object();
            var cgReadContacts = null;

            this.contactsReadFromGateway.push(obj.rancher_id);

            if (obj.rancher_type == 1) {
              objToSend.rancherId = obj.rancher_id;
              cgReadContacts = consumingGateway.Read("RancherContact", objToSend);
              if (cgReadContacts.exceptionId == 0) { // Read successfully
                jQuery.each(cgReadContacts.records, function() {
                  jQuery.each(this, function(key, value) {
                    objAux[key] = value;
                  });
                  arrAux.push(selfCacheRancher.rancherContactAdapterToIn(objAux));
                });
              }
              return obj.contacts = arrAux;
            } else if (obj.rancher_type == 2) {
              objToSend.enterpriseId = obj.rancher_id;
              cgReadContacts = consumingGateway.Read("EnterpriseContact", objToSend);
              if (cgReadContacts.exceptionId == 0) { // Read successfully
                jQuery.each(cgReadContacts.records, function() {
                  jQuery.each(this, function(key, value) {
                    objAux[key] = value;
                  });
                  arrAux.push(selfCacheRancher.enterpriseRancherContactAdapterToIn(objAux));
                });
              }
              return obj.contacts = arrAux;
            }
          },
          addContact : function(objDriver, objCon, cbObj, cbMethod) {
//            var objToSend = {};
//            var cgCreateContact = null;
//
//            objCon.rancher_id = objDriver.rancher_id;
//
//            if (objDriver.rancher_type == 1) {
//              objToSend = this.rancherContactAdapterToOut(objCon);
//              delete objToSend.contactId;
//              cgCreateContact = consumingGateway.Create("RancherContact", objToSend);
//            } else if (objDriver.rancher_type == 2) {
//              objToSend = this.enterpriseRancherContactAdapterToOut(objCon);
//              delete objToSend.contactId;
//              cgCreateContact = consumingGateway.Create("EnterpriseContact", objToSend);
//            }
//
//            if (cgCreateContact.exceptionId == 0) { // Created successfully
//              objCon.contact_id = cgCreateContact.generatedId;
        	  objCon.id = ++this.actual_contact_id;
              objDriver.contacts.push(objCon);

              if (cbMethod) {
                cbObj[cbMethod]();
              }
//              return true;
//            } else { // Error
//              cacheMan.setMessage("", "[Exception ID: " + cgCreateContact.exceptionId + "] Descripcion: " + cgCreateContact.exceptionDescription);
//              return false;
//            }

          },
          updContact : function(obj, objNew, cbObj, cbMethod) {
//            var objToSend = {};
//            var cgUpdateContact = null;
//            objNew.rancher_id = objOld.rancher_id;
//            objNew.contact_id = objOld.contact_id;
//
//            if (objRancher.rancher_type == 1) {
//              objToSend = this.rancherContactAdapterToOut(objNew);
//              cgUpdateContact = consumingGateway.Update("RancherContact", objToSend);
//            } else if (objRancher.rancher_type == 2) {
//              objToSend = this.enterpriseRancherContactAdapterToOut(objNew);
//              cgUpdateContact = consumingGateway.Update("EnterpriseContact", objToSend);
//            }
//
//            if (cgUpdateContact.exceptionId == 0) { // Updated successfully
              var tamanio = obj.contacts.length;
              for ( var i = 0; i < tamanio; i++) {
                if (obj.contacts[i].id == objNew.id) {
                  obj.contacts[i] = objNew;
                  if (cbMethod) {
                    cbObj[cbMethod]();
                  }
                  return true;
                }
              }
              return false;
//            } else { // Error
//              cacheMan.setMessage("", "[Exception ID: " + cgUpdateContact.exceptionId + "] Descripcion: " + cgUpdateContact.exceptionDescription);
//              return false;
//            }
          },
          delContact : function(objDriver, objCon, cbObj, cbMethod) {
//            var objToSend = {};
//            objToSend.contactId = objCon.contact_id;
//            var cgDeleteContact = null;
//            if (objDriver.rancher_type == 1) {
//              cgDeleteContact = consumingGateway.Delete("RancherContact", objToSend);
//            } else if (objDriver.rancher_type == 2) {
//              cgDeleteContact = consumingGateway.Delete("EnterpriseContact", objToSend);
//            }

//            if (cgDeleteContact.exceptionId == 0) { // Deleted successfully
              var tamanio = objDriver.contacts.length;
              for ( var i = 0; i < tamanio; i++) {
                if (objDriver.contacts[i].id == objCon.id) {
                  objDriver.contacts.splice(i, 1);
                  if (cbMethod) {
                    cbObj[cbMethod]();
                  }
                  return true;
                }
              }
              return false;
//            } else { // Error
//              cacheMan.setMessage("", "[Exception ID: " + cgDeleteContact.exceptionId + "] Descripcion: " + cgDeleteContact.exceptionDescription);
//              return false;
//            }
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
var cacheDrivers = new cache.drivers();