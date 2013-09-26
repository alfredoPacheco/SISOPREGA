enyo.kind(
  {
    name : "operations.sales.form",
    kind : "forms.masterDetail",
    published :
      {
        entityKind : crudSale,
        parentObject : null
      },
    create : function() {
      this.inherited(arguments);
      this.$.masterFields.createComponents([
            {
              name : "addCustomerDialog",
              kind : "Popup",
              showHideMode : "transition",
              openClassName : "zoomFadeIn",
              className : "transitioner2",
              layoutKind : "VFlexLayout",
              style : "overflow: hidden",
              width : "85%",
              height : "85%",
              scrim : true,
              components : [

              ]
            },
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
                      kind : "controls.dateMask",
                      inputKind : "ToolInput",
                      name : "saleDate",
                      height : "35px;",
                      bindTo : "dateAllotted",
                      style : "max-width:130px;",
                      bindTo : "saleDate"
                    },
                    {
                      content : 'mes/dia/año',
                      className : "listFirst",
                      style : "background-color:#DABD8B;margin-left:2px;font-size:12px;",
                      width : "80px;"
                    }
              ]
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
                    },
                    {
                      kind : "controls.autocomplete",
                      inputKind : "ToolInput",
                      name : "customer",
                      width : "275px;",
                      height : "35px;",
                      bindTo : "customerId"
                    },
                    {
                      kind : enyo.IconButton,
                      icon : "../SISOPREGA_WEB_LIB/images/menu-icon-new.png",
                      onclick : "showCustomerForm",
                      height : "23px",
                      width : "31px",
                      style : "padding: 2px;margin-top: 3px;background-color: #DABD8B;"
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
                        bindTo : "cattleTypeId"
                      }
              ]
            }
      ],
        {
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
              bindTo : "qualityId",
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
              bindTo : "penId",
              belongsTo : "SaleDetail",
              onSelectItem : "pen_select",
              onEnter:"pen_enter",
              onChangeValue:"pen_change"
            },
            {
                width : "90px;",
                style : "margin-right: 15px;",
                allowHtml:true,
                content:"Disponibles:"
            },
            {
                width : "80px;",
                style : "text-align:left",
                content:"123.3",
                name:"qtyAvailable"
            },
            {
              kind:"controls.numberBox",
              inputKind: "ToolInput",
              name : "cabezas",
              hint : 'Cabezas',
              width : "125px;",
              height : "35px",
              style : "margin-right: 15px;",
              bindTo : "heads",
              belongsTo : "SaleDetail",
              textAlign : "right"            
            },
            {
        	kind:"controls.numberBox",
                inputKind: "ToolInput",
                name : "peso",
                hint : 'Peso',
                width : "125px;",
                height : "35px",
                style : "margin-right: 15px;",
                bindTo : "weight",
                belongsTo : "SaleDetail",
                textAlign : "right"
              }
      ],
        {
          owner : this
        });
    },
    ready : function() {
      this.inherited(arguments);
      crudCustomer.get(this, "readCallBack");
      crudCattle.get(this, "readCallBack");
      crudCattleQuality.get(this, "readCallBack");
      crudPen.get(this, "readCallBack");
      
      this.$.saleDate.setToday();
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
      this.$.cattleType.setItems(crudCattle.getCattleTypeList());
      this.$.cattleType.setIndex(1); // Default value: Novillos
      this.$.pen.setItems(crudPen.getListUsaPens());
      this.$.cattleQuality.setItems(crudCattleQuality.getList());
      this.afterLoad();
    },
    validateAdd:function(){ //function to override if necessary validate the item to be added.
	var sError = "";
	if(this.$.qtyAvailable.getContent() != ""){
	    var headsAvailable =Number(this.$.qtyAvailable.getContent());
	    if (headsAvailable < Number(this.$.cabezas.getValue())){
		sError = "Error. Cantidad de cabezas superior a las disponibles.";		
	    }
	}
	for(var i=0;i<this.arrDetail.length;i++){
	    if(this.arrDetail[i].penId == this.$.pen.getItemSelected().value){
		sError = "Error. El corral que intenta agregar ya se encuentra en la lista.";
		break;
	    }
	}
	if(sError != ""){
	    cacheMan.setMessage("",sError);
	    return false;    
	}
	return true;
	   
      },
    showCustomerForm : function(){
      if (this.$.customerForm) {
        this.$.customerForm.destroy();
      }
      this.$.addCustomerDialog.createComponent(
        {
          kind : "catalogs.customer.form",
          onAdd : "addCustomer",
          onCancel : "cancelCreateCustomer",
          name : "customerForm",
          flex : 1
        },
        {
          owner : this
        });
      this.$.addCustomerDialog.render();
      this.$.addCustomerDialog.openAtCenter();
    },
    addCustomer : function(inSender, result) {
      this.$.customer.setItems(crudCustomer.getList());
      
      var justCreated = result.records[0];
      this.$.customer.setIndex(justCreated.customerId);
      this.$.addCustomerDialog.close();
      cacheMan.hideScrim();
    },
    cancelCreateCustomer : function() {
      this.$.addCustomerDialog.close();
    },
    clase_select : function(inSender) {
     var filter = [];
     var items = crudInventory.getPensList();
     for (var i = 0; i < items.length; i++) {
         if (items[i].object.qualityId == this.$.cattleQuality.getIndex()) {
             filter.push(items[i]);
         }
     }
     this.$.pen.setFilter(filter);
     this.$.pen.clear();
     this.$.pen.useFilter();
    },
    pen_select : function(inSender) {
	var itemSelected = inSender.getItemSelected();
	if(itemSelected && itemSelected.object){	    
	    this.$.qtyAvailable.setContent(itemSelected.object.heads);    
	}else{
	    this.$.qtyAvailable.setContent("");
	}	
    },
    pen_change:function(inSender){
	if(inSender.index < 0){
	    this.$.qtyAvailable.setContent("");
	}
    },
    beforeSave : function(obj) {
	var items = crudInventory.getPensList();	     
	if(obj.SaleDetail){
	    for(var i=0;i<obj.SaleDetail.length;i++){
		obj.SaleDetail[i].inventoryId =-1;
		for (var j = 0; j < items.length; j++) {
		    if (items[j].value == obj.SaleDetail[i].penId) {
			obj.SaleDetail[i].inventoryId = items[j].object.inventoryId;
			break;
		    }
		}
	    }
	}
	return true;
    }
  });
