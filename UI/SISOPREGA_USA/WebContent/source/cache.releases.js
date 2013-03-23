enyo.kind(
  {
    name : "cache.releases",
    loadReleases : function(rancherId) {
      var result = [];

      // TODO: Retrieve from read web services
      var mocks = 10;
      for ( var i = 0; i < mocks; i++) {
        var mockCattleType = Math.floor((Math.random() * 3) + 1);
        var mockCattleName = 'Novillos';
        switch (mockCattleType) {
        case 1:
          mockCattleName = "Novillos";
          break;
        case 2:
          mockCattleName = "Vaquillas";
          break;
        case 3:
          mockCattleName = "Caballos";
          break;
        default:
          mockCattleName = "Novillos";
          mockCattleType = 1;
        }
        
        var mockHeads = Math.floor((Math.random() * 350) + 150);
        var mockWeight = Math.floor((Math.random()*450)+100) * mockHeads;
        
        var mockObj =
          {
            recordId : i,
            cattleType : mockCattleType,
            cattleName : mockCattleName,
            heads : mockHeads,
            weight: mockWeight,
            rejectsWeight : Math.floor((Math.random() * 350) + 150)
          };

        result.push(mockObj);
      }

      return result;
    }
  });
var releasesCache = new cache.releases();
