enyo.kind(
  {
    name : "cache.corte",
    cortes : [],
    cortesExpo : [],
    selectedRancherId: -1,
    selectedRancherName : "",
    selectedCattleType : "",
    add : function(corteObj) {
      corteObj.rancherId = this.selectedRancherId;
      corteObj.rancherName = this.selectedRancherName;
      corteObj.cattleType = this.selectedCattleType;
      this.cortes.push(corteObj);

      // Summarize for exporter
      this.corteNaturalSummarization();
    },
    get : function() {
      return this.cortes;
    },
    getExpo : function() {
      return this.cortesExpo;
    },
    remove : function(index) {
      var removedRecord = this.cortes[index];

      // Recalculate summary for exporter
      for ( var i = 0; i < this.cortesExpo.length; i++) {
        var removeIndex = -1;
        for ( var j = 0; j < this.cortesExpo[i].recordIds.length; j++) {
          if (this.cortesExpo[i].recordIds[j] == index) {
            removeIndex = j;
          }
          if (removeIndex > -1)
            break;
        }

        if (removeIndex > -1) {
          this.cortesExpo[i].heads -= removedRecord.heads;
          this.cortesExpo[i].weight -= removedRecord.weight;
          this.cortesExpo[i].recordIds.splice(removeIndex, 1);
          
          if(this.cortesExpo[i].recordIds.length <= 0)
            this.cortesExpo.splice(i, 1);
          
          break;
        }
        
      }

      this.cortes.splice(index, 1);

    },
    removeExpo : function(index) {

      if (this.cortesExpo[index].recordIds.length == 1) {
        var recordId = this.cortesExpo[index].recordIds[0];
        if (this.cortes[recordId].cattleClassId == this.cortesExpo[index].cattleClassId) {
          alert('El registro es igual al registro original, ningun valor puede ser reiniciado');
          return false;
        }
      }

      // create a record with each one of it's recordIds.
      var recordsToSplit = this.cortesExpo[index].recordIds;
      this.cortesExpo.splice(index, 1);

      for ( var i = 0; i < recordsToSplit.length; i++) {
        var recordIds = [];
        var recordId = recordsToSplit[i];
        recordIds.push(recordId);
        var cutRecord =
          {
            pen_id : this.cortes[recordId].pen_id,
            pen_name : this.cortes[recordId].pen_name,
            cattleClassId : this.cortes[recordId].cattleClassId,
            cattleClassName : this.cortes[recordId].cattleClassName,
            heads : this.cortes[recordId].heads,
            weight : this.cortes[recordId].weight,
            recordIds : recordIds
          };

        this.cortesExpo.push(cutRecord);
      }
    },
    clear : function() {
      this.cortes = [];
      this.cortesExpo = [];
    },
    corteNaturalSummarization : function() {
      for ( var i = 0; i < this.cortes.length; i++) {

        var recordIds = [];
        recordIds.push(i);

        var cattleClassId = this.cortes[i].cattleClassId;
        var heads = Number(this.cortes[i].heads);
        var weight = Number(this.cortes[i].weight);

        var summarized = false;

        for ( var j = 0; j < this.cortesExpo.length; j++) {
          for ( var k = 0; k < this.cortesExpo[j].recordIds.length; k++) {
            summarized = this.cortesExpo[j].recordIds[k] == i;

            if (summarized)
              break;
          }

          if (summarized)
            break;
        }

        if (!summarized) { // not summarized yet

          // find a record where it can be summarized
          var summarizeIn = -1;
          for ( var summarizeInIndex = 0; summarizeInIndex < this.cortesExpo.length; summarizeInIndex++) {
            if (this.cortesExpo[summarizeInIndex].cattleClassId == cattleClassId) {
              summarizeIn = summarizeInIndex;
              break;
            }
          }

          if (summarizeIn > -1) {
            // a record was found to summarize in
            this.cortesExpo[summarizeIn].pen_name += ", " + this.cortes[i].pen_name;
            this.cortesExpo[summarizeIn].heads = Number(this.cortesExpo[summarizeIn].heads) + heads;
            this.cortesExpo[summarizeIn].weight = Number(this.cortesExpo[summarizeIn].weight) + weight;
            this.cortesExpo[summarizeIn].recordIds.push(i);
          } else {

            // no record was found, create one.
            var cutRecord =
              {
                pen_id : this.cortes[i].pen_id,
                pen_name : this.cortes[i].pen_name,
                cattleClassId : this.cortes[i].cattleClassId,
                cattleClassName : this.cortes[i].cattleClassName,
                heads : heads,
                weight : weight,
                recordIds : recordIds
              };

            this.cortesExpo.push(cutRecord);

          } // if summarizeIn
        } // if summarized
      } // for each corte
    }
  });
var cacheCorte = new cache.corte();