enyo.kind(
  {
    name : "receptions.feed",
    kind : enyo.VFlexBox,
    iSelect : null,
    _arrBY : null,
    _arrBYSelect : null,
    _objRec : null,
    bySelected : "",
    components :
      [
        {
          kind : "Popup",
          name : "manejo",
          lazy : false,
          cbMethod : "",
          showHideMode : "transition",
          className : "formBG",
          openClassName : "zoomFadeIn",
          className : "transitioner2",
          layoutKind : "VFlexLayout",
          width : "90%",
          style : "overflow: hidden",
          scrim : true,
          components :
            [
              {
                components :
                  [
                    {
                      content : "Manejo"
                    },
                    {
                      kind : "Input",
                      name : "handling",
                      hint : "Agregar comentario"
                    },
                    {
                      kind : "Button",
                      className : "enyo-button-affirmative",
                      caption : "OK",
                      onclick : "closeHandling"
                    } ]
              } ]
        },
        {
          kind : enyo.Scroller,
          name : "scrollProductList",
          flex : 1,
          className : "listBG",
          components :
            [
              {
                kind : enyo.VirtualRepeater,
                name : "productList",
                onSetupRow : "setupRow",
                onclick : "setFeed",
                components :
                  [
                    {
                      kind : enyo.SwipeableItem,
                      layoutKind : "VFlexLayout",
                      onConfirm : "deleteFeed",
                      tapHighlight : true,
                      components :
                        [
                          {
                            name : "by",
                            className : "listFirst",
                            content : "BY"
                          },
                          {
                            layoutKind : enyo.HFlexLayout,
                            components :
                              [
                                {
                                  name : "lblground",
                                  flex : 1,
                                  feed_id : 1,
                                  className : "listSecond",
                                  content : "MOLIDA(0)"
                                },
                                {
                                  name : "lblalfalfa",
                                  flex : 1,
                                  feed_id : 2,
                                  className : "listSecond",
                                  content : "ALFALFA(0)"
                                },
                                {
                                  name : "lbloat",
                                  flex : 1,
                                  feed_id : 3,
                                  className : "listSecond",
                                  content : "AVENA(0)"
                                },
                                {
                                  name : "lblconcentrated",
                                  flex : 1.3,
                                  feed_id : 4,
                                  className : "listSecond",
                                  content : "COCENTRADO(0)"
                                },
                                {
                                  name : "lblcorn",
                                  flex : 1,
                                  feed_id : 5,
                                  className : "listSecond",
                                  content : "MAIZ(0)"
                                }, ]
                          },
                          {
                            name : "lblhandling",
                            className : "listSecond",
                            content : ""
                          } ]
                    }, ]
              }, ],
        },
        {
          kind : "Toolbar",
          components :
            [
              {
                kind : "ToolInput",
                name : "ground",
                flex : 1,
                width : "10%",
                inputType : "number",
                hint : "Molida",
                changeOnInput : true,
              },
              {
                kind : "ToolInput",
                name : "alfalfa",
                flex : 1,
                width : "10%",
                inputType : "number",
                hint : "Alfalfa",
                changeOnInput : true,
              },
              {
                kind : "ToolInput",
                name : "oat",
                flex : 1,
                width : "10%",
                inputType : "number",
                hint : "Avena",
                changeOnInput : true,
              },
              {
                kind : "ToolInput",
                name : "concentrated",
                flex : 1.3,
                width : "12%",
                inputType : "number",
                hint : "Concentrado",
                changeOnInput : true,
              },
              {
                kind : "ToolInput",
                name : "corn",
                flex : 1,
                width : "10%",
                inputType : "number",
                hint : "Maiz",
                changeOnInput : true,
              },
              {
                kind : "Spacer"
              },
              {
                kind : "Drawer",
                name : "draAdd",
                components :
                  [
                    {
                      layoutKind : "HFlexLayout",
                      align : "center",
                      components :
                        [
                          {
                            kind : "enyo.IconButton",
                            name : "btnReport",
                            icon : "images/command-menu/menu-icon-cards.png",
                            onclick : "openFeedingReport"
                          },
                          {
                            kind : "enyo.IconButton",
                            name : "btnAdd",
                            icon : "images/menu-icon-new.png",
                            onclick : "addFeedHandling"
                          } ]
                    } ]
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
                            kind : "enyo.IconButton",
                            name : "btnUpdate",
                            icon : "images/btn_edit.png",
                            flex : 1,
                            onclick : "updateFeedHandling"
                          },
                          {
                            kind : "Button",
                            name : "btnCancel",
                            className : "enyo-button-negative",
                            flex : 1,
                            caption : "X",
                            onclick : "toggleAdd"
                          }, ]
                    } ]
              } ]
        }, ],
    ready : function(InSender, InEvent) {
    	if(enyo.$.sisoprega_receptionsMap){
    		_objPopupHeader = enyo.$.sisoprega_receptionsMap.$.lblInfo;	
    		this.bySelected = enyo.$.sisoprega_receptionsMap.$.lblBYselected;
    	}else if(enyo.$.sisoprega_mainMenu_receptionsMap){
    		_objPopupHeader = enyo.$.sisoprega_mainMenu_receptionsMap.$.lblInfo;
    		this.bySelected = enyo.$.sisoprega_mainMenu_receptionsMap.$.lblBYselected;
    	}    	
    	_objPopupHeader.setContent(_objMainHeader.getContent());    	
    },
    setupRow : function(inSender, inIndex) {
      var objFeed;
      if (this._objRec.feed) {
        if (objFeed = this._objRec.feed[inIndex]) {
          var objFeedfeed;
          var sBy = "";
          for ( var sKey in objFeed.barnyards) {
            sBy += sKey.slice(1) + ", ";
          }
          sBy = sBy.slice(0, -2);
          this.$.lblhandling.setContent(objFeed.handling);
          this.$.by.setContent("" + objFeed.dateAndTime + "   Corrales: [" + sBy + "]");
          if (objFeedfeed = objFeed.feed[this.$.lblground.feed_id]) {
            if (objFeedfeed.feed_units) {
              this.$.lblground.setContent(objFeedfeed.feed_desc + " ( " + objFeedfeed.feed_units + " )");
            }
          }
          if (objFeedfeed = objFeed.feed[this.$.lblalfalfa.feed_id]) {
            if (objFeedfeed.feed_units) {
              this.$.lblalfalfa.setContent(objFeedfeed.feed_desc + " ( " + objFeedfeed.feed_units + " )");
            }
          }
          if (objFeedfeed = objFeed.feed[this.$.lbloat.feed_id]) {
            if (objFeedfeed.feed_units) {
              this.$.lbloat.setContent(objFeedfeed.feed_desc + " ( " + objFeedfeed.feed_units + " )");
            }
          }
          if (objFeedfeed = objFeed.feed[this.$.lblconcentrated.feed_id]) {
            if (objFeedfeed.feed_units) {
              this.$.lblconcentrated.setContent(objFeedfeed.feed_desc + " ( " + objFeedfeed.feed_units + " )");
            }
          }
          if (objFeedfeed = objFeed.feed[this.$.lblcorn.feed_id]) {
            if (objFeedfeed.feed_units) {
              this.$.lblcorn.setContent(objFeedfeed.feed_desc + " ( " + objFeedfeed.feed_units + " )");
            }
          }
          return true;
        }
      }
    },
    deleteFeed : function(inSender, inIndex) {
      cacheReceptions.deleteFeed(this._objRec.feed, this._objRec.feed[inIndex], this, "afterDelete");
    },
    afterDelete : function() {
      this.resetValues();
      this.$.productList.render();
    },
    closeHandling : function() {
      this.$.manejo.close();
      this[this.$.manejo.cbMethod]();
    },
    addFeedHandling : function() {
      this.$.manejo.cbMethod = "addFeed";
      this.$.manejo.openAtCenter();
    },
    updateFeedHandling : function() {
      this.$.manejo.cbMethod = "updateFeed";
      this.$.manejo.openAtCenter();
    },
    addFeed : function() {
      cacheReceptions.addFeed(this._objRec, this.getFeed("add"), this, "resetValues");
    },
    getFeed : function(sOp) {
      var objData =
        {
          feeding_id : null,
          barnyards : {},
          feed : {},
          handling : ""
        };

      var objFeed =
        {
          feed_id : "",
          feed_desc : "",
          feed_units : ""
        };
      objFeed.feed_id = 1;
      objFeed.feed_desc = cacheFeed.getByID(objFeed.feed_id).feed_desc;
      objFeed.feed_units = this.$.ground.getValue();
      objData.feed[objFeed.feed_id] = objFeed;

      objFeed =
        {
          feed_id : "",
          feed_desc : "",
          feed_units : ""
        };
      objFeed.feed_id = 2;
      objFeed.feed_desc = cacheFeed.getByID(objFeed.feed_id).feed_desc;
      objFeed.feed_units = this.$.alfalfa.getValue();
      objData.feed[objFeed.feed_id] = objFeed;

      objFeed =
        {
          feed_id : "",
          feed_desc : "",
          feed_units : ""
        };
      objFeed.feed_id = 3;
      objFeed.feed_desc = cacheFeed.getByID(objFeed.feed_id).feed_desc;
      objFeed.feed_units = this.$.oat.getValue();
      objData.feed[objFeed.feed_id] = objFeed;

      objFeed =
        {
          feed_id : "",
          feed_desc : "",
          feed_units : ""
        };
      objFeed.feed_id = 4;
      objFeed.feed_desc = cacheFeed.getByID(objFeed.feed_id).feed_desc;
      objFeed.feed_units = this.$.concentrated.getValue();
      objData.feed[objFeed.feed_id] = objFeed;

      objFeed =
        {
          feed_id : "",
          feed_desc : "",
          feed_units : ""
        };
      objFeed.feed_id = 5;
      objFeed.feed_desc = cacheFeed.getByID(objFeed.feed_id).feed_desc;
      objFeed.feed_units = this.$.corn.getValue();
      objData.feed[objFeed.feed_id] = objFeed;
      objData.handling = this.$.handling.getValue();
      if (sOp == "add") {
        objData.barnyards = enyo.clone(this._arrBY);
      } else {
        objData.barnyards = enyo.clone(this._arrBYSelected);
      }
      return objData;
    },
    updateFeed : function() {
      cacheReceptions.updateFeed(this._objRec.feed[this.iSelect], this.getFeed(), this, "afterUpdate");
    },
    afterUpdate : function() {
      this.toggleAdd();
      this.resetValues();
      this.updatetList();
    },
    updatetList : function() {
      this.$.productList.render();
      this.updateHeader();
    },
    set : function(objRec, arrBY) {
      this._objRec = objRec;
      this._arrBY = arrBY;
      this.resetValues(true);
    },
    setFeed : function(inSender, inEvent) {
      this.resetValues();
      this.iSelect = inEvent.rowIndex;
      var objFeed;
      if (objFeed = this._objRec.feed[inEvent.rowIndex]) {
        if (objFeedfeed = objFeed.feed[this.$.lblground.feed_id]) {
          this.$.ground.setValue(objFeedfeed.feed_units);
        }
        if (objFeedfeed = objFeed.feed[this.$.lblalfalfa.feed_id]) {
          this.$.alfalfa.setValue(objFeedfeed.feed_units);
        }
        if (objFeedfeed = objFeed.feed[this.$.lbloat.feed_id]) {
          this.$.oat.setValue(objFeedfeed.feed_units);
        }
        if (objFeedfeed = objFeed.feed[this.$.lblconcentrated.feed_id]) {
          this.$.concentrated.setValue(objFeedfeed.feed_units);
        }
        if (objFeedfeed = objFeed.feed[this.$.lblcorn.feed_id]) {
          this.$.corn.setValue(objFeedfeed.feed_units);
        }
        this.toggleUpdate();
        this._arrBYSelected = objFeed.barnyards;
        this.$.handling.setValue(objFeed.handling);
      }

    },
    toggleUpdate : function() {
      this.$.draAdd.setOpen(false);
      this.$.draUpdate.setOpen(true);
    },
    toggleAdd : function() {
      this.$.draAdd.setOpen(true);
      this.$.draUpdate.setOpen(false);
    },
    resetValues : function(bLoad) {
      //get last formula
      //same by?
      var bLast = true;
      //var feedLast;
      if (bLoad === true && this._objRec.feed.length > 0) {
        for ( var sKey in this._arrBY) {
          if (!this._objRec.feed[this._objRec.feed.length - 1].barnyards[sKey]) {
            bLast = false;
            break;
          }
        }
        if (bLast == true) {
          for ( var sKey in this._objRec.feed[this._objRec.feed.length - 1].barnyards) {
            if (!this._arrBY[sKey]) {
              bLast = false;
              break;
            }
          }
        }
      } else {
        bLast = false;
      }
      if (bLoad === true && bLast === true) {
        var objFeed = this._objRec.feed[this._objRec.feed.length - 1].feed;
        var objFeedF;
        this.$.handling.setValue(this._objRec.feed[this._objRec.feed.length - 1].handling);
        if (objFeedF = objFeed[1]) {
          this.$.ground.setValue(objFeedF.feed_units);
        }
        if (objFeedF = objFeed[2]) {
          this.$.alfalfa.setValue(objFeedF.feed_units);
        }
        if (objFeedF = objFeed[3]) {
          this.$.oat.setValue(objFeedF.feed_units);
        }
        if (objFeedF = objFeed[4]) {
          this.$.concentrated.setValue(objFeedF.feed_units);
        }
        if (objFeedF = objFeed[5]) {
          this.$.corn.setValue(objFeedF.feed_units);
        }
      } else {
        this.$.ground.setValue("");
        this.$.alfalfa.setValue("");
        this.$.oat.setValue("");
        this.$.concentrated.setValue("");
        this.$.corn.setValue("");
        this.$.handling.setValue("");
      }
      this.updatetList();
    },
    updateHeader : function() {
      var corralesSeleccionados = "";
      var arrAux = this._arrBY;
      for (i in arrAux) {
        corralesSeleccionados = "" + corralesSeleccionados + " " + arrAux[i].slice(1) + " ";
      }
      corralesSeleccionados.slice(-2);
      this.bySelected.setContent("Alimentando corrales: " + corralesSeleccionados);
    },
    openFeedingReport : function() {
      window.open('/ReportingGateway/FeedOrder?orderId='+ this._objRec.feed[this._objRec.feed.length - 1].feeding_id,'_blank');
      window.focus();
    }
  });