define(function() {

  return {
    _menus : [],
    _isAnimated :false,
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.preShow = this._createMenus;
      //           this._createMenus();
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },
    addMenu : function(name,icon,bgColor,onClick){
      this._menus.push({
        name:name,
        icon:icon,
        bgColor:bgColor,
        onClick:onClick
      });
    },
    _createMenus : function(){
      if(this._menus!== null && this._menus.length>0){
        this.view.flxMainMenu.removeAll();
        var numberOfMenus = this._menus.length;
        var eachMenuHeight = (100/numberOfMenus);
        var top = 0;
        for(var i in this._menus){
          this._createEachMenu(top, eachMenuHeight, this._menus[i],i);
          top = top + eachMenuHeight;
        }
        this.view.flxMainMenu.forceLayout();
      }
    },
    _createEachMenu : function(top,height,value,id){
      var menuFlx = new com.Hackathon.MenuUI({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "clipBounds": true,
        "height": height+"%",
        "id": "menu"+id,
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        //           "left": me.LEFT_PICTURE_INITIAL+""+me.DEFAULT_UNIT,
        "masterType": constants.MASTER_TYPE_USERWIDGET,
        "skin": "flxLoginUIBG100FAFBFF",
        "top": top+"%",
        "width": "100%",
        "centerX":"50%",
      }, {}, {});
      menuFlx.setIcon(value.icon);
      menuFlx.setName(value.name);
      menuFlx.setMenuOnClick(this._menuOnClick);
      menuFlx.backgroundColor = value.bgColor;
      this.view.flxMainMenu.add(menuFlx);
    },
    _menuOnClick : function(widgetInfo){
      var lblAnimationObject;
      var numberOfMenus = this._menus.length;
      var eachMenuHeight = (100/numberOfMenus);
      var top = 0;
      for(var i=0;i<this._menus.length;i++){
        var menuId = "menu"+i;

        if(this._isAnimated === false){
          lblAnimationObject = {
            100:{
              "top": "0%",
              "height":"10%",
              "stepConfig": {"timingFunction": kony.anim.EASIN_IN_OUT},
            } 
          };
        }
        else{
          
          lblAnimationObject = {
            100:{
              "top": top+"%",
              "height":eachMenuHeight+"%",
              "stepConfig": {"timingFunction": kony.anim.EASIN_IN_OUT},
            } 
          };
        }

        if(menuId == widgetInfo.id){
          this.view["menu"+i].zIndex = 3;
          this.view["menu"+i].applyLookAndFeel(this._isAnimated);
        }
        else{
          this.view["menu"+i].zIndex = 1;
        }
        this.view["menu"+i].animate(
          kony.ui.createAnimation(lblAnimationObject), {
            "delay": 0.1,
            "iterationCount": 1,
            "fillMode": kony.anim.FILL_MODE_FORWARDS,
            "duration": 0.3
          }, {
//             "animationEnd": function(){this._isAnimated = !this._isAnimated;}
          }
        );
        top = top + eachMenuHeight;
      }
      this._isAnimated = !this._isAnimated;
    },
  };
});