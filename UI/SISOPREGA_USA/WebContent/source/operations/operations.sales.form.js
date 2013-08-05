/**
 * Provides a handler for rancher data options.
 * 
 * Revision History: - [DATE] By Alan del Rio: Initial Version. - [DATE] By
 * Alfredo Pacheco: Integrate with web services. - 02/03/2013 By Diego Torres:
 * Add rancher user handlers. - 05/27/2013 By Diego Torres: Adapt to crud.cache.
 * 
 */
enyo.kind({
    name : "operations.sales.form",
    kind : "forms.masterDetail",
    published : {
	entityKind : crudSale, 
	parentObject : null
    },
    create : function() {
	this.inherited(arguments);
	this.$.masterFields.createComponents([ 
	    {
                kind : enyo.HFlexBox,
                align : "center",
                height : "40px;",
                components :
                  [
                    {
                      content : "Fecha:",
                      width : "80px;",
                      style : "text-align: right;margin-right:5px;"
                    },
                    {
			kind : "controls.dateMask",
			inputKind : "ToolInput",
			name : "purchDate",
			height : "35px;",
			bindTo : "dateAllotted",
			style:"max-width:130px;",
			bindTo:"saleDate"
		    } ,
                    {
                      content : 'mes/dia/año',
                      className : "listFirst",
                      style : "background-color:#DABD8B;margin-left:2px;font-size:12px;",
                      width : "80px;"
                    } ]
              },
              {
                kind : enyo.HFlexBox,
                align : "center",
                height : "40px;",
                components :
                  [
                    {
                      content : "Cliente:",
                      width : "80px;",
                      style : "text-align: right;margin-right:5px;"
                    },
                    {
                      kind : "controls.autocomplete",
                      inputKind : "ToolInput",
                      name : "customer",
                      width : "275px;",
                      height : "35px;",
                      bindTo:"customerId"
                    },
                    {
                      kind : enyo.IconButton,
                      icon : "../SISOPREGA_WEB_LIB/images/menu-icon-new.png",
                      onclick : "doAddCustomer",
                      height : "23px",
                      width : "23px",
                      style : "padding: 2px;margin-top: 0px;background-color: #DABD8B;"
                    }
                    ]
              }
	 ], {
	    owner : this
	});
	this.$.detailFields.createComponents([
	    {
                kind : "controls.autocomplete",
                inputKind : "ToolInput",
                height : "35px;",
                name : "cattleQuality",
                hint : 'Clase',
                width : "200px;",
                style : "margin-right: 15px;",
                bindTo:"cattleQualityId",
                belongsTo : "SaleDetail",
                onSelectItem : "clase_select"
              },
              {
                kind : "controls.autocomplete",
                inputKind : "ToolInput",
                height : "35px;",
                name : "pen",
                hint : "Corral",
                width : "150px;",
                style : "margin-right: 15px;",
                bindTo:"penId",
                belongsTo : "SaleDetail"
              },
              {
                kind : "ToolInput",
                name : "cabezas",
                hint : 'Cabezas',
                width : "125px;",
                style : "margin-right: 15px;",
                bindTo:"heads",
                belongsTo : "SaleDetail",
                textAlign:"right"

              },
              {
                kind : "ToolInput",
                name : "peso",
                hint : 'Peso Promedio',
                width : "125px;",
                style : "margin-right: 15px;",
                calculated:true,
//                bindTo:"avgWeight",
//                belongsTo : "PurchaseDetail",
                textAlign:"right",
                showing:false
              }
	 ], {
	    owner : this
	});
    },
    ready : function() {
	this.inherited(arguments);
	crudCustomer.get(this, "readCallBack");
	crudCattle.get(this, "readCallBack");
	crudCattleQuality.get(this, "readCallBack");
	crudPen.get(this, "readCallBack");
	
	this.$.purchDate.setToday();
    },
    readCounter : 0,
    readCallBack : function() {
	this.readCounter++;
	if (this.readCounter == 4) {
	    this.loadAutocompletes();
	    this.readCounter = 0;
	}
    },
    loadAutocompletes : function() {
	
	this.$.customer.setItems(crudCustomer.getList());

	this.$.pen.setItems(crudPen.getListUsaPens());
	
	this.$.cattleQuality.setItems(crudCattleQuality.getList());
	
	this.afterLoad();
	
//	if(!this.bUpdatingMode){
//	    this.$.cattype_id.setIndex(1); // Default value: Novillos
//
//	    // Set location_id and zone_id based on pen.
//		var deductedZone = this.deduceZone();
//		if (deductedZone == 1)
//		    this.$.location_id.setIndex(1); // Default value: Chihuahua
//
//		this.$.zone_id.setIndex(deductedZone);    
//	}
    },
    setupRow : function(inSender, inIndex) {
	if (objItem = this.arrDetail[inIndex]) {
	     this.$.detail_number.setContent(inIndex + 1);
	    for ( var i = 0; i < objItem.fields.length; i++) {
		this.$["detailItem" + i].content = objItem.fields[i];    
	    }
//	    this.$["detailItem3"].content = Number(objItem.fields[3])/Number(objItem.fields[2]);

	    // this.totalHC += Number(this.arrDetail[inIndex].heads);
	    // this.totalWeight +=
	    // Number(this.arrDetail[inIndex].weight);

	    return true;
	}
    },
    clase_select : function(inSender) { //TODO rewrite this function when crudPen.getUsaPenOccupied is ready
//	var filter = [];
//	var items = crudPen.getListUsaPens(); //TODO get pens occupied right now instead
//	for ( var i = 0; i < items.length; i++) {
//	    if (items[i].object.cattleType == this.$.clase.getIndex()) {
//		filter.push(items[i]);
//	    }
//	}
//	this.$.pen.setFilter(filter);
//	this.$.pen.clear();
//	this.$.pen.useFilter();
    },
});
