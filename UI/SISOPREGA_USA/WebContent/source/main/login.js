enyo.kind(
  {
    name : "login",
    kind : enyo.VFlexBox,
    events :
      {
        "onSucess" : "",
        "onFail" : "",
      },
    components :
      [
        {
          kind : "Toolbar",
          name : "tbHeader",
          components :
            [
              {
                kind : "Spacer"
              },
              {
                kind : "VFlexBox",
                style : "color:#FFF;border:none",
                content : "SISOPREGA LADO AMERICANO"
              },
              {
                kind : "Spacer"
              }, ]
        },
        {
          kind : enyo.Scroller,
          className : "loginBG",
          flex : 1,
          components :
            [
              {
                kind : "VFlexBox",
                align : "center",
                pack : "center",
                components :
                  [
                    {
                      kind : "Spacer"
                    },
                    {
                      kind : "Image",
                      src : "../SISOPREGA_WEB_LIB/images/eastman.png"
                    },
                    {
                      kind : "RowGroup",
                      layoutKind : enyo.VFlexLayout,
                      caption : "",
                      width : "50%;",
                      style : "color:#FFF;margin-top:10%",
                      components :
                        [
                          {
                            kind : "Input",
                            name : "user",
                            hint : "User",
                            selectAllOnFocus : true,
                            onkeydown : "key_down",
                            onfocus : "on_focus",
                            onblur : "lost_focus"
                          },
                          {
                            kind : "PasswordInput",
                            name : "password",
                            hint : "Password",
                            selectAllOnFocus : true,
                            onkeydown : "key_down",
                            onfocus : "on_focus",
                            onblur : "lost_focus"
                          } ]
                    },
                    {
                      kind : "Spacer"
                    } ]
              } ]
        },
        {
          kind : "Toolbar",
          name : "tbHeader2",
          style : "",
          components :
            [
              {
                kind : "Button",
                className : "enyo-button-affirmative",
                style : "background-color:#5f0712",
                flex : 1,
                caption : "Login",
                onclick : "checkLogIn",
                isDefault : "true"
              }, ]
        } ],
    lost_focus : function(InSender, InEvent) {
      InSender.$.input.applyStyle("color", "white");
    },
    on_focus : function(InSender, InEvent) {
      InSender.$.input.applyStyle("color", "black");
    },
    ready : function() {
      this.$.user.$.input.applyStyle("color", "white");
      this.$.password.$.input.applyStyle("color", "white");
      this.$.user.setValue(utils.getCookie("lastUser"));
      this.$.password.setValue(utils.getCookie("lastPass"));
      this.$.user.forceFocus();
    },
    checkLogIn : function() {
      cacheMan.showScrim();
      consumingGateway.Login(this.$.user.getValue().toLowerCase(), this.$.password.getValue(), this.loginCallBack, this);
    },
    loginCallBack : function(loginResult, objRef) {
      if (loginResult.exceptionId == 0) {
        cacheMan.loggedUser = objRef.$.user.getValue();
        objRef.$.user.setValue("");
        objRef.$.password.setValue("");
        var roles = usGateway.getUserRoles(cacheMan.loggedUser);
        var isAdmin = false;
        var isAgency = false;
        for(var roleIndex in roles){
          var role = roles[roleIndex];
          if(role == 'usa_user' || role == 'admin'){
            isAdmin = true;
          } 
          if(role == 'agency'){
            isAgency = true;
          }
        }
        
        if(isAdmin){
          cacheMan.mainView = 'mainAdmin';
        }
        
        if(isAgency && !isAdmin){
          cacheMan.mainView = 'mainAgency';
        }
        
        if(isAdmin || isAgency)
          objRef.doSucess();
        else
          objRef.doFail();
      } else {
        cacheMan.hideScrim();
        objRef.doFail();
      }
    },
    key_down : function(inSender, inEvent) {
      if (inEvent.keyCode == 13) {
        if (inSender.name == "user") {
          this.$.password.forceFocus();
        } else {
          this.checkLogIn();
        }
      }
    }
  });