enyo.kind({
	name: "admin.screen",
	kind: enyo.VFlexBox,
	components: [
		{name: "slidingPane", kind: "SlidingPane", flex: 1, onSelectView: "slidingSelected", components: [
			{flex:.3,components:[{name:"inventory",kind:"admin.inventory", flex:1, maxState:false,}]},
			{peekWidth:"30%",flex:.3,components:[{name:"purchased",kind:"admin.purchased", flex:1, maxState:false,}]},
			{peekWidth:"60%",flex:.3,
			 components:[
			 	{name:"sales",kind:"admin.sales", flex:1, maxState:false,},
				{name:"shipment",kind:"admin.shipments", flex:1, maxState:false,}]},
		]}
	],
	next: function() {
		this.$.slidingPane.next();
	},
	maximizePanel: function(inSender){
		switch(inSender.name){
			case "inventory":
				if(!inSender.maxState){
					this.hideNext(inSender);
 					inSender.maxState=true;
				}else{
					this.showNext(inSender);					
 					inSender.maxState=false;					
				}
				break;
			case "purchased":
				if(!inSender.maxState){			
					this.hideNext(inSender);
					this.next(inSender);
 					inSender.maxState=true;					
				}else{
					this.backHandler(inSender);
					inSender.render();
					setTimeout(this.test,1000,this,inSender);				
 					inSender.maxState=false;					
				}
				break;			
			case "sales":	
				if(!inSender.maxState){			
					this.next(inSender);
					//this.next(inSender);					
 					inSender.maxState=true;					
				}else{
					this.backHandler(inSender);										
 					inSender.maxState=false;					
				}
				break;			
		}
	},
	test:function(obj,inSender){
		obj.showNext(inSender);
	},
	backHandler: function(inSender, e) {
		this.$.slidingPane.back(e);
	},
	hideNext: function(inSender) {
		var n = this.findNextSlidingAncestor(inSender);
		if (n) {
			n.setShowing(false);
		}
	},
	showNext: function(inSender) {
		var n = this.findNextSlidingAncestor(inSender);
		if (n) {
			n.setShowing(true);
		}
	},
	findNextSlidingAncestor: function(inSender) {
		var s = this.findSlidingAnestor(inSender);
		return s && s.getNextSibling();
	},
	findSlidingAnestor: function(inSender) {
		p = inSender.parent;
		while (p) {
			if (p instanceof enyo.SlidingView) {
				return p;
			}
			p = p.parent;
		}
	}
});