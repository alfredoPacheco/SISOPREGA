enyo
    .kind(
      {
        name : "file.uploader",
        kind : enyo.VFlexBox,
        components :
          [
                {
                  kind : "RowGroup",
                  defaultKind : "HFlexBox",
                  caption : "",
                  components :
                    [
                          {
                            allowHtml : true,
                            content : '<form action="PdfUploader" enctype="multipart/form-data" name="frmUpload" id="frmUpload"> <input id="pdfFile" name="pdfFile" type="file" /></form>'
                          },
                          {
                            kind : "controls.autocomplete",
                            name : "rancher_id",
                            hint : "Ganadero",
                            flex : 1,
                            contentPack : "end",
                            onEnter : "emularTabulacionConEnter"
                          },
                          {
                            kind : "Input",
                            name : 'folio_id',
                            hint : "Folio"
                          },
                          {
                            kind : "VFlexBox",
                            style : "",
                            components :
                              [
                                {
                                  kind : "DatePicker",
                                  name : "exp_date",
                                  minYear : 1940,
                                  maxYear : new Date().getFullYear(),
                                  label : "",
                                  className : "picker-hbox"
                                } ]
                          }

                    ]
                },
                {
                  kind : "Button",
                  name : "btnUpload",
                  className : "enyo-button-affirmative",
                  caption : "Crear",
                  onclick : "uploadFile"
                },
                {
                  kind : "Spacer"
                } ],
        resetValues : function() {
          this.$.rancher_id.setIndex(-1);
          this.$.folio_id.setValue("");
          this.$.exp_date.setValue(new Date());
        },
        create : function() {
          this.inherited(arguments);
          this.$.rancher_id.setItems(cacheRanchers.getAllForList());
          this.$.exp_date.setValue(new Date());
        },
        uploadFileCallBack : function(succeed) {
          var fmt = new enyo.g11n.DateFmt(
              {
                format : "dd/MMM/yyyy",
                locale : new enyo.g11n.Locale("es_es")
              });
          
          cacheMan.hideScrim();
          if(succeed){
            alert('Pedimento Cargado con exito');
            var msg = 'El pedimento No. ' + this.$.folio_id.getValue() + ' con fecha del ' + fmt.format(this.$.exp_date.getValue())
                + ' ha sido agregado a su perfil en internet.';
            consumingGateway.SendMessage(this.$.rancher_id.getIndex(), msg);
            this.resetValues();
          }else{
            alert('Error Cargando Pedimento');
          }
          // end call back request
          return false;
        },
        uploadFile : function() {
          cacheMan.showScrim();
          var fmt = new enyo.g11n.DateFmt(
            {
              format : "yyyy/MM/dd",
              locale : new enyo.g11n.Locale("es_es")
            });
          var formElement = document.getElementById("frmUpload");
          var oMyForm = new FormData(formElement);
          var sParams = null;
          var self = this;
          sParams = "rancher_id=" + this.$.rancher_id.getIndex() + "&folio_id=" + this.$.folio_id.getValue();
          sParams += "&exp_date=" + fmt.format(this.$.exp_date.getValue());
          jQuery.ajax(
            {
              type : 'POST',
              contentType : false,
              processData : false,
              url : 'PdfUploader?' + sParams,
              data : oMyForm,
              success : function(data) {
                self['uploadFileCallBack'](true);
              },
              error : function(xhr, textStatus, errorThrown) {
                self['uploadFileCallBack'](false);
              }
            });
        },
        emularTabulacionConEnter : function(inSender) {
          switch (inSender.name) {
          case "rancher_id":
            this.$.cattype_id.setFocus();
            break;
          case "cattype_id":
            this.$.city_id.setFocus();
            break;
          case "city_id":
            this.$.hc_aprox.forceFocus();
            break;
          case "hc_aprox":
            this.$.weight.forceFocus();
            break;
          case "weight":
            this.$.rancher_id.setFocus();
            break;
          }
        }
      });