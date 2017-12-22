define(function() {

  return {
    _isLogin : true,
    _loginAction : null,
    _signUpAction : null,
    _forgotPasswordAction : null,
    constructor: function(baseConfig, layoutConfig, pspConfig) {

    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      this.view.lblLogin.onTouchEnd = this._switchTab;
      this.view.lblSignUp.onTouchEnd = this._switchTab;
      this.view.flxLogin.onClick = this._submit;
      this.view.btnForgot.onClick = this._forgotPassword;
    },
    setLoginAction:function(action){
      this._loginAction = action;
    },
    setSignUpAction : function(action){
      this._signUpAction = action;
    },
    setForgotPasswordAction : function(action){
      this._forgotPasswordAction = action;
    },
    _forgotPassword : function(){
      if(this._forgotPasswordAction !== null)
        this._forgotPasswordAction();
    },
    _submit : function(){
      var loginDetails = {
        userName : this.view.txtUserName.text,
        password : this.view.txtPassword.text
      };
      if(this._isLogin){
        if(this._loginAction !== null){
          this._loginAction(loginDetails);
        }
      }
      else{
        if(this._signUpAction !== null){
          this._signUpAction(loginDetails);
        }
      }
    },
    _switchTab : function(){
      if(this._isLogin){
        this._animateUp(this.view.imgSignUpIcon,this.view.lblSignUp);
        this._animateDown(this.view.imgLoginIcon,this.view.lblLogin);
        this._isLogin = false;
      }
      else{
        this._animateUp(this.view.imgLoginIcon,this.view.lblLogin);
        this._animateDown(this.view.imgSignUpIcon,this.view.lblSignUp);
        this._isLogin = true;
      }
    },
    _animateUp :function(imgWidget,lblWidget){
      imgWidget.isVisible = true;
        var animationObject = {
          100:{
            "zIndex":"3",
            "top": "25%",
            "stepConfig": {"timingFunction": kony.anim.EASIN_IN_OUT}
          } 
        };
        this._animateWidget(imgWidget, animationObject);
        lblWidget.skin = "lblFontBG6849E3FontFFFFFFRounded";
        var lblAnimationObject = {
          100:{
            "top": "15%",
            "width": "25%",
            "height":"10%",
            "stepConfig": {"timingFunction": kony.anim.EASIN_IN_OUT},
          } 
        };
        this._animateWidget(lblWidget, lblAnimationObject);
    },
    _animateDown: function(imgWidget,lblWidget){
      imgWidget.zIndex = "1";
        var animationObject = {
          100:{
            "zIndex":"1",
            "top": "50%",
            "stepConfig": {"timingFunction": kony.anim.EASIN_IN_OUT}
          } 
        };
        this._animateWidget(imgWidget, animationObject,function(){imgWidget.isVisible = false;});
      	
        lblWidget.skin = "lblFont424242Size";
        var lblAnimationObject = {
          100:{
            "top": "25%",
            "width": "20%",
            "height":"7%",
            "stepConfig": {"timingFunction": kony.anim.EASIN_IN_OUT},
          } 
        };
        this._animateWidget(lblWidget, lblAnimationObject);
    },
    _animateWidget : function(widget,animationObject,animationEndFunc){
      widget.animate(
        kony.ui.createAnimation(animationObject), {
          "delay": 0.1,
          "iterationCount": 1,
          "fillMode": kony.anim.FILL_MODE_FORWARDS,
          "duration": 0.3
        }, {
          // "animationEnd": this.swapImages()
        }
      );
    },
  };
});