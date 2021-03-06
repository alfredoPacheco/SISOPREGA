enyo.kind(
  {
    name : "hermana.gastos.list",
    kind : "VFlexBox",
    arrData : [],
    iSummary : 0,
    components : [
          {
            kind : "HFlexBox",
            className : "listFirst",
            style : "font-size:13px;background-color:#DABD8B;",
            height : "30px",
            align : "center",
            pack : "start",
            components : [
                  {
                    content : "Concept",
                    style : "width:700px;margin-right:15px;margin-left:14px;",
                  },
                  {
                    content : "Amount",
                    style : "width:200px;margin-right:15px;text-align:center;",
                  }
            ]
          },
          {
            kind : enyo.Scroller,
            name : "detailScroller",
            style : "background-color: #482400;",
            autoHorizontal : false,
            horizontal : false,
            flex : 1,
            components : [
                {
                  kind : enyo.VirtualRepeater,
                  name : "chargesList",
                  onSetupRow : "loadCharges",
                  onclick : "",
                  style : "height:100px;",
                  components : [
                      {
                        kind : enyo.SwipeableItem,
                        onConfirm : "deleteCharge",
                        layoutKind : enyo.HFlexLayout,
                        tapHighlight : true,
                        className : "listBG",
                        style : "font-size:13px;",
                        components : [
                              {
                                name : "charge_desc",
                                style : "width:700px;margin-right:15px;",
                                content : ""
                              },
                              {
                                name : "charge_price",
                                style : "width:107px;margin-right:15px;text-align:right;",
                                content : ""
                              }
                        ]
                      }
                  ]
                }
            ]
          },
          {
            kind : "HFlexBox",
            components : [
                  {
                    kind : "HFlexBox",
                    flex : .05,
                    content : "Total",
                    style : "text-align:right;"
                  },
                  {
                    kind : "HFlexBox",
                    width : "200px",
                    style : "margin-right:20px;",
                    name : "charge_summary",
                    content : ""
                  }
            ]
          }
    ],
    addCharge : function(arrData) {
      if(!this.arrData)
    	this.arrData = [];
      this.arrData.push(arrData);
      this.updateList();
    },
    loadCharges : function(inSender, inIndex) {
      var objData;
      if(this.arrData !== undefined){
    	if (objData = this.arrData[inIndex]) {
          this.$.charge_desc.setContent(objData.conceptName);
          this.$.charge_price.setContent('$' + utils.formatNumberThousands(objData.price));
          this.iSummary += utils.parseToNumber(objData.price);
          return true;
        } else {
          this.updateSummary();
          return false;
        }
      }
      
    },
    updateSummary : function() {
      this.$.charge_summary.setContent('$' + utils.formatNumberThousands(this.iSummary));
    },
    deleteCharge : function(inSender, inIndex) {
      var objData;
      if (objData = this.arrData[inIndex]) {
        this.iSummary -= utils.parseToNumber(objData.charge_price);
        this.updateSummary();
        this.arrData.splice(inIndex, 1);
        this.updateList();
        return true;
      } else {
        return false;
      }
    },
    updateList : function() {
      this.iSummary = 0;
      this.$.chargesList.render();
    }
  });