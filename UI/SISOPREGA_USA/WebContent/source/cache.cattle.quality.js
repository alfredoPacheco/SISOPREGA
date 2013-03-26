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
    get : function() {
      // TODO: Retrieve from database
      this.arrClasses = [];
      var cattle_types =
        [ 1, 2 ];
      this.arrClasses.push(this.internalMock(1, "Swiss 200's", cattle_types, 0.0, 270));
      this.arrClasses.push(this.internalMock(2, "Swiss 300's", cattle_types, 271, 370));
      this.arrClasses.push(this.internalMock(3, "Swiss 400's", cattle_types, 371, 470));
      this.arrClasses.push(this.internalMock(4, "Swiss 500's", cattle_types, 471, 570));
      this.arrClasses.push(this.internalMock(5, "Swiss 600's", cattle_types, 571, 670));
      this.arrClasses.push(this.internalMock(6, "Swiss 700's", cattle_types, 671, 770));
      this.arrClasses.push(this.internalMock(7, "Swiss 800's", cattle_types, 771, 870));
      this.arrClasses.push(this.internalMock(8, "Swiss 900's", cattle_types, 871, 0));
      this.arrClasses.push(this.internalMock(9, "Sinaloas 100's", cattle_types, 0.0, 170));
      this.arrClasses.push(this.internalMock(10, "Sinaloas 200's", cattle_types, 171, 270));
      this.arrClasses.push(this.internalMock(11, "Sinaloas 300's", cattle_types, 271, 0));
      this.arrClasses.push(this.internalMock(12, "Plain 100's", cattle_types, 0.0, 0.0));
      this.arrClasses.push(this.internalMock(13, "Horses", [3], 0.0, 0.0));
    },
    getList : function(cattleType) {
      var result = [];
      this.get();
      for ( var cattleIndex = 0; cattleIndex < this.arrClasses.length; cattleIndex++) {
        // Add to list if compatible.
        if (this.inClass(cattleType, this.arrClasses[cattleIndex])) {
          var record =
            {
              caption : this.arrClasses[cattleIndex].name,
              value : this.arrClasses[cattleIndex].id
            };
          result.push(record);
        }
      }
      return result;
    },
    inClass : function(cattleType, cattleClass) {

      if (!cattleType)
        return true;

      for ( var i = 0; i < cattleClass.cattle_types.length; i++) {
        if (cattleClass.cattle_types[i] == cattleType)
          return true; // cattle type found as compatible in cattleClass
      }

      return false; // cattle type not found as compatible in cattleClass
    }
  });
var cacheClasses = new cache.cattle.quality();
