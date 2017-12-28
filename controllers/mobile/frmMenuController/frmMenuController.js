define({ 
  onNavigate : function () {
    this._init();
  },
 //Type your controller code here 
  _isInit : false,
  //Bind events and set callbacks
  _init : function () {
    if (this._isInit===false) {
      this._isInit=true;
      this.view.CustomizedHeader.leftClickEvent = this._goBack;
      this.view.Menu.addMenu("services","arrow.png","D87EFB",function(){alert("services");});
      this.view.Menu.addMenu("auto","arrow.png","FC6F61",function(){alert("auto");});
      this.view.Menu.addMenu("job","arrow.png","94C223",function(){alert("job");});
      this.view.Menu.addMenu("reality","arrow.png","14A2FD",function(){alert("reality");});
    }
  },
  _goBack : function () {
    new kony.mvc.Navigation("frmLandingPage").navigate();
  },
});


