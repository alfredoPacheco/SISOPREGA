enyo.kind(
  {
    name : "admin.addCattle",
    kind : enyo.HFlexBox,
    events:{
	onBuyCattle:"",
	onCaptureHermana:""
    },
    components:[
                {
                    kind:"Button",
                    caption:"Compra de Ganado",
                    flex:1,
                    onclick:"doBuyCattle",
                    style:"display: table-cell;vertical-align: middle;height: 35px;"
                },
                {kind:enyo.Spacer, flex:.1},
                {
                    kind:"Button",
                    caption:"Captura de Hermana",
                    flex:1,
                    onclick:"doCaptureHermana",
                    style:"display: table-cell;vertical-align: middle;height: 35px;"
                }
                ]
  });