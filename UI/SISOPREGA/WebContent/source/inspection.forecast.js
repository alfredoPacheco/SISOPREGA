enyo.kind({
  name: "inspection.forecast",	
  kind: enyo.SlidingView,	
  layoutKind: enyo.VFlexLayout,
  events: {
    "onAddInspectionForecast": "",
	"onUpdateInspectionForecast": "",
	"onRemoveInspectionForecast": "",
	"onAddRancher":"",		
	"onCancel":""
  },
  objRec:null,
  objList:[],
  arrBY:null,
  components: [
    {name:"options", kind: enyo.PopupSelect, onSelect:"addNewRancher",
    items:[
      {caption:"Empresa/Sociedad", value:1},
      {caption:"Persona Física", value:2}
    ]},
    {kind:"Popup", name:"addRancherDialog", showHideMode:"transition", openClassName:"zoomFadeIn",
     className:"transitioner2", layoutKind:"VFlexLayout", style:"overflow:hidden", width:"85%", heigth:"85%",
     scrim:true, components:[]},
    {kind: "SlidingPane", flex:1, 
    components:[
	  {name:"left", width:"300px", 
	  components:[
		{kind:"RowGroup", defaultKind:"HFlexBox", caption:"", style:"color:#FFF",
		components:[
		  {kind:"Item",
		  components:[
		    {content:"Ganadero", className:"enyo-label", flex:1},
		    {layoutKind:enyo.HFlexLayout, 
		    components:[
		      {kind:"ListSelector", name:"rancher_id", flex:1, contentPack:"end", items:[]},
		      {kind:"IconButton", icon:"images/menu-icon-new.png", onclick:"contextMenuClicked"}
		    ]}
		  ]},
		  {kind:"Item",
		  components:[
		    {layoutKind:enyo.HFlexLayout,
		    components:[
              {kind:"Input", name:"autorizacion", hint:"Autorizacion"},
		    ]}
		  ]},
		  {kind:"Item",
			  components:[
			    {layoutKind:enyo.HFlexLayout,
			    components:[
	              {kind:"Input", name:"origen", hint:"Origen"},
			    ]}
			  ]},
		  {kind:"Item",
				  components:[
				    {layoutKind:enyo.HFlexLayout,
				    components:[
		              {content:"Clase", className:"enyo-label", flex:1},
		              {kind:"ListSelector", name:"cattle_type_id", flex:1, contentPack:"end", items:[]}
				    ]}
				  ]},
		  {kind:"Item",
		  components:[
			{layoutKind:enyo.HFlexLayout,
			components:[
	          {kind:"Input", name:"cantidad", hint:"Cantidad", inputType:"number"},
			]}
		  ]},
		  {kind:"Item",
			components:[
			{layoutKind:enyo.HFlexLayout,
			components:[
			  {kind:"ListSelector", name:"barnyard_id", flex:1, contentPack:"end", items:[]}
			]}
		  ]},
		  {kind:"Item",
				components:[
				{layoutKind:enyo.HFlexLayout,
				components:[
				  {kind: "Button",name:"btnAdd", className: "enyo-button-affirmative", 
				 flex:1,caption: "Guardar", onclick: "saveInspectionForecast"},										
				{kind: "Button",name:"btnCancelCreate", className: "enyo-button-negative", 
				 flex:1,caption: "Cancelar", onclick: "doCancel"}
				]}
			  ]}]
	    }]},
	  {name:"middle", peekwidth: 58,
	    components:[
	      // TODO: Add row functionality
	    ]
	  }
    ]}
  ],
  ready:function(){
		this.resetValues();
  },
  resetValues:function(){
		this.$.rancher_id.setValue(0);
		// TODO: Reset form values
  },
  contextMenuClicked: function(inSender, inEvent ){		
		this.$.options.openAtEvent(inEvent);		
		return false;
	},
  addNewRancher:function(inSender, inSelected ){
		if(this.$.dynoco){
			this.$.dynoco.destroy();
		}
		switch(inSelected.value){ 
			case 1:
				this.$.addRancherDialog.createComponent({kind: "catalogs.ranchers.enterprise.create",
														 onAddRancher:"adoken", name:'dynoco',flex: 1},{owner:this});
				break;
			case 2:
				this.$.addRancherDialog.createComponent({kind: "catalogs.ranchers.person.create",
														 onAddRancher:"adoken", name:'dynoco',flex: 1},{owner:this});
				break;
		}
		this.$.addRancherDialog.render();
		this.$.addRancherDialog.openAtCenter();
	},
	adoken:function(){
		this.resetValues();		
		this.$.rancher_id.setValue(this.$.dynoco.getJustCreated());
		this.$.addRancherDialog.close();		
	},
	saveInspectionForecast:function(){
		alert('Save inspection forecast');
		// TODO: Implement
	}
});
