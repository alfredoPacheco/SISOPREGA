enyo
	.kind(
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
	  },
	  get : function() {
		// Group the same quality to the same cut records.
		var result = [];
		for ( var i = 0; i < this.cortes.length; i++) {
		  if (!this.isGrouped(this.cortes[i].qualityId, result)) {
			var CorteGroup = this.groupByCorte(this.cortes[i]);
			result.push(CorteGroup);
		  }
		}
		return result;
	  },
	  groupByCorte : function(corte) {
		var groupResult = enyo.clone(corte);
		groupResult.heads = Number(groupResult.heads);
		groupResult.weight = Number(groupResult.weight);
		groupResult.pen_name = "";
		groupResult.barnyardId = null;
		groupResult.sequences = [];
		for ( var i = 0; i < this.cortes.length; i++) {
		  if (this.cortes[i].qualityId == corte.qualityId) {
			groupResult.heads += Number(this.cortes[i].heads);
			groupResult.weight += Number(this.cortes[i].weight);
			groupResult.pen_name += this.cortes[i].pen_name + ', ';
			groupResult.sequences.push(this.cortes[i].cutSeq);
		  }
		}
		groupResult.heads -= Number(corte.heads);
		groupResult.weight -= Number(corte.weight);
		var pen_name = groupResult.pen_name.substring(0,
			groupResult.pen_name.length - 2);
		groupResult.pen_name = pen_name;
		return groupResult;
	  },
	  getExpo : function() {
		var result = [];
		for ( var i = 0; i < this.cortesExpo.length; i++) {
		  if (!this.isGrouped(this.cortesExpo[i].qualityId, result)) {
			var CorteGroup = this.getGroupByCorteExpo(this.cortesExpo[i]);
			result.push(CorteGroup);
		  }
		}
		return result;
	  },
	  isGrouped : function(qualityId, array) {
		for ( var i = 0; i < array.length; i++) {
		  if (array[i].qualityId == qualityId) {
			return true;
		  }
		}
		return false;
	  },
	  getGroupByCorteExpo : function(corteExpo) {
		var groupResult = enyo.clone(corteExpo);
		groupResult.heads = Number(groupResult.heads);
		groupResult.weight = Number(groupResult.weight);
		groupResult.pen_name = null;
		groupResult.barnyardId = null;
		groupResult.sequences = [];
		for ( var i = 0; i < this.cortesExpo.length; i++) {
		  if (this.cortesExpo[i].qualityId == corteExpo.qualityId) {
			groupResult.heads += Number(this.cortesExpo[i].heads);
			groupResult.weight += Number(this.cortesExpo[i].weight);
			groupResult.sequences.push(this.cortesExpo[i].cutSeq);
		  }
		}
		groupResult.heads -= Number(corteExpo.heads);
		groupResult.weight -= Number(corteExpo.weight);
		return groupResult;
	  },
	  getExpoCortesByGrouppedItem : function(objGroup) {
		var result = [];
		for ( var i = 0; i < objGroup.recordIds.length; i++) {
		  for ( var j = 0; j < this.cortesExpo.length; j++) {
			if (this.cortesExpo[j].cutSeq == objGroup.recordIds[i]) {
			  result.push(this.cortesExpo[j]);
			}
		  }
		}
		return result;
	  },
	  remove : function(cutRecord) {

		for ( var i = 0; i < cutRecord.sequences.length; i++) {
		  for ( var j = 0; j < this.cortes.length; j++) {
			if (this.cortes[j].cutSeq == cutRecord.sequences[i]) {
			  this.cortes.splice(j, 1);
			  j--;
			}
		  }
		}

		// Restart Cortes Expo
		this.cortesExpo = enyo.clone(this.cortes);
	  },
	  removeExpo : function(index) {

		var objCorteExpoSelected = this.getExpo()[index];
		var arrCorteOriginal = cacheCorte.cortes;

		if (objCorteExpoSelected.recordIds) {
		  if (objCorteExpoSelected.recordIds.length == 1) {
			var recordId = objCorteExpoSelected.recordIds[0];
			for ( var i = 0; i < arrCorteOriginal.length; i++) {
			  if (arrCorteOriginal[i].cutSeq == recordId) {
				if (arrCorteOriginal[i].qualityId == objCorteExpoSelected.qualityId) {
				  cacheMan
					  .setMessage(
						  "",
						  "No value can be restored, because the current record is just like the original one.");
				  return false;
				}
			  }
			}
		  }

		  // create a record with each one of it's recordIds.
		  var recordsToSplit = objCorteExpoSelected.recordIds;

		  for ( var i = 0; i < recordsToSplit.length; i++) {
			for ( var j = 0; j < arrCorteOriginal.length; j++) {
			  for ( var x = 0; x < this.cortesExpo.length; x++) {
				if (recordsToSplit[i] == arrCorteOriginal[j].cutSeq
					&& this.cortesExpo[x].cutSeq == recordsToSplit[i]) {
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
			if (this.cortesExpo[j].qualityId == qualityId) {
			  if (!this.cortesExpo[j].recordIds) {
				this.cortesExpo[j].recordIds = [];
			  }
			  this.cortesExpo[j].recordIds.push(cutSeq);
			  summarized = true;
			}
		  }

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
			  this.cortesExpo[summarizeIn].pen_name += ", "
				  + this.cortes[i].pen_name;
			  this.cortesExpo[summarizeIn].heads = Number(this.cortesExpo[summarizeIn].heads)
				  + heads;
			  this.cortesExpo[summarizeIn].weight = Number(this.cortesExpo[summarizeIn].weight)
				  + weight;
			  if (!this.cortesExpo[summarizeIn].recordIds) {
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