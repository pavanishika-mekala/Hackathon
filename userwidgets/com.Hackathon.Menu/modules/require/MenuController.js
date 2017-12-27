define(function() {

	return {
        _menus : [],
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
            var numberOfMenus = this._menus.length;
            var eachMenuHeight = (100/numberOfMenus);
            var top = 0;
            for(var i in this._menus){
              this._createEachMenu(top, eachMenuHeight, this._menus[i],i);
              top = top + eachMenuHeight;
            }
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
          "centerX":"50%"
        }, {}, {});
          menuFlx.setIcon(value.icon);
          menuFlx.setName(value.name);
          menuFlx.backgroundColor = value.bgColor;
         this.view.flxMainMenu.add(menuFlx);
        }
	};
});