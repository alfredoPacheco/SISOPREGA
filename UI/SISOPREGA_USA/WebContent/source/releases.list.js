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
    selectedIds : [],
    events :
      {
        onCancel : "",
        onResolveSelected : ""
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
                content : "Rechazos",
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
                onSetupRow : "setupReleaseRow",
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
                            name : "rejects",
                            style : "width:150px;text-align:center;"
                          },
                          {
                            name : "rejectsWeight",
                            style : "width:250px;text-align:right;",
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
                caption : "CORTAR SELECCIÓN",
                onclick : "setupCutSelection"
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
    loadReleases : function(rancherId, cattleType) {
      this.releases = releasesCache.loadReleases(rancherId, cattleType);
      if (this.releases.length > 0)
        this.$.releasesList.render();
      else {
        alert('No hay inspecciones liberadas para este exportador, intente más tarde.');
        this.$.doCancel();
      }
    },
    setupReleaseRow : function(inSender, inIndex) {
      var objRelease = this.releases[inIndex];
      if (objRelease) {
        this.$.cattle.setContent(objRelease.cattleName);
        this.$.heads.setContent(objRelease.heads);
        this.$.rejects.setContent(objRelease.rejects);
        this.$.rejectsWeight.setWeight(objRelease.rejectsWeight);
        this.$.rejectsWeight.setRejectedRecord(objRelease.recordId);
        this.$.rejectsWeight.cancelSelection = true;
        this.$.rejectsWeight.listIndex = inIndex;

        // If filtered with this record as selected
        if (this.selectedIds && this.selectedIds[0] == objRelease.recordId)
          this.$.rejectsWeight.setSelected(true);

        return true;
      }
      return false;
    },
    selectRelease : function(inSender, inEvent) {
      if (this.selectedCattleType == 0 && !this.$.rejectsWeight.isSelected()) {
        this.selectedCattleType = this.releases[inEvent.rowIndex].cattleType;
        this.selectedCattleName = this.releases[inEvent.rowIndex].cattleName;
        this.selectedIds = [];
        this.selectedIds.push(this.releases[inEvent.rowIndex].recordId);
        // Filter list
        this.loadReleases(this.rancher_id, this.selectedCattleType);
        this.$.rejectsWeight.setSelected(true);
        return true;
      }
      if (this.selectedCattleType != this.releases[inEvent.rowIndex].cattleType && !this.$.rejectsWeight.isSelected()) {
        alert('No se pueden seleccionar dos tipos de ganado diferente, previamente usted ha seleccionado ' + this.selectedCattleName);
        return false;
      }

      this.$.rejectsWeight.setSelected(!this.$.rejectsWeight.isSelected());

      if (this.$.rejectsWeight.isSelected()) {
        this.selectedIds.push(this.releases[inEvent.rowIndex].recordId);
      } else {
        for ( var i = 0; i < this.selectedIds.length; i++) {
          if (this.selectedIds[i] == this.releases[inEvent.rowIndex].recordId) {
            this.selectedIds.splice(i, 1);
            break;
          }
        }
      }

      if (this.selectedIds.length == 0) {
        this.selectedCattleType = 0;
        this.selectedCattleName = '';
        this.loadReleases(this.rancher_id);
      }
    },
    setupCutSelection : function(inSender) {
      if (this.selectedIds.length == 0) {
        alert("Usted no ha seleccionado ningún lote para cortar, seleccione uno o más elementos de la lista posterior e intente nuevamente.");
        return false;
      }

      this.doResolveSelected();
    }

  });