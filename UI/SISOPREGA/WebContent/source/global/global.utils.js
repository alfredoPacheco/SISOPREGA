enyo.kind(
  {
    name : "global.utils",
    kind : enyo.Component,
    formatNumberThousands : function(numberStr) {
      numberStr += '';
      var decParts = numberStr.split('.');
      var cardinal = decParts[0];
      var ordinal = decParts.length > 1 ? '.' + decParts[1] : '';

      // divide each 3 digits
      var regEx = /(\d+)(\d{3})/;
      while (regEx.test(cardinal)) {
        cardinal = cardinal.replace(regEx, '$1' + ',' + '$2');
      }

      var fixedOrdinal = ordinal.length > 3 ? ordinal.substr(0, 3) : ordinal;
      var result = cardinal + fixedOrdinal;

      return result;
    },
    utcToNormalDate : function(strUTC) {
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
    },
    dateOut : function(normalDate) {
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
    },
    dateTimeOut : function(normalDate) {
      var dateFmt = "";
      if (normalDate != "" && normalDate !== undefined) {
        var fmt = new enyo.g11n.DateFmt(
          {
            format : "MM/dd/yyyy hh:mm a",
            locale : new enyo.g11n.Locale("es_es")
          });
        var dateNew = new Date(normalDate);
        dateFmt = fmt.format(dateNew);
      }
      return dateFmt;
    },
    utcToNormalDateTime : function(strUTC) {
      var dateFmt = "";
      if (strUTC != "" && strUTC !== undefined) {
        var fmt = new enyo.g11n.DateFmt(
          {
            format : "MM/dd/yyyy hh:mm a",
            locale : new enyo.g11n.Locale("es_es")
          });
        var dateFromUTC = new Date(parseInt(strUTC));
        dateFmt = fmt.format(dateFromUTC);
      }

      return dateFmt;
    },
    dateTimeOut : function(normalDate) {
      var dateFmt = "";
      if (normalDate != "" && normalDate !== undefined) {
        var fmt = new enyo.g11n.DateFmt(
          {
            format : "MM/dd/yyyy HH:mm",
            locale : new enyo.g11n.Locale("es_es")
          });
        var dateNew = new Date(normalDate);
        dateFmt = fmt.format(dateNew);
      }
      return dateFmt;
    },
    phoneOut : function(p) {

      var phone = p;
      if (phone !== undefined) {
        phone = phone.replace("(", "");
        phone = phone.replace(")", "");
        phone = phone.replace("-", "");
        phone = phone.replace(" ", "");
        phone = phone.replace("_", "");
      }

      return "" + phone;

    },
    phoneToMask : function(p) {
      var phone = p;
      if (phone !== undefined && phone != "") {
        if (phone.length >= 10) {
          phone = phone.slice(-10);
          phone = "(" + phone.substr(0, 3) + ") " + phone.substr(3, 3) + "-" + phone.substr(6);
        }
      }
      return phone;
    },
    colorStack :
      {
        arrColors :
          [ "limegreen", "goldenrod", "darkgray", "darkkhaki", "lightsteelblue" ],
        actualIndex : 0,
        pop : function() {
          this.actualIndex--;
          if (this.actualIndex == -1) {
            this.actualIndex = this.arrColors.length - 1;
          }
          return this.arrColors[this.actualIndex];
        },
        getActual : function() {
          return this.arrColors[this.actualIndex];
        }

      },
    components :
      [
        {
          kind : "Popup",
          name : "reportContainer",
          dismissWithClick : true,
          showHideMode : "transition",
          openClassName : "zoomFadeIn",
          className : "transitioner2",
          layoutKind : "VFlexLayout",
          style : "overflow: hidden",
          width : "95%",
          height : "95%",
          scrim : true
        } ],

    openReport : function(url) {
      // Create link in memory
      var a = window.document.createElement("a");
      a.target = '_blank';
      a.href = url;

      // Dispatch fake click
      var e = window.document.createEvent("MouseEvents");
      e.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      a.dispatchEvent(e);
      return false;

      //		this.$.reportContainer.$.rViewer.setReport(reportName);
      //		this.$.reportContainer.$.rViewer.applyStyle("height",null);
      //		this.$.reportContainer.openAtCenter();				
    },
    ready : function() {
      this.$.reportContainer.createComponent(
        {
          kind : "controls.reportViewer",
          name : 'rViewer'
        });
    },
    getCookie : function(cookieName) {
      var cookieValue = document.cookie;
      var cookieStart = cookieValue.indexOf(" " + cookieName + "=");
      if (cookieStart == -1)
        cookieStart = cookieValue.indexOf(cookieName + "=");
      
      if (cookieStart == -1)
        cookieValue = null;
      else {
        cookieStart = cookieValue.indexOf("=", cookieStart) + 1;
        var cookieEnd = cookieValue.indexOf(";", cookieStart);

        if (cookieEnd == -1)
          cookieEnd = cookieValue.length;

        cookieValue = unescape(cookieValue.substring(cookieStart, cookieEnd));
      }

      return cookieValue;

    },
    setCookie : function(cookieName, value, expirationDays) {
      var expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + expirationDays);

      var cookieValue = escape(value) + ((expirationDays == null) ? "" : "; expires=" + expirationDate.toUTCString());
      document.cookie = cookieName + "=" + cookieValue;
    }
  });

var utils = new global.utils();