enyo.kind(
  {
    name : "cache.releases",
    mockReleases : [],
    loadReleases : function(rancherId, cattleType) {
      var result = [];

      // TODO: Retrieve from read web services
      if(this.mockReleases.length > 0){
        if(cattleType){
          for(var i in this.mockReleases){
            if(cattleType == this.mockReleases[i].cattleType){
              result.push(this.mockReleases[i]);
            }
          }
          return result;
        }else{
          return this.mockReleases;
        }
      }
      
      var mocks = 12;
      for ( var i = 0; i < mocks; i++) {
        var mockCattleType = Math.floor((Math.random() * 4) + 1);
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
        var mockRejects = Math.floor(Math.random()*5);
        var mockRejectsWeight = Math.floor((Math.random()*450)+100) * mockRejects;
        
        var mockObj =
          {
            recordId : i,
            cattleType : mockCattleType,
            cattleName : mockCattleName,
            heads : mockHeads,
            weight: mockWeight,
            rejects : mockRejects,
            rejectsWeight : mockRejectsWeight
          };

        // If filtering by cattleType
        if(cattleType && cattleType == mockObj.cattleType){
          result.push(mockObj);
          this.mockReleases.push(mockObj);
        }else{
          result.push(mockObj);
          this.mockReleases.push(mockObj);
        }
      }

      return result;
    },
    getReleaseById : function(releaseId){
      
      // TODO: Retrieve from web service
      for(var mockIdx=0; mockIdx < this.mockReleases.length; mockIdx++){
        if(this.mockReleases[mockIdx].recordId == releaseId)
          return this.mockReleases[mockIdx];
      }
    },
    updateRejectsWeight : function(releaseId, weight){
      for(var mockIdx=0; mockIdx < this.mockReleases.length; mockIdx++){
        if(this.mockReleases[mockIdx].recordId == releaseId){
          this.mockReleases[mockIdx].rejectsWeight = weight;
          return true;
        }
      }
      return false;
    }
  });
var releasesCache = new cache.releases();
