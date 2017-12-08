function FrmLoginPostShowAction(eventobject) {
    return AS_Form_ad49e962d6e34accbf2ef8a9da0627f7(eventobject);
}

function AS_Form_ad49e962d6e34accbf2ef8a9da0627f7(eventobject) {
    frmLogin.flxImgApllicationLogo.setVisibility(true);
    //kony.timer.schedule(timerid, function(){frmLogin.flxImgApllicationLogo.setVisibility(true);}, 0.3, false);
    kony.apps.coe.ess.Sync.UI.showSyncProgressBarIfSyncing();
    new kony.apps.coe.ess.loginAnimations().preAnimations();
    new kony.apps.coe.ess.loginAnimations().preAnimationsRotationOne();
}