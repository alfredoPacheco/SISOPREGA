enyo
	.kind({
	    name : "sales",
	    kind : enyo.VFlexBox,
	    objMaster : {},
	    arrDetail : [],
	    totalHC : 0,
	    totalWeight : 0,
	    style : "background-color:#DABD8B;font-size:15px;",
	    events : {
		onSale : "",
		onCancel:""
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
						width : "80px;",
						style : "text-align: right;margin-right:5px;"
					    },
					    {
						kind : "ToolInput",
						name : "saleDate",
						hint:"mes/dia/año",
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
						content : "Cliente:",
						width : "80px;",
						style : "text-align: right;margin-right:5px;"
					    }, {
						kind : "controls.autocomplete",
						inputKind : "ToolInput",
						name : "customer",
						hint : 'Cliente',
						width : "500px;",
						height : "35px;",
					    } ]
				} ]
		    },
		    {
			kind : "HFlexBox",
			className : "listFirst",
			style : "padding-left:100px;",
			// style : "font-size:13px;background-color:#DABD8B;",
			// layoutKind : enyo.HFlexLayout,
			align : "center",
			pack : "start",
			components : [ {
			    kind : "controls.autocomplete",
			    inputKind : "ToolInput",
			    height : "35px;",
			    name : "clase",
			    hint : 'Clase',
			    width : "150px;",
			    style : "margin-right: 15px;",
			    onSelectItem : "clase_select"
			}, {
			    kind : "controls.autocomplete",
			    inputKind : "ToolInput",
			    name : "corrales",
			    hint : 'Corrales',
			    width : "200px;",
			    height : "35px;",
			    style : "margin-right: 15px;"
			}, {
			    kind : "ToolInput",
			    name : "cabezas",
			    hint : 'Cabezas',
			    width : "150px;",
			    style : "margin-right: 15px;"
			}, {
			    kind : enyo.Button,
			    caption : "Agregar",
			    onclick : "agregar_click",
			    style : "background-color: #DABD8B;"
			}, ]
		    },
		    {// HEADER:
			kind : "HFlexBox",
			className : "listFirst",
			style : "font-size:13px;background-color:#DABD8B;border-bottom-style: solid;border-bottom-color: #482400;",
			height : "30px",
			align : "center",
			pack : "start",
			components : [
				{
				    content : 'Clase',
				    // className : "listSecond",
				    style : "width:153px;margin-right:15px;margin-left:107px;",
				}, {
				    content : "Corrales",
				    // className : "listSecond",
				    style : "width:200px;margin-right:15px;"
				}, {
				    content : 'Cantidad',
				    // className : "listSecond",
				    style : "width:153px;margin-right:15px;"
				}, {
				    content : "Peso",
				    style : "width:300px;margin-right:15px;"
				}, {
				    style : "width:79px;margin-left:20px;"
				} ]
		    },
		    {
			kind : enyo.Scroller,
			name : "detailScroller",
			flex : 1,
			// className : "listBG",
			style : "background-color: #482400;",
			autoHorizontal : false,
			horizontal : false,
			// style:"background-image:url('images/images
			// (3).jpg');background-repeat:repeat;margin-top: 5px;",
			components : [ {
			    kind : enyo.VirtualRepeater,
			    name : "list",
			    onSetupRow : "setupRow",
			    components : [ {
				kind : enyo.Item,
				layoutKind : enyo.HFlexLayout,
				align : "center",
				pack : "start",
				height : "40px",
				className : "listBG",
				components : [
					{
					    name : 'detail_number',
					    className : "listSecond",
					    style : "width:30px;margin-right:15px;margin-left:30px;color:#5F0712",
					},
					{
					    name : 'detail_clase',
					    className : "listSecond",
					    style : "width:153px;margin-right:15px;margin-left:23px;",
					},
					{
					    name : "detail_corrales",
					    className : "listSecond",
					    style : "width:200px;margin-right:15px;"
					},
					{
					    name : 'detail_cabezas',
					    className : "listSecond",
					    style : "width:153px;margin-right:15px;"
					}, {
					    name : "detail_weight",
					    className : "listSecond",
					    style : "width:100px;"
					}, ]
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
			    components : [
				    {
					content : "Total Cabezas:",
				    },
				    {
					content : '0',
					name : "totalHC",
					className : "listFirst",
					style : "background-color:#DABD8B;margin-left:10px",
					width : "60px;"
				    },
				    {
					content : "Total Peso:",
				    },
				    {
					content : '0',
					name : "totalWeight",
					className : "listFirst",
					style : "background-color:#DABD8B;margin-left:10px;",
					width : "100px;"
				    }, {
					kind : enyo.Spacer
				    }, {
					kind : enyo.Button,
					caption : "Efectuar Venta",
					onclick : "sell_click",
					style : "background-color: #DABD8B;"
				    },{
					kind : enyo.Button,
					caption : "Cacelar",
					onclick : "cancel_click",
					style : "background-color: #DABD8B;"
				    } ]
			} ]
		    } ],
	    agregar_click : function() {

		var newObject = {
		    cattleName : this.$.clase.getValue(),
		    heads : Number(this.$.cabezas.getValue()),
		    pen : this.$.corrales.getItemSelected().object.barnyard,
		    aveWeight : this.$.corrales.getItemSelected().object.avgweight,
		    weight : Number(this.$.corrales.getItemSelected().object.avgweight) * Number(this.$.cabezas.getValue())
		};

		this.arrDetail.push(newObject);
		this.updateList();

		this.$.detailScroller.scrollTo(this.$.detailScroller
			.getBoundaries().bottom, 0);
	    },
	    setupRow : function(inSender, inIndex) {
		if (this.arrDetail[inIndex]) {
		    this.$.detail_number.setContent(inIndex + 1);
		    this.$.detail_clase
			    .setContent(this.arrDetail[inIndex].cattleName);
		    this.$.detail_cabezas
			    .setContent(utils.formatNumberThousands(this.arrDetail[inIndex].heads));
		    this.$.detail_corrales
			    .setContent(this.arrDetail[inIndex].pen.substring(1));
		    this.$.detail_weight
			    .setContent(utils.formatNumberThousands(this.arrDetail[inIndex].weight) + " lb");
		    this.totalHC += Number(this.arrDetail[inIndex].heads);
		    this.totalWeight += Number(this.arrDetail[inIndex].weight);
		    return true;
		}
	    },
	    afterUpdate : function() {
		this.updateList();
	    },
	    reset:function(){
		this.$.saleDate.setValue(utils.dateOut(new Date()));
		this.$.customer.setItems(cacheCustomers.getAllForList());
		this.$.clase.setItems(cachePen.getClassesInPensForList());
		this.$.corrales.setItems(cachePen.getBarnyardsOccupiedForList());
		this.objMaster = {};
		this.arrDetail= [];
		this.totalHC = 0;
		this.totalWeight= 0;
		this.$.cabezas.setValue("");
		this.updateList();
	    },
	    ready : function() {
		this.$.saleDate.$.input.applyStyle("text-align", "center");
		this.$.saleDate.$.input.applyStyle("color", "black");
		this.$.cabezas.$.input.applyStyle("color", "black");
		this.reset();
	    },
	    updateList : function() {
		this.totalHC = 0;
		this.totalWeight = 0;
		this.$.list.render();
		this.$.totalHC.setContent(utils
			.formatNumberThousands(this.totalHC));
		this.$.totalWeight.setContent(utils
			.formatNumberThousands(this.totalWeight));
	    },
	    getSale : function() {
		this.objMaster.sale_date = new Date(this.$.saleDate.getValue());
		this.objMaster.buyer = this.$.customer.getValue();		
		this.objMaster.detail = this.arrDetail;
		this.objMaster.totalHeads=this.totalHC;
		this.objMaster.totalWeight=this.totalWeight;
		this.objMaster.aveWeight=Number(this.totalWeight) / Number(this.totalHC);
		return this.objMaster;
	    },
	    sell_click : function() {
		cacheSales.sell(this.getSale(), this, "after_sell");
	    },
	    after_sell : function() {
		this.doSale();
	    },
	    clase_select : function(inSender) {
		var filter = [];
		var items = this.$.corrales.getItems();
		for ( var i = 0; i < items.length; i++) {
		    if (items[i].object.cattleName == this.$.clase.getValue()) {
			filter.push(items[i]);
		    }
		}
		this.$.corrales.setFilter(filter);
	    },
	    cancel_click:function(){
		this.reset();
		this.doCancel();
	    },
	    applyMask : function(inSender) {
		var _id = inSender.$.input.getId();
		jQuery(function(j) {
		    j(document.getElementById(_id)).mask('99/99/9999');
		});
	    }
	});