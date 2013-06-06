enyo.kind({
	name: "finance.charges.list",
	kind: "VFlexBox",
	className: "enyo-bg",
	arrPayments:null,
	arrData:null,
	arrTemp:null,
	iRancher:null,
	iCharge:null,
	caption:"",
	paymentCaption:"",
	events: {
		onSelect: "",
		onSelectCharge:"",
		onAddPayment:""
	},		
	components: [
		 {kind:enyo.Divider, name:"chargeCap",caption:"",
		 components:[{kind:"RowGroup", align: "center", flex:.1, style:"backgound-color:white;margin:0",
					 components:[
						{name: "chargesSum",kind: "VFlexBox",align:"center",style:"font-size: 0.75em;color:#999",
						 content: ""},
					]}]},
		 {kind: "Scroller", flex: 1, 
		 components:[
			{kind: enyo.VirtualRepeater, name: "listInventory", onSetupRow: "loadBuyed", onclick: "doSelect",								
			components: [
				{kind: enyo.Item,
					onclick:"showDetails",
					components: [
						{layoutKind: enyo.HFlexLayout,components:[
							{name: "chOwner",flex:.82,
							 content: ""},
							{name: "chBalance",flex:.18, 
							 content: ""},						 
						]},
						{kind:"enyo.Drawer", name:"details",
						 open:false,
						 components:[			
						{kind: enyo.VirtualRepeater, name: "listCharges", onSetupRow: "loadCharges",								
						 components: [						 								
							{name:"charges",layoutKind:enyo.HFlexLayout, onclick:"selectCharge",
							 components:[
								{name: "chType",flex:.02,style: "font-size: 0.85em;color:#999",
								 content: ""},							
								{name: "chDate",flex:.17,style: "font-size: 0.85em;color:#999",
								 content: ""},
								{name: "chDesc",flex:.58, style: "font-size: 0.85em;color:#999",
								 content: ""},
								{name: "chAmount",flex:.22, style: "font-size: 0.85em;color:#999",
								 content: ""},								 
							  ]}
							]}
						  ]}
						]}		
					]}
		]},
		{kind:enyo.Divider,name:"paymentDiv",caption:"Pagos",components:[{kind:enyo.Button,caption:"+",style:"margin-right:11px;",
		 onclick:"doAddPayment"}]},		
	 	{name:"paymentList",kind:"finance.charges.payments.list",flex:.4, maxState:false,onSale:"showSale"},		 
		],
	chSelected:function(){
		this.$.paymentList.arrData=this.getCharge()
		this.$.paymentList.refreshList()
	},		
	selectCharge:function(inSender,inEvent){
		this.iRancher=inSender.parent.parent.parent.parent.parent.parent.parent.parent.parent.rowIndex
		this.iCharge=inEvent.rowIndex
		this.chSelected()
		return true
	},
	selectRancher:function(inSender,inEvent){
		alert(this.iRancherID=inEvent.rowIndex)
	},
	getCharge:function(){
		return this.arrData[this.iRancher].charges[this.iCharge];
	},
	showDetails:function(inSender, inEvent){
		if (inSender.children[1].getOpen()){
			inSender.children[1].setOpen(false)
		}else{
			inSender.children[1].setOpen(true)			
		}
	},
	updateInventory:function(){
	},
	calcSummary:function(){
	},
	loadCharges:function(inSender, inIndex){
		var objData;
		if(this.arrTemp){
			if(objData=this.arrTemp[inIndex]){
				this.$.chDate.setContent(objData.charge_date)
				this.$.chType.setContent("+")
				this.$.chDesc.setContent(objData.charge_desc)
				this.$.chAmount.setContent(objData.pay+"/"+objData.amount+" "+objData.currency)
				return true;
			}else{
				return false;			
			}
		}
	},
	loadBuyed:function(inSender, inIndex){
		var objData;
		if(objData=this.arrData[inIndex]){
			this.$.chOwner.setContent(objData.rancher_name)
			this.$.chBalance.setContent(objData.balance+" "+objData.currency)
			this.arrTemp=objData.charges
			this.$.listCharges.render()
			return true;
		}else{
			return false;			
		}		
	},
	updateSummary:function(){
		var iBalance=0;
		var iTotal=0;
		for (var j=0;j<this.arrData.length;j++){
			iBalance+=this.arrData[j].balance;
			iTotal+=this.arrData[j].total;			
			//for (var i=0;i<this.arrData[j].buyers.length;i++){
			//}					
		}
		iPaid=gblUtils.numCD(((iBalance/iTotal)*100).toFixed(2)) +"% ";
		this.$.chargesSum.setContent(iPaid +" "+ iBalance +"/"+ iTotal )
	},
	ready:function(){
		this.$.chargeCap.setCaption(this.caption)
		this.$.paymentDiv.setCaption(this.paymentCaption)
		this.updateSummary()
	}
});
