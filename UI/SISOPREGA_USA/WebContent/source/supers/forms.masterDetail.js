enyo
    .kind(
      {
        name : "forms.masterDetail",
        kind : "forms.simple",
        objMaster : {},
        arrDetail : [],
        detailNumber : 0,
        openOnce:false,
        style : "background-color:#DABD8B;font-size:15px;",
        components : [
              {
                kind : enyo.VFlexBox,
                style : "padding:20px;",
                pack : "center",
                name : "masterFields"
              },
              {
                kind : "HFlexBox",
                className : "listFirst",
                style : "padding-left:100px;",
                align : "center",
                pack : "start",
                components : [
                      {
                        kind : "HFlexBox",
                        align : "center",
                        pack : "start",
                        name : "detailFields"
                      },
                      {
                        content : '<button type="button" style="border: 0;background-color: transparent;margin: 0px;padding: 0px;color: #292929;font-size: 16px;">Agregar</button>',
                        allowHtml : true,
                        onclick : "addDetailItem",
                        onmousedown : "buttonDown",
                        onmouseup : "buttonUp",
                        onmouseout : "buttonUp",
                        onmouseover : "buttonDown",
                        className : "enyo-button",
                        style : "background-color:  #DABD8B;"
                      }
                ]
              },
              {// HEADER:
                kind : "HFlexBox",
                className : "listFirst",
                style : "font-size:13px;background-color:#DABD8B;border-bottom-style: solid;border-bottom-color: #482400;",
                height : "30px",
                align : "center",
                pack : "start",
                name : "detailHeader",
                components : [
                      {// For detail_number
                        style : "width:30px;margin-left:30px",
                      },
                ]
              },
              {
                kind : enyo.Scroller,
                name : "detailScroller",
                flex : 1,
                style : "background-color: #482400;",
                autoHorizontal : false,
                horizontal : false,
                components : [
                    {
                      kind : enyo.VirtualRepeater,
                      name : "list",
                      onSetupRow : "setupRow",
                      components : [
                          {
                            kind : enyo.SwipeableItem,
                            layoutKind : enyo.HFlexLayout,
                            align : "center",
                            pack : "start",
                            height : "40px",
                            className : "listBG",
                            onConfirm : "delDetailItem",
                            name : "detailItem",
                            style : "padding:0px;",
                            components : [
                                  {
                                    name : 'detail_number',
                                    className : "listSecond",
                                    style : "width:30px;margin-left:30px;color:#5F0712",
                                  }
                            ]
                          }
                      ]
                    }
                ]
              },
              {
                kind : enyo.VFlexBox,
                style : "padding:20px;border-top-style: solid;border-top-color:#482400",
                pack : "center",
                components : [
                    {
                      kind : enyo.HFlexBox,
                      align : "center",
                      height : "40px;",
                      style : "font-size:14px;",
                      components : [
                            {
                              kind : enyo.Spacer
                            },
                            {
                              kind : enyo.Button,
                              caption : "Guardar",
                              onclick : "addEntity",
                              style : "background-color: #DABD8B;"
                            },
                            {
                              kind : enyo.Button,
                              caption : "Cacelar",
                              onclick : "cancel",
                              style : "background-color: #DABD8B;"
                            }
                      ]
                    }
                ]
              }
        ],
        
        ready : function() {
            
            if(!this.openOnce){
        	var dataFields = this.$.detailFields.children;
                var count = 0;
                for ( var i = 0; i < dataFields.length; i++) {
                  if (dataFields[i].hasOwnProperty("bindTo")) {
                    var sStyle = "";
                    sStyle += "margin-right:15px;margin-left:30px;";
                    sStyle += "min-width:" + dataFields[i].width;
                    sStyle += "text-align:" + dataFields[i].textAlign || "left";
                    this.$.detailHeader.createComponent(
                      {
                        content : dataFields[i].hint,
                        style : sStyle,
                      },
                      {
                        owner : this
                      });
                    
                    this.$.detailItem.createComponent(
                      {
                        name : "detailItem" + count++,
                        className : "listSecond",
                        style : sStyle,
                        bindTo : dataFields[i].bindTo,
                        belongsTo : dataFields[i].belongsTo
                      },
                      {
                        owner : this
                      });
                  } else if (dataFields[i].hasOwnProperty("calculated")) {
                    var sStyle = "";
                    sStyle += "margin-right:15px;margin-left:30px;";
                    sStyle += "min-width:" + dataFields[i].width;
                    sStyle += "text-align:" + dataFields[i].textAlign || "left";
                    this.$.detailHeader.createComponent(
                      {
                        content : dataFields[i].hint,
                        style : sStyle,
                      },
                      {
                        owner : this
                      });
                    
                    this.$.detailItem.createComponent(
                      {
                        name : "detailItem" + count++,
                        className : "listSecond",
                        style : sStyle,
                        calculated : dataFields[i].calculated
                      },
                      {
                        owner : this
                      });
                    
                  }
                }
        	this.openOnce = true;
            }
            
          
          
        },
        buttonDown : function(inSender, inEvent) {
          if (inEvent.which) {
            inSender.setClassName("enyo-button enyo-button-hot enyo-button-down");
          }
        },
        buttonUp : function(inSender, inEvent) {
          inSender.setClassName("enyo-button");
        },
        addDetailItem : function() {
          var newObject =
            {
              fields : []
            };
          
          var detailFields = this.$.detailFields.children;
          for ( var i = 0; i < detailFields.length; i++) {
            if (detailFields[i].hasOwnProperty("bindTo")) {
              newObject.fields[i] = detailFields[i].getValue();
              newObject[detailFields[i].bindTo] = this.getValueFromControl(detailFields[i]);
              if(detailFields[i].kind == 'controls.autocomplete')
                this.setValueForControl(detailFields[i], -1);
              else
                this.setValueForControl(detailFields[i], '');
            }
            
          }
          
          this.arrDetail.push(newObject);
          this.updateList();
          this.$.detailScroller.scrollTo(this.$.detailScroller.getBoundaries().bottom, 0);
        },
        getEntity : function() {
          var objEntity = this.inherited(arguments);
          var detail = [];
          
          for ( var i = 0; i < this.arrDetail.length; i++) {
            var objItem = enyo.clone(this.arrDetail[i]);
            delete objItem.fields;
            detail.push(objItem);
          }
          objEntity[this.$.detailFields.children[0].belongsTo] = detail;
          return objEntity;
        },
        delDetailItem : function(inSender, inIndex) {
          this.arrDetail.splice(inIndex, 1);
          this.updateList();
        },
        setupRow : function(inSender, inIndex) {
          if (objItem = this.arrDetail[inIndex]) {
            this.$.detail_number.setContent(inIndex + 1);
            for ( var i = 0; i < objItem.fields.length; i++) {
              if (this.$["detailItem" + i] !== undefined) {
                this.$["detailItem" + i].content = objItem.fields[i];
              }
            }
            return true;
          }
        },
        afterUpdate : function() {
          this.updateList();
        },
        afterAddEntity : function(){
          this.arrDetail = [];
          this.updateList();
          this.inherited(arguments);
        },
        updateList : function() {
          this.$.list.render();
        },
        cancel : function() {
          this.arrDetail = [];
          this.updateList();
          this.inherited(arguments);
        }
      });