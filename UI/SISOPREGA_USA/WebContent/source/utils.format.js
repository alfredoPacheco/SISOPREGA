enyo.kind({
	name: "utils",
	kind: enyo.VFlexBox,
	numCD:function (x){
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
});
var gblUtils=new utils();