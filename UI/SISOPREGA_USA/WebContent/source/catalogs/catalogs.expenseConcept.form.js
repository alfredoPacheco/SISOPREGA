enyo.kind(
  {
    name : "catalogs.expenseConcept.form",
    kind : "forms.simple",
    entityKind : crudExpenseConcept,
    create : function() {
      this.inherited(arguments);
      
      this.$.mainScroller.createComponents([
          {
            kind : "RowGroup",
            name : "rowGroup",
            defaultKind : "HFlexBox",
            caption : "",
            components : [
                  {
                    kind : "Input",
                    name : "concept_name",
                    hint : "Concepto de Gasto",
                    inputClassName : "blankInput",
                    focusClassName : "darkFocus",
                    bindTo : "conceptName"
                  },
                  {
                    kind : "Input",
                    name : "formula",
                    hint : "Fórmula",
                    inputClassName : "blankInput",
                    focusClassName : "darkFocus",
                    bindTo : "expenseFormula"
                  }
            ]
          }
      ],
        {
          owner : this
        });
    }
  });