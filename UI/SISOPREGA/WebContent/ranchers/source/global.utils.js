function UTCtoNormalDate(strUTC) {
  var dateFmt = "";
  if (strUTC != "" && strUTC !== undefined) {
    var fmt = new enyo.g11n.DateFmt(
      {
        format : "yyyy/MM/dd",
        locale : new enyo.g11n.Locale("es_es")
      });
    var dateFromUTC = new Date(parseInt(strUTC));
    dateFmt = fmt.format(dateFromUTC);
  }

  return dateFmt;
}
function DateOut(normalDate) {
	  var dateFmt = "";
	  if (normalDate != "" && normalDate !== undefined) {
	    var fmt = new enyo.g11n.DateFmt(
	      {
	        format : "MM/dd/yyyy",
	        locale : new enyo.g11n.Locale("es_es")
	      });
	    var dateNew = new Date(normalDate);
	    dateFmt = fmt.format(dateNew);
	  }
	  return dateFmt;
}
function phoneToMask(p){
	  var phone = p;
	  if (phone !== undefined && phone != "") {
	    if (phone.length >= 10) {
	      phone = phone.slice(-10);
	      phone = "(" + phone.substr(0, 3) + ") " + phone.substr(3, 3) + "-" + phone.substr(6);
	    }
	  }
	  return phone;		
}
function utils.phoneOut(p){
	  var phone = p;
	  if (phone !== undefined) {
	    phone = phone.replace("(", "");
	    phone = phone.replace(")", "");
	    phone = phone.replace("-", "");
	    phone = phone.replace(" ", "");
	    phone = phone.replace("_", "");
	  }

	  return "" + phone;	
}

var colorStack = {
	arrColors:["limegreen",
	           "goldenrod", 
	           "darkgray",
	           "darkkhaki",
	           "lightsteelblue"],
	actualIndex:0,
	pop:function(){
		this.actualIndex--;
		if(this.actualIndex == -1){
			this.actualIndex = this.arrColors.length - 1;
		}
		return this.arrColors[this.actualIndex];
	},
	getActual:function(){
		return this.arrColors[this.actualIndex];
	}

};