/**
 *  @author     Mehak Luthra
 *  @category   UX/UI
 *  @desc       Splash To Login Animations For ESS
 *  @ © 2016    Kony Inc
 */

kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};

kony.apps.coe.ess.loginAnimations = function(){
}

/**
 * @class          loginAnimations
 * @type           Prototype
 * @return         None.
 * @description    Animations for QR Screen
 */
kony.apps.coe.ess.loginAnimations.prototype.animationQrScreen = function() {
   frmStartUp.flxImgApllicationLogo.animate(
    kony.ui.createAnimation({
        "100": {
            "top": "5%",
            "stepConfig": {
                "timingFunction": kony.anim.EASE
            }
        }
    }), {
        "delay": 0.1,
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "duration": 1.5
    }, {
        "animationEnd": function(){
        }
    });
    frmStartUp.flxApplicationLabel.animate(
    kony.ui.createAnimation({
        "100": {
            "top": "27.5%",
            "stepConfig": {
                "timingFunction": kony.anim.EASE
            }
        }
    }), {
        "delay": 1,
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "duration": 1.2
    }, {
        "animationEnd": function(){}
    });
    frmStartUp.flxMainQR.animate(
    kony.ui.createAnimation({
        "100": {
            "top": "0%",
            "stepConfig": {
                "timingFunction": kony.anim.EASE
            }
        }
    }), {
        "delay": 2,
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "duration": 1.2
    }, {
        "animationEnd": function(){}
    });
   
}
kony.apps.coe.ess.loginAnimations.prototype.animationLoginScreen = function() {
  frmStartUp.destroy();
frmLogin.flxSplash.animate(
    kony.ui.createAnimation({
        "100": {
            "top": "-100%",
            "stepConfig": {
                "timingFunction": kony.anim.EASE
            }
        }
    }), {
        "delay": 0,
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "duration": 1.5
    }, {
        "animationEnd": function(){}
    });
  frmLogin.flxAfterSplash.animate(
    kony.ui.createAnimation({
        "100": {
            "top": "0%",
            "stepConfig": {
                "timingFunction": kony.anim.EASE
            }
        }
    }), {
        "delay": 0,
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "duration":1.2
  
    }, {
        "animationEnd": function(){}
    });
   frmLogin.flxMain.animate(
    kony.ui.createAnimation({
        "100": {
            "top": "18.2%",
            "stepConfig": {
                "timingFunction": kony.anim.EASE
            }
        }
    }), {
        "delay": 1.3,
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "duration": 1
    }, {
        "animationEnd": function(){(new kony.apps.coe.ess.QRCode()).onPostShowOfLogin();}
    });
  
}
