define({ 
  //Type your controller code here 
  _isInit: false,
  //Bind events and set callbacks
  _init: function () {
    if(!this._isInit) {
      this._isInit=true;
      this.view.CustomizedHeader.setBackgroundColor("57385c");
      this.view.CustomizedHeader.setSkinToHeaderTitle("sknlblWhite");
      this.view.CustomizedHeader.leftClickEvent = this._goBack;

    }
  },

  _goBack : function () {
    new kony.mvc.Navigation("frmLandingPage").navigate();
  },

  onNavigate : function () {
    this._init();
  }
});