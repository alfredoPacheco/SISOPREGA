enyo.kind({
	name: "utils",
	kind: enyo.VFlexBox,
	numCD:function (x){
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	},
	validateKeyStrokes:function(inSender, inEvent){
		if (inSender.inputType=="numeric"){
			var regExp =  /[0-9]+([.]{1}|[.]{0})[0-9]{0,2}/; 		
			var temp = inSender.getValue();
			var temp=regExp.exec(temp)
			if(temp){
				inSender.setValue(temp[0]);
			}else{
				inSender.setValue("")
			}
				
		}
	}
});
var gblUtils=new utils();