enyo
    .kind(
      {
        name : "admin.sales",
        kind : "VFlexBox",
        className : "enyo-bg",
        arrData : [],
        iHeads : null,
        iWeight : null,
        arrSelectedItems : {},
        events :
          {
            onSelect : "",
            onShipment : "",
            onUpdateView : "",
            onLoadCompleted : ""
          },
        components : [
              {
                kind : "Toolbar",
                components : [
                      {
                        kind : "VFlexBox",
                        content : "Ventas",
                        onclick : "doSelect",
                        flex : 1,
                        style : "color:white;font-size:15px;"
                      },
                      {
                        kind : "Button",
                        caption : "Programar Embarque",
                        onclick : "doShipment"
                      }
                ]
              },
              {// HEADER:
                kind : "HFlexBox",
                className : "listFirst",
                style : "font-size:12px;background-color:#DABD8B;border-bottom-style: solid;border-bottom-color: black;padding: 0px 10px;border-width: 1px;",
                height : "30px",
                align : "center",
                pack : "start",
                components : [
                      {
                        content : 'Fecha',
                        flex : 1
                      },
                      {
                        content : 'Cabezas',
                        flex : 1.5,
                        style : "text-align: right;"
                      },
                      {
                        content : 'Peso',
                        flex : 1.5,
                        style : "text-align: right;"
                      },
                      {
                        content : 'Promedio',
                        flex : 1.5,
                        style : "text-align: right;margin-right:17px;"
                      },
                      {
                        content : '',
                        width : "30px"
                      },
                ]
              },
              {
                kind : "Scroller",
                flex : 1,
                components : [
                    {
                      kind : enyo.VirtualRepeater,
                      name : "listSales",
                      onSetupRow : "loadSales",
                      onclick : "selectSale",
                      components : [
                          {
                            kind : enyo.Item,
                            style : "font-size:12px;",
                            components : [
                                  {
                                    layoutKind : enyo.HFlexLayout,
                                    align : "center",
                                    components : [
                                          {
                                            name : "lblSalesDate",
                                            flex : 1,
                                            content : ""
                                          },
                                          {
                                            name : "lblSalesHeads",
                                            flex : 1.5,
                                            content : "",
                                            style : "text-align: right;"
                                          },
                                          {
                                            name : "lblSalesWeight",
                                            flex : 1.5,
                                            content : "",
                                            style : "text-align: right;"
                                          },
                                          {
                                            name : "lblSalesAverage",
                                            flex : 1.5,
                                            content : "",
                                            style : "text-align: right;margin-right:17px;"
                                          },
                                          {
                                            kind : "CheckBox",
                                            name : "chkSalesShip",
                                            iPos : "",
                                            checked : false,
                                            onclick : "checkBox_click"
                                          },
                                    ]
                                  },
                                  {
                                    layoutKind : enyo.HFlexLayout,
                                    components : [
                                          {
                                            name : "lblSalesClient",
                                            style : "font-size: 0.85em;color:#008B8B",
                                            content : "Comprador"
                                          },
                                          {
                                            kind : "Spacer"
                                          },
                                          {
                                            name : "lblShipProgrammed",
                                            allowHtml : true,
                                            style : "color:gray;font-size:0.85em;text-align:right;",
                                            content : ""
                                          }
                                    ]
                                  }
                            ]
                          }
                      ]
                    }
                ]
              },
              {
                kind : "Toolbar",
                components : [
                      {
                        kind : "RowGroup",
                        contentFit : true,
                        align : "center",
                        flex : .1,
                        style : "backgound-color:white;margin:0;",
                        components : [
                              {
                                name : "lblSalesSumHeads",
                                kind : "VFlexBox",
                                align : "center",
                                allowHtml : true,
                                style : "text-align:center;font-size: 0.75em;color:#999;",
                                content : "",
                              },
                        ]
                      },
                      {
                        kind : "RowGroup",
                        contentFit : true,
                        align : "center",
                        flex : .1,
                        style : "backgound-color:white;margin:0",
                        components : [
                              {
                                kind : "VFlexBox",
                                name : "lblSalesSumWeight",
                                align : "center",
                                allowHtml : true,
                                style : "text-align:center;font-size: 0.75em;color:#999;",
                                content : ""
                              },
                        ]
                      },
                      {
                        kind : "RowGroup",
                        contentFit : true,
                        align : "center",
                        flex : .1,
                        style : "backgound-color:white;margin:0",
                        components : [
                              {
                                kind : "VFlexBox",
                                name : "lblSumAveWeight",
                                align : "center",
                                allowHtml : true,
                                style : "text-align:center;font-size: 0.75em;color:#999;",
                                content : ""
                              },
                        ]
                      },
                ]
              },
        ],
        loadSales : function(inSender, inIndex) {
          /*
           * { SaleDetail : [ { avgWeight : 32.3, cattleQualityId : 16, heads : 23, penId : 228 } ], cattleQualityId : 2, totalHeads:23,
           * totalWeight:228, totalAvgWeight:12.2, saleDate : "07/28/2013", saleId : 0, customerId : 1 }
           */

          var objData;
          if (objData = this.arrData[inIndex]) {
            this.$.lblSalesDate.setContent(utils.dateOut(objData.saleDate));
            this.$.lblSalesHeads.setContent(utils.formatNumberThousands(objData.totalHeads));
            this.$.lblSalesWeight.setContent(utils.formatNumberThousands(objData.totalWeight));
            this.$.lblSalesAverage.setContent(utils.formatNumberThousands(objData.totalAvgWeight));
            this.$.lblSalesClient.setContent(objData.customer);
            this.$.chkSalesShip.iPos = inIndex;
            
            if (objData.arrToShipDetailed) {
              var strShipDescription = "";
              var totalHeadsProgrammed = 0;
              for ( var i = 0; i < objData.arrToShipDetailed.length; i++) {
                if (objData.arrToShipDetailed[i].dateTimeProgrammed) {
                  totalHeadsProgrammed += Number(objData.arrToShipDetailed[i].heads);
                  strShipDescription += "(" + objData.arrToShipDetailed[i].heads + " / " + objData.arrToShipDetailed[i].weight + ") para "
                      + objData.arrToShipDetailed[i].dateTimeProgrammed.toLocaleDateString() + "<br />";
                }
              }
              if (strShipDescription != "") {
                strShipDescription = strShipDescription.slice(0, -6);
              }
              if (totalHeadsProgrammed >= objData.totalHeads) {
                this.$.chkSalesShip.setChecked(false);
                this.$.chkSalesShip.hide();
                this.$.lblSalesAverage.applyStyle("margin-right", "47px");
              }
              this.$.lblShipProgrammed.setContent(strShipDescription);
              this.$.lblShipProgrammed.show();
            } else {
              this.$.lblShipProgrammed.hide();
              this.$.chkSalesShip.show();
              this.$.lblSalesAverage.applyStyle("margin-right", "17px");
            }
            
            if (inIndex % 2 == 0) inSender.$.client.$.client.applyStyle("background-color", "#DFC699");
            // if(inIndex % 2 ==
            // 0)inSender.$.client.$.client.applyStyle("background-color","#DCC190");
            return true;
          } else {
            return false;
          }
        },
        updateSummary : function() {
          var iHeads = 0;
          var iWeight = 0;
          var iAve = 0;
          
          for ( var j = 0; j < this.arrData.length; j++) {
            iHeads += this.arrData[j].totalHeads;
            iWeight += this.arrData[j].totalWeight;
            iAve += this.arrData[j].aveWeight;
          }
          this.$.lblSalesSumHeads.setContent("Cabezas<br />" + utils.formatNumberThousands(iHeads.toFixed(2)));
          this.$.lblSalesSumWeight.setContent("Peso<br />" + utils.formatNumberThousands(iWeight.toFixed(2)));
          var avg = null;
          // if (avg = (iAve / this.arrData.length)) {
          if (avg = (iWeight / iHeads)) {
            this.$.lblSumAveWeight.setContent("Peso Prom.<br />" + utils.formatNumberThousands(avg.toFixed(2)));
          } else {
            this.$.lblSumAveWeight.setContent("Peso Prom.<br />0.00");
          }
        },
        // calculateTotals : function() {
        // var hc = 0;
        // var weight = 0;
        // var len = this.arrData.length;
        // for ( var i = 0; i < len; i++) {
        // if (!this.arrData[i].shipProgramDateTime &&
        // this.arrData[i].checked) {
        // hc += this.arrData[i].totalHeads;
        // weight += this.arrData[i].totalWeight;
        // }
        // }
        // if (weight > 50000) {
        // this.$.lblSalesShipment.addClass("redAlert");
        // } else {
        // this.$.lblSalesShipment.removeClass("redAlert");
        // }
        // if (weight == 0) {
        // this.$.lblSalesShipment.setContent("Cabezas - Peso");
        // } else {
        // this.$.lblSalesShipment.setContent(utils.formatNumberThousands(hc)
        // + "/"
        // + utils.formatNumberThousands(weight));
        // }
        // },
        checkBox_click : function(inSender, inEvent) {
          this.arrData[inEvent.rowIndex].checked = inSender.checked;
          if (inSender.checked)
            this.arrSelectedItems[this.arrData[inEvent.rowIndex].saleId] = this.arrData[inEvent.rowIndex];
          else
            delete this.arrSelectedItems[this.arrData[inEvent.rowIndex].saleId];
          // this.calculateTotals();
        },
        getSelectedItems : function() {
          var response = [];
          for ( var i in this.arrSelectedItems) {
            if (this.arrSelectedItems.hasOwnProperty(i)) {
              response.push(this.arrSelectedItems[i]);
            }
          }
          return response;
        },
        moveToBottom : function() {
          this.$.scroller.scrollTo(this.$.scroller.getBoundaries().bottom, 0);
        },
        ready : function() {
          this.updateView();
        },
        updateView : function() {
          crudSale.get(this, "readCallBack");
          crudShipment.get(this, "readCallBack");
        },
        readCounter : 0,
        readCallBack : function() {
          this.readCounter++;
          if (this.readCounter == 2) {
            this.readCounter = 0;
            this.loadAutocompletes();
            this.doLoadCompleted();
          }
        },
        loadAutocompletes : function() {
          this.arrSelectedItems = {};
          this.arrData = crudSale.getSalesWithShipments();
          // this.iHeads=null;
          // this.iWeight=null;
          this.$.listSales.render();
          this.updateSummary();
          this.doUpdateView(this.updateSales);
          this.updateSales = false;
        },
        updateSales : true,
      });