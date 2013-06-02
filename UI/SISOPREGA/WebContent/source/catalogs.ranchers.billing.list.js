enyo.kind(
  {
    name : "catalogs.ranchers.billing.list",
    kind : enyo.SlidingView,
    layoutKind : enyo.VFlexLayout,
    events :
      {
        "onSelect" : "",
        "onAddBilling" : "",
      },
    iSelected : "",
    objRancher : null,
    components :
      [
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
                onclick : "selectBilling",
                components :
                  [
                    {
                      kind : enyo.SwipeableItem,
                      onConfirm : "deleteBilling",
                      tapHighlight : true,
                      components :
                        [
                          {
                            name : "billing_name",
                            style : "text-overflow: ellipsis; overflow: hidden;" + "white-space: nowrap;color:#000;",
                            content : ""
                          },
                          {
                            name : "billing_info",
                            style : "font-size: 0.85em;color:#555",
                            content : ""
                          }

                        ]
                    } ]
              }, ]
        },
        {
          kind : "Toolbar",
          components :
            [
              {
                kind : "enyo.IconButton",
                flex : 1,
                icon : "images/menu-icon-new.png",
                onclick : "doAddBilling"
              }, ]
        }, ],
    setList : function(objRancher) {
      this.objRancher = objRancher;
      this.updateList();
    },
    setupRow : function(inSender, inIndex) {
      if (this.objRancher != null) {
        var objRan = false;
        if(this.objRancher.rancher_type == 1){
          if(this.objRancher.RancherInvoice)
            objRan = this.objRancher.RancherInvoice[inIndex];
        }else{
          if(this.objRancher.EnterpriseInvoice)
            objRan = this.objRancher.EnterpriseInvoice[inIndex];
        }
        
        if (objRan) {
          this.$.billing_name.setContent(objRan.company_name);
          this.$.billing_info.setContent("RFC: " + objRan.rfc);
          return true;
        }
      }
    },
    deleteBilling : function(inSender, inIndex) {
      return cacheRanchers.deleteBilling(this.objRancher, this.objRancher.billings[inIndex], this, "updateList");
    },
    updateList : function() {
      if (this.objRancher != null && this.objRancher.RancherInvoice) {
        var arrBillingsAux = this.objRancher.RancherInvoice;
        if (arrBillingsAux.length > 0) {
          this.objRancher.billings.sort(function(inA, inB) {
            return
              [ inA.companyName.toLowerCase() ] <=
              [ inB.companyName.toLowerCase() ] ? -1 : 1;
          });
        }
      }
      this.$.productList.render();
    },
    selectBilling : function(inSender, inEvent) {
      this.iSelected = inEvent.rowIndex;
      this.doSelect();
    },
    getBilling : function() {
      return this.objRancher.billings[this.iSelected];
    }
  });