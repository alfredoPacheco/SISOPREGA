enyo
	.kind({
	    name : "shipments.schedule",
	    kind : enyo.VFlexBox,
	    style : "background-color:#DABD8B;font-size:15px;",
	    arrToShip:[],
	    events : {
		onProgram : "",
		onCancel : ""
	    },
	    components : [
		    {
			kind : enyo.VFlexBox,
			style : "padding:20px;",
			pack : "center",
			components : [
				{
				    kind : enyo.HFlexBox,
				    align : "center",
				    height : "40px;",
				    components : [
					    {
						content : "Fecha:",
						width : "110px;",
						style : "text-align: right;margin-right: 5px;"
					    },
					    {
						kind : "ToolInput",
						name : "programDate",
						width : "135px;",
						height : "35px;",
						onfocus : "applyMask"
					    },
					    {
						content : 'mes/dia/año',
						className : "listFirst",
						style : "background-color:#DABD8B;margin-left:2px;font-size:12px;",
						width : "80px;"
					    }, ]
				},
				{
				    kind : enyo.HFlexBox,
				    align : "center",
				    height : "40px;",
				    components : [
					    {
						content : "Transportista:",
						width : "110px",
						style : "text-align: right;margin-right: 5px;"
					    }, {
						kind : "controls.autocomplete",
						inputKind : "ToolInput",
						name : "carrier",
						width : "500px;",
						height : "35px;",
					    } ]
				} ]
		    }, {
			kind : enyo.VFlexBox,
			style : "padding:20px;",
			pack : "center",
			components : [ {
			    kind : enyo.HFlexBox,
			    align : "center",
			    height : "40px;",
			    style : "font-size:14px;",
			    components : [ {
				kind : enyo.Spacer
			    }, {
				kind : enyo.Button,
				caption : "Programar Envío",
				onclick : "program_click",
				style : "background-color: #DABD8B;"
			    }, {
				kind : enyo.Button,
				caption : "Cancelar",
				onclick : "cancel_click",
				style : "background-color: #DABD8B;"
			    } ]
			} ]
		    } ],

	    afterUpdate : function() {
		this.updateList();
	    },
	    ready : function() {
		this.$.programDate.setValue(utils.dateOut(new Date()));
		this.$.programDate.$.input.applyStyle("text-align", "center");
		this.$.carrier.setItems(cacheDrivers.getAllForList());
	    },
	    setArrShipment:function(arr){
		this.arrToShip = arr;
	    },
	    program_click : function() {
		var len = this.arrToShip.length;
		for ( var i = 0; i < len; i++) {
		    if(this.arrToShip[i]){
			this.arrToShip[i].shipProgramDate=this.$.programDate.getValue();
			this.arrToShip[i].shipCarrier=this.$.carrier.getValue();
			var obj = {
				buyer : this.arrToShip[i].buyer,
				depdate : ("" + this.arrToShip[i].shipProgramDate).substring(0,5),
				deptime : "",
				truck : "",
				cattleName : this.arrToShip[i].cattleName,
				totalHeads : this.arrToShip[i].totalHeads,
				totalWeight : this.arrToShip[i].totalWeight,
				aveWeight : this.arrToShip[i].aveWeight,
				shipCarrier:this.arrToShip[i].shipCarrier,
				shipProgramDate:this.arrToShip[i].shipProgramDate
				
			    };
			cacheShip.createData(obj);
		    }
		}
		this.doProgram();
	    },
	    cancel_click : function() {
		this.doCancel();
	    },
	    applyMask : function(inSender) {
		var _id = inSender.$.input.getId();
		jQuery(function(j) {
		    j(document.getElementById(_id)).mask('99/99/9999');
		});
	    }
	});