enyo.kind(
  {
    name : "cache.corte",
    cortes : [],
    add : function(corteObj){
      this.cortes.push(corteObj);
    },
    get : function(){
      return this.cortes;
    },
    remove : function(index){
      this.cortes.splice(index, 1);
    },
    clear : function(){
      this.cortes = [];
    }
  });
var cacheCorte = new cache.corte();