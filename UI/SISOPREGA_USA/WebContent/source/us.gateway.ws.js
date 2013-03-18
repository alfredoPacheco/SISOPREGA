enyo.kind({
  name : "us.gateway.ws",
  getUserRoles: function(userName){
    var roles = [];
    // SOAP Message:
    var soapMessage = soapHeader + '<ws:ReadUserRoles>';
    soapMessage += '<userName>' + userName + '</userName>';
    soapMessage += '</ws:ReadUserRoles>';
    soapMessage += soapFooter;

    // Ajax request:
    jQuery.ajax(
      {
        url : identityWsURL,
        type : "POST",
        dataType : "xml",
        data : soapMessage,
        processData : false,
        contentType : "text/xml;charset=UTF-8",
        async : false,
        success : function OnSuccess(data) {
          jQuery(data).find("return").each(function() {
            var roleName = jQuery(this).text();
            roles.push(roleName);
          });
        },
        error : function OnError(request, status, error) {
          alert(request.getResponse.text());
        }
      });
    return roles;
  }
});
var usGateway = new us.gateway.ws();