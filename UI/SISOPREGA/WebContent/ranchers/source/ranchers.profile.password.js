enyo.kind({
	name: "ranchers.profile.password",
	kind: "FittableRows",
	classes: "onyx",
	events: {	
		onCancel:"",
		onChange:"",
	},
	userID:null,
	components: [					
		{kind: "onyx.Groupbox", classes:"onyx-sample-result-box", components: [
			{kind: "onyx.GroupboxHeader", content: "Password Anterior"},
			{kind: "onyx.InputDecorator", components: [{kind: "onyx.Input",name:"PW0",style:"width:100%", value: "", type:"password" }]},		    
		    {kind: "onyx.GroupboxHeader", content: "Password Nuevo"},
			{kind: "onyx.InputDecorator", components: [{kind: "onyx.Input",name:"PW1",style:"width:100%", value: "", type:"password" }]},
		    {kind: "onyx.GroupboxHeader", content: "Confirmar Nuevo Password"},
			{kind: "onyx.InputDecorator", components: [{kind: "onyx.Input",name:"PW2",style:"width:100%", value: "", type:"password" }]},			
   		]},				
		{kind: "FittableColumns", style:"align:center",components:[
			  {kind:"onyx.Button", content:"OK",classes: "onyx-affirmative",
			   style:"width:50%",onclick:"validatePW"},
			  {kind:"onyx.Button", content:"Cancelar",classes: "onyx-negative",
			   style:"width:50%",onclick:"doCancel",}
		 ]}		
	],
	validatePW:function(){
		if(this.$.PW1.getValue()=="" || this.$.PW2.getValue()==""){
				alert("Password vacio, intente de nuevo");
		}else{
			if(this.$.PW1.getValue()==this.$.PW2.getValue()){	
				this.doChange();
			}else{
				alert("Password no concuerda, intente de nuevo");
			}
		}
	},
	getPWChangeData:function(){
		return {currentPW:this.$.PW0.getValue(),
			    newPW:this.$.PW1.getValue()};
		
	}	
});