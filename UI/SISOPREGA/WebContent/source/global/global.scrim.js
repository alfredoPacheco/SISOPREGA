enyo.kind({
	    kind : enyo.Scrim,
	    name : "global.scrim",
	    layoutKind : enyo.VFlexLayout,
	    align : "center",
	    pack : "center",
	    components : [
		    {
			kind : "SpinnerLarge"
		    },
		    {
			kind : "Image",
			src : "images/ajax-loader.gif",
			style : "width:250px;"
		    },
		    {
			kind : "LabeledContainer",
			label : "Cargando ...",
			style : "font-family:'Courier New', monospace;font-size:xx-large;color:white;"
		    } ]
	});
var globalScrim = new global.scrim();