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

kony.apps.coe.ess.loginAnimations = function() {
}


/**
 * @class          loginAnimations
 * @type           Prototype
 * @return         None.
 * @description    Opacity Animation of Application Logo
 */
kony.apps.coe.ess.loginAnimations.prototype.preAnimations = function() {
  frmLogin.flxImgApllicationLogo.animate(
  kony.ui.createAnimation(
         {
		 "0":{"opacity":0.25, "stepConfig": {
                "timingFunction": kony.anim.EASE
            }},
       "25":{"opacity":0.5, "stepConfig": {
                "timingFunction": kony.anim.EASE
            }},
       "50":{"opacity":0.75, "stepConfig": {
                "timingFunction": kony.anim.EASE
            }},
       "100":{"opacity":1, "stepConfig": {
                "timingFunction": kony.anim.EASE
            }}

	   }
	   ),
     {"delay":0,"iterationCount":1,"fillMode":kony.anim.FILL_MODE_FORWARDS,"duration":3},
     {"animationEnd":function(){}});
}


/**
 * @class          loginAnimations
 * @type           Prototype
 * @return         None.
 * @description    Rotation Animation
 */
kony.apps.coe.ess.loginAnimations.prototype.preAnimationsRotationOne = function() {


  //#ifdef winphone8
    //Rotate 3D not supported for windows devices
    //#else
    var trans100 = kony.ui.makeAffineTransform();
    trans100.rotate3D(90, 0, 1, 0);
    trans100.setPerspective(1000)
    frmLogin.flxImgApllicationLogo.animate(
    kony.ui.createAnimation({
        "100": {
            "anchorPoint": {
                "x": 0.5,
                "y": 0.5
            },
            "stepConfig": {
                "timingFunction": kony.anim.EASE
            },
            "transform": trans100
        }
    }), {
        "delay": 0,
        "iterationCount": "2",
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "duration": 0.5,
        "direction": kony.anim.DIRECTION_ALTERNATE
    }, {
        "animationEnd": function()
      {
        var trans102 = kony.ui.makeAffineTransform();
    trans102.rotate3D(-90, 0, 1, 0);
    trans102.setPerspective(1000)
    frmLogin.flxImgApllicationLogo.animate(
    kony.ui.createAnimation({
        "100": {
            "anchorPoint": {
                "x": 0.5,
                "y": 0.5
            },
            "stepConfig": {
                "timingFunction": kony.anim.EASE
            },
            "transform": trans102
        }
    }), {
        "delay": 0.2,
        "iterationCount": "2",
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "duration": 0.5,
        "direction": kony.anim.DIRECTION_ALTERNATE
    }, {
        "animationEnd": function()
      {
         //#ifdef android
        new kony.apps.coe.ess.loginAnimations().animationsForAndroid();
        //#endif
        //#ifdef iphone
        new kony.apps.coe.ess.loginAnimations().animationsForIphone();
         //#endif
        //#ifdef ipad
        new kony.apps.coe.ess.loginAnimations().animationsForIphone();
        //#endif
        //#ifdef tabrcandroid
        new kony.apps.coe.ess.loginAnimations().animationsForAndroid();
        //#endif
      }
    });

      }
    });
    //#endif
};




/**
 * @class          loginAnimations
 * @type           Prototype
 * @return         None.
 * @description    Animations for android
 */
