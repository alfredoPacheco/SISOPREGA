enyo
	.kind({
	    name : "forms.masterDetail",
	    kind : "forms.simple",
	    objMaster : {},
	    arrDetail : [],
	    // totalHC : 0,
	    // totalWeight : 0,
	    detailNumber : 0,
	    style : "background-color:#DABD8B;font-size:15px;",
	    events : {
		onSave : "",
		onCancel : ""
	    },
	    components : [
		    {
			kind : enyo.VFlexBox,
			style : "padding:20px;",
			pack : "center",
			name : "masterFields"
		    },
		    {
			kind : "HFlexBox",
			className : "listFirst",
			style : "padding-left:100px;",
			align : "center",
			pack : "start",
			components : [
				{
				    kind : "HFlexBox",
				    align : "center",
				    pack : "start",
				    name : "detailFields"
				},
				{
				    content : '<button type="button" style="border: 0;background-color: transparent;margin: 0px;padding: 0px;color: #292929;font-size: 16px;">Agregar</button>',
				    allowHtml : true,
				    onclick : "addDetailItem",
				    onmousedown : "buttonDown",
				    onmouseup : "buttonUp",
				    onmouseout : "buttonUp",
				    onmouseover : "buttonDown",
				    className : "enyo-button",
				    style : "background-color:  #DABD8B;"
				} ]
		    },
		    {// HEADER:
			kind : "HFlexBox",
			className : "listFirst",
			style : "font-size:13px;background-color:#DABD8B;border-bottom-style: solid;border-bottom-color: #482400;",
			height : "30px",
			align : "center",
			pack : "start",
			name : "detailHeader",
			components : [
			// {
			// content : 'Clase',
			// // className : "listSecond",
			// style :
			// "width:153px;margin-right:15px;margin-left:107px;",
			// }, {
			// content : "Corrales",
			// // className : "listSecond",
			// style : "width:200px;margin-right:15px;"
			// }, {
			// content : 'Cantidad',
			// // className : "listSecond",
			// style : "width:153px;margin-right:15px;"
			// }, {
			// content : "Peso",
			// style : "width:300px;margin-right:15px;"
			// }, {
			// style : "width:79px;margin-left:20px;"
			// }
			]
		    },
		    {
			kind : enyo.Scroller,
			name : "detailScroller",
			flex : 1,
			style : "background-color: #482400;",
			autoHorizontal : false,
			horizontal : false,
			components : [ {
			    kind : enyo.VirtualRepeater,
			    name : "list",
			    onSetupRow : "setupRow",
			    components : [ {
				kind : enyo.SwipeableItem,
				layoutKind : enyo.HFlexLayout,
				align : "center",
				pack : "start",
				height : "40px",
				className : "listBG",
				onConfirm : "delDetailItem",
				name : "detailItem",
				components : [
				// {
				// name : 'detail_number',
				// className : "listSecond",
				// style :
				// "width:30px;margin-right:15px;margin-left:30px;color:#5F0712",
				// },
				// {
				// name : 'detail_clase',
				// className : "listSecond",
				// style :
				// "width:153px;margin-right:15px;margin-left:23px;",
				// },
				// {
				// name : "detail_corrales",
				// className : "listSecond",
				// style : "width:200px;margin-right:15px;"
				// },
				// {
				// name : 'detail_cabezas',
				// className : "listSecond",
				// style : "width:153px;margin-right:15px;"
				// }, {
				// name : "detail_weight",
				// className : "listSecond",
				// style : "width:100px;"
				// },
				]
			    } ]
			} ]
		    },
		    {
			kind : enyo.VFlexBox,
			style : "padding:20px;border-top-style: solid;border-top-color:#482400",
			pack : "center",

			components : [ {
			    kind : enyo.HFlexBox,
			    align : "center",
			    height : "40px;",
			    style : "font-size:14px;",
			    components : [ {
				kind : enyo.Button,
				caption : "Efectuar Venta",
				onclick : "addEntity",
				style : "background-color: #DABD8B;"
			    }, {
				kind : enyo.Button,
				caption : "Cacelar",
				onclick : "cancel",
				style : "background-color: #DABD8B;"
			    } ]
			} ]
		    } ],
	    ready : function() {
		var dataFields = this.$.detailFields.children;
		var count =0;
		for ( var i = 0; i < dataFields.length; i++) {
		    if (dataFields[i].hasOwnProperty("bindTo")) {
			this.$.detailHeader
				.createComponent(
					{
					    content : dataFields[i].hint,
					    style : "margin-right:15px;margin-left:107px;min-width:"
						    + dataFields[i].width,
					}, {
					    owner : this
					});

			this.$.detailItem.createComponent(
			    {
					    name : "detailItem" + count++,
					    className : "listSecond",
					    style : "margin-right:15px;margin-left:23px;min-width:"
						    + dataFields[i].width,
					}, {
					    owner : this
					});
		    }
		}

	    },
	    buttonDown : function(inSender, inEvent) {
		if (inEvent.which) {
		    inSender
			    .setClassName("enyo-button enyo-button-hot enyo-button-down");
		}
	    },
	    buttonUp : function(inSender, inEvent) {
		inSender.setClassName("enyo-button");
	    },
	    addDetailItem : function() {
		var newObject = {
		    // detailNumber : this.detailNumber++,
		    fields : []
		};

		var detailFields = this.$.detailFields.children;
		for ( var i = 0; i < detailFields.length; i++) {
		    newObject.fields[i] = this.getValueFromControl(detailFields[i]);
		}

		this.arrDetail.push(newObject);
		this.updateList();

		// this.$.clase.setFocus();

		this.$.detailScroller.scrollTo(this.$.detailScroller
			.getBoundaries().bottom, 0);
	    },
	    delDetailItem : function(inSender, inIndex) {
		this.arrDetail.splice(inIndex, 1);
		this.updateList();
	    },
	    setupRow : function(inSender, inIndex) {
		if (objItem = this.arrDetail[inIndex]) {
		    // this.$.detail_number.setContent(inIndex + 1);
		    for ( var i = 0; i < objItem.fields.length; i++) {
			    this.$["detailItem" + i].content = objItem.fields[i];
		    }
		    // this.$.detail_clase.setContent(this.arrDetail[inIndex].cattleName);
		    // this.$.detail_cabezas.setContent(utils.formatNumberThousands(this.arrDetail[inIndex].heads));
		    // this.$.detail_corrales.setContent(this.arrDetail[inIndex].pen.substring(1));
		    // this.$.detail_weight.setContent(utils.formatNumberThousands(this.arrDetail[inIndex].weight)
		    // + " lb");

		    // this.totalHC += Number(this.arrDetail[inIndex].heads);
		    // this.totalWeight +=
		    // Number(this.arrDetail[inIndex].weight);

		    return true;
		}
	    },
	    afterUpdate : function() {
		this.updateList();
	    },
	    // ready : function() {
	    // this.reset();
	    // },
	    updateList : function() {
		// this.totalHC = 0;
		// this.totalWeight = 0;
		this.$.list.render();
		// this.$.totalHC.setContent(utils.formatNumberThousands(this.totalHC));
		// this.$.totalWeight.setContent(utils.formatNumberThousands(this.totalWeight));
	    },
	// save_click : function() {
	// var sale = this.getSale();
	// if (sale) {
	// cacheSales.sell(this.getSale(), this, "after_save");
	// }
	// },
	// after_save : function() {
	// this.doSave();
	// this.reset();
	// },
	// cancel_click : function() {
	// this.reset();
	// this.doCancel();
	// }
	});