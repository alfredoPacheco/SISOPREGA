/** 
 * Provides a handler for users list administration. 
 * 
 * Revision History:  
 * - 02/05/2013 By Diego Torres: Initial Version.
 *  
 * */
enyo.kind(
  {
    name : "users.list",
    kind : enyo.VFlexBox,
    events :
      {
        "onLoad" : "",
        "onCreation" : "",
        "onSelectUser" : ""
      },
    iSelected : null,
    users : [],
    components :
      [
        {
          kind : enyo.Scroller,
          flex : 1,
          className : "listBG",
          components :
            [
              {
                kind : enyo.VirtualRepeater,
                name : "usersList",
                onSetupRow : "setupUserRow",
                onclick : "selectUser",
                components :
                  [
                    {
                      kind : "Divider"
                    },
                    {
                      kind : enyo.SwipeableItem,
                      onConfirm : "deleteUser",
                      tapHighlight : true,
                      components :
                        [
                          {
                            name : "name",
                            className : "listFirst",
                            content : ""
                          },
                          {
                            name : "info",
                            className : "listSecond",
                            content : ""
                          } ]
                    } ]
              } ]
        },
        {
          kind : "Toolbar",
          components :
            [
              {
                kind : "ListSelector",
                name : 'filter_id',
                label : "Filtro",
                hideItem : true,
                onChange : "filterUsers",
                items :
                  [
                    {
                      caption : "Admin",
                      value : 1
                    },
                    {
                      caption : "Mex user",
                      value : 2
                    },
                    {
                      caption : "Todo",
                      value : 3
                    } ],
                flex : 1,
                contentPack : "end"
              } ]
        } ],
    updateList : function() {
      this.users = cacheUsers.get();
      if (this.users.length > 0) {
        this.users.sort(function(inA, inB) {
          return
            [ inA.userName.toLowerCase() ] <=
            [ inB.userName.toLowerCase() ] ? -1 : 1;
        });
      }
      this.$.usersList.render();
    }
  });