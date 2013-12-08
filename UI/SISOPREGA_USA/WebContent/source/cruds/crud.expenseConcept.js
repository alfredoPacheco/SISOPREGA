enyo.kind(
  {
    name : "crud.expenseConcept",
    kind : "crud",
    published :
      {
        entityName : "ExpenseConcept",
        createKindName : "catalogs.expenseConcept.form",
      },
    adapterToList : function(entityObj) {
      var listObj =
        {
          value : 0,
          caption : ""
        };
      
      listObj.value = utils.parseToNumber(entityObj.expenseConceptId);
      listObj.caption = entityObj.conceptName;
      
      return listObj;
    },
    getCatalogsList : function() {
      
      var arrAdapterList = enyo.clone(this.arrObj);
      var result = [];
      
      for ( var i = 0; i < arrAdapterList.length; i++) {
        var obj = arrAdapterList[i];
        obj.importantInfo = "" + arrAdapterList[i].conceptName;
        obj.secundaryInfo = "" + arrAdapterList[i].expenseFormula;
        result.push(obj);
      }
      return result;
    }
  });
var crudExpenseConcept = new crud.expenseConcept();