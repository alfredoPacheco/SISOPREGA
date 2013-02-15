/**  
 * 
 * Provides a handler for users administration.  
 * Revision History:   
 * - 02/06/2013 By Diego Torres: Initial Version.
 *  
 * */
enyo.kind(
  {
    name : "users.create",
    kind : enyo.VFlexBox,
    events :
      {
        "onAddUser" : "",
        "onUpdateUser" : "",
        "onCancel" : ""
      },
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
                      maxlength : "30"
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
                    },
                    {
                      layoutKind : enyo.HFlexLayout,
                      align : "center",
                      components :
                        [
                          {
                            content : "Mex User",
                            className : "enyo-label",
                            flex : 1
                          },
                          {
                            kind : "CheckBox",
                            name : "isMexUser"
                          } ]
                    },
                    {
                      layoutKind : enyo.HFlexLayout,
                      align : "center",
                      components :
                        [
                          {
                            content : "Admin",
                            className : "enyo-label",
                            flex : 1
                          },
                          {
                            kind : "CheckBox",
                            name : "isAdmin"
                          } ]
                    } ]
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
                      onclick : "addUser"
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
                            onclick : "updateUser"
                          },
                          {
                            kind : "Button",
                            name : "btnCancel",
                            className : "enyo-button-negative",
                            flex : 1,
                            caption : "Cancelar",
                            onclick : "cancel"
                          }, ]
                    } ]
              } ]
        } ],
    ready : function() {
      this.$.draAdd.setOpen(true);
      this.$.draUpdate.setOpen(false);
    },
    resetValues : function() {
      this.$.user_name.setValue("");
      this.$.password.setValue("");
      this.$.confirm_password.setValue("");
      this.$.isAdmin.setChecked(false);
      this.$.isMexUser.setChecked(false);
    },
    setUser : function(parUser) {
      this.resetValues();
      if (parUser) {
        this.objUser = parUser;

        this.$.user_name.setValue(parUser.userName);
        this.$.password.setValue(parUser.password);
        this.$.confirm_password.setValue(parUser.password);

        // Iterate groups to set check box values
        for (index in parUser.groups) {
          if (parUser.groups[index] == 'admin') {
            this.$.isAdmin.setChecked(true);
          } else if (parUser.groups[index] == 'mex_user') {
            this.$.isMexUser.setChecked(true);
          }

        } // for
      } // if parUser
      this.toggleUpdate();
    },
    toggleUpdate : function() {
      this.$.draAdd.setOpen(false);
      this.$.draUpdate.setOpen(true);
    },
    toggleAdd : function() {
      this.$.draAdd.setOpen(true);
      this.$.draUpdate.setOpen(false);
      this.resetValues();
    },
    updateUser : function() {
      if (this.$.password.getValue() != this.NO_CHANGED) {
        if (this.$.password.getValue() != this.$.confirm_password.getValue()) {
          alert("La contraseña y su confirmación no coinciden.");
          return false;
        }
        if (this.$.password.getValue() == "") {
          alert("Debe proveer una contraseña");
        }

        cacheUsers.resetPassword(this.objUser.userName, this.$.password.getValue());
      }

      if (this.$.isMexUser.getChecked()) {
        if (!this.userHasGroup("mex_user"))
          cacheUsers.addGroup(this.objUser.userName, "mex_user");
      } else {
        if (this.userHasGroup("mex_user"))
          cacheUsers.removeGroup(this.objUser.userName, "mex_user");
      }

      if (this.$.isAdmin.getChecked()) {
        if (!this.userHasGroup("admin"))
          cacheUsers.addGroup(this.objUser.userName, "admin");
      } else {
        if (this.userHasGroup("admin"))
          cacheUsers.removeGroup(this.objUser.userName, "admin");
      }

      cacheMan.goBack();
    },
    addUser : function() {
      if (this.$.password.getValue() != this.$.confirm_password.getValue()) {
        alert("La contraseña y su confirmación no coinciden.");
        return false;
      }
      if (this.$.password.getValue() == "") {
        alert("Debe proveer una contraseña");
        return false;
      }
      var newUser =
        {
          user_name : this.$.user_name.getValue(),
          password : this.$.password.getValue(),
          groups : []
        };

      if (this.$.isAdmin.getChecked()) {
        var role = {role_name:'admin'};
        newUser.groups.push(role);
      }
      
      if (this.$.isMexUser.getChecked()) {
        var role = {role_name:'mex_user'};
        newUser.groups.push(role);
      }
      
      if(cacheUsers.createUser(newUser)){
        cacheMan.goBack();
      }
    },
    userHasGroup : function(groupName) {
      for (index in this.objUser.groups) {
        if (this.objUser.groups[index] == groupName)
          return true;
      }
      return false;
    },
    cancel : function() {
      cacheMan.goBack();
    }
  });
