enyo.kind({
  name:"hermana.de",
  kind : enyo.VFlexBox,
  events : {
    "onSave":"",
    "onCancel":""
  },
  components : 
    [
     {
       kind : "Toolbar",
       name : "HermanaToolBar",
       align : "left",
       pack : "left",
       style : "background:#C9C9C9;min-height:10px;height:45px;",
       components : 
         [
          {
            name : 'btnPrint',
            onclick : "printHermana",
            icon : "images/print.png"
          },
          {
            name : 'btnLogOut',
            onclick : "logOut",
            icon : "../SISOPREGA/images/command-menu/icon-context.png"
          },
          {
            name : 'btnLogOut',
            onclick : "logOut",
            icon : "../SISOPREGA/images/command-menu/icon-context.png"
          }
         ]
     },
     {
       kind : enyo.Scroller,
       className : "formBG",
       flex : 1,
       components :[{}]
     }
    ]
});