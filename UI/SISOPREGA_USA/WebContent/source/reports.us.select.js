enyo.kind({
	name: "reports.us.select",	
	kind: enyo.SlidingView,
	layoutKind: enyo.VFlexLayout,
	events: {
		onHermana : 	"",
		onProforma : 	"",
		onSales: 	"",
		onPurchases : 	"",
		onInventory : 	""
	},	
	className:"buttonsBG",
	components: [
		{kind: enyo.VFlexBox,
		 className:"buttonsBG",
		 flex: 1,
		 align:"center",	    
		 components: [			
			{kind: "Spacer"},
			{kind: "Button", className: "enyo-button-option", caption: "Hermana", onclick:"doHermana"},
			{kind: "Button", className: "enyo-button-option", caption: "Proforma", onclick:"doProforma"},
			{kind: "Button", className: "enyo-button-option", caption: "Ventas", onclick:"doSales"},
			{kind: "Button", className: "enyo-button-option", caption: "Compras", onclick:"doPurchases"},
			{kind: "Button", className: "enyo-button-option", caption: "Inventario", onclick:"doInventory"},
			{kind: "Spacer"}]}
	]
});