enyo
    .kind(
      {
        name : "admin.inventory",
        kind : "VFlexBox",
        className : "enyo-bg",
        arrData : null,
        events :
          {
            onSelect : "",
            onSale : "",
          },
        components : [
              {
                kind : "Toolbar",
                components : [
                      {
                        kind : "VFlexBox",
                        content : "Inventario",
                        flex : .17,
                        onclick : "doSelect",
                        style : "padding:0px;color:white;font-size:15px;"
                      },
                      {
                        kind : "Spacer",
                        flex : .05
                      },
                      {
                        kind : "Button",
                        caption : "Vender",
                        onclick : "doSale"
                      }
                ]
              },
              {// HEADER:
                kind : "HFlexBox",
                className : "listFirst",
                style : "font-size:13px;background-color:#DABD8B;border-bottom-style: solid;border-bottom-color: black;padding: 0px 10px;border-width: 1px;",
                height : "30px",
                align : "center",
                pack : "start",
                components : [
                      {
                        content : 'Tipo',
                        flex : 1.5
                      },
                      {
                        content : 'Clase',
                        flex : 1
                      },
                      {
                        content : 'Cabezas',
                        flex : 1,
                        style : "text-align: right;"
                      },
                      {
                        content : 'Peso',
                        flex : 1,
                        style : "text-align: right;"
                      },
                      {
                        content : 'Promedio',
                        flex : 1,
                        style : "text-align: right;"
                      },
                      {
                        content : 'Alimento',
                        flex : .9,
                        style : "text-align: right;"
                      },
                ]
              },
              {
                kind : "Scroller",
                flex : 1,
                components : [
                    {
                      kind : enyo.VirtualRepeater,
                      name : "listInventory",
                      onSetupRow : "loadInventory",
                      components : [
                          {
                            kind : enyo.Item,
                            style : "font-size: 14px;",
                            onclick : "doSelect",
                            components : [
                                  {
                                    layoutKind : enyo.HFlexLayout,
                                    components : [
                                          {
                                            name : "lblInvType",
                                            flex : 1.5,
                                            content : ""
                                          },
                                          {
                                            name : "lblInvClass",
                                            flex : 1,
                                            content : "Novillos"
                                          },
                                          {
                                            name : "lblInvHeads",
                                            flex : 1,
                                            content : "",
                                            style : "text-align: right;"
                                          },
                                          {
                                            name : "lblInvWeight",
                                            flex : 1,
                                            content : "",
                                            style : "text-align: right;"
                                          },
                                          {
                                            name : "lblInvInvAverage",
                                            flex : 1,
                                            content : "",
                                            style : "text-align: right;"
                                          },
                                          {
                                            name : "lblInvFeed",
                                            flex : .9,
                                            content : "",
                                            style : "text-align: right;"
                                          },
                                    ]
                                  },
                                  {
                                    layoutKind : enyo.HFlexLayout,
                                    components : [
                                          {
                                            name : "lblInvBarnyards",
                                            style : "font-size: 0.85em;color:#008B8B;text-align:left;",
                                            flex : 1,
                                            content : ""
                                          },
                                          {
                                            name : "lblInvDescBuyer",
                                            allowHtml : true,
                                            style : "font-size: 0.85em;color:#008B8B;text-align:right;",
                                            flex : 1,
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
                                name : "lblInvSumHeadClass",
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
                                name : "lblInvSumWeight",
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
                                name : "lblInvSumAvgWeight",
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
                                name : "lblInvSumFeed",
                                align : "center",
                                allowHtml : true,
                                style : "text-align:center;font-size: 0.75em;color:#999;",
                                content : ""
                              },
                        ]
                      },
                ]
              },
              {
                kind : "Toolbar",
                components : [
                      {
                        kind : "VFlexBox",
                        content : "Ending Inv.",
                        flex : 1.5,
                        style : "color:white;margin:0;font-size:15px;"
                      },
                      {
                        kind : "RowGroup",
                        flex : 1,
                        style : "margin:0px;",
                        components : [
                              {
                                kind : "VFlexBox",
                                name : "lblPurSumInvHeads",
                                allowHtml : true,
                                style : "text-align:center;font-size: 0.7em;color:#999;",
                                align : "center",
                                content : "",
                              },
                        ]
                      },
                      {
                        kind : "RowGroup",
                        flex : 1,
                        style : "margin:0px;",
                        components : [
                              {
                                kind : "VFlexBox",
                                name : "lblPurSumInvWeight",
                                allowHtml : true,
                                style : "text-align:center;font-size: 0.7em;color:#999",
                                align : "center",
                                content : ""
                              },
                        ]
                      },
                      {
                        kind : "RowGroup",
                        layoutKind : enyo.VFlexLayout,
                        flex : 1,
                        style : "margin:0px;",
                        components : [
                              {
                                kind : "VFlexBox",
                                name : "lblSumInvAveWight",
                                allowHtml : true,
                                style : "text-align:center;font-size: 0.7em;color:#999",
                                align : "center",
                                content : ""
                              },
                        ]
                      }
                ]
              },
        ],
        loadInventory : function(inSender, inIndex) {
          var objData;
          if (objData = this.arrData[inIndex]) {
            var len = objData.length;
            var strBarnyards = "";
            var totalHeads = 0;
            var totalWeight = 0;
            var totalFeed = 0;
            
            var cattypeId = 0;
            var qualityId = 0;
            for ( var i = 0; i < len; i++) {
              strBarnyards += "" + objData[i].pen.barnyardCode + ", ";
              totalHeads += Number(objData[i].heads);
              totalWeight += Number(objData[i].weight);
              totalFeed += Number(objData[i].feed);
              cattypeId = objData[i].cattypeId;
              qualityId = objData[i].qualityId;
            }
            
            if (strBarnyards != "") {
              strBarnyards = strBarnyards.slice(0, -2);
            }
            
            var cattle_name = crudCattle.getCattleTypeById(cattypeId);
            if (cattle_name) {
              cattle_name = cattle_name.cattypeName;
            } else {
              cattle_name = "";
            }
            
            var quality_name = crudCattleQuality.getByID(qualityId);
            if (quality_name) {
              quality_name = quality_name.qualityName;
            } else {
              quality_name = "";
            }
            
            this.$.lblInvType.setContent(cattle_name);
            this.$.lblInvClass.setContent(quality_name);
            this.$.lblInvHeads.setContent(utils.formatNumberThousands(totalHeads));
            this.$.lblInvWeight.setContent(utils.formatNumberThousands(totalWeight));
            this.$.lblInvInvAverage.setContent(utils.formatNumberThousands(totalWeight / totalHeads));
            this.$.lblInvFeed.setContent(totalFeed);
            this.$.lblInvBarnyards.setContent(strBarnyards);
            
            if (inIndex % 2 == 0) inSender.$.client.$.client.applyStyle("background-color", "#DFC699");
            return true;
          } else {
            return false;
          }
        },
        updateSummary : function() {
          var iHeads = crudInventory.getObjSummary().heads;
          var iSumWeight = crudInventory.getObjSummary().weight;
          var iSumAve = iSumWeight/iHeads;
          var iSumFeed = crudInventory.getObjSummary().feed;
          var iSold = 0;
          var iSoldAve = 0;
          
          this.$.lblInvSumHeadClass.setContent("Cabezas<br />" + utils.formatNumberThousands(iHeads));
          this.$.lblInvSumWeight.setContent("Peso<br />" + utils.formatNumberThousands(iSumWeight));
          this.$.lblInvSumAvgWeight.setContent("Peso Prom.<br />" + utils.formatNumberThousands(iSumAve.toFixed(2)));
          this.$.lblInvSumFeed.setContent("Alimento<br />" + utils.formatNumberThousands(iSumFeed.toFixed(2)));
          
          this.$.lblPurSumInvHeads.setContent("Cabezas<br />" + utils.formatNumberThousands(iHeads - iSold));
          this.$.lblPurSumInvWeight.setContent("Peso<br />" + utils.formatNumberThousands((iSumWeight - iSoldAve).toFixed(2)));
          this.$.lblSumInvAveWight.setContent("Peso Prom.<br />"
              + utils.formatNumberThousands(((iSumWeight - iSoldAve) / (iHeads - iSold)).toFixed(2)));
        },
        setListContent : function(arrInventory) {
          var result = [];
          
          // grouping data by cattle class and quality
          var groupByType = {};
          
          for ( var i = 0; i < arrInventory.length; i++) {
            var groupName = arrInventory[i].cattypeId + '-' + arrInventory[i].qualityId;
            if (!(groupName in groupByType)) {
              groupByType[groupName] = [];
            }
            groupByType[groupName].push(arrInventory[i]);
          }
          
          for (obj in groupByType) {
            if (groupByType.hasOwnProperty(obj)) {
              result.push(groupByType[obj]);
            }
          }
          this.arrData = result;
          this.$.listInventory.render();
          this.updateSummary();
        },
        ready : function() {
          this.updateView();
        },
        updateView : function() {
          crudInventory.get(this, "readCallBack");
        },
        readCounter : 0,
        readCallBack : function() {
          this.readCounter++;
          if (this.readCounter == 1) {
            this.readCounter = 0;
            this.loadAutocompletes();
          }
        },
        loadAutocompletes : function() {
          this.setListContent(crudInventory.arrObj);
        }
      });
