/** 
 * Provides a data interface for users list administration. 
 * 
 * Revision History:  
 * - 02/05/2013 By Diego Torres: Initial Version.
 *  
 * */
enyo.kind(
  {
    name : "cache.users",
    arrUsers : [],
    get : function() {
      this.arrUsers = consumingGateway.ReadAllUsers();
      return this.arrUsers;
    },
    addGroup : function(userName, groupName){
      return consumingGateway.AddGroup(userName, groupName);
    },
    removeGroup : function(userName, groupName){
      return consumingGateway.RemoveGroup(userName, groupName);
    },
    resetPassword : function(userName, password){
      return consumingGateway.ResetPassword(userName, password);
    },
    createUser : function (objUser){
      return consumingGateway.AddUser(objUser)=='OK';
    },
    deleteUser : function (objUser, cbObj, cbMethod){
      var deleted = consumingGateway.RemoveUser(objUser.user_name)=='OK';
      if(deleted && cbMethod)
        cbObj[cbMethod]();
      return deleted;
    }
  });
var cacheUsers = new cache.users();