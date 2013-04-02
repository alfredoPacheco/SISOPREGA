enyo.kind(
  {
    name : "hermana.gastos.list",
    kind : "VFlexBox",
	arrData:[],
    components :
      [
        {
          kind : "Header",
          name : "encabezado",
          style : "font-size:13px;background-color:#DABD8B;",
          components :
            [
              {
                content : "Concepto",
                flex:.9
              },
              {
                content : "Monto",
                flex:.1
              }
            ]
        },
        {
          kind : enyo.Scroller,
          name : "listaScroller",
          horizontal : false,
          autoHorizontal : false,
          flex : 1,
          onScroll : "scroll",
          components :
            [
              {
                kind : enyo.VirtualRepeater,
                name : "forecastList",
                onSetupRow : "loadCharges",
                onclick : "",
                components :
                  [
                    {
                      kind : enyo.SwipeableItem,
                      onConfirm : "deleteCharge",
                      layoutKind : enyo.HFlexLayout,
                      tapHighlight : true,
                      style : "font-size:13px;",
                      components :
                        [
                          {
                            name : "charge_desc",
                            flex:.9,
                            content : ""
                          },
                          {
                            name : "charge_price",
                            flex:.1,
                            content : ""
                          }]
                    } ]
              } ]
        },
        {
          kind : "Drawer",
          name : "draDel",
          open : false,
          components :
            [
              {
                kind : "Toolbar",
                components :
                  [
                    {
                      kind : "enyo.IconButton",
                      style : "width:150px;",
                      label : "Eliminar",
                      onclick : "onEliminar"
                    },
                    {
                      kind : "enyo.IconButton",
                      style : "width:150px;",
                      label : "Cancelar",
                      onclick : "onCancel"
                    }, ]
              }

            ]
        }, ],
		addCharge:function(arrData){
			this.arrData.push(arrData);
			this.render();
		},
		loadCharges:function(inSender, inIndex){
			var objData;
			if(objData=this.arrData[inIndex]){
				this.$.charge_desc.setContent(objData.charge_desc);
				this.$.charge_price.setContent(objData.charge_price);				
				return true;
			}else{
				return false;			
			}
		},
		deleteCharge:function(){
			return true;
		}
  });