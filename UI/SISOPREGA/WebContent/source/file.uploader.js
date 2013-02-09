enyo.kind({
    name:"file.uploader",
    kind : enyo.VFlexBox,
	components:[
		{kind : "RowGroup",
		defaultKind : "HFlexBox",
		caption : "",
		components : [	            
	        {allowHtml:true, content:'<form action="PdfUploader" enctype="multipart/form-data" name="frmUpload" id="frmUpload"> <input id="pdfFile" name="pdfFile" type="file" /></form>'},
			{kind : "controls.autocomplete",name : "rancher_id",hint:"",flex:1,contentPack:"end",onEnter:"emularTabulacionConEnter"},										
	        {kind : "Input", name:'folio_id',hint : "Folio"},	        
		]},
		{kind: "Button",name: "btnUpload", className: "enyo-button-affirmative",caption: "Crear",onclick:"uploadFile"},
	  	{kind:"Spacer"}		
	],
	disableInput:function(){
	},
	enableInput:function(){	
	},
	create:function(){
		this.inherited(arguments);
		this.$.rancher_id.setItems(cacheRanchers.getAllForList());
	},
	uploadFile:function(){
		var formElement = document.getElementById("frmUpload");
		var oMyForm = new FormData(formElement);
		var sParams=null;
		sParams="rancher_id="+this.$.rancher_id.getIndex()+"&fechaPedimento=2/8/2013&"+"folio_id="+this.$.folio_id.getValue(),	
		jQuery.ajax({
		   type: 'POST',
		   contentType:false,		   
		   processData: false,
		   url: 'PdfUploader?'+sParams,
		   data: oMyForm,
		   success: function(data){alert('PDF Cargado con exito');},
		   error : function(xhr, textStatus,errorThrown){alert('Error Cargando PDF');}
     });
	},
	emularTabulacionConEnter:function(inSender){
		switch(inSender.name){
		case "rancher_id":
			this.$.cattype_id.setFocus();
			break;
		case "cattype_id":
			this.$.city_id.setFocus();
			break;
		case "city_id":
			this.$.hc_aprox.forceFocus();
			break;
		case "hc_aprox":
			this.$.weight.forceFocus();
			break;
		case "weight":
			this.$.rancher_id.setFocus();
			break;
			
		}
	},	
});