function AS_Button_5fb7dc2a97fd43dd9dc1212b18b0cdbf(eventobject) {
    if (kony.apps.coe.ess.syncFunctions.syncHamburger == 1) {
        kony.application.getCurrentForm().flxHamburger.flxOfflineAlert.setVisibility(false);
        kony.apps.coe.ess.syncFunctions.syncHamburger = 0;
    } else kony.application.getCurrentForm().flxOfflineAlert.setVisibility(false);
}