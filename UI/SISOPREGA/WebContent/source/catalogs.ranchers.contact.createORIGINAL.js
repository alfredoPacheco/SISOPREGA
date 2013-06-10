enyo.kind(
  {
    name : "catalogs.ranchers.contact.create",
    kind : "Control",
    layoutKind : enyo.VFlexLayout,
    events :
      {
        "onAddRancher" : "",
        "onUpdateRancher" : "",
        "onCancel" : ""
      },
    objRancher : null,
    objContact : {},
    components :
      [
        {
          kind : enyo.Scroller,
          horizontal : false,
          autoHorizontal : false,
          flex : 1,
          className : "formBG",
          components :
            [
              {
                kind : "RowGroup",
                defaultKind : "HFlexBox",
                caption : "",
                style : "color:#FFF",
                components :
                  [
                    {
                      kind : "Input",
                      name : "aka",
                      hint : "Alias",
                      inputClassName : "blankInput",
                      focusClassName : "darkFocus",
                      bindTo: "aka"
                    },
                    {
                      kind : "Input",
                      name : "first_name",
                      hint : "Nombres",
                      inputClassName : "blankInput",
                      focusClassName : "darkFocus",
                      bindTo:"firstName"
                    },
                    {
                      kind : "Input",
                      name : "last_name",
                      hint : "Apellido Paterno",
                      inputClassName : "blankInput",
                      focusClassName : "darkFocus",
                      bindTo:"lastName"
                    },
                    {
                      kind : "Input",
                      name : "mother_name",
                      hint : "Apellido Materno",
                      inputClassName : "blankInput",
                      focusClassName : "darkFocus",
                      bindTo:"motherName"
                    },
                    {
                      kind : "VFlexBox",
                      style : "",
                      components :
                        [
                          {
                            content : "Fecha de Nacimiento",
                          },
                          {
                            kind : "DatePicker",
                            name : "birth_date",
                            label : "",
                            minYear : 1940,
                            maxYear : new Date().getFullYear(),
                            className : "picker-hbox",
                            bindTo:"birthDate"
                          } ]
                    },
                    {
                      kind : "Input",
                      name : "email_add",
                      hint : "Email",
                      inputClassName : "blankInput",
                      focusClassName : "darkFocus",
                      bindTo:"emailAddress"
                    },
                    {
                      kind : "Input",
                      name : "phone_number",
                      hint : "Telefono",
                      inputClassName : "blankInput",
                      focusClassName : "darkFocus",
                      onfocus : "applyMask",
                      bindTo:"telephone"
                    },
                    {
                      kind : "Input",
                      name : "address_one",
                      hint : "Domicilio",
                      inputClassName : "blankInput",
                      focusClassName : "darkFocus",
                      bindTo:"addressOne"
                    },
                    {
                      kind : "Input",
                      name : "address_two",
                      hint : "Colonia",
                      inputClassName : "blankInput",
                      focusClassName : "darkFocus",
                      bindTo:"addressTwo"
                    },
                    {
                      kind : "Input",
                      name : "city",
                      hint : "Ciudad",
                      inputClassName : "blankInput",
                      focusClassName : "darkFocus",
                      bindTo:"city"
                    },
                    {
                      kind : "Input",
                      name : "address_state",
                      hint : "Estado",
                      inputClassName : "blankInput",
                      focusClassName : "darkFocus",
                      bindTo : "addressState"
                    },
                    {
                      kind : "Input",
                      name : "zip_code",
                      hint : "Codigo Postal",
                      inputClassName : "blankInput",
                      focusClassName : "darkFocus",
                      bindTo:"zipCode"
                    } ]
              } ]
        },{
          kind : "catalogs.commonButtons",
          entityType : "RancherContact",
          name : "commonButtons",
          onBeforeSave : "before_save",
          onUpdateEntity : "updated",
          onCancel : "doCancel"
        } ],
    updateRancher : function() {
      cacheRanchers.updateContact(this.objRancher, this.objContact, this.getContact(), this, "doUpdateRancher");
    },
    getContact : function() {
      var fmt = new enyo.g11n.DateFmt(
        {
          format : "yyyy/MM/dd",
          locale : new enyo.g11n.Locale("es_es")
        });

      var objContact =
        {
          contact_id : "",
          rancher_id : "",
          aka : "",
          first_name : "",
          last_name : "",
          mother_name : "",
          birth_date : "",
          email_add : "",
          phone_number : "",
          address_one : "",
          address_two : "",
          city : "",
          address_state : "",
          zip_code : ""
        };

      objContact.aka = this.$.aka.getValue();
      objContact.first_name = this.$.first_name.getValue();
      objContact.last_name = this.$.last_name.getValue();
      objContact.mother_name = this.$.mother_name.getValue();
      if (this.$.birth_date.getValue() != null) {
        objContact.birth_date = fmt.format(this.$.birth_date.getValue());
      }
      objContact.email_add = this.$.email_add.getValue();
      objContact.phone_number = this.$.phone_number.getValue();
      objContact.address_one = this.$.address_one.getValue();
      objContact.address_two = this.$.address_two.getValue();
      objContact.city = this.$.city.getValue();
      objContact.address_state = this.$.address_state.getValue();
      objContact.zip_code = this.$.zip_code.getValue();
      return objContact;
    },
    addContact : function() {
      cacheRanchers.addContact(this.objRancher, this.getContact(), this, "doAddRancher");
    },
    setRancher : function(objRancher) {
      this.objRancher = objRancher;
    },
    setEntity : function(objRancher, objContact) {
      this.$.commonButtons.parentObject = objRancher;
      this.$.commonButtons.setEntity(objContact);
    },
    toggleAdd : function() {
      this.$.commonButtons.parentObject = this.objRancher;
      
      if(this.objRancher.rancher_type == 1){
        this.$.commonButtons.entityType = "RancherContact";
      }else{
        this.$.commonButtons.entityType = "EnterpriseContact";
      }
      
      this.$.commonButtons.updatingEntityId = this.objRancher.rancherId;
      
      this.$.commonButtons.toggleAdd();
    },
    applyMask : function(inSender) {
      var _id = inSender.$.input.getId();
      jQuery(function(j) {
        j(document.getElementById(_id)).mask('(999) 999-9999');
      });
    }
  });