kony.apps.coe.ess.loginAnimations.prototype.animationsForAndroid = function() {


    frmLogin.flxSplash.animate(
    kony.ui.createAnimation({
        "100": {
            "top": "-100%",
            "stepConfig": {
                "timingFunction": kony.anim.EASE
            }
        }
    }), {
        "delay": 1,
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "duration": 1
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
        "duration": 2.6
    }, {
        "animationEnd": function(){}
    });
    frmLogin.flxApplicationLabel.animate(
    kony.ui.createAnimation({
        "100": {
            "top": "3.79%",
            "stepConfig": {
                "timingFunction": kony.anim.EASE
            }
        }
    }), {
        "delay": 0.97,
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "duration": 1.6
    }, {
        "animationEnd": function(){}
    });
    frmLogin.flxImgApllicationLogo.animate(
    kony.ui.createAnimation({
        "100": {
            "anchorPoint": {
                "x": 0.5
            },
            "stepConfig": {
                "timingFunction": kony.anim.EASE
            },
            "width": "75dp",
            "height": "76.5dp"
        }
    }), {
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "duration": 1,
        "delay": 1.8
    }, {
        "animationEnd": function(){

		 frmLogin.flxImgApllicationLogo.animate(
        kony.ui.createAnimation({
            "100": {
                "top": "11.9%",
                "left": "0px",
                "stepConfig": {
                    "timingFunction": kony.anim.EASE
                }
            }
        }), {
            "iterationCount": "1",
            "fillMode": kony.anim.FILL_MODE_FORWARDS,
            "duration": 1
        }, {
            "animationEnd": function(){}
        });
		}
    }
    );
    frmLogin.flxBrowserContainer.animate(
    kony.ui.createAnimation({
        "100": {
            "top": "25%",
            "stepConfig": {
                "timingFunction": kony.anim.EASE
            }
        }
    }), {
        "delay": 3.95,
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "duration": 1.23
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
        "delay": 3.95,
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "duration": 1.23
    }, {
        "animationEnd": function(){}
    });
}


/**
 * @class          loginAnimations
 * @type           Prototype
 * @return         None.
 * @description    Animations for Iphone
 */
kony.apps.coe.ess.loginAnimations.prototype.animationsForIphone = function()
{

    frmLogin.flxSplash.animate(
    kony.ui.createAnimation({
        "100": {
            "top": "-100%",
            "stepConfig": {
                "timingFunction": kony.anim.EASE
            }
        }
    }), {
        "delay": 1.4-0.4,
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "duration": 1.4-0.4
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
        "duration": 3.6-0.4
    }, {
        "animationEnd": function(){}
    });
    frmLogin.flxApplicationLabel.animate(
    kony.ui.createAnimation({
        "100": {
            "top": "3.79%",
            "stepConfig": {
                "timingFunction": kony.anim.EASE
            }
        }
    }), {
        "delay": 0.75-0.4,
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "duration": 2.5-0.4
    }, {
        "animationEnd": function(){}
    });
    var trans100 = kony.ui.makeAffineTransform();
    trans100.scale(0.42, 0.42);
    frmLogin.flxImgApllicationLogo.animate(
    kony.ui.createAnimation({
        "100": {
            "stepConfig": {
                "timingFunction": kony.anim.EASE
            },
            "transform": trans100
        }
    }), {
        "delay": 2.52-0.4,
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "duration": 1.4-0.4
    }, {
        "animationEnd": function()
		{
		frmLogin.flxImgApllicationLogo.animate(
        kony.ui.createAnimation({
            "100": {
                "top": "4%",
                "left": "0px",
                "stepConfig": {
                    "timingFunction": kony.anim.EASE
                }
            }
        }), {
            "iterationCount": "1",
            "fillMode": kony.anim.FILL_MODE_FORWARDS,
            "duration": 1.4-0.4
        }, {
            "animationEnd": function(){}
        });
		}
    });
    frmLogin.flxBrowserContainer.animate(
    kony.ui.createAnimation({
        "100": {
            "top": "25%",
            "stepConfig": {
                "timingFunction": kony.anim.EASE
            }
        }
    }), {
        "delay": 4.13-0.4,
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "duration": 1.722-0.4
    }, {
        "animationEnd":function(){}
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
        "delay": 4.13-0.4,
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "duration": 1.722-0.4
    }, {
        "animationEnd":function(){}
    });
};
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
    frmLogin.flxBrowserContainer.animate(
     kony.ui.createAnimation({
         "100": {
             "top": "25%",
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
