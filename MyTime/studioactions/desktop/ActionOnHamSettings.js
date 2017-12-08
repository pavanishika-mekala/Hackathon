function ActionOnHamSettings(eventobject) {
    return AS_Button_92e29f9c639a46188141aaf8956aadc9(eventobject);
}

function AS_Button_92e29f9c639a46188141aaf8956aadc9(eventobject) {
    if (frmHamburgerDW.flxHamAppPreferences.isVisible == true) {
        frmHamburgerDW.flxHamAppPreferences.isVisible = false;
        frmHamburgerDW.flxMasthead.isVisible = true;
        frmHamburgerDW.flxHamApps.isVisible = true;
    } else {
        frmHamburgerDW.flxHamApps.isVisible = false;
        frmHamburgerDW.flxHamAppPreferences.isVisible = true;
        frmHamburgerDW.flxMasthead.isVisible = false;
    }
}