define({ 

  //Type your controller code here 
  _isInit : false,
  //Bind events and set callbacks
  _init : function () {
    if (this._isInit===false) {
      this._isInit=true;
      var controller = this;
      var PalatteEntry = require("com/Hackathon/ColorPalette/ColorPaletteEntry");
      controller.view.ColorPalette.add(new PalatteEntry("Entry1","00B898",function () {alert("click 1");}));
      controller.view.ColorPalette.add(new PalatteEntry("Entry2","3aa339",function () {alert("click 1");}));
      controller.view.ColorPalette.add(new PalatteEntry("Entry3","633EA5",function () {alert("click 1");}));
      controller.view.ColorPalette.add(new PalatteEntry("Entry4","4286f4",function () {alert("click 1");}));
      controller.view.ColorPalette.add(new PalatteEntry("Entry5","56f441",function () {alert("click 1");}));
      controller.view.ColorPalette.add(new PalatteEntry("Entry6","f44141",function () {alert("click 1");}));
      controller.view.ColorPalette.add(new PalatteEntry("Entry7","4038a2",function () {alert("click 1");}));
      controller.view.ColorPalette.add(new PalatteEntry("Entry8","f441df",function () {alert("click 1");}));
      controller.view.ColorPalette.add(new PalatteEntry("Entry9","f1f441",function () {alert("click 1");}));
      controller.view.ColorPalette.add(new PalatteEntry("Entry10","FFBC00",function () {alert("click 1");}));
    }
  },

  onNavigate : function () {
    this._init();
  },

});
