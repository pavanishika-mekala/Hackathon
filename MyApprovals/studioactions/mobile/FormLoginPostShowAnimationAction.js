function FormLoginPostShowAnimationAction(eventobject) {
    return AS_Form_2a91a25f1bab438594273cc7ee7f1ac9(eventobject);
}

function AS_Form_2a91a25f1bab438594273cc7ee7f1ac9(eventobject) {
    //#ifdef android
    new kony.apps.coe.ess.loginAnimations().animationsForAndroid();
    //#endif
    //#ifdef iphone
    new kony.apps.coe.ess.loginAnimations().animationsForIphone();
    //#endif
}