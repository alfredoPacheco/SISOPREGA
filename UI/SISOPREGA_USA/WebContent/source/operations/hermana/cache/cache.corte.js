enyo.kind(
  {
    name : "cache.corte",
    cortes : [],
    cortesExpo : [],
    selectedRancherId : -1,
    selectedRancherName : "",
    selectedCattleType : "",
    secuencia : 0,
    add : function(corteObj) {
      corteObj.rancherId = this.selectedRancherId;
      corteObj.rancherName = this.selectedRancherName;
      corteObj.cattleType = this.selectedCattleType;
      corteObj.cutSeq = this.secuencia++;
      this.cortes.push(corteObj);
      this.cortesExpo.push(enyo.clone(corteObj));
      
      // Summarize for exporter
      //this.corteNaturalSummarization();
    },
    get : function() {
      return this.cortes;
    },
    getExpo : function() {
      var grouping = {};
      var result = [];
      var sort=0;
      for(var i=0;i<this.cortesExpo.length;i++){
    	var objCorte = this.cortesExpo[i];
    	if(grouping.hasOwnProperty(objCorte.qualityId)){
    	  grouping[objCorte.qualityId].heads += Number(objCorte.heads);
    	  grouping[objCorte.qualityId].weight += Number(objCorte.weight);    	  
    	  grouping[objCorte.qualityId].recordIds.push(objCorte.cutSeq);
    	  grouping[objCorte.qualityId].sort = sort++;
    	}else{
    	  grouping[objCorte.qualityId]={
    		  cattleClassName: objCorte.cattleClassName,
    		  recordIds:[objCorte.cutSeq], 
    		  heads: Number(objCorte.heads), 
    		  qualityId: Number(objCorte.qualityId),
    		  weight: Number(objCorte.weight),
    		  sort:sort++
    	  };
    	  if(objCorte.hasOwnProperty("identifier"))
    		grouping[objCorte.qualityId].identifier = objCorte.identifier;
    	}
      }
      
      for(obj in grouping){
    	if(grouping.hasOwnProperty(obj)){
    	  result.push(grouping[obj]);
    	}
      }
      result.sort(function(a,b){return a.sort > b.sort;});
      return result;
    },
    getExpoCortesByGrouppedItem:function(objGroup){
      var result = [];
      for(var i=0;i<objGroup.recordIds.length;i++){
    	for(var j=0;j<this.cortesExpo.length;j++){
    	  if(this.cortesExpo[j].cutSeq == objGroup.recordIds[i]){
    		result.push(this.cortesExpo[j]);
    	  }
    	}
      }
      return result;
    },
    remove : function(index) {
      var removedRecord = this.cortes[index];
      
      // Recalculate summary for exporter
      for ( var i = 0; i < this.cortesExpo.length; i++) {
        var removeIndex = -1;
        if (this.cortesExpo[i].recordIds) {
          for ( var j = 0; j < this.cortesExpo[i].recordIds.length; j++) {
            if (this.cortesExpo[i].recordIds[j] == index) {
              removeIndex = j;
            }
            if (removeIndex > -1) break;
          }
        }
        
        if (removeIndex > -1) {
          this.cortesExpo[i].heads -= removedRecord.heads;
          this.cortesExpo[i].weight -= removedRecord.weight;
          this.cortesExpo[i].recordIds.splice(removeIndex, 1);
          
          if (this.cortesExpo[i].recordIds.length <= 0) this.cortesExpo.splice(i, 1);
          
          break;
        }
        
      }
      
      this.cortes.splice(index, 1);
      
    },
    removeExpo : function(index) {
      
      var objCorteExpoSelected = this.getExpo()[index]; 
      var arrCorteOriginal = cacheCorte.cortes;
      
      
      if (objCorteExpoSelected.recordIds) {
        if (objCorteExpoSelected.recordIds.length == 1) {
          var recordId = objCorteExpoSelected.recordIds[0];
          for(var i=0;i<arrCorteOriginal.length;i++){
        	if(arrCorteOriginal[i].cutSeq == recordId){
        	  if(arrCorteOriginal[i].qualityId == objCorteExpoSelected.qualityId){
                cacheMan.setMessage("", "El registro es igual al registro original, ningun valor puede ser reiniciado");
                return false;
              }
        	}
          }
        }
        
        // create a record with each one of it's recordIds.
        var recordsToSplit = objCorteExpoSelected.recordIds;
        
        for ( var i = 0; i < recordsToSplit.length; i++) {
          for(var j=0;j<arrCorteOriginal.length;j++){
        	for(var x=0;x<this.cortesExpo.length;x++){
        	  if(recordsToSplit[i] == arrCorteOriginal[j].cutSeq && this.cortesExpo[x].cutSeq == recordsToSplit[i]){
        		this.cortesExpo[x].qualityId = arrCorteOriginal[j].qualityId;
        		this.cortesExpo[x].cattleClassName = arrCorteOriginal[j].cattleClassName;
        	  }  
        	}
          }
        }
      }
      
      
    },
    clear : function() {
      this.cortes = [];
      this.cortesExpo = [];
    },
    corteNaturalSummarization : function() {
      for ( var i = 0; i < this.cortes.length; i++) {
        
        var qualityId = this.cortes[i].qualityId;
        var cutSeq = this.cortes[i].cutSeq;
        var heads = Number(this.cortes[i].heads);
        var weight = Number(this.cortes[i].weight);
        
        var recordIds = [];
        recordIds.push(cutSeq);
        
        var summarized = false;
        
        for ( var j = 0; j < this.cortesExpo.length; j++) {
          if(this.cortesExpo[j].qualityId == qualityId){
        	if(!this.cortesExpo[j].recordIds){
        	  	this.cortesExpo[j].recordIds = [];
        	}
        	this.cortesExpo[j].recordIds.push(cutSeq);
        	summarized = true;
          }
        }
          
        
        
          
//          
//          if (this.cortesExpo[j].recordIds) {
//            for ( var k = 0; k < this.cortesExpo[j].recordIds.length; k++) {
//              summarized = this.cortesExpo[j].recordIds[k] == i;
//              
//              if (summarized) break;
//            }
//          }
//          
//          if (summarized) break;
//        }
        
        if (!summarized) { // not summarized yet
        
          // find a record where it can be summarized
          var summarizeIn = -1;
          for ( var summarizeInIndex = 0; summarizeInIndex < this.cortesExpo.length; summarizeInIndex++) {
            if (this.cortesExpo[summarizeInIndex].qualityId == qualityId) {
              summarizeIn = summarizeInIndex;
              break;
            }
          }
          
          if (summarizeIn > -1) {
            // a record was found to summarize in
            this.cortesExpo[summarizeIn].pen_name += ", " + this.cortes[i].pen_name;
            this.cortesExpo[summarizeIn].heads = Number(this.cortesExpo[summarizeIn].heads) + heads;
            this.cortesExpo[summarizeIn].weight = Number(this.cortesExpo[summarizeIn].weight) + weight;
            if(!this.cortesExpo[summarizeIn].recordIds){
              this.cortesExpo[summarizeIn].recordIds = [];
            }
            this.cortesExpo[summarizeIn].recordIds.push(i);
          } else {
            
            // no record was found, create one.
            var cutRecord =
              {
                barnyardId : this.cortes[i].barnyardId,
                pen_name : this.cortes[i].pen_name,
                qualityId : this.cortes[i].qualityId,
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