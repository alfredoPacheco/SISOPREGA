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
       {kind : "FittableColumns", ontap:"selectPedimento", 
       	components:[    	            
	            {content:"Fecha",style:"width:10%"},
	            {content:"Folio"},    	            
       ]},
       {name:"basicList", 
         kind:"List",
         classes: "list-sample-pulldown-list",
         onSetupItem:"setupItem", 
         components:[
            {name: "item",kind : "FittableColumns", ontap:"selectPedimento",classes: "list-sample-pulldown-item enyo-border-box", 
            	components:[    	            
    	            {name:"pDate",style:"width:10%"},
    	            {name:"pFolio",},    	            
	            ]}
       ]}
    ],
    setList : function() {
      this.updateList();
    },
    setupItem : function(inSender, inIndex) {
      var objPedimento;
      if (this.pedimentos[inIndex.index]) {
        objPedimento = this.pedimentos[inIndex.index];
        this.$.pFolio.setContent(objPedimento.folio);
        this.$.pDate.setContent(objPedimento.fechaPedimento);
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
//      window.open('/ReportingGateway/Pedimento?folio=' + this.pedimentos[inEvent.rowIndex].folio, '_blank');
//      window.focus();
      utils.openReport('/ReportingGateway/Pedimento?folio=' + this.pedimentos[inEvent.rowIndex].folio);
      
    }
  });