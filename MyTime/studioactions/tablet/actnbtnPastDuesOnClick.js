function actnbtnPastDuesOnClick(eventobject) {
    return AS_Button_j5eb2e2a6278486b9bd64bc9ec3033a7(eventobject);
}

function AS_Button_j5eb2e2a6278486b9bd64bc9ec3033a7(eventobject) {
    if (frmListView.btnPastDues.skin == "sknBtnBgf4f4f4Fc526270Fs32px") {
        frmListView.btnPastDues.skin = "sknBtnBg4a90e2FcffffffFs32px";
        frmListView.btnSaved.skin = "sknBtnBgf4f4f4Fc526270Fs32px";
        frmListView.btnRejected.skin = "sknBtnBgf4f4f4Fc526270Fs32px";
    }
    if (frmListView.flxPDues.isVisible) {
        frmListView.flxPDues.isVisible = false;
    } else {
        frmListView.flxPDues.isVisible = true;
    }
    kony.apps.coe.ess.myTime.ListViewTabUI.getInstance().onClickPastDues();
}