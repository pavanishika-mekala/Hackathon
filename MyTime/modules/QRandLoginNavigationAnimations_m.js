/**
 *  @author     Mehak Luthra
 *  @category   UX/UI
 *  @desc       QR Screen and Login Related Navigation Animations
 *  @ © 2016    Kony Inc
 */

kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};

kony.apps.coe.ess.NavigationAnimations = function(){
}

/**
 * @class          loginAnimations
 * @type           Prototype
 * @return         None.
 * @description    Animations for QR Screen
 */
kony.apps.coe.ess.NavigationAnimations.prototype.onClickSetManually = function() {

//frmStartUp.flxApplicationLabel.setVisibility(false);
//frmStartUp.flxImgApllicationLogo.setVisibility(false);
frmStartUp.flxMainQR.flxQrCode.skin=sknflxQrCodetwoM;
frmStartUp.flxMainQR.flxManualSetup.skin=sknflxQrCodeM;
frmStartUp.flxMainQR.flxManualSetup.flxLabelManualSetUp.lblManualSetup.skin=sknBlackLabel;
frmStartUp.flxMainQR.flxManualSetup.flxInputSetUpManually.isVisible=true;
frmStartUp.flxLabelQrCode.lblQrCode.skin=sknQrLabelM;
 frmStartUp.flxMainQR.flxQrCode.animate(
    kony.ui.createAnimation({
        "100": {
            "stepConfig": {
                "timingFunction": kony.anim.EASE
            },
            "top": "8%"
        }
    }), {
        
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
      "duration":1.95
    }, {
        "animationEnd": function(){
           
        }
    }); 
frmStartUp.flxManualSetup.animate(
    kony.ui.createAnimation({
        "100": {
            "top": "27.5%",
            "stepConfig": {
                "timingFunction": kony.anim.EASE
            }
        }
    }), {
        "delay": 0,
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "duration": 1.95
    }, {
        "animationEnd": function(){}
    });
    frmStartUp.flxOr.animate(
    kony.ui.createAnimation({
        "100": {
            "top": "25%",
            "stepConfig": {
                "timingFunction": kony.anim.EASE
            }
        }
    }), {
        "delay": 0,
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "duration": 1.93
    }, {
        "animationEnd": function(){}
    });

var trans101 = kony.ui.makeAffineTransform();
trans101.scale(0.45, 0.45);
trans101.translate(-200,-150);
frmStartUp.flxMainQR.flxQrCode.flxQrCodeImg.animate(
  kony.ui.createAnimation({
        "100": {
            "stepConfig": {
                "timingFunction": kony.anim.EASE
            },
            "transform": trans101,
          "left":"3.3%"
        }
    }), {
        "delay": 0,
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "duration": 0.7
    }, {
        "animationEnd": function(){
           
        }
    });
  frmStartUp.flxMainQR.flxLabelQrCode.animate(
    kony.ui.createAnimation({
        "100": {
            "stepConfig": {
                "timingFunction": kony.anim.EASE
            },
            "top":"13%",
          "left":"34%",
          
        }
    }), {
        "delay": 0.2,
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "duration": 1.4
    }, {
        "animationEnd": function(){
        frmStartUp.flxMainQR.flxManualSetup.flxInputSetUpManually.animate(
    kony.ui.createAnimation({
        "100": {
            "stepConfig": {
                "timingFunction": kony.anim.EASE
            },
            "top":"15%",
          
        }
    }), {
        
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "duration": 0.8
    }, {
        "animationEnd": function(){      
        }
    });
          
        }
    });
  frmStartUp.flxImgApllicationLogo.animate(
    kony.ui.createAnimation({
        "100": {
            "top": "-30%",
            "stepConfig": {
                "timingFunction": kony.anim.EASE
            }
        }
    }), {
        "delay": 0.25,
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "duration": 0.9
    }, {
        "animationEnd": function(){
        }
    });
    frmStartUp.flxApplicationLabel.animate(
    kony.ui.createAnimation({
        "100": {
            "top": "-10%",
            "stepConfig": {
                "timingFunction": kony.anim.EASE
            }
        }
    }), {
        "delay": 0.25,
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "duration": 0.9
    }, {
        "animationEnd": function(){}
    });

}

kony.apps.coe.ess.NavigationAnimations.prototype.onClickflxQr = function() {

frmStartUp.flxMainQR.flxManualSetup.flxInputSetUpManually.isVisible=false;
frmStartUp.flxLabelQrCode.lblQrCode.skin=sknBlackLabel;
frmStartUp.flxMainQR.flxQrCode.skin=sknflxQrCodeM;
frmStartUp.flxMainQR.flxManualSetup.skin=sknflxQrCodetwoM ;
frmStartUp.flxMainQR.flxManualSetup.flxLabelManualSetUp.lblManualSetup.skin=sknQrLabelM;
frmStartUp.flxManualSetup.animate(
    kony.ui.createAnimation({
        "100": {
            "top": "86%",
            "stepConfig": {
                "timingFunction": kony.anim.EASE
            }
        }
    }), {
        "delay": 0,
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "duration": 1.9
    }, {
        "animationEnd": function(){}
    });
  frmStartUp.flxOr.animate(
    kony.ui.createAnimation({
        "100": {
            "top": "83.46%",
            "stepConfig": {
                "timingFunction": kony.anim.EASE
            }
        }
    }), {
        "delay": 0,
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "duration": 1.9
    }, {
        "animationEnd": function(){}
    });
  frmStartUp.flxMainQR.flxQrCode.animate(
    kony.ui.createAnimation({
        "100": {
            "stepConfig": {
                "timingFunction": kony.anim.EASE
            },
            "top": "36%"
        }
    }), {
        
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
      "duration":1.9
    }, {
        "animationEnd": function(){
          // frmStartUp.flxApplicationLabel.setVisibility(true);
          // frmStartUp.flxImgApllicationLogo.setVisibility(true);   
        }
    }); 
   frmStartUp.flxMainQR.flxLabelQrCode.animate(
    kony.ui.createAnimation({
        "100": {
            "stepConfig": {
                "timingFunction": kony.anim.EASE
            },
            "top":"72.5%",
          "left":"17.5%",
          
        }
    }), {
        "delay": 0.2,
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "duration": 1.5
    }, {
        "animationEnd": function(){

        }
    });
var trans102 = kony.ui.makeAffineTransform();
trans102.scale(1,1);
frmStartUp.flxMainQR.flxQrCode.flxQrCodeImg.animate(
  kony.ui.createAnimation({
        "100": {
            "stepConfig": {
                "timingFunction": kony.anim.EASE
            },
            "transform": trans102
          
        }
    }), {
        "delay": 0.7,
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "duration": 1.5
    }, {
        "animationEnd": function(){
           
        }
    });
    frmStartUp.flxImgApllicationLogo.animate(
    kony.ui.createAnimation({
        "100": {
            "top": "5%",
            "stepConfig": {
                "timingFunction": kony.anim.EASE
            }
        }
    }), {
        "delay":0.8,
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "duration": 0.9
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
        "delay": 0.5,
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "duration": 1.2
    }, {
        "animationEnd": function(){}
    });

}
kony.apps.coe.ess.NavigationAnimations.prototype.onClickReconfigure = function() {
  frmStartUp.show();
  frmLogin.destroy();
}

