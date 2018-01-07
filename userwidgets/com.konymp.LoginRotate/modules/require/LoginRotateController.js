define(function() {

  return {
    animationConfig : {
      "delay":0,
      "duration": 0.1,
      "iterationCount":1,
      "direction":kony.anim.DIRECTION_NONE,
      "fillMode":kony.anim.FILL_MODE_FORWARDS
    },
    constructor: function(baseConfig, layoutConfig, pspConfig) {

      this.view.postShow = this.initializeTemplates;

      this.view.btnLogin.onClick = this.loginAnimSeq1;

      this.view.btnSignUp.onClick = this.signUpAnimSeq1;

    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },

    initializeTemplates:function(){
      var transformSignUp = kony.ui.makeAffineTransform();
      transformSignUp.rotate(90);
      transformSignUp.scale(0.75, 0.75);
      var animObject = {"100":{"stepConfig":{"timingFunction":kony.anim.EASE_IN_OUT}, "transform": transformSignUp}};
      this.animationConfig.duration = 0.1;
      this.view.flxSignUp.animate(kony.ui.createAnimation(animObject), this.animationConfig, {});
    },

    signUpAnimSeq1:function(){
      var transformLogin = kony.ui.makeAffineTransform();
      transformLogin.scale(0.75, 0.75);
      transformLogin.rotate(-45);
      var transformSignUp = kony.ui.makeAffineTransform();
      transformSignUp.rotate(75);
      var animObject1 = {"100":{"left":"10%","top":"10%","stepConfig":{"timingFunction":kony.anim.EASE_IN_OUT},"transform": transformSignUp}};
      var animObject2 = {"100":{"left":"15%","top":"50%","stepConfig":{"timingFunction":kony.anim.EASE_IN_OUT},"transform": transformLogin}};
      var me = this;
      var animationCallbacks = 
          {
            "animationEnd": me.signUpAnimSeq2
          };
      this.animationConfig.duration = 0.1;
      this.view.flxSignUp.animate(kony.ui.createAnimation(animObject1), this.animationConfig, animationCallbacks);
      this.view.flxLogin.animate(kony.ui.createAnimation(animObject2), this.animationConfig, {});
    },

    signUpAnimSeq2:function(){
      var transformSignUp = kony.ui.makeAffineTransform();
      transformSignUp.rotate(-20);
      transformSignUp.scale(1,1);
      var transformLogin = kony.ui.makeAffineTransform();
      transformLogin.rotate(90);
      transformLogin.scale(0.75,0.75);
      var animObject1 = {"100":{"left":"15%","top":"25%","stepConfig":{"timingFunction":kony.anim.EASE_IN_OUT}, "transform": transformSignUp}};
      var animObject2 = {"100":{"left":"30%","top":"20%","stepConfig":{"timingFunction":kony.anim.EASE_IN_OUT}, "transform": transformLogin}};
      var me = this;
      var animationCallbacks = 
          {
            "animationStart": function(){
              me.view.flxSignUp.zIndex = 2;
              me.view.flxLogin.zIndex = 1;
            },
            "animationEnd": me.signUpAnimSeq3
          };

      this.animationConfig.duration = 0.3;
      this.view.flxSignUp.animate(kony.ui.createAnimation(animObject1), this.animationConfig, animationCallbacks);
      this.view.flxLogin.animate(kony.ui.createAnimation(animObject2), this.animationConfig, {});
    },

    signUpAnimSeq3:function (){
      var transformSignUp = kony.ui.makeAffineTransform();
      transformSignUp.rotate(0);
      transformSignUp.scale(1,1);
      var animObject = {"100":{"left":"15%","top":"25%","stepConfig":{"timingFunction":kony.anim.EASE_IN_OUT}, "transform": transformSignUp}};
      var me = this;
      var animationCallbacks = 
          {
            "animationEnd": function(){
              me.view.btnLogin.onClick = me.loginAnimSeq1;
              me.view.btnSignUp.onClick = function(){
                alert("Sign In !!!");
              };
            }
          };
      this.animationConfig.duration = 0.1;
      this.view.flxSignUp.animate(kony.ui.createAnimation(animObject), this.animationConfig, animationCallbacks);
    },

    loginAnimSeq1:function (){
      var transformLogin = kony.ui.makeAffineTransform();
      transformLogin.scale(0.75, 0.75);
      transformLogin.rotate(-30);
      var transformSignUp = kony.ui.makeAffineTransform();
      transformSignUp.rotate(75);
      transformSignUp.scale(0.75, 0.75);
      var animObject1 = {
        "0":{"left":"15%","top":"25%","anchorPoint": {"x": 0,"y": 0},"stepConfig":{"timingFunction":kony.anim.EASE_IN_OUT}},
        "100":{"left":"15%","top":"25%","stepConfig":{"timingFunction":kony.anim.EASE_IN_OUT},"transform": transformSignUp}
      };
      var animObject2 = {
        "0":{"top":"30%","stepConfig":{"timingFunction":kony.anim.EASE_IN_OUT}},
        "100":{"left":"20","top":"40%","stepConfig":{"timingFunction":kony.anim.EASE_IN_OUT},"transform": transformLogin}
      };

      var me = this;
      var animationCallbacks = 
          {
            "animationEnd": function(){
              me.view.flxSignUp.zIndex = 1;
              me.view.flxLogin.zIndex = 2;
              me.loginAnimSeq2();
            }
          };
      this.animationConfig.duration = 0.2;
      this.view.flxSignUp.animate(kony.ui.createAnimation(animObject1), this.animationConfig, {});
      this.view.flxLogin.animate(kony.ui.createAnimation(animObject2), this.animationConfig, animationCallbacks);
    },

    loginAnimSeq2:function(){
      var transformSignUp = kony.ui.makeAffineTransform();
      transformSignUp.rotate(90);
      transformSignUp.scale(0.75, 0.75);
      var transformLogin = kony.ui.makeAffineTransform();
      transformLogin.rotate(10);
      transformLogin.scale(1, 1);
      var animObject1 = {
        "100":{"left":"30%","top":"20%","anchorPoint": {"x": 0.5,"y": 0.5},"stepConfig":{"timingFunction":kony.anim.EASE_IN_OUT},"transform": transformSignUp}
      };
      var animObject2 = {
        "100":{"left":"15%","top":"25%","stepConfig":{"timingFunction":kony.anim.EASE_IN_OUT},"transform": transformLogin}
      };
      var me = this;
      var animationCallbacks = 
          {
            "animationEnd": me.loginAnimSeq3
          };
      this.view.flxSignUp.animate(kony.ui.createAnimation(animObject1), this.animationConfig, {});
      this.animationConfig.duration = 0.3;
      this.view.flxLogin.animate(kony.ui.createAnimation(animObject2), this.animationConfig, animationCallbacks);
    },

    loginAnimSeq3:function (){
      var transformLogin = kony.ui.makeAffineTransform();
      transformLogin.rotate(0);
      transformLogin.scale(1, 1);
      var animObject = {
        "100":{"stepConfig":{"anchorPoint": {"x": 0.5,"y": 0.5},"timingFunction":kony.anim.EASE_IN_OUT},"transform": transformLogin}
      };
      var me = this;
      var animationCallbacks = 
          {
            "animationEnd": function(){
              me.view.btnLogin.onClick = function(){
                alert("Log In !!!");
              };
              me.view.btnSignUp.onClick = me.signUpAnimSeq1;
            }
          };
      this.animationConfig.duration = 0.1;
      this.view.flxLogin.animate(kony.ui.createAnimation(animObject), this.animationConfig, animationCallbacks);
    }

  };
});