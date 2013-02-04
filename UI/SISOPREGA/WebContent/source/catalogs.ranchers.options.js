/**
 * Provides a handler for rancher data options.
 * 
 * Revision History: 
 * - [DATE] By Alan del Rio: Initial Version. 
 * - [DATE] By Alfredo Pacheco: Integrate with web services. 
 * - 02/03/2013 By Diego Torres: Add rancher user handlers.
 * 
 */
enyo.kind(
  {
    name : "catalogs.ranchers.options",
    kind : enyo.SlidingView,
    layoutKind : enyo.VFlexLayout,
    events :
      {
        "onEdit" : "",
        "onContacts" : "",
        "onBilling" : "",
        "onRegister" : ""
      },
    components :
      [
        {
          kind : enyo.VFlexBox,
          className : "buttonsBG",
          flex : 1,
          align : "center",
          components :
            [
              {
                kind : "Spacer"
              },
              {
                kind : "Button",
                className : "enyo-button-cat",
                caption : "Editar",
                onclick : "doEdit"
              },
              {
                kind : "Button",
                className : "enyo-button-cat",
                caption : "Contactos",
                onclick : "doContacts"
              },
              {
                kind : "Button",
                className : "enyo-button-cat",
                caption : "Facturacion",
                onclick : "doBilling"
              },
              {
                kind : "Button",
                className : "enyo-button-cat",
                caption : "Usuarios",
                onclick : "doRegister"
              },
              {
                kind : "Spacer"
              } ]
        } ]
  });