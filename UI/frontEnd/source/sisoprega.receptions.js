/* Copyright 2009-2011 Hewlett-Packard Development Company, L.P. All rights reserved. */
enyo.kind(
    {
	 name: "sisoprega.receptions",
	kind: enyo.VFlexBox,
	 flex: 1, // necessary so this doesnt 'disappear'
      components: [
		{name: "slidingPane", kind: "SlidingPane", flex: 1, onSelectView: "slidingSelected", components: [	  
        { name: "receptions", kind: "receptions.main", width:"30%", onWeights:"showWeights"},
        { name: "r2", kind: "weights.list",width:"30%"},
		 { name: "r3", kind: "barnyards.list",width:"40%"},				
       // { name: "r3", kind: "enyo.CanonVirtualList",width:"40%"},				
	   ]}
      ],
	showWeights:function(){
		//alert(654654645);
		this.$.slidingPane.selectViewByIndex(2);	
	},  
	showBarnyards:function(){
		//alert(654654645);
		this.$.slidingPane.selectViewByIndex(2);	
	},  	
});
