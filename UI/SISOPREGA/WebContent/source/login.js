enyo.kind(
  {
    name : "login",
    kind : enyo.VFlexBox,
    loggedIn : false,
    gotRanchers : false,
    gotCattleClass : false,
    gotCattleType : false,
    gotBarnyards : false,
    gotReceptions : false,
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
                content : "SISOPREGA"
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
                      src : "images/eastman.png"
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
                            hint : "Usuario",
                            selectAllOnFocus : true,
                            onkeydown : "key_down",
                            value : "admin",
                            onfocus : "on_focus",
                            onblur : "lost_focus"
                          },
                          {
                            kind : "PasswordInput",
                            name : "password",
                            hint : "Contraseña",
                            selectAllOnFocus : true,
                            onkeydown : "key_down",
                            value : "admin",
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
                caption : "Entrar",
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
    },
    checkLogIn : function() {
      cacheMan.showScrim();
      consumingGateway.Login(this.$.user.getValue(), this.$.password.getValue(), this, "loginCallBack");
    },
    loginCallBack : function(loginResult) {
      if (loginResult.exceptionId == 0) {
        this.$.user.setValue("");
        this.$.password.setValue("");
        cacheRanchers.get();
        cacheCattle.getCattleClass();
        cacheCattle.getCattleType();
        cacheBY.get();
        cacheReceptions.get();
        cacheMan.hideScrim();
        this.doSucess();
      } else {
        cacheMan.hideScrim();
        this.doFail();
      }
    },
    key_down : function(inSender, inEvent) {
      if (inEvent.keyCode == 13) {
        this.checkLogIn();
      }
    }

  });