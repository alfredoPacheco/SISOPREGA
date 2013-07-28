/**
 * Provides a handler for rancher data options.
 * 
 * Revision History: - [DATE] By Alan del Rio: Initial Version. - [DATE] By
 * Alfredo Pacheco: Integrate with web services. - 02/03/2013 By Diego Torres:
 * Add rancher user handlers. - 05/27/2013 By Diego Torres: Adapt to crud.cache.
 * 
 */
enyo.kind({
    name : "operations.purchase.form",
    kind : "forms.masterDetail",
    published : {
	entityKind : crudPurchase, 
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
			bindTo:"purchaseDate"
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
                      content : "Proveedor:",
                      width : "80px;",
                      style : "text-align: right;margin-right:5px;"
                    },
                    {
                      kind : "controls.autocomplete",
                      inputKind : "ToolInput",
                      name : "seller",
                      width : "275px;",
                      height : "35px;",
                      bindTo:"supplierId"
                    },
                    {
                      kind : enyo.IconButton,
                      icon : "../SISOPREGA/images/menu-icon-new.png",
                      onclick : "doAddSupplier",
                      height : "23px",
                      width : "23px",
                      style : "padding: 2px;margin-top: 0px;background-color: #DABD8B;"
                    },
                    {
                      content : "Ganado:",
                      width : "80px;",
                      style : "text-align: right;margin-right:5px;"
                    },
                    {
                      kind : "controls.autocomplete",
                      inputKind : "ToolInput",
                      name : "cattleType",
                      width : "200px;",
                      height : "35px;",
                      bindTo:"cattleTypeId"
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
                belongsTo : "PurchaseDetail"
              },
              {
                kind : "controls.autocomplete",
                inputKind : "ToolInput",
                height : "35px;",
                name : "pen",
                hint : "Corral",
                width : "150px;",
                style : "margin-right: 15px;",
                bindTo:"penString",
                belongsTo : "PurchaseDetail"
              },
              {
                kind : "ToolInput",
                name : "cabezas",
                hint : 'Cabezas',
                width : "125px;",
                style : "margin-right: 15px;",
                bindTo:"heads",
                belongsTo : "PurchaseDetail",
                textAlign:"right"

              },
              {
                kind : "ToolInput",
                name : "peso",
                hint : 'Peso Promedio',
                width : "125px;",
                style : "margin-right: 15px;",
                bindTo:"avgWeight",
                belongsTo : "PurchaseDetail",
                textAlign:"right"
              }
	 ], {
	    owner : this
	});
    },
    ready : function() {
	this.inherited(arguments);
	crudSeller.get(this, "readCallBack");
	crudCattle.get(this, "readCallBack");
	crudCattleQuality.get(this, "readCallBack");
	crudPen.get(this, "readCallBack");
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
	
	this.$.seller.setItems(crudSeller.getList());
	this.$.cattleType.setItems(crudCattle.getCattleTypeList());

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
});
