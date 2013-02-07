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
    }
  });
var cacheUsers = new cache.users();