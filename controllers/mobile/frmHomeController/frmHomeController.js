define({ 

  //Type your controller code here 
  _isInit : false,
  //Bind events and set callbacks
  _init : function () {
    if (this._isInit===false) {
      this._isInit=true;
      var controller = this;
      var PalatteEntry = require("com/Hackathon/ColorPalette/ColorPaletteEntry");
      controller.view.ColorPalette.add(new PalatteEntry("Entry1","",function () {alert("click 1");}));
      controller.view.ColorPalette.add(new PalatteEntry("Entry2","",function () {alert("click 1");}));
      controller.view.ColorPalette.add(new PalatteEntry("Entry3","",function () {alert("click 1");}));
      controller.view.ColorPalette.add(new PalatteEntry("Entry4","",function () {alert("click 1");}));
      controller.view.ColorPalette.add(new PalatteEntry("Entry5","",function () {alert("click 1");}));
      controller.view.ColorPalette.add(new PalatteEntry("Entry6","",function () {alert("click 1");}));
      controller.view.ColorPalette.add(new PalatteEntry("Entry7","",function () {alert("click 1");}));
      controller.view.ColorPalette.add(new PalatteEntry("Entry8","",function () {alert("click 1");}));
      controller.view.ColorPalette.add(new PalatteEntry("Entry9","",function () {alert("click 1");}));
      controller.view.ColorPalette.add(new PalatteEntry("Entry10","",function () {alert("click 1");}));
    }
  },

  onNavigate : function () {
    this._init();
  },

});
