enyo.kind(
  {
    name : "catalogs.ranchers.pedimentos.list",
    kind : enyo.SlidingView,
    layoutKind : enyo.VFlexLayout,
    iSelected : "",
    objRancher : null,
    components :
      [
        {
          kind : enyo.Scroller,
          name : "scrollPedimentosList",
          flex : 1,
          className : "listBG",
          components : 
            [
             {
               kind:enyo.VirtualRepeater,
               name:"pedimentosList",
               onSetupRow:"setupRow",
               onclick:"selectPedimento",
               components:
                 [
                  {kind:"Divider"},
                  {
                    kind:enyo.SwipeableItem,
                    onConfirm:"deletePedimento",
                    tapHighlight:true,
                    components:
                      [
                       {
                         name:"folio", 
                         style : "text-overflow: ellipsis; overflow: hidden;white-space: nowrap;color:#FFF;",
                         content : ""
                        }]
                  }]
             }]
        } ],
    setList : function(objRancher) {
      this.objRancher = objRancher;
      this.updateList();
    },
    getGroupName : function(inIndex) {
      // get previous record
      var r0 = this.objRancher.pedimentos[inIndex - 1];
      
      // get record
      var r1 = this.objRancher.pedimentos[inIndex];
      
      if(!r0 && r1)
        return r1.fechaPedimento;
      
      // new group if fechaPedimento has changed
      return r0.fechaPedimento != r1.fechaPedimento ? r1.fechaPedimento : null;
    },
    setupDivider : function(inIndex) {
      var group = this.getGroupName(inIndex);
      this.$.divider.setCaption(group);
      this.$.divider.canGenerate = Boolean(group);
    },
    setupRow : function(inSender, inIndex) {
      var objPedimento;
      if (this.objRancher != null) {
        if (objPedimento = this.objRancher.pedimentos[inIndex]) {
          this.setupDivider(inIndex);
          this.$.folio.setContent(objPedimento.folio);
          return true;
        }else{
          return false;
        }
      }
    },
    updateList : function() {
      if (this.objRancher != null) {
        var arrPedimentos = cacheRanchers.getPedimentos(this.objRancher);
        if (arrPedimentos.length > 0) {
          this.objRancher.pedimentos.sort(function(inA, inB) {
            return
              [ inA.fechaPedimento ] <
              [ inB.fechaPedimento ] ? -1 : 1;
          });
        }
      }
      this.$.pedimentosList.render();
    },
    deletePedimento : function(inSender, inIndex){
      return cacheRanchers.deletePedimento(this.objRancher, this.objRancher.pedimentos[inIndex], this, "updateList");
    },
    selectPedimento : function (inSender, inEvent){
      this.iSelected = inEvent.rowIndex;
      window.open('/ReportingGateway/Pedimento?rancherId='+ this.objRancher.rancher_id +'&folio='+this.objRancher.pedimentos[inEvent.rowIndex].folio, '_blank');
      window.focus();
    }
  });