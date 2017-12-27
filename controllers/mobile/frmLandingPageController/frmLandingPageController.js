define({ 

  //Type your controller code here 
  _isInit : false,
  //Bind events and set callbacks
  _init : function () {
    if (this._isInit===false) {
      this._isInit=true;
      var controller = this;
      controller.view.btnColorPalette.onClick = this._goToColoPaletteForm;
      controller.view.btnLoginUI.onClick = this._goToLoginUIForm;
      controller.view.btnWallCalendar.onClick = this._goToWallCalendarForm;
      controller.view.btnMenu.onClick = this._gotToMenuForm;
      controller.view.btnWristCalendar.onClick = this._goToWristCalendarForm;
      controller.view.btnGearCalendar.onClick = this._goToGearCalendarForm;
      controller.view.btnLoginRotate.onClick = this._goToLoginRotateForm;
    }
  },
  _goToColoPaletteForm : function(){
    new kony.mvc.Navigation("frmHome").navigate();
  },
  _goToLoginUIForm : function(){
    new kony.mvc.Navigation("frmLoginUI").navigate();
  },
  _goToWallCalendarForm : function(){
    new kony.mvc.Navigation("frmWallCalendar").navigate();
  },
  _gotToMenuForm: function(){
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
  onNavigate : function () {
    this._init();
  },
  
});
