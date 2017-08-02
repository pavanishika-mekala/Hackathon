function AS_flxOptionsLogout_onClick(eventobject) {
    return AS_FlexContainer_a65fc7351c824da69b95bd84d7dcfddd(eventobject);
}

function AS_FlexContainer_a65fc7351c824da69b95bd84d7dcfddd(eventobject) {
    kony.sdk.mvvm.LogoutAction();
    frmApprovalHome.flxFooterOptions.isVisible = false;
    frmApprovalHome.imgOption1.src = "circleinactive.png";
    frmApprovalHome.imgOption2.src = "circleinactive.png";
    frmApprovalHome.imgOption3.src = "circleinactive.png";
}