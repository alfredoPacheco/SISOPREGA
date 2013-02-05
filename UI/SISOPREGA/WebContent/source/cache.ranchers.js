/**
 * Provides a handler for rancher data options.
 * 
 * Revision History: 
 * - [DATE] By Alan del Rio: Initial Version. 
 * - [DATE] By Alfredo Pacheco: Integrate with web services. 
 * - 02/03/2013 By Diego Torres: Add rancher user handlers.
 * 
 */
enyo.kind(
  {
    name : "cache.ranchers",
    iLastRanID : null,
    arrObj : [],
    rancherWasReadFromGateway : false,
    contactsReadFromGateway : [],
    billingsReadFromGateway : [],
    usersReadFromGateway : [],
    refreshData : function() {
      this.rancherWasReadFromGateway = false;
      this.get();
    },
    get : function() {
      if (this.rancherWasReadFromGateway == false) {
        this.rancherWasReadFromGateway = true;
        var objAux = {};
        var arrAux = [];
        var selfCacheRancher = this;
        // Retrieve Ranchers
        var cgReadAllRanchers = consumingGateway.Read("Rancher", {});
        if (cgReadAllRanchers.exceptionId == 0) { // Read
          // successfully
          jQuery.each(cgReadAllRanchers.records, function() {
            jQuery.each(this, function(key, value) {
              objAux[key] = value;
            });
            objTmp = selfCacheRancher.rancherAdapterToIn(objAux);
            objAux = {};
            // objTmp.billing = selfCacheRancher
            // .getInvoice(objTmp);
            arrAux.push(objTmp);
          });
        } else { // Error
        	if(cgReadAllRanchers.exceptionId == "DB02"){
        		//NOTHING TO READ OK
        	}else{
        		if (cgReadAllRanchers.exceptionId != "VAL02") { // No
        		// data found
        		cacheMan.setMessage("", "[Exception ID: " + cgReadAllRanchers.exceptionId + "] Descripción: " + cgReadAllRanchers.exceptionDescription);
          }
        }
        }
        // Retrieve Enterprise Ranchers:
        var cgReadAllEnterpriseRanchers = consumingGateway.Read("EnterpriseRancher", {});
        if (cgReadAllEnterpriseRanchers.exceptionId == 0) { // Read
          // successfully
          jQuery.each(cgReadAllEnterpriseRanchers.records, function() {
            jQuery.each(this, function(key, value) {
              objAux[key] = value;
            });
            objTmp = selfCacheRancher.enterpriseRancherAdapterToIn(objAux);
            // objTmp.billing = selfCacheRancher
            // .getInvoice(objTmp);
            arrAux.push(objTmp);
            objAux = {};
          });
        } else { // Error
        	if(cgReadAllEnterpriseRanchers.exceptionId == "DB02"){
        		//NOTHING TO READ OK        		
        	}else{
        		if (cgReadAllEnterpriseRanchers.exceptionId != "VAL02") {// No        	
	            // data
	            // found
	            cacheMan.setMessage("", "[Exception ID: " + cgReadAllEnterpriseRanchers.exceptionId + "] Descripcion: "
	                + cgReadAllEnterpriseRanchers.exceptionDescription);
	          }
        	}
        }
        this.arrObj = arrAux;
        _arrRancherList = arrAux;
        // cacheMan.hideScrim();
      }
      return this.arrObj;
    },
    rancherAdapterToIn : function(objRan) {

      var objNew =
        {
          rancher_id : objRan.rancherId,
          aka : objRan.aka,
          birth_date : "" + UTCtoNormalDate(objRan.birthDate),
          email_add : objRan.emailAddress,
          first_name : objRan.firstName,
          last_name : objRan.lastName,
          mother_name : objRan.motherName,
          phone_number : phoneToMask(objRan.phone),
        };
      // Fields out of web service:
      objNew.rfc = "";
      objNew.contacts = [];
      objNew.billing = [];
      objNew.users = [];
      objNew.rancher_type = 1;
      return objNew;
    },
    rancherAdapterToOut : function(objRan) {
      // only with fields as webservice has
      var objNew =
        {
          rancherId : objRan.rancher_id,
          aka : objRan.aka,
          birthDate : "" + DateOut(objRan.birth_date),
          emailAddress : objRan.email_add,
          firstName : objRan.first_name,
          lastName : objRan.last_name,
          motherName : objRan.mother_name,
          phone : phoneOut(objRan.phone_number)
        };
      return objNew;
    },
    rancherContactAdapterToIn : function(objCon) {
      var objNew =
        {
          contact_id : objCon.contactId,
          rancher_id : objCon.rancherId,
          aka : objCon.aka,
          first_name : objCon.firstName,
          last_name : objCon.lastName,
          mother_name : objCon.motherName,
          birth_date : "" + UTCtoNormalDate(objCon.birthDate),
          email_add : objCon.emailAddress,
          phone_number : phoneToMask(objCon.telephone),
          address_one : objCon.addressOne,
          address_two : objCon.addressTwo,
          city : objCon.city,
          address_state : objCon.addressState,
          zip_code : objCon.zipCode
        };
      return objNew;
    },
    rancherContactAdapterToOut : function(objCon) {
      var objNew =
        {
          contactId : objCon.contact_id,
          rancherId : objCon.rancher_id,
          aka : objCon.aka,
          firstName : objCon.first_name,
          lastName : objCon.last_name,
          motherName : objCon.mother_name,
          birthDate : "" + DateOut(objCon.birth_date),
          emailAddress : objCon.email_add,
          telephone : phoneOut(objCon.phone_number),
          addressOne : objCon.address_one,
          addressTwo : objCon.address_two,
          city : objCon.city,
          addressState : objCon.address_state,
          zipCode : objCon.zip_code
        };
      return objNew;
    },
    rancherBillingAdapterToIn : function(objBill) {
      var objNew =
        {
          billing_id : objBill.rancherInvoiceId,
          rancher_id : objBill.rancherId,
          company_name : objBill.legalName,
          address_one : objBill.addressOne,
          address_two : objBill.addressTwo,
          city_id : objBill.city,
          state_id : objBill.addressState,
          zip_code : objBill.zipCode,
          rfc : objBill.legalId
        };
      // TODO: AGREGAR PHONE NUMBER EN DEMAS CLASES
      objNew.phone_number = "";

      return objNew;
    },
    rancherBillingAdapterToOut : function(objBill) {
      var objNew =
        {
          rancherInvoiceId : objBill.billing_id,
          rancherId : objBill.rancher_id,
          legalName : objBill.company_name,
          addressOne : objBill.address_one,
          addressTwo : objBill.address_two,
          city : objBill.city_id,
          addressState : objBill.state_id,
          zipCode : objBill.zip_code,
          legalId : objBill.rfc
        };
      return objNew;
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
          phone_number : phoneToMask(objRan.telephone),
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
          telephone : phoneOut(objRan.phone_number),
          email : objRan.email
        };
      return objNew;
    },
    enterpriseRancherContactAdapterToIn : function(objCon) {
      var objNew =
        {
          contact_id : objCon.contactId,
          rancher_id : objCon.enterpriseId,
          aka : objCon.aka,
          first_name : objCon.firstName,
          last_name : objCon.lastName,
          mother_name : objCon.motherName,
          birth_date : "" + UTCtoNormalDate(objCon.birthDate),
          email_add : objCon.emailAddress,
          phone_number : phoneToMask(objCon.telephone),
          address_one : objCon.addressOne,
          address_two : objCon.addressTwo,
          city : objCon.city,
          address_state : objCon.addressState,
          zip_code : objCon.zipCode
        };
      return objNew;
    },
    enterpriseRancherContactAdapterToOut : function(objCon) {
      var objNew =
        {
          contactId : objCon.contact_id,
          enterpriseId : objCon.rancher_id,
          aka : objCon.aka,
          firstName : objCon.first_name,
          lastName : objCon.last_name,
          motherName : objCon.mother_name,
          birthDate : "" + DateOut(objCon.birth_date),
          emailAddress : objCon.email_add,
          telephone : phoneOut(objCon.phone_number),
          addressOne : objCon.address_one,
          addressTwo : objCon.address_two,
          city : objCon.city,
          addressState : objCon.address_state,
          zipCode : objCon.zip_code
        };
      return objNew;
    },
    Create : function(objRan, cbObj, cbMethod) {

      if (objRan.rancher_type == 1) {
        this.createRancher(objRan, cbObj, cbMethod);
      } else {
        this.createEnterpriseRancher(objRan, cbObj, cbMethod);
      }
    },
    createRancher : function(objRan, cbObj, cbMethod) {

      var objToSend = this.rancherAdapterToOut(objRan);
      delete objToSend.rancherId;
      var cgCreate = consumingGateway.Create("Rancher", objToSend);
      if (cgCreate.exceptionId == 0) { // Created successfully
        objRan.rancher_id = cgCreate.generatedId;
        this.iLastRanID = objRan.rancher_id;
        objRan.billing = [];
        objRan.contacts = [];
        objRan.rfc = "";

        this.arrObj.push(objRan);
        _arrRancherList = this.arrObj;
        if (cbMethod) {
          cbObj[cbMethod]();
        }
        return true;
      } else { // Error
        cacheMan.setMessage("", "[Exception ID: " + cgCreate.exceptionId + "] Descripcion: " + cgCreate.exceptionDescription);
        return false;
      }
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
    upd : function(objOld, objNew, cbObj, cbMethod) {
      if (objOld.rancher_type == 1) {
        return this.updateRancher(objOld, objNew, cbObj, cbMethod);
      } else {
        return this.updateEnterpriseRancher(objOld, objNew, cbObj, cbMethod);
      }
    },
    updateRancher : function(objOld, objNew, cbObj, cbMethod) {
      objNew.rancher_id = objOld.rancher_id;
      var objToSend = this.rancherAdapterToOut(objNew);
      var cgUpdateRancher = consumingGateway.Update("Rancher", objToSend);
      if (cgUpdateRancher.exceptionId == 0) { // Updated successfully
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
        cacheMan.setMessage("", "[Exception ID: " + cgUpdateRancher.exceptionId + "] Descripcion: " + cgUpdateRancher.exceptionDescription);
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
    deleteRancher : function(delObj, cbObj, cbMethod) {
      // AJAX
      // Update Internal Object
      var objToSend = {};
      objToSend.rancherId = delObj.rancher_id;

      var cgDeleteRancher = consumingGateway.Delete("Rancher", objToSend);
      if (cgDeleteRancher.exceptionId == 0) { // Deleted successfully
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
        cacheMan.setMessage("", "[Exception ID: " + cgDeleteRancher.exceptionId + "] Descripcion: " + cgDeleteRancher.exceptionDescription);
        return false;
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
    getContacts : function(objRan) {
      for (i in this.contactsReadFromGateway) {
        if (this.contactsReadFromGateway[i] == objRan.rancher_id) {
          return objRan.contacts;
        }
      }
      var objAux = {};
      var arrAux = [];
      var selfCacheRancher = this;
      var objToSend = new Object();
      var cgReadContacts = null;

      this.contactsReadFromGateway.push(objRan.rancher_id);

      if (objRan.rancher_type == 1) {
        objToSend.rancherId = objRan.rancher_id;
        cgReadContacts = consumingGateway.Read("RancherContact", objToSend);
        if (cgReadContacts.exceptionId == 0) { // Read successfully
          jQuery.each(cgReadContacts.records, function() {
            jQuery.each(this, function(key, value) {
              objAux[key] = value;
            });
            arrAux.push(selfCacheRancher.rancherContactAdapterToIn(objAux));
          });
        }
        return objRan.contacts = arrAux;
      } else if (objRan.rancher_type == 2) {
        objToSend.enterpriseId = objRan.rancher_id;
        cgReadContacts = consumingGateway.Read("EnterpriseContact", objToSend);
        if (cgReadContacts.exceptionId == 0) { // Read successfully
          jQuery.each(cgReadContacts.records, function() {
            jQuery.each(this, function(key, value) {
              objAux[key] = value;
            });
            arrAux.push(selfCacheRancher.enterpriseRancherContactAdapterToIn(objAux));
          });
        }
        return objRan.contacts = arrAux;
      }
    },
    addContact : function(objRancher, objCon, cbObj, cbMethod) {
      var objToSend = {};
      var cgCreateContact = null;

      objCon.rancher_id = objRancher.rancher_id;

      if (objRancher.rancher_type == 1) {
        objToSend = this.rancherContactAdapterToOut(objCon);
        delete objToSend.contactId;
        cgCreateContact = consumingGateway.Create("RancherContact", objToSend);
      } else if (objRancher.rancher_type == 2) {
        objToSend = this.enterpriseRancherContactAdapterToOut(objCon);
        delete objToSend.contactId;
        cgCreateContact = consumingGateway.Create("EnterpriseContact", objToSend);
      }

      if (cgCreateContact.exceptionId == 0) { // Created successfully
        objCon.contact_id = cgCreateContact.generatedId;
        objRancher.contacts.push(objCon);

        if (cbMethod) {
          cbObj[cbMethod]();
        }
        return true;
      } else { // Error
        cacheMan.setMessage("", "[Exception ID: " + cgCreateContact.exceptionId + "] Descripcion: " + cgCreateContact.exceptionDescription);
        return false;
      }

    },
    updateContact : function(objRancher, objOld, objNew, cbObj, cbMethod) {
      var objToSend = {};
      var cgUpdateContact = null;
      objNew.rancher_id = objOld.rancher_id;
      objNew.contact_id = objOld.contact_id;

      if (objRancher.rancher_type == 1) {
        objToSend = this.rancherContactAdapterToOut(objNew);
        cgUpdateContact = consumingGateway.Update("RancherContact", objToSend);
      } else if (objRancher.rancher_type == 2) {
        objToSend = this.enterpriseRancherContactAdapterToOut(objNew);
        cgUpdateContact = consumingGateway.Update("EnterpriseContact", objToSend);
      }

      if (cgUpdateContact.exceptionId == 0) { // Updated successfully
        var tamanio = objRancher.contacts.length;
        for ( var i = 0; i < tamanio; i++) {
          if (objRancher.contacts[i].contact_id == objOld.contact_id) {
            objRancher.contacts[i] = objNew;
            if (cbMethod) {
              cbObj[cbMethod]();
            }
            return true;
          }
        }
        return false;
      } else { // Error
        cacheMan.setMessage("", "[Exception ID: " + cgUpdateContact.exceptionId + "] Descripcion: " + cgUpdateContact.exceptionDescription);
        return false;
      }
    },
    deleteContact : function(objRancher, objCon, cbObj, cbMethod) {
      var objToSend = {};
      objToSend.contactId = objCon.contact_id;
      var cgDeleteContact = null;
      if (objRancher.rancher_type == 1) {
        cgDeleteContact = consumingGateway.Delete("RancherContact", objToSend);
      } else if (objRancher.rancher_type == 2) {
        cgDeleteContact = consumingGateway.Delete("EnterpriseContact", objToSend);
      }

      if (cgDeleteContact.exceptionId == 0) { // Deleted successfully
        var tamanio = objRancher.contacts.length;
        for ( var i = 0; i < tamanio; i++) {
          if (objRancher.contacts[i].contact_id == objCon.contact_id) {
            objRancher.contacts.splice(i, 1);
            if (cbMethod) {
              cbObj[cbMethod]();
            }
            return true;
          }
        }
        return false;
      } else { // Error
        cacheMan.setMessage("", "[Exception ID: " + cgDeleteContact.exceptionId + "] Descripcion: " + cgDeleteContact.exceptionDescription);
        return false;
      }
    },
    getBillings : function(objRan) {
      for (i in this.billingsReadFromGateway) {
        if (this.billingsReadFromGateway[i] == objRan.rancher_id) {
          return objRan.billings;
        }
      }
      var objAux = {};
      var arrAux = [];
      var selfCacheRancher = this;
      var objToSend = new Object();
      var cgReadBillings = null;

      this.billingsReadFromGateway.push(objRan.rancher_id);

      objToSend.rancherId = objRan.rancher_id;
      cgReadBillings = consumingGateway.Read("RancherInvoice", objToSend);
      if (cgReadBillings.exceptionId == 0) { // Read successfully
        jQuery.each(cgReadBillings.records, function() {
          jQuery.each(this, function(key, value) {
            objAux[key] = value;
          });
          arrAux.push(selfCacheRancher.rancherBillingAdapterToIn(objAux));
        });
      }
      return objRan.billings = arrAux;
    },
    addBilling : function(objRancher, objCon, cbObj, cbMethod) {
      var objToSend = {};
      var cgCreateBilling = null;

      objCon.rancher_id = objRancher.rancher_id;

      objToSend = this.rancherBillingAdapterToOut(objCon);
      delete objToSend.rancherInvoiceId;
      cgCreateBilling = consumingGateway.Create("RancherInvoice", objToSend);

      if (cgCreateBilling.exceptionId == 0) { // Created successfully
        objCon.billing_id = cgCreateBilling.generatedId;
        objRancher.billings.push(objCon);

        if (cbMethod) {
          cbObj[cbMethod]();
        }
        return true;
      } else { // Error
        cacheMan.setMessage("", "[Exception ID: " + cgCreateBilling.exceptionId + "] Descripcion: " + cgCreateBilling.exceptionDescription);
        return false;
      }

    },
    updateBilling : function(objRancher, objOld, objNew, cbObj, cbMethod) {
      var objToSend = {};
      var cgUpdateBilling = null;
      objNew.rancher_id = objOld.rancher_id;
      objNew.billing_id = objOld.billing_id;

      objToSend = this.rancherBillingAdapterToOut(objNew);
      cgUpdateBilling = consumingGateway.Update("RancherInvoice", objToSend);

      if (cgUpdateBilling.exceptionId == 0) { // Updated successfully
        var tamanio = objRancher.billings.length;
        for ( var i = 0; i < tamanio; i++) {
          if (objRancher.billings[i].billing_id == objOld.billing_id) {
            objRancher.billings[i] = objNew;
            if (cbMethod) {
              cbObj[cbMethod]();
            }
            return true;
          }
        }
        return false;
      } else { // Error
        cacheMan.setMessage("", "[Exception ID: " + cgUpdateBilling.exceptionId + "] Descripcion: " + cgUpdateBilling.exceptionDescription);
        return false;
      }
    },
    deleteBilling : function(objRancher, objCon, cbObj, cbMethod) {
      var objToSend = {};
      objToSend.rancherInvoiceId = objCon.billing_id;
      var cgDeleteBilling = null;
      cgDeleteBilling = consumingGateway.Delete("RancherInvoice", objToSend);

      if (cgDeleteBilling.exceptionId == 0) { // Deleted successfully
        var tamanio = objRancher.billings.length;
        for ( var i = 0; i < tamanio; i++) {
          if (objRancher.billings[i].billing_id == objCon.billing_id) {
            objRancher.billings.splice(i, 1);
            if (cbMethod) {
              cbObj[cbMethod]();
            }
            return true;
          }
        }
        return false;
      } else { // Error
        cacheMan.setMessage("", "[Exception ID: " + cgDeletebilling.exceptionId + "] Descripcion: " + cgDeletebilling.exceptionDescription);
        return false;
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
            rancher.caption = ranchers[property].last_name + ', ' + ranchers[property].first_name + ' / ' + ranchers[property].aka;
          } else {
            rancher.caption = ranchers[property].last_name + ', ' + ranchers[property].first_name;
          }
          ;

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
    addRancherUser : function(objRancher, objContent, cbObj, cbMethod) {
      // Create user
      var sysUser =
        {
          user_name : objContent.user_name,
          password : objContent.password,
          groups :
            [
              {
                role_name : "rancher"
              } ]
        };

      var userCreated = consumingGateway.AddUser(sysUser);
      if (userCreated == 'OK') {
        var objToSend =
          {
            rancherId : objRancher.rancher_id,
            user_name : objContent.user_name
          };
        
        var gwCreateResponse = consumingGateway.Create("RancherUser", objToSend);
        if(gwCreateResponse.exceptionId == 0){
          objRancher.users.push(objToSend);

          if (cbMethod) {
            cbObj[cbMethod]();
          }
          return true;
        }else{
          cacheMan.setMessage("", "[Exception ID: " + cgCreateBilling.exceptionId + "] Descripcion: " + cgCreateBilling.exceptionDescription);
          return false;
        }
        
      } else {
        cacheMan.setMessage("", userCreated);
      }
    },
    getRancherUsers : function(objRan) {
      var objAux = {};
      var arrAux = [];
      var objToSend = new Object();
      var cgReadBillings = null;

      objToSend.rancherId = objRan.rancher_id;
      cgReadBillings = consumingGateway.Read("RancherUser", objToSend);
      if (cgReadBillings.exceptionId == 0) { // Read successfully
        jQuery.each(cgReadBillings.records, function() {
          jQuery.each(this, function(key, value) {
            objAux[key] = value;
          });
          arrAux.push(objAux);
          objAux = {};
        });
      }
      return objRan.users = arrAux;
    },
    deleteRancherUser : function(objRancher, objCon, cbObj, cbMethod) {
      var objToSend = {};
      objToSend.user_name = objCon.user_name;
      var cgDeleteBilling = null;
      cgDeleteBilling = consumingGateway.Delete("RancherUser", objToSend);

      if (cgDeleteBilling.exceptionId == 0) { // Deleted successfully
        var tamanio = objRancher.users.length;
        for ( var i = 0; i < tamanio; i++) {
          if (objRancher.users[i].user_name == objCon.user_name) {
            objRancher.users.splice(i, 1);
            if (cbMethod) {
              cbObj[cbMethod]();
            }
            return true;
          }
        }
        return false;
      } else { // Error
        cacheMan.setMessage("", "[Exception ID: " + cgDeletebilling.exceptionId + "] Descripcion: " + cgDeletebilling.exceptionDescription);
        return false;
      }
    },
    resetRancherPassword : function(userName, newPassword, confirmNewPassword, cbObj, cbMethod) {
      if (newPassword == confirmNewPassword) {
        var result = consumingGateway.ResetPassword(userName, newPassword);
        if (result == 'OK' && cbMethod) {
          cbObj[cbMethod]();
        }
      } else {
        cacheMan.setMessage("", "La contraseña y su confirmación no coinciden.");
      }
    }
  });
var cacheRanchers = new cache.ranchers();

function UTCtoNormalDate(strUTC) {
  var dateFmt = "";
  if (strUTC != "" && strUTC !== undefined) {
    var fmt = new enyo.g11n.DateFmt(
      {
        format : "yyyy/MM/dd",
        locale : new enyo.g11n.Locale("es_es")
      });
    var dateFromUTC = new Date(parseInt(strUTC));
    dateFmt = fmt.format(dateFromUTC);
  }

  return dateFmt;
}

function DateOut(normalDate) {
  var dateFmt = "";
  if (normalDate != "" && normalDate !== undefined) {
    var fmt = new enyo.g11n.DateFmt(
      {
        format : "MM/dd/yyyy",
        locale : new enyo.g11n.Locale("es_es")
      });
    var dateNew = new Date(normalDate);
    dateFmt = fmt.format(dateNew);
  }
  return dateFmt;
}

function phoneOut(p) {

  var phone = p;
  if (phone !== undefined) {
    phone = phone.replace("(", "");
    phone = phone.replace(")", "");
    phone = phone.replace("-", "");
    phone = phone.replace(" ", "");
    phone = phone.replace("_", "");
  }

  return "" + phone;

}
function phoneToMask(p) {
  var phone = p;
  if (phone !== undefined && phone != "") {
    if (phone.length >= 10) {
      phone = phone.slice(-10);
      phone = "(" + phone.substr(0, 3) + ") " + phone.substr(3, 3) + "-" + phone.substr(6);
    }
  }
  return phone;
}