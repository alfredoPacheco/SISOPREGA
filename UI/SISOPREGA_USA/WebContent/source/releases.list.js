enyo.kind(
  {
    name : "releases.list",
    kind : enyo.VFlexBox,
    rancher_id : "",
    rancher_name : "",
    releases : [],
    selectedCattleType : 0,
    selectedCattleName : "",
    selectedReleases : 0,
    events :
      {
        onCancel : ""
      },
    components :
      [
        {
          kind : "HFlexBox",
          name : "title",
          content : "Lotes inspeccionados del exportador: {EXPORTADOR SELECCIONADO}"
        },
        {
          kind : "Header",
          name : "encabezado",
          style : "font-size:13px;background-color:#381402;color:#DABD8B;",
          components :
            [
              {
                content : "Ganado",
                style : "width:150px;text-align:center;"
              },
              {
                content : "Cabezas",
                style : "width:150px;text-align:center;"
              },
              {
                content : "Peso de Rechazos",
                style : "width:250px;text-align:center;"
              } ]
        },
        {
          kind : enyo.Scroller,
          name : "releasesScroller",
          style : "height:350px;border:thin solid black;",
          components :
            [
              {
                kind : enyo.VirtualRepeater,
                name : "releasesList",
                onSetupRow : "setupReleasesList",
                onclick : "selectRelease",
                style : "background-color:#F3DEBA;",
                components :
                  [
                    {
                      kind : enyo.RowItem,
                      layoutKind : enyo.HFlexLayout,
                      style : "font-size:13px;",
                      tapHighlight : true,
                      components :
                        [
                          {
                            name : "cattle",
                            style : "width:150px;text-align:center;"
                          },
                          {
                            name : "heads",
                            style : "width:150px;text-align:center;"
                          },
                          {
                            name : "rejectsWeight",
                            style : "width:250px",
                            kind : "release.rejects.weight"
                          } ]
                    } ]
              } ]
        },
        {
          kind : enyo.HFlexBox,
          components :
            [
              {
                kind : "Button",
                style : "background-color:#AC0909;color:#F3DEBA;",
                caption : "CORTAR SELECCIÓN"
              },
              {
                kind : "Button",
                style : "background-color:#AC0909;color:#F3DEBA;",
                caption : "CERRAR",
                onclick : "doCancel"
              } ]
        } ],
    setRancher : function(rancherId, rancherName) {
      this.rancher_id = rancherId;
      this.rancher_name = rancherName;
      this.$.title.content = "Lotes inspeccionados del exportador: " + rancherName;
      this.loadReleases(rancherId);
    },
    loadReleases : function(rancherId) {
      this.releases = releasesCache.loadReleases(rancherId);
      if (this.releases.length > 0)
        this.$.releasesList.render();
      else {
        alert('No hay inspecciones liberadas para este exportador, intente más tarde.');
        this.$.doCancel();
      }
    },
    setupReleasesList : function(inSender, inIndex) {
      var objRelease = this.releases[inIndex];
      if (objRelease) {
        this.$.cattle.setContent(objRelease.cattleName);
        this.$.heads.setContent(objRelease.heads);
        this.$.rejectsWeight.setWeight(objRelease.rejectsWeight);
        this.$.rejectsWeight.setRejectedRecord(objRelease.recordId);
        this.$.rejectsWeight.cancelSelection = true;
        this.$.rejectsWeight.listIndex = inIndex;

        return true;
      }
      return false;
    },
    selectRelease : function(inSender, inEvent) {
      if (this.selectedCattleType == 0 && !this.$.rejectsWeight.isSelected()) {
        this.selectedCattleType = this.releases[inEvent.rowIndex].cattleType;
        this.selectedCattleName = this.releases[inEvent.rowIndex].cattleName;
      }
      if (this.selectedCattleType != this.releases[inEvent.rowIndex].cattleType && !this.$.rejectsWeight.isSelected()) {
        alert('No se pueden seleccionar dos tipos de ganado diferente, previamente usted ha seleccionado ' + this.selectedCattleName);
        return false;
      }
      
      this.$.rejectsWeight.setSelected(!this.$.rejectsWeight.isSelected());
      
      if(this.$.rejectsWeight.isSelected())
        this.selectedReleases++;
      else
        this.selectedReleases--;
      
      if(this.selectedReleases == 0){
        this.selectedCattleType = 0;
        this.selectedCattleName = '';
      }
    }

  });