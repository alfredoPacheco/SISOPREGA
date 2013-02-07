/**  
 * 
 * Provides a handler for users list administration.  
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
        "onAddUser" : "",
        "onSelectUser" : ""
      },
    iSelected : -1,
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
                onSetupRow : "setupRow",
                onclick : "selectUser",
                components :
                  [
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
                kind : "enyo.IconButton",
                flex : 1,
                icon : "images/menu-icon-new.png",
                onclick : "doAddUser"
              },
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
      this.iSelected = -1;
    },
    setupRow : function(inSender, inIndex) {
      if (!this.users || this.users.length == 0)
        return false;
      if (!this.users[inIndex])
        return false;
      var user = this.users[inIndex];
      this.$.name.setContent(user.userName);
      var groupsString = '';
      for (index in user.groups) {
        groupsString += user.groups[index] + ', ';
      }
      groupsString = groupsString.substring(0, groupsString.length - 2);
      this.$.info.setContent('groups: [' + groupsString + ']');
      return true;
    },
    selectUser : function(inSender, inEvent) {
      this.iSelected = inEvent.rowIndex;
      this.doSelectUser();
    },
    getSelectedUser : function(){
      if(this.iSelected>=0)
        return this.users[this.iSelected];
      return null;
    }
  });