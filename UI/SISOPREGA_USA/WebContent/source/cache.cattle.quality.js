/**
 * Handles cattle classes, also known as quality of the cattle. 
 */
enyo.kind(
  {
    name : "cache.cattle.quality",
    arrClasses : [],
    internalMock : function(id, name, cattle_types, min, max) {
      var result =
        {
          id : id,
          name : name,
          cattle_types : cattle_types,
          min_weight : min,
          max_weight : max
        };
      return result;
    },
    toInternal : function(objCattleQuality) {
      var result =
        {
          id : objCattleQuality.qualityId,
          name : objCattleQuality.qualityName,
          min_weight : objCattleQuality.minWeight,
          max_weight : objCattleQuality.maxWeight,
          is_for_horses : objCattleQuality.forHorses == 'true'
        };
      return result;
    },
    get : function() {
      this.arrClasses = [];
      var readGateway = consumingGateway.Read("CattleQuality", {});
      var self = this;

      if (readGateway.exceptionId == 0) {
        jQuery.each(readGateway.records, function() {
          var objTmp = {};
          var objAux = {};
          jQuery.each(this, function(key, value) {
            objAux[key] = value;
          });
          objTmp = self.toInternal(objAux);
          self.arrClasses.push(objTmp);
        });
      } else {
        if (readGateway.exceptionId != "DB02" && readGateway.exceptionId != "VAL02") {
          cacheMan.setMessage("", "[Exception ID: " + readGateway.exceptionId + "] Descripción: " + readGateway.exceptionDescription);
        }
      }

      return this.arrClasses;
    },
    getByID : function(id) {
      this.get();
      var len = this.arrClasses.length;
      for ( var i = 0; i < len; i++) {
        if (parseInt(id) == parseInt(this.arrClasses[i].id)) {
          return this.arrClasses[i];
        }
      }
      return null;
    },
    getList : function(cattleType) {
      var result = [];
      this.get();
      var horsesValue = 3;
      for ( var cattleIndex = 0; cattleIndex < this.arrClasses.length; cattleIndex++) {
        // Add to list if compatible.
        var record =
          {
            caption : this.arrClasses[cattleIndex].name,
            value : this.arrClasses[cattleIndex].id
          };
        
        if(cattleType == horsesValue){
          if(this.arrClasses[cattleIndex].is_for_horses)
            result.push(record);
        } else {
          result.push(record);
        }
      }
      return result;
    },
    add : function(aClass) {
      // TODO: Add to database
      this.arrClasses.push(aClass);
    }
  });
var cacheClasses = new cache.cattle.quality();
