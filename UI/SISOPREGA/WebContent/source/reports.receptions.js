enyo.kind({
	name: "reports.receptions",	
	kind: enyo.VFlexBox,			  	
	events: {
		"onGetReport":""
	},
	components: [	
		{kind: enyo.Scroller,
    	 style: "background-image: url(images/practice_background.png); background-size: cover; ",			 
	     flex: 1,
		 components: [
			{kind: "RowGroup", defaultKind: "HFlexBox", caption: "", style:"color:#FFF",
			 components: [
					  {kind: "Item",
						components: [
							{content: "Ganadero", className: "enyo-label", flex: 1},
							{name: 'rancher_id', flex:1, kind: "ListSelector",contentPack:"end", items: []}]},
							{kind: "VFlexBox", style: "",					  				  
							 components:[
								 {content:"Fecha Final",},
								 {kind: "DatePicker", name:"start_date", label:"",
								  inputClassName: "blankInput",focusClassName:"darkFocus",changeOnInput: true}]},							
								 {kind: "VFlexBox", style: "",					  				  
								  components:[
									 {content:"Fecha Inicial",},
									 {kind: "DatePicker", name:"end_date", label:"",
									  inputClassName: "blankInput",focusClassName:"darkFocus",
									  changeOnInput: true}],
								 }]},
					{kind: "Button", className: "enyo-button-affirmative", 
					 flex:1, caption: "Reporte", onclick: "doGetReport"},								 
			]}						  
	],
	getParams:function(){
		var fmt = new enyo.g11n.DateFmt({format: "yyyy-MM-dd"});		
		var params={rancher_id:"",start_date:"",end_date:""};
		params.rancher_id=this.$.rancher_id.getValue();
		params.start_date=fmt.format(this.$.start_date.getValue());
		params.end_date=fmt.format(this.$.end_date.getValue());;
		return params;
	},
	resetValues:function(){
		this.$.rancher_id.setValue(0);
		this.$.start_date.setValue(new Date());
		this.$.end_date.setValue(new Date());
		this.$.rancher_id.setItems(cacheRanchers.ls());		
	},
});