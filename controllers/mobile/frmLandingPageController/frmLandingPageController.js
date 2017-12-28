define({ 

  //Type your controller code here 
  _isInit : false,
  //Bind events and set callbacks
  _init : function () {
    if (this._isInit===false) {
      this._isInit=true;
      var controller = this;
      controller.view.CustomizedHeader.setBackgroundColor("34c780");
      controller.view.btnColorPalette.onClick = this._goToColorPaletteForm;
      controller.view.btnLoginUI.onClick = this._goToLoginUIForm;
      controller.view.btnWallCalendar.onClick = this._goToWallCalendarForm;
      controller.view.btnMenu.onClick = this._goToMenuForm;
      controller.view.btnWristCalendar.onClick = this._goToWristCalendarForm;
      controller.view.btnGearCalendar.onClick = this._goToGearCalendarForm;
      controller.view.btnLoginRotate.onClick = this._goToLoginRotateForm;
      controller.view.btnHamburger.onClick = this._goToHamburgerForm;
    }
  },
  _goToColorPaletteForm : function(){
    new kony.mvc.Navigation("frmColorPalette").navigate();
  },
  _goToLoginUIForm : function(){
    new kony.mvc.Navigation("frmLoginUI").navigate();
  },
  _goToWallCalendarForm : function(){
    new kony.mvc.Navigation("frmWallCalendar").navigate();
  },
  _goToMenuForm: function(){
    new kony.mvc.Navigation("frmMenu").navigate();
  },
  _goToWristCalendarForm : function(){
    new kony.mvc.Navigation("frmWristCalendar").navigate();
  },
  _goToGearCalendarForm : function(){
    new kony.mvc.Navigation("frmGearCalendar").navigate();
  },
  _goToLoginRotateForm : function(){
    new kony.mvc.Navigation("frmLoginRotate").navigate();
  },
  _goToHamburgerForm : function(){
    new kony.mvc.Navigation("frmHamburger").navigate();
  },
  onNavigate : function () {
    this._init();
  },
  
});
