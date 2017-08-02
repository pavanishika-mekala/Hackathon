function actionTabLoginPostshow(eventobject) {
    return AS_Form_d626dd95ebf54bf790083aeb1f7527e5(eventobject);
}

function AS_Form_d626dd95ebf54bf790083aeb1f7527e5(eventobject) {
    var timerid = "AnimationInitTimer";
    kony.timer.schedule(timerid, function() {
        frmLogin.flxImgApllicationLogo.setVisibility(true);
    }, 0.3, false);
    kony.apps.coe.ess.postShowSyncAnimCall();
    new kony.apps.coe.ess.loginAnimations().preAnimations();
    new kony.apps.coe.ess.loginAnimations().preAnimationsRotationOne();
}