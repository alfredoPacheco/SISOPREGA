enyo.kind(
  {
    name : "ranchers.pedimentos",
    classes: "onyx",
    events :
      {
        onCancel : "",
        onUpdate : ""
      },
    pedimentos : [],
    components : 
      [
       {
         kind:"onyx.Toolbar", 
         components:
           [
            {
              kind:"onyx.Button", 
              content:"Menu de reportes", 
              ontap:"doCancel"
            }
            ]
       },
       {
         name:"basicList", 
         kind:"List",
         onSetupItem:"setupItem", 
         components:
           [
            {name:"item", ontap:"selectPedimento", components:[{name:"name"}]}
            ]
       }
       ],
    setList : function() {
      this.updateList();
    },
    setupItem : function(inSender, inIndex) {
      var objPedimento;
      if (this.pedimentos[inIndex.index]) {
        objPedimento = this.pedimentos[inIndex.index];
        this.$.name.setContent(objPedimento.folio + ' - ' + objPedimento.fechaPedimento);
        return true;
      }
      return false;
    },
    updateList : function() {
      this.pedimentos = cacheProfile.getPedimentos();
      if (this.pedimentos.length > 0) {
        this.pedimentos.sort(function(inA, inB) {
          return
            [ inA.fechaPedimento ] <
            [ inB.fechaPedimento ] ? -1 : 1;
        });
      }
      this.$.basicList.count = this.pedimentos.length;
      this.$.basicList.render();
    },
    selectPedimento : function(inSender, inEvent) {
      window.open('/ReportingGateway/Pedimento?folio=' + this.pedimentos[inEvent.rowIndex].folio, '_blank');
      window.focus();
    }
  });