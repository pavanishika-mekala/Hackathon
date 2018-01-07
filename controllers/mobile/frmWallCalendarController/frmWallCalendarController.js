define({ 
  //Type your controller code here 
  _isInit: false,
  //Bind events and set callbacks
  _init: function () {
    if(!this._isInit) {
      this._isInit=true;
      var controller = this;
      controller.view.CustomizedHeader.setBackgroundColor("ff5959");
      controller.view.CustomizedHeader.setSkinToHeaderTitle("sknlblWhite");
      controller.view.CustomizedHeader.leftClickEvent = this._goBack;
    }
  },
  
  _goBack : function () {
    new kony.mvc.Navigation("frmLandingPage").navigate();
  },
  
  onNavigate : function () {
    this._init();
  }
});
