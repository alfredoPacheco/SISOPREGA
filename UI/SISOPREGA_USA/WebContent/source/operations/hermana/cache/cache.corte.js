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
		groupResult.heads = utils.parseToNumber(groupResult.heads);
		groupResult.weight = utils.parseToNumber(groupResult.weight);
		groupResult.pen_name = "";
		groupResult.barnyardId = null;
		groupResult.sequences = [];
		for ( var i = 0; i < this.cortes.length; i++) {
		  if (this.cortes[i].qualityId == corte.qualityId) {
			groupResult.heads += utils.parseToNumber(this.cortes[i].heads);
			groupResult.weight += utils.parseToNumber(this.cortes[i].weight);
			groupResult.pen_name += this.cortes[i].pen_name + ', ';
			groupResult.sequences.push(this.cortes[i].cutSeq);
		  }
		}
		groupResult.heads -= utils.parseToNumber(corte.heads);
		groupResult.weight -= utils.parseToNumber(corte.weight);
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
		groupResult.heads = utils.parseToNumber(groupResult.heads);
		groupResult.weight = utils.parseToNumber(groupResult.weight);
		groupResult.pen_name = null;
		groupResult.barnyardId = null;
		groupResult.sequences = [];
		for ( var i = 0; i < this.cortesExpo.length; i++) {
		  if (this.cortesExpo[i].qualityId == corteExpo.qualityId) {
			groupResult.heads += utils.parseToNumber(this.cortesExpo[i].heads);
			groupResult.weight += utils
				.parseToNumber(this.cortesExpo[i].weight);
			groupResult.sequences.push(this.cortesExpo[i].cutSeq);
		  }
		}
		groupResult.heads -= utils.parseToNumber(corteExpo.heads);
		groupResult.weight -= utils.parseToNumber(corteExpo.weight);
		return groupResult;
	  },
	  getExpoCortesByGrouppedItem : function(objGroup) {
		var result = [];
		for ( var i = 0; i < objGroup.sequences.length; i++) {
		  for ( var j = 0; j < this.cortesExpo.length; j++) {
			if (this.cortesExpo[j].cutSeq == objGroup.sequences[i]) {
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
	  getExpoBySeqNQuality : function(seq, qualityId) {
		for ( var i = 0; i < this.cortesExpo.length; i++) {
		  if (this.cortesExpo[i].cutSeq == seq
			  && this.cortesExpo[i].qualityId == qualityId) {
			return this.cortesExpo[i];
		  }
		}
		return null;
	  },
	  simplifyCortesExpo : function() {
		var newArray = [];
		for ( var i = 0; i < this.cortesExpo.length; i++) {
		  var expoCut = enyo.clone(this.cortesExpo[i]);

		  // Find out if new array already contains sequence/quality record
		  var simplified = false;
		  for ( var j = 0; j < newArray.length; j++) {
			if (newArray[j].cutSeq == expoCut.cutSeq
				&& newArray[j].qualityId == expoCut.qualityId) {
			  simplified = true;
			  break;
			}
		  }

		  if (!simplified) {
			// simplify
			for ( var j = 0; j < this.cortesExpo.length; j++) {
			  if (this.cortesExpo[j].cutSeq == expoCut.cutSeq
				  && this.cortesExpo[j].qualityId == expoCut.qualityId) {
				expoCut.heads = utils.parseToNumber(expoCut.heads)
					+ utils.parseToNumber(this.cortesExpo[j].heads);
				expoCut.weight = utils.parseToNumber(expoCut.weight)
					+ utils.parseToNumber(this.cortesExpo[j].weight);
			  }
			}
			expoCut.heads -= utils.parseToNumber(this.cortesExpo[i].heads);
			expoCut.weight -= utils.parseToNumber(this.cortesExpo[i].weight);
			newArray.push(expoCut);
		  }
		}

		// Remove 0 heads records
		for ( var i = 0; i < newArray.length; i++) {
		  if (newArray[i].heads == 0) {
			newArray.splice(i, 1);
			i--;
		  }
		}

		this.cortesExpo = enyo.clone(newArray);
	  },
	  removeExpo : function(cutRemove) {

		// Restore the splitted record.
		for ( var i = 0; i < cutRemove.sequences.length; i++) {
		  var corteExpo = this.getExpoBySeqNQuality(cutRemove.sequences[i],
			  cutRemove.qualityId);
		  var qualityId = -1;
		  var cattleClassName = "";
		  // Find and set original qualityId
		  for ( var j = 0; j < this.cortes.length; j++) {
			if (this.cortes[j].cutSeq == cutRemove.sequences[i]) {
			  qualityId = this.cortes[j].qualityId;
			  cattleClassName = this.cortes[j].cattleClassName;
			  break;
			}
		  }
		  corteExpo.qualityId = qualityId;
		  corteExpo.cattleClassName = cattleClassName;
		}

		this.simplifyCortesExpo();
	  },
	  clear : function() {
		this.cortes = [];
		this.cortesExpo = [];
	  },
	  corteNaturalSummarization : function() {
		for ( var i = 0; i < this.cortes.length; i++) {

		  var qualityId = this.cortes[i].qualityId;
		  var cutSeq = this.cortes[i].cutSeq;
		  var heads = utils.parseToNumber(this.cortes[i].heads);
		  var weight = utils.parseToNumber(this.cortes[i].weight);

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
			  this.cortesExpo[summarizeIn].heads = utils
				  .parseToNumber(this.cortesExpo[summarizeIn].heads)
				  + heads;
			  this.cortesExpo[summarizeIn].weight = utils
				  .parseToNumber(this.cortesExpo[summarizeIn].weight)
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
	  },
	  getCorteByCutSeq : function(iCutSeq) {
		for ( var i = 0; i < this.cortes.length; i++) {
		  if (this.cortes[i].cutSeq == iCutSeq) {
			return this.cortes[i];
		  }
		}
		return null;
	  }
	});
var cacheCorte = new cache.corte();