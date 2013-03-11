/**
 * Provides a list handler for rancher users.
 * 
 * Revision History: 
 * - [DATE] By Alan del Rio: Initial Version. 
 * - [DATE] By Alfredo Pacheco: Integrate with web services. 
 * - 02/03/2013 By Diego Torres: Add rancher user handlers.
 * 
 */
enyo.kind(
  {
    name : "catalogs.ranchers.users.list",
    kind : enyo.SlidingView,
    layoutKind : enyo.VFlexLayout,
    events :
      {
        "onSelect" : "",
        "onAddUser" : ""
      },
    iSelected : "",
    objRancher : null,
    components : [{
      kind : enyo.Scroller,
      name : "scrollUsersList",
      flex : 1,
      className : "listBG",
      components :[{
        kind : enyo.VirtualRepeater,
        name : "usersList",
        onSetupRow : "setupRow",
        onclick : "selectUser", 
        components:[{
          kind : enyo.SwipeableItem,
          onConfirm : "deleteUser",
          tapHighlight : true,
          components : [{
            name : "user_title",
            style : "text-overflow: ellipsis; overflow: hidden;" + "white-space: nowrap;color:#000;"
          }]
        }]
      }]
    }, {
      kind : "Toolbar",
      components : [{
        kind : "enyo.IconButton",
        flex : 1,
        icon : "images/menu-icon-new.png",
        onclick : "doAddUser"
      }, ]
    }],
    setList : function(objRancher) {
      this.objRancher = objRancher;
      this.updateList();
    },
    setupRow : function(inSender, inIndex) {
      var objUser;
      if (this.objRancher != null) {
        if (objUser = this.objRancher.users[inIndex]) {
          this.$.user_title.setContent(objUser.user_name);
          return true;
        }
      }
    },
    deleteUser : function(inSender, inIndex) {
      return cacheRanchers.deleteRancherUser(this.objRancher, this.objRancher.users[inIndex], this, "updateList");
    },
    updateList : function() {
      if (this.objRancher != null) {
        var arUsersAux = cacheRanchers.getRancherUsers(this.objRancher);
        if (arUsersAux.length > 0) {
          this.objRancher.users.sort(function(inA, inB) {
            return
              [ inA.user_name.toLowerCase() ] <=
              [ inB.user_name.toLowerCase() ] ? -1 : 1;
          });
        }
      }
      this.$.usersList.render();
    },
    selectUser : function(inSender, inEvent) {
      this.iSelected = inEvent.rowIndex;
      if(this.iSelected){
    	  this.doSelect();  
      }
      
    },
    getUser : function() {
      return this.objRancher.users[this.iSelected];
    }
  });