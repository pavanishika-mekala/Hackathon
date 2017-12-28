define({ 
  //Type your controller code here 
  _isInit: false,
  //Bind events and set callbacks
  _init: function () {
    if(!this._isInit) {
      this._isInit=true;
      var controller = this;
      //controller.view.CustomizedHeader.backgroundColor = "";
      controller.view.CustomizedHeader.leftClickEvent = this._goBack;
      this.view.CustomizedHeader.setSkinToHeaderTitle("sknlblWhite");
      controller.view.CustomizedHeader.setSkinToHeader("slFbox");
    }
  },
  
  _goBack : function () {
    new kony.mvc.Navigation("frmLandingPage").navigate();
  },
  
  onNavigate : function () {
    this._init();
  }
});
