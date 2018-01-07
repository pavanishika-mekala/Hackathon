define(function() {

  return {

    menuEntries : [],
    _top:24,
    isMenuOpen : false,
    animationConfig : {
      "delay":0,
      "duration": 0.1,
      "iterationCount":1,
      "direction":kony.anim.DIRECTION_NONE,
      "fillMode":kony.anim.FILL_MODE_FORWARDS
    },
    constructor: function(baseConfig, layoutConfig, pspConfig) {

      this.view.preShow = this.initializeItems;

      this.view.flxMenuAction.onClick = this.menuAction;
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },

    initializeItems:function(){
      this.view.lblMenu1.opacity = 0;
      this.view.lblMenu2.opacity = 0;
      this.view.lblMenu3.opacity = 0;
      this.view.lblMenu4.opacity = 0;
      this.view.lblMenu5.opacity = 0;
      this.view.flxShade.opacity = 0;
    },

    menuAction:function(){
      if(this.view.lblCross.isVisible){
        this.animationConfig.delay = 0;
        this.animShade(0);
        this.hideTextMenu();
      }else{
        var animObject = {"100":{"top":"50%","stepConfig":{"timingFunction":kony.anim.EASE_IN_OUT}}};
        var animStick1 = {"100":{"left":"34%","top":"30%","opacity":0,"stepConfig":{"timingFunction":kony.anim.EASE_IN_OUT}}};
        var animStick2 = {"100":{"left":"34%","top":"45%","opacity":0,"stepConfig":{"timingFunction":kony.anim.EASE_IN_OUT}}};
        var animStick3 = {"100":{"left":"34%","top":"70%","opacity":0,"stepConfig":{"timingFunction":kony.anim.EASE_IN_OUT}}};
        var animInnerBox = {
          "60":{"top":"60%","stepConfig":{"timingFunction":kony.anim.EASE_IN_OUT}},
          "100":{"top":"45%","stepConfig":{"timingFunction":kony.anim.EASE_IN_OUT}}
        };

        var me = this;
        var animationCallbacks = {
          "animationEnd": function(){
            me.isMenuOpen = true;
          }
        };

        this.animationConfig.duration = 0.2;
        this.view.flxProfile.animate(kony.ui.createAnimation(animObject), this.animationConfig, animationCallbacks);
        this.animationConfig.duration = 0.3;
        this.view.flxMenuStick1.animate(kony.ui.createAnimation(animStick1), this.animationConfig, {});
        this.view.flxMenuStick2.animate(kony.ui.createAnimation(animStick2), this.animationConfig, {});
        this.view.flxMenuStick3.animate(kony.ui.createAnimation(animStick3), this.animationConfig, {});
        this.showTextMenu();
        this.animShade(1);
      }
    },

    profileSeq2:function (final){
      var animObject = {
        "100":{"top":final,"stepConfig":{"timingFunction":kony.anim.LINEAR}}
      };
      this.animationConfig.duration = 0.1;
      this.view.flxProfile.animate(kony.ui.createAnimation(animObject), this.animationConfig, {});
    },

    showTextMenu:function(){
      this.view.lblCross.isVisible = true;
      var animLabel1 = {"100":{"left":"34%","top":"30%","opacity":1,"stepConfig":{"timingFunction":kony.anim.EASE_IN_OUT}}};
      var animLabel2 = {"100":{"left":"34%","top":"45%","opacity":1,"stepConfig":{"timingFunction":kony.anim.EASE_IN_OUT}}};
      var animLabel3 = {"100":{"left":"34%","top":"60%","opacity":1,"stepConfig":{"timingFunction":kony.anim.EASE_IN_OUT}}};
      var animLabel4 = {"100":{"left":"34%","top":"75%","opacity":1,"stepConfig":{"timingFunction":kony.anim.EASE_IN_OUT}}};
      var animLabel5 = {"100":{"left":"34%","top":"90%","opacity":1,"stepConfig":{"timingFunction":kony.anim.EASE_IN_OUT}}};
      this.animationConfig.delay = 0.1;
      this.animationConfig.duration = 0.3;
      this.view.lblMenu1.animate(kony.ui.createAnimation(animLabel1), this.animationConfig, {});
      this.view.lblMenu2.animate(kony.ui.createAnimation(animLabel2), this.animationConfig, {});
      this.view.lblMenu3.animate(kony.ui.createAnimation(animLabel3), this.animationConfig, {});
      this.view.lblMenu4.animate(kony.ui.createAnimation(animLabel4), this.animationConfig, {});
      this.view.lblMenu5.animate(kony.ui.createAnimation(animLabel5), this.animationConfig, {});
    },

    hideTextMenu:function (){
      this.view.lblCross.isVisible = false;
      var animObject = {"100":{"top":"5%","stepConfig":{"timingFunction":kony.anim.EASE_IN_OUT}}};
      var animLabel1 = {"100":{"left":"16%","top":"24%","opacity":0,"stepConfig":{"timingFunction":kony.anim.EASE_IN_OUT}}};
      var animLabel2 = {"100":{"left":"16%","top":"30%","opacity":0,"stepConfig":{"timingFunction":kony.anim.EASE_IN_OUT}}};
      var animLabel3 = {"100":{"left":"16%","top":"36%","opacity":0,"stepConfig":{"timingFunction":kony.anim.EASE_IN_OUT}}};
      var animLabel4 = {"100":{"left":"16%","top":"42%","opacity":0,"stepConfig":{"timingFunction":kony.anim.EASE_IN_OUT}}};
      var animLabel5 = {"100":{"left":"16%","top":"48%","opacity":0,"stepConfig":{"timingFunction":kony.anim.EASE_IN_OUT}}};
      var me = this;
      var pAnimCallbacks = {
        "animationEnd": function(){
          me.isMenuOpen = false;
          me.profileSeq2("10%");
        }
      };
      this.animationConfig.duration = 0.2;
      this.view.flxProfile.animate(kony.ui.createAnimation(animObject), this.animationConfig, pAnimCallbacks);
      this.animationConfig.duration = 0.3;
      this.view.lblMenu1.animate(kony.ui.createAnimation(animLabel1), this.animationConfig, {});
      this.view.lblMenu2.animate(kony.ui.createAnimation(animLabel2), this.animationConfig, {});
      this.view.lblMenu3.animate(kony.ui.createAnimation(animLabel3), this.animationConfig, {});
      this.view.lblMenu4.animate(kony.ui.createAnimation(animLabel4), this.animationConfig, {});
      this.view.lblMenu5.animate(kony.ui.createAnimation(animLabel5), this.animationConfig, {});
      this.resetMenu();
    },

    resetMenu:function (){
      var animStick1 = {"100":{"left":"7%","top":"10%","opacity":1,"stepConfig":{"timingFunction":kony.anim.EASE_IN_OUT}}};
      var animStick2 = {"100":{"left":"7%","top":"13%","opacity":1,"stepConfig":{"timingFunction":kony.anim.EASE_IN_OUT}}};
      var animStick3 = {"100":{"left":"7%","top":"16%","opacity":1,"stepConfig":{"timingFunction":kony.anim.EASE_IN_OUT}}};

      this.animationConfig.duration = 0.3;
      this.view.flxMenuStick1.animate(kony.ui.createAnimation(animStick1), this.animationConfig, {});
      this.view.flxMenuStick2.animate(kony.ui.createAnimation(animStick2), this.animationConfig, {});
      this.view.flxMenuStick3.animate(kony.ui.createAnimation(animStick3), this.animationConfig, {});
    },

    animShade:function(opaque){  
      var anim = {"100":{"opacity":opaque,"stepConfig":{"timingFunction":kony.anim.EASE_IN_OUT}}};
      this.animationConfig.duration = 0.3;
      this.view.flxShade.animate(kony.ui.createAnimation(anim), this.animationConfig, {});
    }


  };
});