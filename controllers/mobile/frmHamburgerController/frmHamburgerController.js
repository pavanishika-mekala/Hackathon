define({ 
  //Type your controller code here 
  _isInit: false,
  //Bind events and set callbacks
  _init: function () {
    if(!this._isInit) {
      this._isInit=true;
      //var controller = this;
//       var MenuEntry = require("com/Hackathon/HamburgerMenu/Menu");

//       this.view.HamburgerMenu.add(new MenuEntry("DASHBOARD",function(){alert("MenuEntry1");}));
//       this.view.HamburgerMenu.add(new MenuEntry("HISTORY",function(){alert("MenuEntry2");}));
//       this.view.HamburgerMenu.add(new MenuEntry("STATISTICS",function(){alert("MenuEntry3");}));
//       this.view.HamburgerMenu.add(new MenuEntry("SETTINGS",function(){alert("MenuEntry3");}));
// //       this.view.HamburgerMenu.add(new MenuEntry("Notifications",""));
// //       this.view.HamburgerMenu.add(new MenuEntry(null,null,function(){alert("MenuEntry5");}));
// //       this.view.HamburgerMenu.add(new MenuEntry("Settings","",function(){alert("MenuEntry6");}));
// //       this.view.HamburgerMenu.add(new MenuEntry("MenuEntry7","",function(){alert("MenuEntry7");}));
      
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