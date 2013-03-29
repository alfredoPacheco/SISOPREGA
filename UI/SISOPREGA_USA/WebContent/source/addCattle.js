enyo.kind(
  {
    name : "addCattle",
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
                    onclick:"doBuyCattle"
                },
                {
                    kind:"Button",
                    caption:"Captura de Hermana",
                    flex:1,
                    onclick:"doCaptureHermana"
                }
                ]
  });