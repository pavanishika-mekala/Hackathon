function AS_Button_d14ebd7d2ed645d4b8982be9859ed0e7(eventobject) {
    if (kony.apps.coe.ess.Approvals.FullDetailsRequestedListBackendlogic.isSyncInProgress == true) {
        kony.application.getCurrentForm().flxHamburger.flxOfflineAlert.setVisibility(false);
        kony.apps.coe.ess.Approvals.FullDetailsRequestedListBackendlogic.isSyncInProgress = false;
    } else kony.application.getCurrentForm().flxOfflineAlert.setVisibility(false);
}