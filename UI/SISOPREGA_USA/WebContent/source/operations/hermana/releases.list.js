enyo
	.kind(
	{
	  name : "releases.list",
	  kind : enyo.VFlexBox,
	  style : "background-color:#DABD8B;font-size:15px;",
	  rancher_id : "",
	  rancher_name : "",
	  releases : [],
	  selectedCattleType : 0,
	  selectedCattleName : "",
	  selectedReleases : 0,
	  selectedReceptions : [],
	  events :
	  {
		onCancel : "",
		onResolveSelected : ""
	  },
	  components : [

		  {
			kind : "Toolbar",
			components : [
			{
			  kind : "VFlexBox",
			  name : "title",
			  content : "Lotes inspeccionados del exportador: {EXPORTADOR SELECCIONADO}",
			  flex : 1,
			  onclick : "doSelect",
			  style : "padding:0px;color:white;font-size:15px;"
			} ]
		  },

		  {// HEADER:
			kind : "HFlexBox",
			className : "listFirst",
			style : "font-size:13px;background-color:#DABD8B;border-bottom-style: solid;border-bottom-color: #482400;",
			height : "30px",
			align : "center",
			pack : "start",
			name : "header",
			components : [
			{
			  content : "Ganado",
			  style : "width:150px;text-align:left;margin-left:20px;"
			},
			{
			  content : "Cabezas",
			  style : "width:100px;text-align:right;"
			},
			{
			  content : "Rechazos",
			  style : "width:150px;text-align:right;"
			},
			{
			  content : "Peso de Rechazos",
			  style : "width:200px;text-align:right;"
			} ]
		  },

		  {
			kind : enyo.Scroller,
			name : "releasesScroller",
			flex : 1,
			style : "background-color: #482400;",
			autoHorizontal : false,
			horizontal : false,
			components : [
			{
			  kind : enyo.VirtualRepeater,
			  name : "releasesList",
			  onSetupRow : "setupReleaseRow",
			  onclick : "selectRelease",
			  // style : "background-color:#F3DEBA;",
			  components : [
			  {
				kind : enyo.RowItem,
				layoutKind : enyo.HFlexLayout,
				// style : "font-size:13px;",
				// tapHighlight : true,
				align : "center",
				pack : "start",
				height : "40px",
				className : "listBG",
				style : "padding:0px;font-size:13px;",
				components : [
					{
					  name : "cattle",
					  style : "width:150px;text-align:left;color:#5F0712;margin-left:20px;"
					},
					{
					  name : "heads",
					  style : "width:100px;text-align:right;color:#5F0712"
					},
					{
					  name : "rejects",
					  style : "width:150px;text-align:right;color:#5F0712"
					},
					{
					  name : "rejectsWeight",
					  style : "width:230px;color:#5F0712;margin-left:80px;",
					  kind : "release.rejects.weight"
					} ]
			  } ]
			} ]
		  },

		  {
			kind : enyo.VFlexBox,
			style : "padding:20px;border-top-style: solid;border-top-color:#482400",
			pack : "center",
			components : [
			{
			  kind : enyo.HFlexBox,
			  align : "center",
			  height : "40px;",
			  style : "font-size:14px;",
			  components : [
			  {
				kind : enyo.Spacer
			  },
			  {
				kind : enyo.Button,
				caption : "Cortar Selección",
				onclick : "setupCutSelection",
				style : "background-color: #DABD8B;"
			  },
			  {
				kind : enyo.Button,
				caption : "Cacelar",
				onclick : "doCancel",
				style : "background-color: #DABD8B;"
			  } ]
			} ]
		  },

	  ],
	  setRancher : function(rancherId, rancherName) {
		cacheMan.showScrim();
		this.rancher_id = rancherId;
		this.rancher_name = rancherName;
		this.$.title.content = "Lotes inspeccionados del exportador: "
			+ rancherName;
		crudReleased.get(this, "readCallBack");
	  },
	  readCallBack : function() {
		this.loadReleases();
	  },
	  filterReleases : function(cattleType) {
		this.releases = [];
		for ( var i = 0; i < crudReleased.arrObj.length; i++) {
		  var releasedRecord = crudReleased.arrObj[i];
		  if (releasedRecord.rancherId == this.rancher_id) {
			if (cattleType) {
			  if (releasedRecord.cattleType == cattleType)
				this.releases.push(releasedRecord);
			} else {
			  this.releases.push(releasedRecord);
			}
		  }
		}
	  },
	  loadReleases : function(cattleType) {
		this.filterReleases(cattleType);
		if (this.releases.length > 0) {
		  this.$.releasesList.render();
		  cacheMan.hideScrim();
		} else {
		  cacheMan.hideScrim();
		  cacheMan
			  .setMessage("",
				  'No hay inspecciones liberadas para este exportador, intente más tarde.');
		}
	  },
	  setupReleaseRow : function(inSender, inIndex) {
		var objRelease = this.releases[inIndex];
		if (objRelease) {
		  this.$.cattle.setContent(objRelease.cattleName);
		  this.$.heads.setContent(objRelease.heads);
		  this.$.rejects.setContent(objRelease.rejects_heads);
		  if(objRelease.rejects_heads == 0){
			this.$.rejectsWeight.hideEditors();
		  }else{
			this.$.rejectsWeight.setWeight(objRelease.rejects_weight);
			this.$.rejectsWeight.setRejectedRecord(objRelease.receptionId);
		  }
		  
		  this.$.rejectsWeight.cancelSelection = true;
		  this.$.rejectsWeight.listIndex = inIndex;

		  // If filtered with this record as selected
		  if (this.selectedReceptions.length > 0
			  && this.selectedReceptions[0].receptionId == objRelease.receptionId)
			this.$.rejectsWeight.setSelected(true);

		  return true;
		}
		return false;
	  },
	  selectRelease : function(inSender, inEvent) {
		if (this.selectedCattleType == 0 && !this.$.rejectsWeight.isSelected()) {
		  this.selectedCattleType = this.releases[inEvent.rowIndex].cattleType;
		  this.selectedCattleName = this.releases[inEvent.rowIndex].cattleName;
		  this.selectedReceptions = [];
		  this.selectedReceptions.push(this.releases[inEvent.rowIndex]);
		  // Filter list
		  this.loadReleases(this.selectedCattleType);
		  this.$.rejectsWeight.setSelected(true);
		  return true;
		}
		if (this.selectedCattleType != this.releases[inEvent.rowIndex].cattleType
			&& !this.$.rejectsWeight.isSelected()) {
		  cacheMan
			  .setMessage(
				  "",
				  'No se pueden seleccionar dos tipos de ganado diferente, previamente usted ha seleccionado '
					  + this.selectedCattleName);
		  return false;
		}

		this.$.rejectsWeight.setSelected(!this.$.rejectsWeight.isSelected());

		if (this.$.rejectsWeight.isSelected()) {
		  this.selectedReceptions
			  .push(this.releases[inEvent.rowIndex].receptionId);
		} else {
		  for ( var i = 0; i < this.selectedReceptions.length; i++) {
			if (this.selectedReceptions[i].receptionId == this.releases[inEvent.rowIndex].receptionId) {
			  this.selectedReceptions.splice(i, 1);
			  break;
			}
		  }
		}

		if (this.selectedReceptions.length == 0) {
		  this.selectedCattleType = 0;
		  this.selectedCattleName = '';
		  this.loadReleases();
		}
	  },
	  setupCutSelection : function(inSender) {
		if (this.selectedReceptions.length == 0) {
		  cacheMan
			  .setMessage(
				  "",
				  "Usted no ha seleccionado ningún lote para cortar, seleccione uno o más elementos de la lista posterior e intente nuevamente.");
		  return false;
		}

		this.doResolveSelected();
	  }

	});