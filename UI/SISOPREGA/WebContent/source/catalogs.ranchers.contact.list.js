enyo.kind(
  {
    name : "catalogs.ranchers.contact.list",
    kind : enyo.SlidingView,
    layoutKind : enyo.VFlexLayout,
    events :
      {
        "onSelect" : "",
        "onAddContact" : "",
      },
    iSelected : "",
    objRancher : null,
    components :
      [
        {
          kind : enyo.Scroller,
          name : "scrollProductList",
          flex : 1,
          className : "listBG",
          components :
            [
              {
                kind : enyo.VirtualRepeater,
                name : "productList",
                onSetupRow : "setupRow",
                onclick : "selectContact",
                components :
                  [
                    {
                      kind : "Divider"
                    },
                    {
                      kind : enyo.SwipeableItem,
                      onConfirm : "deleteContact",
                      tapHighlight : true,
                      components :
                        [
                          {
                            name : "contact_name",
                            style : "text-overflow: ellipsis; overflow: hidden;" + "white-space: nowrap;color:#FFF;",
                            content : ""
                          },
                          {
                            name : "contact_info",
                            style : "font-size: 0.85em;color:#999",
                            content : ""
                          },
                          {
                            kind : "BasicRichText",
                            name : "description",
                            style : "font-size: 0.75em;color:#DDD",
                            content : ""
                          } ]
                    } ]
              }, ]
        },
        {
          kind : "Toolbar",
          components :
            [
              {
                kind : "enyo.IconButton",
                flex : 1,
                icon : "images/menu-icon-new.png",
                onclick : "doAddContact"
              }, ]
        }, ],
    setList : function(objRancher) {
      this.objRancher = objRancher;
      this.updateList();
    },
    getGroupName : function(inIndex) {
      // get previous record
      var r0 = this.objRancher.contacts[inIndex - 1];
      // get (and memoized) first letter of last name
      if (r0) {
        r0.letter = r0.last_name.substr(0, 1).toUpperCase();
      }
      var a = r0 && r0.letter;
      // get record
      var r1 = this.objRancher.contacts[inIndex];
      r1.letter = r1.last_name.substr(0, 1).toUpperCase();
      var b = r1.letter;
      // new group if first letter of last name has changed
      return a != b ? b : null;

    },
    setupDivider : function(inIndex) {
      // use group divider at group transition, otherwise use item border for divider
      var group = this.getGroupName(inIndex);
      this.$.divider.setCaption(group);
      this.$.divider.canGenerate = Boolean(group);
    },
    setupRow : function(inSender, inIndex) {
      var objRan;
      if (this.objRancher != null) {
        if (objRan = this.objRancher.contacts[inIndex]) {
          this.setupDivider(inIndex);
          this.$.contact_name.setContent(objRan.last_name + ', ' + objRan.first_name);
          this.$.contact_info.setContent(objRan.phone_number);
          return true;
        }
      }
    },
    deleteContact : function(inSender, inIndex) {
      return cacheRanchers.deleteContact(this.objRancher, this.objRancher.contacts[inIndex], this, "updateList");
    },
    updateList : function() {
      if (this.objRancher != null) {
        var arrContactsAux = cacheRanchers.getContacts(this.objRancher);
        if (arrContactsAux.length > 0) {
          this.objRancher.contacts.sort(function(inA, inB) {
            return
              [ inA.last_name.toLowerCase() ] <
              [ inB.last_name.toLowerCase() ] ? -1 : 1;
          });
        }
      }
      this.$.productList.render();
    },
    selectContact : function(inSender, inEvent) {
      this.iSelected = inEvent.rowIndex;
      this.doSelect();
    },
    getContact : function() {
      return this.objRancher.contacts[this.iSelected];
    }
  });