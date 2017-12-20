define(function() {

  return {

    paletteEntries:[],

    constructor: function(baseConfig, layoutConfig, pspConfig) {

      this.view.preShow = this.generatePalette;
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },

    add : function(entry){
      this.paletteEntries.push(entry);
    },

    positionValues:{

      palette0 :{X:"50%",Y:"14%",top:"-1%",bottom:"Default"},
      palette1 :{X:"29%",Y:"22%",top:"10%",bottom:"Default"},
      palette2 :{X:"18%",Y:"39%",top:"31.5%",bottom:"Default"},
      palette3 :{X:"20%",Y:"61%",top:"Default",bottom:"28.5%"},
      palette4 :{X:"33%",Y:"77%",top:"Default",bottom:"8%"},
      palette5 :{X:"51%",Y:"82%",top:"Default",bottom:"0.5%"},
      palette6 :{X:"70%",Y:"77%",top:"Default",bottom:"7%"},
      palette7 :{X:"80%",Y:"61%",top:"Default",bottom:"28%"},
      palette8 :{X:"81%",Y:"39%",top:"Default",bottom:"28%"},
      palette9 :{X:"70%",Y:"22%",top:"Default",bottom:"28%"} 
    },

    generatePalette : function(){
      for(var i=0;i<this.paletteEntries.length;i++){
        //var palette = this.paletteEntries[i];
        //this._numberOfpaletteEntries++;
        var centerXVal=this.positionValues["palette"+i].X;
        var centerYVal=this.positionValues["palette"+i].Y;
//         var topVal=positionValues["palette"+_numberOfpaletteEntries].top;
//         var bottomVal=positionValues["palette"+_numberOfpaletteEntries].bottom;

        var flxList = new kony.ui.FlexContainer({
          "autogrowMode": kony.flex.AUTOGROW_NONE,
          "clipBounds": true,
          "centerX": centerXVal,
          "centerY": centerYVal,
          "height": "50Dp",
          "id": "flxList"+i,
          "isVisible": true,
          "layoutType": kony.flex.FREE_FORM,
          //"left": "100%",
          "skin": "flxBG00b898",
          //         "top": topVal,
          //         "bottom": bottomVal,
          "width": "50Dp",
          "zIndex": 2
        }, {}, {});

        this.view.flxPalette.add(flxList);
      }
    }
  };
});