enyo.kind(
  {
    name : "cache.pen",
    arrObj : [],
    readFromGateway : true,
    lastID : 0,
    isOccupied : function(by) {

      var arrPens = this.get();
      for ( var i = 0; i < arrPens.length; i++) {
        if (by == arrPens[i].barnyard) {
          return true;
        }
      }
      return false;
    },
    getOccupiedBY : function() {
      var arrPens = this.get();
      for ( var i = 0; i < arrPens.length; i++) {
        for ( var j in arrPens[i].barnyard) {
          if (arrPens[i].barnyard.hasOwnProperty(j)) {
            console.debug(arrPens[i].barnyard[j]);
          }
        }
      }
    },
    get : function() {
      if (this.readFromGateway) {
        this.arrObj = this.getTest(3);
        this.readFromGateway = false;
      }
      return this.arrObj;
    },
    getByBarnyard : function(by) {
      for ( var i = 0; i < this.arrObj.length; i++) {
        if (by == this.arrObj[i].barnyard) {
          return this.arrObj[i];
        }
      }
    },
    getTest : function(qty) {
      var result = [];
      for ( var i = 0; i < qty; i++) {
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
        var mockWeight = Math.floor((Math.random() * 450) + 100) * mockHeads;
        var mockRejects = Math.floor(Math.random() * 5);
        var mockRejectsWeight = Math.floor((Math.random() * 450) + 100) * mockRejects;
        var numCorral = Math.floor((Math.random() * 34) + 1);
        var barnyard = {};
        barnyard["3" + "C" + numCorral] = "3" + "C" + numCorral;

        var mockObj =
          {
            recordId : ++this.lastID,
            cattleType : mockCattleType,
            cattleName : mockCattleName,
            heads : mockHeads,
            weight : mockWeight,
            rejects : mockRejects,
            rejectsWeight : mockRejectsWeight,
            avgweight : mockWeight / mockHeads,
            barnyard : "3" + "C" + numCorral,
            feed :
              {
                dateAndTime : null,
                quantity : 0
              },
            buyers :
              [
                {
                  name : "Hasco",
                  heads : 127
                } ],
            trucks :
              [ "Paez Truck" ],
            occupied : 1
          };
        result.push(mockObj);
      }
      return result;
    },
    create : function(obj) {
      obj.recordId = ++this.lastID;
      this.arrObj.push(obj);
      return true;
    },
    update : function(objNew) {
      var arrPens = this.get();
      for ( var i = 0; i < arrPens.length; i++) {
        if (objNew.recordId == arrPens[i].recordId) {
          arrPens[i] = objNew;
          return true;
        }
      }
      return false;
    },
    del : function(objDel) {
      var arrPens = this.get();
      for ( var i = 0; i < arrPens.length; i++) {
        if (objDel.recordId == arrPens[i].recordId) {
          arrPens.splice(i, 1);
          return true;
        }
      }
      return false;
    },
    movePen : function(objFrom, objTo, objMovement) {
      objFrom.heads = parseInt(objFrom.heads) - parseInt(objMovement.heads);
      objFrom.weight = parseInt(objFrom.weight) - parseInt(objMovement.weight);

      if (objTo) {
        objTo.heads = parseInt(objTo.heads) + parseInt(objMovement.heads);
        objTo.weight = parseInt(objTo.weight) + parseInt(objMovement.weight);
        if (this.update(objFrom))
          if (this.update(objTo))
            return true;
      } else {
        if (this.update(objFrom))
          if (this.create(objMovement))
            return true;
      }
      return false;
    },
    barnyardListByZone : function(zoneId) {
      var result = [];
      var barnyard =
        {
          locationId : zoneId
        };

      var readGateway = consumingGateway.Read("Barnyard", barnyard);

      if (readGateway.exceptionId == 0) {
        jQuery.each(readGateway.records, function() {
          var barnyardId=0, barnyardCode='';
          jQuery.each(this, function(key, value) {
            if(key == 'barnyardId')
              barnyardId = value;
            if(key == 'barnyardCode')
              barnyardCode = value;
          });
          var pen =
            {
              value : barnyardId,
              caption : barnyardCode
            };
          result.push(pen);
        });
      }
      
      return result;
    },
    getList : function() {
      var result = [];

      var arr3 = this.barnyardListByZone(3);
      var arr4 = this.barnyardListByZone(4);
      
      for(var i = 0; i < arr4.length; i++){
        arr4[i].caption = arr4[i].caption;
        result.push(arr4[i]);
      }
      
      for(var i = 0; i < arr3.length; i++){
        arr3[i].caption = 'W' + arr3[i].caption; 
        result.push(arr3[i]);
      }
      
      result.sort(function(a, b){
        a['sortStr'] = a.caption.toLowerCase();
        b['sortStr'] = b.caption.toLowerCase();
        return a['sortStr'] < b['sortStr'] ? -1 : 1;
      });
      
      return result;
    },
    addFeed : function(objPen, objFeed) {
      var obj = this.getByID(objPen.recordId);
      if (obj) {
        obj.feed = objFeed;
        return true;
      }
      alert("Error al intentar guardad el alimento");
      return false;
    },
    getByID : function(id) {
      for ( var i = 0; i < this.arrObj.length; i++) {
        if (id == this.arrObj[i].recordId) {
          return this.arrObj[i];
        }
      }
      return null;
    },
    merma : function(objPen, heads) {

      // calcular peso
      var pesoPromedio = Number(objPen.weight) / Number(objPen.heads);
      var pesoMermado = pesoPromedio * heads;
      // asignar nuevos valores
      objPen.weight = Number(objPen.weight) - Number(pesoMermado);
      objPen.heads = parseInt(objPen.heads) - parseInt(heads);
    },
    // comentarios de la merma
    coment : function() {

    },
    getClassesInPensForList : function() {
      var setAux = {};
      var result = [];
      var items = this.get();
      for ( var index = 0; index < items.length; index++) {
        var item =
          {
            caption : cacheClasses.getByID(items[index].cattleType).name,
            value : items[index].cattleType
          // items[index].id TODO: work with id
          };
        if (!setAux.hasOwnProperty(item.caption)) {
          setAux[item.caption] = item;
          result.push(item);
        }
      }
      return result;
    },
    getBarnyardsOccupiedForList : function() {
      var setAux = {};
      var result = [];
      var items = this.get();
      for ( var index = 0; index < items.length; index++) {
        var item =
          {
            value : items[index].recordId,
            caption : items[index].barnyard.substring(1),
            object : items[index]
          };
        if (!setAux.hasOwnProperty(item.caption)) {
          setAux[item.caption] = item;
          result.push(item);
        }

        // var auxCaption = "";
        // for ( var j in items[index].barnyard) {
        // if (items[index].barnyard.hasOwnProperty(j)) {
        // auxCaption = items[index].barnyard[j].substring(1);
        // var item = {
        // value : items[index].recordId,
        // caption : auxCaption,
        // object : items[index]
        // };
        // if (!setAux.hasOwnProperty(item.caption)) {
        // setAux[item.caption] = item;
        // result.push(item);
        // }
        // }
        // }

      }
      return result;
    },
    substractHeadsInPen : function(by, heads) {
      var reception = this.getByBarnyard(by);
      if (reception) {
        var weightToSubstract = Number(heads) * Number(reception.avgweight);
        reception.heads = Number(reception.heads) - Number(heads);
        reception.weight = Number(reception.weight) - weightToSubstract;
        reception.avgweight = Number(reception.weight) / Number(reception.heads);
        if (reception.heads < 1) {
          if (!this.del(reception)) {
            return false;
          }
        }
        return true;
      }
      return false;
    }
  });
var cachePen = new cache.pen();
