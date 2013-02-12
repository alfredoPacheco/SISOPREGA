/**
 * Provides a handler for rancher data options.
 * 
 * Revision History: 
 * - 02/03/2013 By Diego Torres: Initial Version. 
 * 
 */
enyo.kind(
  {
    name : "catalogs.ranchers.users.create",
    kind : enyo.SlidingView,
    layoutKind : enyo.VFlexLayout,
    events :
      {
        "onAddRancherUser" : "",
        "onResetPassword" : "",
        "onCancel" : ""
      },
    objRan : null,
    objUser : {},
    NO_CHANGED : '!$NoChanged$!',
    components :
      [
        {
          kind : enyo.Scroller,
          className : "formBG",
          flex : 1,
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
                      name : "user_name",
                      hint : "Usuario",
                      maxlength: "30"
                    },
                    {
                      kind : "PasswordInput",
                      name : "password",
                      hint : "Contraseña"
                    },
                    {
                      kind : "PasswordInput",
                      name : "confirm_password",
                      hint : "Confirmar"
                    }]
              },
              {
                kind : "Drawer",
                name : "draAdd",
                components :
                  [
                    {
                      kind : "Button",
                      name : "btnAdd",
                      className : "enyo-button-affirmative",
                      caption : "Crear",
                      onclick : "addRancherUser"
                    }, ]
              },
              {
                kind : "Drawer",
                name : "draUpdate",
                components :
                  [
                    {
                      layoutKind : "HFlexLayout",
                      align : "center",
                      components :
                        [
                          {
                            kind : "Button",
                            name : "btnUpdate",
                            className : "enyo-button-affirmative",
                            flex : 1,
                            caption : "Actualizar",
                            onclick : "resetPassword"
                          },
                          {
                            kind : "Button",
                            name : "btnCancel",
                            className : "enyo-button-negative",
                            flex : 1,
                            caption : "Cancelar",
                            onclick : "doCancel"
                          }, ]
                    } ]
              } ]
        } ],
    ready : function() {
      this.$.draAdd.setOpen(true);
      this.$.draUpdate.setOpen(false);
    },
    resetValues : function() {
      this.objUser = null;
      this.$.user_name.setValue("");
      this.$.password.setValue("");
      this.$.confirm_password.setValue("");
    },
    resetPassword : function() {
      if(this.$.password.getValue() != this.NO_CHANGED){
        cacheRanchers.resetRancherPassword(this.$.user_name.getValue(), this.$.password.getValue(), this.$.confirm_password.getValue(), this, "doResetPassword");
      }
    },
    setRancher : function(objRancher) {
      this.objRan = objRancher;
    },
    toggleAdd : function() {
      this.$.draAdd.setOpen(true);
      this.$.draUpdate.setOpen(false);
      this.resetValues();
      // TODO: Enable or show user_name field
      this.$.user_name.disabled = false;
    },
    getRancherUserDetails : function(){
      var userDetails = {
          user_name : "",
          password : "",
          confirm_password: ""
      };
      
      userDetails.user_name = this.$.user_name.getValue();
      userDetails.password = this.$.password.getValue();
      userDetails.confirm_password = this.$.confirm_password.getValue();
      
      return userDetails;
    },
    addRancherUser : function() {
      var userDetails = this.getRancherUserDetails();
      if(userDetails.password == userDetails.confirm_password){
        cacheRanchers.addRancherUser(this.objRan, userDetails, this, "doAddRancherUser");
      }else{
        cacheMan.setMessage("", "La contraseña y su confirmación no coinciden.");
      }
    },
    setUser : function(objRancher, pObjUser){
      this.objRan = objRancher;
      this.objUser = pObjUser;
      this.$.user_name.setValue(pObjUser.user_name);
      this.$.password.setValue(this.NO_CHANGED);
      this.$.confirm_password.setValue(this.NO_CHANGED);
      
      this.toggleUpdate();
    },
    toggleUpdate : function(){
      this.$.draAdd.setOpen(false);
      this.$.draUpdate.setOpen(true);
      // TODO: Disable or hide user_name field
      this.$.user_name.disabled = true;
    }
  });